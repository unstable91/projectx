import React from 'react';
import { Calendar, Flame, CheckCircle, Award } from 'lucide-react';
import { Submission, UserProfile } from '../../types';

interface ActivityHeatmapProps {
  submissions: Submission[];
  userProfile: UserProfile;
}

export const ActivityHeatmap: React.FC<ActivityHeatmapProps> = ({
  submissions,
  userProfile
}) => {
  // Aggregate submission count per date (YYYY-MM-DD)
  const submissionCountsByDate: Record<string, number> = {};
  submissions.forEach((sub) => {
    const dateStr = sub.submittedAt.split('T')[0];
    submissionCountsByDate[dateStr] = (submissionCountsByDate[dateStr] || 0) + 1;
  });

  // Generate trailing 16 weeks (112 days) of activity
  const totalDays = 112;
  const days: Array<{ dateStr: string; count: number; dayOfWeek: number }> = [];
  const today = new Date();

  for (let i = totalDays - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    days.push({
      dateStr,
      count: submissionCountsByDate[dateStr] || 0,
      dayOfWeek: d.getDay()
    });
  }

  // Helper for green square color intensity
  const getColorClass = (count: number) => {
    if (count === 0) return 'bg-[#222222] border-[#2c2c2c]';
    if (count === 1) return 'bg-emerald-900 border-emerald-800';
    if (count <= 3) return 'bg-emerald-700 border-emerald-600';
    if (count <= 6) return 'bg-emerald-500 border-emerald-400';
    return 'bg-emerald-400 border-emerald-300';
  };

  const totalActiveDays = Object.keys(submissionCountsByDate).length;

  return (
    <div className="bg-[#242424] border border-[#333333] rounded-2xl p-5 mb-6 space-y-4">
      {/* Header with Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#2e2e2e]">
        <div className="flex items-center space-x-2.5">
          <Calendar className="w-4 h-4 text-[#ffa116]" />
          <h3 className="text-sm font-bold text-white">Submission Activity Calendar</h3>
        </div>

        <div className="flex items-center space-x-4 text-xs font-medium text-gray-400">
          <div className="flex items-center space-x-1">
            <span className="text-white font-bold">{submissions.length}</span>
            <span>Submissions</span>
          </div>
          <span>•</span>
          <div className="flex items-center space-x-1">
            <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span className="text-amber-400 font-bold">{userProfile.streak} Days</span>
            <span>Streak</span>
          </div>
          <span>•</span>
          <div className="flex items-center space-x-1">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-white font-bold">{totalActiveDays}</span>
            <span>Active Days</span>
          </div>
        </div>
      </div>

      {/* Heatmap Grid */}
      <div className="overflow-x-auto pb-1">
        <div className="grid grid-rows-7 grid-flow-col gap-1 w-max">
          {days.map((day) => (
            <div
              key={day.dateStr}
              title={`${day.count} submissions on ${day.dateStr}`}
              className={`w-3 h-3 rounded-sm border transition-transform hover:scale-125 cursor-pointer ${getColorClass(
                day.count
              )}`}
            />
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-between text-[11px] text-gray-500 pt-1">
        <span>Recent 16 weeks</span>
        <div className="flex items-center space-x-1">
          <span>Less</span>
          <div className="w-2.5 h-2.5 rounded-sm bg-[#222222] border border-[#2c2c2c]" />
          <div className="w-2.5 h-2.5 rounded-sm bg-emerald-900 border border-emerald-800" />
          <div className="w-2.5 h-2.5 rounded-sm bg-emerald-700 border border-emerald-600" />
          <div className="w-2.5 h-2.5 rounded-sm bg-emerald-500 border border-emerald-400" />
          <div className="w-2.5 h-2.5 rounded-sm bg-emerald-400 border border-emerald-300" />
          <span>More</span>
        </div>
      </div>
    </div>
  );
};
