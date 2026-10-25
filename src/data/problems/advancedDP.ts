import { Problem } from '../../types';

export const ADVANCED_DP_PROBLEMS: Problem[] = [
  {
    id: 'p-min-cost-climbing-stairs',
    slug: 'min-cost-climbing-stairs',
    title: 'Min Cost Climbing Stairs',
    difficulty: 'Easy',
    category: 'Dynamic Programming',
    tags: ['Array', 'Dynamic Programming'],
    functionName: 'minCostClimbingStairs',
    paramNames: ['cost'],
    description: `You are given an integer array \`cost\` where \`cost[i]\` is the cost of \`i-th\` step on a staircase. Once you pay the cost, you can either climb one or two steps.

You can either start from the step with index \`0\`, or the step with index \`1\`.

Return *the minimum cost to reach the top of the floor*.

### Example 1:
\`\`\`
Input: cost = [10,15,20]
Output: 15
Explanation: You will start at index 1.
- Pay 15 and climb two steps to reach the top.
The total cost is 15.
\`\`\`

### Example 2:
\`\`\`
Input: cost = [1,100,1,1,1,100,1,1,100,1]
Output: 6
Explanation: You will start at index 0.
- Pay 1 and climb two steps to reach index 2.
- Pay 1 and climb two steps to reach index 4.
- Pay 1 and climb two steps to reach index 6.
- Pay 1 and climb one step to reach index 7.
- Pay 1 and climb two steps to reach index 9.
- Pay 1 and climb one step to reach the top.
The total cost is 6.
\`\`\`

### Constraints:
- \`2 <= cost.length <= 1000\`
- \`0 <= cost[i] <= 999\`
`,
    starterCode: {
      javascript: `/**
 * @param {number[]} cost
 * @return {number}
 */
function minCostClimbingStairs(cost) {
  let prev2 = cost[0];
  let prev1 = cost[1];
  for (let i = 2; i < cost.length; i++) {
    const cur = cost[i] + Math.min(prev1, prev2);
    prev2 = prev1;
    prev1 = cur;
  }
  return Math.min(prev1, prev2);
}`,
      python: `class Solution:
    def minCostClimbingStairs(self, cost: list[int]) -> int:
        prev2, prev1 = cost[0], cost[1]
        for i in range(2, len(cost)):
            cur = cost[i] + min(prev1, prev2)
            prev2 = prev1
            prev1 = cur
        return min(prev1, prev2)`,
      cpp: `#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int minCostClimbingStairs(vector<int>& cost) {
        int prev2 = cost[0], prev1 = cost[1];
        for (size_t i = 2; i < cost.size(); i++) {
            int cur = cost[i] + min(prev1, prev2);
            prev2 = prev1;
            prev1 = cur;
        }
        return min(prev1, prev2);
    }
};`,
      java: `class Solution {
    public int minCostClimbingStairs(int[] cost) {
        int prev2 = cost[0], prev1 = cost[1];
        for (int i = 2; i < cost.length; i++) {
            int cur = cost[i] + Math.min(prev1, prev2);
            prev2 = prev1;
            prev1 = cur;
        }
        return Math.min(prev1, prev2);
    }
}`
    },
    sampleTestCases: [
      { id: 'mccs-1', input: [[10, 15, 20]], expectedOutput: 15 },
      { id: 'mccs-2', input: [[1, 100, 1, 1, 1, 100, 1, 1, 100, 1]], expectedOutput: 6 }
    ],
    hiddenTestCases: [
      { id: 'mccs-h1', input: [[0, 0, 0, 1]], expectedOutput: 0, isHidden: true }
    ],
    hints: [
      'dp[i] = cost[i] + min(dp[i - 1], dp[i - 2]).'
    ],
    solutionExplanation: `At step i, the minimum cost is \`cost[i] + min(dp[i - 1], dp[i - 2])\`. Track only the last two steps for O(1) space.

- **Time Complexity:** O(n)
- **Space Complexity:** O(1)`,
    timeLimitMs: 2000,
    memoryLimitMb: 128,
    acceptanceRate: 64.1,
    totalSubmissions: 250000,
    acceptedSubmissions: 160250
  },
  {
    id: 'p-word-break',
    slug: 'word-break',
    title: 'Word Break',
    difficulty: 'Medium',
    category: 'Dynamic Programming',
    tags: ['Array', 'Hash Table', 'String', 'Dynamic Programming', 'Trie', 'Memoization'],
    functionName: 'wordBreak',
    paramNames: ['s', 'wordDict'],
    description: `Given a string \`s\` and a dictionary of strings \`wordDict\`, return \`true\` if \`s\` can be segmented into a space-separated sequence of one or more dictionary words.

**Note** that the same word in the dictionary may be reused multiple times in the segmentation.

### Example 1:
\`\`\`
Input: s = "leetcode", wordDict = ["leet","code"]
Output: true
Explanation: Return true because "leetcode" can be segmented as "leet code".
\`\`\`

### Example 2:
\`\`\`
Input: s = "applepenapple", wordDict = ["apple","pen"]
Output: true
Explanation: Return true because "applepenapple" can be segmented as "apple pen apple".
Note that you are allowed to reuse a dictionary word.
\`\`\`

### Example 3:
\`\`\`
Input: s = "catsandog", wordDict = ["cats","dog","sand","and","cat"]
Output: false
\`\`\`

### Constraints:
- \`1 <= s.length <= 300\`
- \`1 <= wordDict.length <= 1000\`
- \`1 <= wordDict[i].length <= 20\`
- \`s\` and \`wordDict[i]\` consist of only lowercase English letters.
- All the strings of \`wordDict\` are **unique**.
`,
    starterCode: {
      javascript: `/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
function wordBreak(s, wordDict) {
  const n = s.length;
  const dp = new Array(n + 1).fill(false);
  dp[n] = true;

  for (let i = n - 1; i >= 0; i--) {
    for (const w of wordDict) {
      if (i + w.length <= n && s.substring(i, i + w.length) === w) {
        if (dp[i + w.length]) {
          dp[i] = true;
          break;
        }
      }
    }
  }
  return dp[0];
}`,
      python: `class Solution:
    def wordBreak(self, s: str, wordDict: list[str]) -> bool:
        dp = [False] * (len(s) + 1)
        dp[len(s)] = True
        for i in range(len(s) - 1, -1, -1):
            for w in wordDict:
                if i + len(w) <= len(s) and s[i : i + len(w)] == w:
                    if dp[i + len(w)]:
                        dp[i] = True
                        break
        return dp[0]`,
      cpp: `#include <string>
#include <vector>
using namespace std;

class Solution {
public:
    bool wordBreak(string s, vector<string>& wordDict) {
        int n = s.size();
        vector<bool> dp(n + 1, false);
        dp[n] = true;
        for (int i = n - 1; i >= 0; i--) {
            for (const string& w : wordDict) {
                if (i + w.size() <= n && s.substr(i, w.size()) == w) {
                    if (dp[i + w.size()]) {
                        dp[i] = true;
                        break;
                    }
                }
            }
        }
        return dp[0];
    }
};`,
      java: `import java.util.*;

class Solution {
    public boolean wordBreak(String s, List<String> wordDict) {
        int n = s.length();
        boolean[] dp = new boolean[n + 1];
        dp[n] = true;
        for (int i = n - 1; i >= 0; i--) {
            for (String w : wordDict) {
                if (i + w.length() <= n && s.substring(i, i + w.length()).equals(w)) {
                    if (dp[i + w.length()]) {
                        dp[i] = true;
                        break;
                    }
                }
            }
        }
        return dp[0];
    }
}`
    },
    sampleTestCases: [
      { id: 'wb-1', input: ['leetcode', ['leet', 'code']], expectedOutput: true },
      { id: 'wb-2', input: ['applepenapple', ['apple', 'pen']], expectedOutput: true },
      { id: 'wb-3', input: ['catsandog', ['cats', 'dog', 'sand', 'and', 'cat']], expectedOutput: false }
    ],
    hiddenTestCases: [
      { id: 'wb-h1', input: ['a', ['a']], expectedOutput: true, isHidden: true }
    ],
    hints: [
      'Bottom-up DP: dp[i] is true if s[i:] can be segmented into words from wordDict.'
    ],
    solutionExplanation: `Working backwards from end of string: \`dp[i] = true\` if there exists a word \`w\` matching \`s[i : i + len(w)]\` such that \`dp[i + len(w)] == true\`.

- **Time Complexity:** O(N * M * K) where N = len(s), M = len(wordDict), K = max word length
- **Space Complexity:** O(N)`,
    timeLimitMs: 2000,
    memoryLimitMb: 128,
    acceptanceRate: 46.2,
    totalSubmissions: 220000,
    acceptedSubmissions: 101640
  },
  {
    id: 'p-maximum-product-subarray',
    slug: 'maximum-product-subarray',
    title: 'Maximum Product Subarray',
    difficulty: 'Medium',
    category: 'Dynamic Programming',
    tags: ['Array', 'Dynamic Programming'],
    functionName: 'maxProduct',
    paramNames: ['nums'],
    description: `Given an integer array \`nums\`, find a subarray that has the largest product, and return *the product*.

The test cases are generated so that the answer will fit in a **32-bit** integer.

### Example 1:
\`\`\`
Input: nums = [2,3,-2,4]
Output: 6
Explanation: [2,3] has the largest product 6.
\`\`\`

### Example 2:
\`\`\`
Input: nums = [-2,0,-1]
Output: 0
Explanation: The result cannot be 2, because [-2,-1] is not a subarray.
\`\`\`

### Constraints:
- \`1 <= nums.length <= 2 * 10^4\`
- \`-10 <= nums[i] <= 10\`
- The product of any prefix or suffix of \`nums\` is **guaranteed** to fit in a **32-bit** integer.
`,
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @return {number}
 */
function maxProduct(nums) {
  let res = Math.max(...nums);
  let curMin = 1, curMax = 1;

  for (const n of nums) {
    if (n === 0) {
      curMin = 1;
      curMax = 1;
      continue;
    }
    const temp = curMax * n;
    curMax = Math.max(n * curMax, n * curMin, n);
    curMin = Math.min(temp, n * curMin, n);
    res = Math.max(res, curMax);
  }
  return res;
}`,
      python: `class Solution:
    def maxProduct(self, nums: list[int]) -> int:
        res = max(nums)
        cur_min, cur_max = 1, 1
        for n in nums:
            if n == 0:
                cur_min, cur_max = 1, 1
                continue
            tmp = cur_max * n
            cur_max = max(n * cur_max, n * cur_min, n)
            cur_min = min(tmp, n * cur_min, n)
            res = max(res, cur_max)
        return res`,
      cpp: `#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int maxProduct(vector<int>& nums) {
        int res = *max_element(nums.begin(), nums.end());
        int curMin = 1, curMax = 1;

        for (int n : nums) {
            if (n == 0) {
                curMin = 1; curMax = 1;
                continue;
            }
            int tmp = curMax * n;
            curMax = max({n * curMax, n * curMin, n});
            curMin = min({tmp, n * curMin, n});
            res = max(res, curMax);
        }
        return res;
    }
};`,
      java: `class Solution {
    public int maxProduct(int[] nums) {
        int res = nums[0];
        int curMin = 1, curMax = 1;

        for (int n : nums) {
            if (n == 0) {
                curMin = 1; curMax = 1;
                res = Math.max(res, 0);
                continue;
            }
            int tmp = curMax * n;
            curMax = Math.max(n, Math.max(n * curMax, n * curMin));
            curMin = Math.min(n, Math.min(tmp, n * curMin));
            res = Math.max(res, curMax);
        }
        return res;
    }
}`
    },
    sampleTestCases: [
      { id: 'mps-1', input: [[2, 3, -2, 4]], expectedOutput: 6 },
      { id: 'mps-2', input: [[-2, 0, -1]], expectedOutput: 0 }
    ],
    hiddenTestCases: [
      { id: 'mps-h1', input: [[-2, 3, -4]], expectedOutput: 24, isHidden: true },
      { id: 'mps-h2', input: [[-2]], expectedOutput: -2, isHidden: true }
    ],
    hints: [
      'A negative number can turn a minimum product into a maximum product. Track both curMax and curMin.'
    ],
    solutionExplanation: `Maintain both \`curMax\` and \`curMin\` ending at the current element. When multiplied by a negative number, the minimum becomes the new maximum.

- **Time Complexity:** O(n)
- **Space Complexity:** O(1)`,
    timeLimitMs: 2000,
    memoryLimitMb: 128,
    acceptanceRate: 35.1,
    totalSubmissions: 230000,
    acceptedSubmissions: 80730
  },
  {
    id: 'p-palindromic-substrings',
    slug: 'palindromic-substrings',
    title: 'Palindromic Substrings',
    difficulty: 'Medium',
    category: 'Dynamic Programming',
    tags: ['String', 'Dynamic Programming'],
    functionName: 'countSubstrings',
    paramNames: ['s'],
    description: `Given a string \`s\`, return *the number of **palindromic substrings** in it*.

A string is a **palindrome** when it reads the same backward as forward.

A **substring** is a contiguous sequence of characters within the string.

### Example 1:
\`\`\`
Input: s = "abc"
Output: 3
Explanation: Three palindromic strings: "a", "b", "c".
\`\`\`

### Example 2:
\`\`\`
Input: s = "aaa"
Output: 6
Explanation: Six palindromic strings: "a", "a", "a", "aa", "aa", "aaa".
\`\`\`

### Constraints:
- \`1 <= s.length <= 1000\`
- \`s\` consists of lowercase English letters.
`,
    starterCode: {
      javascript: `/**
 * @param {string} s
 * @return {number}
 */
function countSubstrings(s) {
  let count = 0;
  function countAround(l, r) {
    let cnt = 0;
    while (l >= 0 && r < s.length && s[l] === s[r]) {
      cnt++;
      l--;
      r++;
    }
    return cnt;
  }

  for (let i = 0; i < s.length; i++) {
    count += countAround(i, i);     // odd length
    count += countAround(i, i + 1); // even length
  }
  return count;
}`,
      python: `class Solution:
    def countSubstrings(self, s: str) -> int:
        count = 0
        def count_around(l, r):
            res = 0
            while l >= 0 and r < len(s) and s[l] == s[r]:
                res += 1
                l -= 1
                r += 1
            return res

        for i in range(len(s)):
            count += count_around(i, i)
            count += count_around(i, i + 1)
        return count`,
      cpp: `#include <string>
using namespace std;

class Solution {
public:
    int countSubstrings(string s) {
        int count = 0;
        for (int i = 0; i < s.size(); i++) {
            count += countAround(s, i, i);
            count += countAround(s, i, i + 1);
        }
        return count;
    }
private:
    int countAround(const string& s, int l, int r) {
        int cnt = 0;
        while (l >= 0 && r < s.size() && s[l] == s[r]) {
            cnt++;
            l--;
            r++;
        }
        return cnt;
    }
};`,
      java: `class Solution {
    public int countSubstrings(String s) {
        int count = 0;
        for (int i = 0; i < s.length(); i++) {
            count += countAround(s, i, i);
            count += countAround(s, i, i + 1);
        }
        return count;
    }
    private int countAround(String s, int l, int r) {
        int cnt = 0;
        while (l >= 0 && r < s.length() && s.charAt(l) == s.charAt(r)) {
            cnt++;
            l--;
            r++;
        }
        return cnt;
    }
}`
    },
    sampleTestCases: [
      { id: 'ps-1', input: ['abc'], expectedOutput: 3 },
      { id: 'ps-2', input: ['aaa'], expectedOutput: 6 }
    ],
    hiddenTestCases: [
      { id: 'ps-h1', input: ['a'], expectedOutput: 1, isHidden: true },
      { id: 'ps-h2', input: ['fdsklf'], expectedOutput: 6, isHidden: true }
    ],
    hints: [
      'Expand outwards from each center. There are 2n - 1 possible centers.'
    ],
    solutionExplanation: `Expand around center: Every palindrome is centered at either a single character (odd length) or between two characters (even length). There are \`2n - 1\` centers to expand outwards from.

- **Time Complexity:** O(n²)
- **Space Complexity:** O(1)`,
    timeLimitMs: 2000,
    memoryLimitMb: 128,
    acceptanceRate: 67.8,
    totalSubmissions: 200000,
    acceptedSubmissions: 135600
  }
];
