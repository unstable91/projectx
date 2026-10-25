import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  FileText, 
  Lightbulb, 
  BookOpen, 
  History, 
  Sparkles, 
  Play, 
  CheckCircle2, 
  Terminal,
  Loader2,
  ChevronLeft
} from 'lucide-react';
import { 
  Problem, 
  SupportedLanguage, 
  ExecutionResult, 
  Submission, 
  TestCaseResult,
  TestCase 
} from '../../types';
import { runnerRegistry } from '../../engine/runnerRegistry';
import { StorageService } from '../../lib/storage/storageService';
import { ProblemDescription } from './ProblemDescription';
import { HintsTab } from './HintsTab';
import { SolutionTab } from './SolutionTab';
import { SubmissionsTab } from './SubmissionsTab';
import { AiTutorPanel } from './AiTutorPanel';
import { CodeEditor } from './CodeEditor';
import { TestcasePanel } from './TestcasePanel';
import { InterviewTimer } from './InterviewTimer';

interface WorkspaceProps {
  problem: Problem;
  onBack: () => void;
  onOpenSettings: () => void;
  onProblemSolved?: () => void;
}

export const Workspace: React.FC<WorkspaceProps> = ({
  problem,
  onBack,
  onOpenSettings,
  onProblemSolved
}) => {
  const [leftTab, setLeftTab] = useState<'desc' | 'hints' | 'solution' | 'submissions' | 'tutor'>('desc');
  const [language, setLanguage] = useState<SupportedLanguage>('javascript');
  const [code, setCode] = useState<string>('');
  const [fontSize, setFontSize] = useState<number>(14);

  // Focus / Zen / Fullscreen modes
  const [isZenMode, setIsZenMode] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Active test cases (sample cases + custom user cases)
  const [activeTestCases, setActiveTestCases] = useState<TestCase[]>(problem.sampleTestCases);

  // Bottom test panel
  const [bottomTab, setBottomTab] = useState<'testcases' | 'result' | 'console'>('testcases');
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [executionResult, setExecutionResult] = useState<ExecutionResult | null>(null);
  const [lastFailedTestCase, setLastFailedTestCase] = useState<TestCaseResult | undefined>(undefined);

  // Submissions for this problem
  const [submissions, setSubmissions] = useState<Submission[]>([]);

  // Initialize starter code or load previous code for this problem and language
  useEffect(() => {
    async function loadSavedCode() {
      const progressMap = await StorageService.getUserProgress();
      const userProgress = progressMap[problem.id] || progressMap[problem.slug];
      
      if (userProgress?.lastSubmittedCode?.[language]) {
        setCode(userProgress.lastSubmittedCode[language]);
      } else if (problem.starterCode[language]) {
        setCode(problem.starterCode[language]);
      } else {
        const runner = runnerRegistry.get(language);
        setCode(runner.defaultBoilerplate(problem.functionName, problem.paramNames));
      }

      const subs = await StorageService.getSubmissions(problem.id);
      setSubmissions(subs);
      setActiveTestCases(problem.sampleTestCases);
    }

    loadSavedCode();
    setExecutionResult(null);
  }, [problem.id, language]);

  const handleLanguageChange = (newLang: SupportedLanguage) => {
    setLanguage(newLang);
    if (problem.starterCode[newLang]) {
      setCode(problem.starterCode[newLang]);
    } else {
      const runner = runnerRegistry.get(newLang);
      setCode(runner.defaultBoilerplate(problem.functionName, problem.paramNames));
    }
  };

  const handleResetCode = () => {
    if (confirm('Reset code to starter boilerplate?')) {
      if (problem.starterCode[language]) {
        setCode(problem.starterCode[language]);
      } else {
        const runner = runnerRegistry.get(language);
        setCode(runner.defaultBoilerplate(problem.functionName, problem.paramNames));
      }
    }
  };

  // Run sample + custom test cases
  const handleRunCode = async () => {
    if (isRunning || isSubmitting) return;

    setIsRunning(true);
    setBottomTab('result');

    try {
      const runner = runnerRegistry.get(language);
      const res = await runner.execute(
        code,
        problem.functionName,
        activeTestCases,
        problem.timeLimitMs
      );

      setExecutionResult(res);

      const failedCase = res.testCaseResults.find((tc) => tc.status !== 'PASSED');
      if (failedCase) {
        setLastFailedTestCase(failedCase);
      }
    } catch (err: any) {
      setExecutionResult({
        status: 'RUNTIME_ERROR',
        passedTests: 0,
        totalTests: activeTestCases.length,
        totalTimeMs: 0,
        testCaseResults: [],
        stdout: [],
        errorMessage: err.message || 'Execution failed'
      });
    } finally {
      setIsRunning(false);
    }
  };

  // Submit against ALL test cases (sample + custom + hidden edge cases)
  const handleSubmitCode = async () => {
    if (isRunning || isSubmitting) return;

    setIsSubmitting(true);
    setBottomTab('result');

    try {
      const allTestCases = [
        ...activeTestCases,
        ...(problem.hiddenTestCases || [])
      ];

      const runner = runnerRegistry.get(language);
      const res = await runner.execute(
        code,
        problem.functionName,
        allTestCases,
        problem.timeLimitMs
      );

      setExecutionResult(res);

      const isAccepted = res.status === 'ACCEPTED';
      const statusLabel = isAccepted
        ? 'Accepted'
        : res.status === 'TIME_LIMIT_EXCEEDED'
        ? 'Time Limit Exceeded'
        : res.status === 'COMPILE_ERROR'
        ? 'Compile Error'
        : res.status === 'RUNTIME_ERROR'
        ? 'Runtime Error'
        : 'Wrong Answer';

      // Save submission
      const newSubmission: Submission = {
        id: `sub-${Date.now()}`,
        problemId: problem.id,
        problemTitle: problem.title,
        language: language,
        code: code,
        status: statusLabel as any,
        runtimeMs: res.totalTimeMs,
        memoryKb: res.memoryKb || 1420,
        passedTests: res.passedTests,
        totalTests: res.totalTests,
        submittedAt: new Date().toISOString(),
        details: {
          stdout: res.stdout
        }
      };

      await StorageService.saveSubmission(newSubmission);
      setSubmissions((prev) => [newSubmission, ...prev]);

      if (isAccepted) {
        confetti({
          particleCount: 130,
          spread: 75,
          origin: { y: 0.6 }
        });
        if (onProblemSolved) {
          onProblemSolved();
        }
      } else {
        const failed = res.testCaseResults.find((tc) => tc.status !== 'PASSED');
        if (failed) {
          setLastFailedTestCase(failed);
        }
      }

    } catch (err: any) {
      setExecutionResult({
        status: 'RUNTIME_ERROR',
        passedTests: 0,
        totalTests: problem.sampleTestCases.length,
        totalTimeMs: 0,
        testCaseResults: [],
        stdout: [],
        errorMessage: err.message || 'Submission failed'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)] bg-[#1a1a1a] select-none">
      {/* Workspace Top Toolbar */}
      <div className="h-10 px-4 border-b border-[#2e2e2e] bg-[#212121] flex items-center justify-between text-xs">
        <div className="flex items-center space-x-3">
          <button
            onClick={onBack}
            className="flex items-center space-x-1.5 text-gray-400 hover:text-white font-medium transition"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Problem List</span>
          </button>

          <div className="hidden sm:flex items-center space-x-2 border-l border-[#333333] pl-3">
            <span className="font-semibold text-gray-300">{problem.title}</span>
            <span className="text-gray-500">•</span>
            <span className={`font-semibold ${
              problem.difficulty === 'Easy' ? 'text-emerald-400' :
              problem.difficulty === 'Medium' ? 'text-amber-400' : 'text-rose-400'
            }`}>
              {problem.difficulty}
            </span>
          </div>
        </div>

        {/* Mock Interview Timer & Controls */}
        <div className="flex items-center space-x-3">
          <InterviewTimer
            isZenMode={isZenMode}
            onToggleZenMode={() => setIsZenMode(!isZenMode)}
            onTimeExpired={() => {
              alert('⏰ Interview time is up! Submit your solution to review your performance.');
            }}
          />

          <div className="text-gray-400 font-mono text-[11px] hidden md:inline">
            <kbd className="bg-[#2d2d2d] px-1.5 py-0.5 rounded text-gray-300">Ctrl+Enter</kbd> Run
          </div>
        </div>
      </div>

      {/* Main Split Body: Left Pane & Right Pane */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* LEFT PANE: Problem Description / Hints / Solutions / Submissions / AI Tutor */}
        <div className={`w-full md:w-1/2 flex flex-col border-r border-[#2e2e2e] bg-[#1e1e1e] ${isZenMode ? 'hidden' : ''}`}>
          {/* Left Tabs Bar */}
          <div className="flex items-center space-x-1 px-3 h-10 border-b border-[#2e2e2e] bg-[#242424] overflow-x-auto">
            <button
              onClick={() => setLeftTab('desc')}
              className={`flex items-center space-x-1.5 px-3 py-1 text-xs font-semibold rounded-md transition ${
                leftTab === 'desc'
                  ? 'bg-[#1a1a1a] text-white border border-[#333333]'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              <FileText className="w-3.5 h-3.5 text-blue-400" />
              <span>Description</span>
            </button>

            <button
              onClick={() => setLeftTab('hints')}
              className={`flex items-center space-x-1.5 px-3 py-1 text-xs font-semibold rounded-md transition ${
                leftTab === 'hints'
                  ? 'bg-[#1a1a1a] text-white border border-[#333333]'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
              <span>Hints ({problem.hints?.length || 0})</span>
            </button>

            <button
              onClick={() => setLeftTab('solution')}
              className={`flex items-center space-x-1.5 px-3 py-1 text-xs font-semibold rounded-md transition ${
                leftTab === 'solution'
                  ? 'bg-[#1a1a1a] text-white border border-[#333333]'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
              <span>Editorial</span>
            </button>

            <button
              onClick={() => setLeftTab('submissions')}
              className={`flex items-center space-x-1.5 px-3 py-1 text-xs font-semibold rounded-md transition ${
                leftTab === 'submissions'
                  ? 'bg-[#1a1a1a] text-white border border-[#333333]'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              <History className="w-3.5 h-3.5 text-cyan-400" />
              <span>Submissions</span>
            </button>

            <button
              onClick={() => setLeftTab('tutor')}
              className={`flex items-center space-x-1.5 px-3 py-1 text-xs font-semibold rounded-md transition ${
                leftTab === 'tutor'
                  ? 'bg-[#1a1a1a] text-purple-300 border border-purple-500/30'
                  : 'text-purple-400/80 hover:text-purple-300'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>AI Tutor</span>
            </button>
          </div>

          {/* Left Content Area */}
          <div className="flex-1 overflow-y-auto">
            {leftTab === 'desc' && <ProblemDescription problem={problem} />}
            {leftTab === 'hints' && (
              <HintsTab problem={problem} userCode={code} onOpenSettings={onOpenSettings} />
            )}
            {leftTab === 'solution' && <SolutionTab problem={problem} />}
            {leftTab === 'submissions' && <SubmissionsTab submissions={submissions} />}
            {leftTab === 'tutor' && (
              <AiTutorPanel
                problem={problem}
                userCode={code}
                language={language}
                lastFailedTestCase={lastFailedTestCase}
                onOpenSettings={onOpenSettings}
                onApplyTranslatedCode={(translatedCode, targetL) => {
                  setLanguage(targetL);
                  setCode(translatedCode);
                }}
              />
            )}
          </div>
        </div>

        {/* RIGHT PANE: Code Editor & Test Execution */}
        <div className={`flex flex-col bg-[#1e1e1e] ${isZenMode ? 'w-full' : 'w-full md:w-1/2'}`}>
          {/* Top Half: Code Editor */}
          <div className="h-[55%] flex flex-col overflow-hidden">
            <CodeEditor
              code={code}
              language={language}
              onChange={(newVal) => setCode(newVal || '')}
              onLanguageChange={handleLanguageChange}
              onResetCode={handleResetCode}
              onRunCode={handleRunCode}
              onSubmitCode={handleSubmitCode}
              isRunning={isRunning || isSubmitting}
              fontSize={fontSize}
              onFontSizeChange={setFontSize}
              isFullscreen={isFullscreen}
              onToggleFullscreen={() => setIsFullscreen(!isFullscreen)}
            />
          </div>

          {/* Bottom Half: Testcase & Result Panel */}
          <div className="h-[45%] flex flex-col overflow-hidden">
            <TestcasePanel
              testCases={activeTestCases}
              executionResult={executionResult}
              isRunning={isRunning || isSubmitting}
              activeTab={bottomTab}
              onTabChange={setBottomTab}
              paramNames={problem.paramNames || ['nums', 'target']}
              language={language}
              onUpdateTestCases={(newCases) => setActiveTestCases(newCases)}
            />
          </div>

          {/* Sticky Execution Action Bar */}
          <div className="h-12 border-t border-[#2e2e2e] bg-[#242424] px-4 flex items-center justify-between select-none">
            <button
              onClick={() => setBottomTab(bottomTab === 'console' ? 'testcases' : 'console')}
              className="flex items-center space-x-1.5 text-xs text-gray-400 hover:text-gray-200 transition"
            >
              <Terminal className="w-4 h-4" />
              <span>Console</span>
            </button>

            <div className="flex items-center space-x-2.5">
              <button
                onClick={handleRunCode}
                disabled={isRunning || isSubmitting}
                className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-[#333333] hover:bg-[#3d3d3d] text-gray-200 text-xs font-semibold border border-[#3e3e3e] transition disabled:opacity-50"
              >
                {isRunning ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-[#ffa116]" />
                    <span>Running...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 text-[#ffa116] fill-[#ffa116]" />
                    <span>Run</span>
                  </>
                )}
              </button>

              <button
                onClick={handleSubmitCode}
                disabled={isRunning || isSubmitting}
                className="flex items-center space-x-1.5 px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Submit</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
