import React from 'react';
import { 
  Trophy, 
  GitFork, 
  Brain, 
  Compass, 
  ArrowRight, 
  CheckCircle2, 
  BookOpen,
  Sparkles
} from 'lucide-react';
import { StudyPlan, STUDY_PLANS } from '../../data/studyPlans';
import { Problem, UserProgress } from '../../types';

interface StudyPlansViewProps {
  progressMap: Record<string, UserProgress>;
  problems: Problem[];
  onSelectPlan: (plan: StudyPlan) => void;
  onSelectProblem: (problem: Problem) => void;
}

export const StudyPlansView: React.FC<StudyPlansViewProps> = ({
  progressMap,
  problems,
  onSelectPlan,
  onSelectProblem
}) => {
  const getIcon = (name: string, color: string) => {
    switch (name) {
      case 'Trophy':
        return <Trophy className="w-5 h-5" style={{ color }} />;
      case 'GitFork':
        return <GitFork className="w-5 h-5" style={{ color }} />;
      case 'Brain':
        return <Brain className="w-5 h-5" style={{ color }} />;
      default:
        return <Compass className="w-5 h-5" style={{ color }} />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      {/* Hero Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-[#242424] via-[#202020] to-[#1a1a1a] border border-[#333333] shadow-xl">
        <div className="flex items-center space-x-2 text-xs font-semibold text-[#ffa116] uppercase tracking-wider mb-2">
          <Sparkles className="w-4 h-4" />
          <span>Curated Interview Roadmaps</span>
        </div>
        <h1 className="text-2xl font-extrabold text-white tracking-tight">
          Structured Study Plans & Syllabus
        </h1>
        <p className="text-xs text-gray-400 max-w-2xl mt-1 leading-relaxed">
          Follow battle-tested learning roadmaps designed by FAANG engineers to build pattern recognition and algorithmic problem-solving instincts.
        </p>
      </div>

      {/* Grid of Study Plans */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {STUDY_PLANS.map((plan) => {
          // Count solved problems in this plan
          let solvedCount = 0;
          plan.problemSlugs.forEach((slug) => {
            if (progressMap[slug]?.status === 'solved') {
              solvedCount++;
            }
          });

          const totalCount = plan.problemSlugs.length;
          const percentage = totalCount > 0 ? Math.round((solvedCount / totalCount) * 100) : 0;

          return (
            <div
              key={plan.id}
              onClick={() => onSelectPlan(plan)}
              className="bg-[#242424] hover:bg-[#282828] border border-[#333333] hover:border-[#444444] rounded-2xl p-5 cursor-pointer transition flex flex-col justify-between space-y-4 shadow-lg group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center border shadow"
                      style={{
                        backgroundColor: `${plan.color}15`,
                        borderColor: `${plan.color}30`
                      }}
                    >
                      {getIcon(plan.icon, plan.color)}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white group-hover:text-[#ffa116] transition">
                        {plan.title}
                      </h3>
                      <span className="text-[11px] text-gray-400 font-medium">
                        {totalCount} Curated Problems
                      </span>
                    </div>
                  </div>

                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                      plan.difficulty === 'Beginner'
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                        : plan.difficulty === 'Intermediate'
                        ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                        : 'bg-purple-500/10 text-purple-400 border-purple-500/30'
                    }`}
                  >
                    {plan.difficulty}
                  </span>
                </div>

                <p className="text-xs text-gray-400 leading-relaxed">
                  {plan.description}
                </p>
              </div>

              {/* Progress Bar & Actions */}
              <div className="pt-3 border-t border-[#2e2e2e] space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400 font-medium">Completion Progress</span>
                  <span className="text-white font-bold">{solvedCount} / {totalCount} ({percentage}%)</span>
                </div>
                <div className="w-full bg-[#1c1c1c] rounded-full h-2 overflow-hidden">
                  <div
                    className="h-2 rounded-full transition-all duration-500"
                    style={{
                      width: `${percentage}%`,
                      backgroundColor: plan.color
                    }}
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-[11px] text-gray-500 flex items-center space-x-1">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Includes hints & detailed Big-O analyses</span>
                  </span>

                  <button className="flex items-center space-x-1 text-xs font-bold text-[#ffa116] group-hover:translate-x-1 transition-transform">
                    <span>Explore Track</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
