import { Problem } from '../../types';

export const GREEDY_INTERVALS_PROBLEMS: Problem[] = [
  {
    id: 'p-maximum-subarray',
    slug: 'maximum-subarray',
    title: 'Maximum Subarray',
    difficulty: 'Medium',
    category: 'Greedy',
    tags: ['Array', 'Divide and Conquer', 'Dynamic Programming'],
    functionName: 'maxSubArray',
    paramNames: ['nums'],
    description: `Given an integer array \`nums\`, find the subarray with the largest sum, and return *its sum*.

### Example 1:
\`\`\`
Input: nums = [-2,1,-3,4,-1,2,1,-5,4]
Output: 6
Explanation: The subarray [4,-1,2,1] has the largest sum 6.
\`\`\`

### Example 2:
\`\`\`
Input: nums = [1]
Output: 1
\`\`\`

### Example 3:
\`\`\`
Input: nums = [5,4,-1,7,8]
Output: 23
\`\`\`

### Constraints:
- \`1 <= nums.length <= 10^5\`
- \`-10^4 <= nums[i] <= 10^4\`
`,
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @return {number}
 */
function maxSubArray(nums) {
  let maxSum = nums[0];
  let curSum = 0;

  for (const n of nums) {
    if (curSum < 0) curSum = 0;
    curSum += n;
    maxSum = Math.max(maxSum, curSum);
  }
  return maxSum;
}`,
      python: `class Solution:
    def maxSubArray(self, nums: list[int]) -> int:
        max_sum = nums[0]
        cur_sum = 0
        for n in nums:
            if cur_sum < 0:
                cur_sum = 0
            cur_sum += n
            max_sum = max(max_sum, cur_sum)
        return max_sum`,
      cpp: `#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int maxSubArray(vector<int>& nums) {
        int max_sum = nums[0];
        int cur_sum = 0;
        for (int n : nums) {
            if (cur_sum < 0) cur_sum = 0;
            cur_sum += n;
            max_sum = max(max_sum, cur_sum);
        }
        return max_sum;
    }
};`,
      java: `class Solution {
    public int maxSubArray(int[] nums) {
        int maxSum = nums[0];
        int curSum = 0;
        for (int n : nums) {
            if (curSum < 0) curSum = 0;
            curSum += n;
            maxSum = Math.max(maxSum, curSum);
        }
        return maxSum;
    }
}`
    },
    sampleTestCases: [
      { id: 'ms-1', input: [[-2, 1, -3, 4, -1, 2, 1, -5, 4]], expectedOutput: 6 },
      { id: 'ms-2', input: [[1]], expectedOutput: 1 },
      { id: 'ms-3', input: [[5, 4, -1, 7, 8]], expectedOutput: 23 }
    ],
    hiddenTestCases: [
      { id: 'ms-h1', input: [[-1]], expectedOutput: -1, isHidden: true },
      { id: 'ms-h2', input: [[-2, -1]], expectedOutput: -1, isHidden: true }
    ],
    hints: [
      "Kadane's algorithm: whenever the accumulated sum drops below 0, reset it to 0."
    ],
    solutionExplanation: `Kadane's Algorithm maintains a running sum \`curSum\`. If \`curSum\` drops below 0, reset it to 0 before adding the current element. Update \`maxSum\` at each step.

- **Time Complexity:** O(n)
- **Space Complexity:** O(1)`,
    timeLimitMs: 2000,
    memoryLimitMb: 128,
    acceptanceRate: 50.4,
    totalSubmissions: 350000,
    acceptedSubmissions: 176400
  },
  {
    id: 'p-jump-game',
    slug: 'jump-game',
    title: 'Jump Game',
    difficulty: 'Medium',
    category: 'Greedy',
    tags: ['Array', 'Dynamic Programming', 'Greedy'],
    functionName: 'canJump',
    paramNames: ['nums'],
    description: `You are given an integer array \`nums\`. You are initially positioned at the array's **first index**, and each element in the array represents your maximum jump length at that position.

Return \`true\` *if you can reach the last index, or* \`false\` *otherwise*.

### Example 1:
\`\`\`
Input: nums = [2,3,1,1,4]
Output: true
Explanation: Jump 1 step from index 0 to 1, then 3 steps to the last index.
\`\`\`

### Example 2:
\`\`\`
Input: nums = [3,2,1,0,4]
Output: false
Explanation: You will always arrive at index 3 no matter what. Its maximum jump length is 0, which makes it impossible to reach the last index.
\`\`\`

### Constraints:
- \`1 <= nums.length <= 10^4\`
- \`0 <= nums[i] <= 10^5\`
`,
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @return {boolean}
 */
