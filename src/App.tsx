import React, { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { ProblemStats } from './components/problems/ProblemStats';
import { ProblemFilter } from './components/problems/ProblemFilter';
import { ProblemList } from './components/problems/ProblemList';
import { Workspace } from './components/workspace/Workspace';
import { AiProblemGeneratorModal } from './components/ai/AiProblemGeneratorModal';
import { SettingsModal } from './components/settings/SettingsModal';
import { StorageService } from './lib/storage/storageService';
import { GeminiService } from './lib/gemini/geminiService';
import { getSupabaseClient } from './lib/supabase/supabaseClient';
import { Difficulty, Problem, UserProfile, UserProgress } from './types';

export function App() {
  const [currentView, setCurrentView] = useState<'problems' | 'workspace'>('problems');
  const [activeProblem, setActiveProblem] = useState<Problem | null>(null);

  const [problems, setProblems] = useState<Problem[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    id: 'user-1',
    username: 'AlgoCoder',
    fullName: 'Frontend Engineer',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    solvedCount: 0,
    easySolved: 0,
    mediumSolved: 0,
    hardSolved: 0,
    totalSubmissions: 0,
    streak: 3,
    lastActiveDate: new Date().toISOString()
  });
  const [progressMap, setProgressMap] = useState<Record<string, UserProgress>>({});

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | 'All'>('All');
  const [selectedStatus, setSelectedStatus] = useState<'All' | 'solved' | 'attempted' | 'todo'>('All');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Modals
  const [isAiGeneratorOpen, setIsAiGeneratorOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Connection flags
  const [isSupabaseConnected, setIsSupabaseConnected] = useState(false);
  const [hasGeminiKey, setHasGeminiKey] = useState(false);

  // Load Initial Data
  const loadData = async () => {
    const loadedProblems = await StorageService.getProblems();
    setProblems(loadedProblems);

    const loadedProfile = await StorageService.getUserProfile();
    setUserProfile(loadedProfile);

    const loadedProgress = await StorageService.getUserProgress();
    setProgressMap(loadedProgress);

    setIsSupabaseConnected(Boolean(getSupabaseClient()));
    setHasGeminiKey(GeminiService.hasApiKey());
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSelectProblem = (problem: Problem) => {
    setActiveProblem(problem);
    setCurrentView('workspace');
  };

  const handlePickRandom = () => {
    if (problems.length === 0) return;
    const randomIndex = Math.floor(Math.random() * problems.length);
    handleSelectProblem(problems[randomIndex]);
  };

  const handleProblemCreated = (newProblem: Problem) => {
    setProblems((prev) => [newProblem, ...prev]);
    handleSelectProblem(newProblem);
  };

  // Derive categories
  const categories = Array.from(new Set(problems.map((p) => p.category))).sort();

  // Filtered problems list
  const filteredProblems = problems.filter((p) => {
    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = p.title.toLowerCase().includes(q);
      const matchCategory = p.category.toLowerCase().includes(q);
      const matchTags = p.tags && p.tags.some((t) => t.toLowerCase().includes(q));
      if (!matchTitle && !matchCategory && !matchTags) return false;
    }

    // Difficulty
    if (selectedDifficulty !== 'All' && p.difficulty !== selectedDifficulty) {
      return false;
    }

    // Category
    if (selectedCategory !== 'All' && p.category !== selectedCategory) {
      return false;
    }

    // Status
    if (selectedStatus !== 'All') {
      const status = progressMap[p.id]?.status || progressMap[p.slug]?.status || 'unsolved';
      if (selectedStatus === 'todo' && status !== 'unsolved') return false;
      if (selectedStatus === 'solved' && status !== 'solved') return false;
      if (selectedStatus === 'attempted' && status !== 'attempted') return false;
    }

    return true;
  });

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-gray-200 flex flex-col font-sans">
      {/* Navbar */}
      <Navbar
        currentView={currentView}
        onNavigate={(view) => {
          if (view === 'problems') setCurrentView('problems');
          else if (view === 'generator') setIsAiGeneratorOpen(true);
        }}
        userProfile={userProfile}
        isSupabaseConnected={isSupabaseConnected}
        hasGeminiKey={hasGeminiKey}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenGenerator={() => setIsAiGeneratorOpen(true)}
      />

      {/* Main View */}
      <main className="flex-1">
        {currentView === 'problems' || !activeProblem ? (
          <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Top Dashboard Analytics */}
            <ProblemStats
              problems={problems}
              userProfile={userProfile}
              progressMap={progressMap}
            />

            {/* Filter Bar */}
            <ProblemFilter
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedDifficulty={selectedDifficulty}
              onDifficultyChange={setSelectedDifficulty}
              selectedStatus={selectedStatus}
              onStatusChange={setSelectedStatus}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              categories={categories}
              onPickRandom={handlePickRandom}
              onOpenAiGenerator={() => setIsAiGeneratorOpen(true)}
            />

            {/* Problems Table */}
            <ProblemList
              problems={filteredProblems}
              progressMap={progressMap}
              onSelectProblem={handleSelectProblem}
            />
          </div>
        ) : (
          <Workspace
            problem={activeProblem}
            onBack={() => setCurrentView('problems')}
            onOpenSettings={() => setIsSettingsOpen(true)}
            onProblemSolved={() => {
              loadData();
            }}
          />
        )}
      </main>

      {/* AI Generator Modal */}
      <AiProblemGeneratorModal
        isOpen={isAiGeneratorOpen}
        onClose={() => setIsAiGeneratorOpen(false)}
        onProblemCreated={handleProblemCreated}
        onOpenSettings={() => {
          setIsAiGeneratorOpen(false);
          setIsSettingsOpen(true);
        }}
      />

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onConfigUpdated={() => {
          loadData();
        }}
      />
    </div>
  );
}

export default App;
