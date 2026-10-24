import { SupportedLanguage } from '../types';
import { LanguageRunner } from './types';
import { JavaScriptRunner } from './runners/javascriptRunner';
import { PythonRunner } from './runners/pythonRunner';
import { CppRunner } from './runners/cppRunner';
import { JavaRunner } from './runners/javaRunner';

class RunnerRegistry {
  private runners: Map<SupportedLanguage, LanguageRunner> = new Map();

  constructor() {
    this.register(new JavaScriptRunner());
    this.register(new PythonRunner());
    this.register(new CppRunner());
    this.register(new JavaRunner());
  }

  public register(runner: LanguageRunner) {
    this.runners.set(runner.id, runner);
  }

  public get(language: SupportedLanguage): LanguageRunner {
    const runner = this.runners.get(language);
    if (!runner) {
      // Default to JavaScript
      return this.runners.get('javascript')!;
    }
    return runner;
  }

  public getAll(): LanguageRunner[] {
    return Array.from(this.runners.values());
  }

  public getSupportedLanguages(): Array<{ id: SupportedLanguage; name: string; version: string; isWasm: boolean }> {
    return this.getAll().map((r) => ({
      id: r.id,
      name: r.displayName,
      version: r.version,
      isWasm: r.isWasm
    }));
  }
}

export const runnerRegistry = new RunnerRegistry();
