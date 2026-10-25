/**
 * Java Compiler (javac) & JVM Runtime Error Formatter.
 * Formats errors and exceptions identically to the official OpenJDK javac compiler and JVM output:
 *
 * Example (Compilation Error - Semicolon Expected):
 * Solution.java:5: error: ';' expected
 *         int complement = target - nums[i]
 *                                          ^
 * 1 error
 *
 * Example (Compilation Error - Cannot Find Symbol):
 * Solution.java:6: error: cannot find symbol
 *         if (map.containsKey(comp)) {
 *                             ^
 *   symbol:   variable comp
 *   location: class Solution
 * 1 error
 *
 * Example (Compilation Error - Method Not Found):
 * Solution.java:8: error: cannot find symbol
 *         map.add(nums[i], i);
 *            ^
 *   symbol:   method add(int,int)
 *   location: variable map of type Map
 * 1 error
 *
 * Example (Runtime Exception - NullPointer):
 * Exception in thread "main" java.lang.NullPointerException: Cannot invoke virtual method on a null object reference
 *     at Solution.twoSum(Solution.java:8)
 *     at Main.main(Main.java:24)
 *
 * Example (Runtime Exception - ArrayIndexOutOfBounds):
 * Exception in thread "main" java.lang.ArrayIndexOutOfBoundsException: Index 5 out of bounds for length 4
 *     at Solution.twoSum(Solution.java:9)
 *     at Main.main(Main.java:24)
 */

export class JavaErrorFormatter {
  /**
   * Pre-execution static analysis checking for javac syntax errors.
   * Returns a formatted javac error string if a syntax violation is found, or null if clean.
   */
  public static checkSyntax(code: string): string | null {
    const rawLines = code.split('\n');

    // 1. Check for basic class definition
    if (!code.includes('class Solution')) {
      const firstLineIdx = rawLines.findIndex((l) => l.trim().length > 0);
      const targetIdx = firstLineIdx >= 0 ? firstLineIdx : 0;
      const targetLine = rawLines[targetIdx] || '';
      return `Solution.java:${targetIdx + 1}: error: class, interface, enum, or record expected
${targetLine}
^
1 error`;
    }

    // 2. Bracket balance & string literal checks
    const openParenStack: Array<{ line: number; col: number }> = [];
    const openBraceStack: Array<{ line: number; col: number }> = [];

    for (let i = 0; i < rawLines.length; i++) {
      const lineNum = i + 1;
      const rawLine = rawLines[i];
      let inSingleQuote = false;
      let inDoubleQuote = false;
      const cleanLineChars: string[] = [];

      for (let c = 0; c < rawLine.length; c++) {
        const ch = rawLine[c];
        const prev = c > 0 ? rawLine[c - 1] : '';

        // Comments
        if (!inSingleQuote && !inDoubleQuote) {
          if (ch === '/' && rawLine[c + 1] === '/') break; // line comment
        }

        // Quotes
        if (ch === "'" && prev !== '\\' && !inDoubleQuote) {
          inSingleQuote = !inSingleQuote;
        } else if (ch === '"' && prev !== '\\' && !inSingleQuote) {
          inDoubleQuote = !inDoubleQuote;
        }

        if (!inSingleQuote && !inDoubleQuote) {
          cleanLineChars.push(ch);
          if (ch === '(') {
            openParenStack.push({ line: lineNum, col: c + 1 });
          } else if (ch === ')') {
            if (openParenStack.length === 0) {
              return `Solution.java:${lineNum}: error: class, interface, enum, or record expected
${rawLine}
${' '.repeat(c)}^
1 error`;
            }
            openParenStack.pop();
          } else if (ch === '{') {
            openBraceStack.push({ line: lineNum, col: c + 1 });
          } else if (ch === '}') {
            if (openBraceStack.length === 0) {
              return `Solution.java:${lineNum}: error: class, interface, enum, or record expected
${rawLine}
${' '.repeat(c)}^
1 error`;
            }
            openBraceStack.pop();
          }
        }
      }

      // Check unclosed string literal
      if (inDoubleQuote) {
        const col = rawLine.lastIndexOf('"');
        return `Solution.java:${lineNum}: error: unclosed string literal
${rawLine}
${' '.repeat(Math.max(0, col))}^
1 error`;
      }

      // If we are currently inside an open parenthesis (e.g. method parameter list or multiline condition),
      // we do not expect a statement semicolon on this line.
      if (openParenStack.length > 0) {
        continue;
      }

      const clean = cleanLineChars.join('').trim();
      if (!clean) continue;

      // Skip comments, annotations, imports, packages
      if (
        clean.startsWith('//') ||
        clean.startsWith('/*') ||
        clean.startsWith('*') ||
        clean.startsWith('@') ||
        clean.startsWith('package ') ||
        clean.startsWith('import ')
      ) {
        continue;
      }

      // Skip class / interface / enum definitions
      if (
        clean.startsWith('class ') ||
        clean.startsWith('public class ') ||
        clean.startsWith('interface ') ||
        clean.startsWith('enum ')
      ) {
        continue;
      }

      // Skip control flow headers (if, else, for, while, do, try, catch, finally, switch)
      if (
        clean.startsWith('if ') ||
        clean.startsWith('if(') ||
        clean.startsWith('else') ||
        clean.startsWith('for ') ||
        clean.startsWith('for(') ||
        clean.startsWith('while ') ||
        clean.startsWith('while(') ||
        clean === 'do' ||
        clean.startsWith('try') ||
        clean.startsWith('catch') ||
        clean.startsWith('finally') ||
        clean.startsWith('switch') ||
        clean.startsWith('case ') ||
        clean.startsWith('default:')
      ) {
        continue;
      }

      // Skip lines ending with continuation tokens
      const continuationTokens = ['{', '}', ';', ':', ',', '+', '-', '*', '/', '%', '&', '|', '^', '=', '?', '(', '[', '<', '>', '.'];
      const endsWithContinuation = continuationTokens.some((tok) => clean.endsWith(tok));
      if (endsWithContinuation) {
        continue;
      }

      // Check if next non-empty line starts with '{' (Allman style method or block opening)
      const nextNonEmpty = rawLines.slice(i + 1).find((l) => l.trim().length > 0)?.trim() || '';
      if (nextNonEmpty.startsWith('{')) {
        continue;
      }

      // If clean line contains recognizable statement keywords or patterns but is missing a semicolon:
      // Examples: int x = 5, return 0, map.put(a, b), break, continue, throw new ...
      const isStatement =
        clean.startsWith('return') ||
        clean.startsWith('throw') ||
        clean.startsWith('break') ||
        clean.startsWith('continue') ||
        clean.includes('=') ||
        clean.includes('++') ||
        clean.includes('--') ||
        clean.endsWith(')') ||
        clean.endsWith(']');

      if (isStatement) {
        const col = rawLine.trimEnd().length;
        return `Solution.java:${lineNum}: error: ';' expected
${rawLine}
${' '.repeat(col)}^
1 error`;
      }
    }

    // 3. Check for unclosed braces
    if (openBraceStack.length > 0) {
      const lastLine = rawLines.length;
      return `Solution.java:${lastLine}: error: reached end of file while parsing
${rawLines[lastLine - 1] || '}'}
${' '.repeat(Math.max(0, (rawLines[lastLine - 1] || '').length))}^
1 error`;
    }

    // 4. Check for unclosed parentheses
    if (openParenStack.length > 0) {
      const top = openParenStack[openParenStack.length - 1];
      const targetLine = rawLines[top.line - 1] || '';
      return `Solution.java:${top.line}: error: ')' expected
${targetLine}
${' '.repeat(Math.max(0, targetLine.length))}^
1 error`;
    }

    return null;
  }

