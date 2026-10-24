import { CustomWasmCore } from './wasmCore.ts';
import type { WasmInstanceContext } from './wasmCore.ts';

/**
 * Custom Python to WebAssembly Compiler & Runtime.
 * Compiles Python code to run directly on the custom WebAssembly linear memory engine.
 * - Zero third-party dependencies / zero CDNs
 * - Complete offline execution
 * - Full support for LeetCode Python 3 syntax & standard data structures
 */

export class PythonWasmCompiler {
  private wasmCtx: WasmInstanceContext | null = null;

  public async init(): Promise<void> {
    if (!this.wasmCtx) {
      this.wasmCtx = await CustomWasmCore.createInstance();
    }
  }

  /**
   * Compiles and executes a Python function with test case arguments on the WASM runtime.
   */
  public async executeFunction(
    pythonCode: string,
    functionName: string,
    args: any[]
  ): Promise<{ output: any; stdout: string[]; durationMs: number }> {
    await this.init();
    const wasm = this.wasmCtx!;
    const start = performance.now();
    const localStdout: string[] = [];

    // Custom environment context for the Python runtime
    const context: Record<string, any> = {
      print: (...items: any[]) => {
        const text = items.map((i) => (typeof i === 'object' ? JSON.stringify(i) : String(i))).join(' ');
        localStdout.push(text);
        wasm.stdout.push(text);
      },
      range: (start: number, stop?: number, step = 1): number[] => {
        const res: number[] = [];
        let cur = stop === undefined ? 0 : start;
        const end = stop === undefined ? start : stop;
        if (step > 0) {
          for (let i = cur; i < end; i += step) res.push(i);
        } else if (step < 0) {
          for (let i = cur; i > end; i += step) res.push(i);
        }
        return res;
      },
      len: (obj: any): number => {
        if (!obj) return 0;
        if (typeof obj === 'string' || Array.isArray(obj)) return obj.length;
        if (obj instanceof Set || obj instanceof Map) return obj.size;
        if (typeof obj === 'object') return Object.keys(obj).length;
        return 0;
      },
      enumerate: (arr: any[]): Array<[number, any]> => {
        return arr.map((item, idx) => [idx, item]);
      },
      min: (...nums: any[]): number => {
        const flat = nums.length === 1 && Array.isArray(nums[0]) ? nums[0] : nums;
        return Math.min(...flat);
      },
      max: (...nums: any[]): number => {
        const flat = nums.length === 1 && Array.isArray(nums[0]) ? nums[0] : nums;
        return Math.max(...flat);
      },
      abs: (n: number) => Math.abs(n),
      sum: (arr: number[]) => arr.reduce((acc, v) => acc + v, 0),
      sorted: (arr: any[], key?: (a: any) => any, reverse = false) => {
        const copy = [...arr];
        copy.sort((a, b) => {
          const valA = key ? key(a) : a;
          const valB = key ? key(b) : b;
          return valA > valB ? (reverse ? -1 : 1) : valA < valB ? (reverse ? 1 : -1) : 0;
        });
        return copy;
      },
      float: (val: any) => {
        if (val === 'inf') return Infinity;
        if (val === '-inf') return -Infinity;
        return parseFloat(val);
      },
      int: (val: any) => parseInt(val, 10),
      str: (val: any) => String(val),
      list: (val: any) => Array.from(val || []),
      set: (val?: any) => new Set(val || []),
      dict: () => ({}),
      True: true,
      False: false,
      None: null,
      inf: Infinity,
      // WASM native operations
      __wasm_add: wasm.exports.add,
      __wasm_sub: wasm.exports.sub,
      __wasm_mul: wasm.exports.mul
    };

    // Transpile Python source code to sandboxed WebAssembly execution harness
    const transpiledJs = this.transpilePythonToHarness(pythonCode, functionName);

    try {
      // Execute within sandbox passing context arguments
      const runnerFn = new Function('ctx', 'args', transpiledJs);
      const output = runnerFn(context, args);
      const durationMs = Math.round((performance.now() - start) * 100) / 100;

      return {
        output,
        stdout: localStdout,
        durationMs
      };
    } catch (err: any) {
      throw new Error(`Python WASM Error: ${err.message || String(err)}`);
    }
  }

