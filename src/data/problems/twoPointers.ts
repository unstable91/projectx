import { Problem } from '../../types';

export const TWO_POINTERS_PROBLEMS: Problem[] = [
  {
    id: 'p-valid-palindrome',
    slug: 'valid-palindrome',
    title: 'Valid Palindrome',
    difficulty: 'Easy',
    category: 'Two Pointers',
    tags: ['Two Pointers', 'String'],
    functionName: 'isPalindrome',
    paramNames: ['s'],
    description: `A phrase is a **palindrome** if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.

Given a string \`s\`, return \`true\` *if it is a **palindrome**, or* \`false\` *otherwise*.

### Example 1:
\`\`\`
Input: s = "A man, a plan, a canal: Panama"
Output: true
Explanation: "amanaplanacanalpanama" is a palindrome.
\`\`\`

### Example 2:
\`\`\`
Input: s = "race a car"
Output: false
Explanation: "raceacar" is not a palindrome.
\`\`\`

### Example 3:
\`\`\`
Input: s = " "
Output: true
Explanation: s is an empty string "" after removing non-alphanumeric characters.
Since an empty string reads the same forward and backward, it is a palindrome.
\`\`\`

### Constraints:
- \`1 <= s.length <= 2 * 10^5\`
- \`s\` consists only of printable ASCII characters.
`,
    starterCode: {
      javascript: `/**
 * @param {string} s
 * @return {boolean}
 */
function isPalindrome(s) {
  let left = 0;
  let right = s.length - 1;

  function isAlphaNumeric(c) {
    const code = c.charCodeAt(0);
    return (code >= 48 && code <= 57) || (code >= 65 && code <= 90) || (code >= 97 && code <= 122);
  }

  while (left < right) {
    while (left < right && !isAlphaNumeric(s[left])) left++;
    while (left < right && !isAlphaNumeric(s[right])) right--;
    if (s[left].toLowerCase() !== s[right].toLowerCase()) return false;
    left++;
    right--;
  }
  return true;
}`,
      python: `class Solution:
    def isPalindrome(self, s: str) -> bool:
        left, right = 0, len(s) - 1
        while left < right:
            while left < right and not s[left].isalnum():
                left += 1
            while left < right and not s[right].isalnum():
                right -= 1
            if s[left].lower() != s[right].lower():
                return False
            left += 1
            right -= 1
        return True`,
      cpp: `#include <string>
#include <cctype>
using namespace std;

class Solution {
public:
    bool isPalindrome(string s) {
        int left = 0, right = s.size() - 1;
        while (left < right) {
            while (left < right && !isalnum(s[left])) left++;
            while (left < right && !isalnum(s[right])) right--;
            if (tolower(s[left]) != tolower(s[right])) return false;
            left++;
            right--;
        }
        return true;
    }
};`,
      java: `class Solution {
    public boolean isPalindrome(String s) {
        int left = 0, right = s.length() - 1;
        while (left < right) {
            while (left < right && !Character.isLetterOrDigit(s.charAt(left))) left++;
            while (left < right && !Character.isLetterOrDigit(s.charAt(right))) right--;
            if (Character.toLowerCase(s.charAt(left)) != Character.toLowerCase(s.charAt(right))) {
                return false;
            }
            left++;
            right--;
        }
        return true;
    }
}`
    },
    sampleTestCases: [
      { id: 'vp-1', input: ['A man, a plan, a canal: Panama'], expectedOutput: true },
      { id: 'vp-2', input: ['race a car'], expectedOutput: false },
      { id: 'vp-3', input: [' '], expectedOutput: true }
    ],
    hiddenTestCases: [
      { id: 'vp-h1', input: ['0P'], expectedOutput: false, isHidden: true },
      { id: 'vp-h2', input: ['a.'], expectedOutput: true, isHidden: true }
    ],
    hints: [
      'Two pointers moving towards each other can compare characters while skipping non-alphanumeric chars.'
    ],
    solutionExplanation: `Use two pointers \`left\` and \`right\`. Skip non-alphanumeric characters, compare case-insensitive equality, and advance pointers until they meet.

- **Time Complexity:** O(n)
- **Space Complexity:** O(1)`,
    timeLimitMs: 2000,
    memoryLimitMb: 128,
    acceptanceRate: 46.1,
    totalSubmissions: 310000,
    acceptedSubmissions: 142910
  },
  {
    id: 'p-two-sum-ii',
    slug: 'two-sum-ii-input-array-is-sorted',
    title: 'Two Sum II - Input Array Is Sorted',
    difficulty: 'Medium',
    category: 'Two Pointers',
    tags: ['Array', 'Two Pointers', 'Binary Search'],
    functionName: 'twoSum',
    paramNames: ['numbers', 'target'],
    description: `Given a **1-indexed** array of integers \`numbers\` that is already **sorted in non-decreasing order**, find two numbers such that they add up to a specific \`target\` number.

Return *the indices of the two numbers,* \`index1\` *and* \`index2\`, *added by one as an integer array* \`[index1, index2]\` *of length 2*.

The tests are generated such that there is **exactly one solution**. You **may not** use the same element twice.

Your solution must use only constant extra space.

### Example 1:
\`\`\`
Input: numbers = [2,7,11,15], target = 9
Output: [1,2]
Explanation: The sum of 2 and 7 is 9. Therefore, index1 = 1, index2 = 2. We return [1, 2].
\`\`\`

### Example 2:
\`\`\`
Input: numbers = [2,3,4], target = 6
Output: [1,3]
\`\`\`

### Example 3:
\`\`\`
Input: numbers = [-1,0], target = -1
Output: [1,2]
\`\`\`

### Constraints:
- \`2 <= numbers.length <= 3 * 10^4\`
- \`-1000 <= numbers[i] <= 1000\`
- \`numbers\` is sorted in **non-decreasing order**.
- \`-1000 <= target <= 1000\`
- The tests are generated such that there is **exactly one solution**.
`,
    starterCode: {
      javascript: `/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
function twoSum(numbers, target) {
  let left = 0;
  let right = numbers.length - 1;
  while (left < right) {
    const sum = numbers[left] + numbers[right];
    if (sum === target) return [left + 1, right + 1];
    if (sum < target) left++;
    else right--;
  }
  return [];
}`,
      python: `class Solution:
    def twoSum(self, numbers: list[int], target: int) -> list[int]:
        left, right = 0, len(numbers) - 1
        while left < right:
            s = numbers[left] + numbers[right]
            if s == target:
                return [left + 1, right + 1]
            elif s < target:
                left += 1
            else:
                right -= 1
        return []`,
      cpp: `#include <vector>
using namespace std;

class Solution {
public:
    vector<int> twoSum(vector<int>& numbers, int target) {
        int left = 0, right = numbers.size() - 1;
        while (left < right) {
            int sum = numbers[left] + numbers[right];
            if (sum == target) return {left + 1, right + 1};
            if (sum < target) left++;
            else right--;
        }
        return {};
    }
};`,
      java: `class Solution {
    public int[] twoSum(int[] numbers, int target) {
        int left = 0, right = numbers.length - 1;
        while (left < right) {
            int sum = numbers[left] + numbers[right];
            if (sum == target) return new int[]{left + 1, right + 1};
            if (sum < target) left++;
            else right--;
        }
        return new int[]{};
    }
}`
    },
    sampleTestCases: [
      { id: 'ts2-1', input: [[2, 7, 11, 15], 9], expectedOutput: [1, 2] },
      { id: 'ts2-2', input: [[2, 3, 4], 6], expectedOutput: [1, 3] },
      { id: 'ts2-3', input: [[-1, 0], -1], expectedOutput: [1, 2] }
    ],
    hiddenTestCases: [
      { id: 'ts2-h1', input: [[1, 2, 3, 4, 4, 9, 56, 90], 8], expectedOutput: [4, 5], isHidden: true }
    ],
    hints: [
      'Take advantage of the sorted property using two pointers at opposite ends.'
    ],
    solutionExplanation: `Because the array is sorted, start one pointer at the start and one at the end. If their sum is less than target, increment left. If greater, decrement right.

- **Time Complexity:** O(n)
- **Space Complexity:** O(1)`,
    timeLimitMs: 2000,
    memoryLimitMb: 128,
    acceptanceRate: 60.5,
    totalSubmissions: 200000,
    acceptedSubmissions: 121000
  },
  {
    id: 'p-3sum',
    slug: '3sum',
    title: '3Sum',
    difficulty: 'Medium',
    category: 'Two Pointers',
    tags: ['Array', 'Two Pointers', 'Sorting'],
    functionName: 'threeSum',
    paramNames: ['nums'],
    description: `Given an integer array nums, return all the triplets \`[nums[i], nums[j], nums[k]]\` such that \`i != j\`, \`i != k\`, and \`j != k\`, and \`nums[i] + nums[j] + nums[k] == 0\`.

Notice that the solution set must not contain duplicate triplets.

### Example 1:
\`\`\`
Input: nums = [-1,0,1,2,-1,-4]
Output: [[-1,-1,2],[-1,0,1]]
Explanation: 
nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0.
nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0.
nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0.
The distinct triplets are [-1,0,1] and [-1,-1,2].
\`\`\`

### Example 2:
\`\`\`
Input: nums = [0,1,1]
Output: []
Explanation: The only possible triplet does not sum up to 0.
\`\`\`

### Example 3:
\`\`\`
Input: nums = [0,0,0]
Output: [[0,0,0]]
\`\`\`

### Constraints:
- \`3 <= nums.length <= 3000\`
- \`-10^5 <= nums[i] <= 10^5\`
`,
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @return {number[][]}
 */
function threeSum(nums) {
  nums.sort((a, b) => a - b);
  const res = [];

  for (let i = 0; i < nums.length - 2; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue;
    let left = i + 1;
    let right = nums.length - 1;

    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];
      if (sum === 0) {
        res.push([nums[i], nums[left], nums[right]]);
        while (left < right && nums[left] === nums[left + 1]) left++;
        while (left < right && nums[right] === nums[right - 1]) right--;
        left++;
        right--;
      } else if (sum < 0) {
        left++;
      } else {
        right--;
      }
    }
  }
  return res;
}`,
      python: `class Solution:
    def threeSum(self, nums: list[int]) -> list[list[int]]:
        nums.sort()
        res = []
        for i in range(len(nums) - 2):
            if i > 0 and nums[i] == nums[i - 1]:
                continue
            left, right = i + 1, len(nums) - 1
            while left < right:
                s = nums[i] + nums[left] + nums[right]
                if s == 0:
                    res.append([nums[i], nums[left], nums[right]])
                    while left < right and nums[left] == nums[left + 1]:
                        left += 1
                    while left < right and nums[right] == nums[right - 1]:
                        right -= 1
                    left += 1
                    right -= 1
                elif s < 0:
                    left += 1
                else:
                    right -= 1
        return res`,
      cpp: `#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    vector<vector<int>> threeSum(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        vector<vector<int>> res;
        int n = nums.size();

        for (int i = 0; i < n - 2; i++) {
            if (i > 0 && nums[i] == nums[i - 1]) continue;
            int left = i + 1, right = n - 1;
            while (left < right) {
                int sum = nums[i] + nums[left] + nums[right];
                if (sum == 0) {
                    res.push_back({nums[i], nums[left], nums[right]});
                    while (left < right && nums[left] == nums[left + 1]) left++;
                    while (left < right && nums[right] == nums[right - 1]) right--;
                    left++;
                    right--;
                } else if (sum < 0) {
                    left++;
                } else {
                    right--;
                }
            }
        }
        return res;
    }
};`,
      java: `import java.util.*;

