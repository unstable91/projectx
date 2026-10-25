import { Problem, Submission, UserProfile, UserProgress } from '../../types';
import { DEFAULT_PROBLEMS } from '../../data/defaultProblems';
import { getSupabaseClient } from '../supabase/supabaseClient';

const PROBLEMS_KEY = 'algoforge_problems';
const SUBMISSIONS_KEY = 'algoforge_submissions';
const PROGRESS_KEY = 'algoforge_user_progress';
const PROFILE_KEY = 'algoforge_user_profile';

const DEFAULT_PROFILE: UserProfile = {
  id: 'local-user-1',
  username: 'AlgoCoder',
  fullName: 'Frontend Engineer',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  solvedCount: 0,
  easySolved: 0,
  mediumSolved: 0,
  hardSolved: 0,
  totalSubmissions: 0,
  streak: 3,
  lastActiveDate: new Date().toISOString().split('T')[0]
};

export class StorageService {
  // ----------------------------------------------------
  // Problems Management
  // ----------------------------------------------------
  public static async getProblems(): Promise<Problem[]> {
    const supabase = getSupabaseClient();
    if (supabase) {
      try {
        const { data, error } = await supabase.from('problems').select('*');
        if (!error && data && data.length > 0) {
          // Map DB columns to Problem interface
          return data.map((d: any) => ({
            id: d.id,
            slug: d.slug,
            title: d.title,
            difficulty: d.difficulty,
            category: d.category,
            tags: d.tags || [],
            description: d.description,
            functionName: d.function_name,
            paramNames: d.param_names || ['nums'],
            starterCode: d.starter_code,
            sampleTestCases: d.sample_test_cases,
            hiddenTestCases: d.hidden_test_cases,
            hints: d.hints || [],
            solutionExplanation: d.solution_explanation || '',
            timeLimitMs: d.time_limit_ms || 2000,
            memoryLimitMb: d.memory_limit_mb || 128,
            acceptanceRate: d.total_submissions > 0 
              ? Math.round((d.accepted_submissions / d.total_submissions) * 1000) / 10 
              : 50.0,
            totalSubmissions: d.total_submissions || 0,
            acceptedSubmissions: d.accepted_submissions || 0,
            isAiGenerated: d.is_ai_generated || false,
            createdAt: d.created_at
          }));
        }
      } catch (err) {
        console.warn('Failed to load problems from Supabase, using local storage:', err);
      }
    }

    // LocalStorage fallback & auto-merge
    const raw = localStorage.getItem(PROBLEMS_KEY);
    if (!raw) {
      localStorage.setItem(PROBLEMS_KEY, JSON.stringify(DEFAULT_PROBLEMS));
      return DEFAULT_PROBLEMS;
    }

    try {
      const parsed: Problem[] = JSON.parse(raw);
      // Merge any new default problems not yet in local storage
      const existingSlugs = new Set(parsed.map((p) => p.slug));
      let updated = false;
      DEFAULT_PROBLEMS.forEach((dp) => {
        if (!existingSlugs.has(dp.slug)) {
          parsed.push(dp);
          updated = true;
        }
      });
      if (updated) {
        localStorage.setItem(PROBLEMS_KEY, JSON.stringify(parsed));
      }
      return parsed.length > 0 ? parsed : DEFAULT_PROBLEMS;
    } catch {
      return DEFAULT_PROBLEMS;
    }
  }

  public static async getProblemBySlug(slug: string): Promise<Problem | null> {
    const problems = await this.getProblems();
    return problems.find((p) => p.slug === slug || p.id === slug) || null;
  }

  public static async saveProblem(problem: Problem): Promise<void> {
    const problems = await this.getProblems();
    const existingIndex = problems.findIndex((p) => p.id === problem.id || p.slug === problem.slug);
    
    if (existingIndex >= 0) {
      problems[existingIndex] = problem;
    } else {
      problems.unshift(problem);
    }

    localStorage.setItem(PROBLEMS_KEY, JSON.stringify(problems));

    // Also persist to Supabase if connected
    const supabase = getSupabaseClient();
    if (supabase) {
      try {
        await supabase.from('problems').upsert({
          slug: problem.slug,
          title: problem.title,
          difficulty: problem.difficulty,
          category: problem.category,
          tags: problem.tags,
          description: problem.description,
          function_name: problem.functionName,
          param_names: problem.paramNames,
          starter_code: problem.starterCode,
          sample_test_cases: problem.sampleTestCases,
          hidden_test_cases: problem.hiddenTestCases,
          hints: problem.hints,
          solution_explanation: problem.solutionExplanation,
          time_limit_ms: problem.timeLimitMs,
          memory_limit_mb: problem.memoryLimitMb,
          is_ai_generated: problem.isAiGenerated ?? false
        });
      } catch (err) {
        console.error('Supabase problem upsert error:', err);
      }
    }
  }

