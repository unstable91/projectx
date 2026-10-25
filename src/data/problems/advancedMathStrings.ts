import { Problem } from '../../types';

export const ADVANCED_MATH_STRINGS_PROBLEMS: Problem[] = [
  {
    id: 'p-happy-number',
    slug: 'happy-number',
    title: 'Happy Number',
    difficulty: 'Easy',
    category: 'Math & Geometry',
    tags: ['Hash Table', 'Math', 'Two Pointers'],
    functionName: 'isHappy',
    paramNames: ['n'],
    description: `Write an algorithm to determine if a number \`n\` is happy.

A **happy number** is a number defined by the following process:
- Starting with any positive integer, replace the number by the sum of the squares of its digits.
- Repeat the process until the number equals \`1\` (where it will stay), or it **loops endlessly in a cycle** which does not include \`1\`.
- Those numbers for which this process **ends in 1** are happy.

Return \`true\` *if* \`n\` *is a happy number, and* \`false\` *if not*.

### Example 1:
\`\`\`
Input: n = 19
Output: true
Explanation:
1^2 + 9^2 = 82
8^2 + 2^2 = 68
6^2 + 8^2 = 100
1^2 + 0^2 + 0^2 = 1
\`\`\`

### Example 2:
\`\`\`
Input: n = 2
Output: false
\`\`\`

### Constraints:
- \`1 <= n <= 2^31 - 1\`
`,
    starterCode: {
      javascript: `/**
 * @param {number} n
 * @return {boolean}
 */
function isHappy(n) {
  function getNext(num) {
    let sum = 0;
    while (num > 0) {
      const d = num % 10;
      sum += d * d;
      num = Math.floor(num / 10);
    }
    return sum;
  }

  // Floyd's Cycle-Finding Algorithm (Tortoise & Hare)
  let slow = n, fast = getNext(n);
  while (fast !== 1 && slow !== fast) {
    slow = getNext(slow);
    fast = getNext(getNext(fast));
  }
  return fast === 1;
}`,
      python: `class Solution:
    def isHappy(self, n: int) -> bool:
        def get_next(num):
            total = 0
            while num > 0:
                d = num % 10
                total += d * d
                num //= 10
            return total

        slow = n
        fast = get_next(n)
        while fast != 1 and slow != fast:
            slow = get_next(slow)
            fast = get_next(get_next(fast))
        return fast == 1`,
      cpp: `class Solution {
public:
    bool isHappy(int n) {
        auto getNext = [](int num) {
            int total = 0;
            while (num > 0) {
                int d = num % 10;
                total += d * d;
                num /= 10;
            }
            return total;
        };
        int slow = n, fast = getNext(n);
        while (fast != 1 && slow != fast) {
            slow = getNext(slow);
            fast = getNext(getNext(fast));
        }
        return fast == 1;
    }
};`,
      java: `class Solution {
    public boolean isHappy(int n) {
        int slow = n, fast = getNext(n);
        while (fast != 1 && slow != fast) {
            slow = getNext(slow);
            fast = getNext(getNext(fast));
        }
        return fast == 1;
    }
    private int getNext(int num) {
        int sum = 0;
        while (num > 0) {
            int d = num % 10;
            sum += d * d;
            num /= 10;
        }
        return sum;
    }
}`
    },
    sampleTestCases: [
      { id: 'hn-1', input: [19], expectedOutput: true },
      { id: 'hn-2', input: [2], expectedOutput: false }
    ],
    hiddenTestCases: [
      { id: 'hn-h1', input: [1], expectedOutput: true, isHidden: true },
      { id: 'hn-h2', input: [7], expectedOutput: true, isHidden: true }
    ],
    hints: [
      "Use Floyd's Cycle-Finding Algorithm (fast & slow pointer) to detect loops without extra memory."
    ],
    solutionExplanation: `Cycle detection: Either the sequence reaches 1 or falls into a loop. Use Floyd's Tortoise and Hare algorithm to detect the cycle in O(1) space.

- **Time Complexity:** O(log n)
- **Space Complexity:** O(1)`,
    timeLimitMs: 2000,
    memoryLimitMb: 128,
    acceptanceRate: 56.4,
    totalSubmissions: 250000,
    acceptedSubmissions: 141000
  },
  {
    id: 'p-plus-one',
    slug: 'plus-one',
    title: 'Plus One',
    difficulty: 'Easy',
    category: 'Math & Geometry',
    tags: ['Array', 'Math'],
    functionName: 'plusOne',
    paramNames: ['digits'],
    description: `You are given a **large integer** represented as an integer array \`digits\`, where each \`digits[i]\` is the \`i-th\` digit of the integer. The digits are ordered from most significant to least significant in left-to-right order. The large integer does not contain any leading \`0\`'s.

Increment the large integer by one and return *the resulting array of digits*.

### Example 1:
\`\`\`
Input: digits = [1,2,3]
Output: [1,2,4]
Explanation: The array represents the integer 123.
Incrementing by one gives 123 + 1 = 124.
Thus, the result should be [1,2,4].
\`\`\`

### Example 2:
\`\`\`
Input: digits = [4,3,2,1]
Output: [4,3,2,2]
\`\`\`

### Example 3:
\`\`\`
Input: digits = [9]
Output: [1,0]
\`\`\`

### Constraints:
- \`1 <= digits.length <= 100\`
- \`0 <= digits[i] <= 9\`
- \`digits\` does not contain any leading \`0\`'s.
`,
    starterCode: {
      javascript: `/**
 * @param {number[]} digits
 * @return {number[]}
 */
function plusOne(digits) {
  for (let i = digits.length - 1; i >= 0; i--) {
    if (digits[i] < 9) {
      digits[i]++;
      return digits;
    }
    digits[i] = 0;
  }
  digits.unshift(1);
  return digits;
}`,
      python: `class Solution:
    def plusOne(self, digits: list[int]) -> list[int]:
        for i in range(len(digits) - 1, -1, -1):
            if digits[i] < 9:
                digits[i] += 1
                return digits
            digits[i] = 0
        return [1] + digits`,
      cpp: `#include <vector>
using namespace std;

class Solution {
public:
    vector<int> plusOne(vector<int>& digits) {
        for (int i = digits.size() - 1; i >= 0; i--) {
            if (digits[i] < 9) {
                digits[i]++;
                return digits;
            }
            digits[i] = 0;
        }
        digits.insert(digits.begin(), 1);
        return digits;
    }
};`,
      java: `class Solution {
    public int[] plusOne(int[] digits) {
        for (int i = digits.length - 1; i >= 0; i--) {
            if (digits[i] < 9) {
                digits[i]++;
                return digits;
            }
            digits[i] = 0;
        }
        int[] res = new int[digits.length + 1];
        res[0] = 1;
        return res;
    }
}`
    },
    sampleTestCases: [
      { id: 'po-1', input: [[1, 2, 3]], expectedOutput: [1, 2, 4] },
      { id: 'po-2', input: [[4, 3, 2, 1]], expectedOutput: [4, 3, 2, 2] },
      { id: 'po-3', input: [[9]], expectedOutput: [1, 0] }
    ],
    hiddenTestCases: [
      { id: 'po-h1', input: [[9, 9, 9]], expectedOutput: [1, 0, 0, 0], isHidden: true }
    ],
    hints: [
      'Iterate backwards from the least significant digit.'
    ],
    solutionExplanation: `Iterate from right to left. If digit < 9, increment and return. If 9, set to 0. If loop completes, prepend 1.

- **Time Complexity:** O(n)
- **Space Complexity:** O(1)`,
    timeLimitMs: 2000,
    memoryLimitMb: 128,
    acceptanceRate: 45.1,
    totalSubmissions: 310000,
    acceptedSubmissions: 139810
  },
  {
    id: 'p-powx-n',
    slug: 'powx-n',
    title: 'Pow(x, n)',
    difficulty: 'Medium',
    category: 'Math & Geometry',
    tags: ['Math', 'Recursion'],
    functionName: 'myPow',
    paramNames: ['x', 'n'],
    description: `Implement \`pow(x, n)\`, which calculates \`x\` raised to the power \`n\` (i.e., \`x^n\`).

### Example 1:
\`\`\`
Input: x = 2.00000, n = 10
Output: 1024.00000
\`\`\`

### Example 2:
\`\`\`
Input: x = 2.10000, n = 3
Output: 9.26100
\`\`\`

### Example 3:
\`\`\`
Input: x = 2.00000, n = -2
Output: 0.25000
Explanation: 2^-2 = 1/2^2 = 1/4 = 0.25
\`\`\`

### Constraints:
- \`-100.0 < x < 100.0\`
- \`-2^31 <= n <= 2^31 - 1\`
- \`n\` is an integer.
`,
    starterCode: {
      javascript: `/**
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
function myPow(x, n) {
  function fastPow(base, exp) {
    if (exp === 0) return 1;
    const half = fastPow(base, Math.floor(exp / 2));
    if (exp % 2 === 0) {
      return half * half;
    } else {
      return half * half * base;
    }
  }

  const exp = Math.abs(n);
  const res = fastPow(x, exp);
  return n < 0 ? 1 / res : res;
}`,
      python: `class Solution:
    def myPow(self, x: float, n: int) -> float:
        def fast_pow(base, exp):
            if exp == 0:
                return 1.0
            half = fast_pow(base, exp // 2)
            if exp % 2 == 0:
                return half * half
            else:
                return half * half * base

        res = fast_pow(x, abs(n))
        return 1 / res if n < 0 else res`,
      cpp: `class Solution {
public:
    double myPow(double x, int n) {
        long long exp = n;
        if (exp < 0) {
            x = 1 / x;
            exp = -exp;
        }
        double res = 1;
        while (exp > 0) {
            if (exp % 2 == 1) res *= x;
            x *= x;
            exp /= 2;
        }
        return res;
    }
};`,
      java: `class Solution {
    public double myPow(double x, int n) {
        long exp = n;
        if (exp < 0) {
            x = 1 / x;
            exp = -exp;
        }
        double res = 1;
        while (exp > 0) {
            if (exp % 2 == 1) res *= x;
            x *= x;
            exp /= 2;
        }
        return res;
    }
}`
    },
    sampleTestCases: [
      { id: 'pow-1', input: [2.0, 10], expectedOutput: 1024.0 },
      { id: 'pow-2', input: [2.1, 3], expectedOutput: 9.261 },
      { id: 'pow-3', input: [2.0, -2], expectedOutput: 0.25 }
    ],
    hiddenTestCases: [
      { id: 'pow-h1', input: [1.0, 2147483647], expectedOutput: 1.0, isHidden: true }
    ],
    hints: [
      'Binary exponentiation: x^n = (x^(n/2))^2 if n is even.'
    ],
    solutionExplanation: `Binary Exponentiation: Divide exponent by 2 in each step. If exponent is odd, multiply by current base; square base in each iteration.

- **Time Complexity:** O(log n)
- **Space Complexity:** O(1)`,
    timeLimitMs: 2000,
    memoryLimitMb: 128,
    acceptanceRate: 34.5,
    totalSubmissions: 250000,
    acceptedSubmissions: 86250
  },
  {
    id: 'p-reverse-integer',
    slug: 'reverse-integer',
    title: 'Reverse Integer',
    difficulty: 'Medium',
    category: 'Math & Geometry',
    tags: ['Math'],
    functionName: 'reverse',
    paramNames: ['x'],
    description: `Given a signed 32-bit integer \`x\`, return \`x\` *with its digits reversed*. If reversing \`x\` causes the value to go outside the signed 32-bit integer range \`[-2^31, 2^31 - 1]\`, then return \`0\`.

**Assume the environment does not allow you to store 64-bit integers (signed or unsigned).**

### Example 1:
\`\`\`
Input: x = 123
Output: 321
\`\`\`

### Example 2:
\`\`\`
Input: x = -123
Output: -321
\`\`\`

### Example 3:
\`\`\`
Input: x = 120
Output: 21
\`\`\`

### Constraints:
- \`-2^31 <= x <= 2^31 - 1\`
`,
    starterCode: {
      javascript: `/**
 * @param {number} x
 * @return {number}
 */
function reverse(x) {
  const sign = x < 0 ? -1 : 1;
  let num = Math.abs(x);
  let res = 0;

  while (num > 0) {
    res = res * 10 + (num % 10);
    num = Math.floor(num / 10);
  }
  res *= sign;
  if (res < -2147483648 || res > 2147483647) return 0;
  return res;
}`,
      python: `class Solution:
    def reverse(self, x: int) -> int:
        sign = -1 if x < 0 else 1
        x = abs(x)
        res = 0
        while x > 0:
            res = res * 10 + (x % 10)
            x //= 10
        res *= sign
        if res < -2**31 or res > 2**31 - 1:
            return 0
        return res`,
      cpp: `class Solution {
public:
    int reverse(int x) {
        long long res = 0;
        while (x != 0) {
            res = res * 10 + (x % 10);
            x /= 10;
        }
        if (res < -2147483648LL || res > 2147483647LL) return 0;
        return (int)res;
    }
};`,
      java: `class Solution {
    public int reverse(int x) {
        long res = 0;
        while (x != 0) {
            res = res * 10 + (x % 10);
            x /= 10;
        }
        if (res < Integer.MIN_VALUE || res > Integer.MAX_VALUE) return 0;
        return (int) res;
    }
}`
    },
    sampleTestCases: [
      { id: 'ri-1', input: [123], expectedOutput: 321 },
      { id: 'ri-2', input: [-123], expectedOutput: -321 },
      { id: 'ri-3', input: [120], expectedOutput: 21 }
    ],
    hiddenTestCases: [
      { id: 'ri-h1', input: [1534236469], expectedOutput: 0, isHidden: true }
    ],
    hints: [
      'Extract digits with mod 10 and construct the reversed integer. Check 32-bit overflow.'
    ],
    solutionExplanation: `Extract least significant digits using \`x % 10\` and add to \`res * 10\`. Check boundary constraints for 32-bit signed integer limits \`[-2³¹, 2³¹ - 1]\`.

- **Time Complexity:** O(log₁₀(x)) <= 10 iterations
- **Space Complexity:** O(1)`,
    timeLimitMs: 2000,
    memoryLimitMb: 128,
    acceptanceRate: 28.5,
    totalSubmissions: 310000,
    acceptedSubmissions: 88350
  },
  {
    id: 'p-palindrome-number',
    slug: 'palindrome-number',
    title: 'Palindrome Number',
    difficulty: 'Easy',
    category: 'Math & Geometry',
    tags: ['Math'],
    functionName: 'isPalindrome',
    paramNames: ['x'],
    description: `Given an integer \`x\`, return \`true\` *if* \`x\` *is a **palindrome**, and* \`false\` *otherwise*.

### Example 1:
\`\`\`
Input: x = 121
Output: true
Explanation: 121 reads as 121 from left to right and from right to left.
\`\`\`

### Example 2:
\`\`\`
Input: x = -121
Output: false
Explanation: From left to right, it reads -121. From right to left, it becomes 121-. Therefore it is not a palindrome.
\`\`\`

### Example 3:
\`\`\`
Input: x = 10
Output: false
Explanation: Reads 01 from right to left. Therefore it is not a palindrome.
\`\`\`

### Constraints:
- \`-2^31 <= x <= 2^31 - 1\`
`,
    starterCode: {
      javascript: `/**
 * @param {number} x
 * @return {boolean}
 */
function isPalindrome(x) {
  if (x < 0 || (x % 10 === 0 && x !== 0)) return false;
  let reverted = 0;
  while (x > reverted) {
    reverted = reverted * 10 + (x % 10);
    x = Math.floor(x / 10);
  }
  return x === reverted || x === Math.floor(reverted / 10);
}`,
      python: `class Solution:
    def isPalindrome(self, x: int) -> bool:
        if x < 0 or (x % 10 == 0 and x != 0):
            return False
        reverted = 0
        while x > reverted:
            reverted = reverted * 10 + (x % 10)
            x //= 10
        return x == reverted or x == reverted // 10`,
      cpp: `class Solution {
public:
    bool isPalindrome(int x) {
        if (x < 0 || (x % 10 == 0 && x != 0)) return false;
        int reverted = 0;
        while (x > reverted) {
            reverted = reverted * 10 + (x % 10);
            x /= 10;
        }
        return x == reverted || x == reverted / 10;
    }
};`,
      java: `class Solution {
    public boolean isPalindrome(int x) {
        if (x < 0 || (x % 10 == 0 && x != 0)) return false;
        int reverted = 0;
        while (x > reverted) {
            reverted = reverted * 10 + (x % 10);
            x /= 10;
        }
        return x == reverted || x == reverted / 10;
    }
}`
    },
    sampleTestCases: [
      { id: 'pn-1', input: [121], expectedOutput: true },
      { id: 'pn-2', input: [-121], expectedOutput: false },
      { id: 'pn-3', input: [10], expectedOutput: false }
    ],
    hiddenTestCases: [
      { id: 'pn-h1', input: [0], expectedOutput: true, isHidden: true }
    ],
    hints: [
      'Reverse only the second half of the number and compare with the first half.'
    ],
    solutionExplanation: `Reverse half the number to avoid 32-bit overflow issues. When \`x <= reverted\`, compare if \`x == reverted\` or \`x == reverted / 10\` (for odd digit counts).

- **Time Complexity:** O(log₁₀(x))
- **Space Complexity:** O(1)`,
    timeLimitMs: 2000,
    memoryLimitMb: 128,
    acceptanceRate: 55.2,
    totalSubmissions: 350000,
    acceptedSubmissions: 193200
  },
  {
    id: 'p-roman-to-integer',
    slug: 'roman-to-integer',
    title: 'Roman to Integer',
    difficulty: 'Easy',
    category: 'Math & Geometry',
    tags: ['Hash Table', 'Math', 'String'],
    functionName: 'romanToInt',
    paramNames: ['s'],
    description: `Roman numerals are represented by seven different symbols: \`I\`, \`V\`, \`X\`, \`L\`, \`C\`, \`D\` and \`M\`.

\`\`\`
Symbol       Value
I             1
V             5
X             10
L             50
C             100
D             500
M             1000
\`\`\`

Given a roman numeral, convert it to an integer.

### Example 1:
\`\`\`
Input: s = "III"
Output: 3
\`\`\`

### Example 2:
\`\`\`
Input: s = "LVIII"
Output: 58
Explanation: L = 50, V= 5, III = 3.
\`\`\`

### Example 3:
\`\`\`
Input: s = "MCMXCIV"
Output: 1994
Explanation: M = 1000, CM = 900, XC = 90 and IV = 4.
\`\`\`

### Constraints:
- \`1 <= s.length <= 15\`
- \`s\` contains only the characters ('I', 'V', 'X', 'L', 'C', 'D', 'M').
`,
    starterCode: {
      javascript: `/**
 * @param {string} s
 * @return {number}
 */
function romanToInt(s) {
  const map = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
  let total = 0;
  for (let i = 0; i < s.length; i++) {
    const cur = map[s[i]];
    const next = map[s[i + 1]] || 0;
    if (cur < next) {
      total -= cur;
    } else {
      total += cur;
    }
  }
  return total;
}`,
      python: `class Solution:
    def romanToInt(self, s: str) -> int:
        val = {'I': 1, 'V': 5, 'X': 10, 'L': 50, 'C': 100, 'D': 500, 'M': 1000}
        total = 0
        for i in range(len(s)):
            if i + 1 < len(s) and val[s[i]] < val[s[i + 1]]:
                total -= val[s[i]]
            else:
                total += val[s[i]]
        return total`,
      cpp: `#include <string>
#include <unordered_map>
using namespace std;

class Solution {
public:
    int romanToInt(string s) {
        unordered_map<char, int> val = {
            {'I', 1}, {'V', 5}, {'X', 10}, {'L', 50},
            {'C', 100}, {'D', 500}, {'M', 1000}
        };
        int total = 0;
        for (int i = 0; i < s.size(); i++) {
            if (i + 1 < s.size() && val[s[i]] < val[s[i + 1]]) {
                total -= val[s[i]];
            } else {
                total += val[s[i]];
            }
        }
        return total;
    }
};`,
      java: `import java.util.*;

class Solution {
    public int romanToInt(String s) {
        Map<Character, Integer> val = new HashMap<>();
        val.put('I', 1); val.put('V', 5); val.put('X', 10);
        val.put('L', 50); val.put('C', 100); val.put('D', 500); val.put('M', 1000);

        int total = 0;
        for (int i = 0; i < s.length(); i++) {
            int cur = val.get(s.charAt(i));
            int next = (i + 1 < s.length()) ? val.get(s.charAt(i + 1)) : 0;
            if (cur < next) total -= cur;
            else total += cur;
        }
        return total;
    }
}`
    },
    sampleTestCases: [
      { id: 'rti-1', input: ['III'], expectedOutput: 3 },
      { id: 'rti-2', input: ['LVIII'], expectedOutput: 58 },
      { id: 'rti-3', input: ['MCMXCIV'], expectedOutput: 1994 }
    ],
    hiddenTestCases: [
      { id: 'rti-h1', input: ['IX'], expectedOutput: 9, isHidden: true },
      { id: 'rti-h2', input: ['XL'], expectedOutput: 40, isHidden: true }
    ],
    hints: [
      'If a smaller numeral appears before a larger one, subtract it; otherwise add it.'
    ],
    solutionExplanation: `Single pass: If \`value[s[i]] < value[s[i + 1]]\`, it is a subtractive combination (e.g. IV = 4), so subtract \`value[s[i]]\`. Otherwise, add it.

- **Time Complexity:** O(n)
- **Space Complexity:** O(1)`,
    timeLimitMs: 2000,
    memoryLimitMb: 128,
    acceptanceRate: 60.5,
    totalSubmissions: 300000,
    acceptedSubmissions: 181500
  }
];
