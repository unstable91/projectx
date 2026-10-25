import { Problem } from '../../types';

export const DYNAMIC_PROGRAMMING_PROBLEMS: Problem[] = [
  {
    id: 'p-climbing-stairs',
    slug: 'climbing-stairs',
    title: 'Climbing Stairs',
    difficulty: 'Easy',
    category: 'Dynamic Programming',
    tags: ['Math', 'Dynamic Programming', 'Memoization'],
    functionName: 'climbStairs',
    paramNames: ['n'],
    description: `You are climbing a staircase. It takes \`n\` steps to reach the top.

Each time you can either climb \`1\` or \`2\` steps. In how many distinct ways can you climb to the top?

### Example 1:
\`\`\`
Input: n = 2
Output: 2
Explanation: There are two ways to climb to the top.
1. 1 step + 1 step
2. 2 steps
\`\`\`

### Example 2:
\`\`\`
Input: n = 3
Output: 3
Explanation: There are three ways to climb to the top.
1. 1 step + 1 step + 1 step
2. 1 step + 2 steps
3. 2 steps + 1 step
\`\`\`

### Constraints:
- \`1 <= n <= 45\`
`,
    starterCode: {
      javascript: `/**
 * @param {number} n
 * @return {number}
 */
function climbStairs(n) {
  if (n <= 2) return n;
  let a = 1, b = 2;
  for (let i = 3; i <= n; i++) {
    const c = a + b;
    a = b;
    b = c;
  }
  return b;
}`,
      python: `class Solution:
    def climbStairs(self, n: int) -> int:
        if n <= 2:
            return n
        a, b = 1, 2
        for _ in range(3, n + 1):
            a, b = b, a + b
        return b`,
      cpp: `class Solution {
public:
    int climbStairs(int n) {
        if (n <= 2) return n;
        int a = 1, b = 2;
        for (int i = 3; i <= n; i++) {
            int c = a + b;
            a = b;
            b = c;
        }
        return b;
    }
};`,
      java: `class Solution {
    public int climbStairs(int n) {
        if (n <= 2) return n;
        int a = 1, b = 2;
        for (int i = 3; i <= n; i++) {
            int c = a + b;
            a = b;
            b = c;
        }
        return b;
    }
}`
    },
    sampleTestCases: [
      { id: 'cs-1', input: [2], expectedOutput: 2 },
      { id: 'cs-2', input: [3], expectedOutput: 3 }
    ],
    hiddenTestCases: [
      { id: 'cs-h1', input: [4], expectedOutput: 5, isHidden: true },
      { id: 'cs-h2', input: [5], expectedOutput: 8, isHidden: true },
      { id: 'cs-h3', input: [10], expectedOutput: 89, isHidden: true }
    ],
    hints: [
      'To reach step n, you must come from either step n - 1 or step n - 2.'
    ],
    solutionExplanation: `This matches the Fibonacci recurrence: \`ways(n) = ways(n - 1) + ways(n - 2)\`. Can be computed with two variables in O(1) space.

- **Time Complexity:** O(n)
- **Space Complexity:** O(1)`,
    timeLimitMs: 2000,
    memoryLimitMb: 128,
    acceptanceRate: 52.3,
    totalSubmissions: 310000,
    acceptedSubmissions: 162130
  },
  {
    id: 'p-coin-change',
    slug: 'coin-change',
    title: 'Coin Change',
    difficulty: 'Medium',
    category: 'Dynamic Programming',
    tags: ['Array', 'Dynamic Programming', 'Breadth-First Search'],
    functionName: 'coinChange',
    paramNames: ['coins', 'amount'],
    description: `You are given an integer array \`coins\` representing coins of different denominations and an integer \`amount\` representing a total amount of money.

Return *the fewest number of coins that you need to make up that amount*. If that amount of money cannot be made up by any combination of the coins, return \`-1\`.

You may assume that you have an infinite number of each kind of coin.

### Example 1:
\`\`\`
Input: coins = [1,2,5], amount = 11
Output: 3
Explanation: 11 = 5 + 5 + 1
\`\`\`

### Example 2:
\`\`\`
Input: coins = [2], amount = 3
Output: -1
\`\`\`

### Example 3:
\`\`\`
Input: coins = [1], amount = 0
Output: 0
\`\`\`

### Constraints:
- \`1 <= coins.length <= 12\`
- \`1 <= coins[i] <= 2^31 - 1\`
- \`0 <= amount <= 10^4\`
`,
    starterCode: {
      javascript: `/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
function coinChange(coins, amount) {
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;

  for (let i = 1; i <= amount; i++) {
    for (const c of coins) {
      if (i - c >= 0) {
        dp[i] = Math.min(dp[i], dp[i - c] + 1);
      }
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount];
}`,
      python: `class Solution:
    def coinChange(self, coins: list[int], amount: int) -> int:
        dp = [float('inf')] * (amount + 1)
        dp[0] = 0
        for i in range(1, amount + 1):
            for c in coins:
                if i - c >= 0:
                    dp[i] = min(dp[i], dp[i - c] + 1)
        return -1 if dp[amount] == float('inf') else dp[amount]`,
      cpp: `#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int coinChange(vector<int>& coins, int amount) {
        vector<int> dp(amount + 1, amount + 1);
        dp[0] = 0;
        for (int i = 1; i <= amount; i++) {
            for (int c : coins) {
                if (i - c >= 0) {
                    dp[i] = min(dp[i], dp[i - c] + 1);
                }
            }
        }
        return dp[amount] > amount ? -1 : dp[amount];
    }
};`,
      java: `import java.util.Arrays;

class Solution {
    public int coinChange(int[] coins, int amount) {
        int[] dp = new int[amount + 1];
        Arrays.fill(dp, amount + 1);
        dp[0] = 0;
        for (int i = 1; i <= amount; i++) {
            for (int c : coins) {
                if (i - c >= 0) {
                    dp[i] = Math.min(dp[i], dp[i - c] + 1);
                }
            }
        }
        return dp[amount] > amount ? -1 : dp[amount];
    }
}`
    },
    sampleTestCases: [
      { id: 'cc-1', input: [[1, 2, 5], 11], expectedOutput: 3 },
      { id: 'cc-2', input: [[2], 3], expectedOutput: -1 },
      { id: 'cc-3', input: [[1], 0], expectedOutput: 0 }
    ],
    hiddenTestCases: [
      { id: 'cc-h1', input: [[186, 419, 83, 408], 6249], expectedOutput: 20, isHidden: true },
      { id: 'cc-h2', input: [[2, 5, 10, 1], 27], expectedOutput: 4, isHidden: true }
    ],
    hints: [
      'Think of it bottom-up: dp[i] = min coins to make amount i.'
    ],
    solutionExplanation: `Bottom-up DP: \`dp[i] = min(dp[i], dp[i - coin] + 1)\` for each coin where \`i - coin >= 0\`.

- **Time Complexity:** O(amount * len(coins))
- **Space Complexity:** O(amount)`,
    timeLimitMs: 2500,
    memoryLimitMb: 128,
    acceptanceRate: 42.8,
    totalSubmissions: 260000,
    acceptedSubmissions: 111280
  },
  {
    id: 'p-house-robber',
    slug: 'house-robber',
    title: 'House Robber',
    difficulty: 'Medium',
    category: 'Dynamic Programming',
    tags: ['Array', 'Dynamic Programming'],
    functionName: 'rob',
    paramNames: ['nums'],
    description: `You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security systems connected and **it will automatically contact the police if two adjacent houses were broken into on the same night**.

Given an integer array \`nums\` representing the amount of money of each house, return *the maximum amount of money you can rob tonight **without alerting the police***.

### Example 1:
\`\`\`
Input: nums = [1,2,3,1]
Output: 4
Explanation: Rob house 1 (money = 1) and then rob house 3 (money = 3).
Total amount you can rob = 1 + 3 = 4.
\`\`\`

### Example 2:
\`\`\`
Input: nums = [2,7,9,3,1]
Output: 12
Explanation: Rob house 1 (money = 2), rob house 3 (money = 9) and rob house 5 (money = 1).
Total amount you can rob = 2 + 9 + 1 = 12.
\`\`\`

### Constraints:
- \`1 <= nums.length <= 100\`
- \`0 <= nums[i] <= 400\`
`,
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @return {number}
 */
function rob(nums) {
  let rob1 = 0, rob2 = 0;
  for (const n of nums) {
    const temp = Math.max(rob1 + n, rob2);
    rob1 = rob2;
    rob2 = temp;
  }
  return rob2;
}`,
      python: `class Solution:
    def rob(self, nums: list[int]) -> int:
        rob1, rob2 = 0, 0
        for n in nums:
            temp = max(rob1 + n, rob2)
            rob1 = rob2
            rob2 = temp
        return rob2`,
      cpp: `#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int rob(vector<int>& nums) {
        int rob1 = 0, rob2 = 0;
        for (int n : nums) {
            int temp = max(rob1 + n, rob2);
            rob1 = rob2;
            rob2 = temp;
        }
        return rob2;
    }
};`,
      java: `class Solution {
    public int rob(int[] nums) {
        int rob1 = 0, rob2 = 0;
        for (int n : nums) {
            int temp = Math.max(rob1 + n, rob2);
            rob1 = rob2;
            rob2 = temp;
        }
        return rob2;
    }
}`
    },
    sampleTestCases: [
      { id: 'hr-1', input: [[1, 2, 3, 1]], expectedOutput: 4 },
      { id: 'hr-2', input: [[2, 7, 9, 3, 1]], expectedOutput: 12 }
    ],
    hiddenTestCases: [
      { id: 'hr-h1', input: [[2, 1, 1, 2]], expectedOutput: 4, isHidden: true },
      { id: 'hr-h2', input: [[0]], expectedOutput: 0, isHidden: true }
    ],
    hints: [
      'At house i, you either rob house i + best of (i-2), or skip house i and take best of (i-1).'
    ],
    solutionExplanation: `Recurrence: \`maxRob[i] = max(nums[i] + maxRob[i - 2], maxRob[i - 1])\`. This can be maintained using just two variables \`rob1\` and \`rob2\`.

- **Time Complexity:** O(n)
- **Space Complexity:** O(1)`,
    timeLimitMs: 2000,
    memoryLimitMb: 128,
    acceptanceRate: 50.1,
    totalSubmissions: 280000,
    acceptedSubmissions: 140280
  },
  {
    id: 'p-house-robber-ii',
    slug: 'house-robber-ii',
    title: 'House Robber II',
    difficulty: 'Medium',
    category: 'Dynamic Programming',
    tags: ['Array', 'Dynamic Programming'],
    functionName: 'rob',
    paramNames: ['nums'],
    description: `You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed. All houses at this place are **arranged in a circle**. That means the first house is the neighbor of the last one. Meanwhile, adjacent houses have a security system connected, and **it will automatically contact the police if two adjacent houses were broken into on the same night**.

Given an integer array \`nums\` representing the amount of money of each house, return *the maximum amount of money you can rob tonight without alerting the police*.

### Example 1:
\`\`\`
Input: nums = [2,3,2]
Output: 3
Explanation: You cannot rob house 1 (money = 2) and then rob house 3 (money = 2), because they are adjacent houses.
\`\`\`

### Example 2:
\`\`\`
Input: nums = [1,2,3,1]
Output: 4
Explanation: Rob house 1 (money = 1) and then rob house 3 (money = 3).
Total amount you can rob = 1 + 3 = 4.
\`\`\`

### Constraints:
- \`1 <= nums.length <= 100\`
- \`0 <= nums[i] <= 1000\`
`,
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @return {number}
 */
function rob(nums) {
  if (nums.length === 1) return nums[0];

  function helper(start, end) {
    let rob1 = 0, rob2 = 0;
    for (let i = start; i < end; i++) {
      const temp = Math.max(rob1 + nums[i], rob2);
      rob1 = rob2;
      rob2 = temp;
    }
    return rob2;
  }

  return Math.max(helper(0, nums.length - 1), helper(1, nums.length));
}`,
      python: `class Solution:
    def rob(self, nums: list[int]) -> int:
        if len(nums) == 1:
            return nums[0]

        def helper(sub):
            rob1, rob2 = 0, 0
            for n in sub:
                temp = max(rob1 + n, rob2)
                rob1 = rob2
                rob2 = temp
            return rob2

        return max(helper(nums[:-1]), helper(nums[1:]))`,
      cpp: `#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int rob(vector<int>& nums) {
        if (nums.size() == 1) return nums[0];
        return max(helper(nums, 0, nums.size() - 1), helper(nums, 1, nums.size()));
    }