  // ----------------------------------------------------
  // Submissions Management
  // ----------------------------------------------------
  public static async getSubmissions(problemId?: string): Promise<Submission[]> {
    const supabase = getSupabaseClient();
    if (supabase) {
      try {
        let query = supabase.from('submissions').select('*').order('submitted_at', { ascending: false });
        if (problemId) {
          query = query.eq('problem_id', problemId);
        }
        const { data, error } = await query;
        if (!error && data && data.length > 0) {
          return data.map((d: any) => ({
            id: d.id,
            userId: d.user_id,
            problemId: d.problem_id,
            problemTitle: d.problem_title,
            language: d.language,
            code: d.code,
            status: d.status,
            runtimeMs: Number(d.runtime_ms),
            memoryKb: Number(d.memory_kb),
            passedTests: d.passed_tests,
            totalTests: d.total_tests,
            submittedAt: d.submitted_at,
            details: d.details
          }));
        }
      } catch (err) {
        console.warn('Supabase submissions fetch error, falling back to local storage:', err);
      }
    }

    const raw = localStorage.getItem(SUBMISSIONS_KEY);
    const submissions: Submission[] = raw ? JSON.parse(raw) : [];
    if (problemId) {
      return submissions.filter((s) => s.problemId === problemId);
    }
    return submissions;
  }

  public static async saveSubmission(submission: Submission): Promise<void> {
    const raw = localStorage.getItem(SUBMISSIONS_KEY);
    const submissions: Submission[] = raw ? JSON.parse(raw) : [];
    submissions.unshift(submission);
    localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(submissions));

    // Update User Progress & Stats
    await this.recordSubmissionProgress(submission);

    // Save to Supabase if connected
    const supabase = getSupabaseClient();
    if (supabase) {
      try {
        await supabase.from('submissions').insert({
          problem_id: submission.problemId,
          problem_title: submission.problemTitle,
          language: submission.language,
          code: submission.code,
          status: submission.status,
          runtime_ms: submission.runtimeMs,
          memory_kb: submission.memoryKb,
          passed_tests: submission.passedTests,
          total_tests: submission.totalTests,
          details: submission.details,
          submitted_at: submission.submittedAt
        });
      } catch (err) {
        console.error('Supabase submission insert error:', err);
      }
    }
  }

  // ----------------------------------------------------
  // User Progress & Profile
  // ----------------------------------------------------
  public static async getUserProgress(): Promise<Record<string, UserProgress>> {
    const raw = localStorage.getItem(PROGRESS_KEY);
    return raw ? JSON.parse(raw) : {};
  }

  public static async getUserProfile(): Promise<UserProfile> {
    const raw = localStorage.getItem(PROFILE_KEY);
    if (!raw) {
      localStorage.setItem(PROFILE_KEY, JSON.stringify(DEFAULT_PROFILE));
      return DEFAULT_PROFILE;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return DEFAULT_PROFILE;
    }
  }

  private static async recordSubmissionProgress(submission: Submission): Promise<void> {
    const progressMap = await this.getUserProgress();
    const currentProgress = progressMap[submission.problemId] || {
      problemId: submission.problemId,
      status: 'unsolved',
      attemptsCount: 0
    };

    currentProgress.attemptsCount += 1;
    currentProgress.lastSubmittedCode = {
      ...(currentProgress.lastSubmittedCode || {}),
      [submission.language]: submission.code
    } as any;

    const wasAlreadySolved = currentProgress.status === 'solved';
    const isNowAccepted = submission.status === 'Accepted';

    if (isNowAccepted) {
      currentProgress.status = 'solved';
      if (!currentProgress.solvedAt) {
        currentProgress.solvedAt = new Date().toISOString();
      }
    } else if (currentProgress.status !== 'solved') {
      currentProgress.status = 'attempted';
    }

    progressMap[submission.problemId] = currentProgress;
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progressMap));

    // Update user profile stats
    const profile = await this.getUserProfile();
    profile.totalSubmissions += 1;

    if (isNowAccepted && !wasAlreadySolved) {
      const problem = await this.getProblemBySlug(submission.problemId);
      profile.solvedCount += 1;
      if (problem) {
        if (problem.difficulty === 'Easy') profile.easySolved += 1;
        else if (problem.difficulty === 'Medium') profile.mediumSolved += 1;
        else if (problem.difficulty === 'Hard') profile.hardSolved += 1;
      }
    }

    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  }
}
