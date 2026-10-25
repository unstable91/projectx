import React from 'react';
import { 
  Code2, 
  Settings, 
  Flame, 
  BookOpen
} from 'lucide-react';
import { UserProfile } from '../../types';

interface NavbarProps {
  currentView: 'problems' | 'workspace' | 'generator' | 'study';
  onNavigate: (view: 'problems' | 'workspace' | 'generator' | 'study') => void;
  userProfile: UserProfile;
  isSupabaseConnected?: boolean;
  hasGeminiKey?: boolean;
  onOpenSettings: () => void;
  onOpenGenerator?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  userProfile,
  onOpenSettings
}) => {
  return (
    <header className="h-14 border-b border-[#2e2e2e] bg-[#1a1a1a] px-4 flex items-center justify-between sticky top-0 z-40 select-none">
      {/* Left: Logo & Navigation */}
      <div className="flex items-center space-x-6">
        <button
          onClick={() => onNavigate('problems')}
          className="flex items-center space-x-2.5 text-white hover:opacity-90 transition group"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#ffa116] to-amber-400 flex items-center justify-center shadow-lg shadow-[#ffa116]/20">
            <Code2 className="w-5 h-5 text-black font-bold" />
          </div>
          <span className="font-bold text-lg tracking-tight flex items-center gap-1.5">
            AlgoForge
            <span className="text-[10px] font-semibold tracking-wider uppercase px-1.5 py-0.5 rounded bg-[#ffa116]/10 text-[#ffa116] border border-[#ffa116]/20">
              Custom WASM
            </span>
          </span>
        </button>

        <nav className="hidden md:flex items-center space-x-1">
          <button
            onClick={() => onNavigate('problems')}
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition ${
              currentView === 'problems'
                ? 'text-[#ffa116] bg-[#282828]'
                : 'text-gray-400 hover:text-gray-200 hover:bg-[#282828]/50'
            }`}
          >
            Problems
          </button>

          <button
            onClick={() => onNavigate('study')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 text-sm font-medium rounded-md transition ${
              currentView === 'study'
                ? 'text-[#ffa116] bg-[#282828]'
                : 'text-gray-400 hover:text-gray-200 hover:bg-[#282828]/50'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Study Plans</span>
          </button>
        </nav>
      </div>

      {/* Right: Streak, Settings, Profile */}
      <div className="flex items-center space-x-3">
        {/* Streak Counter */}
        <div className="flex items-center space-x-1 text-xs font-semibold px-2.5 py-1 rounded-md bg-[#242424] text-amber-400 border border-[#333333]">
          <Flame className="w-3.5 h-3.5 fill-amber-400" />
          <span>{userProfile.streak}d Streak</span>
        </div>

        {/* Settings Button */}
        <button
          onClick={onOpenSettings}
          title="Settings (AI, Cloud Sync, & WASM Configuration)"
          className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-md text-gray-300 hover:text-white bg-[#242424] hover:bg-[#2e2e2e] transition border border-[#333333] text-xs font-medium"
        >
          <Settings className="w-3.5 h-3.5 text-gray-400" />
          <span className="hidden sm:inline">Settings</span>
        </button>

        {/* User Avatar */}
        <div className="flex items-center space-x-2 pl-2 border-l border-[#2e2e2e]">
          <div className="w-7 h-7 rounded-full overflow-hidden border border-[#ffa116]/40 ring-1 ring-[#ffa116]/20">
            <img
              src={userProfile.avatarUrl}
              alt={userProfile.username}
              className="w-full h-full object-cover"
            />
          </div>
          <span className="hidden lg:inline text-xs font-medium text-gray-300">
            {userProfile.username}
          </span>
        </div>
      </div>
    </header>
  );
};
