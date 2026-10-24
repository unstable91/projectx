import React, { useState } from 'react';
import { Sparkles, Zap, Bug, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { Problem, TestCaseResult } from '../../types';
import { GeminiService } from '../../lib/gemini/geminiService';

interface AiTutorPanelProps {
  problem: Problem;
  userCode: string;
  language: string;
  lastFailedTestCase?: TestCaseResult;
  onOpenSettings: () => void;
}

export const AiTutorPanel: React.FC<AiTutorPanelProps> = ({
  problem,
  userCode,
  language,
  lastFailedTestCase,
  onOpenSettings
}) => {
  const [activeAnalysis, setActiveAnalysis] = useState<any | null>(null);
  const [debugExplanation, setDebugExplanation] = useState<string | null>(null);
  const [loadingAction, setLoadingAction] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const hasKey = GeminiService.hasApiKey();

  const handleAnalyzeComplexity = async () => {
    if (!hasKey) {
      setErrorMessage('Please set your Gemini API key in Settings.');
      return;
    }

    setLoadingAction('complexity');
    setErrorMessage(null);
    try {
      const res = await GeminiService.analyzeCodeAndComplexity(problem, userCode, language);
      setActiveAnalysis(res);
    } catch (err: any) {
      setErrorMessage(err.message || 'Complexity analysis failed.');
    } finally {
      setLoadingAction(null);
    }
  };

  const handleDebugFailingTest = async () => {
    if (!hasKey) {
      setErrorMessage('Please set your Gemini API key in Settings.');
      return;
    }
    if (!lastFailedTestCase) {
      setErrorMessage('No failing test case recorded yet. Run your code first.');
      return;
    }

    setLoadingAction('debug');
    setErrorMessage(null);
    try {
      const explanation = await GeminiService.debugFailingTestCase(
        problem,
        userCode,
        lastFailedTestCase
      );
      setDebugExplanation(explanation);
    } catch (err: any) {
      setErrorMessage(err.message || 'Debugging explanation failed.');
    } finally {
      setLoadingAction(null);
    }
  };

  return (
    <div className="p-5 overflow-y-auto h-full text-gray-200 space-y-5">
      {/* Header */}
      <div className="flex items-center space-x-2 pb-3 border-b border-[#2e2e2e]">
        <div className="w-7 h-7 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
          <Sparkles className="w-4 h-4 text-purple-400" />
        </div>
        <div>
          <h2 className="text-sm font-bold text-white">AI Mentor & Debugger</h2>
          <p className="text-[11px] text-gray-400">Powered by Google Gemini 2.5 Flash</p>
        </div>
      </div>

      {!hasKey && (
        <div className="p-3 rounded-xl bg-purple-950/20 border border-purple-800/40 text-xs text-purple-200 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 text-purple-400 flex-shrink-0" />
            <span>Add your Gemini API Key in Settings to enable real-time AI code mentoring.</span>
          </div>
          <button
            onClick={onOpenSettings}
            className="px-2.5 py-1 rounded bg-purple-600 hover:bg-purple-500 text-white font-semibold transition"
          >
            Configure
          </button>
        </div>
      )}

      {errorMessage && (
        <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-xs text-rose-300">
          {errorMessage}
        </div>
      )}

      {/* Action 1: Complexity Analyzer */}
      <div className="p-4 rounded-xl bg-[#242424] border border-[#333333] space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Zap className="w-4 h-4 text-amber-400" />
            <h3 className="text-xs font-bold text-white">Time & Space Complexity Audit</h3>
          </div>
          <button
            onClick={handleAnalyzeComplexity}
            disabled={loadingAction === 'complexity'}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#333333] hover:bg-[#3d3d3d] text-xs font-semibold text-gray-200 transition disabled:opacity-50"
          >
            {loadingAction === 'complexity' ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            )}
            <span>Analyze Complexity</span>
          </button>
        </div>

        {activeAnalysis && (
          <div className="pt-2 border-t border-[#2e2e2e] space-y-2 text-xs">
            <div className="grid grid-cols-2 gap-2">
              <div className="p-2.5 rounded-lg bg-[#1a1a1a] border border-[#333333]">
                <span className="text-[10px] text-gray-500 uppercase tracking-wider block font-semibold">
                  Time Complexity
                </span>
                <span className="text-amber-400 font-mono font-bold mt-0.5 block">
                  {activeAnalysis.timeComplexity}
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#1a1a1a] border border-[#333333]">
                <span className="text-[10px] text-gray-500 uppercase tracking-wider block font-semibold">
                  Space Complexity
                </span>
                <span className="text-purple-400 font-mono font-bold mt-0.5 block">
                  {activeAnalysis.spaceComplexity}
                </span>
              </div>
            </div>

            <p className="text-gray-300 leading-relaxed bg-[#1e1e1e] p-2.5 rounded-lg">
              {activeAnalysis.analysis}
            </p>

            {activeAnalysis.suggestions && activeAnalysis.suggestions.length > 0 && (
              <div className="space-y-1">
                <span className="text-[11px] font-semibold text-gray-400">Optimization Suggestions:</span>
                <ul className="list-disc ml-4 space-y-1 text-gray-300">
                  {activeAnalysis.suggestions.map((sug: string, i: number) => (
                    <li key={i}>{sug}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Action 2: Failing Test Case Debugger */}
      <div className="p-4 rounded-xl bg-[#242424] border border-[#333333] space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bug className="w-4 h-4 text-rose-400" />
            <h3 className="text-xs font-bold text-white">Debug Failing Test Case</h3>
          </div>
          <button
            onClick={handleDebugFailingTest}
            disabled={loadingAction === 'debug'}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#333333] hover:bg-[#3d3d3d] text-xs font-semibold text-gray-200 transition disabled:opacity-50"
          >
            {loadingAction === 'debug' ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Bug className="w-3.5 h-3.5 text-rose-400" />
            )}
            <span>Explain Failure</span>
          </button>
        </div>

        {lastFailedTestCase ? (
          <div className="text-xs text-gray-400 bg-[#1a1a1a] p-2.5 rounded-lg border border-[#333333] font-mono">
            <div>Input: {JSON.stringify(lastFailedTestCase.input)}</div>
            <div>Expected: {JSON.stringify(lastFailedTestCase.expectedOutput)}</div>
            <div className="text-rose-400">Actual: {JSON.stringify(lastFailedTestCase.actualOutput)}</div>
          </div>
        ) : (
          <p className="text-xs text-gray-500">
            Run your code on test cases first. If any test case fails, click "Explain Failure" for an instant diagnosis.
          </p>
        )}

        {debugExplanation && (
          <div className="p-3 rounded-lg bg-rose-950/20 border border-rose-800/30 text-xs text-gray-200 leading-relaxed whitespace-pre-line">
            {debugExplanation}
          </div>
        )}
      </div>
    </div>
  );
};
