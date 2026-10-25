import { Problem } from '../../types';

export const BINARY_SEARCH_PROBLEMS: Problem[] = [
  {
    id: 'p-binary-search',
    slug: 'binary-search',
    title: 'Binary Search',
    difficulty: 'Easy',
    category: 'Binary Search',
    tags: ['Array', 'Binary Search'],
    functionName: 'search',
    paramNames: ['nums', 'target'],
    description: `Given an array of integers \`nums\` which is sorted in ascending order, and an integer \`target\`, write a function to search \`target\` in \`nums\`. If \`target\` exists, then return its index. Otherwise, return \`-1\`.

You must write an algorithm with \`O(log n)\` runtime complexity.

### Example 1:
\`\`\`
Input: nums = [-1,0,3,5,9,12], target = 9
Output: 4
Explanation: 9 exists in nums and its index is 4
\`\`\`

### Example 2:
\`\`\`
Input: nums = [-1,0,3,5,9,12], target = 2
Output: -1
Explanation: 2 does not exist in nums so return -1
\`\`\`

### Constraints:
- \`1 <= nums.length <= 10^4\`
- \`-10^4 < nums[i], target < 10^4\`
- All the integers in \`nums\` are **unique**.
- \`nums\` is sorted in ascending order.
`,
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
function search(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) return mid;
    if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return -1;
}`,
      python: `class Solution:
    def search(self, nums: list[int], target: int) -> int:
        left, right = 0, len(nums) - 1
        while left <= right:
            mid = (left + right) // 2
            if nums[mid] == target:
                return mid
            elif nums[mid] < target:
                left = mid + 1
            else:
                right = mid - 1
        return -1`,
      cpp: `#include <vector>
using namespace std;

class Solution {
public:
    int search(vector<int>& nums, int target) {
        int left = 0, right = nums.size() - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] == target) return mid;
            if (nums[mid] < target) left = mid + 1;
            else right = mid - 1;
        }
        return -1;
    }
};`,
      java: `class Solution {
    public int search(int[] nums, int target) {
        int left = 0, right = nums.length - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] == target) return mid;
            if (nums[mid] < target) left = mid + 1;
            else right = mid - 1;
        }
        return -1;
    }
}`
    },
    sampleTestCases: [
      { id: 'bs-1', input: [[-1, 0, 3, 5, 9, 12], 9], expectedOutput: 4 },
      { id: 'bs-2', input: [[-1, 0, 3, 5, 9, 12], 2], expectedOutput: -1 }
    ],
    hiddenTestCases: [
      { id: 'bs-h1', input: [[5], 5], expectedOutput: 0, isHidden: true },
      { id: 'bs-h2', input: [[2, 5], 5], expectedOutput: 1, isHidden: true }
    ],
    hints: [
      'Compare target with the middle element. Halve the search space at each iteration.'
    ],
    solutionExplanation: `Standard binary search with two pointers \`left\` and \`right\`. Halves the candidate search interval at each step.

- **Time Complexity:** O(log n)
- **Space Complexity:** O(1)`,
    timeLimitMs: 2000,
    memoryLimitMb: 128,
    acceptanceRate: 57.1,
    totalSubmissions: 310000,
    acceptedSubmissions: 177010
  },
  {
    id: 'p-search-a-2d-matrix',
    slug: 'search-a-2d-matrix',
    title: 'Search a 2D Matrix',
    difficulty: 'Medium',
    category: 'Binary Search',
    tags: ['Array', 'Binary Search', 'Matrix'],
    functionName: 'searchMatrix',
    paramNames: ['matrix', 'target'],
    description: `You are given an \`m x n\` integer matrix \`matrix\` with the following two properties:
- Each row is sorted in non-decreasing order.
- The first integer of each row is greater than the last integer of the previous row.

Given an integer \`target\`, return \`true\` *if* \`target\` *is in* \`matrix\` *or* \`false\` *otherwise*.

You must write a solution in \`O(log(m * n))\` time complexity.

### Example 1:
\`\`\`
Input: matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3
Output: true
\`\`\`

### Example 2:
\`\`\`
Input: matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 13
Output: false
\`\`\`

### Constraints:
- \`m == matrix.length\`
- \`n == matrix[i].length\`
- \`1 <= m, n <= 100\`
- \`-10^4 <= matrix[i][j], target <= 10^4\`
`,
    starterCode: {
      javascript: `/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
function searchMatrix(matrix, target) {
  const m = matrix.length;
  const n = matrix[0].length;
  let left = 0;
  let right = m * n - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const row = Math.floor(mid / n);
    const col = mid % n;
    const val = matrix[row][col];

    if (val === target) return true;
    if (val < target) left = mid + 1;
    else right = mid - 1;
  }
  return false;
}`,
      python: `class Solution:
    def searchMatrix(self, matrix: list[list[int]], target: int) -> bool:
        m, n = len(matrix), len(matrix[0])
        left, right = 0, m * n - 1
        while left <= right:
            mid = (left + right) // 2
            val = matrix[mid // n][mid % n]
            if val == target:
                return True
            elif val < target:
                left = mid + 1
            else:
                right = mid - 1
        return False`,
      cpp: `#include <vector>
using namespace std;

class Solution {
public:
    bool searchMatrix(vector<vector<int>>& matrix, int target) {
        int m = matrix.size(), n = matrix[0].size();
        int left = 0, right = m * n - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            int val = matrix[mid / n][mid % n];
            if (val == target) return true;
            if (val < target) left = mid + 1;
            else right = mid - 1;
        }
        return false;
    }
};`,
      java: `class Solution {
    public boolean searchMatrix(int[][] matrix, int target) {
        int m = matrix.length, n = matrix[0].length;
        int left = 0, right = m * n - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            int val = matrix[mid / n][mid % n];
            if (val == target) return true;
            if (val < target) left = mid + 1;
            else right = mid - 1;
        }
        return false;
    }
}`
    },
    sampleTestCases: [
      { id: 's2m-1', input: [[[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]], 3], expectedOutput: true },
      { id: 's2m-2', input: [[[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]], 13], expectedOutput: false }
    ],
    hiddenTestCases: [
      { id: 's2m-h1', input: [[[1]], 1], expectedOutput: true, isHidden: true },
      { id: 's2m-h2', input: [[[1, 3]], 3], expectedOutput: true, isHidden: true }
    ],
    hints: [
      'Treat the entire matrix as a flattened 1D sorted array of length m * n.',
      'Index idx corresponds to row = idx / n and col = idx % n.'
    ],
    solutionExplanation: `Treat the m x n matrix as a single 1D array of length m * n. Binary search with indices \`0\` to \`m*n - 1\`, mapping \`mid\` to matrix cell \`matrix[mid / n][mid % n]\`.

- **Time Complexity:** O(log(m * n))
- **Space Complexity:** O(1)`,
    timeLimitMs: 2000,
    memoryLimitMb: 128,
    acceptanceRate: 49.3,
    totalSubmissions: 220000,
    acceptedSubmissions: 108460
  },
  {
    id: 'p-koko-eating-bananas',
    slug: 'koko-eating-bananas',
    title: 'Koko Eating Bananas',
    difficulty: 'Medium',
    category: 'Binary Search',
    tags: ['Array', 'Binary Search'],
    functionName: 'minEatingSpeed',
    paramNames: ['piles', 'h'],
    description: `Koko loves to eat bananas. There are \`n\` piles of bananas, the \`i-th\` pile has \`piles[i]\` bananas. The guards have gone and will come back in \`h\` hours.

Koko can decide her bananas-per-hour eating speed of \`k\`. Each hour, she chooses some pile of bananas and eats \`k\` bananas from that pile. If the pile has less than \`k\` bananas, she eats all of them instead and will not eat any more bananas during this hour.

Koko wants to finish eating all the bananas before the guards return.

Return *the minimum integer* \`k\` *such that she can eat all the bananas within* \`h\` *hours*.

### Example 1:
\`\`\`
Input: piles = [3,6,7,11], h = 8
Output: 4
\`\`\`

### Example 2:
\`\`\`
Input: piles = [30,11,23,4,20], h = 5
Output: 30
\`\`\`

### Example 3:
\`\`\`
Input: piles = [30,11,23,4,20], h = 6
Output: 23
\`\`\`

### Constraints:
- \`1 <= piles.length <= 10^4\`
- \`piles.length <= h <= 10^9\`
- \`1 <= piles[i] <= 10^9\`
`,
    starterCode: {
      javascript: `/**
 * @param {number[]} piles
 * @param {number} h
 * @return {number}
 */
function minEatingSpeed(piles, h) {
  let left = 1;
  let right = Math.max(...piles);
  let res = right;

  function canEatAll(speed) {
    let hours = 0;
    for (const p of piles) {
      hours += Math.ceil(p / speed);
    }
    return hours <= h;
  }

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (canEatAll(mid)) {
      res = mid;
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
  return res;
}`,
      python: `import math

class Solution:
    def minEatingSpeed(self, piles: list[int], h: int) -> int:
        left, right = 1, max(piles)
        res = right
        while left <= right:
            mid = (left + right) // 2
            hours = sum(math.ceil(p / mid) for p in piles)
            if hours <= h:
                res = mid
                right = mid - 1
            else:
                left = mid + 1
        return res`,
      cpp: `#include <vector>
#include <algorithm>
#include <cmath>
using namespace std;

class Solution {
public:
    int minEatingSpeed(vector<int>& piles, int h) {
        int left = 1, right = *max_element(piles.begin(), piles.end());
        int res = right;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            long long hours = 0;
            for (int p : piles) {
                hours += (p + mid - 1) / mid;
            }
            if (hours <= h) {
                res = mid;
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        }
        return res;
    }
};`,
      java: `class Solution {
    public int minEatingSpeed(int[] piles, int h) {
        int left = 1, right = 0;
        for (int p : piles) right = Math.max(right, p);
        int res = right;

        while (left <= right) {
            int mid = left + (right - left) / 2;
            long hours = 0;
            for (int p : piles) {
                hours += (long) Math.ceil((double) p / mid);
            }
            if (hours <= h) {
                res = mid;
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        }
        return res;
    }
}`
    },
    sampleTestCases: [
      { id: 'keb-1', input: [[3, 6, 7, 11], 8], expectedOutput: 4 },
      { id: 'keb-2', input: [[30, 11, 23, 4, 20], 5], expectedOutput: 30 },
      { id: 'keb-3', input: [[30, 11, 23, 4, 20], 6], expectedOutput: 23 }
    ],
    hiddenTestCases: [
      { id: 'keb-h1', input: [[312884470], 968709470], expectedOutput: 1, isHidden: true }
    ],
    hints: [
      'Binary search over the answer space [1, max(piles)].',
      'If speed k works, all speeds > k also work.'
    ],
    solutionExplanation: `Binary search on the speed range \`[1, max(piles)]\`. For each midpoint speed, calculate total hours spent. If total hours <= h, this speed is valid, so search smaller speeds to minimize k.

- **Time Complexity:** O(N log(max(piles)))
- **Space Complexity:** O(1)`,
    timeLimitMs: 2500,
    memoryLimitMb: 128,
    acceptanceRate: 51.5,
    totalSubmissions: 165000,
    acceptedSubmissions: 84975
  },
  {
    id: 'p-find-minimum-in-rotated-sorted-array',
    slug: 'find-minimum-in-rotated-sorted-array',
    title: 'Find Minimum in Rotated Sorted Array',
    difficulty: 'Medium',
    category: 'Binary Search',
    tags: ['Array', 'Binary Search'],
    functionName: 'findMin',
    paramNames: ['nums'],
    description: `Suppose an array of length \`n\` sorted in ascending order is **rotated** between \`1\` and \`n\` times.

Given the sorted rotated array \`nums\` of **unique** elements, return *the minimum element of this array*.

You must write an algorithm that runs in \`O(log n)\` time.

### Example 1:
\`\`\`
Input: nums = [3,4,5,1,2]
Output: 1
Explanation: The original array was [1,2,3,4,5] rotated 3 times.
\`\`\`

### Example 2:
\`\`\`
Input: nums = [4,5,6,7,0,1,2]
Output: 0
\`\`\`

### Example 3:
\`\`\`
Input: nums = [11,13,15,17]
Output: 11
\`\`\`

### Constraints:
- \`n == nums.length\`
- \`1 <= n <= 5000\`
- \`-5000 <= nums[i] <= 5000\`
- All the integers of \`nums\` are **unique**.
`,
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @return {number}
 */
function findMin(nums) {
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] > nums[right]) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }
  return nums[left];
}`,
      python: `class Solution:
    def findMin(self, nums: list[int]) -> int:
        left, right = 0, len(nums) - 1
        while left < right:
            mid = (left + right) // 2
            if nums[mid] > nums[right]:
                left = mid + 1
            else:
                right = mid
        return nums[left]`,
      cpp: `#include <vector>