private:
    int helper(const vector<int>& nums, int start, int end) {
        int rob1 = 0, rob2 = 0;
        for (int i = start; i < end; i++) {
            int temp = max(rob1 + nums[i], rob2);
            rob1 = rob2;
            rob2 = temp;
        }
        return rob2;
    }
};`,
      java: `class Solution {
    public int rob(int[] nums) {
        if (nums.length == 1) return nums[0];
        return Math.max(helper(nums, 0, nums.length - 1), helper(nums, 1, nums.length));
    }
    private int helper(int[] nums, int start, int end) {
        int rob1 = 0, rob2 = 0;
        for (int i = start; i < end; i++) {
            int temp = Math.max(rob1 + nums[i], rob2);
            rob1 = rob2;
            rob2 = temp;
        }
        return rob2;
    }
}`
    },
    sampleTestCases: [
      { id: 'hr2-1', input: [[2, 3, 2]], expectedOutput: 3 },
      { id: 'hr2-2', input: [[1, 2, 3, 1]], expectedOutput: 4 }
    ],
    hiddenTestCases: [
      { id: 'hr2-h1', input: [[1, 2, 3]], expectedOutput: 3, isHidden: true },
      { id: 'hr2-h2', input: [[1]], expectedOutput: 1, isHidden: true }
    ],
    hints: [
      'Since house 0 and house n - 1 are adjacent, you cannot rob both.',
      'Solve two separate instances of House Robber I: nums[0...n-2] and nums[1...n-1].'
    ],
    solutionExplanation: `Because houses are in a circle, either we omit the first house \`nums[1...n-1]\` or omit the last house \`nums[0...n-2]\`. Run standard House Robber I on both slices and take the maximum.

- **Time Complexity:** O(n)
- **Space Complexity:** O(1)`,
    timeLimitMs: 2000,
    memoryLimitMb: 128,
    acceptanceRate: 41.5,
    totalSubmissions: 170000,
    acceptedSubmissions: 70550
  },
  {
    id: 'p-longest-increasing-subsequence',
    slug: 'longest-increasing-subsequence',
    title: 'Longest Increasing Subsequence',
    difficulty: 'Medium',
    category: 'Dynamic Programming',
    tags: ['Array', 'Binary Search', 'Dynamic Programming'],
    functionName: 'lengthOfLIS',
    paramNames: ['nums'],
    description: `Given an integer array \`nums\`, return *the length of the longest **strictly increasing subsequence***.

### Example 1:
\`\`\`
Input: nums = [10,9,2,5,3,7,101,18]
Output: 4
Explanation: The longest increasing subsequence is [2,3,7,101], therefore the length is 4.
\`\`\`

### Example 2:
\`\`\`
Input: nums = [0,1,0,3,2,3]
Output: 4
\`\`\`

### Example 3:
\`\`\`
Input: nums = [7,7,7,7,7,7,7]
Output: 1
\`\`\`

### Constraints:
- \`1 <= nums.length <= 2500\`
- \`-10^4 <= nums[i] <= 10^4\`
`,
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @return {number}
 */
function lengthOfLIS(nums) {
  // Binary search patience sorting / tails array
  const tails = [];
  for (const x of nums) {
    let left = 0, right = tails.length;
    while (left < right) {
      const mid = Math.floor((left + right) / 2);
      if (tails[mid] < x) left = mid + 1;
      else right = mid;
    }
    tails[left] = x;
  }
  return tails.length;
}`,
      python: `import bisect

class Solution:
    def lengthOfLIS(self, nums: list[int]) -> int:
        tails = []
        for x in nums:
            idx = bisect.bisect_left(tails, x)
            if idx == len(tails):
                tails.append(x)
            else:
                tails[idx] = x
        return len(tails)`,
      cpp: `#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int lengthOfLIS(vector<int>& nums) {
        vector<int> tails;
        for (int x : nums) {
            auto it = lower_bound(tails.begin(), tails.end(), x);
            if (it == tails.end()) tails.push_back(x);
            else *it = x;
        }
        return tails.size();
    }
};`,
      java: `import java.util.*;

