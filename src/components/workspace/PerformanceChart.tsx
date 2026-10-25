import React, { useState } from 'react';
import { Zap, HardDrive, Trophy, TrendingUp } from 'lucide-react';

interface PerformanceChartProps {
  runtimeMs: number;
  memoryKb: number;
  language: string;
}

export const PerformanceChart: React.FC<PerformanceChartProps> = ({
  runtimeMs,
  memoryKb,
  language
}) => {
  const [metric, setMetric] = useState<'runtime' | 'memory'>('runtime');

  // Calculate realistic percentile based on execution time
  // Faster runtime = higher percentile
  const calculateRuntimePercentile = (ms: number): number => {
    if (ms <= 1) return 98.4;
    if (ms <= 3) return 92.1;
    if (ms <= 6) return 84.7;
    if (ms <= 12) return 72.3;
    if (ms <= 25) return 58.6;
    if (ms <= 50) return 42.1;
    if (ms <= 100) return 24.5;
    return 12.0;
  };

  const calculateMemoryPercentile = (kb: number): number => {
    if (kb <= 1200) return 94.2;
    if (kb <= 1400) return 86.5;
    if (kb <= 1600) return 73.1;
    if (kb <= 2000) return 55.4;
    return 32.0;
  };

  const runtimePercentile = calculateRuntimePercentile(runtimeMs);
  const memoryPercentile = calculateMemoryPercentile(memoryKb);

  const activePercentile = metric === 'runtime' ? runtimePercentile : memoryPercentile;

  // Generate bell curve SVG path
  // Standard Gaussian distribution curve
  const width = 360;
  const height = 90;
  const points: [number, number][] = [];
  const mean = width / 2;
  const stdDev = width / 6;

  for (let x = 10; x <= width - 10; x += 6) {
    const exponent = -Math.pow(x - mean, 2) / (2 * Math.pow(stdDev, 2));
    const y = height - 10 - Math.exp(exponent) * (height - 25);
    points.push([x, y]);
  }

  const pathD = `M 10 ${height - 10} ` + points.map((p) => `L ${p[0]} ${p[1]}`).join(' ') + ` L ${width - 10} ${height - 10} Z`;

  // Position of user marker: higher percentile = further to the left (faster)
  // For runtime: 98% is at left, 10% is at right
  const userX = metric === 'runtime'
    ? Math.max(30, Math.min(width - 30, width - (activePercentile / 100) * (width - 40)))
    : Math.max(30, Math.min(width - 30, width - (activePercentile / 100) * (width - 40)));

  return (
    <div className="bg-[#181818] border border-[#2e2e2e] rounded-xl p-3.5 space-y-3">
      {/* Metric Selector Tabs */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Trophy className="w-4 h-4 text-amber-400" />
          <span className="text-xs font-bold text-white">Submission Efficiency Benchmark</span>
        </div>

        <div className="flex items-center space-x-1 bg-[#121212] p-0.5 rounded-lg border border-[#2e2e2e]">
          <button
            onClick={() => setMetric('runtime')}
            className={`px-2 py-0.5 text-[11px] font-semibold rounded transition ${
              metric === 'runtime'
                ? 'bg-[#ffa116] text-black'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Runtime
          </button>
          <button
            onClick={() => setMetric('memory')}
            className={`px-2 py-0.5 text-[11px] font-semibold rounded transition ${
              metric === 'memory'
                ? 'bg-purple-500 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Memory
          </button>
        </div>
      </div>

      {/* Beats Banner */}
      <div className="flex items-baseline space-x-2">
        <span className="text-2xl font-extrabold text-emerald-400">
          Beats {activePercentile}%
        </span>
        <span className="text-xs text-gray-400">
          of {language.toUpperCase()} submissions
        </span>
        <span className="text-xs text-gray-500">•</span>
        <span className="text-xs font-mono text-gray-300">
          {metric === 'runtime' ? `${runtimeMs} ms` : `${memoryKb} KB`}
        </span>
      </div>

      {/* Bell Curve Chart */}
      <div className="relative pt-1 pb-1">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-24 overflow-visible">
          <defs>
            <linearGradient id="curveGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={metric === 'runtime' ? '#ffa116' : '#a855f7'} stopOpacity="0.4" />
              <stop offset="100%" stopColor={metric === 'runtime' ? '#ffa116' : '#a855f7'} stopOpacity="0.02" />
            </linearGradient>
          </defs>

          {/* Area fill */}
          <path d={pathD} fill="url(#curveGradient)" />

          {/* Baseline curve line */}
          <path
            d={`M 10 ${height - 10} ` + points.map((p) => `L ${p[0]} ${p[1]}`).join(' ')}
            fill="none"
            stroke={metric === 'runtime' ? '#ffa116' : '#a855f7'}
            strokeWidth="2"
          />

          {/* User Marker Line */}
          <line
            x1={userX}
            y1="5"
            x2={userX}
            y2={height - 10}
            stroke="#10b981"
            strokeWidth="2.5"
            strokeDasharray="3 3"
          />
          <circle cx={userX} cy="5" r="4.5" fill="#10b981" />
          <text
            x={userX}
            y="-4"
            textAnchor="middle"
            fill="#10b981"
            fontSize="10"
            fontWeight="bold"
            fontFamily="monospace"
          >
            YOU
          </text>
        </svg>

        {/* Axis Labels */}
        <div className="flex items-center justify-between text-[10px] text-gray-500 font-mono mt-1 px-1">
          <span>Faster (0ms)</span>
          <span>Community Median</span>
          <span>Slower</span>
        </div>
      </div>
    </div>
  );
};
