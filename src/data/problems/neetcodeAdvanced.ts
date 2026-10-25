import { Problem } from '../../types';

export const NEETCODE_ADVANCED_PROBLEMS: Problem[] = [
  {
    id: 'p-decode-ways',
    slug: 'decode-ways',
    timeLimitMs: 2000,
    memoryLimitMb: 128,
    title: 'Decode Ways',
    difficulty: 'Medium',
    category: 'Dynamic Programming',
    tags: ['String', 'Dynamic Programming'],
    functionName: 'numDecodings',
    paramNames: ['s'],
    description: `A message containing letters from \`A-Z\` can be encoded into numbers using the following mapping:

- \`'A' -> "1"\`
- \`'B' -> "2"\`
- ...
- \`'Z' -> "26"\`

To decode an encoded message, all the digits must be grouped then mapped back into letters using the reverse of the mapping. There may be multiple ways in order to decode the message.

Given a string \`s\` containing only digits, return the **number of ways** to decode it.

### Example 1:
\`\`\`
Input: s = "12"
Output: 2
Explanation: "12" could be decoded as "AB" (1 2) or "L" (12).
\`\`\`

### Example 2:
\`\`\`
Input: s = "226"
Output: 3
Explanation: "226" could be decoded as "BZ" (2 26), "VF" (22 6), or "BBF" (2 2 6).
\`\`\`

### Example 3:
\`\`\`
Input: s = "06"
Output: 0
Explanation: "06" cannot be mapped to "F" because of the leading zero ("6" is valid, but "06" is not).
\`\`\`

### Constraints:
- \`1 <= s.length <= 100\`
- \`s\` contains only digits and may contain leading zero(s).
`,
    starterCode: {
      javascript: `/**
 * @param {string} s
 * @return {number}
 */
function numDecodings(s) {
  if (!s || s[0] === '0') return 0;
  const n = s.length;
  let prev2 = 1, prev1 = 1;
  for (let i = 1; i < n; i++) {
    let cur = 0;
    const one = parseInt(s[i], 10);
    const two = parseInt(s.substring(i - 1, i + 1), 10);
    if (one >= 1 && one <= 9) cur += prev1;
    if (two >= 10 && two <= 26) cur += prev2;
    prev2 = prev1;
    prev1 = cur;
  }
  return prev1;
}`,
      python: `class Solution:
    def numDecodings(self, s: str) -> int:
        if not s or s[0] == '0':
            return 0
        n = len(s)
        prev2, prev1 = 1, 1
        for i in range(1, n):
            cur = 0
            one = int(s[i])
            two = int(s[i-1:i+1])
            if 1 <= one <= 9:
                cur += prev1
            if 10 <= two <= 26:
                cur += prev2
            prev2, prev1 = prev1, cur
        return prev1`,
      cpp: `#include <string>
using namespace std;

class Solution {
public:
    int numDecodings(string s) {
        if (s.empty() || s[0] == '0') return 0;
        int prev2 = 1, prev1 = 1;
        for (int i = 1; i < (int)s.size(); i++) {
            int cur = 0;
            int one = s[i] - '0';
            int two = (s[i - 1] - '0') * 10 + one;
            if (one >= 1 && one <= 9) cur += prev1;
            if (two >= 10 && two <= 26) cur += prev2;
            prev2 = prev1;
            prev1 = cur;
        }
        return prev1;
    }
};`,
      java: `class Solution {
    public int numDecodings(String s) {
        if (s == null || s.length() == 0 || s.charAt(0) == '0') return 0;
        int prev2 = 1, prev1 = 1;
        for (int i = 1; i < s.length(); i++) {
            int cur = 0;
            int one = s.charAt(i) - '0';
            int two = (s.charAt(i - 1) - '0') * 10 + one;
            if (one >= 1 && one <= 9) cur += prev1;
            if (two >= 10 && two <= 26) cur += prev2;
            prev2 = prev1;
            prev1 = cur;
        }
        return prev1;
    }
}`
    },
    sampleTestCases: [
      { id: 'nd-1', input: ['12'], expectedOutput: 2 },
      { id: 'nd-2', input: ['226'], expectedOutput: 3 },
      { id: 'nd-3', input: ['06'], expectedOutput: 0 }
    ],
    hiddenTestCases: [
      { id: 'nd-h1', input: ['10'], expectedOutput: 1, isHidden: true },
      { id: 'nd-h2', input: ['2101'], expectedOutput: 1, isHidden: true }
    ],
    hints: ['Check single digit (1-9) and double digit (10-26) transitions.'],
    solutionExplanation: `Dynamic programming with constant space. At each index \`,i\`, valid single digits transition from \`prev1\`, and valid two-digit numbers (10..26) transition from \`prev2\`.

- **Time Complexity:** O(n)
- **Space Complexity:** O(1)`
  },

  {
    id: 'p-edit-distance',
    slug: 'edit-distance',
    timeLimitMs: 2000,
    memoryLimitMb: 128,
    title: 'Edit Distance',
    difficulty: 'Hard',
    category: 'Dynamic Programming',
    tags: ['String', 'Dynamic Programming'],
    functionName: 'minDistance',
    paramNames: ['word1', 'word2'],
    description: `Given two strings \`word1\` and \`word2\`, return *the minimum number of operations required to convert \`word1\` to \`word2\`*.

You have the following three operations permitted on a word:
- Insert a character
- Delete a character
- Replace a character

### Example 1:
\`\`\`
Input: word1 = "horse", word2 = "ros"
Output: 3
Explanation: 
horse -> rorse (replace 'h' with 'r')
rorse -> rose (remove 'r')
rose -> ros (remove 'e')
\`\`\`

### Example 2:
\`\`\`
Input: word1 = "intention", word2 = "execution"
Output: 5
\`\`\`

### Constraints:
- \`0 <= word1.length, word2.length <= 500\`
- \`word1\` and \`word2\` consist of lowercase English letters.
`,
    starterCode: {
      javascript: `/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
function minDistance(word1, word2) {
  const m = word1.length, n = word2.length;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (word1[i - 1] === word2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
      }
    }
  }
  return dp[m][n];
}`,
      python: `class Solution:
    def minDistance(self, word1: str, word2: str) -> int:
        m, n = len(word1), len(word2)
        dp = [[0] * (n + 1) for _ in range(m + 1)]
        for i in range(m + 1):
            dp[i][0] = i
        for j in range(n + 1):
            dp[0][j] = j
        for i in range(1, m + 1):
            for j in range(1, n + 1):
                if word1[i - 1] == word2[j - 1]:
                    dp[i][j] = dp[i - 1][j - 1]
                else:
                    dp[i][j] = 1 + min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1])
        return dp[m][n]`,
      cpp: `#include <string>
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int minDistance(string word1, string word2) {
        int m = word1.size(), n = word2.size();
        vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));
        for (int i = 0; i <= m; i++) dp[i][0] = i;
        for (int j = 0; j <= n; j++) dp[0][j] = j;
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (word1[i - 1] == word2[j - 1]) {
                    dp[i][j] = dp[i - 1][j - 1];
                } else {
                    dp[i][j] = 1 + min({dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]});
                }
            }
        }
        return dp[m][n];
    }
};`,
      java: `class Solution {
    public int minDistance(String word1, String word2) {
        int m = word1.length(), n = word2.length();
        int[][] dp = new int[m + 1][n + 1];
        for (int i = 0; i <= m; i++) dp[i][0] = i;
        for (int j = 0; j <= n; j++) dp[0][j] = j;
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (word1.charAt(i - 1) == word2.charAt(j - 1)) {
                    dp[i][j] = dp[i - 1][j - 1];
                } else {
                    dp[i][j] = 1 + Math.min(dp[i - 1][j - 1], Math.min(dp[i - 1][j], dp[i][j - 1]));
                }
            }
        }
        return dp[m][n];
    }
}`
    },
    sampleTestCases: [
      { id: 'ed-1', input: ['horse', 'ros'], expectedOutput: 3 },
      { id: 'ed-2', input: ['intention', 'execution'], expectedOutput: 5 }
    ],
    hiddenTestCases: [
      { id: 'ed-h1', input: ['', 'a'], expectedOutput: 1, isHidden: true },
      { id: 'ed-h2', input: ['abc', 'abc'], expectedOutput: 0, isHidden: true }
    ],
    hints: ['Use 2D DP table where dp[i][j] represents edits between prefixes.'],
    solutionExplanation: `Standard Levenshtein distance 2D dynamic programming. If characters match, cost is 0. Otherwise, take 1 + minimum of insertion, deletion, or replacement.

- **Time Complexity:** O(m * n)
- **Space Complexity:** O(m * n)`,
  },

  {
    id: 'p-longest-palindromic-substring',
    slug: 'longest-palindromic-substring',
    timeLimitMs: 2000,
    memoryLimitMb: 128,
    title: 'Longest Palindromic Substring',
    difficulty: 'Medium',
    category: 'Dynamic Programming',
    tags: ['Two Pointers', 'String', 'Dynamic Programming'],
    functionName: 'longestPalindrome',
    paramNames: ['s'],
    description: `Given a string \`s\`, return *the longest palindromic substring* in \`s\`.

### Example 1:
\`\`\`
Input: s = "babad"
Output: "bab"
Explanation: "aba" is also a valid answer.
\`\`\`

### Example 2:
\`\`\`
Input: s = "cbbd"
Output: "bb"
\`\`\`

### Constraints:
- \`1 <= s.length <= 1000\`
- \`s\` consist of only digits and English letters.
`,
    starterCode: {
      javascript: `/**
 * @param {string} s
 * @return {string}
 */
function longestPalindrome(s) {
  if (!s || s.length <= 1) return s;
  let start = 0, maxLen = 0;
  function expand(left, right) {
    while (left >= 0 && right < s.length && s[left] === s[right]) {
      left--;
      right++;
    }
    const len = right - left - 1;
    if (len > maxLen) {
      maxLen = len;
      start = left + 1;
    }
  }
  for (let i = 0; i < s.length; i++) {
    expand(i, i);
    expand(i, i + 1);
  }
  return s.substring(start, start + maxLen);
}`,
      python: `class Solution:
    def longestPalindrome(self, s: str) -> str:
        if not s or len(s) <= 1:
            return s
        start, max_len = 0, 0
        def expand(left: int, right: int):
            nonlocal start, max_len
            while left >= 0 and right < len(s) and s[left] == s[right]:
                left -= 1
                right += 1
            length = right - left - 1
            if length > max_len:
                max_len = length
                start = left + 1
        for i in range(len(s)):
            expand(i, i)
            expand(i, i + 1)
        return s[start:start + max_len]`,
      cpp: `#include <string>
using namespace std;

class Solution {
public:
    string longestPalindrome(string s) {
        if (s.size() <= 1) return s;
        int start = 0, maxLen = 0;
        auto expand = [&](int left, int right) {
            while (left >= 0 && right < (int)s.size() && s[left] == s[right]) {
                left--;
                right++;
            }
            int len = right - left - 1;
            if (len > maxLen) {
                maxLen = len;
                start = left + 1;
            }
        };
        for (int i = 0; i < (int)s.size(); i++) {
            expand(i, i);
            expand(i, i + 1);
        }
        return s.substr(start, maxLen);
    }
};`,
      java: `class Solution {
    private int start = 0;
    private int maxLen = 0;

    public String longestPalindrome(String s) {
        if (s == null || s.length() <= 1) return s;
        start = 0;
        maxLen = 0;
        for (int i = 0; i < s.length(); i++) {
            expand(s, i, i);
            expand(s, i, i + 1);
        }
        return s.substring(start, start + maxLen);
    }

    private void expand(String s, int left, int right) {
        while (left >= 0 && right < s.length() && s.charAt(left) == s.charAt(right)) {
            left--;
            right++;
        }
        int len = right - left - 1;
        if (len > maxLen) {
            maxLen = len;
            start = left + 1;
        }
    }
}`
    },
    sampleTestCases: [
      { id: 'lps-1', input: ['babad'], expectedOutput: 'bab' },
      { id: 'lps-2', input: ['cbbd'], expectedOutput: 'bb' }
    ],
    hiddenTestCases: [
      { id: 'lps-h1', input: ['a'], expectedOutput: 'a', isHidden: true },
      { id: 'lps-h2', input: ['racecar'], expectedOutput: 'racecar', isHidden: true }
    ],
    hints: ['Expand around center for each single character and character pair.'],
    solutionExplanation: `Center expansion technique: Every palindrome has a center (either a single character for odd lengths, or two characters for even lengths). Expand outward from each center.

- **Time Complexity:** O(n^2)
- **Space Complexity:** O(1)`,
  },

  {
    id: 'p-partition-equal-subset-sum',
    slug: 'partition-equal-subset-sum',
    timeLimitMs: 2000,
    memoryLimitMb: 128,
    title: 'Partition Equal Subset Sum',
    difficulty: 'Medium',
    category: 'Dynamic Programming',
    tags: ['Array', 'Dynamic Programming'],
    functionName: 'canPartition',
    paramNames: ['nums'],
    description: `Given an integer array \`nums\`, return \`true\` *if you can partition the array into two subsets such that the sum of the elements in both subsets is equal or* \`false\` *otherwise*.

### Example 1:
\`\`\`
Input: nums = [1,5,11,5]
Output: true
Explanation: The array can be partitioned as [1, 5, 5] and [11].
\`\`\`

### Example 2:
\`\`\`
Input: nums = [1,2,3,5]
Output: false
Explanation: The array cannot be partitioned into equal sum subsets.
\`\`\`

### Constraints:
- \`1 <= nums.length <= 200\`
- \`1 <= nums[i] <= 100\`
`,
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @return {boolean}
 */
function canPartition(nums) {
  const sum = nums.reduce((a, b) => a + b, 0);
  if (sum % 2 !== 0) return false;
  const target = sum / 2;
  const dp = new Array(target + 1).fill(false);
  dp[0] = true;
  for (const num of nums) {
    for (let j = target; j >= num; j--) {
      if (dp[j - num]) dp[j] = true;
    }
  }
  return dp[target];
}`,
      python: `class Solution:
    def canPartition(self, nums: list[int]) -> bool:
        total = sum(nums)
        if total % 2 != 0:
            return False
        target = total // 2
        dp = [False] * (target + 1)
        dp[0] = True
        for num in nums:
            for j in range(target, num - 1, -1):
                if dp[j - num]:
                    dp[j] = True
        return dp[target]`,
      cpp: `#include <vector>
#include <numeric>
using namespace std;

class Solution {
public:
    bool canPartition(vector<int>& nums) {
        int sum = 0;
        for (int n : nums) sum += n;
        if (sum % 2 != 0) return false;
        int target = sum / 2;
        vector<bool> dp(target + 1, false);
        dp[0] = true;
        for (int num : nums) {
            for (int j = target; j >= num; j--) {
                if (dp[j - num]) dp[j] = true;
            }
        }
        return dp[target];
    }
};`,
      java: `class Solution {
    public boolean canPartition(int[] nums) {
        int sum = 0;
        for (int n : nums) sum += n;
        if (sum % 2 != 0) return false;
        int target = sum / 2;
        boolean[] dp = new boolean[target + 1];
        dp[0] = true;
        for (int num : nums) {
            for (int j = target; j >= num; j--) {
                if (dp[j - num]) dp[j] = true;
            }
        }
        return dp[target];
    }
}`
    },
    sampleTestCases: [
      { id: 'pess-1', input: [[1, 5, 11, 5]], expectedOutput: true },
      { id: 'pess-2', input: [[1, 2, 3, 5]], expectedOutput: false }
    ],
    hiddenTestCases: [
      { id: 'pess-h1', input: [[1, 1]], expectedOutput: true, isHidden: true },
      { id: 'pess-h2', input: [[2, 2, 1, 1]], expectedOutput: true, isHidden: true }
    ],
    hints: ['Reduce to 0/1 Knapsack where target = sum / 2.'],
    solutionExplanation: `Partitioning into two subsets of equal sum is equivalent to finding a subset with sum = totalSum / 2. This is classic 0/1 knapsack solved with a 1D boolean DP array traversed in reverse.

- **Time Complexity:** O(n * target)
- **Space Complexity:** O(target)`,
  },

  {
    id: 'p-coin-change-ii',
    slug: 'coin-change-ii',
    timeLimitMs: 2000,
    memoryLimitMb: 128,
    title: 'Coin Change II',
    difficulty: 'Medium',
    category: 'Dynamic Programming',
    tags: ['Array', 'Dynamic Programming'],
    functionName: 'change',
    paramNames: ['amount', 'coins'],
    description: `You are given an integer array \`coins\` representing coins of different denominations and an integer \`amount\` representing a total amount of money.

Return *the number of combinations that make up that amount*. If that amount of money cannot be made up by any combination of the coins, return \`0\`.

You may assume that you have an infinite number of each kind of coin.

The answer is **guaranteed** to fit into a signed 32-bit integer.

### Example 1:
\`\`\`
Input: amount = 5, coins = [1,2,5]
Output: 4
Explanation: there are four ways to make up the amount:
5=5
5=2+2+1
5=2+1+1+1
5=1+1+1+1+1
\`\`\`

### Example 2:
\`\`\`
Input: amount = 3, coins = [2]
Output: 0
Explanation: the amount of 3 cannot be made up just with coins of 2.
\`\`\`

### Constraints:
- \`1 <= coins.length <= 300\`
- \`1 <= coins[i] <= 5000\`
- \`0 <= amount <= 5000\`
`,
    starterCode: {
      javascript: `/**
 * @param {number} amount
 * @param {number[]} coins
 * @return {number}
 */
function change(amount, coins) {
  const dp = new Array(amount + 1).fill(0);
  dp[0] = 1;
  for (const coin of coins) {
    for (let j = coin; j <= amount; j++) {
      dp[j] += dp[j - coin];
    }
  }
  return dp[amount];
}`,
      python: `class Solution:
    def change(self, amount: int, coins: list[int]) -> int:
        dp = [0] * (amount + 1)
        dp[0] = 1
        for coin in coins:
            for j in range(coin, amount + 1):
                dp[j] += dp[j - coin]
        return dp[amount]`,
      cpp: `#include <vector>
using namespace std;

class Solution {
public:
    int change(int amount, vector<int>& coins) {
        vector<unsigned int> dp(amount + 1, 0);
        dp[0] = 1;
        for (int coin : coins) {
            for (int j = coin; j <= amount; j++) {
                dp[j] += dp[j - coin];
            }
        }
        return dp[amount];
    }
};`,
      java: `class Solution {
    public int change(int amount, int[] coins) {
        int[] dp = new int[amount + 1];
        dp[0] = 1;
        for (int coin : coins) {
            for (int j = coin; j <= amount; j++) {
                dp[j] += dp[j - coin];
            }
        }
        return dp[amount];
    }
}`
    },
    sampleTestCases: [
      { id: 'cc2-1', input: [5, [1, 2, 5]], expectedOutput: 4 },
      { id: 'cc2-2', input: [3, [2]], expectedOutput: 0 }
    ],
    hiddenTestCases: [
      { id: 'cc2-h1', input: [10, [10]], expectedOutput: 1, isHidden: true },
      { id: 'cc2-h2', input: [0, [7]], expectedOutput: 1, isHidden: true }
    ],
    hints: ['Outer loop over coins, inner loop over amounts to ensure combinations without permutations.'],
    solutionExplanation: `Unbounded knapsack combinations. Iterating over coins on the outer loop guarantees we only count unique combinations rather than orderings.

- **Time Complexity:** O(n * amount)
- **Space Complexity:** O(amount)`,
  },

  {
    id: 'p-target-sum',
    slug: 'target-sum',
    timeLimitMs: 2000,
    memoryLimitMb: 128,
    title: 'Target Sum',
    difficulty: 'Medium',
    category: 'Dynamic Programming',
    tags: ['Array', 'Dynamic Programming', 'Backtracking'],
    functionName: 'findTargetSumWays',
    paramNames: ['nums', 'target'],
    description: `You are given an integer array \`nums\` and an integer \`target\`.

You want to build an **expression** out of nums by adding one of the symbols \`'+'\` and \`'-'\` before each integer in nums and then concatenate all the integers.

For example, if \`nums = [2, 1]\`, you can add a \`'+'\` before \`2\` and a \`'-'\` before \`1\` and concatenate them to build the expression \`"+2-1"\`.

Return the number of different **expressions** that you can build, which evaluates to \`target\`.

### Example 1:
\`\`\`
Input: nums = [1,1,1,1,1], target = 3
Output: 5
Explanation: There are 5 ways to assign symbols to make the sum of nums be target 3.
-1 + 1 + 1 + 1 + 1 = 3
+1 - 1 + 1 + 1 + 1 = 3
+1 + 1 - 1 + 1 + 1 = 3
+1 + 1 + 1 - 1 + 1 = 3
+1 + 1 + 1 + 1 - 1 = 3
\`\`\`

### Example 2:
\`\`\`
Input: nums = [1], target = 1
Output: 1
\`\`\`

### Constraints:
- \`1 <= nums.length <= 20\`
- \`0 <= nums[i] <= 1000\`
- \`-1000 <= target <= 1000\`
`,
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
function findTargetSumWays(nums, target) {
  const sum = nums.reduce((a, b) => a + b, 0);
  if (Math.abs(target) > sum || (sum + target) % 2 !== 0) return 0;
  const s1 = (sum + target) / 2;
  const dp = new Array(s1 + 1).fill(0);
  dp[0] = 1;
  for (const num of nums) {
    for (let j = s1; j >= num; j--) {
      dp[j] += dp[j - num];
    }
  }
  return dp[s1];
}`,
      python: `class Solution:
    def findTargetSumWays(self, nums: list[int], target: int) -> int:
        total = sum(nums)
        if abs(target) > total or (total + target) % 2 != 0:
            return 0
        s1 = (total + target) // 2
        dp = [0] * (s1 + 1)
        dp[0] = 1
        for num in nums:
            for j in range(s1, num - 1, -1):
                dp[j] += dp[j - num]
        return dp[s1]`,
      cpp: `#include <vector>
#include <numeric>
#include <cmath>
using namespace std;

class Solution {
public:
    int findTargetSumWays(vector<int>& nums, int target) {
        int sum = 0;
        for (int n : nums) sum += n;
        if (abs(target) > sum || (sum + target) % 2 != 0) return 0;
        int s1 = (sum + target) / 2;
        vector<int> dp(s1 + 1, 0);
        dp[0] = 1;
        for (int num : nums) {
            for (int j = s1; j >= num; j--) {
                dp[j] += dp[j - num];
            }
        }
        return dp[s1];
    }
};`,
      java: `class Solution {
    public int findTargetSumWays(int[] nums, int target) {
        int sum = 0;
        for (int n : nums) sum += n;
        if (Math.abs(target) > sum || (sum + target) % 2 != 0) return 0;
        int s1 = (sum + target) / 2;
        int[] dp = new int[s1 + 1];
        dp[0] = 1;
        for (int num : nums) {
            for (int j = s1; j >= num; j--) {
                dp[j] += dp[j - num];
            }
        }
        return dp[s1];
    }
}`
    },
    sampleTestCases: [
      { id: 'ts-1', input: [[1, 1, 1, 1, 1], 3], expectedOutput: 5 },
      { id: 'ts-2', input: [[1], 1], expectedOutput: 1 }
    ],
    hiddenTestCases: [
      { id: 'ts-h1', input: [[1], 2], expectedOutput: 0, isHidden: true },
      { id: 'ts-h2', input: [[0, 0, 0, 0, 0, 0, 0, 0, 1], 1], expectedOutput: 256, isHidden: true }
    ],
    hints: ['P - N = target, P + N = sum -> 2P = sum + target. Find count of subsets with sum P.'],
    solutionExplanation: `Math transformation to 0/1 knapsack: Let P be positive subset and N negative subset. P - N = target and P + N = sum, so 2P = sum + target. Find number of subsets summing to (sum + target)/2.

- **Time Complexity:** O(n * target)
- **Space Complexity:** O(target)`,
  },

  {
    id: 'p-sort-colors',
    slug: 'sort-colors',
    timeLimitMs: 2000,
    memoryLimitMb: 128,
    title: 'Sort Colors',
    difficulty: 'Medium',
    category: 'Two Pointers',
    tags: ['Array', 'Two Pointers', 'Sorting'],
    functionName: 'sortColors',
    paramNames: ['nums'],
    description: `Given an array \`nums\` with \`n\` objects colored red, white, or blue, sort them **in-place** so that objects of the same color are adjacent, with the colors in the order red, white, and blue.

We will use the integers \`0\`, \`1\`, and \`2\` to represent the color red, white, and blue, respectively.

You must solve this problem without using the library's sort function.

### Example 1:
\`\`\`
Input: nums = [2,0,2,1,1,0]
Output: [0,0,1,1,2,2]
\`\`\`

### Example 2:
\`\`\`
Input: nums = [2,0,1]
Output: [0,1,2]
\`\`\`

### Constraints:
- \`n == nums.length\`
- \`1 <= n <= 300\`
- \`nums[i]\` is either \`0\`, \`1\`, or \`2\`.
`,
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @return {number[]}
 */
function sortColors(nums) {
  let low = 0, mid = 0, high = nums.length - 1;
  while (mid <= high) {
    if (nums[mid] === 0) {
      [nums[low], nums[mid]] = [nums[mid], nums[low]];
      low++;
      mid++;
    } else if (nums[mid] === 1) {
      mid++;
    } else {
      [nums[mid], nums[high]] = [nums[high], nums[mid]];
      high--;
    }
  }
  return nums;
}`,
      python: `class Solution:
    def sortColors(self, nums: list[int]) -> list[int]:
        low, mid, high = 0, 0, len(nums) - 1
        while mid <= high:
            if nums[mid] == 0:
                nums[low], nums[mid] = nums[mid], nums[low]
                low += 1
                mid += 1
            elif nums[mid] == 1:
                mid += 1
            else:
                nums[mid], nums[high] = nums[high], nums[mid]
                high -= 1
        return nums`,
      cpp: `#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    vector<int> sortColors(vector<int>& nums) {
        int low = 0, mid = 0, high = (int)nums.size() - 1;
        while (mid <= high) {
            if (nums[mid] == 0) {
                swap(nums[low++], nums[mid++]);
            } else if (nums[mid] == 1) {
                mid++;
            } else {
                swap(nums[mid], nums[high--]);
            }
        }
        return nums;
    }
};`,
      java: `class Solution {
    public int[] sortColors(int[] nums) {
        int low = 0, mid = 0, high = nums.length - 1;
        while (mid <= high) {
            if (nums[mid] == 0) {
                int temp = nums[low];
                nums[low] = nums[mid];
                nums[mid] = temp;
                low++;
                mid++;
            } else if (nums[mid] == 1) {
                mid++;
            } else {
                int temp = nums[mid];
                nums[mid] = nums[high];
                nums[high] = temp;
                high--;
            }
        }
        return nums;
    }
}`
    },
    sampleTestCases: [
      { id: 'sc-1', input: [[2, 0, 2, 1, 1, 0]], expectedOutput: [0, 0, 1, 1, 2, 2] },
      { id: 'sc-2', input: [[2, 0, 1]], expectedOutput: [0, 1, 2] }
    ],
    hiddenTestCases: [
      { id: 'sc-h1', input: [[0]], expectedOutput: [0], isHidden: true },
      { id: 'sc-h2', input: [[1, 2, 0]], expectedOutput: [0, 1, 2], isHidden: true }
    ],
    hints: ['Dutch National Flag algorithm with three pointers: low, mid, high.'],
    solutionExplanation: `Dutch National Flag partitioning algorithm: Maintain 0s before low, 1s between low and mid, and 2s after high. In one pass, swap elements to place them in correct partitions.

