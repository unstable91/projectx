export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export type SubmissionStatus = 
  | 'Accepted' 
  | 'Wrong Answer' 
  | 'Time Limit Exceeded' 
  | 'Runtime Error' 
  | 'Compile Error';

export type SupportedLanguage = 'javascript' | 'python' | 'cpp' | 'java';

export interface TestCase {
  id: string;
  input: any[]; // Array of arguments passed to function
  expectedOutput: any;
  explanation?: string;
  isHidden?: boolean;
}

export interface Problem {
  id: string;
  slug: string;
  title: string;
  difficulty: Difficulty;
  category: string;
  tags: string[];
  description: string;
  functionName: string;
  paramNames?: string[];
  starterCode: Record<SupportedLanguage, string>;
  sampleTestCases: TestCase[];
  hiddenTestCases: TestCase[];
  hints: string[];
  solutionExplanation: string;
  timeLimitMs: number;
  memoryLimitMb: number;
  acceptanceRate?: number;
  totalSubmissions?: number;
  acceptedSubmissions?: number;
  isAiGenerated?: boolean;
  createdAt?: string;
}

export interface TestCaseResult {
  testCaseIndex: number;
  status: 'PASSED' | 'FAILED' | 'TLE' | 'ERROR';
  input: any[];
  expectedOutput: any;
  actualOutput: any;
  executionTimeMs: number;
  stdout: string[];
  errorMessage?: string;
  isHidden?: boolean;
}

export interface ExecutionResult {
  status: 'ACCEPTED' | 'WRONG_ANSWER' | 'TIME_LIMIT_EXCEEDED' | 'RUNTIME_ERROR' | 'COMPILE_ERROR';
  passedTests: number;
  totalTests: number;
  totalTimeMs: number;
  memoryKb?: number;
  testCaseResults: TestCaseResult[];
  stdout: string[];
  errorMessage?: string;
}

export interface Submission {
  id: string;
  userId?: string;
  problemId: string;
  problemTitle: string;
  language: SupportedLanguage;
  code: string;
  status: SubmissionStatus;
  runtimeMs: number;
  memoryKb: number;
  passedTests: number;
  totalTests: number;
  submittedAt: string;
  details?: {
    failedTestCase?: TestCaseResult;
    stdout?: string[];
  };
}

export interface UserProfile {
  id: string;
  username: string;
  fullName: string;
  avatarUrl: string;
  solvedCount: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  totalSubmissions: number;
  streak: number;
  lastActiveDate: string;
}

export interface UserProgress {
  problemId: string;
  status: 'solved' | 'attempted' | 'unsolved';
  lastSubmittedCode?: Record<SupportedLanguage, string>;
  solvedAt?: string;
  attemptsCount: number;
}
