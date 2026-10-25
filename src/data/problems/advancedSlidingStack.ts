import { Problem } from '../../types';

export const ADVANCED_SLIDING_STACK_PROBLEMS: Problem[] = [
  {
    id: 'p-maximum-average-subarray-i',
    slug: 'maximum-average-subarray-i',
    title: 'Maximum Average Subarray I',
    difficulty: 'Easy',
    category: 'Sliding Window',
    tags: ['Array', 'Sliding Window'],
    functionName: 'findMaxAverage',
    paramNames: ['nums', 'k'],
    description: `You are given an integer array \`nums\` consisting of \`n\` elements, and an integer \`k\`.

Find a contiguous subarray whose **length is equal to** \`k\` that has the maximum average value and return *this value*. Any answer with a calculation error less than \`10^-5\` will be accepted.

### Example 1:
\`\`\`
Input: nums = [1,12,-5,-6,50,3], k = 4
Output: 12.75000
Explanation: Maximum average is (12 - 5 - 6 + 50) / 4 = 51 / 4 = 12.75
\`\`\`

### Example 2:
\`\`\`
Input: nums = [5], k = 1
Output: 5.00000
\`\`\`

### Constraints:
- \`n == nums.length\`
- \`1 <= k <= n <= 10^5\`
- \`-10^4 <= nums[i] <= 10^4\`
`,
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
function findMaxAverage(nums, k) {
  let sum = 0;
  for (let i = 0; i < k; i++) sum += nums[i];
  let maxSum = sum;

  for (let i = k; i < nums.length; i++) {
    sum += nums[i] - nums[i - k];
    if (sum > maxSum) maxSum = sum;
  }
  return maxSum / k;
}`,
      python: `class Solution:
    def findMaxAverage(self, nums: list[int], k: int) -> float:
        curr_sum = sum(nums[:k])
        max_sum = curr_sum
        for i in range(k, len(nums)):
            curr_sum += nums[i] - nums[i - k]
            if curr_sum > max_sum:
                max_sum = curr_sum
        return max_sum / k`,
      cpp: `#include <vector>
#include <numeric>
#include <algorithm>
using namespace std;

class Solution {
public:
    double findMaxAverage(vector<int>& nums, int k) {
        double sum = 0;
        for (int i = 0; i < k; i++) sum += nums[i];
        double maxSum = sum;
        for (size_t i = k; i < nums.size(); i++) {
            sum += nums[i] - nums[i - k];
            maxSum = max(maxSum, sum);
        }
        return maxSum / k;
    }
};`,
      java: `class Solution {
    public double findMaxAverage(int[] nums, int k) {
        double sum = 0;
        for (int i = 0; i < k; i++) sum += nums[i];
        double maxSum = sum;
        for (int i = k; i < nums.length; i++) {
            sum += nums[i] - nums[i - k];
            maxSum = Math.max(maxSum, sum);
        }
        return maxSum / k;
    }
}`
    },
    sampleTestCases: [
      { id: 'mas-1', input: [[1, 12, -5, -6, 50, 3], 4], expectedOutput: 12.75 },
      { id: 'mas-2', input: [[5], 1], expectedOutput: 5 }
    ],
    hiddenTestCases: [
      { id: 'mas-h1', input: [[0, 4, 0, 3, 2], 1], expectedOutput: 4, isHidden: true }
    ],
    hints: [
      'Fixed-size sliding window of length k.'
    ],
    solutionExplanation: `Calculate sum of first k elements. Then slide window by adding incoming \`nums[i]\` and subtracting outgoing \`nums[i - k]\`. Return \`maxSum / k\`.

- **Time Complexity:** O(n)
- **Space Complexity:** O(1)`,
    timeLimitMs: 2000,
    memoryLimitMb: 128,
    acceptanceRate: 44.2,
    totalSubmissions: 220000,
    acceptedSubmissions: 97240
  },
  {
    id: 'p-minimum-size-subarray-sum',
    slug: 'minimum-size-subarray-sum',
    title: 'Minimum Size Subarray Sum',
    difficulty: 'Medium',
    category: 'Sliding Window',
    tags: ['Array', 'Binary Search', 'Sliding Window', 'Prefix Sum'],
    functionName: 'minSubArrayLen',
    paramNames: ['target', 'nums'],
    description: `Given an array of positive integers \`nums\` and a positive integer \`target\`, return *the **minimal length** of a subarray whose sum is greater than or equal to* \`target\`. If there is no such subarray, return \`0\` instead.

### Example 1:
\`\`\`
Input: target = 7, nums = [2,3,1,2,4,3]
Output: 2
Explanation: The subarray [4,3] has the minimal length under the problem constraint.
\`\`\`

### Example 2:
\`\`\`
Input: target = 4, nums = [1,4,4]
Output: 1
\`\`\`

### Example 3:
\`\`\`
Input: target = 11, nums = [1,1,1,1,1,1,1,1]
Output: 0
\`\`\`

### Constraints:
- \`1 <= target <= 10^9\`
- \`1 <= nums.length <= 10^5\`
- \`1 <= nums[i] <= 10^4\`
`,
    starterCode: {
      javascript: `/**
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
function minSubArrayLen(target, nums) {
  let left = 0, sum = 0;
  let minLen = Infinity;

  for (let right = 0; right < nums.length; right++) {
    sum += nums[right];
    while (sum >= target) {
      minLen = Math.min(minLen, right - left + 1);
      sum -= nums[left];
      left++;
    }
  }
  return minLen === Infinity ? 0 : minLen;
}`,
      python: `class Solution:
    def minSubArrayLen(self, target: int, nums: list[int]) -> int:
        left, total = 0, 0
        min_len = float('inf')
        for right in range(len(nums)):
            total += nums[right]
            while total >= target:
                min_len = min(min_len, right - left + 1)
                total -= nums[left]
                left += 1
        return 0 if min_len == float('inf') else min_len`,
      cpp: `#include <vector>
#include <algorithm>
#include <climits>
using namespace std;

class Solution {
public:
    int minSubArrayLen(int target, vector<int>& nums) {
        int left = 0, sum = 0, minLen = INT_MAX;
        for (int right = 0; right < nums.size(); right++) {
            sum += nums[right];
            while (sum >= target) {
                minLen = min(minLen, right - left + 1);
                sum -= nums[left];
                left++;
            }
        }
        return minLen == INT_MAX ? 0 : minLen;
    }
};`,
      java: `class Solution {
    public int minSubArrayLen(int target, int[] nums) {
        int left = 0, sum = 0, minLen = Integer.MAX_VALUE;
        for (int right = 0; right < nums.length; right++) {
            sum += nums[right];
            while (sum >= target) {
                minLen = Math.min(minLen, right - left + 1);
                sum -= nums[left];
                left++;
            }
        }
        return minLen == Integer.MAX_VALUE ? 0 : minLen;
    }
}`
    },
    sampleTestCases: [
      { id: 'msss-1', input: [7, [2, 3, 1, 2, 4, 3]], expectedOutput: 2 },
      { id: 'msss-2', input: [4, [1, 4, 4]], expectedOutput: 1 },
      { id: 'msss-3', input: [11, [1, 1, 1, 1, 1, 1, 1, 1]], expectedOutput: 0 }
    ],
    hiddenTestCases: [
      { id: 'msss-h1', input: [6, [10, 2, 3]], expectedOutput: 1, isHidden: true }
    ],
    hints: [
      'Expand right until sum >= target, then contract left to minimize window size.'
    ],
    solutionExplanation: `Dynamic sliding window: Add elements at \`right\`. While the window sum satisfies \`sum >= target\`, record \`minLen\` and contract window from \`left\`.

- **Time Complexity:** O(n)
- **Space Complexity:** O(1)`,
    timeLimitMs: 2000,
    memoryLimitMb: 128,
    acceptanceRate: 46.5,
    totalSubmissions: 200000,
    acceptedSubmissions: 93000
  },
  {
    id: 'p-simplify-path',
    slug: 'simplify-path',
    title: 'Simplify Path',
    difficulty: 'Medium',
    category: 'Stack',
    tags: ['String', 'Stack'],
    functionName: 'simplifyPath',
    paramNames: ['path'],
    description: `Given an absolute path for a Unix-style file system, which begins with a slash \`'/'\`, transform this path to its **simplified canonical path**.

In Unix-style file system:
- A single period \`'.'\` refers to the current directory.
- A double period \`'..'\` refers to the directory up a level.
- Multiple consecutive slashes, such as \`'//'\` and \`'///'\`, are treated as a single slash \`'/'\`.

Return *the simplified canonical path*.

### Example 1:
\`\`\`
Input: path = "/home/"
Output: "/home"
\`\`\`

### Example 2:
\`\`\`
Input: path = "/home//foo/"
Output: "/home/foo"
\`\`\`

### Example 3:
\`\`\`
Input: path = "/home/user/Documents/../Pictures"
Output: "/home/user/Pictures"
\`\`\`

### Constraints:
- \`1 <= path.length <= 3000\`
- \`path\` consists of English letters, digits, period \`'.'\`, slash \`'/'\` or \`'_'\`.
- \`path\` is a valid absolute Unix path.
`,
    starterCode: {
      javascript: `/**
 * @param {string} path
 * @return {string}
 */
function simplifyPath(path) {
  const parts = path.split('/');
  const stack = [];
  for (const p of parts) {
    if (p === '' || p === '.') continue;
    if (p === '..') {
      if (stack.length > 0) stack.pop();
    } else {
      stack.push(p);
    }
  }
  return '/' + stack.join('/');
}`,
      python: `class Solution:
    def simplifyPath(self, path: str) -> str:
        parts = path.split('/')
        stack = []
        for p in parts:
            if not p or p == '.':
                continue
            if p == '..':
                if stack:
                    stack.pop()
            else:
                stack.append(p)
        return '/' + '/'.join(stack)`,
      cpp: `#include <string>
#include <vector>
#include <sstream>
using namespace std;

class Solution {
public:
    string simplifyPath(string path) {
        stringstream ss(path);
        string token;
        vector<string> stack;
        while (getline(ss, token, '/')) {
            if (token.empty() || token == ".") continue;
            if (token == "..") {
                if (!stack.empty()) stack.pop_back();
            } else {
                stack.push_back(token);
            }
        }
        string res = "";
        for (const string& dir : stack) res += "/" + dir;
        return res.empty() ? "/" : res;
    }
};`,
      java: `import java.util.*;

class Solution {
    public String simplifyPath(String path) {
        String[] parts = path.split("/");
        Stack<String> stack = new Stack<>();
        for (String p : parts) {
            if (p.isEmpty() || p.equals(".")) continue;
            if (p.equals("..")) {
                if (!stack.isEmpty()) stack.pop();
            } else {
                stack.push(p);
            }
        }
        return "/" + String.join("/", stack);
    }
}`
    },
    sampleTestCases: [
      { id: 'sp-1', input: ['/home/'], expectedOutput: '/home' },
      { id: 'sp-2', input: ['/home//foo/'], expectedOutput: '/home/foo' },
      { id: 'sp-3', input: ['/home/user/Documents/../Pictures'], expectedOutput: '/home/user/Pictures' }
    ],
    hiddenTestCases: [
      { id: 'sp-h1', input: ['/../'], expectedOutput: '/', isHidden: true },
      { id: 'sp-h2', input: ['/.../a/../b/c/../d/./'], expectedOutput: '/.../b/d', isHidden: true }
    ],
    hints: [
      'Split by slash. Push valid folder names to a stack; pop on `..`.'
    ],
    solutionExplanation: `Split path on \`'/'\`. Ignore empty segments and \`'.'\`. Pop the last directory from stack on \`'..'\`. Join the stack with slashes.

- **Time Complexity:** O(n)
- **Space Complexity:** O(n)`,
    timeLimitMs: 2000,
    memoryLimitMb: 128,
    acceptanceRate: 41.2,
    totalSubmissions: 200000,
    acceptedSubmissions: 82400
  },
  {
    id: 'p-remove-all-adjacent-duplicates-in-string',
    slug: 'remove-all-adjacent-duplicates-in-string',
    title: 'Remove All Adjacent Duplicates In String',
    difficulty: 'Easy',
    category: 'Stack',
    tags: ['String', 'Stack'],
    functionName: 'removeDuplicates',
    paramNames: ['s'],
    description: `You are given a string \`s\` consisting of lowercase English letters. A **duplicate removal** consists of choosing two **adjacent** and **equal** letters and removing them.

We repeatedly make **duplicate removals** on \`s\` until we no longer can.

Return *the final string after all such duplicate removals have been made*. It can be proven that the answer is **unique**.

### Example 1:
\`\`\`
Input: s = "abbaca"
Output: "ca"
Explanation: 
For example, in "abbaca" we could remove "bb" since the letters are adjacent and equal, and this is the only possible move.  The result of this move is "aaca", of which only "aa" is possible, so the final string is "ca".
\`\`\`

### Example 2:
\`\`\`
Input: s = "azxxzy"
Output: "ay"
\`\`\`

### Constraints:
- \`1 <= s.length <= 10^5\`
- \`s\` consists of lowercase English letters.
`,
    starterCode: {
      javascript: `/**
 * @param {string} s
 * @return {string}
 */
function removeDuplicates(s) {
  const stack = [];
  for (const c of s) {
    if (stack.length > 0 && stack[stack.length - 1] === c) {
      stack.pop();
    } else {
      stack.push(c);
    }
  }
  return stack.join('');
}`,
      python: `class Solution:
    def removeDuplicates(self, s: str) -> str:
        stack = []
        for c in s:
            if stack and stack[-1] == c:
                stack.pop()
            else:
                stack.append(c)
        return ''.join(stack)`,
      cpp: `#include <string>
using namespace std;

class Solution {
public:
    string removeDuplicates(string s) {
        string res = "";
        for (char c : s) {
            if (!res.empty() && res.back() == c) {
                res.pop_back();
            } else {
                res.push_back(c);
            }
        }
        return res;
    }
};`,
      java: `class Solution {
    public String removeDuplicates(String s) {
        StringBuilder sb = new StringBuilder();
        for (char c : s.toCharArray()) {
            int len = sb.length();
            if (len > 0 && sb.charAt(len - 1) == c) {
                sb.deleteCharAt(len - 1);
            } else {
                sb.append(c);
            }
        }
        return sb.toString();
    }
}`
    },
    sampleTestCases: [
      { id: 'rad-1', input: ['abbaca'], expectedOutput: 'ca' },
      { id: 'rad-2', input: ['azxxzy'], expectedOutput: 'ay' }
    ],
    hiddenTestCases: [
      { id: 'rad-h1', input: ['a'], expectedOutput: 'a', isHidden: true },
      { id: 'rad-h2', input: ['aaaaaaaa'], expectedOutput: '', isHidden: true }
    ],
    hints: [
      'A stack lets you eliminate adjacent duplicates as you process the string from left to right.'
    ],
    solutionExplanation: `Process each character. If the top of the stack matches the current character, pop the top element (annihilating the pair). Otherwise, push the character.

- **Time Complexity:** O(n)
- **Space Complexity:** O(n)`,
    timeLimitMs: 2000,
    memoryLimitMb: 128,
    acceptanceRate: 72.8,
    totalSubmissions: 250000,
    acceptedSubmissions: 182000
  }
];