class Solution {
    public int lengthOfLIS(int[] nums) {
        List<Integer> tails = new ArrayList<>();
        for (int x : nums) {
            int idx = Collections.binarySearch(tails, x);
            if (idx < 0) idx = -(idx + 1);
            if (idx == tails.size()) tails.add(x);
            else tails.set(idx, x);
        }
        return tails.size();
    }
}`
    },
    sampleTestCases: [
      { id: 'lis-1', input: [[10, 9, 2, 5, 3, 7, 101, 18]], expectedOutput: 4 },
      { id: 'lis-2', input: [[0, 1, 0, 3, 2, 3]], expectedOutput: 4 },
      { id: 'lis-3', input: [[7, 7, 7, 7, 7, 7, 7]], expectedOutput: 1 }
    ],
    hiddenTestCases: [
      { id: 'lis-h1', input: [[4, 10, 4, 3, 8, 9]], expectedOutput: 3, isHidden: true }
    ],
    hints: [
      'Can you do it in O(n log n) using binary search on tail elements of increasing subsequences?'
    ],
    solutionExplanation: `Maintain \`tails\` array where \`tails[i]\` stores the smallest tail of all increasing subsequences of length \`i + 1\`. For each element, binary search for its position in \`tails\`.

- **Time Complexity:** O(n log n)
- **Space Complexity:** O(n)`,
    timeLimitMs: 2000,
    memoryLimitMb: 128,
    acceptanceRate: 53.7,
    totalSubmissions: 205000,
    acceptedSubmissions: 110085
  },
  {
    id: 'p-unique-paths',
    slug: 'unique-paths',
    title: 'Unique Paths',
    difficulty: 'Medium',
    category: 'Dynamic Programming',
    tags: ['Math', 'Dynamic Programming', 'Combinatorics'],
    functionName: 'uniquePaths',
    paramNames: ['m', 'n'],
    description: `There is a robot on an \`m x n\` grid. The robot is initially located at the **top-left corner** (i.e., \`grid[0][0]\`). The robot tries to move to the **bottom-right corner** (i.e., \`grid[m - 1][n - 1]\`). The robot can only move either down or right at any point in time.

Given the two integers \`m\` and \`n\`, return *the number of possible unique paths that the robot can take to reach the bottom-right corner*.

### Example 1:
\`\`\`
Input: m = 3, n = 7
Output: 28
\`\`\`

### Example 2:
\`\`\`
Input: m = 3, n = 2
Output: 3
Explanation: From the top-left corner, there are a total of 3 ways to reach the bottom-right corner:
1. Right -> Down -> Down
2. Down -> Down -> Right
3. Down -> Right -> Down
\`\`\`

### Constraints:
- \`1 <= m, n <= 100\`
`,
    starterCode: {
      javascript: `/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
function uniquePaths(m, n) {
  let row = new Array(n).fill(1);
  for (let i = 1; i < m; i++) {
    const newRow = new Array(n).fill(1);
    for (let j = 1; j < n; j++) {
      newRow[j] = newRow[j - 1] + row[j];
    }
    row = newRow;
  }
  return row[n - 1];
}`,
      python: `class Solution:
    def uniquePaths(self, m: int, n: int) -> int:
        row = [1] * n
        for i in range(1, m):
            new_row = [1] * n
            for j in range(1, n):
                new_row[j] = new_row[j - 1] + row[j]
            row = new_row
        return row[-1]`,
      cpp: `#include <vector>
using namespace std;

class Solution {
public:
    int uniquePaths(int m, int n) {
        vector<int> row(n, 1);
        for (int i = 1; i < m; i++) {
            vector<int> newRow(n, 1);
            for (int j = 1; j < n; j++) {
                newRow[j] = newRow[j - 1] + row[j];
            }
            row = newRow;
        }
        return row[n - 1];
    }
};`,
      java: `import java.util.Arrays;

class Solution {
    public int uniquePaths(int m, int n) {
        int[] row = new int[n];
        Arrays.fill(row, 1);
        for (int i = 1; i < m; i++) {
            int[] newRow = new int[n];
            newRow[0] = 1;
            for (int j = 1; j < n; j++) {
                newRow[j] = newRow[j - 1] + row[j];
            }
            row = newRow;
        }
        return row[n - 1];
    }
}`
    },
    sampleTestCases: [
      { id: 'up-1', input: [3, 7], expectedOutput: 28 },
      { id: 'up-2', input: [3, 2], expectedOutput: 3 }
    ],
    hiddenTestCases: [
      { id: 'up-h1', input: [1, 1], expectedOutput: 1, isHidden: true },
      { id: 'up-h2', input: [7, 3], expectedOutput: 28, isHidden: true }
    ],
    hints: [
      'Each cell can only be reached from the cell directly above it or to its left.'
    ],
    solutionExplanation: `DP state: \`dp[i][j] = dp[i - 1][j] + dp[i][j - 1]\`. Can be optimized to O(n) space keeping only the previous row.

- **Time Complexity:** O(m * n)
- **Space Complexity:** O(n)`,
    timeLimitMs: 2000,
    memoryLimitMb: 128,
    acceptanceRate: 63.5,
    totalSubmissions: 220000,
    acceptedSubmissions: 139700
  },
  {
    id: 'p-longest-common-subsequence',
    slug: 'longest-common-subsequence',
    title: 'Longest Common Subsequence',
    difficulty: 'Medium',
    category: 'Dynamic Programming',
    tags: ['String', 'Dynamic Programming'],
    functionName: 'longestCommonSubsequence',
    paramNames: ['text1', 'text2'],
    description: `Given two strings \`text1\` and \`text2\`, return *the length of their longest **common subsequence***. If there is no common subsequence, return \`0\`.

A **subsequence** of a string is a new string generated from the original string with some characters (can be none) deleted without changing the relative order of the remaining characters.

### Example 1:
\`\`\`
Input: text1 = "abcde", text2 = "ace" 
Output: 3  
Explanation: The longest common subsequence is "ace" and its length is 3.
\`\`\`

### Example 2:
\`\`\`
Input: text1 = "abc", text2 = "abc"
Output: 3
Explanation: The longest common subsequence is "abc" and its length is 3.
\`\`\`

### Example 3:
\`\`\`
Input: text1 = "abc", text2 = "def"
Output: 0
Explanation: There is no such common subsequence, so the result is 0.
\`\`\`

### Constraints:
- \`1 <= text1.length, text2.length <= 1000\`
- \`text1\` and \`text2\` consist of only lowercase English characters.
`,
    starterCode: {
      javascript: `/**
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */
function longestCommonSubsequence(text1, text2) {
  const m = text1.length, n = text2.length;
  let dp = new Array(n + 1).fill(0);

  for (let i = 1; i <= m; i++) {
    const nextDp = new Array(n + 1).fill(0);
    for (let j = 1; j <= n; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        nextDp[j] = 1 + dp[j - 1];
      } else {
        nextDp[j] = Math.max(dp[j], nextDp[j - 1]);
      }
    }
    dp = nextDp;
  }
  return dp[n];
}`,
      python: `class Solution:
    def longestCommonSubsequence(self, text1: str, text2: str) -> int:
        m, n = len(text1), len(text2)
        dp = [0] * (n + 1)
        for i in range(1, m + 1):
            next_dp = [0] * (n + 1)
            for j in range(1, n + 1):
                if text1[i - 1] == text2[j - 1]:
                    next_dp[j] = 1 + dp[j - 1]
                else:
                    next_dp[j] = max(dp[j], next_dp[j - 1])
            dp = next_dp
        return dp[n]`,
      cpp: `#include <string>
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int longestCommonSubsequence(string text1, string text2) {
        int m = text1.size(), n = text2.size();
        vector<int> dp(n + 1, 0);
        for (int i = 1; i <= m; i++) {
            vector<int> nextDp(n + 1, 0);
            for (int j = 1; j <= n; j++) {
                if (text1[i - 1] == text2[j - 1]) nextDp[j] = 1 + dp[j - 1];
                else nextDp[j] = max(dp[j], nextDp[j - 1]);
            }
            dp = nextDp;
        }
        return dp[n];
    }
};`,
      java: `class Solution {
    public int longestCommonSubsequence(String text1, String text2) {
        int m = text1.length(), n = text2.length();
        int[] dp = new int[n + 1];
        for (int i = 1; i <= m; i++) {
            int[] nextDp = new int[n + 1];
            for (int j = 1; j <= n; j++) {
                if (text1.charAt(i - 1) == text2.charAt(j - 1)) {
                    nextDp[j] = 1 + dp[j - 1];
                } else {
                    nextDp[j] = Math.max(dp[j], nextDp[j - 1]);
                }
            }
            dp = nextDp;
        }
        return dp[n];
    }
}`
    },
    sampleTestCases: [
      { id: 'lcs2-1', input: ['abcde', 'ace'], expectedOutput: 3 },
      { id: 'lcs2-2', input: ['abc', 'abc'], expectedOutput: 3 },
      { id: 'lcs2-3', input: ['abc', 'def'], expectedOutput: 0 }
    ],
    hiddenTestCases: [
      { id: 'lcs2-h1', input: ['bsbininm', 'jmjkbkjkv'], expectedOutput: 1, isHidden: true }
    ],
    hints: [
      'If text1[i] == text2[j], dp[i][j] = 1 + dp[i-1][j-1]. Otherwise max(dp[i-1][j], dp[i][j-1]).'
    ],
    solutionExplanation: `2D DP: If characters match, add 1 to diagonal \`1 + dp[i - 1][j - 1]\`. Otherwise take the maximum of excluding character from \`text1\` or \`text2\`: \`max(dp[i - 1][j], dp[i][j - 1])\`.

- **Time Complexity:** O(m * n)
- **Space Complexity:** O(min(m, n))`,
    timeLimitMs: 2000,
    memoryLimitMb: 128,
    acceptanceRate: 58.6,
    totalSubmissions: 175000,
    acceptedSubmissions: 102550
  }
];
