import { Problem } from '../../types';

export const TOP_INTERVIEW_CURATED_PROBLEMS: Problem[] = [
  {
    id: 'p-length-of-last-word',
    slug: 'length-of-last-word',
    title: 'Length of Last Word',
    difficulty: 'Easy',
    category: 'Arrays & Hashing',
    tags: ['String'],
    functionName: 'lengthOfLastWord',
    paramNames: ['s'],
    description: `Given a string \`s\` consisting of words and spaces, return *the length of the **last** word in the string*.

A **word** is a maximal substring consisting of non-space characters only.

### Example 1:
\`\`\`
Input: s = "Hello World"
Output: 5
Explanation: The last word is "World" with length 5.
\`\`\`

### Example 2:
\`\`\`
Input: s = "   fly me   to   the moon  "
Output: 4
Explanation: The last word is "moon" with length 4.
\`\`\`

### Example 3:
\`\`\`
Input: s = "luffy is still joyboy"
Output: 6
Explanation: The last word is "joyboy" with length 6.
\`\`\`

### Constraints:
- \`1 <= s.length <= 10^4\`
- \`s\` consists of only English letters and spaces \`' '\`.
- There will be at least one word in \`s\`.
`,
    starterCode: {
      javascript: `/**
 * @param {string} s
 * @return {number}
 */
function lengthOfLastWord(s) {
  let i = s.length - 1;
  while (i >= 0 && s[i] === ' ') i--;
  let length = 0;
  while (i >= 0 && s[i] !== ' ') {
    length++;
    i--;
  }
  return length;
}`,
      python: `class Solution:
    def lengthOfLastWord(self, s: str) -> int:
        return len(s.strip().split()[-1])`,
      cpp: `#include <string>
using namespace std;

class Solution {
public:
    int lengthOfLastWord(string s) {
        int i = s.length() - 1;
        while (i >= 0 && s[i] == ' ') i--;
        int len = 0;
        while (i >= 0 && s[i] != ' ') {
            len++;
            i--;
        }
        return len;
    }
};`,
      java: `class Solution {
    public int lengthOfLastWord(String s) {
        int i = s.length() - 1;
        while (i >= 0 && s.charAt(i) == ' ') i--;
        int len = 0;
        while (i >= 0 && s.charAt(i) != ' ') {
            len++;
            i--;
        }
        return len;
    }
}`
    },
    sampleTestCases: [
      { id: 'lolw-1', input: ['Hello World'], expectedOutput: 5 },
      { id: 'lolw-2', input: ['   fly me   to   the moon  '], expectedOutput: 4 },
      { id: 'lolw-3', input: ['luffy is still joyboy'], expectedOutput: 6 }
    ],
    hiddenTestCases: [
      { id: 'lolw-h1', input: ['a'], expectedOutput: 1, isHidden: true },
      { id: 'lolw-h2', input: ['day        '], expectedOutput: 3, isHidden: true }
    ],
    hints: ['Scan backwards from the end of the string.'],
    solutionExplanation: `Traverse from the end, skipping trailing spaces. Count characters until the next space is encountered.

- **Time Complexity:** O(n)
- **Space Complexity:** O(1)`,
    timeLimitMs: 2000,
    memoryLimitMb: 128,
    acceptanceRate: 51.5,
    totalSubmissions: 310000,
    acceptedSubmissions: 159650
  },
  {
    id: 'p-longest-common-prefix',
    slug: 'longest-common-prefix',
    title: 'Longest Common Prefix',
    difficulty: 'Easy',
    category: 'Arrays & Hashing',
    tags: ['String', 'Trie'],
    functionName: 'longestCommonPrefix',
    paramNames: ['strs'],
    description: `Write a function to find the longest common prefix string amongst an array of strings.

If there is no common prefix, return an empty string \`""\`.

### Example 1:
\`\`\`
Input: strs = ["flower","flow","flight"]
Output: "fl"
\`\`\`

### Example 2:
\`\`\`
Input: strs = ["dog","racecar","car"]
Output: ""
Explanation: There is no common prefix among the input strings.
\`\`\`

### Constraints:
- \`1 <= strs.length <= 200\`
- \`0 <= strs[i].length <= 200\`
- \`strs[i]\` consists of only lowercase English letters.
`,
    starterCode: {
      javascript: `/**
 * @param {string[]} strs
 * @return {string}
 */
function longestCommonPrefix(strs) {
  if (strs.length === 0) return "";
  let prefix = strs[0];
  for (let i = 1; i < strs.length; i++) {
    while (strs[i].indexOf(prefix) !== 0) {
      prefix = prefix.substring(0, prefix.length - 1);
      if (prefix === "") return "";
    }
  }
  return prefix;
}`,
      python: `class Solution:
    def longestCommonPrefix(self, strs: list[str]) -> str:
        if not strs:
            return ""
        prefix = strs[0]
        for s in strs[1:]:
            while not s.startswith(prefix):
                prefix = prefix[:-1]
                if not prefix:
                    return ""
        return prefix`,
      cpp: `#include <vector>
#include <string>
using namespace std;

class Solution {
public:
    string longestCommonPrefix(vector<string>& strs) {
        if (strs.empty()) return "";
        string prefix = strs[0];
        for (size_t i = 1; i < strs.size(); i++) {
            while (strs[i].find(prefix) != 0) {
                prefix = prefix.substr(0, prefix.length() - 1);
                if (prefix.empty()) return "";
            }
        }
        return prefix;
    }
};`,
      java: `class Solution {
    public String longestCommonPrefix(String[] strs) {
        if (strs == null || strs.length == 0) return "";
        String prefix = strs[0];
        for (int i = 1; i < strs.length; i++) {
            while (!strs[i].startsWith(prefix)) {
                prefix = prefix.substring(0, prefix.length() - 1);
                if (prefix.isEmpty()) return "";
            }
        }
        return prefix;
    }
}`
    },
    sampleTestCases: [
      { id: 'lcp-1', input: [['flower', 'flow', 'flight']], expectedOutput: 'fl' },
      { id: 'lcp-2', input: [['dog', 'racecar', 'car']], expectedOutput: '' }
    ],
    hiddenTestCases: [
      { id: 'lcp-h1', input: [['a']], expectedOutput: 'a', isHidden: true },
      { id: 'lcp-h2', input: [['cir', 'car']], expectedOutput: 'c', isHidden: true }
    ],
    hints: ['Horizontal scanning: reduce prefix against each string in sequence.'],
    solutionExplanation: `Start with \`prefix = strs[0]\`. For every subsequent string, trim characters from the end of \`prefix\` until \`strs[i]\` starts with it.

- **Time Complexity:** O(S) where S is sum of characters across all strings
- **Space Complexity:** O(1)`,
    timeLimitMs: 2000,
    memoryLimitMb: 128,
    acceptanceRate: 42.1,
    totalSubmissions: 310000,
    acceptedSubmissions: 130510
  },
  {
    id: 'p-merge-sorted-array',
    slug: 'merge-sorted-array',
    title: 'Merge Sorted Array',
    difficulty: 'Easy',
    category: 'Two Pointers',
    tags: ['Array', 'Two Pointers', 'Sorting'],
    functionName: 'merge',
    paramNames: ['nums1', 'm', 'nums2', 'n'],
    description: `You are given two integer arrays \`nums1\` and \`nums2\`, sorted in **non-decreasing order**, and two integers \`m\` and \`n\`, representing the number of elements in \`nums1\` and \`nums2\` respectively.

**Merge** \`nums1\` and \`nums2\` into a single array sorted in **non-decreasing order**.

The final sorted array should not be returned by the function, but instead be *stored inside the array* \`nums1\`. To accommodate this, \`nums1\` has a length of \`m + n\`.

### Example 1:
\`\`\`
Input: nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3
Output: [1,2,2,3,5,6]
\`\`\`

### Example 2:
\`\`\`
Input: nums1 = [1], m = 1, nums2 = [], n = 0
Output: [1]
\`\`\`

### Constraints:
- \`nums1.length == m + n\`
- \`nums2.length == n\`
- \`0 <= m, n <= 200\`
- \`1 <= m + n <= 200\`
`,
    starterCode: {
      javascript: `/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {number[]}
 */
function merge(nums1, m, nums2, n) {
  let p1 = m - 1;
  let p2 = n - 1;
  let p = m + n - 1;

  while (p2 >= 0) {
    if (p1 >= 0 && nums1[p1] > nums2[p2]) {
      nums1[p] = nums1[p1];
      p1--;
    } else {
      nums1[p] = nums2[p2];
      p2--;
    }
    p--;
  }
  return nums1;
}`,
      python: `class Solution:
    def merge(self, nums1: list[int], m: int, nums2: list[int], n: int) -> list[int]:
        p1, p2, p = m - 1, n - 1, m + n - 1
        while p2 >= 0:
            if p1 >= 0 and nums1[p1] > nums2[p2]:
                nums1[p] = nums1[p1]
                p1 -= 1
            else:
                nums1[p] = nums2[p2]
                p2 -= 1
            p -= 1
        return nums1`,
      cpp: `#include <vector>
using namespace std;

class Solution {
public:
    vector<int> merge(vector<int>& nums1, int m, vector<int>& nums2, int n) {
        int p1 = m - 1, p2 = n - 1, p = m + n - 1;
        while (p2 >= 0) {
            if (p1 >= 0 && nums1[p1] > nums2[p2]) {
                nums1[p] = nums1[p1];
                p1--;
            } else {
                nums1[p] = nums2[p2];
                p2--;
            }
            p--;
        }
        return nums1;
    }
};`,
      java: `class Solution {
    public int[] merge(int[] nums1, int m, int[] nums2, int n) {
        int p1 = m - 1, p2 = n - 1, p = m + n - 1;
        while (p2 >= 0) {
            if (p1 >= 0 && nums1[p1] > nums2[p2]) {
                nums1[p] = nums1[p1];
                p1--;
            } else {
                nums1[p] = nums2[p2];
                p2--;
            }
            p--;
        }
        return nums1;
    }
}`
    },
    sampleTestCases: [
      { id: 'msa-1', input: [[1, 2, 3, 0, 0, 0], 3, [2, 5, 6], 3], expectedOutput: [1, 2, 2, 3, 5, 6] },
      { id: 'msa-2', input: [[1], 1, [], 0], expectedOutput: [1] }
    ],
    hiddenTestCases: [
      { id: 'msa-h1', input: [[0], 0, [1], 1], expectedOutput: [1], isHidden: true }
    ],
    hints: ['Merge backwards from index m + n - 1 to avoid overwriting elements.'],
    solutionExplanation: `Three-pointer approach from the back: Compare largest remaining elements of \`nums1\` and \`nums2\`, inserting the larger one into index \`p = m + n - 1\`.

- **Time Complexity:** O(m + n)
- **Space Complexity:** O(1)`,
    timeLimitMs: 2000,
    memoryLimitMb: 128,
    acceptanceRate: 48.9,
    totalSubmissions: 310000,
    acceptedSubmissions: 151590
  },
  {
    id: 'p-search-insert-position',
    slug: 'search-insert-position',
    title: 'Search Insert Position',
    difficulty: 'Easy',
    category: 'Binary Search',
    tags: ['Array', 'Binary Search'],
    functionName: 'searchInsert',
    paramNames: ['nums', 'target'],
    description: `Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.

You must write an algorithm with \`O(log n)\` runtime complexity.

### Example 1:
\`\`\`
Input: nums = [1,3,5,6], target = 5
Output: 2
\`\`\`

### Example 2:
\`\`\`
Input: nums = [1,3,5,6], target = 2
Output: 1
\`\`\`

### Example 3:
\`\`\`
Input: nums = [1,3,5,6], target = 7
Output: 4
\`\`\`

### Constraints:
- \`1 <= nums.length <= 10^4\`
- \`-10^4 <= nums[i] <= 10^4\`
- \`nums\` contains **distinct** values sorted in **ascending** order.
- \`-10^4 <= target <= 10^4\`
`,
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
function searchInsert(nums, target) {
  let left = 0, right = nums.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) return mid;
    if (nums[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return left;
}`,
      python: `class Solution:
    def searchInsert(self, nums: list[int], target: int) -> int:
        left, right = 0, len(nums) - 1
        while left <= right:
            mid = (left + right) // 2
            if nums[mid] == target:
                return mid
            elif nums[mid] < target:
                left = mid + 1
            else:
                right = mid - 1
        return left`,
      cpp: `#include <vector>
using namespace std;

class Solution {
public:
    int searchInsert(vector<int>& nums, int target) {
        int left = 0, right = nums.size() - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] == target) return mid;
            if (nums[mid] < target) left = mid + 1;
            else right = mid - 1;
        }
        return left;
    }
};`,
      java: `class Solution {
    public int searchInsert(int[] nums, int target) {
        int left = 0, right = nums.length - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] == target) return mid;
            if (nums[mid] < target) left = mid + 1;
            else right = mid - 1;
        }
        return left;
    }
}`
    },
    sampleTestCases: [
      { id: 'sip-1', input: [[1, 3, 5, 6], 5], expectedOutput: 2 },
      { id: 'sip-2', input: [[1, 3, 5, 6], 2], expectedOutput: 1 },
      { id: 'sip-3', input: [[1, 3, 5, 6], 7], expectedOutput: 4 }
    ],
    hiddenTestCases: [
      { id: 'sip-h1', input: [[1, 3, 5, 6], 0], expectedOutput: 0, isHidden: true }
    ],
    hints: ['Binary search returns left as the insertion index when element is not found.'],
    solutionExplanation: `Binary search: If \`target\` is found, return \`mid\`. When the loop finishes with \`left > right\`, \`left\` points to the correct insertion position.

- **Time Complexity:** O(log n)
- **Space Complexity:** O(1)`,
    timeLimitMs: 2000,
    memoryLimitMb: 128,
    acceptanceRate: 45.8,
    totalSubmissions: 280000,
    acceptedSubmissions: 128240
  },
  {
    id: 'p-find-peak-element',
    slug: 'find-peak-element',
    title: 'Find Peak Element',
    difficulty: 'Medium',
    category: 'Binary Search',
    tags: ['Array', 'Binary Search'],
    functionName: 'findPeakElement',
    paramNames: ['nums'],
    description: `A peak element is an element that is strictly greater than its neighbors.

Given a **0-indexed** integer array \`nums\`, find a peak element, and return its index. If the array contains multiple peaks, return the index to **any of the peaks**.

You may imagine that \`nums[-1] = nums[n] = -∞\`.

You must write an algorithm that runs in \`O(log n)\` time.

### Example 1:
\`\`\`
Input: nums = [1,2,3,1]
Output: 2
Explanation: 3 is a peak element and your function should return the index number 2.
\`\`\`

### Example 2:
\`\`\`
Input: nums = [1,2,1,3,5,6,4]
Output: 5
Explanation: Your function can return either index number 1 where the peak element is 2, or index number 5 where the peak element is 6.
\`\`\`

### Constraints:
- \`1 <= nums.length <= 1000\`
- \`-2^31 <= nums[i] <= 2^31 - 1\`
- \`nums[i] != nums[i + 1]\` for all valid \`i\`.
`,
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @return {number}
 */
function findPeakElement(nums) {
  let left = 0, right = nums.length - 1;
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] > nums[mid + 1]) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }
  return left;
}`,
      python: `class Solution:
    def findPeakElement(self, nums: list[int]) -> int:
        left, right = 0, len(nums) - 1
        while left < right:
            mid = (left + right) // 2
            if nums[mid] > nums[mid + 1]:
                right = mid
            else:
                left = mid + 1
        return left`,
      cpp: `#include <vector>