  /**
   * Formats a runtime error, syntax error, or execution failure into authentic javac / JVM stack trace style.
   */
  public static formatRuntimeError(
    err: any,
    code: string,
    functionName: string
  ): string {
    const rawLines = code.split('\n');
    const msg = err && err.message ? err.message : String(err);

    // 1. Method not found on class Solution:
    if (msg.includes('Method') && msg.includes('not found in Java Solution class')) {
      return `Solution.java:3: error: cannot find symbol
    public int[] ${functionName}(...)
                 ^
  symbol:   method ${functionName}
  location: class Solution
1 error`;
    }

    // 2. ReferenceError: cannot find symbol (variable)
    const refMatch = msg.match(/(?:ReferenceError:\s*)?([a-zA-Z0-9_]+)\s+is\s+not\s+defined/i);
    if (refMatch) {
      const symbol = refMatch[1];
      let lineNum = 1;
      let lineText = '';
      let col = 8;

      for (let i = 0; i < rawLines.length; i++) {
        const line = rawLines[i];
        const sIdx = line.indexOf(symbol);
        if (sIdx >= 0 && !line.includes(`class `) && !line.includes(`public `)) {
          lineNum = i + 1;
          lineText = line;
          col = sIdx;
          break;
        }
      }

      if (!lineText) {
        lineText = rawLines[Math.floor(rawLines.length / 2)] || '';
        lineNum = Math.floor(rawLines.length / 2) + 1;
        col = 8;
      }

      return `Solution.java:${lineNum}: error: cannot find symbol
${lineText}
${' '.repeat(col)}^
  symbol:   variable ${symbol}
  location: class Solution
1 error`;
    }

    // 3. TypeError: method is not a function (e.g. map.add(...) instead of map.put(...))
    const fnMatch = msg.match(/(?:([a-zA-Z0-9_]+)\.)?([a-zA-Z0-9_]+)\s+is\s+not\s+a\s+function/i);
    if (fnMatch) {
      const objName = fnMatch[1];
      const fnName = fnMatch[2];
      let lineNum = 1;
      let lineText = '';
      let col = 8;

      for (let i = 0; i < rawLines.length; i++) {
        const line = rawLines[i];
        const sIdx = line.indexOf(fnName);
        if (sIdx >= 0 && (!objName || line.includes(objName))) {
          lineNum = i + 1;
          lineText = line;
          col = sIdx;
          break;
        }
      }

      if (lineText) {
        return `Solution.java:${lineNum}: error: cannot find symbol
${lineText}
${' '.repeat(col)}^
  symbol:   method ${fnName}
  location: variable ${objName || 'variable'} of class Solution
1 error`;
      }
    }

    // 4. SyntaxError during compilation / Function constructor
    if (msg.includes('SyntaxError') || msg.includes('Unexpected token')) {
      let lineNum = 3;
      let col = 8;
      let lineText = rawLines[2] || rawLines[1] || '';

      const tokenMatch = msg.match(/Unexpected token '([^']+)'/);
      if (tokenMatch) {
        const token = tokenMatch[1];
        for (let i = 0; i < rawLines.length; i++) {
          const idx = rawLines[i].indexOf(token);
          if (idx >= 0) {
            lineNum = i + 1;
            lineText = rawLines[i];
            col = idx;
            break;
          }
        }
      }

      return `Solution.java:${lineNum}: error: illegal start of expression
${lineText}
${' '.repeat(col)}^
1 error`;
    }

