# AlgoForge - Client-Side LeetCode Coding Platform

AlgoForge is a modern, high-performance LeetCode-style competitive programming platform built with client-side execution, zero third-party execution server dependencies, Supabase database persistence, and Google Gemini AI integration.

---

## 🚀 Key Highlights & Architecture

### 1. Local Code Execution (Zero Server Costs)
- **Zero Third-Party Execution APIs:** Runs JavaScript directly inside the user's browser in an isolated **Web Worker Sandbox** without relying on Judge0, Piston, or external execution servers.
- **Hardware Watchdog Timer:** Infinite loops (e.g., `while(true) {}`) are automatically detected and forcefully terminated via `worker.terminate()` after a configurable timeout (default 3000ms), returning **Time Limit Exceeded (TLE)**.
- **Sandboxed Environment:** The execution worker disables/neutralizes dangerous browser APIs (`fetch`, `XMLHttpRequest`, `WebSocket`, `importScripts`, `indexedDB`, `caches`, `Notification`, etc.) to prevent data exfiltration.
- **Standard Output Interception:** Captures `console.log`, `console.info`, and `console.error` per test case and displays them in the integrated **Console Tab**.
- **Deep Comparison Engine:** Supports arrays, nested structures, objects, null/undefined, and floating-point comparison with epsilon tolerance ($10^{-6}$).

### 2. Extensible Multi-Language Architecture (WASM-Ready)
The system is built on a modular `LanguageRunner` interface:
```typescript
export interface LanguageRunner {
  id: SupportedLanguage;
  displayName: string;
  version: string;
  isClientSide: boolean;
  isWasm: boolean;
  monacoLanguage: string;
  defaultBoilerplate: (funcName: string, paramNames?: string[]) => string;
  execute(
    code: string,
    functionName: string,
    testCases: TestCase[],
    timeoutMs?: number
  ): Promise<ExecutionResult>;
}
```
- **JavaScript Runner:** Sandboxed Web Worker running in the browser V8 engine with sub-millisecond execution timing.
- **Python Runner:** Client-side WebAssembly execution powered by **Pyodide WASM**, executing Python code 100% inside the browser with zero server costs.
- **C++ & Java Runners:** Pluggable runners registered in the runner registry (`runnerRegistry`), ready for WASM compilers (e.g., Clang-WASM and CheerpJ/TeaVM).

### 3. Database: Supabase & Offline-First Dual Layer
- **PostgreSQL Database:** Stores user profiles, problems, submissions, execution runtime, test cases passed, and user progress.
- **Row-Level Security (RLS):** Fully configured policies for user isolation and public problem access.
- **Local-First Fallback:** Works immediately out of the box using LocalStorage/IndexedDB with default problems. When Supabase credentials (`VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`) are entered, the platform seamlessly syncs to Supabase.
- **SQL Schema Script:** Included in `src/lib/supabase/schema.sql` and accessible via the in-app Settings modal with 1-click copy.

### 4. AI Problem Generation & Mentoring with Gemini API
- **AI Problem Generator:** Uses the Gemini 2.5 Flash model to generate complete algorithmic problems conforming to a strict JSON schema:
  - Title, Slug, Difficulty (Easy, Medium, Hard), Category, and Tags
  - Problem description with formatted Examples and Constraints
  - Function signature and parameter names
  - Multi-language starter code
  - Sample test cases and tricky hidden edge test cases
  - 3 Progressive Hints
  - Editorial Solution with Big-O Time & Space complexity analysis
- **Context-Aware AI Hints:** Inspects the student's live editor code and provides tailored hints without spoiling the solution.
- **Complexity Analyzer:** Computes Big-O Time & Space complexity directly from user code.
- **Failing Test Case Debugger:** Explains why the student's solution produced an incorrect output for a specific input.

---

## 🛠️ Tech Stack
- **Frontend:** React 18 + TypeScript + Vite + Tailwind CSS
- **Code Editor:** Monaco Editor (`@monaco-editor/react`)
- **Execution Engines:** Browser Web Workers + Pyodide WebAssembly (WASM)
- **Database:** Supabase (`@supabase/supabase-js`)
- **AI Engine:** Google Gemini API (`@google/generative-ai`)
- **Icons & Effects:** Lucide React + Canvas Confetti

---

## 🏃 Getting Started

### 1. Install Dependencies
\`\`\`bash
npm install
\`\`\`

### 2. Configure Environment Variables (Optional)
Create a \`.env\` file in the root directory:
\`\`\`env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
VITE_GEMINI_API_KEY=your-gemini-api-key
\`\`\`
*(Note: You can also configure your Gemini API Key and Supabase credentials directly in the in-app Settings modal!)*

### 3. Start Development Server
\`\`\`bash
npm run dev
\`\`\`

### 4. Build for Production
\`\`\`bash
npm run build
\`\`\`

---

## 🗄️ Supabase Database Setup
1. Open your [Supabase Dashboard](https://supabase.com/dashboard) and create a new project.
2. Open the **SQL Editor** in the left sidebar.
3. Paste the contents of \`src/lib/supabase/schema.sql\` (or copy it from the in-app **Settings -> SQL Schema** tab).
4. Click **Run**.
5. Copy your **Project URL** and **anon public key** from Project Settings -> API and paste them into the AlgoForge Settings modal.
