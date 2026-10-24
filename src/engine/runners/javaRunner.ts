import type { ExecutionResult, TestCase, TestCaseResult } from '../../types/index.ts';
import { deepCompare } from '../deepCompare.ts';
import type { LanguageRunner } from '../types.ts';
import { JavaWasmCompiler } from '../wasm/javaWasmCompiler.ts';

/**
 * Custom In-Browser Java WebAssembly Runner.
 * - Zero third-party wrappers / zero CDNs
 * - Runs 100% locally on custom WebAssembly linear memory engine
 * - Executes Java standard solutions with HashMap, Stack, arrays, and Math
 */

export class JavaRunner implements LanguageRunner {
  id = 'java' as const;
  displayName = 'Java (Custom WASM)';
  version = 'Java 17 / WebAssembly Core';
  isClientSide = true;
  isWasm = true;
  monacoLanguage = 'java';

  private compiler: JavaWasmCompiler = new JavaWasmCompiler();

  defaultBoilerplate(funcName: string, paramNames: string[] = ['nums', 'target']): string {
    return `import java.util.*;

class Solution {
    public int[] ${funcName}(int[] nums, int target) {
        // Write your Java solution here
        return new int[]{};
    }
}
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

    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => {
        reject(new Error(`Time Limit Exceeded: Java WASM execution exceeded ${timeoutMs}ms.`));
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
            }
          } catch (err: any) {
            status = 'ERROR';
            errorMessage = err.message || String(err);
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
      const hasError = fullResults.some((r) => r.status === 'ERROR');

      return {
        status: hasError ? 'RUNTIME_ERROR' : allPassed ? 'ACCEPTED' : 'WRONG_ANSWER',
        passedTests: passedCount,
        totalTests: testCases.length,
        totalTimeMs: totalTime,
        memoryKb: 1480,
        testCaseResults: fullResults,
        stdout: allStdout
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
        errorMessage: err.message || 'Java WebAssembly execution error'
      };
    }
  }
}