function canJump(nums) {
  let goal = nums.length - 1;
  for (let i = nums.length - 2; i >= 0; i--) {
    if (i + nums[i] >= goal) {
      goal = i;
    }
  }
  return goal === 0;
}`,
      python: `class Solution:
    def canJump(self, nums: list[int]) -> bool:
        goal = len(nums) - 1
        for i in range(len(nums) - 2, -1, -1):
            if i + nums[i] >= goal:
                goal = i
        return goal == 0`,
      cpp: `#include <vector>
using namespace std;

class Solution {
public:
    bool canJump(vector<int>& nums) {
        int goal = nums.size() - 1;
        for (int i = nums.size() - 2; i >= 0; i--) {
            if (i + nums[i] >= goal) {
                goal = i;
            }
        }
        return goal == 0;
    }
};`,
      java: `class Solution {
    public boolean canJump(int[] nums) {
        int goal = nums.length - 1;
        for (int i = nums.length - 2; i >= 0; i--) {
            if (i + nums[i] >= goal) {
                goal = i;
            }
        }
        return goal == 0;
    }
}`
    },
    sampleTestCases: [
      { id: 'jg-1', input: [[2, 3, 1, 1, 4]], expectedOutput: true },
      { id: 'jg-2', input: [[3, 2, 1, 0, 4]], expectedOutput: false }
    ],
    hiddenTestCases: [
      { id: 'jg-h1', input: [[0]], expectedOutput: true, isHidden: true },
      { id: 'jg-h2', input: [[2, 0, 0]], expectedOutput: true, isHidden: true }
    ],
    hints: [
      'Iterate backwards and move the target goal index towards 0.'
    ],
    solutionExplanation: `Greedy backwards approach: Start with \`goal = len(nums) - 1\`. If index \`i + nums[i] >= goal\`, then index \`i\` can reach the goal, so we shift \`goal = i\`. At the end, check if \`goal == 0\`.

- **Time Complexity:** O(n)
- **Space Complexity:** O(1)`,
    timeLimitMs: 2000,
    memoryLimitMb: 128,
    acceptanceRate: 38.9,
    totalSubmissions: 250000,
    acceptedSubmissions: 97250
  },
  {
    id: 'p-jump-game-ii',
    slug: 'jump-game-ii',
    title: 'Jump Game II',
    difficulty: 'Medium',
    category: 'Greedy',
    tags: ['Array', 'Dynamic Programming', 'Greedy'],
    functionName: 'jump',
    paramNames: ['nums'],
    description: `You are given a **0-indexed** array of integers \`nums\` of length \`n\`. You are initially positioned at \`nums[0]\`.

Each element \`nums[i]\` represents the maximum length of a forward jump from index \`i\`. In other words, if you are at \`nums[i]\`, you can jump to any \`nums[i + j]\` where:
- \`0 <= j <= nums[i]\` and
- \`i + j < n\`

Return *the minimum number of jumps to reach* \`nums[n - 1]\`. The test cases are generated such that you can reach \`nums[n - 1]\`.

### Example 1:
\`\`\`
Input: nums = [2,3,1,1,4]
Output: 2
Explanation: The minimum number of jumps to reach the last index is 2. Jump 1 step from index 0 to 1, then 3 steps to the last index.
\`\`\`

### Example 2:
\`\`\`
Input: nums = [2,3,0,1,4]
Output: 2
\`\`\`

### Constraints:
- \`1 <= nums.length <= 10^4\`
- \`0 <= nums[i] <= 1000\`
- It's guaranteed that you can reach \`nums[n - 1]\`.
`,
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @return {number}
 */
function jump(nums) {
  let jumps = 0, curEnd = 0, farthest = 0;
  for (let i = 0; i < nums.length - 1; i++) {
    farthest = Math.max(farthest, i + nums[i]);
    if (i === curEnd) {
      jumps++;
      curEnd = farthest;
    }
  }
  return jumps;
}`,
      python: `class Solution:
    def jump(self, nums: list[int]) -> int:
        jumps, cur_end, farthest = 0, 0, 0
        for i in range(len(nums) - 1):
            farthest = max(farthest, i + nums[i])
            if i == cur_end:
                jumps += 1
                cur_end = farthest
        return jumps`,
      cpp: `#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int jump(vector<int>& nums) {
        int jumps = 0, curEnd = 0, farthest = 0;
        for (int i = 0; i < nums.size() - 1; i++) {
            farthest = max(farthest, i + nums[i]);
            if (i == curEnd) {
                jumps++;
                curEnd = farthest;
            }
        }
        return jumps;
    }
};`,
      java: `class Solution {
    public int jump(int[] nums) {
        int jumps = 0, curEnd = 0, farthest = 0;
        for (int i = 0; i < nums.length - 1; i++) {
            farthest = Math.max(farthest, i + nums[i]);
            if (i == curEnd) {
                jumps++;
                curEnd = farthest;
            }
        }
        return jumps;
    }
}`
    },
    sampleTestCases: [
      { id: 'jg2-1', input: [[2, 3, 1, 1, 4]], expectedOutput: 2 },
      { id: 'jg2-2', input: [[2, 3, 0, 1, 4]], expectedOutput: 2 }
    ],
    hiddenTestCases: [
      { id: 'jg2-h1', input: [[1]], expectedOutput: 0, isHidden: true },
      { id: 'jg2-h2', input: [[7, 0, 9, 6, 9, 6, 1, 7, 9, 0, 1, 2, 9, 0, 3]], expectedOutput: 2, isHidden: true }
    ],
    hints: [
      'Think of this as BFS where each jump level covers the interval [curEnd + 1, farthest].'
    ],
    solutionExplanation: `BFS / Greedy: Maintain current jump window \`[i, curEnd]\`. Calculate the farthest reach reachable from this window. When index reaches \`curEnd\`, increment jump count and update \`curEnd = farthest\`.

- **Time Complexity:** O(n)
- **Space Complexity:** O(1)`,
    timeLimitMs: 2000,
    memoryLimitMb: 128,
    acceptanceRate: 44.5,
    totalSubmissions: 180000,
    acceptedSubmissions: 80100
  },
  {
    id: 'p-merge-intervals',
    slug: 'merge-intervals',
    title: 'Merge Intervals',
    difficulty: 'Medium',
    category: 'Intervals',
    tags: ['Array', 'Sorting'],
    functionName: 'merge',
    paramNames: ['intervals'],
    description: `Given an array of \`intervals\` where \`intervals[i] = [start_i, end_i]\`, merge all overlapping intervals, and return *an array of the non-overlapping intervals that cover all the intervals in the input*.

### Example 1:
\`\`\`
Input: intervals = [[1,3],[2,6],[8,10],[15,18]]
Output: [[1,6],[8,10],[15,18]]
Explanation: Since intervals [1,3] and [2,6] overlap, merge them into [1,6].
\`\`\`

### Example 2:
\`\`\`
Input: intervals = [[1,4],[4,5]]
Output: [[1,5]]
Explanation: Intervals [1,4] and [4,5] are considered overlapping.
\`\`\`

### Constraints:
- \`1 <= intervals.length <= 10^4\`
- \`intervals[i].length == 2\`
- \`0 <= start_i <= end_i <= 10^4\`
`,
    starterCode: {
      javascript: `/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
function merge(intervals) {
  if (intervals.length <= 1) return intervals;
  intervals.sort((a, b) => a[0] - b[0]);

  const merged = [intervals[0]];
  for (let i = 1; i < intervals.length; i++) {
    const last = merged[merged.length - 1];
    const curr = intervals[i];
    if (curr[0] <= last[1]) {
      last[1] = Math.max(last[1], curr[1]);
    } else {
      merged.push(curr);
    }
  }
  return merged;
}`,
      python: `class Solution:
    def merge(self, intervals: list[list[int]]) -> list[list[int]]:
        intervals.sort(key=lambda x: x[0])
        merged = [intervals[0]]
        for curr in intervals[1:]:
            last = merged[-1]
            if curr[0] <= last[1]:
                last[1] = max(last[1], curr[1])
            else:
                merged.append(curr)
        return merged`,
      cpp: `#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    vector<vector<int>> merge(vector<vector<int>>& intervals) {
        if (intervals.size() <= 1) return intervals;
        sort(intervals.begin(), intervals.end());
        vector<vector<int>> merged;
        merged.push_back(intervals[0]);

        for (size_t i = 1; i < intervals.size(); i++) {
            if (intervals[i][0] <= merged.back()[1]) {
                merged.back()[1] = max(merged.back()[1], intervals[i][1]);
            } else {
                merged.push_back(intervals[i]);
            }
        }
        return merged;
    }
};`,
      java: `import java.util.*;

class Solution {
    public int[][] merge(int[][] intervals) {
        if (intervals.length <= 1) return intervals;
        Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));

        List<int[]> merged = new ArrayList<>();
        merged.add(intervals[0]);

        for (int i = 1; i < intervals.length; i++) {
            int[] last = merged.get(merged.size() - 1);
            if (intervals[i][0] <= last[1]) {
                last[1] = Math.max(last[1], intervals[i][1]);
            } else {
                merged.add(intervals[i]);
            }
        }
        return merged.toArray(new int[merged.size()][]);
    }
}`
    },
    sampleTestCases: [
      { id: 'mi-1', input: [[[1, 3], [2, 6], [8, 10], [15, 18]]], expectedOutput: [[1, 6], [8, 10], [15, 18]] },
      { id: 'mi-2', input: [[[1, 4], [4, 5]]], expectedOutput: [[1, 5]] }
    ],
    hiddenTestCases: [
      { id: 'mi-h1', input: [[[1, 4], [0, 4]]], expectedOutput: [[0, 4]], isHidden: true },
      { id: 'mi-h2', input: [[[1, 4], [2, 3]]], expectedOutput: [[1, 4]], isHidden: true }
    ],
    hints: [
      'Sort intervals by start time first.'
    ],
    solutionExplanation: `Sort intervals by their start points. Iterate through: if the current interval starts before or at the end of the previous interval, merge them by updating \`last[1] = max(last[1], curr[1])\`. Otherwise append as a new interval.

- **Time Complexity:** O(n log n)
- **Space Complexity:** O(n)`,
    timeLimitMs: 2000,
    memoryLimitMb: 128,
    acceptanceRate: 46.8,
    totalSubmissions: 260000,
    acceptedSubmissions: 121680
  },
  {
    id: 'p-insert-interval',
    slug: 'insert-interval',
    title: 'Insert Interval',
    difficulty: 'Medium',
    category: 'Intervals',
    tags: ['Array'],
    functionName: 'insert',
    paramNames: ['intervals', 'newInterval'],
    description: `You are given an array of non-overlapping intervals \`intervals\` where \`intervals[i] = [start_i, end_i]\` represent the start and the end of the \`i-th\` interval and \`intervals\` is sorted in ascending order by \`start_i\`. You are also given an interval \`newInterval = [start, end]\` that represents the start and end of another interval.

Insert \`newInterval\` into \`intervals\` such that \`intervals\` is still sorted in ascending order by \`start_i\` and \`intervals\` still does not have any overlapping intervals (merge overlapping intervals if necessary).

Return \`intervals\` *after the insertion*.

### Example 1:
\`\`\`
Input: intervals = [[1,3],[6,9]], newInterval = [2,5]
Output: [[1,5],[6,9]]
\`\`\`

### Example 2:
\`\`\`
Input: intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]
Output: [[1,2],[3,10],[12,16]]
Explanation: Because the new interval [4,8] overlaps with [3,5],[6,7],[8,10].
\`\`\`

### Constraints:
- \`0 <= intervals.length <= 10^4\`
- \`intervals[i].length == 2\`
- \`0 <= start_i <= end_i <= 10^5\`
- \`intervals\` is sorted by \`start_i\` in **ascending** order.
- \`newInterval.length == 2\`
- \`0 <= start <= end <= 10^5\`
`,
    starterCode: {
      javascript: `/**
 * @param {number[][]} intervals
 * @param {number[]} newInterval
 * @return {number[][]}
 */
function insert(intervals, newInterval) {
  const res = [];
  let i = 0;
  const n = intervals.length;

  // 1. Add all intervals ending before newInterval starts
  while (i < n && intervals[i][1] < newInterval[0]) {
    res.push(intervals[i]);
    i++;
  }

  // 2. Merge all overlapping intervals
  while (i < n && intervals[i][0] <= newInterval[1]) {
    newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
    newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
    i++;
  }
  res.push(newInterval);

  // 3. Add remaining intervals
  while (i < n) {
    res.push(intervals[i]);
    i++;
  }

  return res;
}`,
      python: `class Solution:
    def insert(self, intervals: list[list[int]], newInterval: list[int]) -> list[list[int]]:
        res = []
        i = 0
        n = len(intervals)

        while i < n and intervals[i][1] < newInterval[0]:
            res.append(intervals[i])
            i += 1

        while i < n and intervals[i][0] <= newInterval[1]:
            newInterval[0] = min(newInterval[0], intervals[i][0])
            newInterval[1] = max(newInterval[1], intervals[i][1])
            i += 1
        res.append(newInterval)

        while i < n:
            res.append(intervals[i])
            i += 1

        return res`,
      cpp: `#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    vector<vector<int>> insert(vector<vector<int>>& intervals, vector<int>& newInterval) {
        vector<vector<int>> res;
        int i = 0, n = intervals.size();

        while (i < n && intervals[i][1] < newInterval[0]) {
            res.push_back(intervals[i]);
            i++;
        }

        while (i < n && intervals[i][0] <= newInterval[1]) {
            newInterval[0] = min(newInterval[0], intervals[i][0]);
            newInterval[1] = max(newInterval[1], intervals[i][1]);
            i++;
        }
        res.push_back(newInterval);

        while (i < n) {
            res.push_back(intervals[i]);
            i++;
        }
        return res;
    }
};`,
      java: `import java.util.*;

class Solution {
    public int[][] insert(int[][] intervals, int[] newInterval) {
        List<int[]> res = new ArrayList<>();
        int i = 0, n = intervals.length;

        while (i < n && intervals[i][1] < newInterval[0]) {
            res.add(intervals[i]);
            i++;
        }

        while (i < n && intervals[i][0] <= newInterval[1]) {
            newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
            newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
            i++;
        }
        res.add(newInterval);

        while (i < n) {
            res.add(intervals[i]);
            i++;
        }

        return res.toArray(new int[res.size()][]);
    }
}`
    },
    sampleTestCases: [
      { id: 'ii-1', input: [[[1, 3], [6, 9]], [2, 5]], expectedOutput: [[1, 5], [6, 9]] },
      { id: 'ii-2', input: [[[1, 2], [3, 5], [6, 7], [8, 10], [12, 16]], [4, 8]], expectedOutput: [[1, 2], [3, 10], [12, 16]] }
    ],
    hiddenTestCases: [
      { id: 'ii-h1', input: [[], [5, 7]], expectedOutput: [[5, 7]], isHidden: true },
      { id: 'ii-h2', input: [[[1, 5]], [2, 3]], expectedOutput: [[1, 5]], isHidden: true }
    ],
    hints: [
      'Partition intervals into three segments: before overlap, overlapping, and after overlap.'
    ],
    solutionExplanation: `Linear scan in 3 phases: 1) Add intervals that completely precede \`newInterval\`. 2) Merge all overlapping intervals into \`newInterval\`. 3) Add intervals that completely follow \`newInterval\`.

- **Time Complexity:** O(n)
- **Space Complexity:** O(n)`,
    timeLimitMs: 2000,
    memoryLimitMb: 128,
    acceptanceRate: 39.5,
    totalSubmissions: 175000,
    acceptedSubmissions: 69125
  }
];
