import React, { useState } from 'react';
import { 
  Sparkles, 
  X, 
  Loader2, 
  CheckCircle2, 
  AlertCircle, 
  Code2, 
  ArrowRight,
  BookOpen
} from 'lucide-react';
import { Difficulty, Problem } from '../../types';
import { GeminiService } from '../../lib/gemini/geminiService';
import { StorageService } from '../../lib/storage/storageService';

interface AiProblemGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProblemCreated: (problem: Problem) => void;
  onOpenSettings: () => void;
}

const TOPICS = [
  'Arrays & Hashing',
  'Two Pointers',
  'Sliding Window',
  'Stack',
  'Binary Search',
  'Linked List',
  'Trees & Binary Search Trees',
  'Tries',
  'Heap / Priority Queue',
  'Backtracking',
  'Graphs (BFS / DFS)',
  'Dynamic Programming (1D / 2D)',
  'Greedy Algorithms',
  'Bit Manipulation',
  'Math & Geometry'
];

export const AiProblemGeneratorModal: React.FC<AiProblemGeneratorModalProps> = ({
  isOpen,
  onClose,
  onProblemCreated,
  onOpenSettings
}) => {
  const [topic, setTopic] = useState('Dynamic Programming (1D / 2D)');
  const [difficulty, setDifficulty] = useState<Difficulty>('Medium');
  const [customPrompt, setCustomPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [generatedProblem, setGeneratedProblem] = useState<Problem | null>(null);

  if (!isOpen) return null;

  const hasApiKey = GeminiService.hasApiKey();

  const handleGenerate = async () => {
    if (!hasApiKey) {
      setErrorMessage('Gemini API key is required. Please set it in Settings.');
      return;
    }

    setIsGenerating(true);
    setErrorMessage(null);
    setGeneratedProblem(null);

    try {
      const problem = await GeminiService.generateProblem({
        topic,
        difficulty,
        customPrompt: customPrompt.trim() || undefined
      });

      // Save immediately to storage & Supabase
      await StorageService.saveProblem(problem);
      setGeneratedProblem(problem);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to generate problem with Gemini API.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSolveImmediately = () => {
    if (generatedProblem) {
      onProblemCreated(generatedProblem);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#1e1e1e] border border-[#3a3a3a] rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl">
        {/* Modal Header */}
        <div className="p-4 bg-[#252525] border-b border-[#333333] flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 to-amber-500 flex items-center justify-center shadow-lg shadow-purple-600/20">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white flex items-center gap-1.5">
                AI Coding Problem Generator
                <span className="text-[10px] bg-purple-500/10 text-purple-300 border border-purple-500/20 px-1.5 py-0.2 rounded font-semibold">
                  Gemini 2.5 Flash
                </span>
              </h2>
              <p className="text-xs text-gray-400">
                Generate tailored LeetCode problems with full test cases, hints, and explanations.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-gray-400 hover:text-white hover:bg-[#333333] transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto flex-1 space-y-4">
          {!hasApiKey && (
            <div className="p-3 rounded-xl bg-purple-950/20 border border-purple-800/40 text-xs text-purple-200 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 text-purple-400 flex-shrink-0" />
                <span>You need a Gemini API Key to generate new problems.</span>
              </div>
              <button
                onClick={onOpenSettings}
                className="px-2.5 py-1 rounded bg-purple-600 hover:bg-purple-500 text-white font-semibold transition"
              >
                Configure Key
              </button>
            </div>
          )}

          {errorMessage && (
            <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-xs text-rose-300">
              {errorMessage}
            </div>
          )}

          {/* Form Controls */}
          {!generatedProblem ? (
            <div className="space-y-4">
              {/* Topic Select */}
              <div>
                <label className="text-xs font-semibold text-gray-300 block mb-1.5">
                  Algorithm Category / Data Structure
                </label>
                <select
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full bg-[#141414] border border-[#333333] rounded-lg p-2.5 text-xs text-gray-200 focus:outline-none focus:border-[#ffa116]"
                >
                  {TOPICS.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              {/* Difficulty Select */}
              <div>
                <label className="text-xs font-semibold text-gray-300 block mb-1.5">
                  Difficulty Level
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Easy', 'Medium', 'Hard'] as const).map((diff) => (
                    <button
                      key={diff}
                      type="button"
                      onClick={() => setDifficulty(diff)}
                      className={`p-2 rounded-lg text-xs font-bold border transition ${
                        difficulty === diff
                          ? diff === 'Easy'
                            ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                            : diff === 'Medium'
                            ? 'bg-amber-500/20 text-[#ffa116] border-amber-500/40'
                            : 'bg-rose-500/20 text-rose-400 border-rose-500/40'
                          : 'bg-[#141414] text-gray-400 border-[#333333] hover:border-gray-500'
                      }`}
                    >
                      {diff}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Prompt / Scenario */}
              <div>
                <label className="text-xs font-semibold text-gray-300 block mb-1.5">
                  Custom Theme or Scenario (Optional)
                </label>
                <textarea
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                  placeholder="e.g., 'Create a problem about scheduling meetings with room capacities' or 'Design a rate limiter sliding window algorithm'"
                  rows={3}
                  className="w-full bg-[#141414] border border-[#333333] rounded-lg p-2.5 text-xs text-gray-200 placeholder-gray-500 focus:outline-none focus:border-[#ffa116]"
                />
              </div>
            </div>
          ) : (
            /* Generated Problem Preview */
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-[#141414] border border-[#333333] space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-white">{generatedProblem.title}</h3>
                  <span
                    className={`text-xs font-semibold px-2 py-0.5 rounded ${
                      generatedProblem.difficulty === 'Easy'
                        ? 'bg-emerald-500/10 text-emerald-400'
                        : generatedProblem.difficulty === 'Medium'
                        ? 'bg-amber-500/10 text-[#ffa116]'
                        : 'bg-rose-500/10 text-rose-400'
                    }`}
                  >
                    {generatedProblem.difficulty}
                  </span>
                </div>
                <div className="text-xs text-gray-400 line-clamp-3">
                  {generatedProblem.description.replace(/###/g, '')}
                </div>
                <div className="flex items-center space-x-3 text-xs text-gray-400 pt-2 border-t border-[#2e2e2e]">
                  <span>{generatedProblem.sampleTestCases.length} Sample Cases</span>
                  <span>•</span>
                  <span>{generatedProblem.hiddenTestCases.length} Hidden Cases</span>
                  <span>•</span>
                  <span>{generatedProblem.hints.length} Hints</span>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-800/40 text-emerald-300 text-xs flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>
                  Problem generated and saved to your library! You can solve it right now.
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#252525] border-t border-[#333333] flex items-center justify-end space-x-2.5">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-xs font-semibold text-gray-400 hover:text-white hover:bg-[#333333] transition"
          >
            Cancel
          </button>

          {!generatedProblem ? (
            <button
              onClick={handleGenerate}
              disabled={isGenerating || !hasApiKey}
              className="flex items-center space-x-2 px-5 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-amber-500 hover:brightness-110 text-white text-xs font-bold shadow-lg shadow-purple-600/20 transition disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Synthesizing problem with Gemini...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Generate Problem</span>
                </>
              )}
            </button>
          ) : (
            <button
              onClick={handleSolveImmediately}
              className="flex items-center space-x-2 px-5 py-2 rounded-lg bg-[#ffa116] hover:brightness-110 text-black text-xs font-bold shadow-lg shadow-[#ffa116]/20 transition"
            >
              <span>Solve Problem Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
