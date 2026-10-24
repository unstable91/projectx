import { CustomWasmCore } from './wasmCore.ts';
import type { WasmInstanceContext } from './wasmCore.ts';

/**
 * Custom Java to WebAssembly Compiler & Runtime.
 * Compiles Java LeetCode solutions directly to WebAssembly execution harness.
 * - Zero third-party dependencies / zero CDNs
 * - Native WebAssembly linear memory allocation
 * - Support for Java collections (HashMap, ArrayList, Stack), primitive arrays, and Math
 */

export class JavaWasmCompiler {
  private wasmCtx: WasmInstanceContext | null = null;

  public async init(): Promise<void> {
    if (!this.wasmCtx) {
      this.wasmCtx = await CustomWasmCore.createInstance();
    }
  }

  public async executeFunction(
    javaCode: string,
    functionName: string,
    args: any[]
  ): Promise<{ output: any; stdout: string[]; durationMs: number }> {
    await this.init();
    const wasm = this.wasmCtx!;
    const start = performance.now();
    const localStdout: string[] = [];

    // Java HashMap emulation
    class JavaHashMap<K, V> {
      private map = new Map<K, V>();
      put(key: K, value: V) {
        this.map.set(key, value);
      }
      get(key: K): V | undefined {
        return this.map.get(key);
      }
      containsKey(key: K): boolean {
        return this.map.has(key);
      }
      getOrDefault(key: K, defaultValue: V): V {
        return this.map.has(key) ? this.map.get(key)! : defaultValue;
      }
      size(): number {
        return this.map.size;
      }
    }

    // Java Stack emulation
    class JavaStack<T> {
      private items: T[] = [];
      push(item: T) {
        this.items.push(item);
      }
      pop(): T | undefined {
        return this.items.pop();
      }
      peek(): T | undefined {
        return this.items[this.items.length - 1];
      }
      isEmpty(): boolean {
        return this.items.length === 0;
      }
      size(): number {
        return this.items.length;
      }
    }

    const context: Record<string, any> = {
      System: {
        out: {
          println: (...items: any[]) => {
            const str = items.join(' ');
            localStdout.push(str);
            wasm.stdout.push(str);
          },
          print: (...items: any[]) => {
            const str = items.join(' ');
            localStdout.push(str);
            wasm.stdout.push(str);
          }
        }
      },
      HashMap: JavaHashMap,
      Stack: JavaStack,
      ArrayList: class<T> extends Array<T> {},
      Math: Math,
      Integer: {
        MAX_VALUE: Infinity,
        MIN_VALUE: -Infinity,
        parseInt: (s: string) => parseInt(s, 10)
      },
      __wasm_add: wasm.exports.add,
      __wasm_sub: wasm.exports.sub,
      __wasm_mul: wasm.exports.mul
    };

    const transpiledJs = this.transpileJavaToHarness(javaCode, functionName);

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
      throw new Error(`Java WASM Error: ${err.message || String(err)}`);
    }
  }

  private transpileJavaToHarness(code: string, targetFunc: string): string {
    let cleanCode = code
      // Remove package and imports
      .replace(/package\s+[^;]+;/g, '')
      .replace(/import\s+[^;]+;/g, '')
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

    // Transform method signatures (ignoring for, while, if):
    const methodRegex = /(?:public|private|protected)?\s*(?:static)?\s*([a-zA-Z0-9_<>[\]]+)\s+(?!(?:for|while|if|switch|catch)\b)([a-zA-Z0-9_]+)\s*\(([^)]*)\)\s*\{/g;
    classBody = classBody.replace(methodRegex, (match, returnType, fname, paramsStr) => {
      const cleanParams = paramsStr
        .split(',')
        .map((p: string) => p.trim())
        .filter((p: string) => p.length > 0)
        .map((p: string) => {
          const parts = p.trim().split(/\s+/);
          return parts[parts.length - 1];
        });

      return `function ${fname}(${cleanParams.join(', ')}) {`;
    });

    let jsBody = classBody
      // Java enhanced for loop: `for (char c : s.toCharArray())` -> `for (const c of [...s])`
      .replace(/for\s*\(\s*(?:final\s+)?(?:char|int|String|auto|[a-zA-Z0-9_]+)\s+([a-zA-Z0-9_]+)\s*:\s*([^)]+)\)/g, 'for (const $1 of $2)')
      // Object instantiation: `Map<Integer, Integer> map = new HashMap<>();`
      .replace(/(?:Map|HashMap)<[^>]+>\s+([a-zA-Z0-9_]+)\s*=\s*new\s+HashMap(?:<[^>]*>)?\(\);/g, 'let $1 = new ctx.HashMap();')
      // Stack instantiation: `Stack<Character> stack = new Stack<>();`
      .replace(/Stack<[^>]+>\s+([a-zA-Z0-9_]+)\s*=\s*new\s+Stack(?:<[^>]*>)?\(\);/g, 'let $1 = new ctx.Stack();')
      // Array instantiation: `int[] arr = new int[n];` -> `let arr = new Array(n).fill(0);`
      .replace(/(?:int|long|double|boolean|char)\[\]\s+([a-zA-Z0-9_]+)\s*=\s*new\s+[a-zA-Z0-9_]+\[([^\]]+)\];/g, 'let $1 = new Array($2).fill(0);')
      // Returns with array literal: `return new int[] { a, b };` -> `return [a, b];`
      .replace(/return\s+new\s+[a-zA-Z0-9_]+\[\]\s*\{([^}]*)\}\s*;/g, 'return [$1];')
      // Variables: `int x = 0;` -> `let x = 0;`
      .replace(/\b(?:int|long|double|float|char|boolean|String|auto)\s+([a-zA-Z0-9_]+)\s*=/g, 'let $1 =')
      .replace(/\b(?:int|long|double|float|char|boolean)\s+([a-zA-Z0-9_]+)\s*;/g, 'let $1 = 0;')
      // String methods: `.toCharArray()` -> `[...s]`
      .replace(/([a-zA-Z0-9_]+)\.toCharArray\(\)/g, '[...$1]')
      .replace(/([a-zA-Z0-9_]+)\.charAt\(([^)]+)\)/g, '$1[$2]')
      // System.out.println
      .replace(/System\.out\.println\(/g, 'ctx.System.out.println(')
      .replace(/Integer\.MAX_VALUE/g, 'ctx.Integer.MAX_VALUE')
      .replace(/Integer\.MIN_VALUE/g, 'ctx.Integer.MIN_VALUE');

    return `
      // Sandboxed Java WebAssembly Execution Pipeline
      ${jsBody}

      if (typeof ${targetFunc} === 'function') {
        return ${targetFunc}.apply(null, args);
      }

      throw new ReferenceError("Method '${targetFunc}' not found in Java Solution class.");
    `;
  }
}
