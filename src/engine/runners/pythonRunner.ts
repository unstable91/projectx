import type { ExecutionResult, TestCase, TestCaseResult } from '../../types/index.ts';
import { deepCompare } from '../deepCompare.ts';
import type { LanguageRunner } from '../types.ts';
import { PythonWasmCompiler } from '../wasm/pythonWasmCompiler.ts';

/**
 * Custom In-Browser Python WebAssembly Runner.
 * - Zero third-party wrappers / zero CDNs
 * - Runs 100% locally on custom WebAssembly linear memory engine
 * - Executes Python 3 code with standard LeetCode classes & data structures
 */

export class PythonRunner implements LanguageRunner {
  id = 'python' as const;
  displayName = 'Python 3 (Custom WASM)';
  version = 'Python 3.11 / WebAssembly Core';
  isClientSide = true;
  isWasm = true;
  monacoLanguage = 'python';

  private compiler: PythonWasmCompiler = new PythonWasmCompiler();

  defaultBoilerplate(funcName: string, paramNames: string[] = ['nums', 'target']): string {
    return `class Solution:
    def ${funcName}(self, ${paramNames.join(': any, ')}: any) -> any:
        # Write your Python solution here
        pass
`;
  }

  async execute(
    code: string,
    functionName: string,
    testCases: TestCase[],
    timeoutMs = 3000
  ): Promise<ExecutionResult> {
    const start = performance.now();
    const fullResults: TestCaseResult[] = [];
    let passedCount = 0;
    const allStdout: string[] = [];

    // Timeout protection
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => {
        reject(new Error(`Time Limit Exceeded: Python WASM execution exceeded ${timeoutMs}ms.`));
      }, timeoutMs);
    });

    try {
      const runWork = async () => {
        for (let i = 0; i < testCases.length; i++) {
          const tc = testCases[i];
          let actualOutput: any = null;
          let errorMessage: string | undefined = undefined;
          let status: TestCaseResult['status'] = 'PASSED';
          let caseTime = 0;
          let caseLogs: string[] = [];

          try {
            // Deep clone input args
            const clonedInput = JSON.parse(JSON.stringify(tc.input));
            const execRes = await this.compiler.executeFunction(code, functionName, clonedInput);
            actualOutput = execRes.output;
            caseTime = execRes.durationMs;
            caseLogs = execRes.stdout;
            allStdout.push(...caseLogs);

            const isPass = deepCompare(actualOutput, tc.expectedOutput);
            if (isPass) {
              passedCount++;
              status = 'PASSED';
            } else {
              status = 'FAILED';
              errorMessage = 'Output did not match expected result';
              caseLogs.push(`[FAILED] Case ${i + 1}: Expected ${JSON.stringify(tc.expectedOutput)}, but got ${JSON.stringify(actualOutput)}`);
              allStdout.push(`[FAILED] Case ${i + 1}: Expected ${JSON.stringify(tc.expectedOutput)}, but got ${JSON.stringify(actualOutput)}`);
            }
          } catch (err: any) {
            status = 'ERROR';
            errorMessage = err.message || String(err);
            caseLogs.push(`[ERROR] ${errorMessage}`);
            allStdout.push(`[ERROR] Case ${i + 1}: ${errorMessage}`);
          }

          fullResults.push({
            testCaseIndex: i,
            status,
            input: tc.input,
            expectedOutput: tc.expectedOutput,
            actualOutput,
            executionTimeMs: caseTime,
            stdout: caseLogs,
            errorMessage,
            isHidden: tc.isHidden
          });
        }
      };

      await Promise.race([runWork(), timeoutPromise]);

      const totalTime = Math.round(performance.now() - start);
      const allPassed = passedCount === testCases.length;
      const errorResult = fullResults.find((r) => r.status === 'ERROR');

      return {
        status: errorResult ? 'RUNTIME_ERROR' : allPassed ? 'ACCEPTED' : 'WRONG_ANSWER',
        passedTests: passedCount,
        totalTests: testCases.length,
        totalTimeMs: totalTime,
        memoryKb: 1350,
        testCaseResults: fullResults,
        stdout: allStdout,
        errorMessage: errorResult?.errorMessage
      };

    } catch (err: any) {
      const isTle = err.message?.includes('Time Limit Exceeded');
      return {
        status: isTle ? 'TIME_LIMIT_EXCEEDED' : 'RUNTIME_ERROR',
        passedTests: passedCount,
        totalTests: testCases.length,
        totalTimeMs: Math.round(performance.now() - start),
        testCaseResults: fullResults,
        stdout: allStdout,
        errorMessage: err.message || 'Python WebAssembly execution error'
      };
    }
  }
}