class Solution {
    public List<List<Integer>> threeSum(int[] nums) {
        Arrays.sort(nums);
        List<List<Integer>> res = new ArrayList<>();
        int n = nums.length;

        for (int i = 0; i < n - 2; i++) {
            if (i > 0 && nums[i] == nums[i - 1]) continue;
            int left = i + 1, right = n - 1;
            while (left < right) {
                int sum = nums[i] + nums[left] + nums[right];
                if (sum == 0) {
                    res.add(Arrays.asList(nums[i], nums[left], nums[right]));
                    while (left < right && nums[left] == nums[left + 1]) left++;
                    while (left < right && nums[right] == nums[right - 1]) right--;
                    left++;
                    right--;
                } else if (sum < 0) {
                    left++;
                } else {
                    right--;
                }
            }
        }
        return res;
    }
}`
    },
    sampleTestCases: [
      { id: '3s-1', input: [[-1, 0, 1, 2, -1, -4]], expectedOutput: [[-1, -1, 2], [-1, 0, 1]] },
      { id: '3s-2', input: [[0, 1, 1]], expectedOutput: [] },
      { id: '3s-3', input: [[0, 0, 0]], expectedOutput: [[0, 0, 0]] }
    ],
    hiddenTestCases: [
      { id: '3s-h1', input: [[-2, 0, 1, 1, 2]], expectedOutput: [[-2, 0, 2], [-2, 1, 1]], isHidden: true }
    ],
    hints: [
      'Sort the array first so you can skip duplicates and use two pointers for each element.'
    ],
    solutionExplanation: `Sort the array in ascending order. Fix the first number \`nums[i]\`, and use two pointers \`left\` and \`right\` to find pairs summing to \`-nums[i]\`. Skip duplicates for both \`i\`, \`left\`, and \`right\`.

- **Time Complexity:** O(n²)
- **Space Complexity:** O(1) auxiliary space (excluding output)`,
    timeLimitMs: 2500,
    memoryLimitMb: 128,
    acceptanceRate: 34.2,
    totalSubmissions: 250000,
    acceptedSubmissions: 85500
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
    description: `You are given an integer array \`height\` of length \`n\`. There are \`n\` vertical lines drawn such that the two endpoints of the \`i-th\` line are \`(i, 0)\` and \`(i, height[i])\`.

Find two lines that together with the x-axis form a container, such that the container contains the most water.

Return *the maximum amount of water a container can store*.

**Notice** that you may not slant the container.

### Example 1:
\`\`\`
Input: height = [1,8,6,2,5,4,8,3,7]
Output: 49
Explanation: The vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water the container can contain is 49.
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
    starterCode: {
      javascript: `/**
 * @param {number[]} height
 * @return {number}
 */
