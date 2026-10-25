import { Problem } from '../../types';

export const MATH_BITWISE_PROBLEMS: Problem[] = [
  {
    id: 'p-single-number',
    slug: 'single-number',
    title: 'Single Number',
    difficulty: 'Easy',
    category: 'Bit Manipulation',
    tags: ['Array', 'Bit Manipulation'],
    functionName: 'singleNumber',
    paramNames: ['nums'],
    description: `Given a **non-empty** array of integers \`nums\`, every element appears *twice* except for one. Find that single one.

You must implement a solution with a linear runtime complexity and use only constant extra space.

### Example 1:
\`\`\`
Input: nums = [2,2,1]
Output: 1
\`\`\`

### Example 2:
\`\`\`
Input: nums = [4,1,2,1,2]
Output: 4
\`\`\`

### Example 3:
\`\`\`
Input: nums = [1]
Output: 1
\`\`\`

### Constraints:
- \`1 <= nums.length <= 3 * 10^4\`
- \`-3 * 10^4 <= nums[i] <= 3 * 10^4\`
- Each element in the array appears twice except for one element which appears only once.
`,
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @return {number}
 */
function singleNumber(nums) {
  let res = 0;
  for (const n of nums) {
    res ^= n;
  }
  return res;
}`,
      python: `class Solution:
    def singleNumber(self, nums: list[int]) -> int:
        res = 0
        for n in nums:
            res ^= n
        return res`,
      cpp: `#include <vector>
using namespace std;

class Solution {
public:
    int singleNumber(vector<int>& nums) {
        int res = 0;
        for (int n : nums) res ^= n;
        return res;
    }
};`,
      java: `class Solution {
    public int singleNumber(int[] nums) {
        int res = 0;
        for (int n : nums) res ^= n;
        return res;
    }
}`
    },
    sampleTestCases: [
      { id: 'sn-1', input: [[2, 2, 1]], expectedOutput: 1 },
      { id: 'sn-2', input: [[4, 1, 2, 1, 2]], expectedOutput: 4 },
      { id: 'sn-3', input: [[1]], expectedOutput: 1 }
    ],
    hiddenTestCases: [
      { id: 'sn-h1', input: [[-1, -1, -2]], expectedOutput: -2, isHidden: true }
    ],
    hints: [
      'XOR properties: a ^ a = 0 and a ^ 0 = a.'
    ],
    solutionExplanation: `XOR all numbers together. All numbers appearing twice cancel each other out (\`a ^ a = 0\`), leaving only the single number.

- **Time Complexity:** O(n)
- **Space Complexity:** O(1)`,
    timeLimitMs: 2000,
    memoryLimitMb: 128,
    acceptanceRate: 72.8,
    totalSubmissions: 310000,
    acceptedSubmissions: 225680
  },
  {
    id: 'p-number-of-1-bits',
    slug: 'number-of-1-bits',
    title: 'Number of 1 Bits',
    difficulty: 'Easy',
    category: 'Bit Manipulation',
    tags: ['Divide and Conquer', 'Bit Manipulation'],
    functionName: 'hammingWeight',
    paramNames: ['n'],
    description: `Write a function that takes the binary representation of a positive integer and returns the number of **set bits** it has (also known as the Hamming weight).

### Example 1:
\`\`\`
Input: n = 11
Output: 3
Explanation: The input binary string 1011 has a total of three set bits.
\`\`\`

### Example 2:
\`\`\`
Input: n = 128
Output: 1
Explanation: The input binary string 10000000 has a total of one set bit.
\`\`\`

### Example 3:
\`\`\`
Input: n = 2147483645
Output: 30
\`\`\`

### Constraints:
- \`1 <= n <= 2^31 - 1\`
`,
    starterCode: {
      javascript: `/**
 * @param {number} n
 * @return {number}
 */
function hammingWeight(n) {
  let count = 0;
  while (n > 0) {
    n &= (n - 1); // Brian Kernighan's Algorithm
    count++;
  }
  return count;
}`,
      python: `class Solution:
    def hammingWeight(self, n: int) -> int:
        count = 0
        while n:
            n &= (n - 1)
            count += 1
        return count`,
      cpp: `class Solution {
public:
    int hammingWeight(int n) {
        int count = 0;
        while (n) {
            n &= (n - 1);
            count++;
        }
        return count;
    }
};`,
      java: `class Solution {
    public int hammingWeight(int n) {
        int count = 0;
        while (n != 0) {
            n &= (n - 1);
            count++;
        }
        return count;
    }
}`
    },
    sampleTestCases: [
      { id: 'hw-1', input: [11], expectedOutput: 3 },
      { id: 'hw-2', input: [128], expectedOutput: 1 },
      { id: 'hw-3', input: [2147483645], expectedOutput: 30 }
    ],
    hiddenTestCases: [
      { id: 'hw-h1', input: [1], expectedOutput: 1, isHidden: true },
      { id: 'hw-h2', input: [3], expectedOutput: 2, isHidden: true }
    ],
    hints: [
      "Brian Kernighan's trick: n & (n - 1) clears the lowest set bit."
    ],
    solutionExplanation: `Brian Kernighan's Algorithm: \`n = n & (n - 1)\` turns off the lowest set bit in each iteration. The number of iterations equals the exact number of set bits.

- **Time Complexity:** O(number of set bits) <= 32 operations
- **Space Complexity:** O(1)`,
    timeLimitMs: 2000,
    memoryLimitMb: 128,
    acceptanceRate: 70.1,
    totalSubmissions: 280000,
    acceptedSubmissions: 196280
  },
  {
    id: 'p-counting-bits',
    slug: 'counting-bits',
    title: 'Counting Bits',
    difficulty: 'Easy',
    category: 'Bit Manipulation',
    tags: ['Dynamic Programming', 'Bit Manipulation'],
    functionName: 'countBits',
    paramNames: ['n'],
    description: `Given an integer \`n\`, return *an array* \`ans\` *of length* \`n + 1\` *such that for each* \`i\` (\`0 <= i <= n\`), \`ans[i]\` *is the **number of** \`1\`**'s** in the binary representation of* \`i\`.

### Example 1:
\`\`\`
Input: n = 2
Output: [0,1,1]
Explanation:
0 --> 0
1 --> 1
2 --> 10
\`\`\`

### Example 2:
\`\`\`
Input: n = 5
Output: [0,1,1,2,1,2]
Explanation:
0 --> 0
1 --> 1
2 --> 10
3 --> 11
4 --> 100
5 --> 101
\`\`\`

### Constraints:
- \`0 <= n <= 10^5\`
`,
    starterCode: {
      javascript: `/**
 * @param {number} n
 * @return {number[]}
 */
function countBits(n) {
  const dp = new Array(n + 1).fill(0);
  for (let i = 1; i <= n; i++) {
    dp[i] = dp[i >> 1] + (i & 1);
  }
  return dp;
}`,
      python: `class Solution:
    def countBits(self, n: int) -> list[int]:
        dp = [0] * (n + 1)
        for i in range(1, n + 1):
            dp[i] = dp[i >> 1] + (i & 1)
        return dp`,
      cpp: `#include <vector>
using namespace std;

class Solution {
public:
    vector<int> countBits(int n) {
        vector<int> dp(n + 1, 0);
        for (int i = 1; i <= n; i++) {
            dp[i] = dp[i >> 1] + (i & 1);
        }
        return dp;
    }
};`,
      java: `class Solution {
    public int[] countBits(int n) {
        int[] dp = new int[n + 1];
        for (int i = 1; i <= n; i++) {
            dp[i] = dp[i >> 1] + (i & 1);
        }
        return dp;
    }
}`
    },
    sampleTestCases: [
      { id: 'cb-1', input: [2], expectedOutput: [0, 1, 1] },
      { id: 'cb-2', input: [5], expectedOutput: [0, 1, 1, 2, 1, 2] }
    ],
    hiddenTestCases: [
      { id: 'cb-h1', input: [0], expectedOutput: [0], isHidden: true },
      { id: 'cb-h2', input: [1], expectedOutput: [0, 1], isHidden: true }
    ],
    hints: [
      'Relation: countBits(i) = countBits(i >> 1) + (i & 1).'
    ],
    solutionExplanation: `Dynamic Programming with bit shifting: An integer \`i\` has the same number of bits as \`i >> 1\` plus 1 if the last bit is set (\`i & 1\`).

- **Time Complexity:** O(n)
- **Space Complexity:** O(1) auxiliary space`,
    timeLimitMs: 2000,
    memoryLimitMb: 128,
    acceptanceRate: 78.4,
    totalSubmissions: 230000,
    acceptedSubmissions: 180320
  },
  {
    id: 'p-missing-number',
    slug: 'missing-number',
    title: 'Missing Number',
    difficulty: 'Easy',
    category: 'Bit Manipulation',
    tags: ['Array', 'Hash Table', 'Math', 'Binary Search', 'Bit Manipulation'],
    functionName: 'missingNumber',
    paramNames: ['nums'],
    description: `Given an array \`nums\` containing \`n\` distinct numbers in the range \`[0, n]\`, return *the only number in the range that is missing from the array*.

### Example 1:
\`\`\`
Input: nums = [3,0,1]
Output: 2
Explanation: n = 3 since there are 3 numbers, so all numbers are in the range [0,3]. 2 is the missing number.
\`\`\`

### Example 2:
\`\`\`
Input: nums = [0,1]
Output: 2
\`\`\`

### Example 3:
\`\`\`
Input: nums = [9,6,4,2,3,5,7,0,1]
Output: 8
\`\`\`

### Constraints:
- \`n == nums.length\`
- \`1 <= n <= 10^4\`
- \`0 <= nums[i] <= n\`
- All the numbers of \`nums\` are **unique**.
`,
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @return {number}
 */
function missingNumber(nums) {
  const n = nums.length;
  const expectedSum = (n * (n + 1)) / 2;
  const actualSum = nums.reduce((acc, x) => acc + x, 0);
  return expectedSum - actualSum;
}`,
      python: `class Solution:
    def missingNumber(self, nums: list[int]) -> int:
        n = len(nums)
        return (n * (n + 1)) // 2 - sum(nums)`,
      cpp: `#include <vector>
#include <numeric>
using namespace std;

class Solution {
public:
    int missingNumber(vector<int>& nums) {
        int n = nums.size();
        int expected = n * (n + 1) / 2;
        int actual = accumulate(nums.begin(), nums.end(), 0);
        return expected - actual;
    }
};`,
      java: `class Solution {
    public int missingNumber(int[] nums) {
        int n = nums.length;
        int expected = n * (n + 1) / 2;
        int actual = 0;
        for (int x : nums) actual += x;
        return expected - actual;
    }
}`
    },
    sampleTestCases: [
      { id: 'mn-1', input: [[3, 0, 1]], expectedOutput: 2 },
      { id: 'mn-2', input: [[0, 1]], expectedOutput: 2 },
      { id: 'mn-3', input: [[9, 6, 4, 2, 3, 5, 7, 0, 1]], expectedOutput: 8 }
    ],
    hiddenTestCases: [
      { id: 'mn-h1', input: [[0]], expectedOutput: 1, isHidden: true },
      { id: 'mn-h2', input: [[1]], expectedOutput: 0, isHidden: true }
    ],
    hints: [
      'Gauss summation formula: sum = n * (n + 1) / 2.'
    ],
    solutionExplanation: `Calculate expected sum of numbers 0 to n using Gauss' formula \`n * (n + 1) / 2\`. Subtract the actual sum of array elements. Alternatively, XOR all indices and values.

- **Time Complexity:** O(n)
- **Space Complexity:** O(1)`,
    timeLimitMs: 2000,
    memoryLimitMb: 128,
    acceptanceRate: 66.5,
    totalSubmissions: 310000,
    acceptedSubmissions: 206150
  },
  {
    id: 'p-rotate-image',
    slug: 'rotate-image',
    title: 'Rotate Image',
    difficulty: 'Medium',
    category: 'Math & Geometry',
    tags: ['Array', 'Math', 'Matrix'],
    functionName: 'rotate',
    paramNames: ['matrix'],
    description: `You are given an \`n x n\` 2D matrix representing an image, rotate the image by **90 degrees (clockwise)**.

You have to rotate the image **in-place**, which means you have to modify the input 2D matrix directly. **DO NOT** allocate another 2D matrix and do the rotation.

### Example 1:
\`\`\`
Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]
Output: [[7,4,1],[8,5,2],[9,6,3]]
\`\`\`

### Example 2:
\`\`\`
Input: matrix = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]
Output: [[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]
\`\`\`

### Constraints:
- \`n == matrix.length == matrix[i].length\`
- \`1 <= n <= 20\`
- \`-1000 <= matrix[i][j] <= 1000\`
`,
    starterCode: {
      javascript: `/**
 * @param {number[][]} matrix
 * @return {number[][]}
 */
function rotate(matrix) {
  const n = matrix.length;
  // Transpose
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const temp = matrix[i][j];
      matrix[i][j] = matrix[j][i];
      matrix[j][i] = temp;
    }
  }
  // Reverse each row
  for (let i = 0; i < n; i++) {
    matrix[i].reverse();
  }
  return matrix;
}`,
      python: `class Solution:
    def rotate(self, matrix: list[list[int]]) -> list[list[int]]:
        n = len(matrix)
        for i in range(n):
            for j in range(i + 1, n):
                matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]
        for row in matrix:
            row.reverse()
        return matrix`,
      cpp: `#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    vector<vector<int>> rotate(vector<vector<int>>& matrix) {
        int n = matrix.size();
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                swap(matrix[i][j], matrix[j][i]);
            }
        }
        for (int i = 0; i < n; i++) {
            reverse(matrix[i].begin(), matrix[i].end());
        }
        return matrix;
    }
};`,
      java: `class Solution {
    public int[][] rotate(int[][] matrix) {
        int n = matrix.length;
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                int temp = matrix[i][j];
                matrix[i][j] = matrix[j][i];
                matrix[j][i] = temp;
            }
        }
        for (int i = 0; i < n; i++) {
            int left = 0, right = n - 1;
            while (left < right) {
                int temp = matrix[i][left];
                matrix[i][left] = matrix[i][right];
                matrix[i][right] = temp;
                left++;
                right--;
            }
        }
        return matrix;
    }
}`
    },
    sampleTestCases: [
      { id: 'rot-1', input: [[[1, 2, 3], [4, 5, 6], [7, 8, 9]]], expectedOutput: [[7, 4, 1], [8, 5, 2], [9, 6, 3]] },
      { id: 'rot-2', input: [[[5, 1, 9, 11], [2, 4, 8, 10], [13, 3, 6, 7], [15, 14, 12, 16]]], expectedOutput: [[15, 13, 2, 5], [14, 3, 4, 1], [12, 6, 8, 9], [16, 7, 10, 11]] }
    ],
    hiddenTestCases: [
      { id: 'rot-h1', input: [[[1]]], expectedOutput: [[1]], isHidden: true }
    ],
    hints: [
      'Rotating 90 degrees clockwise is equivalent to transposing the matrix and then reversing each row.'
    ],
    solutionExplanation: `In-place rotation: First transpose the matrix (swap matrix[i][j] with matrix[j][i]), then reverse each horizontal row.

- **Time Complexity:** O(n²)
- **Space Complexity:** O(1)`,
    timeLimitMs: 2000,
    memoryLimitMb: 128,
    acceptanceRate: 73.1,
    totalSubmissions: 240000,
    acceptedSubmissions: 175440
  },
  {
    id: 'p-spiral-matrix',
    slug: 'spiral-matrix',
    title: 'Spiral Matrix',
    difficulty: 'Medium',
    category: 'Math & Geometry',
    tags: ['Array', 'Matrix', 'Simulation'],
    functionName: 'spiralOrder',
    paramNames: ['matrix'],
    description: `Given an \`m x n\` \`matrix\`, return *all elements of the* \`matrix\` *in spiral order*.

### Example 1:
\`\`\`
Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]
Output: [1,2,3,6,9,8,7,4,5]
\`\`\`

### Example 2:
\`\`\`
Input: matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]
Output: [1,2,3,4,8,12,11,10,9,5,6,7]
\`\`\`

### Constraints:
- \`m == matrix.length\`
- \`n == matrix[i].length\`
- \`1 <= m, n <= 10\`
- \`-100 <= matrix[i][j] <= 100\`
`,
    starterCode: {
      javascript: `/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
function spiralOrder(matrix) {
  const res = [];
  let top = 0, bottom = matrix.length - 1;
  let left = 0, right = matrix[0].length - 1;

  while (top <= bottom && left <= right) {
    for (let c = left; c <= right; c++) res.push(matrix[top][c]);
    top++;
    for (let r = top; r <= bottom; r++) res.push(matrix[r][right]);
    right--;

    if (top <= bottom) {
      for (let c = right; c >= left; c--) res.push(matrix[bottom][c]);
      bottom--;
    }
    if (left <= right) {
      for (let r = bottom; r >= top; r--) res.push(matrix[r][left]);
      left++;
    }
  }
  return res;
}`,
      python: `class Solution:
    def spiralOrder(self, matrix: list[list[int]]) -> list[int]:
        res = []
        top, bottom = 0, len(matrix) - 1
        left, right = 0, len(matrix[0]) - 1

        while top <= bottom and left <= right:
            for c in range(left, right + 1):
                res.append(matrix[top][c])
            top += 1
            for r in range(top, bottom + 1):
                res.append(matrix[r][right])
            right -= 1

            if top <= bottom:
                for c in range(right, left - 1, -1):
                    res.append(matrix[bottom][c])
                bottom -= 1

            if left <= right:
                for r in range(bottom, top - 1, -1):
                    res.append(matrix[r][left])
                left += 1

        return res`,
      cpp: `#include <vector>
using namespace std;

class Solution {
public:
    vector<int> spiralOrder(vector<vector<int>>& matrix) {
        vector<int> res;
        int top = 0, bottom = matrix.size() - 1;
        int left = 0, right = matrix[0].size() - 1;

        while (top <= bottom && left <= right) {
            for (int c = left; c <= right; c++) res.push_back(matrix[top][c]);
            top++;
            for (int r = top; r <= bottom; r++) res.push_back(matrix[r][right]);
            right--;

            if (top <= bottom) {
                for (int c = right; c >= left; c--) res.push_back(matrix[bottom][c]);
                bottom--;
            }
            if (left <= right) {
                for (int r = bottom; r >= top; r--) res.push_back(matrix[r][left]);
                left++;
            }
        }
        return res;
    }
};`,
      java: `import java.util.*;

class Solution {
    public List<Integer> spiralOrder(int[][] matrix) {
        List<Integer> res = new ArrayList<>();
        int top = 0, bottom = matrix.length - 1;
        int left = 0, right = matrix[0].length - 1;

        while (top <= bottom && left <= right) {
            for (int c = left; c <= right; c++) res.add(matrix[top][c]);
            top++;
            for (int r = top; r <= bottom; r++) res.add(matrix[r][right]);
            right--;

            if (top <= bottom) {
                for (int c = right; c >= left; c--) res.add(matrix[bottom][c]);
                bottom--;
            }
            if (left <= right) {
                for (int r = bottom; r >= top; r--) res.add(matrix[r][left]);
                left++;
            }
        }
        return res;
    }
}`
    },
    sampleTestCases: [
      { id: 'sp-1', input: [[[1, 2, 3], [4, 5, 6], [7, 8, 9]]], expectedOutput: [1, 2, 3, 6, 9, 8, 7, 4, 5] },
      { id: 'sp-2', input: [[[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]]], expectedOutput: [1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6, 7] }
    ],
    hiddenTestCases: [
      { id: 'sp-h1', input: [[[1]]], expectedOutput: [1], isHidden: true }
    ],
    hints: [
      'Maintain 4 boundaries: top, bottom, left, right. Inwardly contract boundaries after each perimeter traversal.'
    ],
    solutionExplanation: `Maintain boundary pointers: top, bottom, left, right. Traverse top row (left -> right), right column (top -> bottom), bottom row (right -> left), left column (bottom -> top). Shrink bounds inward.

- **Time Complexity:** O(M * N)
- **Space Complexity:** O(1) auxiliary space`,
    timeLimitMs: 2000,
    memoryLimitMb: 128,
    acceptanceRate: 48.6,
    totalSubmissions: 210000,
    acceptedSubmissions: 102060
  }
];