using namespace std;

class Solution {
public:
    int findMin(vector<int>& nums) {
        int left = 0, right = nums.size() - 1;
        while (left < right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] > nums[right]) left = mid + 1;
            else right = mid;
        }
        return nums[left];
    }
};`,
      java: `class Solution {
    public int findMin(int[] nums) {
        int left = 0, right = nums.length - 1;
        while (left < right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] > nums[right]) left = mid + 1;
            else right = mid;
        }
        return nums[left];
    }
}`
    },
    sampleTestCases: [
      { id: 'fmr-1', input: [[3, 4, 5, 1, 2]], expectedOutput: 1 },
      { id: 'fmr-2', input: [[4, 5, 6, 7, 0, 1, 2]], expectedOutput: 0 },
      { id: 'fmr-3', input: [[11, 13, 15, 17]], expectedOutput: 11 }
    ],
    hiddenTestCases: [
      { id: 'fmr-h1', input: [[2, 1]], expectedOutput: 1, isHidden: true },
      { id: 'fmr-h2', input: [[1]], expectedOutput: 1, isHidden: true }
    ],
    hints: [
      'Compare nums[mid] with nums[right]. If nums[mid] > nums[right], the minimum is in the right half.'
    ],
    solutionExplanation: `Compare \`nums[mid]\` with \`nums[right]\`. If \`nums[mid] > nums[right]\`, the inflection point is strictly to the right, so \`left = mid + 1\`. Otherwise, \`right = mid\`.

- **Time Complexity:** O(log n)
- **Space Complexity:** O(1)`,
    timeLimitMs: 2000,
    memoryLimitMb: 128,
    acceptanceRate: 49.8,
    totalSubmissions: 205000,
    acceptedSubmissions: 102090
  },
  {
    id: 'p-search-in-rotated-sorted-array',
    slug: 'search-in-rotated-sorted-array',
    title: 'Search in Rotated Sorted Array',
    difficulty: 'Medium',
    category: 'Binary Search',
    tags: ['Array', 'Binary Search'],
    functionName: 'search',
    paramNames: ['nums', 'target'],
    description: `There is an integer array \`nums\` sorted in ascending order (with **distinct** values).

Prior to being passed to your function, \`nums\` is **possibly rotated** at an unknown pivot index \`k\` (\`1 <= k < nums.length\`).

Given the array \`nums\` after the possible rotation and an integer \`target\`, return *the index of* \`target\` *if it is in* \`nums\`, *or* \`-1\` *if it is not in* \`nums\`.

You must write an algorithm with \`O(log n)\` runtime complexity.

### Example 1:
\`\`\`
Input: nums = [4,5,6,7,0,1,2], target = 0
Output: 4
\`\`\`

### Example 2:
\`\`\`
Input: nums = [4,5,6,7,0,1,2], target = 3
Output: -1
\`\`\`

### Example 3:
\`\`\`
Input: nums = [1], target = 0
Output: -1
\`\`\`

### Constraints:
- \`1 <= nums.length <= 5000\`
- \`-10^4 <= nums[i] <= 10^4\`
- All values of \`nums\` are **unique**.
- \`nums\` is an ascending array that is possibly rotated.
`,
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
function search(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) return mid;

    // Check if left half is sorted
    if (nums[left] <= nums[mid]) {
      if (nums[left] <= target && target < nums[mid]) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    } else {
      // Right half is sorted
      if (nums[mid] < target && target <= nums[right]) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  }
  return -1;
}`,
      python: `class Solution:
    def search(self, nums: list[int], target: int) -> int:
        left, right = 0, len(nums) - 1
        while left <= right:
            mid = (left + right) // 2
            if nums[mid] == target:
                return mid
            if nums[left] <= nums[mid]:
                if nums[left] <= target < nums[mid]:
                    right = mid - 1
                else:
                    left = mid + 1
            else:
                if nums[mid] < target <= nums[right]:
                    left = mid + 1
                else:
                    right = mid - 1
        return -1`,
      cpp: `#include <vector>
