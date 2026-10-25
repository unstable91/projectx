import React, { useState } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  Clock, 
  AlertTriangle, 
  Terminal, 
  Play, 
  Plus, 
  Trash2, 
  Edit3,
  Check, 
  Sparkles,
  BarChart2
} from 'lucide-react';
import { ExecutionResult, TestCase, TestCaseResult } from '../../types';
import { formatOutput } from '../../engine/deepCompare';
import { PerformanceChart } from './PerformanceChart';

interface TestcasePanelProps {
  testCases: TestCase[];
  executionResult: ExecutionResult | null;
  isRunning: boolean;
  activeTab: 'testcases' | 'result' | 'console';
  onTabChange: (tab: 'testcases' | 'result' | 'console') => void;
  paramNames: string[];
  language?: string;
  onUpdateTestCases?: (newCases: TestCase[]) => void;
}

export const TestcasePanel: React.FC<TestcasePanelProps> = ({
  testCases,
  executionResult,
  isRunning,
  activeTab,
  onTabChange,
  paramNames,
  language = 'javascript',
  onUpdateTestCases
}) => {
  const [selectedCaseIndex, setSelectedCaseIndex] = useState(0);
  const [editingInputIdx, setEditingInputIdx] = useState<number | null>(null);
  const [editBuffer, setEditBuffer] = useState<string>('');

  const currentResultCase: TestCaseResult | undefined =
    executionResult?.testCaseResults?.[selectedCaseIndex];
  const currentInputCase: TestCase | undefined = testCases[selectedCaseIndex];

  // Add custom testcase
  const handleAddCustomCase = () => {
    if (!onUpdateTestCases) return;
    const templateInput = testCases.length > 0 ? JSON.parse(JSON.stringify(testCases[0].input)) : [0];
    const newCase: TestCase = {
      id: `custom-${Date.now()}`,
      input: templateInput,
      expectedOutput: testCases.length > 0 ? testCases[0].expectedOutput : 0,
      explanation: 'Custom User Test Case'
    };
    const updated = [...testCases, newCase];
    onUpdateTestCases(updated);
    setSelectedCaseIndex(updated.length - 1);
  };

  // Delete custom testcase
  const handleDeleteCase = (index: number) => {
    if (!onUpdateTestCases || testCases.length <= 1) return;
    const updated = testCases.filter((_, i) => i !== index);
    onUpdateTestCases(updated);
    setSelectedCaseIndex(Math.max(0, index - 1));
  };

  // Start editing a parameter
  const handleStartEdit = (pIdx: number, val: any) => {
    setEditingInputIdx(pIdx);
    setEditBuffer(JSON.stringify(val));
  };

  // Save edited parameter
  const handleSaveEdit = (pIdx: number) => {
    if (!onUpdateTestCases || !currentInputCase) return;
    try {
      const parsedVal = JSON.parse(editBuffer);
      const updatedInput = [...currentInputCase.input];
      updatedInput[pIdx] = parsedVal;

      const updatedCases = testCases.map((tc, i) =>
        i === selectedCaseIndex ? { ...tc, input: updatedInput } : tc
      );
      onUpdateTestCases(updatedCases);
    } catch {
      const updatedInput = [...currentInputCase.input];
      updatedInput[pIdx] = isNaN(Number(editBuffer)) ? editBuffer : Number(editBuffer);
      const updatedCases = testCases.map((tc, i) =>
        i === selectedCaseIndex ? { ...tc, input: updatedInput } : tc
      );
      onUpdateTestCases(updatedCases);
    }
    setEditingInputIdx(null);
  };

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
      case 'COMPILE_ERROR':
        return (
          <div className="flex items-center space-x-2 text-rose-400 font-bold text-sm">
            <AlertTriangle className="w-4 h-4 text-rose-400" />
            <span>Compile Error</span>
            <span className="text-xs font-normal text-gray-400 ml-2">
              Compilation failed
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
            {executionResult?.errorMessage && (
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" title="Error in console" />
            )}
            {executionResult?.stdout && executionResult.stdout.length > 0 && (
              <span className="text-[10px] bg-[#333333] px-1 rounded-full text-gray-300">
                {executionResult.stdout.length}
              </span>
            )}
          </button>
        </div>

        {/* Custom Test Case Quick Action */}
        {activeTab === 'testcases' && onUpdateTestCases && (
          <button
            onClick={handleAddCustomCase}
            className="flex items-center space-x-1 text-[11px] font-semibold text-amber-400 hover:text-amber-300 px-2 py-0.5 rounded bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20 transition"
          >
            <Plus className="w-3 h-3" />
            <span>Add Custom Case</span>
          </button>
        )}
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-4 text-xs font-sans">
        {/* TAB 1: TEST CASES INPUT */}
        {activeTab === 'testcases' && (
          <div className="space-y-3">
            {/* Case Selector Pills */}
            <div className="flex items-center space-x-2 overflow-x-auto pb-1">
              {testCases.map((tc, idx) => (
                <div key={tc.id || idx} className="relative group/pill">
                  <button
                    onClick={() => setSelectedCaseIndex(idx)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center space-x-1.5 ${
                      selectedCaseIndex === idx
                        ? 'bg-[#333333] text-white font-semibold'
                        : 'bg-[#282828] text-gray-400 hover:text-gray-200'
                    }`}
                  >
                    <span>Case {idx + 1}</span>
                    {tc.id?.startsWith('custom') && (
                      <span className="text-[9px] bg-purple-500/20 text-purple-300 px-1 rounded">
                        Custom
                      </span>
                    )}
                  </button>

                  {/* Delete pill button if custom */}
                  {tc.id?.startsWith('custom') && testCases.length > 1 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteCase(idx);
                      }}
                      title="Delete custom testcase"
                      className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-600 text-white flex items-center justify-center opacity-0 group-hover/pill:opacity-100 transition shadow"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}

              {onUpdateTestCases && (
                <button
                  onClick={handleAddCustomCase}
                  title="Add custom test case"
                  className="p-1.5 rounded-lg bg-[#282828] hover:bg-[#333333] text-gray-400 hover:text-white transition"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Inputs list */}
            {currentInputCase && (
              <div className="space-y-3 mt-3">
                <div className="flex items-center justify-between text-[11px] text-gray-400 border-b border-[#2e2e2e] pb-1.5">
                  <span>Input Arguments (Click to edit)</span>
                  {currentInputCase.explanation && (
                    <span className="text-gray-500 italic">{currentInputCase.explanation}</span>
                  )}
                </div>

                {currentInputCase.input.map((val, pIdx) => {
                  const paramName = paramNames[pIdx] || `param${pIdx + 1}`;
                  const isEditing = editingInputIdx === pIdx;

                  return (
                    <div key={pIdx}>
                      <span className="text-gray-400 text-[11px] font-mono block mb-1">
                        {paramName} =
                      </span>
                      {isEditing ? (
                        <div className="flex items-center space-x-2">
                          <input
                            type="text"
                            value={editBuffer}
                            onChange={(e) => setEditBuffer(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') handleSaveEdit(pIdx);
                              else if (e.key === 'Escape') setEditingInputIdx(null);
                            }}
                            autoFocus
                            className="flex-1 p-2 rounded-lg bg-[#141414] border border-[#ffa116] text-gray-200 font-mono text-xs focus:outline-none"
                          />
                          <button
                            onClick={() => handleSaveEdit(pIdx)}
                            className="p-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white"
                          >
                            <Check className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <div
                          onClick={() => handleStartEdit(pIdx, val)}
                          className="p-2.5 rounded-lg bg-[#141414] hover:bg-[#1a1a1a] border border-[#2e2e2e] hover:border-[#444444] text-gray-200 font-mono flex items-center justify-between cursor-pointer transition group"
                        >
                          <span>{formatOutput(val)}</span>
                          <Edit3 className="w-3.5 h-3.5 text-gray-500 opacity-0 group-hover:opacity-100 transition" />
                        </div>
                      )}
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
                <p>Executing test cases in WebAssembly sandboxed runner...</p>
              </div>
            ) : executionResult ? (
              <div className="space-y-4">
                {/* Status banner */}
                <div className="p-3 bg-[#242424] rounded-lg border border-[#333333] flex items-center justify-between">
                  {getStatusBanner(executionResult)}
                </div>

                {/* Benchmark Bell Curve if Accepted */}
                {executionResult.status === 'ACCEPTED' && (
                  <PerformanceChart
                    runtimeMs={executionResult.totalTimeMs}
                    memoryKb={executionResult.memoryKb || 1280}
                    language={language}
                  />
                )}

                {/* Error message if Compile Error or Runtime Error */}
                {executionResult.errorMessage && (
                  <div className="p-3.5 rounded-lg bg-[#161616] border border-rose-800/60 shadow-lg">
                    <div className="flex items-center space-x-2 text-rose-400 text-xs font-bold mb-2">
                      <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                      <span>
                        {executionResult.status === 'COMPILE_ERROR'
                          ? 'Compilation Error (javac)'
                          : 'Execution / Runtime Error'}
                      </span>
                    </div>
                    <pre className="text-rose-300 font-mono text-[12px] whitespace-pre overflow-x-auto leading-relaxed bg-[#0d0d0d] p-3 rounded border border-rose-950/80 select-text">
                      {executionResult.errorMessage}
                    </pre>
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
                          <span className="text-gray-500 font-mono">
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

        {/* TAB 3: CONSOLE STDOUT & ERROR LOGS */}
        {activeTab === 'console' && (
          <div className="h-full space-y-3">
            {/* If there's an execution error, show clear error alert banner at top */}
            {executionResult?.errorMessage && (
              <div className="p-3.5 rounded-lg bg-[#161616] border border-rose-800/60 shadow-lg">
                <div className="flex items-center space-x-2 text-rose-400 text-xs font-bold mb-2">
                  <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                  <span>
                    {executionResult.status === 'COMPILE_ERROR'
                      ? 'Compilation Error (javac)'
                      : 'Execution / Runtime Error'}
                  </span>
                </div>
                <pre className="text-rose-300 font-mono text-[12px] whitespace-pre overflow-x-auto leading-relaxed bg-[#0d0d0d] p-3 rounded border border-rose-950/80 select-text">
                  {executionResult.errorMessage}
                </pre>
              </div>
            )}

            {/* Console logs */}
            {executionResult?.stdout && executionResult.stdout.length > 0 ? (
              <div className="bg-[#141414] border border-[#2e2e2e] rounded-lg p-3 font-mono text-xs space-y-1.5 overflow-x-auto">
                {executionResult.stdout.map((line, idx) => {
                  const isError = line.startsWith('[ERROR]');
                  const isFailed = line.startsWith('[FAILED]');
                  return (
                    <div
                      key={idx}
                      className={`leading-relaxed flex items-start space-x-2 p-1 rounded ${
                        isError
                          ? 'bg-rose-950/30 text-rose-300 border-l-2 border-rose-500 font-semibold'
                          : isFailed
                          ? 'bg-amber-950/20 text-amber-300 border-l-2 border-amber-500'
                          : 'text-gray-300'
                      }`}
                    >
                      <span className="text-gray-500 select-none">&gt;</span>
                      <span className="whitespace-pre-wrap break-all">{line}</span>
                    </div>
                  );
                })}
              </div>
            ) : !executionResult?.errorMessage ? (
              <div className="text-center py-8 text-gray-500">
                <p>No console output.</p>
                <p className="text-xs text-gray-600 mt-1">
                  Use <code className="text-amber-400">console.log(...)</code>, <code className="text-amber-400">print(...)</code>, or <code className="text-amber-400">System.out.println(...)</code> to print values here.
                </p>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};