- **Time Complexity:** O(n)
- **Space Complexity:** O(1)`,
  },

  {
    id: 'p-4sum',
    slug: '4sum',
    timeLimitMs: 2000,
    memoryLimitMb: 128,
    title: '4Sum',
    difficulty: 'Medium',
    category: 'Two Pointers',
    tags: ['Array', 'Two Pointers', 'Sorting'],
    functionName: 'fourSum',
    paramNames: ['nums', 'target'],
    description: `Given an array \`nums\` of \`n\` integers, return *an array of all the **unique** quadruplets* \`[nums[a], nums[b], nums[c], nums[d]]\` such that:

- \`0 <= a, b, c, d < n\`
- \`a\`, \`b\`, \`c\`, and \`d\` are **distinct**.
- \`nums[a] + nums[b] + nums[c] + nums[d] == target\`

You may return the answer in **any order**.

### Example 1:
\`\`\`
Input: nums = [1,0,-1,0,-2,2], target = 0
Output: [[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]
\`\`\`

### Example 2:
\`\`\`
Input: nums = [2,2,2,2,2], target = 8
Output: [[2,2,2,2]]
\`\`\`

### Constraints:
- \`1 <= nums.length <= 200\`
- \`-10^9 <= nums[i] <= 10^9\`
- \`-10^9 <= target <= 10^9\`
`,
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
function fourSum(nums, target) {
  nums.sort((a, b) => a - b);
  const result = [];
  const n = nums.length;
  for (let i = 0; i < n - 3; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue;
    for (let j = i + 1; j < n - 2; j++) {
      if (j > i + 1 && nums[j] === nums[j - 1]) continue;
      let left = j + 1, right = n - 1;
      while (left < right) {
        const sum = nums[i] + nums[j] + nums[left] + nums[right];
        if (sum === target) {
          result.push([nums[i], nums[j], nums[left], nums[right]]);
          while (left < right && nums[left] === nums[left + 1]) left++;
          while (left < right && nums[right] === nums[right - 1]) right--;
          left++;
          right--;
        } else if (sum < target) {
          left++;
        } else {
          right--;
        }
      }
    }
  }
  return result;
}`,
      python: `class Solution:
    def fourSum(self, nums: list[int], target: int) -> list[list[int]]:
        nums.sort()
        res = []
        n = len(nums)
        for i in range(n - 3):
            if i > 0 and nums[i] == nums[i - 1]:
                continue
            for j in range(i + 1, n - 2):
                if j > i + 1 and nums[j] == nums[j - 1]:
                    continue
                left, right = j + 1, n - 1
                while left < right:
                    s = nums[i] + nums[j] + nums[left] + nums[right]
                    if s == target:
                        res.append([nums[i], nums[j], nums[left], nums[right]])
                        while left < right and nums[left] == nums[left + 1]:
                            left += 1
                        while left < right and nums[right] == nums[right - 1]:
                            right -= 1
                        left += 1
                        right -= 1
                    elif s < target:
                        left += 1
                    else:
                        right -= 1
        return res`,
      cpp: `#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    vector<vector<int>> fourSum(vector<int>& nums, int target) {
        sort(nums.begin(), nums.end());
        vector<vector<int>> res;
        int n = nums.size();
        for (int i = 0; i < n - 3; i++) {
            if (i > 0 && nums[i] == nums[i - 1]) continue;
            for (int j = i + 1; j < n - 2; j++) {
                if (j > i + 1 && nums[j] == nums[j - 1]) continue;
                int left = j + 1, right = n - 1;
                while (left < right) {
                    long long sum = (long long)nums[i] + nums[j] + nums[left] + nums[right];
                    if (sum == target) {
                        res.push_back({nums[i], nums[j], nums[left], nums[right]});
                        while (left < right && nums[left] == nums[left + 1]) left++;
                        while (left < right && nums[right] == nums[right - 1]) right--;
                        left++;
                        right--;
                    } else if (sum < target) {
                        left++;
                    } else {
                        right--;
                    }
                }
            }
        }
        return res;
    }
};`,
      java: `import java.util.*;