function maxArea(height) {
  let left = 0;
  let right = height.length - 1;
  let maxW = 0;

  while (left < right) {
    const h = Math.min(height[left], height[right]);
    const area = h * (right - left);
    if (area > maxW) maxW = area;
    if (height[left] < height[right]) {
      left++;
    } else {
      right--;
    }
  }
  return maxW;
}`,
      python: `class Solution:
    def maxArea(self, height: list[int]) -> int:
        left, right = 0, len(height) - 1
        max_water = 0
        while left < right:
            h = min(height[left], height[right])
            max_water = max(max_water, h * (right - left))
            if height[left] < height[right]:
                left += 1
            else:
                right -= 1
        return max_water`,
      cpp: `#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int maxArea(vector<int>& height) {
        int left = 0, right = height.size() - 1;
        int max_water = 0;
        while (left < right) {
            int h = min(height[left], height[right]);
            max_water = max(max_water, h * (right - left));
            if (height[left] < height[right]) left++;
            else right--;
        }
        return max_water;
    }
};`,
      java: `class Solution {
    public int maxArea(int[] height) {
        int left = 0, right = height.length - 1;
        int maxWater = 0;
        while (left < right) {
            int h = Math.min(height[left], height[right]);
            maxWater = Math.max(maxWater, h * (right - left));
            if (height[left] < height[right]) left++;
            else right--;
        }
        return maxWater;
    }
}`
    },
    sampleTestCases: [
      { id: 'cwmw-1', input: [[1, 8, 6, 2, 5, 4, 8, 3, 7]], expectedOutput: 49 },
      { id: 'cwmw-2', input: [[1, 1]], expectedOutput: 1 }
    ],
    hiddenTestCases: [
      { id: 'cwmw-h1', input: [[4, 3, 2, 1, 4]], expectedOutput: 16, isHidden: true },
      { id: 'cwmw-h2', input: [[1, 2, 1]], expectedOutput: 2, isHidden: true }
    ],
    hints: [
      'The width always decreases as we move inwards. To find a larger area, we must find a larger height.',
      'Always move the pointer pointing to the shorter line.'
    ],
    solutionExplanation: `Start with the widest container using pointers at ends. Move the pointer that has the smaller height, since the water capacity is limited by the shorter line.

