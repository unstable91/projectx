/**
 * Robust deep comparison for LeetCode-style test case verification.
 * Handles nested arrays, objects, IEEE floating point epsilons, and types.
 */

export function deepCompare(actual: any, expected: any, epsilon = 1e-6): boolean {
  if (actual === expected) {
    return true;
  }

  // Handle NaN (in JS, NaN === NaN is false)
  if (typeof actual === 'number' && typeof expected === 'number') {
    if (Number.isNaN(actual) && Number.isNaN(expected)) return true;
    if (Math.abs(actual - expected) <= epsilon) return true;
    return false;
  }

  if (actual === null || actual === undefined || expected === null || expected === undefined) {
    return actual === expected;
  }

  // Type mismatch
  if (typeof actual !== typeof expected) {
    return false;
  }

  // Array comparison
  if (Array.isArray(actual) && Array.isArray(expected)) {
    if (actual.length !== expected.length) {
      return false;
    }
    for (let i = 0; i < actual.length; i++) {
      if (!deepCompare(actual[i], expected[i], epsilon)) {
        return false;
      }
    }
    return true;
  }

  if (Array.isArray(actual) !== Array.isArray(expected)) {
    return false;
  }

  // Object comparison
  if (typeof actual === 'object' && typeof expected === 'object') {
    const actualKeys = Object.keys(actual).sort();
    const expectedKeys = Object.keys(expected).sort();

    if (actualKeys.length !== expectedKeys.length) {
      return false;
    }

    for (let i = 0; i < actualKeys.length; i++) {
      const key = actualKeys[i];
      if (key !== expectedKeys[i]) return false;
      if (!deepCompare(actual[key], expected[key], epsilon)) {
        return false;
      }
    }
    return true;
  }

  return false;
}

export function formatOutput(val: any): string {
  if (val === undefined) return 'undefined';
  if (val === null) return 'null';
  if (typeof val === 'string') return `"${val}"`;
  try {
    return JSON.stringify(val);
  } catch (err) {
    return String(val);
  }
}
