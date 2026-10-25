import React, { useRef, useState } from 'react';
import Editor, { OnMount } from '@monaco-editor/react';
import { 
  RotateCcw, 
  Play, 
  CheckCircle2, 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  Minimize2, 
  AlignLeft, 
  Palette 
} from 'lucide-react';
import { SupportedLanguage } from '../../types';
import { runnerRegistry } from '../../engine/runnerRegistry';

interface CodeEditorProps {
  code: string;
  language: SupportedLanguage;
  onChange: (value: string | undefined) => void;
  onLanguageChange: (lang: SupportedLanguage) => void;
  onResetCode: () => void;
  onRunCode: () => void;
  onSubmitCode: () => void;
  isRunning: boolean;
  fontSize: number;
  onFontSizeChange: (size: number) => void;
  isFullscreen?: boolean;
  onToggleFullscreen?: () => void;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  code,
  language,
  onChange,
  onLanguageChange,
  onResetCode,
  onRunCode,
  onSubmitCode,
  isRunning,
  fontSize,
  onFontSizeChange,
  isFullscreen = false,
  onToggleFullscreen
}) => {
  const editorRef = useRef<any>(null);
  const [editorTheme, setEditorTheme] = useState<'vs-dark' | 'hc-black' | 'vs'>('vs-dark');

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;

    // Add keyboard shortcuts
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
      onRunCode();
    });

    editor.addCommand(
      monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.Enter,
      () => {
        onSubmitCode();
      }
    );
  };

  // 1-Click Code Formatter
  const handleFormatCode = () => {
    if (editorRef.current) {
      editorRef.current.getAction('editor.action.formatDocument')?.run();
    }
  };

  const supportedLangs = runnerRegistry.getSupportedLanguages();

  return (
    <div className={`flex flex-col h-full bg-[#1e1e1e] ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}>
      {/* Editor Header Bar */}
      <div className="flex items-center justify-between px-3 h-10 border-b border-[#2e2e2e] bg-[#242424] select-none">
        {/* Language Selector */}
        <div className="flex items-center space-x-2">
          <select
            value={language}
            onChange={(e) => onLanguageChange(e.target.value as SupportedLanguage)}
            className="bg-[#1a1a1a] border border-[#3a3a3a] text-xs font-semibold text-gray-200 rounded-md px-2.5 py-1 focus:outline-none focus:border-[#ffa116]"
          >
            {supportedLangs.map((lang) => (
              <option key={lang.id} value={lang.id}>
                {lang.name} {lang.isWasm ? '(WASM)' : ''}
              </option>
            ))}
          </select>
          <span className="text-[11px] text-gray-400 hidden sm:inline">
            Zero-Dependency WASM Sandbox
          </span>
        </div>

        {/* Toolbar Controls */}
        <div className="flex items-center space-x-1.5">
          {/* Theme Selector */}
          <select
            value={editorTheme}
            onChange={(e) => setEditorTheme(e.target.value as any)}
            title="Monaco Editor Theme"
            className="bg-[#1a1a1a] border border-[#3a3a3a] text-[11px] text-gray-300 rounded px-1.5 py-0.5"
          >
            <option value="vs-dark">Dark Theme</option>
            <option value="hc-black">High Contrast</option>
            <option value="vs">Light Theme</option>
          </select>

          {/* Format Code */}
          <button
            onClick={handleFormatCode}
            title="Format Code (Auto-indent)"
            className="p-1 rounded text-gray-400 hover:text-gray-200 hover:bg-[#333333] transition"
          >
            <AlignLeft className="w-3.5 h-3.5" />
          </button>

          {/* Font Controls */}
          <button
            onClick={() => onFontSizeChange(Math.max(12, fontSize - 1))}
            title="Decrease font size"
            className="p-1 rounded text-gray-400 hover:text-gray-200 hover:bg-[#333333] transition"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="text-[11px] font-mono text-gray-400">{fontSize}px</span>
          <button
            onClick={() => onFontSizeChange(Math.min(22, fontSize + 1))}
            title="Increase font size"
            className="p-1 rounded text-gray-400 hover:text-gray-200 hover:bg-[#333333] transition"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>

          {/* Reset Code */}
          <button
            onClick={onResetCode}
            title="Reset to starter boilerplate"
            className="p-1 rounded text-gray-400 hover:text-gray-200 hover:bg-[#333333] transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          {/* Fullscreen Toggle */}
          {onToggleFullscreen && (
            <button
              onClick={onToggleFullscreen}
              title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen Editor'}
              className="p-1 rounded text-gray-400 hover:text-gray-200 hover:bg-[#333333] transition"
            >
              {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
          )}
        </div>
      </div>

      {/* Monaco Editor Container */}
      <div className="flex-1 overflow-hidden">
        <Editor
          height="100%"
          language={runnerRegistry.get(language).monacoLanguage}
          value={code}
          theme={editorTheme}
          onChange={onChange}
          onMount={handleEditorDidMount}
          options={{
            fontSize: fontSize,
            fontFamily: "'Fira Code', 'Courier New', monospace",
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
            wordWrap: 'on',
            lineNumbers: 'on',
            cursorBlinking: 'smooth',
            smoothScrolling: true,
            padding: { top: 12, bottom: 12 }
          }}
        />
      </div>
    </div>
  );
};