using namespace std;

class Solution {
public:
    int findPeakElement(vector<int>& nums) {
        int left = 0, right = nums.size() - 1;
        while (left < right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] > nums[mid + 1]) right = mid;
            else left = mid + 1;
        }
        return left;
    }
};`,
      java: `class Solution {
    public int findPeakElement(int[] nums) {
        int left = 0, right = nums.length - 1;
        while (left < right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] > nums[mid + 1]) right = mid;
            else left = mid + 1;
        }
        return left;
    }
}`
    },
    sampleTestCases: [
      { id: 'fpe-1', input: [[1, 2, 3, 1]], expectedOutput: 2 },
      { id: 'fpe-2', input: [[1, 2, 1, 3, 5, 6, 4]], expectedOutput: 5 }
    ],
    hiddenTestCases: [
      { id: 'fpe-h1', input: [[1]], expectedOutput: 0, isHidden: true },
      { id: 'fpe-h2', input: [[1, 2]], expectedOutput: 1, isHidden: true }
    ],
    hints: ['If nums[mid] < nums[mid + 1], a peak is guaranteed to exist on the right.'],
    solutionExplanation: `Binary search on slopes: If \`nums[mid] > nums[mid + 1]\`, the slope is decreasing, so a peak must exist at or to the left of \`mid\`. Otherwise, a peak exists to the right.

- **Time Complexity:** O(log n)
- **Space Complexity:** O(1)`,
    timeLimitMs: 2000,
    memoryLimitMb: 128,
    acceptanceRate: 46.1,
    totalSubmissions: 220000,
    acceptedSubmissions: 101420
  },
  {
    id: 'p-find-first-and-last-position-of-element-in-sorted-array',
    slug: 'find-first-and-last-position-of-element-in-sorted-array',
    title: 'Find First and Last Position of Element in Sorted Array',
    difficulty: 'Medium',
    category: 'Binary Search',
    tags: ['Array', 'Binary Search'],
    functionName: 'searchRange',
    paramNames: ['nums', 'target'],
    description: `Given an array of integers \`nums\` sorted in non-decreasing order, find the starting and ending position of a given \`target\` value.

If \`target\` is not found in the array, return \`[-1, -1]\`.

You must write an algorithm with \`O(log n)\` runtime complexity.

### Example 1:
\`\`\`
Input: nums = [5,7,7,8,8,10], target = 8
Output: [3,4]
\`\`\`

### Example 2:
\`\`\`
Input: nums = [5,7,7,8,8,10], target = 6
Output: [-1,-1]
\`\`\`

### Example 3:
\`\`\`
Input: nums = [], target = 0
Output: [-1,-1]
\`\`\`

### Constraints:
- \`0 <= nums.length <= 10^5\`
- \`-10^9 <= nums[i] <= 10^9\`
- \`nums\` is a non-decreasing array.
- \`-10^9 <= target <= 10^9\`
`,
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function searchRange(nums, target) {
  function findBound(isFirst) {
    let left = 0, right = nums.length - 1;
    let bound = -1;
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      if (nums[mid] === target) {
        bound = mid;
        if (isFirst) right = mid - 1;
        else left = mid + 1;
      } else if (nums[mid] < target) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
    return bound;
  }
  return [findBound(true), findBound(false)];
}`,
      python: `class Solution:
    def searchRange(self, nums: list[int], target: int) -> list[int]:
        def find_bound(is_first):
            l, r = 0, len(nums) - 1
            bound = -1
            while l <= r:
                mid = (l + r) // 2
                if nums[mid] == target:
                    bound = mid
                    if is_first:
                        r = mid - 1
                    else:
                        l = mid + 1
                elif nums[mid] < target:
                    l = mid + 1
                else:
                    r = mid - 1
            return bound
        return [find_bound(True), find_bound(False)]`,
      cpp: `#include <vector>
using namespace std;

class Solution {
public:
    vector<int> searchRange(vector<int>& nums, int target) {
        return {findBound(nums, target, true), findBound(nums, target, false)};
    }
private:
    int findBound(const vector<int>& nums, int target, bool isFirst) {
        int l = 0, r = nums.size() - 1, bound = -1;
        while (l <= r) {
            int mid = l + (r - l) / 2;
            if (nums[mid] == target) {
                bound = mid;
                if (isFirst) r = mid - 1;
                else l = mid + 1;
            } else if (nums[mid] < target) {
                l = mid + 1;
            } else {
                r = mid - 1;
            }
        }
        return bound;
    }
};`,
      java: `class Solution {
    public int[] searchRange(int[] nums, int target) {
        return new int[]{findBound(nums, target, true), findBound(nums, target, false)};
    }
    private int findBound(int[] nums, int target, boolean isFirst) {
        int l = 0, r = nums.length - 1, bound = -1;
        while (l <= r) {
            int mid = l + (r - l) / 2;
            if (nums[mid] == target) {
                bound = mid;
                if (isFirst) r = mid - 1;
                else l = mid + 1;
            } else if (nums[mid] < target) {
                l = mid + 1;
            } else {
                r = mid - 1;
            }
        }
        return bound;
    }
}`
    },
    sampleTestCases: [
      { id: 'sra-1', input: [[5, 7, 7, 8, 8, 10], 8], expectedOutput: [3, 4] },
      { id: 'sra-2', input: [[5, 7, 7, 8, 8, 10], 6], expectedOutput: [-1, -1] },
      { id: 'sra-3', input: [[], 0], expectedOutput: [-1, -1] }
    ],
    hiddenTestCases: [
      { id: 'sra-h1', input: [[1], 1], expectedOutput: [0, 0], isHidden: true }
    ],
    hints: ['Run two separate binary searches: one for the left bound, one for the right bound.'],
    solutionExplanation: `Execute binary search twice: once with \`right = mid - 1\` to find the first occurrence, and once with \`left = mid + 1\` to find the last occurrence.

- **Time Complexity:** O(log n)
- **Space Complexity:** O(1)`,
    timeLimitMs: 2000,
    memoryLimitMb: 128,
    acceptanceRate: 43.8,
    totalSubmissions: 220000,
    acceptedSubmissions: 96360
  },
  {
    id: 'p-island-perimeter',
    slug: 'island-perimeter',
    title: 'Island Perimeter',
    difficulty: 'Easy',
    category: 'Graphs',
    tags: ['Array', 'Depth-First Search', 'Breadth-First Search', 'Matrix'],
    functionName: 'islandPerimeter',
    paramNames: ['grid'],
    description: `You are given \`row x col\` \`grid\` representing a map where \`grid[i][j] = 1\` represents land and \`grid[i][j] = 0\` represents water.

Grid cells are connected horizontally/vertically (not diagonally). The grid is completely surrounded by water, and there is exactly one island (i.e., one or more connected land cells).

The island doesn't have "lakes", meaning the water inside isn't connected to the water around the island. One cell is a square with side length 1. The grid is rectangular, width and height don't exceed 100. Determine the perimeter of the island.

### Example 1:
\`\`\`
Input: grid = [[0,1,0,0],[1,1,1,0],[0,1,0,0],[1,1,0,0]]
Output: 16
Explanation: The perimeter is the 16 yellow stripes in the image.
\`\`\`

### Example 2:
\`\`\`
Input: grid = [[1]]
Output: 4
\`\`\`

### Constraints:
- \`row == grid.length\`
- \`col == grid[i].length\`
- \`1 <= row, col <= 100\`
- \`grid[i][j]\` is \`0\` or \`1\`.
`,
    starterCode: {
      javascript: `/**
 * @param {number[][]} grid
 * @return {number}
 */
function islandPerimeter(grid) {
  let perimeter = 0;
  const m = grid.length, n = grid[0].length;
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (grid[r][c] === 1) {
        perimeter += 4;
        if (r > 0 && grid[r - 1][c] === 1) perimeter -= 2;
        if (c > 0 && grid[r][c - 1] === 1) perimeter -= 2;
      }
    }
  }
  return perimeter;
}`,
      python: `class Solution:
    def islandPerimeter(self, grid: list[list[int]]) -> int:
        perimeter = 0
        m, n = len(grid), len(grid[0])
        for r in range(m):
            for c in range(n):
                if grid[r][c] == 1:
                    perimeter += 4
                    if r > 0 and grid[r - 1][c] == 1:
                        perimeter -= 2
                    if c > 0 and grid[r][c - 1] == 1:
                        perimeter -= 2
        return perimeter`,
      cpp: `#include <vector>
using namespace std;

class Solution {
public:
    int islandPerimeter(vector<vector<int>>& grid) {
        int perimeter = 0;
        int m = grid.size(), n = grid[0].size();
        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                if (grid[r][c] == 1) {
                    perimeter += 4;
                    if (r > 0 && grid[r - 1][c] == 1) perimeter -= 2;
                    if (c > 0 && grid[r][c - 1] == 1) perimeter -= 2;
                }
            }
        }
        return perimeter;
    }
};`,
      java: `class Solution {
    public int islandPerimeter(int[][] grid) {
        int perimeter = 0;
        int m = grid.length, n = grid[0].length;
        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                if (grid[r][c] == 1) {
                    perimeter += 4;
                    if (r > 0 && grid[r - 1][c] == 1) perimeter -= 2;
                    if (c > 0 && grid[r][c - 1] == 1) perimeter -= 2;
                }
            }
        }
        return perimeter;
    }
}`
    },
    sampleTestCases: [
      { id: 'ip-1', input: [[[0, 1, 0, 0], [1, 1, 1, 0], [0, 1, 0, 0], [1, 1, 0, 0]]], expectedOutput: 16 },
      { id: 'ip-2', input: [[[1]]], expectedOutput: 4 }
    ],
    hiddenTestCases: [
      { id: 'ip-h1', input: [[[1, 0]]], expectedOutput: 4, isHidden: true }
    ],
    hints: ['Each land cell adds 4 sides, but adjacent land cells share an edge, reducing perimeter by 2.'],
    solutionExplanation: `For each land cell, add 4 to the perimeter. If its top neighbor is land, subtract 2 (shared edge). If its left neighbor is land, subtract 2.

- **Time Complexity:** O(M * N)
- **Space Complexity:** O(1)`,
    timeLimitMs: 2000,
    memoryLimitMb: 128,
    acceptanceRate: 70.8,
    totalSubmissions: 250000,
    acceptedSubmissions: 177000
  },
  {
    id: 'p-ransom-note',
    slug: 'ransom-note',
    title: 'Ransom Note',
    difficulty: 'Easy',
    category: 'Arrays & Hashing',
    tags: ['Hash Table', 'String', 'Counting'],
    functionName: 'canConstruct',
    paramNames: ['ransomNote', 'magazine'],
    description: `Given two strings \`ransomNote\` and \`magazine\`, return \`true\` *if* \`ransomNote\` *can be constructed by using the letters from* \`magazine\` *and* \`false\` *otherwise*.

Each letter in \`magazine\` can only be used once in \`ransomNote\`.

### Example 1:
\`\`\`
Input: ransomNote = "a", magazine = "b"
Output: false
\`\`\`

### Example 2:
\`\`\`
Input: ransomNote = "aa", magazine = "ab"
Output: false
\`\`\`

### Example 3:
\`\`\`
Input: ransomNote = "aa", magazine = "aab"
Output: true
\`\`\`

### Constraints:
- \`1 <= ransomNote.length, magazine.length <= 10^5\`
- \`ransomNote\` and \`magazine\` consist of lowercase English letters.
`,
    starterCode: {
      javascript: `/**
 * @param {string} ransomNote
 * @param {string} magazine
 * @return {boolean}
 */
function canConstruct(ransomNote, magazine) {
  const counts = {};
  for (const c of magazine) counts[c] = (counts[c] || 0) + 1;
  for (const c of ransomNote) {
    if (!counts[c]) return false;
    counts[c]--;
  }
  return true;
}`,
      python: `from collections import Counter

class Solution:
    def canConstruct(self, ransomNote: str, magazine: str) -> bool:
        mag_count = Counter(magazine)
        for c in ransomNote:
            if mag_count[c] <= 0:
                return False
            mag_count[c] -= 1
        return True`,
      cpp: `#include <string>
#include <vector>
using namespace std;

class Solution {
public:
    bool canConstruct(string ransomNote, string magazine) {
        vector<int> counts(26, 0);
        for (char c : magazine) counts[c - 'a']++;
        for (char c : ransomNote) {
            if (--counts[c - 'a'] < 0) return false;
        }
        return true;
    }
};`,
      java: `class Solution {
    public boolean canConstruct(String ransomNote, String magazine) {
        int[] counts = new int[26];
        for (char c : magazine.toCharArray()) counts[c - 'a']++;
        for (char c : ransomNote.toCharArray()) {
            if (--counts[c - 'a'] < 0) return false;
        }
        return true;
    }
}`
    },
    sampleTestCases: [
      { id: 'rn-1', input: ['a', 'b'], expectedOutput: false },
      { id: 'rn-2', input: ['aa', 'ab'], expectedOutput: false },
      { id: 'rn-3', input: ['aa', 'aab'], expectedOutput: true }
    ],
    hiddenTestCases: [
      { id: 'rn-h1', input: ['a', 'a'], expectedOutput: true, isHidden: true }
    ],
    hints: ['Count letter frequencies in the magazine and decrement for each ransom note character.'],
    solutionExplanation: `Frequency counter: Build frequency map of characters in \`magazine\`. Scan \`ransomNote\`, decrementing counts. If any character runs out, return false.

- **Time Complexity:** O(M + N)
- **Space Complexity:** O(1) (fixed 26 letters)`,
    timeLimitMs: 2000,
    memoryLimitMb: 128,
    acceptanceRate: 59.8,
    totalSubmissions: 310000,
    acceptedSubmissions: 185380
  }
];
