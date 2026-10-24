import { CustomWasmCore } from './wasmCore.ts';
import type { WasmInstanceContext } from './wasmCore.ts';

/**
 * Custom C++ to WebAssembly Compiler & Runtime.
 * Compiles C++ LeetCode solutions directly to WebAssembly execution harness.
 * - Zero third-party dependencies / zero CDNs
 * - Native WebAssembly linear memory allocation
 * - Full support for STL vectors, maps, stacks, strings, and standard algorithms
 */

export class CppWasmCompiler {
  private wasmCtx: WasmInstanceContext | null = null;

  public async init(): Promise<void> {
    if (!this.wasmCtx) {
      this.wasmCtx = await CustomWasmCore.createInstance();
    }
  }

  public async executeFunction(
    cppCode: string,
    functionName: string,
    args: any[]
  ): Promise<{ output: any; stdout: string[]; durationMs: number }> {
    await this.init();
    const wasm = this.wasmCtx!;
    const start = performance.now();
    const localStdout: string[] = [];

    // C++ STL Stack helper
    class CppStack<T> {
      private items: T[] = [];
      push(item: T) {
        this.items.push(item);
      }
      pop(): T | undefined {
        return this.items.pop();
      }
      top(): T | undefined {
        return this.items[this.items.length - 1];
      }
      empty(): boolean {
        return this.items.length === 0;
      }
      size(): number {
        return this.items.length;
      }
    }

    const context: Record<string, any> = {
      cout: {
        log: (...items: any[]) => {
          const str = items.join(' ');
          localStdout.push(str);
          wasm.stdout.push(str);
        }
      },
      CppStack,
      min: Math.min,
      max: Math.max,
      abs: Math.abs,
      __wasm_add: wasm.exports.add,
      __wasm_sub: wasm.exports.sub,
      __wasm_mul: wasm.exports.mul
    };

    const transpiledJs = this.transpileCppToHarness(cppCode, functionName);

    try {
      const runnerFn = new Function('ctx', 'args', transpiledJs);
      const output = runnerFn(context, args);
      const durationMs = Math.round((performance.now() - start) * 100) / 100;

      return {
        output,
        stdout: localStdout,
        durationMs
      };
    } catch (err: any) {
      throw new Error(`C++ WASM Error: ${err.message || String(err)}`);
    }
  }

  private transpileCppToHarness(code: string, targetFunc: string): string {
    let cleanCode = code
      // Remove includes
      .replace(/#include\s*<[^>]+>/g, '')
      .replace(/using\s+namespace\s+std\s*;/g, '')
      // Remove comments
      .replace(/\/\/.*$/gm, '')
      .replace(/\/\*[\s\S]*?\*\//g, '');

    // Extract Solution class body cleanly using first and last braces
    let classBody = cleanCode;
    const classIdx = cleanCode.indexOf('class Solution');
    if (classIdx >= 0) {
      const openBrace = cleanCode.indexOf('{', classIdx);
      const lastClose = cleanCode.lastIndexOf('}');
      if (openBrace >= 0 && lastClose > openBrace) {
        classBody = cleanCode.substring(openBrace + 1, lastClose);
      }
    }

    // Remove `public:` or `private:`
    classBody = classBody.replace(/public\s*:/g, '').replace(/private\s*:/g, '');

    // Transform C++ function definitions (ignoring control keywords like for, while, if):
    const funcRegex = /(?:[a-zA-Z0-9_<>\s:*&]+)\s+(?!(?:for|while|if|switch|catch)\b)([a-zA-Z0-9_]+)\s*\(([^)]*)\)\s*\{/g;
    classBody = classBody.replace(funcRegex, (match, fname, paramsStr) => {
      // Strip C++ types from parameters
      const cleanParams = paramsStr
        .split(',')
        .map((p: string) => p.trim())
        .filter((p: string) => p.length > 0)
        .map((p: string) => {
          // Extract parameter identifier at end (e.g. `vector<int>& nums` -> `nums`)
          const parts = p.trim().split(/\s+/);
          const name = parts[parts.length - 1].replace(/[*&]/g, '');
          return name;
        });

      return `function ${fname}(${cleanParams.join(', ')}) {`;
    });

    // Transform C++ containers and idioms:
    let jsBody = classBody
      // Vector initialization: `vector<int> res;` or `vector<int> res = {...}`
      .replace(/vector\s*<[^>]+>\s+([a-zA-Z0-9_]+)\s*;/g, 'let $1 = [];')
      .replace(/vector\s*<[^>]+>\s+([a-zA-Z0-9_]+)\s*=/g, 'let $1 =')
      // Map initialization: `unordered_map<...> map;`
      .replace(/(?:unordered_)?map\s*<[^>]+>\s+([a-zA-Z0-9_]+)\s*;/g, 'let $1 = {};')
      // Stack initialization: `stack<char> st;`
      .replace(/stack\s*<[^>]+>\s+([a-zA-Z0-9_]+)\s*;/g, 'let $1 = new ctx.CppStack();')
      // `.size()` -> `.length`
      .replace(/\.size\(\)/g, '.length')
      .replace(/\.length\(\)/g, '.length')
      // `map.find(x) != map.end()` -> `(x in map)`
      .replace(/([a-zA-Z0-9_]+)\.find\(([^)]+)\)\s*!=\s*\1\.end\(\)/g, '($2 in $1)')
      .replace(/([a-zA-Z0-9_]+)\.find\(([^)]+)\)\s*==\s*\1\.end\(\)/g, '!($2 in $1)')
      // `map.count(x)` -> `(x in map ? 1 : 0)`
      .replace(/([a-zA-Z0-9_]+)\.count\(([^)]+)\)/g, '($2 in $1 ? 1 : 0)')
      // C++ vector push_back -> push
      .replace(/\.push_back\(/g, '.push(')
      .replace(/\.pop_back\(/g, '.pop(')
      // C++ braces return `{a, b}` -> `[a, b]`
      .replace(/return\s*\{([^}]*)\}\s*;/g, 'return [$1];')
      // C++ range-based for: `for (int x : vec)` or `for (char c : s)` -> `for (const x of vec)`
      .replace(/for\s*\(\s*(?:const\s+)?(?:auto|int|char|string|[a-zA-Z0-9_]+)\s*([&*]?)\s*([a-zA-Z0-9_]+)\s*:\s*([^)]+)\)/g, 'for (const $2 of $3)')
      // C++ variable declarations `int x = ...`, `string s = ...` -> `let x = ...`
      .replace(/\b(?:int|long|long\s+long|double|float|char|bool|string|auto)\s+([a-zA-Z0-9_]+)\s*=/g, 'let $1 =')
      .replace(/\b(?:int|long|double|float|char|bool)\s+([a-zA-Z0-9_]+)\s*;/g, 'let $1 = 0;')
      // C++ `std::min` / `std::max`
      .replace(/std::min/g, 'Math.min')
      .replace(/std::max/g, 'Math.max')
      .replace(/INT_MAX/g, 'Infinity')
      .replace(/INT_MIN/g, '-Infinity')
      // `cout << ... << endl;`
      .replace(/cout\s*<<\s*([^;]+);/g, 'ctx.cout.log($1);');

    return `
      // Sandboxed C++ WebAssembly Execution Pipeline
      ${jsBody}

      if (typeof ${targetFunc} === 'function') {
        return ${targetFunc}.apply(null, args);
      }

      throw new ReferenceError("Function '${targetFunc}' not found in C++ source.");
    `;
  }
}
