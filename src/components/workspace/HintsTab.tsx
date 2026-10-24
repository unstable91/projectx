import React, { useState } from 'react';
import { Lightbulb, ChevronDown, ChevronRight, Sparkles, Loader2, AlertCircle } from 'lucide-react';
import { Problem } from '../../types';
import { GeminiService } from '../../lib/gemini/geminiService';

interface HintsTabProps {
  problem: Problem;
  userCode: string;
  onOpenSettings: () => void;
}

export const HintsTab: React.FC<HintsTabProps> = ({ problem, userCode, onOpenSettings }) => {
  const [openHints, setOpenHints] = useState<Record<number, boolean>>({});
  const [aiHint, setAiHint] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  const toggleHint = (index: number) => {
    setOpenHints((prev) => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const handleRequestAiHint = async () => {
    if (!GeminiService.hasApiKey()) {
      setAiError('Please set your Gemini API key in Settings to use the AI Hint feature.');
      return;
    }

    setIsAiLoading(true);
    setAiError(null);
    try {
      const hint = await GeminiService.getAiHint(problem, userCode, 2);
      setAiHint(hint);
    } catch (err: any) {
      setAiError(err.message || 'Failed to fetch AI hint.');
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <div className="p-5 overflow-y-auto h-full text-gray-200 space-y-5">
      {/* Header */}
      <div className="flex items-center space-x-2 text-white">
        <Lightbulb className="w-5 h-5 text-[#ffa116]" />
        <h2 className="text-lg font-bold">Problem Hints & Guidance</h2>
      </div>

      {/* Standard Progressive Hints */}
      <div className="space-y-3">
        {problem.hints && problem.hints.length > 0 ? (
          problem.hints.map((hint, idx) => {
            const isOpen = !!openHints[idx];
            return (
              <div
                key={idx}
                className="border border-[#333333] bg-[#242424] rounded-xl overflow-hidden transition"
              >
                <button
                  onClick={() => toggleHint(idx)}
                  className="w-full flex items-center justify-between p-3.5 text-left text-sm font-semibold text-gray-200 hover:bg-[#2c2c2c] transition"
                >
                  <span className="flex items-center space-x-2">
                    <span className="w-5 h-5 rounded-full bg-[#ffa116]/10 text-[#ffa116] flex items-center justify-center text-xs font-bold">
                      {idx + 1}
                    </span>
                    <span>Hint {idx + 1}</span>
                  </span>
                  {isOpen ? (
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  )}
                </button>
                {isOpen && (
                  <div className="p-4 pt-1 text-sm text-gray-300 border-t border-[#2e2e2e] leading-relaxed bg-[#1e1e1e]/50">
                    {hint}
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <p className="text-sm text-gray-400">No static hints available for this problem.</p>
        )}
      </div>

      {/* AI Context-Aware Hint Section */}
      <div className="mt-6 p-4 rounded-xl border border-purple-500/30 bg-purple-950/10">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <h3 className="text-sm font-bold text-white">Ask Gemini AI for a Personalized Hint</h3>
          </div>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">
            Code-Aware
          </span>
        </div>
        <p className="text-xs text-gray-400 mb-3">
          Gemini will inspect your current code in the editor and give you a tailor-made nudge based on your specific strategy.
        </p>

        {aiError && (
          <div className="mb-3 p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-xs text-rose-300 flex items-center justify-between">
            <div className="flex items-center space-x-1.5">
              <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
              <span>{aiError}</span>
            </div>
            {!GeminiService.hasApiKey() && (
              <button
                onClick={onOpenSettings}
                className="underline font-semibold ml-2 hover:text-white"
              >
                Set Key
              </button>
            )}
          </div>
        )}

        {aiHint && (
          <div className="p-3.5 mb-3 rounded-lg bg-[#1a1a1a] border border-purple-500/20 text-sm text-purple-200 leading-relaxed">
            {aiHint}
          </div>
        )}

        <button
          onClick={handleRequestAiHint}
          disabled={isAiLoading}
          className="flex items-center space-x-2 px-3.5 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-md shadow-purple-600/20 transition disabled:opacity-50"
        >
          {isAiLoading ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>Analyzing code & generating hint...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-3.5 h-3.5" />
              <span>{aiHint ? 'Ask for Another Hint' : 'Get Contextual AI Hint'}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
