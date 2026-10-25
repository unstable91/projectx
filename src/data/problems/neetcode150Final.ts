import { Problem } from '../../types';

export const NEETCODE_150_FINAL_PROBLEMS: Problem[] = [
  {
    id: 'p-can-place-flowers',
    slug: 'can-place-flowers',
    title: 'Can Place Flowers',
    difficulty: 'Easy',
    category: 'Greedy',
    tags: ['Array', 'Greedy'],
    functionName: 'canPlaceFlowers',
    paramNames: ['flowerbed', 'n'],
    description: `You have a long flowerbed in which some of the plots are planted, and some are not. However, flowers cannot be planted in **adjacent** plots.

Given an integer array \`flowerbed\` containing \`0\`'s and \`1\`'s, where \`0\` means empty and \`1\` means not empty, and an integer \`n\`, return \`true\` *if* \`n\` *new flowers can be planted in the* \`flowerbed\` *without violating the no-adjacent-flowers rule and* \`false\` *otherwise*.

### Example 1:
\`\`\`
Input: flowerbed = [1,0,0,0,1], n = 1
Output: true
\`\`\`

### Example 2:
\`\`\`
Input: flowerbed = [1,0,0,0,1], n = 2
Output: false
\`\`\`

### Constraints:
- \`1 <= flowerbed.length <= 2 * 10^4\`
- \`flowerbed[i]\` is \`0\` or \`1\`.
- There are no two adjacent flowers in \`flowerbed\`.
- \`0 <= n <= flowerbed.length\`
`,
    starterCode: {
      javascript: `/**
 * @param {number[]} flowerbed
 * @param {number} n
 * @return {boolean}
 */
function canPlaceFlowers(flowerbed, n) {
  let count = 0;
  for (let i = 0; i < flowerbed.length; i++) {
    if (flowerbed[i] === 0) {
      const emptyLeft = (i === 0 || flowerbed[i - 1] === 0);
      const emptyRight = (i === flowerbed.length - 1 || flowerbed[i + 1] === 0);
      if (emptyLeft && emptyRight) {
        flowerbed[i] = 1;
        count++;
      }
    }
  }
  return count >= n;
}`,
      python: `class Solution:
    def canPlaceFlowers(self, flowerbed: list[int], n: int) -> bool:
        count = 0
        for i in range(len(flowerbed)):
            if flowerbed[i] == 0:
                empty_left = (i == 0 or flowerbed[i - 1] == 0)
                empty_right = (i == len(flowerbed) - 1 or flowerbed[i + 1] == 0)
                if empty_left and empty_right:
                    flowerbed[i] = 1
                    count += 1
        return count >= n`,
      cpp: `#include <vector>
using namespace std;

class Solution {
public:
    bool canPlaceFlowers(vector<int>& flowerbed, int n) {
        int count = 0;
        int len = flowerbed.size();
        for (int i = 0; i < len; i++) {
            if (flowerbed[i] == 0) {
                bool emptyLeft = (i == 0 || flowerbed[i - 1] == 0);
                bool emptyRight = (i == len - 1 || flowerbed[i + 1] == 0);
                if (emptyLeft && emptyRight) {
                    flowerbed[i] = 1;
                    count++;
                }
            }
        }
        return count >= n;
    }
};`,
      java: `class Solution {
    public boolean canPlaceFlowers(int[] flowerbed, int n) {
        int count = 0;
        for (int i = 0; i < flowerbed.length; i++) {
            if (flowerbed[i] == 0) {
                boolean emptyLeft = (i == 0 || flowerbed[i - 1] == 0);
                boolean emptyRight = (i == flowerbed.length - 1 || flowerbed[i + 1] == 0);
                if (emptyLeft && emptyRight) {
                    flowerbed[i] = 1;
                    count++;
                }
            }
        }
        return count >= n;
    }
}`
    },
    sampleTestCases: [
      { id: 'cpf-1', input: [[1, 0, 0, 0, 1], 1], expectedOutput: true },
      { id: 'cpf-2', input: [[1, 0, 0, 0, 1], 2], expectedOutput: false }
    ],
    hiddenTestCases: [
      { id: 'cpf-h1', input: [[0, 0, 1, 0, 0], 1], expectedOutput: true, isHidden: true },
      { id: 'cpf-h2', input: [[0], 1], expectedOutput: true, isHidden: true }
    ],
    hints: ['Check if both neighbors (or boundaries) are 0.'],
    solutionExplanation: `Greedy placement: At each plot \`i\`, if \`flowerbed[i] == 0\` and both left and right neighbors are empty, plant a flower and increment planted count.

- **Time Complexity:** O(n)
- **Space Complexity:** O(1)`,
    timeLimitMs: 2000,
    memoryLimitMb: 128,
    acceptanceRate: 31.8,
    totalSubmissions: 250000,
    acceptedSubmissions: 79500
  },
  {
    id: 'p-is-subsequence',
    slug: 'is-subsequence',
    title: 'Is Subsequence',
    difficulty: 'Easy',
    category: 'Two Pointers',
    tags: ['Two Pointers', 'String', 'Dynamic Programming'],
    functionName: 'isSubsequence',
    paramNames: ['s', 't'],
    description: `Given two strings \`s\` and \`t\`, return \`true\` *if* \`s\` *is a **subsequence** of* \`t\`, *or* \`false\` *otherwise*.

A **subsequence** of a string is a new string that is formed from the original string by deleting some (can be none) of the characters without disturbing the relative positions of the remaining characters. (i.e., \`"ace"\` is a subsequence of \`"abcde"\` while \`"aec"\` is not).

### Example 1:
\`\`\`
Input: s = "abc", t = "ahbgdc"
Output: true
\`\`\`

### Example 2:
\`\`\`
Input: s = "axc", t = "ahbgdc"
Output: false
\`\`\`

### Constraints:
- \`0 <= s.length <= 100\`
- \`0 <= t.length <= 10^4\`
- \`s\` and \`t\` consist only of lowercase English letters.
`,
    starterCode: {
      javascript: `/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
function isSubsequence(s, t) {
  let i = 0, j = 0;
  while (i < s.length && j < t.length) {
    if (s[i] === t[j]) i++;
    j++;
  }
  return i === s.length;
}`,
      python: `class Solution:
    def isSubsequence(self, s: str, t: str) -> bool:
        i, j = 0, 0
        while i < len(s) and j < len(t):
            if s[i] == t[j]:
                i += 1
            j += 1
        return i == len(s)`,
      cpp: `#include <string>
using namespace std;

class Solution {
public:
    bool isSubsequence(string s, string t) {
        size_t i = 0, j = 0;
        while (i < s.size() && j < t.size()) {
            if (s[i] == t[j]) i++;
            j++;
        }
        return i == s.size();
    }
};`,
      java: `class Solution {
    public boolean isSubsequence(String s, String t) {
        int i = 0, j = 0;
        while (i < s.length() && j < t.length()) {
            if (s.charAt(i) == t.charAt(j)) i++;
            j++;
        }
        return i == s.length();
    }
}`
    },
    sampleTestCases: [
      { id: 'iss-1', input: ['abc', 'ahbgdc'], expectedOutput: true },
      { id: 'iss-2', input: ['axc', 'ahbgdc'], expectedOutput: false }
    ],
    hiddenTestCases: [
      { id: 'iss-h1', input: ['', 'ahbgdc'], expectedOutput: true, isHidden: true },
      { id: 'iss-h2', input: ['b', 'c'], expectedOutput: false, isHidden: true }
    ],
    hints: ['Two pointers: advance pointer in s only when characters match.'],
    solutionExplanation: `Two pointers: Advance \`i\` through \`s\` only when \`s[i] == t[j]\`. Always advance \`j\` through \`t\`. Return \`i == len(s)\`.

- **Time Complexity:** O(len(t))
- **Space Complexity:** O(1)`,
    timeLimitMs: 2000,
    memoryLimitMb: 128,
    acceptanceRate: 47.9,
    totalSubmissions: 310000,
    acceptedSubmissions: 148490
  },
  {
    id: 'p-pascals-triangle',
    slug: 'pascals-triangle',
    title: "Pascal's Triangle",
    difficulty: 'Easy',
    category: 'Dynamic Programming',
    tags: ['Array', 'Dynamic Programming'],
    functionName: 'generate',
    paramNames: ['numRows'],
    description: `Given an integer \`numRows\`, return the first \`numRows\` of **Pascal's triangle**.

In **Pascal's triangle**, each number is the sum of the two numbers directly above it.

### Example 1:
\`\`\`
Input: numRows = 5
Output: [[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]
\`\`\`

### Example 2:
\`\`\`
Input: numRows = 1
Output: [[1]]
\`\`\`

### Constraints:
- \`1 <= numRows <= 30\`
`,
    starterCode: {
      javascript: `/**
 * @param {number} numRows
 * @return {number[][]}
 */
function generate(numRows) {
  const triangle = [];
  for (let i = 0; i < numRows; i++) {
    const row = new Array(i + 1).fill(1);
    for (let j = 1; j < i; j++) {
      row[j] = triangle[i - 1][j - 1] + triangle[i - 1][j];
    }
    triangle.push(row);
  }
  return triangle;
}`,
      python: `class Solution:
    def generate(self, numRows: int) -> list[list[int]]:
        triangle = []
        for i in range(numRows):
            row = [1] * (i + 1)
            for j in range(1, i):
                row[j] = triangle[i - 1][j - 1] + triangle[i - 1][j]
            triangle.append(row)
        return triangle`,
      cpp: `#include <vector>
using namespace std;

class Solution {
public:
    vector<vector<int>> generate(int numRows) {
        vector<vector<int>> triangle;
        for (int i = 0; i < numRows; i++) {
            vector<int> row(i + 1, 1);
            for (int j = 1; j < i; j++) {
                row[j] = triangle[i - 1][j - 1] + triangle[i - 1][j];
            }
            triangle.push_back(row);
        }
        return triangle;
    }
};`,
      java: `import java.util.*;

class Solution {
    public List<List<Integer>> generate(int numRows) {
        List<List<Integer>> triangle = new ArrayList<>();
        for (int i = 0; i < numRows; i++) {
            List<Integer> row = new ArrayList<>();
            for (int j = 0; j <= i; j++) {
                if (j == 0 || j == i) {
                    row.add(1);
                } else {
                    row.add(triangle.get(i - 1).get(j - 1) + triangle.get(i - 1).get(j));
                }
            }
            triangle.add(row);
        }
        return triangle;
    }
}`
    },
    sampleTestCases: [
      { id: 'pt-1', input: [5], expectedOutput: [[1], [1, 1], [1, 2, 1], [1, 3, 3, 1], [1, 4, 6, 4, 1]] },
      { id: 'pt-2', input: [1], expectedOutput: [[1]] }
    ],
    hiddenTestCases: [
      { id: 'pt-h1', input: [2], expectedOutput: [[1], [1, 1]], isHidden: true }
    ],
    hints: ['row[j] = prevRow[j - 1] + prevRow[j].'],
    solutionExplanation: `Iterate through row 0 to numRows - 1. Each interior element at index \`j\` is the sum of \`prevRow[j - 1] + prevRow[j]\`.

- **Time Complexity:** O(numRows²)
- **Space Complexity:** O(numRows²)`,
    timeLimitMs: 2000,
    memoryLimitMb: 128,
    acceptanceRate: 72.5,
    totalSubmissions: 310000,
    acceptedSubmissions: 224750
  },
  {
    id: 'p-fibonacci-number',
    slug: 'fibonacci-number',
    title: 'Fibonacci Number',
    difficulty: 'Easy',
    category: 'Dynamic Programming',
    tags: ['Math', 'Dynamic Programming', 'Recursion', 'Memoization'],
    functionName: 'fib',
    paramNames: ['n'],
    description: `The **Fibonacci numbers**, commonly denoted \`F(n)\` form a sequence, called the **Fibonacci sequence**, such that each number is the sum of the two preceding ones, starting from \`0\` and \`1\`. That is,

\`\`\`
F(0) = 0, F(1) = 1
F(n) = F(n - 1) + F(n - 2), for n > 1.
\`\`\`

Given \`n\`, calculate \`F(n)\`.

### Example 1:
\`\`\`
Input: n = 2
Output: 1
Explanation: F(2) = F(1) + F(0) = 1 + 0 = 1.
\`\`\`

### Example 2:
\`\`\`
Input: n = 3
Output: 2
Explanation: F(3) = F(2) + F(1) = 1 + 1 = 2.
\`\`\`

### Example 3:
\`\`\`
Input: n = 4
Output: 3
Explanation: F(4) = F(3) + F(2) = 2 + 1 = 3.
\`\`\`

### Constraints:
- \`0 <= n <= 30\`
`,
    starterCode: {
      javascript: `/**
 * @param {number} n
 * @return {number}
 */
function fib(n) {
  if (n <= 1) return n;
  let a = 0, b = 1;
  for (let i = 2; i <= n; i++) {
    const c = a + b;
    a = b;
    b = c;
  }
  return b;
}`,
      python: `class Solution:
    def fib(self, n: int) -> int:
        if n <= 1:
            return n
        a, b = 0, 1
        for _ in range(2, n + 1):
            a, b = b, a + b
        return b`,
      cpp: `class Solution {
public:
    int fib(int n) {
        if (n <= 1) return n;
        int a = 0, b = 1;
        for (int i = 2; i <= n; i++) {
            int c = a + b;
            a = b;
            b = c;
        }
        return b;
    }
};`,
      java: `class Solution {
    public int fib(int n) {
        if (n <= 1) return n;
        int a = 0, b = 1;
        for (int i = 2; i <= n; i++) {
            int c = a + b;
            a = b;
            b = c;
        }
        return b;
    }
}`
    },
    sampleTestCases: [
      { id: 'fib-1', input: [2], expectedOutput: 1 },
      { id: 'fib-2', input: [3], expectedOutput: 2 },
      { id: 'fib-3', input: [4], expectedOutput: 3 }
    ],
    hiddenTestCases: [
      { id: 'fib-h1', input: [0], expectedOutput: 0, isHidden: true },
      { id: 'fib-h2', input: [1], expectedOutput: 1, isHidden: true }
    ],
    hints: ['Compute iteratively with two variables.'],
    solutionExplanation: `Iterative Fibonacci using 2 state variables in O(1) space.

- **Time Complexity:** O(n)
- **Space Complexity:** O(1)`,
    timeLimitMs: 2000,
    memoryLimitMb: 128,
    acceptanceRate: 70.1,
    totalSubmissions: 350000,
    acceptedSubmissions: 245350
  },
  {
    id: 'p-power-of-two',
    slug: 'power-of-two',
    title: 'Power of Two',
    difficulty: 'Easy',
    category: 'Bit Manipulation',
    tags: ['Math', 'Bit Manipulation', 'Recursion'],
    functionName: 'isPowerOfTwo',
    paramNames: ['n'],
    description: `Given an integer \`n\`, return \`true\` *if it is a power of two. Otherwise, return* \`false\`.

An integer \`n\` is a power of two, if there exists an integer \`x\` such that \`n == 2^x\`.

### Example 1:
\`\`\`
Input: n = 1
Output: true
Explanation: 2^0 = 1
\`\`\`

### Example 2:
\`\`\`
Input: n = 16
Output: true
Explanation: 2^4 = 16
\`\`\`

### Example 3:
\`\`\`
Input: n = 3
Output: false
\`\`\`

### Constraints:
- \`-2^31 <= n <= 2^31 - 1\`
`,
    starterCode: {
      javascript: `/**
 * @param {number} n
 * @return {boolean}
 */
function isPowerOfTwo(n) {
  return n > 0 && (n & (n - 1)) === 0;
}`,
      python: `class Solution:
    def isPowerOfTwo(self, n: int) -> bool:
        return n > 0 and (n & (n - 1)) == 0`,
      cpp: `class Solution {
public:
    bool isPowerOfTwo(int n) {
        return n > 0 && (n & (n - 1)) == 0;
    }
};`,
      java: `class Solution {
    public boolean isPowerOfTwo(int n) {
        return n > 0 && (n & (n - 1)) == 0;
    }
}`
    },
    sampleTestCases: [
      { id: 'pot-1', input: [1], expectedOutput: true },
      { id: 'pot-2', input: [16], expectedOutput: true },
      { id: 'pot-3', input: [3], expectedOutput: false }
    ],
    hiddenTestCases: [
      { id: 'pot-h1', input: [0], expectedOutput: false, isHidden: true },
      { id: 'pot-h2', input: [-16], expectedOutput: false, isHidden: true }
    ],
    hints: ['A power of two in binary has exactly one bit set: n & (n - 1) == 0.'],
    solutionExplanation: `Powers of two in binary have exactly one set bit. \`n & (n - 1)\` turns off that bit. If \`n > 0\` and \`n & (n - 1) == 0\`, it is a power of two.

- **Time Complexity:** O(1)
- **Space Complexity:** O(1)`,
    timeLimitMs: 2000,
    memoryLimitMb: 128,
    acceptanceRate: 46.8,
    totalSubmissions: 310000,
    acceptedSubmissions: 145080
  },
  {
    id: 'p-ugly-number',
    slug: 'ugly-number',
    title: 'Ugly Number',
    difficulty: 'Easy',
    category: 'Math & Geometry',
    tags: ['Math'],
    functionName: 'isUgly',
    paramNames: ['n'],
    description: `An **ugly number** is a positive integer whose prime factors are limited to \`2\`, \`3\`, and \`5\`.

Given an integer \`n\`, return \`true\` *if* \`n\` *is an **ugly number***.

### Example 1:
\`\`\`
Input: n = 6
Output: true
Explanation: 6 = 2 × 3
\`\`\`

### Example 2:
\`\`\`
Input: n = 1
Output: true
Explanation: 1 has no prime factors, therefore all of its prime factors are limited to 2, 3, and 5.
\`\`\`

### Example 3:
\`\`\`
Input: n = 14
Output: false
Explanation: 14 is not ugly since it includes the prime factor 7.
\`\`\`

### Constraints:
- \`-2^31 <= n <= 2^31 - 1\`
`,
    starterCode: {
      javascript: `/**
 * @param {number} n
 * @return {boolean}
 */
function isUgly(n) {
  if (n <= 0) return false;
  for (const factor of [2, 3, 5]) {
    while (n % factor === 0) {
      n /= factor;
    }
  }
  return n === 1;
}`,
      python: `class Solution:
    def isUgly(self, n: int) -> bool:
        if n <= 0:
            return False
        for p in [2, 3, 5]:
            while n % p == 0:
                n //= p
        return n == 1`,
      cpp: `class Solution {
public:
    bool isUgly(int n) {
        if (n <= 0) return false;
        for (int p : {2, 3, 5}) {
            while (n % p == 0) n /= p;
        }
        return n == 1;
    }
};`,
      java: `class Solution {
    public boolean isUgly(int n) {
        if (n <= 0) return false;
        for (int p : new int[]{2, 3, 5}) {
            while (n % p == 0) n /= p;
        }
        return n == 1;
    }
}`
    },
    sampleTestCases: [
      { id: 'un-1', input: [6], expectedOutput: true },
      { id: 'un-2', input: [1], expectedOutput: true },
      { id: 'un-3', input: [14], expectedOutput: false }
    ],
    hiddenTestCases: [
      { id: 'un-h1', input: [0], expectedOutput: false, isHidden: true },
      { id: 'un-h2', input: [8], expectedOutput: true, isHidden: true }
    ],
    hints: ['Divide out all factors of 2, 3, and 5 continuously.'],
    solutionExplanation: `Repeatedly divide \`n\` by 2, 3, and 5 as long as it divides evenly. If the final value is 1, all prime factors were from {2, 3, 5}.

- **Time Complexity:** O(log n)
- **Space Complexity:** O(1)`,
    timeLimitMs: 2000,
    memoryLimitMb: 128,
    acceptanceRate: 42.1,
    totalSubmissions: 250000,
    acceptedSubmissions: 105250
  }
];
