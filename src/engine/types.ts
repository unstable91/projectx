import { ExecutionResult, SupportedLanguage, TestCase } from '../types';

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