- **Time Complexity:** O(n)
- **Space Complexity:** O(1)`,
    timeLimitMs: 2000,
    memoryLimitMb: 128,
    acceptanceRate: 54.8,
    totalSubmissions: 180000,
    acceptedSubmissions: 98640
  },
  {
    id: 'p-trapping-rain-water',
    slug: 'trapping-rain-water',
    title: 'Trapping Rain Water',
    difficulty: 'Hard',
    category: 'Two Pointers',
    tags: ['Array', 'Two Pointers', 'Dynamic Programming', 'Stack', 'Monotonic Stack'],
    functionName: 'trap',
    paramNames: ['height'],
    description: `Given \`n\` non-negative integers representing an elevation map where the width of each bar is \`1\`, compute how much water it can trap after raining.

### Example 1:
\`\`\`
Input: height = [0,1,0,2,1,0,1,3,2,1,2,1]
Output: 6
Explanation: The elevation map [0,1,0,2,1,0,1,3,2,1,2,1] can trap 6 units of rain water.
\`\`\`

### Example 2:
\`\`\`
Input: height = [4,2,0,3,2,5]
Output: 9
\`\`\`

### Constraints:
- \`n == height.length\`
- \`1 <= n <= 2 * 10^4\`
- \`0 <= height[i] <= 10^5\`
`,
    starterCode: {
      javascript: `/**
 * @param {number[]} height
 * @return {number}
 */
function trap(height) {
  let left = 0, right = height.length - 1;
  let leftMax = 0, rightMax = 0;
  let total = 0;

  while (left < right) {
    if (height[left] < height[right]) {
      if (height[left] >= leftMax) {
        leftMax = height[left];
      } else {
        total += leftMax - height[left];
      }
      left++;
    } else {
      if (height[right] >= rightMax) {
        rightMax = height[right];
      } else {
        total += rightMax - height[right];
      }
      right--;
    }
  }
  return total;
}`,
      python: `class Solution:
    def trap(self, height: list[int]) -> int:
        if not height:
            return 0
        left, right = 0, len(height) - 1
        left_max, right_max = 0, 0
        total = 0
        while left < right:
            if height[left] < height[right]:
                if height[left] >= left_max:
                    left_max = height[left]
                else:
                    total += left_max - height[left]
                left += 1
            else:
                if height[right] >= right_max:
                    right_max = height[right]
                else:
                    total += right_max - height[right]
                right -= 1
        return total`,
      cpp: `#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int trap(vector<int>& height) {
        int left = 0, right = height.size() - 1;
        int left_max = 0, right_max = 0;
        int total = 0;
        while (left < right) {
            if (height[left] < height[right]) {
                if (height[left] >= left_max) left_max = height[left];
                else total += left_max - height[left];
                left++;
            } else {
                if (height[right] >= right_max) right_max = height[right];
                else total += right_max - height[right];
                right--;
            }
        }
        return total;
    }
};`,
      java: `class Solution {
    public int trap(int[] height) {
        int left = 0, right = height.length - 1;
        int leftMax = 0, rightMax = 0;
        int total = 0;
        while (left < right) {
            if (height[left] < height[right]) {
                if (height[left] >= leftMax) leftMax = height[left];
                else total += leftMax - height[left];
                left++;
            } else {
                if (height[right] >= rightMax) rightMax = height[right];
                else total += rightMax - height[right];
                right--;
            }
        }
        return total;
    }
}`
    },
    sampleTestCases: [
      { id: 'trw-1', input: [[0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]], expectedOutput: 6 },
      { id: 'trw-2', input: [[4, 2, 0, 3, 2, 5]], expectedOutput: 9 }
    ],
    hiddenTestCases: [
      { id: 'trw-h1', input: [[3, 0, 2, 0, 4]], expectedOutput: 7, isHidden: true },
      { id: 'trw-h2', input: [[2, 0, 2]], expectedOutput: 2, isHidden: true }
    ],
    hints: [
      'The water trapped at index i is determined by min(max_left, max_right) - height[i].',
      'Can you compute this in O(1) space using two pointers?'
    ],
    solutionExplanation: `Maintain \`leftMax\` and \`rightMax\`. If \`height[left] < height[right]\`, we know the right boundary is taller, so water at \`left\` is bounded strictly by \`leftMax - height[left]\`. Advance \`left\`. Otherwise advance \`right\`.

- **Time Complexity:** O(n)
- **Space Complexity:** O(1)`,
    timeLimitMs: 2000,
    memoryLimitMb: 128,
    acceptanceRate: 60.1,
    totalSubmissions: 140000,
    acceptedSubmissions: 84140
  },
  {
    id: 'p-move-zeroes',
    slug: 'move-zeroes',
    title: 'Move Zeroes',
    difficulty: 'Easy',
    category: 'Two Pointers',
    tags: ['Array', 'Two Pointers'],
    functionName: 'moveZeroes',
    paramNames: ['nums'],
    description: `Given an integer array \`nums\`, move all \`0\`'s to the end of it while maintaining the relative order of the non-zero elements.

**Note** that you must do this in-place without making a copy of the array.

### Example 1:
\`\`\`
Input: nums = [0,1,0,3,12]
Output: [1,3,12,0,0]
\`\`\`

### Example 2:
\`\`\`
Input: nums = [0]
Output: [0]
\`\`\`

### Constraints:
- \`1 <= nums.length <= 10^4\`
- \`-2^31 <= nums[i] <= 2^31 - 1\`
`,
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @return {number[]}
 */
function moveZeroes(nums) {
  let insertPos = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      const temp = nums[insertPos];
      nums[insertPos] = nums[i];
      nums[i] = temp;
      insertPos++;
    }
  }
  return nums;
}`,
      python: `class Solution:
    def moveZeroes(self, nums: list[int]) -> list[int]:
        insert_pos = 0
        for i in range(len(nums)):
            if nums[i] != 0:
                nums[insert_pos], nums[i] = nums[i], nums[insert_pos]
                insert_pos += 1
        return nums`,
      cpp: `#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    vector<int> moveZeroes(vector<int>& nums) {
        int insertPos = 0;
        for (int i = 0; i < nums.size(); i++) {
            if (nums[i] != 0) {
                swap(nums[insertPos], nums[i]);
                insertPos++;
            }
        }
        return nums;
    }
};`,
      java: `class Solution {
    public int[] moveZeroes(int[] nums) {
        int insertPos = 0;
        for (int i = 0; i < nums.length; i++) {
            if (nums[i] != 0) {
                int temp = nums[insertPos];
                nums[insertPos] = nums[i];
                nums[i] = temp;
                insertPos++;
            }
        }
        return nums;
    }
}`
    },
    sampleTestCases: [
      { id: 'mz-1', input: [[0, 1, 0, 3, 12]], expectedOutput: [1, 3, 12, 0, 0] },
      { id: 'mz-2', input: [[0]], expectedOutput: [0] }
    ],
    hiddenTestCases: [
      { id: 'mz-h1', input: [[1, 2, 3]], expectedOutput: [1, 2, 3], isHidden: true },
      { id: 'mz-h2', input: [[0, 0, 1]], expectedOutput: [1, 0, 0], isHidden: true }
    ],
    hints: [
      'Maintain an index for the next non-zero element to place.'
    ],
    solutionExplanation: `Use a two-pointer approach: pointer \`insertPos\` keeps track of the boundary for non-zero elements. Whenever a non-zero element is encountered, swap it with \`nums[insertPos]\` and advance \`insertPos\`.

- **Time Complexity:** O(n)
- **Space Complexity:** O(1)`,
    timeLimitMs: 2000,
    memoryLimitMb: 128,
    acceptanceRate: 61.8,
    totalSubmissions: 290000,
    acceptedSubmissions: 179220
  }
];
