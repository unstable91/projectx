import React from 'react';
import { Trophy, CheckCircle, Zap, Target } from 'lucide-react';
import { Problem, UserProfile, UserProgress } from '../../types';

interface ProblemStatsProps {
  problems: Problem[];
  userProfile: UserProfile;
  progressMap: Record<string, UserProgress>;
}

export const ProblemStats: React.FC<ProblemStatsProps> = ({
  problems,
  userProfile,
  progressMap
}) => {
  const totalProblems = problems.length;
  
  // Count solved by difficulty
  let easyTotal = 0;
  let mediumTotal = 0;
  let hardTotal = 0;

  let easySolved = 0;
  let mediumSolved = 0;
  let hardSolved = 0;

  problems.forEach((p) => {
    if (p.difficulty === 'Easy') easyTotal++;
    else if (p.difficulty === 'Medium') mediumTotal++;
    else if (p.difficulty === 'Hard') hardTotal++;

    const isSolved = progressMap[p.id]?.status === 'solved' || progressMap[p.slug]?.status === 'solved';
    if (isSolved) {
      if (p.difficulty === 'Easy') easySolved++;
      else if (p.difficulty === 'Medium') mediumSolved++;
      else if (p.difficulty === 'Hard') hardSolved++;
    }
  });

  const totalSolved = easySolved + mediumSolved + hardSolved;
  const overallPercent = totalProblems > 0 ? Math.round((totalSolved / totalProblems) * 100) : 0;

  const easyPercent = easyTotal > 0 ? Math.round((easySolved / easyTotal) * 100) : 0;
  const mediumPercent = mediumTotal > 0 ? Math.round((mediumSolved / mediumTotal) * 100) : 0;
  const hardPercent = hardTotal > 0 ? Math.round((hardSolved / hardTotal) * 100) : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      {/* Total Solved Card */}
      <div className="bg-[#242424] border border-[#333333] rounded-xl p-4 flex items-center justify-between">
        <div>
          <p className="text-xs font-medium text-gray-400">Total Solved</p>
          <div className="flex items-baseline space-x-2 mt-1">
            <span className="text-3xl font-extrabold text-white">{totalSolved}</span>
            <span className="text-sm text-gray-500">/ {totalProblems}</span>
          </div>
          <div className="flex items-center space-x-1.5 mt-2 text-xs text-emerald-400 font-medium">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>{overallPercent}% Completion</span>
          </div>
        </div>

        {/* Circular Progress Ring */}
        <div className="relative w-16 h-16 flex items-center justify-center">
          <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
            <path
              className="text-[#333333]"
              strokeWidth="3.5"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className="text-[#ffa116]"
              strokeDasharray={`${overallPercent}, 100`}
              strokeWidth="3.5"
              strokeLinecap="round"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          <div className="absolute text-[11px] font-bold text-white">
            {overallPercent}%
          </div>
        </div>
      </div>

      {/* Easy Breakdown */}
      <div className="bg-[#242424] border border-[#333333] rounded-xl p-4 flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            Easy
          </span>
          <span className="text-xs font-medium text-gray-400">
            {easySolved} / {easyTotal}
          </span>
        </div>
        <div className="mt-3">
          <div className="w-full bg-[#1c1c1c] rounded-full h-2 overflow-hidden">
            <div
              className="bg-emerald-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${easyPercent}%` }}
            />
          </div>
        </div>
        <p className="text-[11px] text-gray-400 mt-2">
          {easyPercent}% mastered
        </p>
      </div>

      {/* Medium Breakdown */}
      <div className="bg-[#242424] border border-[#333333] rounded-xl p-4 flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold px-2 py-0.5 rounded bg-amber-500/10 text-[#ffa116] border border-amber-500/20">
            Medium
          </span>
          <span className="text-xs font-medium text-gray-400">
            {mediumSolved} / {mediumTotal}
          </span>
        </div>
        <div className="mt-3">
          <div className="w-full bg-[#1c1c1c] rounded-full h-2 overflow-hidden">
            <div
              className="bg-[#ffa116] h-2 rounded-full transition-all duration-500"
              style={{ width: `${mediumPercent}%` }}
            />
          </div>
        </div>
        <p className="text-[11px] text-gray-400 mt-2">
          {mediumPercent}% mastered
        </p>
      </div>

      {/* Hard Breakdown */}
      <div className="bg-[#242424] border border-[#333333] rounded-xl p-4 flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20">
            Hard
          </span>
          <span className="text-xs font-medium text-gray-400">
            {hardSolved} / {hardTotal}
          </span>
        </div>
        <div className="mt-3">
          <div className="w-full bg-[#1c1c1c] rounded-full h-2 overflow-hidden">
            <div
              className="bg-rose-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${hardPercent}%` }}
            />
          </div>
        </div>
        <p className="text-[11px] text-gray-400 mt-2">
          {hardPercent}% mastered
        </p>
      </div>
    </div>
  );
};
