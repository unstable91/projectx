import React from 'react';
import { Problem } from '../../types';
import { Sparkles, Tag, CheckCircle, AlertCircle } from 'lucide-react';

interface ProblemDescriptionProps {
  problem: Problem;
}

export const ProblemDescription: React.FC<ProblemDescriptionProps> = ({ problem }) => {
  const getDifficultyBadge = (diff: string) => {
    switch (diff) {
      case 'Easy':
        return (
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            Easy
          </span>
        );
      case 'Medium':
        return (
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-500/10 text-[#ffa116] border border-amber-500/20">
            Medium
          </span>
        );
      case 'Hard':
        return (
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20">
            Hard
          </span>
        );
      default:
        return null;
    }
  };

  // Format markdown-like description into rich HTML sections
  const formatDescription = (rawText: string) => {
    const lines = rawText.split('\n');
    const elements: React.ReactNode[] = [];
    let inCodeBlock = false;
    let codeBuffer: string[] = [];

    lines.forEach((line, index) => {
      if (line.startsWith('```')) {
        if (inCodeBlock) {
          elements.push(
            <pre
              key={`code-${index}`}
              className="bg-[#141414] border border-[#2e2e2e] rounded-lg p-3 my-2 text-xs font-mono text-gray-300 overflow-x-auto"
            >
              <code>{codeBuffer.join('\n')}</code>
            </pre>
          );
          codeBuffer = [];
          inCodeBlock = false;
        } else {
          inCodeBlock = true;
        }
        return;
      }

      if (inCodeBlock) {
        codeBuffer.push(line);
        return;
      }

      if (line.startsWith('### ')) {
        elements.push(
          <h3
            key={`h3-${index}`}
            className="text-base font-bold text-white mt-4 mb-2 border-b border-[#2e2e2e] pb-1"
          >
            {line.replace('### ', '')}
          </h3>
        );
      } else if (line.startsWith('- ')) {
        elements.push(
          <li key={`li-${index}`} className="text-gray-300 text-sm ml-4 list-disc my-1">
            <span
              dangerouslySetInnerHTML={{
                __html: line
                  .replace('- ', '')
                  .replace(/`([^`]+)`/g, '<code class="bg-[#242424] text-amber-300 px-1.5 py-0.5 rounded text-xs font-mono">$1</code>')
              }}
            />
          </li>
        );
      } else if (line.trim().length > 0) {
        elements.push(
          <p key={`p-${index}`} className="text-gray-300 text-sm my-2 leading-relaxed">
            <span
              dangerouslySetInnerHTML={{
                __html: line
                  .replace(/`([^`]+)`/g, '<code class="bg-[#242424] text-amber-300 px-1.5 py-0.5 rounded text-xs font-mono">$1</code>')
                  .replace(/\*\*\*([^*]+)\*\*\*/g, '<strong><em>$1</em></strong>')
                  .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
                  .replace(/\*([^*]+)\*/g, '<em>$1</em>')
              }}
            />
          </p>
        );
      }
    });

    if (inCodeBlock && codeBuffer.length > 0) {
      elements.push(
        <pre
          key={`code-end`}
          className="bg-[#141414] border border-[#2e2e2e] rounded-lg p-3 my-2 text-xs font-mono text-gray-300 overflow-x-auto"
        >
          <code>{codeBuffer.join('\n')}</code>
        </pre>
      );
    }

    return elements;
  };

  return (
    <div className="p-5 overflow-y-auto h-full text-gray-200 space-y-4">
      {/* Title & Difficulty */}
      <div>
        <div className="flex items-center space-x-3 mb-2">
          <h1 className="text-xl font-bold text-white tracking-tight">{problem.title}</h1>
          {problem.isAiGenerated && (
            <span className="flex items-center space-x-1 px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20 text-xs font-medium">
              <Sparkles className="w-3 h-3" />
              <span>AI Generated</span>
            </span>
          )}
        </div>
        <div className="flex items-center space-x-3">
          {getDifficultyBadge(problem.difficulty)}
          <span className="text-xs text-gray-400 font-medium">{problem.category}</span>
          <span className="text-xs text-gray-500">•</span>
          <span className="text-xs text-gray-400">
            Acceptance: {problem.acceptanceRate ? `${problem.acceptanceRate}%` : '50%'}
          </span>
        </div>
      </div>

      {/* Description Content */}
      <div className="prose prose-invert max-w-none pt-2 border-t border-[#2e2e2e]">
        {formatDescription(problem.description)}
      </div>

      {/* Tags */}
      {problem.tags && problem.tags.length > 0 && (
        <div className="pt-4 border-t border-[#2e2e2e]">
          <div className="flex items-center space-x-1.5 text-xs text-gray-400 mb-2 font-medium">
            <Tag className="w-3.5 h-3.5" />
            <span>Related Topics</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {problem.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2.5 py-1 rounded-md bg-[#242424] text-gray-300 border border-[#333333]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
