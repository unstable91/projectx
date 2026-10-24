import React, { useState } from 'react';
import { BookOpen, Copy, Check, EyeOff, Eye } from 'lucide-react';
import { Problem } from '../../types';

interface SolutionTabProps {
  problem: Problem;
}

export const SolutionTab: React.FC<SolutionTabProps> = ({ problem }) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (problem.starterCode.javascript) {
      navigator.clipboard.writeText(problem.starterCode.javascript);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!isRevealed) {
    return (
      <div className="p-8 text-center h-full flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-[#242424] border border-[#333333] flex items-center justify-center text-[#ffa116]">
          <BookOpen className="w-6 h-6" />
        </div>
        <h3 className="text-base font-bold text-white">Official Solution & Explanation</h3>
        <p className="text-xs text-gray-400 max-w-sm">
          Looking at the solution before attempting the problem can hinder learning.
          We recommend trying for at least 15 minutes or checking the hints first.
        </p>
        <button
          onClick={() => setIsRevealed(true)}
          className="flex items-center space-x-1.5 px-4 py-2 rounded-lg bg-[#ffa116] hover:brightness-110 text-black text-xs font-bold shadow-md shadow-[#ffa116]/20 transition"
        >
          <Eye className="w-4 h-4" />
          <span>Reveal Solution</span>
        </button>
      </div>
    );
  }

  return (
    <div className="p-5 overflow-y-auto h-full text-gray-200 space-y-5">
      <div className="flex items-center justify-between pb-3 border-b border-[#2e2e2e]">
        <div className="flex items-center space-x-2">
          <BookOpen className="w-5 h-5 text-[#ffa116]" />
          <h2 className="text-lg font-bold text-white">Editorial Solution</h2>
        </div>
        <button
          onClick={() => setIsRevealed(false)}
          className="flex items-center space-x-1 text-xs text-gray-400 hover:text-gray-200 transition"
        >
          <EyeOff className="w-3.5 h-3.5" />
          <span>Hide</span>
        </button>
      </div>

      {/* Explanation Text */}
      <div className="text-sm text-gray-300 leading-relaxed whitespace-pre-line font-sans space-y-3">
        {problem.solutionExplanation || 'No editorial writeup available for this problem.'}
      </div>

      {/* Reference Solution Code */}
      <div className="border border-[#333333] rounded-xl overflow-hidden bg-[#181818] mt-4">
        <div className="flex items-center justify-between px-4 py-2 bg-[#212121] border-b border-[#2e2e2e]">
          <span className="text-xs font-semibold text-gray-300">Reference Implementation (JavaScript)</span>
          <button
            onClick={handleCopy}
            className="flex items-center space-x-1 text-xs text-gray-400 hover:text-gray-200 transition"
          >
            {copied ? (
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
        </div>
        <pre className="p-4 text-xs font-mono text-gray-200 overflow-x-auto bg-[#141414]">
          <code>{problem.starterCode.javascript}</code>
        </pre>
      </div>
    </div>
  );
};
