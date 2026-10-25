import { Problem } from '../../types';

export const ADVANCED_TWO_POINTERS_PROBLEMS: Problem[] = [
  {
    id: 'p-squares-of-a-sorted-array',
    slug: 'squares-of-a-sorted-array',
    title: 'Squares of a Sorted Array',
    difficulty: 'Easy',
    category: 'Two Pointers',
    tags: ['Array', 'Two Pointers', 'Sorting'],
    functionName: 'sortedSquares',
    paramNames: ['nums'],
    description: `Given an integer array \`nums\` sorted in **non-decreasing** order, return *an array of **the squares of each number** sorted in non-decreasing order*.

### Example 1:
\`\`\`
Input: nums = [-4,-1,0,3,10]
Output: [0,1,9,16,100]
Explanation: After squaring, the array becomes [16,1,0,9,100].
After sorting, it becomes [0,1,9,16,100].
\`\`\`

### Example 2:
\`\`\`
Input: nums = [-7,-3,2,3,11]
Output: [4,9,9,49,121]
\`\`\`

### Constraints:
- \`1 <= nums.length <= 10^4\`
- \`-10^4 <= nums[i] <= 10^4\`
- \`nums\` is sorted in **non-decreasing** order.
`,
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @return {number[]}
 */
function sortedSquares(nums) {
  const n = nums.length;
  const res = new Array(n);
  let left = 0, right = n - 1;
  let pos = n - 1;

  while (left <= right) {
    const lsq = nums[left] * nums[left];
    const rsq = nums[right] * nums[right];
    if (lsq > rsq) {
      res[pos] = lsq;
      left++;
    } else {
      res[pos] = rsq;
      right--;
    }
    pos--;
  }
  return res;
}`,
      python: `class Solution:
    def sortedSquares(self, nums: list[int]) -> list[int]:
        n = len(nums)
        res = [0] * n
        l, r = 0, n - 1
        pos = n - 1
        while l <= r:
            lsq = nums[l] ** 2
            rsq = nums[r] ** 2
            if lsq > rsq:
                res[pos] = lsq
                l += 1
            else:
                res[pos] = rsq
                r -= 1
            pos -= 1
        return res`,
      cpp: `#include <vector>
using namespace std;

class Solution {
public:
    vector<int> sortedSquares(vector<int>& nums) {
        int n = nums.size();
        vector<int> res(n);
        int l = 0, r = n - 1, pos = n - 1;
        while (l <= r) {
            int lsq = nums[l] * nums[l];
            int rsq = nums[r] * nums[r];
            if (lsq > rsq) {
                res[pos] = lsq;
                l++;
            } else {
                res[pos] = rsq;
                r--;
            }
            pos--;
        }
        return res;
    }
};`,
      java: `class Solution {
    public int[] sortedSquares(int[] nums) {
        int n = nums.length;
        int[] res = new int[n];
        int l = 0, r = n - 1, pos = n - 1;
        while (l <= r) {
            int lsq = nums[l] * nums[l];
            int rsq = nums[r] * nums[r];
            if (lsq > rsq) {
                res[pos] = lsq;
                l++;
            } else {
                res[pos] = rsq;
                r--;
            }
            pos--;
        }
        return res;
    }
}`
    },
    sampleTestCases: [
      { id: 'ssa-1', input: [[-4, -1, 0, 3, 10]], expectedOutput: [0, 1, 9, 16, 100] },
      { id: 'ssa-2', input: [[-7, -3, 2, 3, 11]], expectedOutput: [4, 9, 9, 49, 121] }
    ],
    hiddenTestCases: [
      { id: 'ssa-h1', input: [[-1]], expectedOutput: [1], isHidden: true }
    ],
    hints: [
      'The largest squares must be at either the extreme left (negative) or extreme right (positive).'
    ],
    solutionExplanation: `Two pointers at both ends. Compare \`nums[left]²\` and \`nums[right]²\`, fill the result array from back to front.

- **Time Complexity:** O(n)
- **Space Complexity:** O(1) auxiliary space (excluding output array)`,
    timeLimitMs: 2000,
    memoryLimitMb: 128,
    acceptanceRate: 72.4,
    totalSubmissions: 260000,
    acceptedSubmissions: 188240
  },
  {
    id: 'p-reverse-string',
    slug: 'reverse-string',
    title: 'Reverse String',
    difficulty: 'Easy',
    category: 'Two Pointers',
    tags: ['Two Pointers', 'String'],
    functionName: 'reverseString',
    paramNames: ['s'],
    description: `Write a function that reverses a string. The input string is given as an array of characters \`s\`.

You must do this by modifying the input array **in-place** with \`O(1)\` extra memory.

### Example 1:
\`\`\`
Input: s = ["h","e","l","l","o"]
Output: ["o","l","l","e","h"]
\`\`\`

### Example 2:
\`\`\`
Input: s = ["H","a","n","n","a","h"]
Output: ["h","a","n","n","a","H"]
\`\`\`

### Constraints:
- \`1 <= s.length <= 10^5\`
- \`s[i]\` is a printable ascii character.
`,
    starterCode: {
      javascript: `/**
 * @param {character[]} s
 * @return {character[]}
 */
function reverseString(s) {
  let left = 0, right = s.length - 1;
  while (left < right) {
    const temp = s[left];
    s[left] = s[right];
    s[right] = temp;
    left++;
    right--;
  }
  return s;
}`,
      python: `class Solution:
    def reverseString(self, s: list[str]) -> list[str]:
        left, right = 0, len(s) - 1
        while left < right:
            s[left], s[right] = s[right], s[left]
            left += 1
            right -= 1
        return s`,
      cpp: `#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    vector<char> reverseString(vector<char>& s) {
        int left = 0, right = s.size() - 1;
        while (left < right) {
            swap(s[left], s[right]);
            left++;
            right--;
        }
        return s;
    }
};`,
      java: `class Solution {
    public char[] reverseString(char[] s) {
        int left = 0, right = s.length - 1;
        while (left < right) {
            char temp = s[left];
            s[left] = s[right];
            s[right] = temp;
            left++;
            right--;
        }
        return s;
    }
}`
    },
    sampleTestCases: [
      { id: 'rs-1', input: [['h', 'e', 'l', 'l', 'o']], expectedOutput: ['o', 'l', 'l', 'e', 'h'] },
      { id: 'rs-2', input: [['H', 'a', 'n', 'n', 'a', 'h']], expectedOutput: ['h', 'a', 'n', 'n', 'a', 'H'] }
    ],
    hiddenTestCases: [
      { id: 'rs-h1', input: [['A']], expectedOutput: ['A'], isHidden: true }
    ],
    hints: [
      'Two pointers swapping opposite characters until they meet.'
    ],
    solutionExplanation: `Standard two-pointer in-place reversal: Swap \`s[left]\` and \`s[right]\`, increment \`left\`, decrement \`right\`.

- **Time Complexity:** O(n)
- **Space Complexity:** O(1)`,
    timeLimitMs: 2000,
    memoryLimitMb: 128,
    acceptanceRate: 77.8,
    totalSubmissions: 310000,
    acceptedSubmissions: 241180
  },
  {
    id: 'p-backspace-string-compare',
    slug: 'backspace-string-compare',
    title: 'Backspace String Compare',
    difficulty: 'Easy',
    category: 'Two Pointers',
    tags: ['Two Pointers', 'String', 'Stack', 'Simulation'],
    functionName: 'backspaceCompare',
    paramNames: ['s', 't'],
    description: `Given two strings \`s\` and \`t\`, return \`true\` *if they are equal when both are typed into empty text editors*. \`'#'\` means a backspace character.

Note that after backspacing an empty text, the text will continue empty.

### Example 1:
\`\`\`
Input: s = "ab#c", t = "ad#c"
Output: true
Explanation: Both s and t become "ac".
\`\`\`

### Example 2:
\`\`\`
Input: s = "ab##", t = "c#d#"
Output: true
Explanation: Both s and t become "".
\`\`\`

### Example 3:
\`\`\`
Input: s = "a#c", t = "b"
Output: false
Explanation: s becomes "c" while t becomes "b".
\`\`\`

### Constraints:
- \`1 <= s.length, t.length <= 200\`
- \`s\` and \`t\` only contain lowercase letters and \`'#'\` characters.
`,
    starterCode: {
      javascript: `/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
function backspaceCompare(s, t) {
  let i = s.length - 1, j = t.length - 1;
  let skipS = 0, skipT = 0;

  while (i >= 0 || j >= 0) {
    while (i >= 0) {
      if (s[i] === '#') { skipS++; i--; }
      else if (skipS > 0) { skipS--; i--; }
      else break;
    }
    while (j >= 0) {
      if (t[j] === '#') { skipT++; j--; }
      else if (skipT > 0) { skipT--; j--; }
      else break;
    }
    if (i >= 0 && j >= 0 && s[i] !== t[j]) return false;
    if ((i >= 0) !== (j >= 0)) return false;
    i--;
    j--;
  }
  return true;
}`,
      python: `class Solution:
    def backspaceCompare(self, s: str, t: str) -> bool:
        i, j = len(s) - 1, len(t) - 1
        skip_s, skip_t = 0, 0
        while i >= 0 or j >= 0:
            while i >= 0:
                if s[i] == '#':
                    skip_s += 1
                    i -= 1
                elif skip_s > 0:
                    skip_s -= 1
                    i -= 1
                else:
                    break
            while j >= 0:
                if t[j] == '#':
                    skip_t += 1
                    j -= 1
                elif skip_t > 0:
                    skip_t -= 1
                    j -= 1
                else:
                    break
            if i >= 0 and j >= 0 and s[i] != t[j]:
                return False
            if (i >= 0) != (j >= 0):
                return False
            i -= 1
            j -= 1
        return True`,
      cpp: `#include <string>
using namespace std;

class Solution {
public:
    bool backspaceCompare(string s, string t) {
        int i = s.length() - 1, j = t.length() - 1;
        int skipS = 0, skipT = 0;

        while (i >= 0 || j >= 0) {
            while (i >= 0) {
                if (s[i] == '#') { skipS++; i--; }
                else if (skipS > 0) { skipS--; i--; }
                else break;
            }
            while (j >= 0) {
                if (t[j] == '#') { skipT++; j--; }
                else if (skipT > 0) { skipT--; j--; }
                else break;
            }
            if (i >= 0 && j >= 0 && s[i] != t[j]) return false;
            if ((i >= 0) != (j >= 0)) return false;
            i--;
            j--;
        }
        return true;
    }
};`,
      java: `class Solution {
    public boolean backspaceCompare(String s, String t) {
        int i = s.length() - 1, j = t.length() - 1;
        int skipS = 0, skipT = 0;

        while (i >= 0 || j >= 0) {
            while (i >= 0) {
                if (s.charAt(i) == '#') { skipS++; i--; }
                else if (skipS > 0) { skipS--; i--; }
                else break;
            }
            while (j >= 0) {
                if (t.charAt(j) == '#') { skipT++; j--; }
                else if (skipT > 0) { skipT--; j--; }
                else break;
            }
            if (i >= 0 && j >= 0 && s.charAt(i) != t.charAt(j)) return false;
            if ((i >= 0) != (j >= 0)) return false;
            i--;
            j--;
        }
        return true;
    }
}`
    },
    sampleTestCases: [
      { id: 'bsc-1', input: ['ab#c', 'ad#c'], expectedOutput: true },
      { id: 'bsc-2', input: ['ab##', 'c#d#'], expectedOutput: true },
      { id: 'bsc-3', input: ['a#c', 'b'], expectedOutput: false }
    ],
    hiddenTestCases: [
      { id: 'bsc-h1', input: ['a##c', '#a#c'], expectedOutput: true, isHidden: true }
    ],
    hints: [
      'Iterate backwards from the end of both strings, maintaining skip counts.'
    ],
    solutionExplanation: `Scan backwards from the end of both strings. Track number of active backspaces. Skip characters that are deleted, and compare the surviving characters directly.

- **Time Complexity:** O(M + N)
- **Space Complexity:** O(1)`,
    timeLimitMs: 2000,
    memoryLimitMb: 128,
    acceptanceRate: 48.5,
    totalSubmissions: 210000,
    acceptedSubmissions: 101850
  }
];
