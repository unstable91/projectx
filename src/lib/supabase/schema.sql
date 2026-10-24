-- ====================================================================
-- AlgoForge / LeetCode Platform - Supabase Database Schema
-- Run this in your Supabase SQL Editor (https://supabase.com/dashboard)
-- ====================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. User Profiles Table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  solved_count INT DEFAULT 0,
  easy_solved INT DEFAULT 0,
  medium_solved INT DEFAULT 0,
  hard_solved INT DEFAULT 0,
  total_submissions INT DEFAULT 0,
  streak INT DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Problems Table
CREATE TABLE IF NOT EXISTS public.problems (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  difficulty TEXT NOT NULL CHECK (difficulty IN ('Easy', 'Medium', 'Hard')),
  category TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  description TEXT NOT NULL,
  function_name TEXT NOT NULL,
  param_names TEXT[] DEFAULT '{"nums", "target"}',
  starter_code JSONB NOT NULL,
  sample_test_cases JSONB NOT NULL,
  hidden_test_cases JSONB NOT NULL,
  hints TEXT[] DEFAULT '{}',
  solution_explanation TEXT,
  time_limit_ms INT DEFAULT 2000,
  memory_limit_mb INT DEFAULT 128,
  total_submissions INT DEFAULT 0,
  accepted_submissions INT DEFAULT 0,
  is_ai_generated BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Submissions Table
CREATE TABLE IF NOT EXISTS public.submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  problem_id UUID REFERENCES public.problems(id) ON DELETE CASCADE,
  problem_title TEXT NOT NULL,
  language TEXT NOT NULL,
  code TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('Accepted', 'Wrong Answer', 'Time Limit Exceeded', 'Runtime Error', 'Compile Error')),
  runtime_ms NUMERIC NOT NULL,
  memory_kb NUMERIC NOT NULL,
  passed_tests INT NOT NULL,
  total_tests INT NOT NULL,
  details JSONB,
  submitted_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. User Problem Progress Table
CREATE TABLE IF NOT EXISTS public.user_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  problem_id UUID REFERENCES public.problems(id) ON DELETE CASCADE,
  status TEXT NOT NULL CHECK (status IN ('solved', 'attempted', 'unsolved')),
  last_submitted_code JSONB,
  attempts_count INT DEFAULT 1,
  solved_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, problem_id)
);

-- ====================================================================
-- Indexes for High Performance
-- ====================================================================
CREATE INDEX IF NOT EXISTS idx_problems_difficulty ON public.problems(difficulty);
CREATE INDEX IF NOT EXISTS idx_problems_category ON public.problems(category);
CREATE INDEX IF NOT EXISTS idx_submissions_user_id ON public.submissions(user_id);
CREATE INDEX IF NOT EXISTS idx_submissions_problem_id ON public.submissions(problem_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_user_problem ON public.user_progress(user_id, problem_id);

-- ====================================================================
-- Row Level Security (RLS) Policies
-- ====================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.problems ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;

-- Problems: Anyone (authenticated or anon) can read problems
CREATE POLICY "Problems are viewable by everyone" 
  ON public.problems FOR SELECT USING (true);

-- Problems: Authenticated users can insert AI-generated problems
CREATE POLICY "Authenticated users can insert problems" 
  ON public.problems FOR INSERT WITH CHECK (true);

-- Profiles: Anyone can view profiles, users can update their own
CREATE POLICY "Profiles are viewable by everyone" 
  ON public.profiles FOR SELECT USING (true);

CREATE POLICY "Users can update own profile" 
  ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Submissions: Users can view their own submissions
CREATE POLICY "Users can view own submissions" 
  ON public.submissions FOR SELECT USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users can insert own submissions" 
  ON public.submissions FOR INSERT WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

-- Progress: Users can view and manage their own progress
CREATE POLICY "Users can view own progress" 
  ON public.user_progress FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own progress" 
  ON public.user_progress FOR ALL USING (auth.uid() = user_id);
