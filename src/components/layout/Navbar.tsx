import React from 'react';
import { 
  Code2, 
  Sparkles, 
  Database, 
  Settings, 
  Flame, 
  CheckCircle2, 
  Key,
  ExternalLink 
} from 'lucide-react';
import { UserProfile } from '../../types';

interface NavbarProps {
  currentView: 'problems' | 'workspace' | 'generator';
  onNavigate: (view: 'problems' | 'workspace' | 'generator') => void;
  userProfile: UserProfile;
  isSupabaseConnected: boolean;
  hasGeminiKey: boolean;
  onOpenSettings: () => void;
  onOpenGenerator: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  userProfile,
  isSupabaseConnected,
  hasGeminiKey,
  onOpenSettings,
  onOpenGenerator
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
              Client WASM
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
            onClick={onOpenGenerator}
            className="flex items-center space-x-1.5 px-3 py-1.5 text-sm font-medium rounded-md text-amber-300 hover:text-amber-200 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20 transition group"
          >
            <Sparkles className="w-4 h-4 text-amber-400 group-hover:rotate-12 transition-transform" />
            <span>Generate with AI</span>
          </button>
        </nav>
      </div>

      {/* Right: Status Badges, Settings, Profile */}
      <div className="flex items-center space-x-3">
        {/* Supabase Status Badge */}
        <button
          onClick={onOpenSettings}
          title={isSupabaseConnected ? 'Connected to Supabase PostgreSQL' : 'Click to connect Supabase'}
          className={`hidden sm:flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-xs font-medium border transition ${
            isSupabaseConnected
              ? 'bg-emerald-950/40 text-emerald-400 border-emerald-800/50 hover:bg-emerald-950/70'
              : 'bg-[#282828] text-gray-400 border-[#3a3a3a] hover:border-gray-500'
          }`}
        >
          <Database className={`w-3.5 h-3.5 ${isSupabaseConnected ? 'text-emerald-400' : 'text-gray-400'}`} />
          <span>{isSupabaseConnected ? 'Supabase Online' : 'Local Storage Mode'}</span>
        </button>

        {/* Gemini Status Pill */}
        <button
          onClick={onOpenSettings}
          title={hasGeminiKey ? 'Gemini AI Ready' : 'Add Gemini API Key in Settings'}
          className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-xs font-medium border transition ${
            hasGeminiKey
              ? 'bg-purple-950/40 text-purple-300 border-purple-800/50'
              : 'bg-amber-950/30 text-amber-400 border-amber-800/50 hover:bg-amber-950/50'
          }`}
        >
          <Key className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">{hasGeminiKey ? 'Gemini 2.5 Active' : 'Configure Gemini'}</span>
        </button>

        {/* Streak Counter */}
        <div className="flex items-center space-x-1 text-xs font-semibold px-2 py-1 rounded bg-[#282828] text-amber-400 border border-[#3a3a3a]">
          <Flame className="w-3.5 h-3.5 fill-amber-400" />
          <span>{userProfile.streak}d</span>
        </div>

        {/* Settings Button */}
        <button
          onClick={onOpenSettings}
          title="Settings & Supabase Config"
          className="p-1.5 rounded-md text-gray-400 hover:text-gray-200 hover:bg-[#282828] transition border border-transparent hover:border-[#3a3a3a]"
        >
          <Settings className="w-4 h-4" />
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
