import { Problem } from '../../types';

export const SLIDING_WINDOW_PROBLEMS: Problem[] = [
  {
    id: 'p-best-time-to-buy-and-sell-stock',
    slug: 'best-time-to-buy-and-sell-stock',
    title: 'Best Time to Buy and Sell Stock',
    difficulty: 'Easy',
    category: 'Sliding Window',
    tags: ['Array', 'Dynamic Programming'],
    functionName: 'maxProfit',
    paramNames: ['prices'],
    description: `You are given an array \`prices\` where \`prices[i]\` is the price of a given stock on the \`i-th\` day.

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
    starterCode: {
      javascript: `/**
 * @param {number[]} prices
 * @return {number}
 */
function maxProfit(prices) {
  let minPrice = Infinity;
  let maxP = 0;
  for (let i = 0; i < prices.length; i++) {
    if (prices[i] < minPrice) {
      minPrice = prices[i];
    } else if (prices[i] - minPrice > maxP) {
      maxP = prices[i] - minPrice;
    }
  }
  return maxP;
}`,
      python: `class Solution:
    def maxProfit(self, prices: list[int]) -> int:
        min_price = float('inf')
        max_p = 0
        for price in prices:
            if price < min_price:
                min_price = price
            elif price - min_price > max_p:
                max_p = price - min_price
        return max_p`,
      cpp: `#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int min_price = 1e9, max_p = 0;
        for (int p : prices) {
            if (p < min_price) min_price = p;
            else max_p = max(max_p, p - min_price);
        }
        return max_p;
    }
};`,
      java: `class Solution {
    public int maxProfit(int[] prices) {
        int minPrice = Integer.MAX_VALUE;
        int maxP = 0;
        for (int price : prices) {
            if (price < minPrice) {
                minPrice = price;
            } else if (price - minPrice > maxP) {
                maxP = price - minPrice;
            }
        }
        return maxP;
    }
}`
    },
    sampleTestCases: [
      { id: 'bpss-1', input: [[7, 1, 5, 3, 6, 4]], expectedOutput: 5 },
      { id: 'bpss-2', input: [[7, 6, 4, 3, 1]], expectedOutput: 0 }
    ],
    hiddenTestCases: [
      { id: 'bpss-h1', input: [[1, 2]], expectedOutput: 1, isHidden: true },
      { id: 'bpss-h2', input: [[2, 4, 1]], expectedOutput: 2, isHidden: true }
    ],
    hints: [
      'Track the minimum price seen so far and maximum difference.'
    ],
    solutionExplanation: `Track the minimum buying price seen so far. At each step, calculate the potential profit if we sold at \`prices[i]\` and update \`maxProfit\`.

- **Time Complexity:** O(n)
- **Space Complexity:** O(1)`,
    timeLimitMs: 2000,
    memoryLimitMb: 128,
    acceptanceRate: 54.3,
    totalSubmissions: 320000,
    acceptedSubmissions: 173760
  },
  {
    id: 'p-longest-substring-without-repeating-characters',
    slug: 'longest-substring-without-repeating-characters',
    title: 'Longest Substring Without Repeating Characters',
    difficulty: 'Medium',
    category: 'Sliding Window',
    tags: ['Hash Table', 'String', 'Sliding Window'],
    functionName: 'lengthOfLongestSubstring',
    paramNames: ['s'],
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
    starterCode: {
      javascript: `/**
 * @param {string} s
 * @return {number}
 */
function lengthOfLongestSubstring(s) {
  const set = new Set();
  let left = 0;
  let maxLen = 0;

  for (let right = 0; right < s.length; right++) {
    while (set.has(s[right])) {
      set.delete(s[left]);
      left++;
    }
    set.add(s[right]);
    maxLen = Math.max(maxLen, right - left + 1);
  }
  return maxLen;
}`,
      python: `class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        seen = set()
        left = 0
        max_len = 0
        for right in range(len(s)):
            while s[right] in seen:
                seen.remove(s[left])
                left += 1
            seen.add(s[right])
            max_len = max(max_len, right - left + 1)
        return max_len`,
      cpp: `#include <string>
#include <unordered_set>
#include <algorithm>
using namespace std;

class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        unordered_set<char> seen;
        int left = 0, max_len = 0;
        for (int right = 0; right < s.length(); right++) {
            while (seen.count(s[right])) {
                seen.erase(s[left]);
                left++;
            }
            seen.insert(s[right]);
            max_len = max(max_len, right - left + 1);
        }
        return max_len;
    }
};`,
      java: `import java.util.*;

class Solution {
    public int lengthOfLongestSubstring(String s) {
        Set<Character> seen = new HashSet<>();
        int left = 0, maxLen = 0;
        for (int right = 0; right < s.length(); right++) {
            while (seen.contains(s.charAt(right))) {
                seen.remove(s.charAt(left));
                left++;
            }
            seen.add(s.charAt(right));
            maxLen = Math.max(maxLen, right - left + 1);
        }
        return maxLen;
    }
}`
    },
    sampleTestCases: [
      { id: 'lswrc-1', input: ['abcabcbb'], expectedOutput: 3 },
      { id: 'lswrc-2', input: ['bbbbb'], expectedOutput: 1 },
      { id: 'lswrc-3', input: ['pwwkew'], expectedOutput: 3 }
    ],
    hiddenTestCases: [
      { id: 'lswrc-h1', input: [' '], expectedOutput: 1, isHidden: true },
      { id: 'lswrc-h2', input: ['au'], expectedOutput: 2, isHidden: true },
      { id: 'lswrc-h3', input: ['dvdf'], expectedOutput: 3, isHidden: true }
    ],
    hints: [
      'Use a sliding window [left, right] and a set to check duplicate characters in O(1).'
    ],
    solutionExplanation: `Use a sliding window \`[left, right]\`. If \`s[right]\` is already inside the current window, contract from \`left\` until \`s[right]\` is removed. Record max window length.

- **Time Complexity:** O(n)
- **Space Complexity:** O(min(m, n))`,
    timeLimitMs: 2000,
    memoryLimitMb: 128,
    acceptanceRate: 34.5,
    totalSubmissions: 290000,
    acceptedSubmissions: 100050
  },
  {
    id: 'p-longest-repeating-character-replacement',
    slug: 'longest-repeating-character-replacement',
    title: 'Longest Repeating Character Replacement',
    difficulty: 'Medium',
    category: 'Sliding Window',
    tags: ['Hash Table', 'String', 'Sliding Window'],
    functionName: 'characterReplacement',
    paramNames: ['s', 'k'],
    description: `You are given a string \`s\` and an integer \`k\`. You can choose any character of the string and change it to any other uppercase English character. You can perform this operation at most \`k\` times.

Return *the length of the longest substring containing the same letter you can get after performing the above operations*.

### Example 1:
\`\`\`
Input: s = "ABAB", k = 2
Output: 4
Explanation: Replace the two 'A's with two 'B's or vice versa.
\`\`\`

### Example 2:
\`\`\`
Input: s = "AABABBA", k = 1
Output: 4
Explanation: Replace the one 'A' in the middle with 'B' and form "AABBBBA".
The substring "BBBB" has the longest repeating letters, which is 4.
\`\`\`

### Constraints:
- \`1 <= s.length <= 10^5\`
- \`s\` consists of only uppercase English letters.
- \`0 <= k <= s.length\`
`,
    starterCode: {
      javascript: `/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
function characterReplacement(s, k) {
  const count = {};
  let maxCount = 0;
  let left = 0;
  let maxLen = 0;

  for (let right = 0; right < s.length; right++) {
    count[s[right]] = (count[s[right]] || 0) + 1;
    maxCount = Math.max(maxCount, count[s[right]]);

    while ((right - left + 1) - maxCount > k) {
      count[s[left]]--;
      left++;
    }
    maxLen = Math.max(maxLen, right - left + 1);
  }
  return maxLen;
}`,
      python: `class Solution:
    def characterReplacement(self, s: str, k: int) -> int:
        count = {}
        max_count = 0
        left = 0
        max_len = 0
        for right in range(len(s)):
            count[s[right]] = count.get(s[right], 0) + 1
            max_count = max(max_count, count[s[right]])
            while (right - left + 1) - max_count > k:
                count[s[left]] -= 1
                left += 1
            max_len = max(max_len, right - left + 1)
        return max_len`,
      cpp: `#include <string>
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int characterReplacement(string s, int k) {
        vector<int> count(26, 0);
        int maxCount = 0, left = 0, maxLen = 0;
        for (int right = 0; right < s.length(); right++) {
            count[s[right] - 'A']++;
            maxCount = max(maxCount, count[s[right] - 'A']);
            while ((right - left + 1) - maxCount > k) {
                count[s[left] - 'A']--;
                left++;
            }
            maxLen = max(maxLen, right - left + 1);
        }
        return maxLen;
    }
};`,
      java: `class Solution {
    public int characterReplacement(String s, int k) {
        int[] count = new int[26];
        int maxCount = 0, left = 0, maxLen = 0;
        for (int right = 0; right < s.length(); right++) {
            count[s.charAt(right) - 'A']++;
            maxCount = Math.max(maxCount, count[s.charAt(right) - 'A']);
            while ((right - left + 1) - maxCount > k) {
                count[s.charAt(left) - 'A']--;
                left++;
            }
            maxLen = Math.max(maxLen, right - left + 1);
        }
        return maxLen;
    }
}`
    },
    sampleTestCases: [
      { id: 'lrcr-1', input: ['ABAB', 2], expectedOutput: 4 },
      { id: 'lrcr-2', input: ['AABABBA', 1], expectedOutput: 4 }
    ],
    hiddenTestCases: [
      { id: 'lrcr-h1', input: ['AAAA', 2], expectedOutput: 4, isHidden: true },
      { id: 'lrcr-h2', input: ['ABBB', 2], expectedOutput: 4, isHidden: true }
    ],
    hints: [
      'A window is valid if `window_length - max_character_frequency <= k`.'
    ],
    solutionExplanation: `For a window \`[left, right]\`, the number of replacements needed to make all characters identical is \`window_length - max_frequency\`. If this exceeds \`k\`, shrink from the left.

- **Time Complexity:** O(n)
- **Space Complexity:** O(26) = O(1)`,
    timeLimitMs: 2000,
    memoryLimitMb: 128,
    acceptanceRate: 53.6,
    totalSubmissions: 175000,
    acceptedSubmissions: 93800
  },
  {
    id: 'p-permutation-in-string',
    slug: 'permutation-in-string',
    title: 'Permutation in String',
    difficulty: 'Medium',
    category: 'Sliding Window',
    tags: ['Hash Table', 'Two Pointers', 'String', 'Sliding Window'],
    functionName: 'checkInclusion',
    paramNames: ['s1', 's2'],
    description: `Given two strings \`s1\` and \`s2\`, return \`true\` if \`s2\` contains a permutation of \`s1\`, or \`false\` otherwise.

In other words, return \`true\` if one of \`s1\`'s permutations is the substring of \`s2\`.

### Example 1:
\`\`\`
Input: s1 = "ab", s2 = "eidbaooo"
Output: true
Explanation: s2 contains one permutation of s1 ("ba").
\`\`\`

### Example 2:
\`\`\`
Input: s1 = "ab", s2 = "eidboaoo"
Output: false
\`\`\`

### Constraints:
- \`1 <= s1.length, s2.length <= 10^4\`
- \`s1\` and \`s2\` consist of lowercase English letters.
`,
    starterCode: {
      javascript: `/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
function checkInclusion(s1, s2) {
  if (s1.length > s2.length) return false;
  const c1 = new Array(26).fill(0);
  const c2 = new Array(26).fill(0);

  for (let i = 0; i < s1.length; i++) {
    c1[s1.charCodeAt(i) - 97]++;
    c2[s2.charCodeAt(i) - 97]++;
  }

  function matches() {
    for (let i = 0; i < 26; i++) {
      if (c1[i] !== c2[i]) return false;
    }
    return true;
  }

  for (let i = 0; i < s2.length - s1.length; i++) {
    if (matches()) return true;
    c2[s2.charCodeAt(i + s1.length) - 97]++;
    c2[s2.charCodeAt(i) - 97]--;
  }

  return matches();
}`,
      python: `class Solution:
    def checkInclusion(self, s1: str, s2: str) -> bool:
        if len(s1) > len(s2):
            return False
        c1 = [0] * 26
        c2 = [0] * 26
        for i in range(len(s1)):
            c1[ord(s1[i]) - ord('a')] += 1
            c2[ord(s2[i]) - ord('a')] += 1

        matches = sum(1 for i in range(26) if c1[i] == c2[i])

        for i in range(len(s2) - len(s1)):
            if matches == 26:
                return True
            r = ord(s2[i + len(s1)]) - ord('a')
            l = ord(s2[i]) - ord('a')

            c2[r] += 1
            if c2[r] == c1[r]:
                matches += 1
            elif c2[r] == c1[r] + 1:
                matches -= 1

            c2[l] -= 1
            if c2[l] == c1[l]:
                matches += 1
            elif c2[l] == c1[l] - 1:
                matches -= 1

        return matches == 26`,
      cpp: `#include <string>
#include <vector>
using namespace std;

class Solution {
public:
    bool checkInclusion(string s1, string s2) {
        if (s1.length() > s2.length()) return false;
        vector<int> c1(26, 0), c2(26, 0);
        for (int i = 0; i < s1.length(); i++) {
            c1[s1[i] - 'a']++;
            c2[s2[i] - 'a']++;
        }
        for (int i = 0; i < s2.length() - s1.length(); i++) {
            if (c1 == c2) return true;
            c2[s2[i + s1.length()] - 'a']++;
            c2[s2[i] - 'a']--;
        }
        return c1 == c2;
    }
};`,
      java: `class Solution {
    public boolean checkInclusion(String s1, String s2) {
        if (s1.length() > s2.length()) return false;
        int[] c1 = new int[26], c2 = new int[26];
        for (int i = 0; i < s1.length(); i++) {
            c1[s1.charAt(i) - 'a']++;
            c2[s2.charAt(i) - 'a']++;
        }
        for (int i = 0; i < s2.length() - s1.length(); i++) {
            if (java.util.Arrays.equals(c1, c2)) return true;
            c2[s2.charAt(i + s1.length()) - 'a']++;
            c2[s2.charAt(i) - 'a']--;
        }
        return java.util.Arrays.equals(c1, c2);
    }
}`
    },
    sampleTestCases: [
      { id: 'pis-1', input: ['ab', 'eidbaooo'], expectedOutput: true },
      { id: 'pis-2', input: ['ab', 'eidboaoo'], expectedOutput: false }
    ],
    hiddenTestCases: [
      { id: 'pis-h1', input: ['adc', 'dcda'], expectedOutput: true, isHidden: true },
      { id: 'pis-h2', input: ['hello', 'ooolleoooleh'], expectedOutput: false, isHidden: true }
    ],
    hints: [
      'A fixed-size sliding window of length len(s1) can compare character counts in O(26) = O(1).'
    ],
    solutionExplanation: `Maintain a fixed-size window of length \`len(s1)\` sliding across \`s2\`. At each slide, add the incoming character and remove the outgoing character, then compare character frequencies.

- **Time Complexity:** O(n)
- **Space Complexity:** O(1)`,
    timeLimitMs: 2000,
    memoryLimitMb: 128,
    acceptanceRate: 44.5,
    totalSubmissions: 160000,
    acceptedSubmissions: 71200
  },
  {
    id: 'p-minimum-window-substring',
    slug: 'minimum-window-substring',
    title: 'Minimum Window Substring',
    difficulty: 'Hard',
    category: 'Sliding Window',
    tags: ['Hash Table', 'String', 'Sliding Window'],
    functionName: 'minWindow',
    paramNames: ['s', 't'],
    description: `Given two strings \`s\` and \`t\` of lengths \`m\` and \`n\` respectively, return *the **minimum window substring** of* \`s\` *such that every character in* \`t\` *(**including duplicates**) is included in the window*. If there is no such substring, return the empty string \`""\`.

### Example 1:
\`\`\`
Input: s = "ADOBECODEBANC", t = "ABC"
Output: "BANC"
Explanation: The minimum window substring "BANC" includes 'A', 'B', and 'C' from string t.
\`\`\`

### Example 2:
\`\`\`
Input: s = "a", t = "a"
Output: "a"
\`\`\`

### Example 3:
\`\`\`
Input: s = "a", t = "aa"
Output: ""
Explanation: Both 'a's from t must be included in the window.
Since the largest window of s only has one 'a', return empty string.
\`\`\`

### Constraints:
- \`m == s.length\`
- \`n == t.length\`
- \`1 <= m, n <= 10^5\`
- \`s\` and \`t\` consist of uppercase and lowercase English letters.
`,
    starterCode: {
      javascript: `/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
function minWindow(s, t) {
  if (t.length > s.length) return "";
  const need = {};
  for (const c of t) need[c] = (need[c] || 0) + 1;

  let required = Object.keys(need).length;
  let formed = 0;
  const windowCounts = {};

  let ans = [-1, 0, 0]; // [len, left, right]
  let left = 0;

  for (let right = 0; right < s.length; right++) {
    const c = s[right];
    windowCounts[c] = (windowCounts[c] || 0) + 1;

    if (need[c] && windowCounts[c] === need[c]) {
      formed++;
    }

    while (left <= right && formed === required) {
      if (ans[0] === -1 || (right - left + 1) < ans[0]) {
        ans = [right - left + 1, left, right];
      }
      const charLeft = s[left];
      windowCounts[charLeft]--;
      if (need[charLeft] && windowCounts[charLeft] < need[charLeft]) {
        formed--;
      }
      left++;
    }
  }

  return ans[0] === -1 ? "" : s.substring(ans[1], ans[2] + 1);
}`,
      python: `from collections import Counter

class Solution:
    def minWindow(self, s: str, t: str) -> str:
        if not t or not s:
            return ""
        need = Counter(t)
        required = len(need)
        window = {}
        formed = 0
        ans = float("inf"), None, None
        left = 0

        for right in range(len(s)):
            c = s[right]
            window[c] = window.get(c, 0) + 1
            if c in need and window[c] == need[c]:
                formed += 1

            while left <= right and formed == required:
                if (right - left + 1) < ans[0]:
                    ans = (right - left + 1, left, right)
                char_left = s[left]
                window[char_left] -= 1
                if char_left in need and window[char_left] < need[char_left]:
                    formed -= 1
                left += 1

        return "" if ans[0] == float("inf") else s[ans[1] : ans[2] + 1]`,
      cpp: `#include <string>
#include <unordered_map>
#include <climits>
using namespace std;

class Solution {
public:
    string minWindow(string s, string t) {
        if (s.empty() || t.empty()) return "";
        unordered_map<char, int> need;
        for (char c : t) need[c]++;

        int required = need.size();
        int formed = 0;
        unordered_map<char, int> window;
        int minLen = INT_MAX, bestLeft = 0;
        int left = 0;

        for (int right = 0; right < s.length(); right++) {
            char c = s[right];
            window[c]++;
            if (need.count(c) && window[c] == need[c]) {
                formed++;
            }

            while (left <= right && formed == required) {
                if (right - left + 1 < minLen) {
                    minLen = right - left + 1;
                    bestLeft = left;
                }
                char cl = s[left];
                window[cl]--;
                if (need.count(cl) && window[cl] < need[cl]) {
                    formed--;
                }
                left++;
            }
        }

        return minLen == INT_MAX ? "" : s.substr(bestLeft, minLen);
    }
};`,
      java: `import java.util.*;

class Solution {
    public String minWindow(String s, String t) {
        if (s.length() == 0 || t.length() == 0) return "";
        Map<Character, Integer> need = new HashMap<>();
        for (char c : t.toCharArray()) need.put(c, need.getOrDefault(c, 0) + 1);

        int required = need.size();
        int formed = 0;
        Map<Character, Integer> window = new HashMap<>();
        int minLen = Integer.MAX_VALUE, bestLeft = 0;
        int left = 0;

        for (int right = 0; right < s.length(); right++) {
            char c = s.charAt(right);
            window.put(c, window.getOrDefault(c, 0) + 1);
            if (need.containsKey(c) && window.get(c).intValue() == need.get(c).intValue()) {
                formed++;
            }

            while (left <= right && formed == required) {
                if (right - left + 1 < minLen) {
                    minLen = right - left + 1;
                    bestLeft = left;
                }
                char cl = s.charAt(left);
                window.put(cl, window.get(cl) - 1);
                if (need.containsKey(cl) && window.get(cl).intValue() < need.get(cl).intValue()) {
                    formed--;
                }
                left++;
            }
        }

        return minLen == Integer.MAX_VALUE ? "" : s.substring(bestLeft, bestLeft + minLen);
    }
}`
    },
    sampleTestCases: [
      { id: 'mws-1', input: ['ADOBECODEBANC', 'ABC'], expectedOutput: 'BANC' },
      { id: 'mws-2', input: ['a', 'a'], expectedOutput: 'a' },
      { id: 'mws-3', input: ['a', 'aa'], expectedOutput: '' }
    ],
    hiddenTestCases: [
      { id: 'mws-h1', input: ['ab', 'b'], expectedOutput: 'b', isHidden: true },
      { id: 'mws-h2', input: ['cabwefgewcwaefgcf', 'cae'], expectedOutput: 'cwae', isHidden: true }
    ],
    hints: [
      'Expand the window to the right until all characters of t are satisfied, then contract from the left to find the minimal window.'
    ],
    solutionExplanation: `Use a two-pointer sliding window. Expand \`right\` until all required character counts are met, then contract \`left\` as much as possible while maintaining the invariant to find the minimum length.

- **Time Complexity:** O(m + n)
- **Space Complexity:** O(m + n)`,
    timeLimitMs: 2500,
    memoryLimitMb: 128,
    acceptanceRate: 41.8,
    totalSubmissions: 190000,
    acceptedSubmissions: 79420
  }
];
