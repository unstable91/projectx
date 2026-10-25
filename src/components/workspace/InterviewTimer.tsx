import React, { useState, useEffect } from 'react';
import { Timer, Play, Pause, RotateCcw, AlertCircle, Eye, EyeOff } from 'lucide-react';

interface InterviewTimerProps {
  onTimeExpired?: () => void;
  isZenMode: boolean;
  onToggleZenMode: () => void;
}

export const InterviewTimer: React.FC<InterviewTimerProps> = ({
  onTimeExpired,
  isZenMode,
  onToggleZenMode
}) => {
  const [selectedMinutes, setSelectedMinutes] = useState<number>(30);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(30 * 60);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  useEffect(() => {
    let interval: any = null;
    if (isActive && secondsRemaining > 0) {
      interval = setInterval(() => {
        setSecondsRemaining((prev) => {
          if (prev <= 1) {
            setIsActive(false);
            if (onTimeExpired) onTimeExpired();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (secondsRemaining === 0) {
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, secondsRemaining, onTimeExpired]);

  const handleStart = (mins: number) => {
    setSelectedMinutes(mins);
    setSecondsRemaining(mins * 60);
    setIsActive(true);
    setIsExpanded(false);
  };

  const handleTogglePlay = () => {
    setIsActive(!isActive);
  };

  const handleReset = () => {
    setIsActive(false);
    setSecondsRemaining(selectedMinutes * 60);
  };

  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  const timeFormatted = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const isCritical = secondsRemaining > 0 && secondsRemaining <= 60;
  const isWarning = secondsRemaining > 60 && secondsRemaining <= 300;

  return (
    <div className="relative select-none flex items-center space-x-2">
      {/* Timer Display Capsule */}
      <div
        className={`flex items-center space-x-2 px-2.5 py-1 rounded-lg border text-xs font-mono font-bold transition ${
          isCritical
            ? 'bg-rose-950/80 text-rose-300 border-rose-500 animate-pulse'
            : isWarning
            ? 'bg-amber-950/60 text-amber-300 border-amber-600'
            : isActive
            ? 'bg-[#222222] text-[#ffa116] border-[#ffa116]/40'
            : 'bg-[#222222] text-gray-400 border-[#333333]'
        }`}
      >
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          title="Interview Timer Settings"
          className="flex items-center space-x-1.5 hover:text-white transition"
        >
          <Timer className={`w-3.5 h-3.5 ${isActive ? 'text-[#ffa116]' : 'text-gray-400'}`} />
          <span>{timeFormatted}</span>
        </button>

        {/* Play/Pause Button */}
        <button
          onClick={handleTogglePlay}
          title={isActive ? 'Pause' : 'Start'}
          className="p-0.5 hover:text-white transition"
        >
          {isActive ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3 fill-current" />}
        </button>

        {/* Reset Button */}
        <button
          onClick={handleReset}
          title="Reset Timer"
          className="p-0.5 hover:text-white transition"
        >
          <RotateCcw className="w-3 h-3" />
        </button>
      </div>

      {/* Focus / Zen Mode Button */}
      <button
        onClick={onToggleZenMode}
        title={isZenMode ? 'Exit Interview Zen Mode' : 'Enter Interview Zen Mode (Hide distracting hints)'}
        className={`p-1.5 rounded-lg border transition ${
          isZenMode
            ? 'bg-purple-950/40 text-purple-300 border-purple-600'
            : 'bg-[#222222] text-gray-400 border-[#333333] hover:text-gray-200'
        }`}
      >
        {isZenMode ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
      </button>

      {/* Dropdown Menu for Duration Selection */}
      {isExpanded && (
        <div className="absolute right-0 top-9 w-48 bg-[#1e1e1e] border border-[#3a3a3a] rounded-xl p-2.5 shadow-2xl z-50 text-xs space-y-1.5 font-sans">
          <div className="text-[11px] font-semibold text-gray-400 px-1.5 pb-1 border-b border-[#2e2e2e]">
            Mock Interview Timer
          </div>

          {[
            { label: '15 Min (Speedrun)', mins: 15 },
            { label: '30 Min (Standard)', mins: 30 },
            { label: '45 Min (FAANG Round)', mins: 45 },
            { label: '60 Min (Deep Dive)', mins: 60 }
          ].map((item) => (
            <button
              key={item.mins}
              onClick={() => handleStart(item.mins)}
              className={`w-full text-left px-2 py-1.5 rounded-md transition flex items-center justify-between ${
                selectedMinutes === item.mins
                  ? 'bg-[#333333] text-[#ffa116] font-semibold'
                  : 'text-gray-300 hover:bg-[#282828]'
              }`}
            >
              <span>{item.label}</span>
              {selectedMinutes === item.mins && <span className="text-[10px]">Active</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
