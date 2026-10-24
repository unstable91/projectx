import React from 'react';
import { Search, Shuffle, Sparkles, Filter } from 'lucide-react';
import { Difficulty } from '../../types';

interface ProblemFilterProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedDifficulty: Difficulty | 'All';
  onDifficultyChange: (d: Difficulty | 'All') => void;
  selectedStatus: 'All' | 'solved' | 'attempted' | 'todo';
  onStatusChange: (s: 'All' | 'solved' | 'attempted' | 'todo') => void;
  selectedCategory: string;
  onCategoryChange: (c: string) => void;
  categories: string[];
  onPickRandom: () => void;
  onOpenAiGenerator: () => void;
}

export const ProblemFilter: React.FC<ProblemFilterProps> = ({
  searchQuery,
  onSearchChange,
  selectedDifficulty,
  onDifficultyChange,
  selectedStatus,
  onStatusChange,
  selectedCategory,
  onCategoryChange,
  categories,
  onPickRandom,
  onOpenAiGenerator
}) => {
  return (
    <div className="bg-[#242424] border border-[#333333] rounded-xl p-4 mb-6 space-y-4">
      {/* Top Row: Search & Actions */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        {/* Search Bar */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search problems by title, keywords, or tags..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-[#1a1a1a] border border-[#3a3a3a] rounded-lg pl-10 pr-4 py-2 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-[#ffa116] transition"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          <button
            onClick={onPickRandom}
            title="Solve a random problem"
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-lg bg-[#2e2e2e] hover:bg-[#383838] border border-[#3e3e3e] text-xs font-semibold text-gray-300 transition"
          >
            <Shuffle className="w-3.5 h-3.5 text-[#ffa116]" />
            <span>Pick Random</span>
          </button>

          <button
            onClick={onOpenAiGenerator}
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-[#ffa116] hover:brightness-110 text-xs font-bold text-black shadow-md shadow-[#ffa116]/20 transition"
          >
            <Sparkles className="w-3.5 h-3.5 fill-black" />
            <span>AI Problem Generator</span>
          </button>
        </div>
      </div>

      {/* Bottom Row: Filter Badges */}
      <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-[#2e2e2e]">
        {/* Difficulty Selector */}
        <div className="flex items-center space-x-1 bg-[#1a1a1a] p-1 rounded-lg border border-[#333333]">
          {(['All', 'Easy', 'Medium', 'Hard'] as const).map((diff) => (
            <button
              key={diff}
              onClick={() => onDifficultyChange(diff)}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition ${
                selectedDifficulty === diff
                  ? diff === 'Easy'
                    ? 'bg-emerald-500/20 text-emerald-400 font-semibold'
                    : diff === 'Medium'
                    ? 'bg-amber-500/20 text-[#ffa116] font-semibold'
                    : diff === 'Hard'
                    ? 'bg-rose-500/20 text-rose-400 font-semibold'
                    : 'bg-[#333333] text-white font-semibold'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              {diff}
            </button>
          ))}
        </div>

        {/* Status Selector */}
        <div className="flex items-center space-x-1 bg-[#1a1a1a] p-1 rounded-lg border border-[#333333]">
          {[
            { id: 'All', label: 'All Status' },
            { id: 'solved', label: 'Solved' },
            { id: 'attempted', label: 'Attempted' },
            { id: 'todo', label: 'Todo' }
          ].map((st) => (
            <button
              key={st.id}
              onClick={() => onStatusChange(st.id as any)}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition ${
                selectedStatus === st.id
                  ? 'bg-[#333333] text-white font-semibold'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              {st.label}
            </button>
          ))}
        </div>

        {/* Category Dropdown */}
        <div className="flex items-center space-x-2">
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="bg-[#1a1a1a] border border-[#333333] text-xs font-medium text-gray-300 rounded-lg px-3 py-1.5 focus:outline-none focus:border-[#ffa116]"
          >
            <option value="All">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
