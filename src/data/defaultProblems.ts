import { Problem } from '../types';

export const DEFAULT_PROBLEMS: Problem[] = [
  {
    id: 'p-two-sum',
    slug: 'two-sum',
    title: 'Two Sum',
    difficulty: 'Easy',
    category: 'Arrays & Hashing',
    tags: ['Array', 'Hash Table'],
    functionName: 'twoSum',
    paramNames: ['nums', 'target'],
    description: `Given an array of integers \`nums\` and an integer \`target\`, return *indices of the two numbers such that they add up to \`target\`*.

You may assume that each input would have ***exactly one solution***, and you may not use the *same* element twice.

You can return the answer in any order.

### Example 1:
\`\`\`
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
\`\`\`

### Example 2:
\`\`\`
Input: nums = [3,2,4], target = 6
Output: [1,2]
\`\`\`

### Example 3:
\`\`\`
Input: nums = [3,3], target = 6
Output: [0,1]
\`\`\`

### Constraints:
- \`2 <= nums.length <= 10^4\`
- \`-10^9 <= nums[i] <= 10^9\`
- \`-10^9 <= target <= 10^9\`
- **Only one valid answer exists.**
`,
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function twoSum(nums, target) {
  // Write your code here
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}`,
      python: `class Solution:
    def twoSum(self, nums: list[int], target: int) -> list[int]:
        seen = {}
        for i, num in enumerate(nums):
            complement = target - num
            if complement in seen:
                return [seen[complement], i]
            seen[num] = i
        return []`,
      cpp: `#include <vector>
#include <unordered_map>
using namespace std;

class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> map;
        for (int i = 0; i < nums.size(); i++) {
            int complement = target - nums[i];
            if (map.find(complement) != map.end()) {
                return {map[complement], i};
            }
            map[nums[i]] = i;
        }
        return {};
    }
};`,
      java: `import java.util.*;

class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (map.containsKey(complement)) {
                return new int[] { map.get(complement), i };
            }
            map.put(nums[i], i);
        }
        return new int[] {};
    }
}`
    },
    sampleTestCases: [
      {
        id: 'tc-1',
        input: [[2, 7, 11, 15], 9],
        expectedOutput: [0, 1],
        explanation: 'nums[0] + nums[1] = 2 + 7 = 9'
      },
      {
        id: 'tc-2',
        input: [[3, 2, 4], 6],
        expectedOutput: [1, 2],
        explanation: 'nums[1] + nums[2] = 2 + 4 = 6'
      },
      {
        id: 'tc-3',
        input: [[3, 3], 6],
        expectedOutput: [0, 1],
        explanation: 'nums[0] + nums[1] = 3 + 3 = 6'
      }
    ],
    hiddenTestCases: [
      {
        id: 'tc-h1',
        input: [[-1, -2, -3, -4, -5], -8],
        expectedOutput: [2, 4],
        isHidden: true
      },
      {
        id: 'tc-h2',
        input: [[0, 4, 3, 0], 0],
        expectedOutput: [0, 3],
        isHidden: true
      },
      {
        id: 'tc-h3',
        input: [[1000000000, 500, 1000000000], 2000000000],
        expectedOutput: [0, 2],
        isHidden: true
      }
    ],
    hints: [
      'A really brute force way would be to search for all possible pairs of numbers, but that would be O(N^2). Can we do better?',
      'Can we use extra space? What data structure can look up whether an element exists in O(1) average time?',
      'Use a Hash Map: As you iterate through the array, calculate complement = target - nums[i]. If complement is already in your map, you found the pair!'
    ],
    solutionExplanation: `### Approach: One-Pass Hash Map

Instead of using a nested loop that takes $O(N^2)$ time, we can iterate through the array once while keeping a hash table of previously visited numbers and their indices.

