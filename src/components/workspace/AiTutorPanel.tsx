import React, { useState } from 'react';
import { 
  Sparkles, 
  Zap, 
  Bug, 
  CheckCircle, 
  AlertCircle, 
  Loader2, 
  Languages, 
  ShieldAlert, 
  Copy, 
  Check, 
  ArrowRight 
} from 'lucide-react';
import { Problem, SupportedLanguage, TestCaseResult } from '../../types';
import { GeminiService } from '../../lib/gemini/geminiService';

interface AiTutorPanelProps {
  problem: Problem;
  userCode: string;
  language: SupportedLanguage;
  lastFailedTestCase?: TestCaseResult;
  onOpenSettings: () => void;
  onApplyTranslatedCode?: (newCode: string, targetLang: SupportedLanguage) => void;
}

export const AiTutorPanel: React.FC<AiTutorPanelProps> = ({
  problem,
  userCode,
  language,
  lastFailedTestCase,
  onOpenSettings,
  onApplyTranslatedCode
}) => {
  const [activeAnalysis, setActiveAnalysis] = useState<any | null>(null);
  const [debugExplanation, setDebugExplanation] = useState<string | null>(null);
  const [edgeCases, setEdgeCases] = useState<Array<{ title: string; input: string; reason: string }> | null>(null);

  // Translation state
  const [targetLang, setTargetLang] = useState<SupportedLanguage>('python');
  const [translatedResult, setTranslatedResult] = useState<{ translatedCode: string; notes: string } | null>(null);
  const [copiedTranslated, setCopiedTranslated] = useState(false);

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

  const handleSuggestEdgeCases = async () => {
    if (!hasKey) {
      setErrorMessage('Please set your Gemini API key in Settings.');
      return;
    }

    setLoadingAction('edgeCases');
    setErrorMessage(null);
    try {
      const cases = await GeminiService.suggestEdgeCases(problem, userCode);
      setEdgeCases(cases);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to brainstorm edge cases.');
    } finally {
      setLoadingAction(null);
    }
  };

  const handleTranslateCode = async () => {
    if (!hasKey) {
      setErrorMessage('Please set your Gemini API key in Settings.');
      return;
    }

    setLoadingAction('translate');
    setErrorMessage(null);
    try {
      const res = await GeminiService.translateCode(
        userCode,
        language,
        targetLang,
        problem.title
      );
      setTranslatedResult(res);
    } catch (err: any) {
      setErrorMessage(err.message || 'Code translation failed.');
    } finally {
      setLoadingAction(null);
    }
  };

  const handleCopyTranslated = () => {
    if (translatedResult) {
      navigator.clipboard.writeText(translatedResult.translatedCode);
      setCopiedTranslated(true);
      setTimeout(() => setCopiedTranslated(false), 2000);
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
          <h2 className="text-sm font-bold text-white">AI Mentor & Polyglot Assistant</h2>
          <p className="text-[11px] text-gray-400">Powered by Google Gemini 2.5 Flash</p>
        </div>
      </div>

      {!hasKey && (
        <div className="p-3 rounded-xl bg-purple-950/20 border border-purple-800/40 text-xs text-purple-200 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 text-purple-400 flex-shrink-0" />
            <span>Add your Gemini API Key in Settings to unlock AI tools.</span>
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

      {/* TOOL 1: Polyglot Language Translator */}
      <div className="p-4 rounded-xl bg-[#242424] border border-[#333333] space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Languages className="w-4 h-4 text-blue-400" />
            <h3 className="text-xs font-bold text-white">AI Language Translator</h3>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-[11px] text-gray-400">To:</span>
            <select
              value={targetLang}
              onChange={(e) => setTargetLang(e.target.value as SupportedLanguage)}
              className="bg-[#141414] border border-[#333333] text-[11px] text-gray-200 rounded px-2 py-1"
            >
              {(['javascript', 'python', 'cpp', 'java'] as SupportedLanguage[])
                .filter((l) => l !== language)
                .map((l) => (
                  <option key={l} value={l}>
                    {l.toUpperCase()}
                  </option>
                ))}
            </select>
            <button
              onClick={handleTranslateCode}
              disabled={loadingAction === 'translate'}
              className="px-2.5 py-1 rounded bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition disabled:opacity-50"
            >
              {loadingAction === 'translate' ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                'Translate'
              )}
            </button>
          </div>
        </div>

        {translatedResult && (
          <div className="pt-2 border-t border-[#2e2e2e] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-gray-400">
                Translated {targetLang.toUpperCase()} Solution
              </span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleCopyTranslated}
                  className="flex items-center space-x-1 text-xs text-gray-400 hover:text-white transition"
                >
                  {copiedTranslated ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
                {onApplyTranslatedCode && (
                  <button
                    onClick={() => onApplyTranslatedCode(translatedResult.translatedCode, targetLang)}
                    className="flex items-center space-x-1 text-xs text-blue-400 hover:text-blue-300 font-semibold"
                  >
                    <span>Load in Editor</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>

            <pre className="p-3 rounded-lg bg-[#141414] border border-[#2e2e2e] text-xs font-mono text-gray-200 overflow-x-auto max-h-48 leading-relaxed">
              <code>{translatedResult.translatedCode}</code>
            </pre>
            <p className="text-[11px] text-gray-400 italic bg-[#1a1a1a] p-2 rounded">
              {translatedResult.notes}
            </p>
          </div>
        )}
      </div>

      {/* TOOL 2: Edge Case Hunter */}
      <div className="p-4 rounded-xl bg-[#242424] border border-[#333333] space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ShieldAlert className="w-4 h-4 text-emerald-400" />
            <h3 className="text-xs font-bold text-white">Edge Case Hunter</h3>
          </div>
          <button
            onClick={handleSuggestEdgeCases}
            disabled={loadingAction === 'edgeCases'}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#333333] hover:bg-[#3d3d3d] text-xs font-semibold text-gray-200 transition disabled:opacity-50"
          >
            {loadingAction === 'edgeCases' ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <ShieldAlert className="w-3.5 h-3.5 text-emerald-400" />
            )}
            <span>Brainstorm Edge Cases</span>
          </button>
        </div>

        {edgeCases && (
          <div className="pt-2 border-t border-[#2e2e2e] space-y-2">
            {edgeCases.map((ec, i) => (
              <div key={i} className="p-2.5 rounded-lg bg-[#141414] border border-[#2e2e2e] space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-gray-200 text-xs">{ec.title}</span>
                  <code className="text-[10px] text-amber-400 bg-[#222222] px-1.5 py-0.5 rounded font-mono">
                    {ec.input}
                  </code>
                </div>
                <p className="text-[11px] text-gray-400">{ec.reason}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* TOOL 3: Complexity Analyzer */}
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

      {/* TOOL 4: Failing Test Case Debugger */}
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