class Solution {
    public List<List<Integer>> fourSum(int[] nums, int target) {
        Arrays.sort(nums);
        List<List<Integer>> res = new ArrayList<>();
        int n = nums.length;
        for (int i = 0; i < n - 3; i++) {
            if (i > 0 && nums[i] == nums[i - 1]) continue;
            for (int j = i + 1; j < n - 2; j++) {
                if (j > i + 1 && nums[j] == nums[j - 1]) continue;
                int left = j + 1, right = n - 1;
                while (left < right) {
                    long sum = (long) nums[i] + nums[j] + nums[left] + nums[right];
                    if (sum == target) {
                        res.add(Arrays.asList(nums[i], nums[j], nums[left], nums[right]));
                        while (left < right && nums[left] == nums[left + 1]) left++;
                        while (left < right && nums[right] == nums[right - 1]) right--;
                        left++;
                        right--;
                    } else if (sum < target) {
                        left++;
                    } else {
                        right--;
                    }
                }
            }
        }
        return res;
    }
}`
    },
    sampleTestCases: [
      { id: '4s-1', input: [[1, 0, -1, 0, -2, 2], 0], expectedOutput: [[-2, -1, 1, 2], [-2, 0, 0, 2], [-1, 0, 0, 1]] },
      { id: '4s-2', input: [[2, 2, 2, 2, 2], 8], expectedOutput: [[2, 2, 2, 2]] }
    ],
    hiddenTestCases: [
      { id: '4s-h1', input: [[0, 0, 0, 0], 0], expectedOutput: [[0, 0, 0, 0]], isHidden: true }
    ],
    hints: ['Sort array, fix first two pointers and use two-pointer search for the remaining two.'],
    solutionExplanation: `Generalization of 3Sum: Sort array, fix two indices \`,i\` and \`j\`, then use two pointers \`left\` and \`right\` to find pairs summing to the remaining difference. Skip duplicates.

- **Time Complexity:** O(n^3)
- **Space Complexity:** O(1)`
  },

  {
    id: 'p-search-a-2d-matrix-ii',
    slug: 'search-a-2d-matrix-ii',
    timeLimitMs: 2000,
    memoryLimitMb: 128,
    title: 'Search a 2D Matrix II',
    difficulty: 'Medium',
    category: 'Binary Search',
    tags: ['Array', 'Binary Search', 'Matrix'],
    functionName: 'searchMatrix',
    paramNames: ['matrix', 'target'],
    description: `Write an efficient algorithm that searches for a value \`target\` in an \`m x n\` integer matrix \`matrix\`. This matrix has the following properties:

- Integers in each row are sorted in ascending from left to right.
- Integers in each column are sorted in ascending from top to bottom.

### Example 1:
\`\`\`
Input: matrix = [
  [1,   4,  7, 11, 15],
  [2,   5,  8, 12, 19],
  [3,   6,  9, 16, 22],
  [10, 13, 14, 17, 24],
  [18, 21, 23, 26, 30]
], target = 5
Output: true
\`\`\`

### Example 2:
\`\`\`
Input: matrix = [
  [1,   4,  7, 11, 15],
  [2,   5,  8, 12, 19],
  [3,   6,  9, 16, 22],
  [10, 13, 14, 17, 24],
  [18, 21, 23, 26, 30]
], target = 20
Output: false
\`\`\`

### Constraints:
- \`m == matrix.length\`
- \`n == matrix[i].length\`
- \`1 <= n, m <= 300\`
- \`-10^9 <= matrix[i][j] <= 10^9\`
- \`-10^9 <= target <= 10^9\`
`,
    starterCode: {
      javascript: `/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
function searchMatrix(matrix, target) {
  if (!matrix || matrix.length === 0) return false;
  let row = 0, col = matrix[0].length - 1;
  while (row < matrix.length && col >= 0) {
    const val = matrix[row][col];
    if (val === target) return true;
    if (val > target) col--;
    else row++;
  }
  return false;
}`,
      python: `class Solution:
    def searchMatrix(self, matrix: list[list[int]], target: int) -> bool:
        if not matrix:
            return False
        row, col = 0, len(matrix[0]) - 1
        while row < len(matrix) and col >= 0:
            val = matrix[row][col]
            if val == target:
                return True
            if val > target:
                col -= 1
            else:
                row += 1
        return False`,
      cpp: `#include <vector>
using namespace std;

class Solution {
public:
    bool searchMatrix(vector<vector<int>>& matrix, int target) {
        if (matrix.empty() || matrix[0].empty()) return false;
        int row = 0, col = (int)matrix[0].size() - 1;
        while (row < (int)matrix.size() && col >= 0) {
            int val = matrix[row][col];
            if (val == target) return true;
            if (val > target) col--;
            else row++;
        }
        return false;
    }
};`,
      java: `class Solution {
    public boolean searchMatrix(int[][] matrix, int target) {
        if (matrix == null || matrix.length == 0 || matrix[0].length == 0) return false;
        int row = 0, col = matrix[0].length - 1;
        while (row < matrix.length && col >= 0) {
            int val = matrix[row][col];
            if (val == target) return true;
            if (val > target) col--;
            else row++;
        }
        return false;
    }
}`
    },
    sampleTestCases: [
      {
        id: 'sm2-1',
        input: [
          [
            [1, 4, 7, 11, 15],
            [2, 5, 8, 12, 19],
            [3, 6, 9, 16, 22],
            [10, 13, 14, 17, 24],
            [18, 21, 23, 26, 30]
          ],
          5
        ],
        expectedOutput: true
      },
      {
        id: 'sm2-2',
        input: [
          [
            [1, 4, 7, 11, 15],
            [2, 5, 8, 12, 19],
            [3, 6, 9, 16, 22],
            [10, 13, 14, 17, 24],
            [18, 21, 23, 26, 30]
          ],
          20
        ],
        expectedOutput: false
      }
    ],
    hiddenTestCases: [
      { id: 'sm2-h1', input: [[[1, 1]], 2], expectedOutput: false, isHidden: true },
      { id: 'sm2-h2', input: [[[-5]], -5], expectedOutput: true, isHidden: true }
    ],
    hints: ['Start from top-right corner; if val > target go left, if val < target go down.'],
    solutionExplanation: `Stepping algorithm starting at top-right (or bottom-left) corner. Because row elements increase to the right and column elements increase downwards, the top-right corner acts as a binary decision tree.

- **Time Complexity:** O(m + n)
- **Space Complexity:** O(1)`,
  },

  {
    id: 'p-capacity-to-ship-packages-within-d-days',
    slug: 'capacity-to-ship-packages-within-d-days',
    timeLimitMs: 2000,
    memoryLimitMb: 128,
    title: 'Capacity To Ship Packages Within D Days',
    difficulty: 'Medium',
    category: 'Binary Search',
    tags: ['Array', 'Binary Search'],
    functionName: 'shipWithinDays',
    paramNames: ['weights', 'days'],
    description: `A conveyor belt has packages that must be shipped from one port to another within \`days\` days.

The \`i\`th package on the conveyor belt has a weight of \`weights[i]\`. Each day, we load the ship with packages on the conveyor belt (in the order given by \`weights\`). We may not load more weight than the maximum weight capacity of the ship.

Return the least weight capacity of the ship that will result in all the packages on the conveyor belt being shipped within \`days\` days.

### Example 1:
\`\`\`
Input: weights = [1,2,3,4,5,6,7,8,9,10], days = 5
Output: 15
Explanation: A ship capacity of 15 is the minimum to ship all packages in 5 days like this:
1st day: 1, 2, 3, 4, 5
2nd day: 6, 7
3rd day: 8
4th day: 9
5th day: 10
\`\`\`

### Example 2:
\`\`\`
Input: weights = [3,2,2,4,1,4], days = 3
Output: 6
\`\`\`

### Constraints:
- \`1 <= days <= weights.length <= 5 * 10^4\`
- \`1 <= weights[i] <= 500\`
`,
    starterCode: {
      javascript: `/**
 * @param {number[]} weights
 * @param {number} days
 * @return {number}
 */
function shipWithinDays(weights, days) {
  let low = Math.max(...weights);
  let high = weights.reduce((a, b) => a + b, 0);
  
  function canShip(cap) {
    let d = 1, current = 0;
    for (const w of weights) {
      if (current + w > cap) {
        d++;
        current = 0;
      }
      current += w;
    }
    return d <= days;
  }
  
  while (low < high) {
    const mid = Math.floor((low + high) / 2);
    if (canShip(mid)) {
      high = mid;
    } else {
      low = mid + 1;
    }
  }
  return low;
}`,
      python: `class Solution:
    def shipWithinDays(self, weights: list[int], days: int) -> int:
        low = max(weights)
        high = sum(weights)
        
        def can_ship(cap: int) -> bool:
            d = 1
            current = 0
            for w in weights:
                if current + w > cap:
                    d += 1
                    current = 0
                current += w
            return d <= days
            
        while low < high:
            mid = (low + high) // 2
            if can_ship(mid):
                high = mid
            else:
                low = mid + 1
        return low`,
      cpp: `#include <vector>
#include <numeric>
#include <algorithm>
using namespace std;

class Solution {
public:
    int shipWithinDays(vector<int>& weights, int days) {
        int low = *max_element(weights.begin(), weights.end());
        int high = accumulate(weights.begin(), weights.end(), 0);
        
        auto canShip = [&](int cap) {
            int d = 1, cur = 0;
            for (int w : weights) {
                if (cur + w > cap) {
                    d++;
                    cur = 0;
                }
                cur += w;
            }
            return d <= days;
        };
        
        while (low < high) {
            int mid = low + (high - low) / 2;
            if (canShip(mid)) {
                high = mid;
            } else {
                low = mid + 1;
            }
        }
        return low;
    }
};`,
      java: `class Solution {
    public int shipWithinDays(int[] weights, int days) {
        int low = 0, high = 0;
        for (int w : weights) {
            low = Math.max(low, w);
            high += w;
        }
        while (low < high) {
            int mid = low + (high - low) / 2;
            int d = 1, cur = 0;
            for (int w : weights) {
                if (cur + w > mid) {
                    d++;
                    cur = 0;
                }
                cur += w;
            }
            if (d <= days) {
                high = mid;
            } else {
                low = mid + 1;
            }
        }
        return low;
    }
}`
    },
    sampleTestCases: [
      { id: 'swd-1', input: [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 5], expectedOutput: 15 },
      { id: 'swd-2', input: [[3, 2, 2, 4, 1, 4], 3], expectedOutput: 6 }
    ],
    hiddenTestCases: [
      { id: 'swd-h1', input: [[1, 2, 3, 1, 1], 4], expectedOutput: 3, isHidden: true }
    ],
    hints: ['Binary search the answer between max(weights) and sum(weights).'],
    solutionExplanation: `Binary search on the monotonic answer space. The minimum feasible capacity is \`,max(weights)\` and the maximum is \`sum(weights)\`. For each guess \`mid\`, greedily simulate shipping.

- **Time Complexity:** O(n * log(sum - max))
- **Space Complexity:** O(1)`
  },

  {
    id: 'p-sliding-window-maximum',
    slug: 'sliding-window-maximum',
    timeLimitMs: 2000,
    memoryLimitMb: 128,
    title: 'Sliding Window Maximum',
    difficulty: 'Hard',
    category: 'Sliding Window',
    tags: ['Array', 'Queue', 'Sliding Window', 'Monotonic Queue'],
    functionName: 'maxSlidingWindow',
    paramNames: ['nums', 'k'],
    description: `You are given an array of integers \`nums\`, there is a sliding window of size \`k\` which is moving from the very left of the array to the very right. You can only see the \`k\` numbers in the window. Each time the sliding window moves right by one position.

Return *the max sliding window*.

### Example 1:
\`\`\`
Input: nums = [1,3,-1,-3,5,3,6,7], k = 3
Output: [3,3,5,5,6,7]
Explanation: 
Window position                Max
---------------               -----
[1  3  -1] -3  5  3  6  7       3
 1 [3  -1  -3] 5  3  6  7       3
 1  3 [-1  -3  5] 3  6  7       5
 1  3  -1 [-3  5  3] 6  7       5
 1  3  -1  -3 [5  3  6] 7       6
 1  3  -1  -3  5 [3  6  7]      7
\`\`\`

### Example 2:
\`\`\`
Input: nums = [1], k = 1
Output: [1]
\`\`\`

### Constraints:
- \`1 <= nums.length <= 10^5\`
- \`-10^4 <= nums[i] <= 10^4\`
- \`1 <= k <= nums.length\`
`,
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
function maxSlidingWindow(nums, k) {
  const result = [];
  const deque = []; // store indices
  for (let i = 0; i < nums.length; i++) {
    while (deque.length > 0 && deque[0] < i - k + 1) {
      deque.shift();
    }
    while (deque.length > 0 && nums[deque[deque.length - 1]] < nums[i]) {
      deque.pop();
    }
    deque.push(i);
    if (i >= k - 1) {
      result.push(nums[deque[0]]);
    }
  }
  return result;
}`,
      python: `from collections import deque

class Solution:
    def maxSlidingWindow(self, nums: list[int], k: int) -> list[int]:
        result = []
        q = deque()
        for i, num in enumerate(nums):
            while q and q[0] < i - k + 1:
                q.popleft()
            while q and nums[q[-1]] < num:
                q.pop()
            q.append(i)
            if i >= k - 1:
                result.append(nums[q[0]])
        return result`,
      cpp: `#include <vector>
#include <deque>
using namespace std;

class Solution {
public:
    vector<int> maxSlidingWindow(vector<int>& nums, int k) {
        vector<int> res;
        deque<int> dq;
        for (int i = 0; i < (int)nums.size(); i++) {
            while (!dq.empty() && dq.front() < i - k + 1) {
                dq.pop_front();
            }
            while (!dq.empty() && nums[dq.back()] < nums[i]) {
                dq.pop_back();
            }
            dq.push_back(i);
            if (i >= k - 1) {
                res.push_back(nums[dq.front()]);
            }
        }
        return res;
    }
};`,
      java: `import java.util.*;

class Solution {
    public int[] maxSlidingWindow(int[] nums, int k) {
        int n = nums.length;
        int[] res = new int[n - k + 1];
        int idx = 0;
        Deque<Integer> dq = new ArrayDeque<>();
        for (int i = 0; i < n; i++) {
            while (!dq.isEmpty() && dq.peekFirst() < i - k + 1) {
                dq.pollFirst();
            }
            while (!dq.isEmpty() && nums[dq.peekLast()] < nums[i]) {
                dq.pollLast();
            }
            dq.offerLast(i);
            if (i >= k - 1) {
                res[idx++] = nums[dq.peekFirst()];
            }
        }
        return res;
    }
}`
    },
    sampleTestCases: [
      { id: 'swm-1', input: [[1, 3, -1, -3, 5, 3, 6, 7], 3], expectedOutput: [3, 3, 5, 5, 6, 7] },
      { id: 'swm-2', input: [[1], 1], expectedOutput: [1] }
    ],
    hiddenTestCases: [
      { id: 'swm-h1', input: [[7, 2, 4], 2], expectedOutput: [7, 4], isHidden: true }
    ],
    hints: ['Maintain indices in a monotonic decreasing double-ended queue (deque).'],
    solutionExplanation: `Monotonic deque storing indices where elements are strictly decreasing. Pop elements out of range from the front, pop elements smaller than current element from the back. The front is always the current window maximum.

- **Time Complexity:** O(n)
- **Space Complexity:** O(k)`,
  },

  {
    id: 'p-fruit-into-baskets',
    slug: 'fruit-into-baskets',
    timeLimitMs: 2000,
    memoryLimitMb: 128,
    title: 'Fruit Into Baskets',
    difficulty: 'Medium',
    category: 'Sliding Window',
    tags: ['Array', 'Hash Table', 'Sliding Window'],
    functionName: 'totalFruit',
    paramNames: ['fruits'],
    description: `You are visiting a farm that has a single row of fruit trees arranged from left to right. The trees are represented by an integer array \`fruits\` where \`fruits[i]\` is the **type** of fruit the \`i\`th tree produces.

You want to collect as much fruit as possible. However, the owner has some strict rules:

- You only have **two** baskets, and each basket can only hold a **single type** of fruit.
- Starting from any tree, you must pick **exactly one fruit** from every tree (including the start tree) while moving to the right until you reach a tree with fruit that cannot fit in your baskets.

Return the **maximum number** of fruits you can pick.

### Example 1:
\`\`\`
Input: fruits = [1,2,1]
Output: 3
Explanation: We can pick from all 3 trees.
\`\`\`

### Example 2:
\`\`\`
Input: fruits = [0,1,2,2]
Output: 3
Explanation: We can pick from [1,2,2]. If we started at tree 0, we'd only pick [0,1].
\`\`\`

### Example 3:
\`\`\`
Input: fruits = [1,2,3,2,2]
Output: 4
Explanation: We can pick from [2,3,2,2].
\`\`\`

### Constraints:
- \`1 <= fruits.length <= 10^5\`
- \`0 <= fruits[i] < fruits.length\`
`,
    starterCode: {
      javascript: `/**
 * @param {number[]} fruits
 * @return {number}
 */
function totalFruit(fruits) {
  const count = new Map();
  let left = 0, maxFruit = 0;
  for (let right = 0; right < fruits.length; right++) {
    const f = fruits[right];
    count.set(f, (count.get(f) || 0) + 1);
    while (count.size > 2) {
      const leftF = fruits[left];
      count.set(leftF, count.get(leftF) - 1);
      if (count.get(leftF) === 0) count.delete(leftF);
      left++;
    }
    maxFruit = Math.max(maxFruit, right - left + 1);
  }
  return maxFruit;
}`,
      python: `class Solution:
    def totalFruit(self, fruits: list[int]) -> int:
        count = {}
        left = 0
        max_fruit = 0
        for right, f in enumerate(fruits):
            count[f] = count.get(f, 0) + 1
            while len(count) > 2:
                left_f = fruits[left]
                count[left_f] -= 1
                if count[left_f] == 0:
                    del count[left_f]
                left += 1
            max_fruit = max(max_fruit, right - left + 1)
        return max_fruit`,
      cpp: `#include <vector>
#include <unordered_map>
#include <algorithm>
using namespace std;

class Solution {
public:
    int totalFruit(vector<int>& fruits) {
        unordered_map<int, int> count;
        int left = 0, maxFruit = 0;
        for (int right = 0; right < (int)fruits.size(); right++) {
            count[fruits[right]]++;
            while (count.size() > 2) {
                int leftF = fruits[left];
                count[leftF]--;
                if (count[leftF] == 0) count.erase(leftF);
                left++;
            }
            maxFruit = max(maxFruit, right - left + 1);
        }
        return maxFruit;
    }
};`,
      java: `import java.util.*;

class Solution {
    public int totalFruit(int[] fruits) {
        Map<Integer, Integer> count = new HashMap<>();
        int left = 0, maxFruit = 0;
        for (int right = 0; right < fruits.length; right++) {
            count.put(fruits[right], count.getOrDefault(fruits[right], 0) + 1);
            while (count.size() > 2) {
                int leftF = fruits[left];
                count.put(leftF, count.get(leftF) - 1);
                if (count.get(leftF) == 0) count.remove(leftF);
                left++;
            }
            maxFruit = Math.max(maxFruit, right - left + 1);
        }
        return maxFruit;
    }
}`
    },
    sampleTestCases: [
      { id: 'fib-1', input: [[1, 2, 1]], expectedOutput: 3 },
      { id: 'fib-2', input: [[0, 1, 2, 2]], expectedOutput: 3 },
      { id: 'fib-3', input: [[1, 2, 3, 2, 2]], expectedOutput: 4 }
    ],
    hiddenTestCases: [
      { id: 'fib-h1', input: [[3, 3, 3, 1, 2, 1, 1, 2, 3, 3, 4]], expectedOutput: 5, isHidden: true }
    ],
    hints: ['Find longest contiguous subarray with at most 2 distinct elements.'],
    solutionExplanation: `Sliding window pattern for at most 2 distinct keys in a frequency map. When distinct count exceeds 2, increment left pointer and decrement frequencies until distinct count <= 2.

- **Time Complexity:** O(n)
- **Space Complexity:** O(1)`,
  }
];