using namespace std;

class Solution {
public:
    int search(vector<int>& nums, int target) {
        int left = 0, right = nums.size() - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] == target) return mid;
            if (nums[left] <= nums[mid]) {
                if (nums[left] <= target && target < nums[mid]) right = mid - 1;
                else left = mid + 1;
            } else {
                if (nums[mid] < target && target <= nums[right]) left = mid + 1;
                else right = mid - 1;
            }
        }
        return -1;
    }
};`,
      java: `class Solution {
    public int search(int[] nums, int target) {
        int left = 0, right = nums.length - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] == target) return mid;
            if (nums[left] <= nums[mid]) {
                if (nums[left] <= target && target < nums[mid]) right = mid - 1;
                else left = mid + 1;
            } else {
                if (nums[mid] < target && target <= nums[right]) left = mid + 1;
                else right = mid - 1;
            }
        }
        return -1;
    }
}`
    },
    sampleTestCases: [
      { id: 'sir-1', input: [[4, 5, 6, 7, 0, 1, 2], 0], expectedOutput: 4 },
      { id: 'sir-2', input: [[4, 5, 6, 7, 0, 1, 2], 3], expectedOutput: -1 },
      { id: 'sir-3', input: [[1], 0], expectedOutput: -1 }
    ],
    hiddenTestCases: [
      { id: 'sir-h1', input: [[3, 1], 1], expectedOutput: 1, isHidden: true },
      { id: 'sir-h2', input: [[5, 1, 3], 5], expectedOutput: 0, isHidden: true }
    ],
    hints: [
      'At least one half of the array will always be normally sorted.',
      'Check if target falls within the sorted half.'
    ],
    solutionExplanation: `At any pivot, either the left half \`[left, mid]\` or the right half \`[mid, right]\` is monotonically sorted. Check which half is sorted, then determine if \`target\` falls inside its boundaries.

- **Time Complexity:** O(log n)
- **Space Complexity:** O(1)`,
    timeLimitMs: 2000,
    memoryLimitMb: 128,
    acceptanceRate: 40.2,
    totalSubmissions: 240000,
    acceptedSubmissions: 96480
  }
];
