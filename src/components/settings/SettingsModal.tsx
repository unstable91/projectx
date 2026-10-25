import React, { useState, useEffect } from 'react';
import { 
  Settings, 
  X, 
  Database, 
  Key, 
  Check, 
  Copy, 
  ExternalLink, 
  AlertCircle, 
  CheckCircle2, 
  Code, 
  Loader2,
  Cpu,
  Sparkles,
  Coffee
} from 'lucide-react';
import { GeminiService } from '../../lib/gemini/geminiService';
import { 
  getSupabaseCredentials, 
  saveSupabaseCredentials, 
  testSupabaseConnection 
} from '../../lib/supabase/supabaseClient';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfigUpdated: () => void;
  onOpenGenerator?: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  onConfigUpdated,
  onOpenGenerator
}) => {
  const [activeTab, setActiveTab] = useState<'gemini' | 'supabase' | 'wasm' | 'schema'>('gemini');

  // Gemini state
  const [geminiKey, setGeminiKey] = useState('');
  const [geminiSaved, setGeminiSaved] = useState(false);

  // Supabase state
  const [supabaseUrl, setSupabaseUrl] = useState('');
  const [supabaseAnonKey, setSupabaseAnonKey] = useState('');
  const [supabaseStatus, setSupabaseStatus] = useState<{
    tested: boolean;
    ok: boolean;
    message: string;
  } | null>(null);
  const [isTestingSupabase, setIsTestingSupabase] = useState(false);

  // SQL Schema copied
  const [copiedSchema, setCopiedSchema] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setGeminiKey(GeminiService.getApiKey());
      const creds = getSupabaseCredentials();
      setSupabaseUrl(creds.url);
      setSupabaseAnonKey(creds.anonKey);
      setSupabaseStatus(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSaveGemini = () => {
    GeminiService.setApiKey(geminiKey);
    setGeminiSaved(true);
    setTimeout(() => setGeminiSaved(false), 2000);
    onConfigUpdated();
  };

  const handleSaveSupabase = async () => {
    saveSupabaseCredentials(supabaseUrl, supabaseAnonKey);
    setIsTestingSupabase(true);
    try {
      const res = await testSupabaseConnection();
      setSupabaseStatus({ tested: true, ok: res.ok, message: res.message });
    } catch (err: any) {
      setSupabaseStatus({ tested: true, ok: false, message: err.message });
    } finally {
      setIsTestingSupabase(false);
      onConfigUpdated();
    }
  };

  const handleLaunchGenerator = () => {
    onClose();
    if (onOpenGenerator) {
      onOpenGenerator();
    }
  };

  const sqlSchemaSnippet = `-- Run this in your Supabase SQL Editor:
CREATE TABLE IF NOT EXISTS public.problems (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  difficulty TEXT NOT NULL,
  category TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  description TEXT NOT NULL,
  function_name TEXT NOT NULL,
  param_names TEXT[] DEFAULT '{"nums"}',
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

CREATE TABLE IF NOT EXISTS public.submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID,
  problem_id UUID,
  problem_title TEXT NOT NULL,
  language TEXT NOT NULL,
  code TEXT NOT NULL,
  status TEXT NOT NULL,
  runtime_ms NUMERIC NOT NULL,
  memory_kb NUMERIC NOT NULL,
  passed_tests INT NOT NULL,
  total_tests INT NOT NULL,
  details JSONB,
  submitted_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.problems ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read problems" ON public.problems FOR SELECT USING (true);
CREATE POLICY "Allow public insert problems" ON public.problems FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert submissions" ON public.submissions FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public read submissions" ON public.submissions FOR SELECT USING (true);
`;

  const handleCopySchema = () => {
    navigator.clipboard.writeText(sqlSchemaSnippet);
    setCopiedSchema(true);
    setTimeout(() => setCopiedSchema(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#1e1e1e] border border-[#3a3a3a] rounded-2xl max-w-xl w-full max-h-[88vh] flex flex-col overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="p-4 bg-[#252525] border-b border-[#333333] flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Settings className="w-5 h-5 text-[#ffa116]" />
            <h2 className="text-sm font-bold text-white">Platform Settings & Options</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-gray-400 hover:text-white hover:bg-[#333333] transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center space-x-2 px-4 pt-3 border-b border-[#2e2e2e] bg-[#222222] overflow-x-auto">
          <button
            onClick={() => setActiveTab('gemini')}
            className={`flex items-center space-x-1.5 pb-2.5 text-xs font-semibold border-b-2 whitespace-nowrap transition ${
              activeTab === 'gemini'
                ? 'border-[#ffa116] text-[#ffa116]'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            <Key className="w-3.5 h-3.5" />
            <span>Gemini AI</span>
          </button>

          <button
            onClick={() => setActiveTab('supabase')}
            className={`flex items-center space-x-1.5 pb-2.5 text-xs font-semibold border-b-2 whitespace-nowrap transition ${
              activeTab === 'supabase'
                ? 'border-[#ffa116] text-[#ffa116]'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>Supabase Database</span>
          </button>

          <button
            onClick={() => setActiveTab('wasm')}
            className={`flex items-center space-x-1.5 pb-2.5 text-xs font-semibold border-b-2 whitespace-nowrap transition ${
              activeTab === 'wasm'
                ? 'border-[#ffa116] text-[#ffa116]'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            <Coffee className="w-3.5 h-3.5 text-amber-400" />
            <span>Java & WASM Runtime</span>
          </button>

          <button
            onClick={() => setActiveTab('schema')}
            className={`flex items-center space-x-1.5 pb-2.5 text-xs font-semibold border-b-2 whitespace-nowrap transition ${
              activeTab === 'schema'
                ? 'border-[#ffa116] text-[#ffa116]'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            <span>SQL Schema</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="p-5 overflow-y-auto flex-1 text-xs text-gray-300 space-y-4">
          {/* TAB 1: GEMINI */}
          {activeTab === 'gemini' && (
            <div className="space-y-4">
              <div>
                <label className="font-semibold text-gray-200 block mb-1">
                  Google Gemini API Key
                </label>
                <input
                  type="password"
                  value={geminiKey}
                  onChange={(e) => setGeminiKey(e.target.value)}
                  placeholder="AIzaSy..."
                  className="w-full bg-[#141414] border border-[#333333] rounded-lg p-2.5 font-mono text-gray-200 focus:outline-none focus:border-[#ffa116]"
                />
                <p className="text-[11px] text-gray-500 mt-1.5">
                  Used for generating coding problems, interactive hints, test case debugging, and Big-O complexity analysis.
                </p>
              </div>

              <div className="flex items-center justify-between pt-1">
                <a
                  href="https://aistudio.google.com/app/apikey"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center space-x-1 text-amber-400 hover:text-amber-300 font-semibold"
                >
                  <span>Get a Free Gemini Key</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                <button
                  onClick={handleSaveGemini}
                  className="flex items-center space-x-1.5 px-4 py-2 rounded-lg bg-[#ffa116] hover:brightness-110 text-black font-bold transition"
                >
                  {geminiSaved ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Saved!</span>
                    </>
                  ) : (
                    <span>Save Key</span>
                  )}
                </button>
              </div>

              {/* AI Features & Generator Section */}
              <div className="mt-4 pt-4 border-t border-[#2e2e2e] space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-white text-xs flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      AI Problem Generator
                    </h4>
                    <p className="text-[11px] text-gray-400 mt-0.5">
                      Synthesize new algorithmic problems with full test suites and Big-O hints.
                    </p>
                  </div>
                  <button
                    onClick={handleLaunchGenerator}
                    className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 font-semibold transition"
                  >
                    <Sparkles className="w-3 h-3 text-amber-400" />
                    <span>Launch Generator</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: SUPABASE */}
          {activeTab === 'supabase' && (
            <div className="space-y-4">
              <p className="text-gray-400 text-xs">
                Connect your Supabase project to persist problems, user profiles, submissions, and progress across devices. If unconfigured, AlgoForge operates in 100% offline LocalStorage mode.
              </p>

              <div>
                <label className="font-semibold text-gray-200 block mb-1">
                  Supabase Project URL
                </label>
                <input
                  type="text"
                  value={supabaseUrl}
                  onChange={(e) => setSupabaseUrl(e.target.value)}
                  placeholder="https://your-project-id.supabase.co"
                  className="w-full bg-[#141414] border border-[#333333] rounded-lg p-2.5 font-mono text-gray-200 focus:outline-none focus:border-[#ffa116]"
                />
              </div>

              <div>
                <label className="font-semibold text-gray-200 block mb-1">
                  Supabase Anon Key
                </label>
                <input
                  type="password"
                  value={supabaseAnonKey}
                  onChange={(e) => setSupabaseAnonKey(e.target.value)}
                  placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6..."
                  className="w-full bg-[#141414] border border-[#333333] rounded-lg p-2.5 font-mono text-gray-200 focus:outline-none focus:border-[#ffa116]"
                />
              </div>

              {supabaseStatus && (
                <div
                  className={`p-3 rounded-lg border text-xs flex items-center space-x-2 ${
                    supabaseStatus.ok
                      ? 'bg-emerald-950/20 border-emerald-800/40 text-emerald-300'
                      : 'bg-rose-950/20 border-rose-800/40 text-rose-300'
                  }`}
                >
                  {supabaseStatus.ok ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
                  )}
                  <span>{supabaseStatus.message}</span>
                </div>
              )}

              <div className="flex items-center justify-between pt-2">
                <a
                  href="https://supabase.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center space-x-1 text-emerald-400 hover:text-emerald-300 font-semibold"
                >
                  <span>Open Supabase Dashboard</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                <button
                  onClick={handleSaveSupabase}
                  disabled={isTestingSupabase}
                  className="flex items-center space-x-1.5 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition disabled:opacity-50"
                >
                  {isTestingSupabase ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Testing...</span>
                    </>
                  ) : (
                    <span>Save & Test Connection</span>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: JAVA & WASM ENGINES */}
          {activeTab === 'wasm' && (
            <div className="space-y-4">
              <div className="p-3 bg-[#151515] border border-[#2a2a2a] rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Coffee className="w-4 h-4 text-amber-400" />
                    <span className="font-bold text-white text-xs">Java WASM Compiler & Engine</span>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    Client-Side Active
                  </span>
                </div>
                <p className="text-[11px] text-gray-400 leading-relaxed">
                  Compiles and executes Java <code className="text-amber-300">class Solution</code> in the browser without server dependencies or containers.
                </p>
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#252525] text-[11px]">
                  <div>
                    <span className="text-gray-500 block">Compiler Diagnostics:</span>
                    <span className="text-gray-300 font-mono">OpenJDK javac format (^)</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block">Runtime Environment:</span>
                    <span className="text-gray-300 font-mono">JVM Stack Trace Simulator</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block">Watchdog Timeout:</span>
                    <span className="text-gray-300 font-mono">2000 ms</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block">Memory Ceiling:</span>
                    <span className="text-gray-300 font-mono">128 MB</span>
                  </div>
                </div>
              </div>

              {/* Supported Java Features */}
              <div className="space-y-2">
                <h4 className="font-semibold text-gray-200 text-xs">Supported Java Standard Libraries</h4>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    'HashMap', 'HashSet', 'ArrayList', 'ArrayDeque', 'Stack',
                    'int[]', 'int[][]', 'String[]', 'StringBuilder', 'Math',
                    'Arrays.sort()', 'Integer.parseInt()', 'System.out.println'
                  ].map((feat) => (
                    <span key={feat} className="px-2 py-0.5 bg-[#252525] border border-[#333333] rounded text-[11px] font-mono text-gray-300">
                      {feat}
                    </span>
                  ))}
                </div>
              </div>

              {/* Other Language Engines */}
              <div className="space-y-2 pt-2 border-t border-[#2e2e2e]">
                <h4 className="font-semibold text-gray-200 text-xs">Other Polyglot Engines</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div className="p-2.5 rounded-lg bg-[#181818] border border-[#2a2a2a]">
                    <div className="font-semibold text-white text-[11px]">JavaScript</div>
                    <div className="text-[10px] text-emerald-400">Worker Sandbox</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#181818] border border-[#2a2a2a]">
                    <div className="font-semibold text-white text-[11px]">Python 3</div>
                    <div className="text-[10px] text-emerald-400">Custom WASM Core</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#181818] border border-[#2a2a2a]">
                    <div className="font-semibold text-white text-[11px]">C++ 17</div>
                    <div className="text-[10px] text-emerald-400">Custom WASM Core</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: SQL SCHEMA */}
          {activeTab === 'schema' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-gray-400">
                  Copy and run this SQL script in your Supabase SQL Editor:
                </p>
                <button
                  onClick={handleCopySchema}
                  className="flex items-center space-x-1 px-2.5 py-1 rounded bg-[#333333] hover:bg-[#444444] text-gray-200 font-semibold transition"
                >
                  {copiedSchema ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy SQL</span>
                    </>
                  )}
                </button>
              </div>

              <pre className="p-3 bg-[#141414] border border-[#2e2e2e] rounded-lg font-mono text-[11px] text-gray-300 overflow-x-auto max-h-64 leading-relaxed">
                <code>{sqlSchemaSnippet}</code>
              </pre>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3.5 bg-[#252525] border-t border-[#333333] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-[#333333] hover:bg-[#3d3d3d] text-gray-200 font-semibold text-xs transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
