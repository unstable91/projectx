import React, { useState } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  Clock, 
  AlertTriangle, 
  Terminal, 
  Play, 
  Plus, 
  Check, 
  Sparkles,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { ExecutionResult, TestCase, TestCaseResult } from '../../types';
import { formatOutput } from '../../engine/deepCompare';

interface TestcasePanelProps {
  testCases: TestCase[];
  executionResult: ExecutionResult | null;
  isRunning: boolean;
  activeTab: 'testcases' | 'result' | 'console';
  onTabChange: (tab: 'testcases' | 'result' | 'console') => void;
  paramNames: string[];
  onAddCustomTestcase?: (input: any[], expected: any) => void;
  onDebugFailure?: (testCase: TestCaseResult) => void;
}

export const TestcasePanel: React.FC<TestcasePanelProps> = ({
  testCases,
  executionResult,
  isRunning,
  activeTab,
  onTabChange,
  paramNames,
  onAddCustomTestcase,
  onDebugFailure
}) => {
  const [selectedCaseIndex, setSelectedCaseIndex] = useState(0);

  const getStatusBanner = (res: ExecutionResult) => {
    switch (res.status) {
      case 'ACCEPTED':
        return (
          <div className="flex items-center space-x-2 text-emerald-400 font-bold text-sm">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Accepted</span>
            <span className="text-xs font-normal text-gray-400 ml-2">
              Runtime: <strong className="text-white">{res.totalTimeMs} ms</strong> • Memory: <strong className="text-white">{res.memoryKb || 1240} KB</strong>
            </span>
          </div>
        );
      case 'WRONG_ANSWER':
        return (
          <div className="flex items-center space-x-2 text-rose-400 font-bold text-sm">
            <XCircle className="w-4 h-4 text-rose-400" />
            <span>Wrong Answer</span>
            <span className="text-xs font-normal text-gray-400 ml-2">
              {res.passedTests} / {res.totalTests} test cases passed
            </span>
          </div>
        );
      case 'TIME_LIMIT_EXCEEDED':
        return (
          <div className="flex items-center space-x-2 text-amber-400 font-bold text-sm">
            <Clock className="w-4 h-4 text-amber-400" />
            <span>Time Limit Exceeded</span>
            <span className="text-xs font-normal text-gray-400 ml-2">
              Execution timed out after {res.totalTimeMs} ms
            </span>
          </div>
        );
      default:
        return (
          <div className="flex items-center space-x-2 text-rose-500 font-bold text-sm">
            <AlertTriangle className="w-4 h-4 text-rose-500" />
            <span>Runtime Error</span>
          </div>
        );
    }
  };

  const currentResultCase: TestCaseResult | undefined =
    executionResult?.testCaseResults?.[selectedCaseIndex];
  const currentInputCase: TestCase | undefined = testCases[selectedCaseIndex];

  return (
    <div className="flex flex-col h-full bg-[#1e1e1e] border-t border-[#2e2e2e]">
      {/* Top Bar Tabs */}
      <div className="flex items-center justify-between px-3 h-10 border-b border-[#2e2e2e] bg-[#242424] select-none">
        <div className="flex items-center space-x-1">
          <button
            onClick={() => onTabChange('testcases')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition ${
              activeTab === 'testcases'
                ? 'bg-[#1a1a1a] text-white border border-[#333333]'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            Testcase
          </button>

          <button
            onClick={() => onTabChange('result')}
            className={`px-3 py-1 text-xs font-medium rounded-md flex items-center space-x-1.5 transition ${
              activeTab === 'result'
                ? 'bg-[#1a1a1a] text-white border border-[#333333]'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <span>Test Result</span>
            {executionResult && (
              <span
                className={`w-2 h-2 rounded-full ${
                  executionResult.status === 'ACCEPTED' ? 'bg-emerald-400' : 'bg-rose-500'
                }`}
              />
            )}
          </button>

          <button
            onClick={() => onTabChange('console')}
            className={`px-3 py-1 text-xs font-medium rounded-md flex items-center space-x-1.5 transition ${
              activeTab === 'console'
                ? 'bg-[#1a1a1a] text-white border border-[#333333]'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Console</span>
            {executionResult?.stdout && executionResult.stdout.length > 0 && (
              <span className="text-[10px] bg-[#333333] px-1 rounded-full text-gray-300">
                {executionResult.stdout.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-4 text-xs font-sans">
        {/* TAB 1: TEST CASES INPUT */}
        {activeTab === 'testcases' && (
          <div className="space-y-3">
            {/* Case Selector Pills */}
            <div className="flex items-center space-x-2">
              {testCases.map((tc, idx) => (
                <button
                  key={tc.id || idx}
                  onClick={() => setSelectedCaseIndex(idx)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                    selectedCaseIndex === idx
                      ? 'bg-[#333333] text-white font-semibold'
                      : 'bg-[#282828] text-gray-400 hover:text-gray-200'
                  }`}
                >
                  Case {idx + 1}
                </button>
              ))}
            </div>

            {/* Inputs list */}
            {currentInputCase && (
              <div className="space-y-3 mt-3">
                {currentInputCase.input.map((val, pIdx) => {
                  const paramName = paramNames[pIdx] || `param${pIdx + 1}`;
                  return (
                    <div key={pIdx}>
                      <span className="text-gray-400 text-[11px] font-mono block mb-1">
                        {paramName} =
                      </span>
                      <div className="p-2.5 rounded-lg bg-[#141414] border border-[#2e2e2e] text-gray-200 font-mono">
                        {formatOutput(val)}
                      </div>
                    </div>
                  );
                })}

                <div>
                  <span className="text-gray-400 text-[11px] font-mono block mb-1">
                    Expected Output =
                  </span>
                  <div className="p-2.5 rounded-lg bg-[#141414] border border-[#2e2e2e] text-amber-300 font-mono">
                    {formatOutput(currentInputCase.expectedOutput)}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: TEST RESULT */}
        {activeTab === 'result' && (
          <div>
            {!executionResult && !isRunning ? (
              <div className="text-center py-8 text-gray-500">
                <p>Run your code to see execution test results.</p>
              </div>
            ) : isRunning ? (
              <div className="text-center py-8 text-gray-400 flex flex-col items-center justify-center space-y-2">
                <div className="w-5 h-5 border-2 border-[#ffa116] border-t-transparent rounded-full animate-spin" />
                <p>Executing test cases in browser Web Worker sandbox...</p>
              </div>
            ) : executionResult ? (
              <div className="space-y-4">
                {/* Status banner */}
                <div className="p-3 bg-[#242424] rounded-lg border border-[#333333] flex items-center justify-between">
                  {getStatusBanner(executionResult)}
                </div>

                {/* Error message if Compile Error or Runtime Error */}
                {executionResult.errorMessage && (
                  <div className="p-3 rounded-lg bg-rose-950/30 border border-rose-800/40 text-rose-300 font-mono text-xs whitespace-pre-wrap">
                    {executionResult.errorMessage}
                  </div>
                )}

                {/* Result Case Selector */}
                {executionResult.testCaseResults && executionResult.testCaseResults.length > 0 && (
                  <>
                    <div className="flex items-center space-x-2">
                      {executionResult.testCaseResults.map((tc, idx) => {
                        const isPass = tc.status === 'PASSED';
                        return (
                          <button
                            key={idx}
                            onClick={() => setSelectedCaseIndex(idx)}
                            className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                              selectedCaseIndex === idx
                                ? 'bg-[#333333] text-white'
                                : 'bg-[#282828] text-gray-400 hover:text-gray-200'
                            }`}
                          >
                            <span
                              className={`w-2 h-2 rounded-full ${
                                isPass ? 'bg-emerald-400' : 'bg-rose-500'
                              }`}
                            />
                            <span>Case {idx + 1}</span>
                          </button>
                        );
                      })}
                    </div>

                    {currentResultCase && (
                      <div className="space-y-3 mt-3">
                        {/* Status detail */}
                        <div className="flex items-center justify-between">
                          <span
                            className={`font-semibold ${
                              currentResultCase.status === 'PASSED'
                                ? 'text-emerald-400'
                                : 'text-rose-400'
                            }`}
                          >
                            {currentResultCase.status === 'PASSED' ? 'Passed' : 'Failed'}
                          </span>
                          <span className="text-gray-500">
                            Time: {currentResultCase.executionTimeMs} ms
                          </span>
                        </div>

                        {/* Input values */}
                        <div>
                          <span className="text-gray-400 text-[11px] font-mono block mb-1">Input:</span>
                          <div className="p-2.5 rounded-lg bg-[#141414] border border-[#2e2e2e] text-gray-200 font-mono">
                            {formatOutput(currentResultCase.input)}
                          </div>
                        </div>

                        {/* Output Comparison */}
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <span className="text-gray-400 text-[11px] font-mono block mb-1">
                              Your Output:
                            </span>
                            <div
                              className={`p-2.5 rounded-lg border font-mono ${
                                currentResultCase.status === 'PASSED'
                                  ? 'bg-[#141414] border-[#2e2e2e] text-emerald-400'
                                  : 'bg-rose-950/20 border-rose-800/40 text-rose-300'
                              }`}
                            >
                              {formatOutput(currentResultCase.actualOutput)}
                            </div>
                          </div>
                          <div>
                            <span className="text-gray-400 text-[11px] font-mono block mb-1">
                              Expected Output:
                            </span>
                            <div className="p-2.5 rounded-lg bg-[#141414] border border-[#2e2e2e] text-amber-300 font-mono">
                              {formatOutput(currentResultCase.expectedOutput)}
                            </div>
                          </div>
                        </div>

                        {/* Console logs for this test case */}
                        {currentResultCase.stdout && currentResultCase.stdout.length > 0 && (
                          <div>
                            <span className="text-gray-400 text-[11px] font-mono block mb-1">
                              Stdout:
                            </span>
                            <div className="p-2.5 rounded-lg bg-[#141414] border border-[#2e2e2e] text-gray-300 font-mono text-[11px]">
                              {currentResultCase.stdout.join('\n')}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </>
                )}
              </div>
            ) : null}
          </div>
        )}

        {/* TAB 3: CONSOLE STDOUT */}
        {activeTab === 'console' && (
          <div className="h-full">
            {executionResult?.stdout && executionResult.stdout.length > 0 ? (
              <div className="bg-[#141414] border border-[#2e2e2e] rounded-lg p-3 font-mono text-xs text-gray-300 space-y-1">
                {executionResult.stdout.map((line, idx) => (
                  <div key={idx} className="leading-relaxed">
                    <span className="text-gray-500 mr-2">&gt;</span>
                    {line}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>No console output.</p>
                <p className="text-xs text-gray-600 mt-1">
                  Use <code className="text-amber-400">console.log(...)</code> in your code to print values here.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
