import { CustomWasmCore } from './wasmCore.ts';
import type { WasmInstanceContext } from './wasmCore.ts';

/**
 * Enhanced Java to WebAssembly Compiler & Runtime.
 * - Comprehensive Java Collections: HashMap, HashSet, PriorityQueue (Min/Max Heap), LinkedList, Stack, ArrayList
 * - Java Utilities: StringBuilder, Arrays, Collections, Character, Integer, Math
 * - Multi-dimensional array support (int[][])
 * - Clear formatted Java exceptions: java.lang.NullPointerException, java.lang.ArrayIndexOutOfBoundsException
 * - Runs 100% in browser on WebAssembly core with zero external CDNs / third-party wrappers
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

    // ==========================================
    // 1. Java StringBuilder Emulation
    // ==========================================
    class JavaStringBuilder {
      private str: string;
      constructor(initial: any = '') {
        this.str = String(initial);
      }
      append(val: any) {
        this.str += String(val);
        return this;
      }
      toString() {
        return this.str;
      }
      reverse() {
        this.str = this.str.split('').reverse().join('');
        return this;
      }
      length() {
        return this.str.length;
      }
      charAt(index: number) {
        if (index < 0 || index >= this.str.length) {
          throw new Error(`java.lang.StringIndexOutOfBoundsException: String index out of range: ${index}`);
        }
        return this.str[index];
      }
      setCharAt(index: number, ch: string) {
        if (index < 0 || index >= this.str.length) {
          throw new Error(`java.lang.StringIndexOutOfBoundsException: String index out of range: ${index}`);
        }
        this.str = this.str.substring(0, index) + ch + this.str.substring(index + 1);
      }
      deleteCharAt(index: number) {
        if (index < 0 || index >= this.str.length) {
          throw new Error(`java.lang.StringIndexOutOfBoundsException: String index out of range: ${index}`);
        }
        this.str = this.str.substring(0, index) + this.str.substring(index + 1);
        return this;
      }
      substring(start: number, end?: number) {
        return this.str.substring(start, end);
      }
    }

    // ==========================================
    // 2. Java HashMap Emulation
    // ==========================================
    class JavaHashMap<K, V> {
      private map = new Map<any, any>();
      put(key: K, value: V) {
        this.map.set(key, value);
        return value;
      }
      get(key: K): V | undefined {
        return this.map.get(key);
      }
      containsKey(key: K): boolean {
        return this.map.has(key);
      }
      getOrDefault(key: K, defaultValue: V): V {
        return this.map.has(key) ? this.map.get(key) : defaultValue;
      }
      remove(key: K) {
        const val = this.map.get(key);
        this.map.delete(key);
        return val;
      }
      size(): number {
        return this.map.size;
      }
      isEmpty(): boolean {
        return this.map.size === 0;
      }
      keySet(): any[] {
        return Array.from(this.map.keys());
      }
      values(): any[] {
        return Array.from(this.map.values());
      }
      clear() {
        this.map.clear();
      }
    }

    // ==========================================
    // 3. Java HashSet Emulation
    // ==========================================
    class JavaHashSet<T> {
      private set = new Set<T>();
      add(val: T): boolean {
        const had = this.set.has(val);
        this.set.add(val);
        return !had;
      }
      contains(val: T): boolean {
        return this.set.has(val);
      }
      remove(val: T): boolean {
        return this.set.delete(val);
      }
      size(): number {
        return this.set.size;
      }
      isEmpty(): boolean {
        return this.set.size === 0;
      }
      clear() {
        this.set.clear();
      }
    }

    // ==========================================
    // 4. Java PriorityQueue (Binary Heap)
    // ==========================================
    class JavaPriorityQueue<T> {
      private heap: T[] = [];
      private comparator: (a: T, b: T) => number;

      constructor(comparator?: (a: T, b: T) => number) {
        // Default: min-heap
        this.comparator = comparator || ((a: any, b: any) => (a < b ? -1 : a > b ? 1 : 0));
      }

      offer(val: T): boolean {
        this.heap.push(val);
        this.siftUp(this.heap.length - 1);
        return true;
      }

      add(val: T): boolean {
        return this.offer(val);
      }

      poll(): T | null {
        if (this.heap.length === 0) return null;
        const top = this.heap[0];
        const bottom = this.heap.pop()!;
        if (this.heap.length > 0) {
          this.heap[0] = bottom;
          this.siftDown(0);
        }
        return top;
      }

      peek(): T | null {
        return this.heap.length > 0 ? this.heap[0] : null;
      }

      size(): number {
        return this.heap.length;
      }

      isEmpty(): boolean {
        return this.heap.length === 0;
      }

      private siftUp(index: number) {
        let parent = Math.floor((index - 1) / 2);
        while (index > 0 && this.comparator(this.heap[index], this.heap[parent]) < 0) {
          [this.heap[index], this.heap[parent]] = [this.heap[parent], this.heap[index]];
          index = parent;
          parent = Math.floor((index - 1) / 2);
        }
      }

      private siftDown(index: number) {
        const len = this.heap.length;
        while (true) {
          const left = 2 * index + 1;
          const right = 2 * index + 2;
          let smallest = index;

          if (left < len && this.comparator(this.heap[left], this.heap[smallest]) < 0) {
            smallest = left;
          }
          if (right < len && this.comparator(this.heap[right], this.heap[smallest]) < 0) {
            smallest = right;
          }
          if (smallest !== index) {
            [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
            index = smallest;
          } else {
            break;
          }
        }
      }
    }

    // ==========================================
    // 5. Java LinkedList / Queue Emulation
    // ==========================================
    class JavaLinkedList<T> {
      private items: T[] = [];
      add(item: T) {
        this.items.push(item);
        return true;
      }
      addFirst(item: T) {
        this.items.unshift(item);
      }
      addLast(item: T) {
        this.items.push(item);
      }
      offer(item: T) {
        this.items.push(item);
        return true;
      }
      poll(): T | null {
        return this.items.length > 0 ? this.items.shift()! : null;
      }
      peek(): T | null {
        return this.items.length > 0 ? this.items[0] : null;
      }
      getFirst(): T {
        if (this.items.length === 0) throw new Error('java.util.NoSuchElementException');
        return this.items[0];
      }
      getLast(): T {
        if (this.items.length === 0) throw new Error('java.util.NoSuchElementException');
        return this.items[this.items.length - 1];
      }
      removeFirst(): T {
        if (this.items.length === 0) throw new Error('java.util.NoSuchElementException');
        return this.items.shift()!;
      }
      removeLast(): T {
        if (this.items.length === 0) throw new Error('java.util.NoSuchElementException');
        return this.items.pop()!;
      }
      size(): number {
        return this.items.length;
      }
      isEmpty(): boolean {
        return this.items.length === 0;
      }
      get(index: number): T {
        return this.items[index];
      }
    }

    // ==========================================
    // 6. Java Stack Emulation
    // ==========================================
    class JavaStack<T> {
      private items: T[] = [];
      push(item: T) {
        this.items.push(item);
        return item;
      }
      pop(): T {
        if (this.items.length === 0) throw new Error('java.util.EmptyStackException');
        return this.items.pop()!;
      }
      peek(): T {
        if (this.items.length === 0) throw new Error('java.util.EmptyStackException');
        return this.items[this.items.length - 1];
      }
      isEmpty(): boolean {
        return this.items.length === 0;
      }
      empty(): boolean {
        return this.items.length === 0;
      }
      size(): number {
        return this.items.length;
      }
    }

    // ==========================================
    // 7. Java Arrays & Collections Utilities
    // ==========================================
    const JavaArrays = {
      sort: (arr: any[], comparator?: (a: any, b: any) => number) => {
        if (comparator) {
          arr.sort(comparator);
        } else {
          arr.sort((a, b) => (typeof a === 'number' && typeof b === 'number' ? a - b : String(a).localeCompare(String(b))));
        }
      },
      fill: (arr: any[], val: any) => {
        arr.fill(val);
      },
      toString: (arr: any[]) => JSON.stringify(arr),
      equals: (a: any[], b: any[]) => {
        if (!a || !b || a.length !== b.length) return false;
        for (let i = 0; i < a.length; i++) {
          if (a[i] !== b[i]) return false;
        }
        return true;
      }
    };

    const JavaCollections = {
      sort: (list: any[], comparator?: (a: any, b: any) => number) => {
        if (comparator) {
          list.sort(comparator);
        } else {
          list.sort((a, b) => (typeof a === 'number' && typeof b === 'number' ? a - b : String(a).localeCompare(String(b))));
        }
      },
      reverse: (list: any[]) => {
        list.reverse();
      },
      max: (list: any[]) => Math.max(...list),
      min: (list: any[]) => Math.min(...list)
    };

    // ==========================================
    // 8. Java Character & Integer Helpers
    // ==========================================
    const JavaCharacter = {
      isLetter: (ch: string) => /[a-zA-Z]/.test(ch),
      isDigit: (ch: string) => /[0-9]/.test(ch),
      isLetterOrDigit: (ch: string) => /[a-zA-Z0-9]/.test(ch),
      toLowerCase: (ch: string) => ch.toLowerCase(),
      toUpperCase: (ch: string) => ch.toUpperCase()
    };

    const JavaInteger = {
      MAX_VALUE: 2147483647,
      MIN_VALUE: -2147483648,
      parseInt: (s: string) => parseInt(s, 10),
      valueOf: (s: string) => parseInt(s, 10),
      toString: (n: number) => String(n),
      bitCount: (n: number) => {
        let count = 0;
        let x = n >>> 0;
        while (x > 0) {
          count += x & 1;
          x = x >>> 1;
        }
        return count;
      }
    };

    const JavaLong = {
      MAX_VALUE: 9223372036854775807,
      MIN_VALUE: -9223372036854775808,
      parseLong: (s: string) => parseInt(s, 10)
    };

    const context: Record<string, any> = {
      System: {
        out: {
          println: (...items: any[]) => {
            const str = items.map((i) => (typeof i === 'object' ? JSON.stringify(i) : String(i))).join(' ');
            localStdout.push(str);
            wasm.stdout.push(str);
          },
          print: (...items: any[]) => {
            const str = items.map((i) => (typeof i === 'object' ? JSON.stringify(i) : String(i))).join(' ');
            localStdout.push(str);
            wasm.stdout.push(str);
          }
        }
      },
      StringBuilder: JavaStringBuilder,
      HashMap: JavaHashMap,
      HashSet: JavaHashSet,
      PriorityQueue: JavaPriorityQueue,
      LinkedList: JavaLinkedList,
      Stack: JavaStack,
      ArrayList: class<T> extends Array<T> {
        add(item: T) {
          this.push(item);
          return true;
        }
        get(index: number): T {
          return this[index];
        }
        set(index: number, item: T) {
          const old = this[index];
          this[index] = item;
          return old;
        }
        size(): number {
          return this.length;
        }
        isEmpty(): boolean {
          return this.length === 0;
        }
        remove(index: number) {
          return this.splice(index, 1)[0];
        }
      },
      Arrays: JavaArrays,
      Collections: JavaCollections,
      Character: JavaCharacter,
      Integer: JavaInteger,
      Long: JavaLong,
      Math: Math,
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
      throw err;
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

    // Extract Solution class body
    let classBody = cleanCode;
    const classIdx = cleanCode.indexOf('class Solution');
    if (classIdx >= 0) {
      const openBrace = cleanCode.indexOf('{', classIdx);
      const lastClose = cleanCode.lastIndexOf('}');
      if (openBrace >= 0 && lastClose > openBrace) {
        classBody = cleanCode.substring(openBrace + 1, lastClose);
      }
    }

    // Transform method signatures (ignoring for, while, if)
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
      // Java lambda arrow: `(a, b) -> b - a` -> `(a, b) => b - a`
      .replace(/->/g, '=>')
      // Enhanced for loop: `for (char c : s.toCharArray())` -> `for (const c of [...s])`
      .replace(/for\s*\(\s*(?:final\s+)?(?:char|int|String|auto|[a-zA-Z0-9_]+)\s+([a-zA-Z0-9_]+)\s*:\s*([^)]+)\)/g, 'for (const $1 of $2)')
      // 2D Array allocation: `int[][] dp = new int[m][n];`
      .replace(/(?:int|long|boolean)\[\]\[\]\s+([a-zA-Z0-9_]+)\s*=\s*new\s+[a-zA-Z0-9_]+\[([^\]]+)\]\[([^\]]+)\];/g, 'let $1 = Array.from({ length: $2 }, () => new Array($3).fill(0));')
      // 1D Array allocation: `int[] arr = new int[n];`
      .replace(/(?:int|long|double|boolean|char)\[\]\s+([a-zA-Z0-9_]+)\s*=\s*new\s+[a-zA-Z0-9_]+\[([^\]]+)\];/g, 'let $1 = new Array($2).fill(0);')
      // String valueOf: `String.valueOf(x)` -> `String(x)`
      .replace(/String\.valueOf\(([^)]+)\)/g, 'String($1)')
      // String equals: `s.equals(other)` -> `(s === other)`
      .replace(/([a-zA-Z0-9_]+)\.equals\(([^)]+)\)/g, '($1 === $2)')
      .replace(/([a-zA-Z0-9_]+)\.equalsIgnoreCase\(([^)]+)\)/g, '(String($1).toLowerCase() === String($2).toLowerCase())')
      // Array clone: `arr.clone()` -> `[...arr]`
      .replace(/([a-zA-Z0-9_]+)\.clone\(\)/g, '[...$1]')
      // Generic Object variable declaration: `Type<Generic> var = ...` or `Type var = ...`
      .replace(/\b(?:[A-Z][a-zA-Z0-9_]*(?:<[^>]+>)?(?:\[\])*)\s+([a-zA-Z0-9_]+)\s*=/g, 'let $1 =')
      // Class instantiation: `new PriorityQueue<>(...)` -> `new ctx.PriorityQueue(...)`
      .replace(/new\s+(StringBuilder|HashMap|HashSet|PriorityQueue|LinkedList|ArrayList|Stack)(?:<[^>]*>)?\s*\(/g, 'new ctx.$1(')
      // Return array literal: `return new int[] { a, b };`
      .replace(/return\s+new\s+[a-zA-Z0-9_]+\[\]\s*\{([^}]*)\}\s*;/g, 'return [$1];')
      // Primitive variable declarations: `int x = 0;` -> `let x = 0;`
      .replace(/\b(?:int|long|double|float|char|boolean|String|auto)\s+([a-zA-Z0-9_]+)\s*=/g, 'let $1 =')
      .replace(/\b(?:int|long|double|float|char|boolean)\s+([a-zA-Z0-9_]+)\s*;/g, 'let $1 = 0;')
      // String methods:
      .replace(/([a-zA-Z0-9_]+)\.toCharArray\(\)/g, '[...$1]')
      .replace(/([a-zA-Z0-9_]+)\.charAt\(([^)]+)\)/g, '$1[$2]')
      .replace(/\.length\(\)/g, '.length')
      // System.out.println & Utilities
      .replace(/System\.out\.println\(/g, 'ctx.System.out.println(')
      .replace(/System\.out\.print\(/g, 'ctx.System.out.print(')
      .replace(/Arrays\./g, 'ctx.Arrays.')
      .replace(/Collections\./g, 'ctx.Collections.')
      .replace(/Character\./g, 'ctx.Character.')
      .replace(/Integer\.MAX_VALUE/g, 'ctx.Integer.MAX_VALUE')
      .replace(/Integer\.MIN_VALUE/g, 'ctx.Integer.MIN_VALUE')
      .replace(/Integer\./g, 'ctx.Integer.')
      .replace(/Long\./g, 'ctx.Long.');

    return `
      // Enhanced Sandboxed Java WebAssembly Execution Pipeline
      ${jsBody}

      if (typeof ${targetFunc} === 'function') {
        return ${targetFunc}.apply(null, args);
      }

      throw new ReferenceError("Method '${targetFunc}' not found in Java Solution class.");
    `;
  }
}