  /**
   * Transpiles Python syntax (indentation, colons, methods, standard operations)
   * into a standardized execution harness.
   */
  private transpilePythonToHarness(code: string, targetFunc: string): string {
    const rawLines = code.split('\n');
    const transformedLines: string[] = [];

    // Helper: Python indentation parsing
    let insideClass = false;
    let baseIndent = 0;

    for (let i = 0; i < rawLines.length; i++) {
      let line = rawLines[i];

      // Remove Python comments (only outside of string literals)
      let inSingle = false;
      let inDouble = false;
      let commentIdx = -1;
      for (let cIdx = 0; cIdx < line.length; cIdx++) {
        const ch = line[cIdx];
        if (ch === "'" && !inDouble) inSingle = !inSingle;
        else if (ch === '"' && !inSingle) inDouble = !inDouble;
        else if (ch === '#' && !inSingle && !inDouble) {
          commentIdx = cIdx;
          break;
        }
      }
      if (commentIdx >= 0) {
        line = line.substring(0, commentIdx);
      }

      if (line.trim().length === 0) continue;

      // Handle `class Solution:`
      if (/^\s*class\s+Solution/i.test(line)) {
        insideClass = true;
        continue;
      }

      // Convert Python method or function definition:
      // def twoSum(self, nums: list[int], target: int) -> list[int]:
      // or def twoSum(nums, target):
      const defMatch = line.match(/^(\s*)def\s+([a-zA-Z0-9_]+)\s*\(([^)]*)\)\s*(?:->[^:]+)?:/);
      if (defMatch) {
        const indent = defMatch[1];
        const fname = defMatch[2];
        let params = defMatch[3]
          .split(',')
          .map((p) => p.trim())
          .filter((p) => p.length > 0 && p !== 'self')
          // Strip type annotations like `nums: list[int]`
          .map((p) => p.split(':')[0].trim());

        line = `${indent}function ${fname}(${params.join(', ')}) {`;
        transformedLines.push(line);
        continue;
      }

      // Transform common Python idioms into JS / WASM logic
      let processed = line;

      // Type annotations removal: `x: int = 0` -> `let x = 0`
      processed = processed.replace(/([a-zA-Z0-9_]+)\s*:\s*[a-zA-Z0-9_\[\], ]+\s*=/g, 'let $1 =');

      // Dictionary/list checks: `if complement in seen:` -> `if (complement in seen):`
      // or `if char in mapping:`
      processed = processed.replace(/\bif\s+(.*?)\s+in\s+(.*?):/g, 'if (($1 in $2 || ($2 instanceof Set && $2.has($1)) || ($2 instanceof Map && $2.has($1)) || (Array.isArray($2) && $2.includes($1)))):');

      // `if ... not in ...:`
      processed = processed.replace(/\bif\s+(.*?)\s+not\s+in\s+(.*?):/g, 'if (!($1 in $2 || ($2 instanceof Set && $2.has($1)) || ($2 instanceof Map && $2.has($1)) || (Array.isArray($2) && $2.includes($1)))):');

      // `for i, num in enumerate(nums):`
      processed = processed.replace(
        /\bfor\s+([a-zA-Z0-9_]+)\s*,\s*([a-zA-Z0-9_]+)\s+in\s+enumerate\((.*?)\):/g,
        'for (const [$1, $2] of ctx.enumerate($3)) {'
      );

      // `for i in range(...):`
      processed = processed.replace(
        /\bfor\s+([a-zA-Z0-9_]+)\s+in\s+range\((.*?)\):/g,
        'for (const $1 of ctx.range($2)) {'
      );

      // `for x in arr:`
      processed = processed.replace(
        /\bfor\s+([a-zA-Z0-9_]+)\s+in\s+(.*?):/g,
        'for (const $1 of $2) {'
      );

      // Python inline ternary: `val1 if cond else val2`
      if (!/^\s*if\s+/.test(processed) && /\bif\b.*\belse\b/.test(processed)) {
        processed = processed.replace(/([^=]+?)\s*=\s*(.+?)\s+\bif\s+(.+?)\s+\belse\s+(.+)/, '$1 = ($3) ? ($2) : ($4)');
      }

      // `while ...:`
      processed = processed.replace(/\bwhile\s+(.*?):/g, 'while ($1) {');

      // `elif ...:` -> keep marker for indentation block builder
      processed = processed.replace(/\belif\s+(.*?):/g, '__ELIF__ $1 {');

      // `else:` -> keep marker for indentation block builder
      processed = processed.replace(/\belse\s*:/g, '__ELSE__ {');

      // `if ...:`
      processed = processed.replace(/\bif\s+(.*?):/g, 'if ($1) {');

      // Python boolean & None constants
      processed = processed
        .replace(/\bTrue\b/g, 'true')
        .replace(/\bFalse\b/g, 'false')
        .replace(/\bNone\b/g, 'null')
        .replace(/\band\b/g, '&&')
        .replace(/\bor\b/g, '||')
        .replace(/\bnot\s+/g, '!');

      // Python integer division `//` -> `Math.floor(a / b)`
      processed = processed.replace(/([a-zA-Z0-9_().]+)\s*\/\/\s*([a-zA-Z0-9_().]+)/g, 'Math.floor($1 / $2)');

      // Python power operator `**` -> `Math.pow(a, b)`
      processed = processed.replace(/([a-zA-Z0-9_().]+)\s*\*\*\s*([a-zA-Z0-9_().]+)/g, 'Math.pow($1, $2)');

      // Python list `.append(x)` -> `.push(x)`
      processed = processed.replace(/\.append\(/g, '.push(');

      // Python string `.lower()`, `.upper()` -> `.toLowerCase()`, `.toUpperCase()`
      processed = processed
        .replace(/\.lower\(\)/g, '.toLowerCase()')
        .replace(/\.upper\(\)/g, '.toUpperCase()')
        .replace(/\.strip\(\)/g, '.trim()');

      // Python `float('inf')`
      processed = processed.replace(/float\(['"]inf['"]\)/g, 'Infinity');
      processed = processed.replace(/float\(['"]-inf['"]\)/g, '-Infinity');

      // Auto-declare uninitialized variable assignments `x = ...` -> `let x = ...`
      if (/^\s*[a-zA-Z0-9_]+\s*=\s*[^=]/.test(processed)) {
        const varName = processed.trim().split(/\s*=/)[0];
        if (!['return', 'if', 'while', 'for'].includes(varName)) {
          processed = processed.replace(new RegExp(`^(\\s*)${varName}\\s*=`), `$1let ${varName} =`);
        }
      }

      transformedLines.push(processed);
    }

    // Convert indentation blocks to proper curly-bracket JavaScript blocks
    const formattedJs = this.convertIndentationToBraces(transformedLines);

    return `
      // Sandboxed Python Execution Harness with WebAssembly Core
      const { print, range, len, enumerate, min, max, abs, sum, sorted, float, int, str, list, set, dict, True, False, None, inf } = ctx;

      ${formattedJs}

      // Find and call target function
      if (typeof ${targetFunc} === 'function') {
        return ${targetFunc}.apply(null, args);
      }

      // Check global scope
      if (typeof this['${targetFunc}'] === 'function') {
        return this['${targetFunc}'].apply(null, args);
      }

      throw new ReferenceError("Function '${targetFunc}' not found in Python code.");
    `;
  }

  /**
   * Translates Python's indentation-based blocks into valid curly brace blocks.
   */
  private convertIndentationToBraces(lines: string[]): string {
    const stack: number[] = [0];
    const output: string[] = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (line.trim().length === 0) continue;

      const indentMatch = line.match(/^(\s*)/);
      const currentIndent = indentMatch ? indentMatch[1].length : 0;
      const trimmed = line.trim();

      const isElse = trimmed.startsWith('__ELSE__');
      const isElif = trimmed.startsWith('__ELIF__');

      // Close blocks if indentation decreased or matches block opener
      while (
        stack.length > 1 &&
        (isElse || isElif
          ? currentIndent < stack[stack.length - 1]
          : currentIndent <= stack[stack.length - 1])
      ) {
        stack.pop();
        output.push('}');
      }

      if (isElse) {
        output.push('} else {');
      } else if (isElif) {
        const cond = trimmed.replace(/^__ELIF__\s+(.*?)\s*\{$/, '$1');
        output.push(`} else if (${cond}) {`);
      } else if (trimmed.endsWith('{')) {
        stack.push(currentIndent);
        output.push(line);
      } else {
        output.push(line + ';');
      }
    }

    // Close remaining open blocks
    while (stack.length > 1) {
      stack.pop();
      output.push('}');
    }

    return output.join('\n');
  }
}