    // 5. NullPointerException
    if (
      msg.includes('NullPointer') ||
      msg.includes('Cannot read properties of null') ||
      msg.includes('Cannot read property of null')
    ) {
      let methodLine = 5;
      for (let i = 0; i < rawLines.length; i++) {
        if (rawLines[i].includes(functionName)) {
          methodLine = i + 2;
          break;
        }
      }

      return `Exception in thread "main" java.lang.NullPointerException: Cannot invoke virtual method on a null object reference
    at Solution.${functionName}(Solution.java:${methodLine})
    at Main.main(Main.java:24)`;
    }

    // 6. ArrayIndexOutOfBoundsException
    if (
      msg.includes('ArrayIndexOutOfBounds') ||
      msg.includes('IndexOutOfBounds') ||
      msg.includes('out of bounds') ||
      msg.includes('out of range') ||
      msg.includes('Cannot read properties of undefined')
    ) {
      let lineNum = 6;
      for (let i = 0; i < rawLines.length; i++) {
        if (rawLines[i].includes('[') && !rawLines[i].includes('class') && !rawLines[i].includes(functionName)) {
          lineNum = i + 1;
          break;
        }
      }

      const matchNum = msg.match(/\b([0-9]+)\b/);
      const idxVal = matchNum ? matchNum[1] : '5';

      return `Exception in thread "main" java.lang.ArrayIndexOutOfBoundsException: Index ${idxVal} out of bounds for length
    at Solution.${functionName}(Solution.java:${lineNum})
    at Main.main(Main.java:24)`;
    }

    // 7. EmptyStackException
    if (msg.includes('EmptyStack') || msg.includes('Stack.peek') || msg.includes('Stack.pop')) {
      let lineNum = 7;
      for (let i = 0; i < rawLines.length; i++) {
        if (rawLines[i].includes('.pop()') || rawLines[i].includes('.peek()')) {
          lineNum = i + 1;
          break;
        }
      }

      return `Exception in thread "main" java.util.EmptyStackException
    at java.base/java.util.Stack.peek(Stack.java:101)
    at java.base/java.util.Stack.pop(Stack.java:83)
    at Solution.${functionName}(Solution.java:${lineNum})
    at Main.main(Main.java:24)`;
    }

    // 8. StringIndexOutOfBoundsException
    if (msg.includes('StringIndexOutOfBounds') || msg.includes('String index out of range')) {
      let lineNum = 6;
      for (let i = 0; i < rawLines.length; i++) {
        if (rawLines[i].includes('.charAt(') || rawLines[i].includes('.substring(')) {
          lineNum = i + 1;
          break;
        }
      }
      return `Exception in thread "main" java.lang.StringIndexOutOfBoundsException: String index out of range
    at java.base/java.lang.String.charAt(String.java:702)
    at Solution.${functionName}(Solution.java:${lineNum})
    at Main.main(Main.java:24)`;
    }

    // 9. NoSuchElementException
    if (msg.includes('NoSuchElement')) {
      return `Exception in thread "main" java.util.NoSuchElementException
    at java.base/java.util.LinkedList.removeFirst(LinkedList.java:274)
    at Solution.${functionName}(Solution.java:8)
    at Main.main(Main.java:24)`;
    }

    // 10. ArithmeticException: / by zero
    if (msg.includes('/ by zero') || msg.includes('divide by zero')) {
      return `Exception in thread "main" java.lang.ArithmeticException: / by zero
    at Solution.${functionName}(Solution.java:8)
    at Main.main(Main.java:24)`;
    }

    // Generic Java Exception fallback
    return `Exception in thread "main" java.lang.RuntimeException: ${msg}
    at Solution.${functionName}(Solution.java:5)
    at Main.main(Main.java:24)`;
  }
}
