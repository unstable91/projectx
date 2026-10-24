import React from 'react';
import { CheckCircle2, Clock, Circle, Sparkles, ArrowRight } from 'lucide-react';
import { Problem, UserProgress } from '../../types';

interface ProblemListProps {
  problems: Problem[];
  progressMap: Record<string, UserProgress>;
  onSelectProblem: (problem: Problem) => void;
}

export const ProblemList: React.FC<ProblemListProps> = ({
  problems,
  progressMap,
  onSelectProblem
}) => {
  if (problems.length === 0) {
    return (
      <div className="bg-[#242424] border border-[#333333] rounded-xl p-12 text-center">
        <p className="text-gray-400 text-sm">No problems found matching your filters.</p>
        <p className="text-gray-600 text-xs mt-1">Try resetting the difficulty or search terms.</p>
      </div>
    );
  }

  const getDifficultyBadge = (diff: string) => {
    switch (diff) {
      case 'Easy':
        return (
          <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            Easy
          </span>
        );
      case 'Medium':
        return (
          <span className="text-xs font-semibold px-2 py-0.5 rounded bg-amber-500/10 text-[#ffa116] border border-amber-500/20">
            Medium
          </span>
        );
      case 'Hard':
        return (
          <span className="text-xs font-semibold px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20">
            Hard
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-[#242424] border border-[#333333] rounded-xl overflow-hidden shadow-xl">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#1e1e1e] border-b border-[#333333] text-gray-400 text-xs font-semibold uppercase tracking-wider">
            <tr>
              <th className="py-3 px-4 w-12 text-center">Status</th>
              <th className="py-3 px-4">Title</th>
              <th className="py-3 px-4 w-28">Difficulty</th>
              <th className="py-3 px-4 w-44">Category</th>
              <th className="py-3 px-4 w-32">Acceptance</th>
              <th className="py-3 px-4 w-24 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#2a2a2a]">
            {problems.map((prob, index) => {
              const userProg = progressMap[prob.id] || progressMap[prob.slug];
              const isSolved = userProg?.status === 'solved';
              const isAttempted = userProg?.status === 'attempted';

              return (
                <tr
                  key={prob.id}
                  onClick={() => onSelectProblem(prob)}
                  className={`hover:bg-[#2c2c2c] transition cursor-pointer group ${
                    index % 2 === 0 ? 'bg-[#242424]' : 'bg-[#212121]'
                  }`}
                >
                  {/* Status Icon */}
                  <td className="py-3.5 px-4 text-center">
                    {isSolved ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 mx-auto" />
                    ) : isAttempted ? (
                      <Clock className="w-4 h-4 text-amber-400 mx-auto" />
                    ) : (
                      <Circle className="w-3.5 h-3.5 text-gray-600 mx-auto group-hover:text-gray-400" />
                    )}
                  </td>

                  {/* Title & Tags */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-gray-200 group-hover:text-[#ffa116] transition">
                        {prob.title}
                      </span>
                      {prob.isAiGenerated && (
                        <span className="flex items-center space-x-1 px-1.5 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20 text-[10px] font-medium">
                          <Sparkles className="w-2.5 h-2.5" />
                          <span>AI</span>
                        </span>
                      )}
                    </div>
                    {prob.tags && prob.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {prob.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] px-1.5 py-0.2 rounded bg-[#1c1c1c] text-gray-400 border border-[#333333]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </td>

                  {/* Difficulty */}
                  <td className="py-3.5 px-4">{getDifficultyBadge(prob.difficulty)}</td>

                  {/* Category */}
                  <td className="py-3.5 px-4 text-gray-400 text-xs font-medium">
                    {prob.category}
                  </td>

                  {/* Acceptance Rate */}
                  <td className="py-3.5 px-4 text-gray-300 text-xs font-medium">
                    {prob.acceptanceRate ? `${prob.acceptanceRate}%` : '50.0%'}
                  </td>

                  {/* Action */}
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectProblem(prob);
                      }}
                      className="px-3 py-1 rounded bg-[#333333] hover:bg-[#ffa116] hover:text-black text-xs font-semibold text-gray-300 transition flex items-center space-x-1 ml-auto"
                    >
                      <span>Solve</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