#### Algorithm:
1. Initialize an empty hash map \`map\` (value -> index).
2. For each element \`nums[i]\` at index \`i\`:
   - Calculate \`complement = target - nums[i]\`.
   - Check if \`complement\` exists in \`map\`. If so, return \`[map[complement], i]\`.
   - Otherwise, store \`map[nums[i]] = i\`.

#### Complexity Analysis:
- **Time Complexity:** $O(N)$ where $N$ is the number of elements. We traverse the list containing $N$ elements only once. Each lookup in the hash map costs $O(1)$ on average.
- **Space Complexity:** $O(N)$ because the map stores at most $N$ elements in the worst case.`,
    timeLimitMs: 2000,
    memoryLimitMb: 128,
    acceptanceRate: 52.8,
    totalSubmissions: 48920,
    acceptedSubmissions: 25830
  },
  {
    id: 'p-valid-parentheses',
    slug: 'valid-parentheses',
    title: 'Valid Parentheses',
    difficulty: 'Easy',
    category: 'Stack',
    tags: ['String', 'Stack'],
    functionName: 'isValid',
    paramNames: ['s'],
    starterCode: {
      javascript: `/**
 * @param {string} s
 * @return {boolean}
 */
function isValid(s) {
  // Write your code here
  
}`,
      python: `class Solution:
    def isValid(self, s: str) -> bool:
        # Write your Python solution here
        pass`,
      cpp: `#include <string>
#include <stack>
using namespace std;

class Solution {
public:
    bool isValid(string s) {
        // Write your solution here
        return false;
    }
};`,
      java: `import java.util.*;

class Solution {
    public boolean isValid(String s) {
        // Write your Java solution here
        return false;
    }
}`
    },
    description: `Given a string \`s\` containing just the characters \`'('\`, \`')'\`, \`'{'\`, \`'}'\`, \`'['\` and \`']'\`, determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.

### Example 1:
\`\`\`
Input: s = "()"
Output: true
\`\`\`

### Example 2:
\`\`\`
Input: s = "()[]{}"
Output: true
\`\`\`

### Example 3:
\`\`\`
Input: s = "(]"
Output: false
\`\`\`

### Constraints:
- \`1 <= s.length <= 10^4\`
- \`s\` consists of parentheses only \`'()[]{}'\`.
`,
    sampleTestCases: [
      { id: 'vp-1', input: ['()'], expectedOutput: true },
      { id: 'vp-2', input: ['()[]{}'], expectedOutput: true },
      { id: 'vp-3', input: ['(]'], expectedOutput: false }
    ],
    hiddenTestCases: [
      { id: 'vp-h1', input: ['([)]'], expectedOutput: false, isHidden: true },
      { id: 'vp-h2', input: ['{[]}'], expectedOutput: true, isHidden: true },
      { id: 'vp-h3', input: ['(('], expectedOutput: false, isHidden: true },
      { id: 'vp-h4', input: [']'], expectedOutput: false, isHidden: true }
    ],
    hints: [
      'Use a Stack: An opening bracket must be closed in Last-In-First-Out order.',
      'When you see an open bracket, push its matching closing bracket onto the stack.',
      'When you see a closing bracket, pop the top of the stack and ensure it matches!'
    ],
    solutionExplanation: `### Approach: Stack

A stack is the ideal data structure because the most recently opened bracket must be the first one to be closed.

#### Algorithm:
1. Initialize an empty stack.
2. Iterate through each character in \`s\`:
   - If it is \`'('\`, push \`')'\`.
   - If it is \`'['\`, push \`']'\`.
   - If it is \`'{'\`, push \`'}'\`.
   - Otherwise, if the stack is empty or the popped element does not equal the current character, return \`false\`.
3. At the end, return \`true\` if the stack is completely empty.

#### Complexity:
- **Time Complexity:** $O(N)$ where $N$ is the length of the string.
- **Space Complexity:** $O(N)$ for the stack.`,
    timeLimitMs: 2000,
    memoryLimitMb: 128,
    acceptanceRate: 40.5,
    totalSubmissions: 39420,
    acceptedSubmissions: 15965
  },
  {
    id: 'p-longest-substring',
    slug: 'longest-substring-without-repeating-characters',
    title: 'Longest Substring Without Repeating Characters',
    difficulty: 'Medium',
    category: 'Sliding Window',
    tags: ['Hash Table', 'String', 'Sliding Window'],
    functionName: 'lengthOfLongestSubstring',
    paramNames: ['s'],
    starterCode: {
      javascript: `/**
 * @param {string} s
 * @return {number}
 */
function lengthOfLongestSubstring(s) {
  // Write your code here
  
}`,
      python: `class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        # Write your code here
        pass`,
      cpp: `#include <string>
#include <unordered_map>
#include <algorithm>
using namespace std;

class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        // Write your code here
        return 0;
    }
};`,
      java: `import java.util.*;

class Solution {
    public int lengthOfLongestSubstring(String s) {
        // Write your code here
        return 0;
    }
}`
    },
    description: `Given a string \`s\`, find the length of the **longest substring** without repeating characters.

### Example 1:
\`\`\`
Input: s = "abcabcbb"
Output: 3
Explanation: The answer is "abc", with the length of 3.
\`\`\`

### Example 2:
\`\`\`
Input: s = "bbbbb"
Output: 1
Explanation: The answer is "b", with the length of 1.
\`\`\`

### Example 3:
\`\`\`
Input: s = "pwwkew"
Output: 3
Explanation: The answer is "wke", with the length of 3.
Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.
\`\`\`

### Constraints:
- \`0 <= s.length <= 5 * 10^4\`
- \`s\` consists of English letters, digits, symbols and spaces.
`,
    sampleTestCases: [
      { id: 'ls-1', input: ['abcabcbb'], expectedOutput: 3 },
      { id: 'ls-2', input: ['bbbbb'], expectedOutput: 1 },
      { id: 'ls-3', input: ['pwwkew'], expectedOutput: 3 }
    ],
    hiddenTestCases: [
      { id: 'ls-h1', input: [''], expectedOutput: 0, isHidden: true },
      { id: 'ls-h2', input: [' '], expectedOutput: 1, isHidden: true },
      { id: 'ls-h3', input: ['au'], expectedOutput: 2, isHidden: true },
      { id: 'ls-h4', input: ['tmmzuxt'], expectedOutput: 5, isHidden: true }
    ],
    hints: [
      'Think about a sliding window with two pointers: left and right.',
      'Keep track of the last seen index of each character in a Map.',
      'When you see a repeated character that falls within the current window, advance the left pointer past its previous index.'
    ],
    solutionExplanation: `### Approach: Sliding Window with Hash Map

We use a sliding window \`[left, right]\`. We expand \`right\` across the string while storing the index of each character.

#### Algorithm:
1. Maintain a map of character to its most recent index.
2. Maintain \`left = 0\` and \`maxLength = 0\`.
3. For each \`right\` from 0 to \`s.length - 1\`:
   - If \`s[right]\` is in the map and its recorded index is \`>= left\`, move \`left = map.get(s[right]) + 1\`.
   - Update \`map.set(s[right], right)\`.
   - Update \`maxLength = Math.max(maxLength, right - left + 1)\`.
4. Return \`maxLength\`.

#### Complexity:
- **Time Complexity:** $O(N)$ single pass.
- **Space Complexity:** $O(\min(N, M))$ where $M$ is the alphabet size.`,
    timeLimitMs: 2000,
    memoryLimitMb: 128,
    acceptanceRate: 34.2,
    totalSubmissions: 31200,
    acceptedSubmissions: 10670
  },
  {
    id: 'p-best-time-to-buy-and-sell-stock',
    slug: 'best-time-to-buy-and-sell-stock',
    title: 'Best Time to Buy and Sell Stock',
    difficulty: 'Easy',
    category: 'Dynamic Programming',
    tags: ['Array', 'Dynamic Programming'],
    functionName: 'maxProfit',
    paramNames: ['prices'],
    starterCode: {
      javascript: `/**
 * @param {number[]} prices
 * @return {number}
 */
function maxProfit(prices) {
  // Write your code here
  
}`,
      python: `class Solution:
    def maxProfit(self, prices: list[int]) -> int:
        # Write your code here
        pass`,
      cpp: `#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int maxProfit(vector<int>& prices) {
        return 0;
    }
};`,
      java: `class Solution {
    public int maxProfit(int[] prices) {
        return 0;
    }
}`
    },
    description: `You are given an array \`prices\` where \`prices[i]\` is the price of a given stock on the \`i\`th day.

You want to maximize your profit by choosing a **single day** to buy one stock and choosing a **different day in the future** to sell that stock.

Return *the maximum profit you can achieve from this transaction*. If you cannot achieve any profit, return \`0\`.

### Example 1:
\`\`\`
Input: prices = [7,1,5,3,6,4]
Output: 5
Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.
Note that buying on day 2 and selling on day 1 is not allowed because you must buy before you sell.
\`\`\`

### Example 2:
\`\`\`
Input: prices = [7,6,4,3,1]
Output: 0
Explanation: In this case, no transactions are done and the max profit = 0.
\`\`\`

### Constraints:
- \`1 <= prices.length <= 10^5\`
- \`0 <= prices[i] <= 10^4\`
`,
    sampleTestCases: [
      { id: 'bs-1', input: [[7, 1, 5, 3, 6, 4]], expectedOutput: 5 },
      { id: 'bs-2', input: [[7, 6, 4, 3, 1]], expectedOutput: 0 }
    ],
    hiddenTestCases: [
      { id: 'bs-h1', input: [[2, 4, 1]], expectedOutput: 2, isHidden: true },
      { id: 'bs-h2', input: [[1]], expectedOutput: 0, isHidden: true },
      { id: 'bs-h3', input: [[3, 2, 6, 5, 0, 3]], expectedOutput: 4, isHidden: true }
    ],
    hints: [
      'Track the minimum price seen so far as you iterate through the days.',
      'At each day, the potential profit would be the current price minus the minimum price seen so far.',
      'Keep a running maximum of the profit.'
    ],
    solutionExplanation: `### Approach: One-Pass Greedy / DP

As we iterate through the list of prices, we keep track of the minimum price encountered so far. At each step, we can calculate what our profit would be if we sold on that day.

#### Complexity:
- **Time Complexity:** $O(N)$
- **Space Complexity:** $O(1)$`,
    timeLimitMs: 2000,
    memoryLimitMb: 128,
    acceptanceRate: 54.1,
    totalSubmissions: 52100,
    acceptedSubmissions: 28180
  },
  {
    id: 'p-container-with-most-water',
    slug: 'container-with-most-water',
    title: 'Container With Most Water',
    difficulty: 'Medium',
    category: 'Two Pointers',
    tags: ['Array', 'Two Pointers', 'Greedy'],
    functionName: 'maxArea',
    paramNames: ['height'],
    starterCode: {
      javascript: `/**
 * @param {number[]} height
 * @return {number}
 */
function maxArea(height) {
  // Write your code here
  
}`,
      python: `class Solution:
    def maxArea(self, height: list[int]) -> int:
        pass`,
      cpp: `#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int maxArea(vector<int>& height) {
        return 0;
    }
};`,
      java: `class Solution {
    public int maxArea(int[] height) {
        return 0;
    }
}`
    },
    description: `You are given an integer array \`height\` of length \`n\`. There are \`n\` vertical lines drawn such that the two endpoints of the \`i\`th line are \`(i, 0)\` and \`(i, height[i])\`.

Find two lines that together with the x-axis form a container, such that the container contains the most water.

Return *the maximum amount of water a container can store*.

**Notice** that you may not slant the container.

### Example 1:
\`\`\`
Input: height = [1,8,6,2,5,4,8,3,7]
Output: 49
Explanation: The vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water the container can contain is 49 (between height[1] and height[8]).
\`\`\`

### Example 2:
\`\`\`
Input: height = [1,1]
Output: 1
\`\`\`

### Constraints:
- \`n == height.length\`
- \`2 <= n <= 10^5\`
- \`0 <= height[i] <= 10^4\`
`,
    sampleTestCases: [
      { id: 'cw-1', input: [[1, 8, 6, 2, 5, 4, 8, 3, 7]], expectedOutput: 49 },
      { id: 'cw-2', input: [[1, 1]], expectedOutput: 1 }
    ],
    hiddenTestCases: [
      { id: 'cw-h1', input: [[4, 3, 2, 1, 4]], expectedOutput: 16, isHidden: true },
      { id: 'cw-h2', input: [[1, 2, 1]], expectedOutput: 2, isHidden: true }
    ],
    hints: [
      'Use two pointers, one at the left boundary and one at the right boundary.',
      'The area is always limited by the shorter line: (right - left) * min(height[left], height[right]).',
      'To potentially find a larger area, move the pointer pointing to the shorter line inward.'
    ],
    solutionExplanation: `### Approach: Two Pointers

The widest container has the maximum width \`right - left\`. As width decreases, the only way the area can increase is if the height significantly increases. Moving the taller line inward can never increase the area because the height is bounded by the shorter line anyway. Thus, we always move the shorter line.

#### Complexity:
- **Time Complexity:** $O(N)$
- **Space Complexity:** $O(1)$`,
    timeLimitMs: 2000,
    memoryLimitMb: 128,
    acceptanceRate: 54.7,
    totalSubmissions: 28900,
    acceptedSubmissions: 15800
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
    starterCode: {
      javascript: `/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
function coinChange(coins, amount) {
  // Write your code here
  
}`,
      python: `class Solution:
    def coinChange(self, coins: list[int], amount: int) -> int:
        pass`,
      cpp: `#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int coinChange(vector<int>& coins, int amount) {
        return -1;
    }
};`,
      java: `import java.util.*;

class Solution {
    public int coinChange(int[] coins, int amount) {
        return -1;
    }
}`
    },
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
      'This is the classic unbounded knapsack / minimum coins dynamic programming problem.',
      'Define dp[i] as the minimum coins needed to make amount i.',
      'Base case: dp[0] = 0. For each coin c and amount i from c to amount: dp[i] = min(dp[i], dp[i - c] + 1).'
    ],
    solutionExplanation: `### Approach: Bottom-up Dynamic Programming

#### Algorithm:
1. Initialize an array \`dp\` of size \`amount + 1\` filled with \`Infinity\`.
2. Set \`dp[0] = 0\` since 0 coins are needed for amount 0.
3. For each amount \`i\` from 1 to \`amount\`:
   - For each coin \`c\` in \`coins\`:
     - If \`i - c >= 0\`, \`dp[i] = min(dp[i], dp[i - c] + 1)\`.
4. Return \`dp[amount] === Infinity ? -1 : dp[amount]\`.

#### Complexity:
- **Time Complexity:** $O(S \times n)$ where $S$ is the amount and $n$ is denomination count.
- **Space Complexity:** $O(S)$ for the dp table.`,
    timeLimitMs: 2000,
    memoryLimitMb: 128,
    acceptanceRate: 43.1,
    totalSubmissions: 23100,
    acceptedSubmissions: 9950
  }
];
