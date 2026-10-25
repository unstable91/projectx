import { Problem } from '../../types';

export const TOP_150_MASTERY_PROBLEMS: Problem[] = [
  {
    id: 'p-asteroid-collision',
    slug: 'asteroid-collision',
    timeLimitMs: 2000,
    memoryLimitMb: 128,
    title: 'Asteroid Collision',
    difficulty: 'Medium',
    category: 'Stack',
    tags: ['Array', 'Stack', 'Simulation'],
    functionName: 'asteroidCollision',
    paramNames: ['asteroids'],
    description: `We are given an array \`asteroids\` of integers representing asteroids in a row.

For each asteroid, the absolute value represents its size, and the sign represents its direction (positive meaning right, negative meaning left). Each asteroid moves at the same speed.

Find out the state of the asteroids after all collisions. If two asteroids meet, the smaller one will explode. If both are the same size, both will explode. Two asteroids moving in the same direction will never meet.

### Example 1:
\`\`\`
Input: asteroids = [5,10,-5]
Output: [5,10]
Explanation: The 10 and -5 collide resulting in 10. The 5 and 10 never collide.
\`\`\`

### Example 2:
\`\`\`
Input: asteroids = [8,-8]
Output: []
Explanation: The 8 and -8 collide and both explode.
\`\`\`

### Example 3:
\`\`\`
Input: asteroids = [10,2,-5]
Output: [10]
Explanation: The 2 and -5 collide resulting in -5. The 10 and -5 collide resulting in 10.
\`\`\`

### Constraints:
- \`2 <= asteroids.length <= 10^4\`
- \`-1000 <= asteroids[i] <= 1000\`
- \`asteroids[i] != 0\`
`,
    starterCode: {
      javascript: `/**
 * @param {number[]} asteroids
 * @return {number[]}
 */
function asteroidCollision(asteroids) {
  const stack = [];
  for (const ast of asteroids) {
    let alive = true;
    while (alive && ast < 0 && stack.length > 0 && stack[stack.length - 1] > 0) {
      const top = stack[stack.length - 1];
      if (top < -ast) {
        stack.pop();
      } else if (top === -ast) {
        stack.pop();
        alive = false;
      } else {
        alive = false;
      }
    }
    if (alive) {
      stack.push(ast);
    }
  }
  return stack;
}`,
      python: `class Solution:
    def asteroidCollision(self, asteroids: list[int]) -> list[int]:
        stack = []
        for ast in asteroids:
            alive = True
            while alive and ast < 0 and stack and stack[-1] > 0:
                top = stack[-1]
                if top < -ast:
                    stack.pop()
                elif top == -ast:
                    stack.pop()
                    alive = False
                else:
                    alive = False
            if alive:
                stack.append(ast)
        return stack`,
      cpp: `#include <vector>
using namespace std;

class Solution {
public:
    vector<int> asteroidCollision(vector<int>& asteroids) {
        vector<int> stack;
        for (int ast : asteroids) {
            bool alive = true;
            while (alive && ast < 0 && !stack.empty() && stack.back() > 0) {
                int top = stack.back();
                if (top < -ast) {
                    stack.pop_back();
                } else if (top == -ast) {
                    stack.pop_back();
                    alive = false;
                } else {
                    alive = false;
                }
            }
            if (alive) {
                stack.push_back(ast);
            }
        }
        return stack;
    }
};`,
      java: `import java.util.*;

class Solution {
    public int[] asteroidCollision(int[] asteroids) {
        Deque<Integer> stack = new ArrayDeque<>();
        for (int ast : asteroids) {
            boolean alive = true;
            while (alive && ast < 0 && !stack.isEmpty() && stack.peek() > 0) {
                int top = stack.peek();
                if (top < -ast) {
                    stack.pop();
                } else if (top == -ast) {
                    stack.pop();
                    alive = false;
                } else {
                    alive = false;
                }
            }
            if (alive) {
                stack.push(ast);
            }
        }
        int[] res = new int[stack.size()];
        for (int i = res.length - 1; i >= 0; i--) {
            res[i] = stack.pop();
        }
        return res;
    }
}`
    },
    sampleTestCases: [
      { id: 'ac-1', input: [[5, 10, -5]], expectedOutput: [5, 10] },
      { id: 'ac-2', input: [[8, -8]], expectedOutput: [] },
      { id: 'ac-3', input: [[10, 2, -5]], expectedOutput: [10] }
    ],
    hiddenTestCases: [
      { id: 'ac-h1', input: [[-2, -1, 1, 2]], expectedOutput: [-2, -1, 1, 2], isHidden: true }
    ],
    hints: ['Collision occurs only when a moving-left asteroid encounters a moving-right asteroid on top of stack.'],
    solutionExplanation: `Stack simulation: Positive asteroids always push. When a negative asteroid arrives and previous is positive, resolve collisions iteratively until destroyed or surviving.

- **Time Complexity:** O(n)
- **Space Complexity:** O(n)`,
  },

  {
    id: 'p-largest-rectangle-in-histogram',
    slug: 'largest-rectangle-in-histogram',
    timeLimitMs: 2000,
    memoryLimitMb: 128,
    title: 'Largest Rectangle in Histogram',
    difficulty: 'Hard',
    category: 'Stack',
    tags: ['Array', 'Stack', 'Monotonic Stack'],
    functionName: 'largestRectangleArea',
    paramNames: ['heights'],
    description: `Given an array of integers \`heights\` representing the histogram's bar height where the width of each bar is \`1\`, return *the area of the largest rectangle in the histogram*.

### Example 1:
\`\`\`
Input: heights = [2,1,5,6,2,3]
Output: 10
Explanation: The largest rectangle is shown in the red area, which has an area = 10 units (height 5 and width 2).
\`\`\`

### Example 2:
\`\`\`
Input: heights = [2,4]
Output: 4
\`\`\`

### Constraints:
- \`1 <= heights.length <= 10^5\`
- \`0 <= heights[i] <= 10^4\`
`,
    starterCode: {
      javascript: `/**
 * @param {number[]} heights
 * @return {number}
 */
function largestRectangleArea(heights) {
  const stack = []; // index
  let maxArea = 0;
  const h = [...heights, 0];
  for (let i = 0; i < h.length; i++) {
    while (stack.length > 0 && h[stack[stack.length - 1]] > h[i]) {
      const height = h[stack.pop()];
      const width = stack.length === 0 ? i : i - stack[stack.length - 1] - 1;
      maxArea = Math.max(maxArea, height * width);
    }
    stack.push(i);
  }
  return maxArea;
}`,
      python: `class Solution:
    def largestRectangleArea(self, heights: list[int]) -> int:
        stack = []
        max_area = 0
        h = heights + [0]
        for i, val in enumerate(h):
            while stack and h[stack[-1]] > val:
                height = h[stack.pop()]
                width = i if not stack else i - stack[-1] - 1
                max_area = max(max_area, height * width)
            stack.append(i)
        return max_area`,
      cpp: `#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int largestRectangleArea(vector<int>& heights) {
        vector<int> h = heights;
        h.push_back(0);
        vector<int> stack;
        int maxArea = 0;
        for (int i = 0; i < (int)h.size(); i++) {
            while (!stack.empty() && h[stack.back()] > h[i]) {
                int height = h[stack.back()];
                stack.pop_back();
                int width = stack.empty() ? i : i - stack.back() - 1;
                maxArea = max(maxArea, height * width);
            }
            stack.push_back(i);
        }
        return maxArea;
    }
};`,
      java: `import java.util.*;

class Solution {
    public int largestRectangleArea(int[] heights) {
        int n = heights.length;
        int[] h = new int[n + 1];
        System.arraycopy(heights, 0, h, 0, n);
        h[n] = 0;
        Deque<Integer> stack = new ArrayDeque<>();
        int maxArea = 0;
        for (int i = 0; i <= n; i++) {
            while (!stack.isEmpty() && h[stack.peek()] > h[i]) {
                int height = h[stack.pop()];
                int width = stack.isEmpty() ? i : i - stack.peek() - 1;
                maxArea = Math.max(maxArea, height * width);
            }
            stack.push(i);
        }
        return maxArea;
    }
}`
    },
    sampleTestCases: [
      { id: 'lrh-1', input: [[2, 1, 5, 6, 2, 3]], expectedOutput: 10 },
      { id: 'lrh-2', input: [[2, 4]], expectedOutput: 4 }
    ],
    hiddenTestCases: [
      { id: 'lrh-h1', input: [[1]], expectedOutput: 1, isHidden: true },
      { id: 'lrh-h2', input: [[2, 1, 2]], expectedOutput: 3, isHidden: true }
    ],
    hints: ['Monotonic increasing stack holding indices. Pop when current height is smaller.'],
    solutionExplanation: `Monotonic stack maintains indices of non-decreasing bar heights. When a shorter bar is encountered, pop elements to calculate rectangular area with the popped bar as the minimum height.

- **Time Complexity:** O(n)
- **Space Complexity:** O(n)`,
  },

  {
    id: 'p-next-greater-element-i',
    slug: 'next-greater-element-i',
    timeLimitMs: 2000,
    memoryLimitMb: 128,
    title: 'Next Greater Element I',
    difficulty: 'Easy',
    category: 'Stack',
    tags: ['Array', 'Hash Table', 'Stack', 'Monotonic Stack'],
    functionName: 'nextGreaterElement',
    paramNames: ['nums1', 'nums2'],
    description: `The **next greater element** of some element \`x\` in an array is the **first greater** element that is to the **right** of \`x\` in the same array.

You are given two **distinct 0-indexed** integer arrays \`nums1\` and \`nums2\`, where \`nums1\` is a subset of \`nums2\`.

For each \`0 <= i < nums1.length\`, find the index \`j\` such that \`nums1[i] == nums2[j]\` and determine the **next greater element** of \`nums2[j]\` in \`nums2\`. If there is no next greater element, then the answer for this query is \`-1\`.

Return *an array \`ans\` of length \`nums1.length\` such that \`ans[i]\` is the next greater element as described above*.

### Example 1:
\`\`\`
Input: nums1 = [4,1,2], nums2 = [1,3,4,2]
Output: [-1,3,-1]
Explanation: The next greater element for each value of nums1 is as follows:
- 4 is underlined in nums2 = [1,3,4,2]. There is no next greater element, so the answer is -1.
- 1 is underlined in nums2 = [1,3,4,2]. The next greater element is 3.
- 2 is underlined in nums2 = [1,3,4,2]. There is no next greater element, so the answer is -1.
\`\`\`

### Example 2:
\`\`\`
Input: nums1 = [2,4], nums2 = [1,2,3,4]
Output: [3,-1]
\`\`\`

### Constraints:
- \`1 <= nums1.length <= nums2.length <= 1000\`
- \`0 <= nums1[i], nums2[i] <= 10^4\`
- All integers in \`nums1\` and \`nums2\` are **unique**.
- All the integers of \`nums1\` also appear in \`nums2\`.
`,
    starterCode: {
      javascript: `/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
function nextGreaterElement(nums1, nums2) {
  const map = new Map();
  const stack = [];
  for (const num of nums2) {
    while (stack.length > 0 && stack[stack.length - 1] < num) {
      map.set(stack.pop(), num);
    }
    stack.push(num);
  }
  return nums1.map(n => map.get(n) ?? -1);
}`,
      python: `class Solution:
    def nextGreaterElement(self, nums1: list[int], nums2: list[int]) -> list[int]:
        mapping = {}
        stack = []
        for num in nums2:
            while stack and stack[-1] < num:
                mapping[stack.pop()] = num
            stack.append(num)
        return [mapping.get(n, -1) for n in nums1]`,
      cpp: `#include <vector>
#include <unordered_map>
using namespace std;

class Solution {
public:
    vector<int> nextGreaterElement(vector<int>& nums1, vector<int>& nums2) {
        unordered_map<int, int> map;
        vector<int> stack;
        for (int num : nums2) {
            while (!stack.empty() && stack.back() < num) {
                map[stack.back()] = num;
                stack.pop_back();
            }
            stack.push_back(num);
        }
        vector<int> res;
        for (int n : nums1) {
            res.push_back(map.count(n) ? map[n] : -1);
        }
        return res;
    }
};`,
      java: `import java.util.*;

class Solution {
    public int[] nextGreaterElement(int[] nums1, int[] nums2) {
        Map<Integer, Integer> map = new HashMap<>();
        Deque<Integer> stack = new ArrayDeque<>();
        for (int num : nums2) {
            while (!stack.isEmpty() && stack.peek() < num) {
                map.put(stack.pop(), num);
            }
            stack.push(num);
        }
        int[] res = new int[nums1.length];
        for (int i = 0; i < nums1.length; i++) {
            res[i] = map.getOrDefault(nums1[i], -1);
        }
        return res;
    }
}`
    },
    sampleTestCases: [
      { id: 'nge-1', input: [[4, 1, 2], [1, 3, 4, 2]], expectedOutput: [-1, 3, -1] },
      { id: 'nge-2', input: [[2, 4], [1, 2, 3, 4]], expectedOutput: [3, -1] }
    ],
    hiddenTestCases: [
      { id: 'nge-h1', input: [[1, 3, 5], [1, 2, 3, 4, 5]], expectedOutput: [2, 4, -1], isHidden: true }
    ],
    hints: ['Process nums2 with a monotonic decreasing stack and store next greater in a hash map.'],
    solutionExplanation: `Monotonic decreasing stack over \`,nums2\`. When a number is greater than the stack top, it is the next greater element for all smaller items on the stack.

- **Time Complexity:** O(nums1.length + nums2.length)
- **Space Complexity:** O(nums2.length)`
  },

  {
    id: 'p-non-overlapping-intervals',
    slug: 'non-overlapping-intervals',
    timeLimitMs: 2000,
    memoryLimitMb: 128,
    title: 'Non-overlapping Intervals',
    difficulty: 'Medium',
    category: 'Intervals',
    tags: ['Array', 'Dynamic Programming', 'Greedy', 'Sorting'],
    functionName: 'eraseOverlapIntervals',
    paramNames: ['intervals'],
    description: `Given an array of intervals \`intervals\` where \`intervals[i] = [starti, endi]\`, return *the minimum number of intervals you need to remove to make the rest of the intervals non-overlapping*.

### Example 1:
\`\`\`
Input: intervals = [[1,2],[2,3],[3,4],[1,3]]
Output: 1
Explanation: [1,3] can be removed and the rest of the intervals are non-overlapping.
\`\`\`

### Example 2:
\`\`\`
Input: intervals = [[1,2],[1,2],[1,2]]
Output: 2
Explanation: You need to remove two [1,2] to make the rest of the intervals non-overlapping.
\`\`\`

### Example 3:
\`\`\`
Input: intervals = [[1,2],[2,3]]
Output: 0
Explanation: You don't need to remove any of the intervals since they're already non-overlapping.
\`\`\`

### Constraints:
- \`1 <= intervals.length <= 10^5\`
- \`intervals[i].length == 2\`
- \`-5 * 10^4 <= starti < endi <= 5 * 10^4\`
`,
    starterCode: {
      javascript: `/**
 * @param {number[][]} intervals
 * @return {number}
 */
function eraseOverlapIntervals(intervals) {
  if (intervals.length <= 1) return 0;
  intervals.sort((a, b) => a[1] - b[1]);
  let count = 0;
  let prevEnd = intervals[0][1];
  for (let i = 1; i < intervals.length; i++) {
    if (intervals[i][0] < prevEnd) {
      count++;
    } else {
      prevEnd = intervals[i][1];
    }
  }
  return count;
}`,
      python: `class Solution:
    def eraseOverlapIntervals(self, intervals: list[list[int]]) -> int:
        if not intervals:
            return 0
        intervals.sort(key=lambda x: x[1])
        count = 0
        prev_end = intervals[0][1]
        for i in range(1, len(intervals)):
            if intervals[i][0] < prev_end:
                count += 1
            else:
                prev_end = intervals[i][1]
        return count`,
      cpp: `#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int eraseOverlapIntervals(vector<vector<int>>& intervals) {
        if (intervals.size() <= 1) return 0;
        sort(intervals.begin(), intervals.end(), [](const vector<int>& a, const vector<int>& b) {
            return a[1] < b[1];
        });
        int count = 0;
        int prevEnd = intervals[0][1];
        for (int i = 1; i < (int)intervals.size(); i++) {
            if (intervals[i][0] < prevEnd) {
                count++;
            } else {
                prevEnd = intervals[i][1];
            }
        }
        return count;
    }
};`,
      java: `import java.util.*;

class Solution {
    public int eraseOverlapIntervals(int[][] intervals) {
        if (intervals.length <= 1) return 0;
        Arrays.sort(intervals, (a, b) -> Integer.compare(a[1], b[1]));
        int count = 0;
        int prevEnd = intervals[0][1];
        for (int i = 1; i < intervals.length; i++) {
            if (intervals[i][0] < prevEnd) {
                count++;
            } else {
                prevEnd = intervals[i][1];
            }
        }
        return count;
    }
}`
    },
    sampleTestCases: [
      { id: 'noi-1', input: [[[1, 2], [2, 3], [3, 4], [1, 3]]], expectedOutput: 1 },
      { id: 'noi-2', input: [[[1, 2], [1, 2], [1, 2]]], expectedOutput: 2 },
      { id: 'noi-3', input: [[[1, 2], [2, 3]]], expectedOutput: 0 }
    ],
    hiddenTestCases: [
      { id: 'noi-h1', input: [[[1, 100], [11, 22], [1, 11], [2, 12]]], expectedOutput: 2, isHidden: true }
    ],
    hints: ['Greedy scheduling: Sort intervals by end time. Pick intervals that finish earliest.'],
    solutionExplanation: `Greedy interval scheduling: Sort by end times. Choosing intervals with earlier end times leaves the most room possible for subsequent non-overlapping intervals.

- **Time Complexity:** O(n log n)
- **Space Complexity:** O(1)`,
  },

  {
    id: 'p-minimum-number-of-arrows-to-burst-balloons',
    slug: 'minimum-number-of-arrows-to-burst-balloons',
    timeLimitMs: 2000,
    memoryLimitMb: 128,
    title: 'Minimum Number of Arrows to Burst Balloons',
    difficulty: 'Medium',
    category: 'Intervals',
    tags: ['Array', 'Greedy', 'Sorting'],
    functionName: 'findMinArrowShots',
    paramNames: ['points'],
    description: `There are some spherical balloons taped onto a flat wall represented by the XY-plane. The balloons are represented as a 2D integer array \`points\` where \`points[i] = [xstart, xend]\`.

An arrow can be shot up exactly vertically (in the positive y-direction) from different points along the x-axis. A balloon with \`xstart\` and \`xend\` is burst by an arrow shot at \`x\` if \`xstart <= x <= xend\`. There is no limit to the number of arrows that can be shot.

Given the array \`points\`, return *the minimum number of arrows that must be shot to burst all balloons*.

### Example 1:
\`\`\`
Input: points = [[10,16],[2,8],[1,6],[7,12]]
Output: 2
Explanation: The balloons can be burst by 2 arrows:
- Shoot an arrow at x = 6, bursting balloons [2,8] and [1,6].
- Shoot an arrow at x = 11, bursting balloons [10,16] and [7,12].
\`\`\`

### Example 2:
\`\`\`
Input: points = [[1,2],[3,4],[5,6],[7,8]]
Output: 4
\`\`\`

### Constraints:
- \`1 <= points.length <= 10^5\`
- \`points[i].length == 2\`
- \`-2^31 <= xstart < xend <= 2^31 - 1\`
`,
    starterCode: {
      javascript: `/**
 * @param {number[][]} points
 * @return {number}
 */
function findMinArrowShots(points) {
  if (points.length === 0) return 0;
  points.sort((a, b) => a[1] - b[1]);
  let arrows = 1;
  let end = points[0][1];
  for (let i = 1; i < points.length; i++) {
    if (points[i][0] > end) {
      arrows++;
      end = points[i][1];
    }
  }
  return arrows;
}`,
      python: `class Solution:
    def findMinArrowShots(self, points: list[list[int]]) -> int:
        if not points:
            return 0
        points.sort(key=lambda x: x[1])
        arrows = 1
        end = points[0][1]
        for i in range(1, len(points)):
            if points[i][0] > end:
                arrows += 1
                end = points[i][1]
        return arrows`,
      cpp: `#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int findMinArrowShots(vector<vector<int>>& points) {
        if (points.empty()) return 0;
        sort(points.begin(), points.end(), [](const vector<int>& a, const vector<int>& b) {
            return a[1] < b[1];
        });
        int arrows = 1;
        int end = points[0][1];
        for (int i = 1; i < (int)points.size(); i++) {
            if (points[i][0] > end) {
                arrows++;
                end = points[i][1];
            }
        }
        return arrows;
    }
};`,
      java: `import java.util.*;

class Solution {
    public int findMinArrowShots(int[][] points) {
        if (points.length == 0) return 0;
        Arrays.sort(points, (a, b) -> Integer.compare(a[1], b[1]));
        int arrows = 1;
        int end = points[0][1];
        for (int i = 1; i < points.length; i++) {
            if (points[i][0] > end) {
                arrows++;
                end = points[i][1];
            }
        }
        return arrows;
    }
}`
    },
    sampleTestCases: [
      { id: 'fmas-1', input: [[[10, 16], [2, 8], [1, 6], [7, 12]]], expectedOutput: 2 },
      { id: 'fmas-2', input: [[[1, 2], [3, 4], [5, 6], [7, 8]]], expectedOutput: 4 }
    ],
    hiddenTestCases: [
      { id: 'fmas-h1', input: [[[1, 2], [2, 3], [3, 4], [4, 5]]], expectedOutput: 2, isHidden: true }
    ],
    hints: ['Sort by end position; shoot arrow at balloon end and burst all overlapping balloons.'],
    solutionExplanation: `Greedy choice property: By shooting each arrow at the earliest balloon end point, we maximize the number of subsequent overlapping balloons popped.

- **Time Complexity:** O(n log n)
- **Space Complexity:** O(1)`,
  },

  {
    id: 'p-lemonade-change',
    slug: 'lemonade-change',
    timeLimitMs: 2000,
    memoryLimitMb: 128,
    title: 'Lemonade Change',
    difficulty: 'Easy',
    category: 'Greedy',
    tags: ['Array', 'Greedy'],
    functionName: 'lemonadeChange',
    paramNames: ['bills'],
    description: `At a lemonade stand, each lemonade costs \`$5\`. Customers are standing in a queue to buy from you and order one at a time (in the order specified by bills). Each customer will only buy one lemonade and pay with either a \`$5\`, \`$10\`, or \`$20\` bill. You must provide the correct change to each customer so that the net transaction is that the customer pays \`$5\`.

Note that you do not have any change in hand at first.

Given an integer array \`bills\` where \`bills[i]\` is the bill the \`i\`th customer pays, return \`true\` *if you can provide every customer with the correct change, or* \`false\` *otherwise*.

### Example 1:
\`\`\`
Input: bills = [5,5,5,10,20]
Output: true
Explanation: 
From the first 3 customers, we collect three $5 bills in order.
From the fourth customer, we collect a $10 bill and give back a $5.
From the fifth customer, we give a $10 bill and a $5 bill.
Since all customers got correct change, we output true.
\`\`\`

### Example 2:
\`\`\`
Input: bills = [5,5,10,10,20]
Output: false
Explanation: 
From the first two customers in order, we collect two $5 bills.
For the next two customers in order, we collect a $10 bill and give back a $5 bill.
For the last customer, we cannot give the change of $15 back because we only have two $10 bills.
Since not every customer received the correct change, the answer is false.
\`\`\`

### Constraints:
- \`1 <= bills.length <= 10^5\`
- \`bills[i]\` is either \`5\`, \`10\`, or \`20\`.
`,
    starterCode: {
      javascript: `/**
 * @param {number[]} bills
 * @return {boolean}
 */
function lemonadeChange(bills) {
  let five = 0, ten = 0;
  for (const bill of bills) {
    if (bill === 5) {
      five++;
    } else if (bill === 10) {
      if (five === 0) return false;
      five--;
      ten++;
    } else {
      if (ten > 0 && five > 0) {
        ten--;
        five--;
      } else if (five >= 3) {
        five -= 3;
      } else {
        return false;
      }
    }
  }
  return true;
}`,
      python: `class Solution:
    def lemonadeChange(self, bills: list[int]) -> bool:
        five, ten = 0, 0
        for bill in bills:
            if bill == 5:
                five += 1
            elif bill == 10:
                if five == 0:
                    return False
                five -= 1
                ten += 1
            else:
                if ten > 0 and five > 0:
                    ten -= 1
                    five -= 1
                elif five >= 3:
                    five -= 3
                else:
                    return False
        return True`,
      cpp: `#include <vector>
using namespace std;

class Solution {
public:
    bool lemonadeChange(vector<int>& bills) {
        int five = 0, ten = 0;
        for (int bill : bills) {
            if (bill == 5) {
                five++;
            } else if (bill == 10) {
                if (five == 0) return false;
                five--;
                ten++;
            } else {
                if (ten > 0 && five > 0) {
                    ten--;
                    five--;
                } else if (five >= 3) {
                    five -= 3;
                } else {
                    return false;
                }
            }
        }
        return true;
    }
};`,
      java: `class Solution {
    public boolean lemonadeChange(int[] bills) {
        int five = 0, ten = 0;
        for (int bill : bills) {
            if (bill == 5) {
                five++;
            } else if (bill == 10) {
                if (five == 0) return false;
                five--;
                ten++;
            } else {
                if (ten > 0 && five > 0) {
                    ten--;
                    five--;
                } else if (five >= 3) {
                    five -= 3;
                } else {
                    return false;
                }
            }
        }
        return true;
    }
}`
    },
    sampleTestCases: [
      { id: 'lc-1', input: [[5, 5, 5, 10, 20]], expectedOutput: true },
      { id: 'lc-2', input: [[5, 5, 10, 10, 20]], expectedOutput: false }
    ],
    hiddenTestCases: [
      { id: 'lc-h1', input: [[5, 5, 5, 20]], expectedOutput: true, isHidden: true }
    ],
    hints: ['Prioritize giving one $10 and one $5 as change for $20 over three $5 bills.'],
    solutionExplanation: `Greedy change giving: $5 bills are more versatile because they can provide change for both $10 and $20 bills. Always use a $10 bill first when giving change for $20.

- **Time Complexity:** O(n)
- **Space Complexity:** O(1)`,
  },

  {
    id: 'p-reverse-bits',
    slug: 'reverse-bits',
    timeLimitMs: 2000,
    memoryLimitMb: 128,
    title: 'Reverse Bits',
    difficulty: 'Easy',
    category: 'Bit Manipulation',
    tags: ['Divide and Conquer', 'Bit Manipulation'],
    functionName: 'reverseBits',
    paramNames: ['n'],
    description: `Reverse bits of a given 32 bits unsigned integer.

### Example 1:
\`\`\`
Input: n = 43261596 (00000010100101000001111010011100 in binary)
Output: 964176192 (00111001011110000010100101000000 in binary)
\`\`\`

### Example 2:
\`\`\`
Input: n = 4294967293 (11111111111111111111111111111101 in binary)
Output: 3221225471 (10111111111111111111111111111111 in binary)
\`\`\`

### Constraints:
- The input must be a **binary string** of length \`32\` or an unsigned 32-bit integer.
`,
    starterCode: {
      javascript: `/**
 * @param {number} n - a positive integer
 * @return {number} - a positive integer
 */
function reverseBits(n) {
  let result = 0;
  for (let i = 0; i < 32; i++) {
    result = (result << 1) | (n & 1);
    n >>>= 1;
  }
  return result >>> 0;
}`,
      python: `class Solution:
    def reverseBits(self, n: int) -> int:
        res = 0
        for _ in range(32):
            res = (res << 1) | (n & 1)
            n >>= 1
        return res`,
      cpp: `#include <cstdint>
using namespace std;

class Solution {
public:
    uint32_t reverseBits(uint32_t n) {
        uint32_t res = 0;
        for (int i = 0; i < 32; i++) {
            res = (res << 1) | (n & 1);
            n >>= 1;
        }
        return res;
    }
};`,
      java: `class Solution {
    public int reverseBits(int n) {
        int res = 0;
        for (int i = 0; i < 32; i++) {
            res = (res << 1) | (n & 1);
            n >>>= 1;
        }
        return res;
    }
}`
    },
    sampleTestCases: [
      { id: 'rb-1', input: [43261596], expectedOutput: 964176192 },
      { id: 'rb-2', input: [1], expectedOutput: 2147483648 }
    ],
    hiddenTestCases: [
      { id: 'rb-h1', input: [0], expectedOutput: 0, isHidden: true }
    ],
    hints: ['Shift result left and append n & 1, then shift n right.'],
    solutionExplanation: `Loop 32 times: Extract the least significant bit of n using bitwise AND \`,n & 1\`, shift result left, add the bit, and unsigned right-shift n.

- **Time Complexity:** O(1)
- **Space Complexity:** O(1)`
  },

  {
    id: 'p-hamming-distance',
    slug: 'hamming-distance',
    timeLimitMs: 2000,
    memoryLimitMb: 128,
    title: 'Hamming Distance',
    difficulty: 'Easy',
    category: 'Bit Manipulation',
    tags: ['Bit Manipulation'],
    functionName: 'hammingDistance',
    paramNames: ['x', 'y'],
    description: `The **Hamming distance** between two integers is the number of positions at which the corresponding bits are different.

Given two integers \`x\` and \`y\`, return *the **Hamming distance** between them*.

### Example 1:
\`\`\`
Input: x = 1, y = 4
Output: 2
Explanation:
1   (0 0 0 1)
4   (0 1 0 0)
       ↑   ↑
The above arrows point to positions where the corresponding bits are different.
\`\`\`

### Example 2:
\`\`\`
Input: x = 3, y = 1
Output: 1
\`\`\`

### Constraints:
- \`0 <= x, y <= 2^31 - 1\`
`,
    starterCode: {
      javascript: `/**
 * @param {number} x
 * @param {number} y
 * @return {number}
 */
function hammingDistance(x, y) {
  let xor = x ^ y;
  let count = 0;
  while (xor > 0) {
    xor &= (xor - 1);
    count++;
  }
  return count;
}`,
      python: `class Solution:
    def hammingDistance(self, x: int, y: int) -> int:
        xor = x ^ y
        count = 0
        while xor > 0:
            xor &= (xor - 1)
            count += 1
        return count`,
      cpp: `using namespace std;

class Solution {
public:
    int hammingDistance(int x, int y) {
        int xorVal = x ^ y;
        int count = 0;
        while (xorVal > 0) {
            xorVal &= (xorVal - 1);
            count++;
        }
        return count;
    }
};`,
      java: `class Solution {
    public int hammingDistance(int x, int y) {
        int xor = x ^ y;
        int count = 0;
        while (xor != 0) {
            xor &= (xor - 1);
            count++;
        }
        return count;
    }
}`
    },
    sampleTestCases: [
      { id: 'hd-1', input: [1, 4], expectedOutput: 2 },
      { id: 'hd-2', input: [3, 1], expectedOutput: 1 }
    ],
    hiddenTestCases: [
      { id: 'hd-h1', input: [0, 0], expectedOutput: 0, isHidden: true }
    ],
    hints: ['Compute x ^ y then count set bits with Brian Kernighan algorithm.'],
    solutionExplanation: `XOR operation \`,x ^ y\` sets bits to 1 where bits differ. Brian Kernighan's bit trick \`n &= (n - 1)\` clears the lowest set bit in O(number of 1s).

- **Time Complexity:** O(1)
- **Space Complexity:** O(1)`
  },

  {
    id: 'p-add-binary',
    slug: 'add-binary',
    timeLimitMs: 2000,
    memoryLimitMb: 128,
    title: 'Add Binary',
    difficulty: 'Easy',
    category: 'Math & Geometry',
    tags: ['Math', 'String', 'Bit Manipulation', 'Simulation'],
    functionName: 'addBinary',
    paramNames: ['a', 'b'],
    description: `Given two binary strings \`a\` and \`b\`, return *their sum as a binary string*.

### Example 1:
\`\`\`
Input: a = "11", b = "1"
Output: "100"
\`\`\`

### Example 2:
\`\`\`
Input: a = "1010", b = "1011"
Output: "10101"
\`\`\`

### Constraints:
- \`1 <= a.length, b.length <= 10^4\`
- \`a\` and \`b\` consist only of \`'0'\` or \`'1'\` characters.
- Each string does not contain leading zeros except for the zero itself.
`,
    starterCode: {
      javascript: `/**
 * @param {string} a
 * @param {string} b
 * @return {string}
 */
function addBinary(a, b) {
  let i = a.length - 1, j = b.length - 1;
  let carry = 0;
  const res = [];
  while (i >= 0 || j >= 0 || carry > 0) {
    let sum = carry;
    if (i >= 0) sum += a.charCodeAt(i--) - 48;
    if (j >= 0) sum += b.charCodeAt(j--) - 48;
    res.push(sum % 2);
    carry = Math.floor(sum / 2);
  }
  return res.reverse().join('');
}`,
      python: `class Solution:
    def addBinary(self, a: str, b: str) -> str:
        i, j = len(a) - 1, len(b) - 1
        carry = 0
        res = []
        while i >= 0 or j >= 0 or carry:
            total = carry
            if i >= 0:
                total += int(a[i])
                i -= 1
            if j >= 0:
                total += int(b[j])
                j -= 1
            res.append(str(total % 2))
            carry = total // 2
        return ''.join(reversed(res))`,
      cpp: `#include <string>
#include <algorithm>
using namespace std;

class Solution {
public:
    string addBinary(string a, string b) {
        int i = a.size() - 1, j = b.size() - 1, carry = 0;
        string res = "";
        while (i >= 0 || j >= 0 || carry) {
            int sum = carry;
            if (i >= 0) sum += a[i--] - '0';
            if (j >= 0) sum += b[j--] - '0';
            res += to_string(sum % 2);
            carry = sum / 2;
        }
        reverse(res.begin(), res.end());
        return res;
    }
};`,
      java: `class Solution {
    public String addBinary(String a, String b) {
        StringBuilder sb = new StringBuilder();
        int i = a.length() - 1, j = b.length() - 1, carry = 0;
        while (i >= 0 || j >= 0 || carry > 0) {
            int sum = carry;
            if (i >= 0) sum += a.charAt(i--) - '0';
            if (j >= 0) sum += b.charAt(j--) - '0';
            sb.append(sum % 2);
            carry = sum / 2;
        }
        return sb.reverse().toString();
    }
}`
    },
    sampleTestCases: [
      { id: 'ab-1', input: ['11', '1'], expectedOutput: '100' },
      { id: 'ab-2', input: ['1010', '1011'], expectedOutput: '10101' }
    ],
    hiddenTestCases: [
      { id: 'ab-h1', input: ['0', '0'], expectedOutput: '0', isHidden: true }
    ],
    hints: ['Simulate column-by-column addition right to left with a carry variable.'],
    solutionExplanation: `Digit-by-digit simulation: Start from the rightmost digits and maintain a carry. Append \`,sum % 2\` and set \`carry = sum / 2\`. Reverse the result at the end.

- **Time Complexity:** O(max(a.length, b.length))
- **Space Complexity:** O(max(a.length, b.length))`
  },

  {
    id: 'p-excel-sheet-column-number',
    slug: 'excel-sheet-column-number',
    timeLimitMs: 2000,
    memoryLimitMb: 128,
    title: 'Excel Sheet Column Number',
    difficulty: 'Easy',
    category: 'Math & Geometry',
    tags: ['Math', 'String'],
    functionName: 'titleToNumber',
    paramNames: ['columnTitle'],
    description: `Given a string \`columnTitle\` that represents the column title as appears in an Excel sheet, return *its corresponding column number*.

For example:
- \`"A" -> 1\`
- \`"B" -> 2\`
- \`"C" -> 3\`
- ...
- \`"Z" -> 26\`
- \`"AA" -> 27\`
- \`"AB" -> 28\` 

### Example 1:
\`\`\`
Input: columnTitle = "A"
Output: 1
\`\`\`

### Example 2:
\`\`\`
Input: columnTitle = "AB"
Output: 28
\`\`\`

### Example 3:
\`\`\`
Input: columnTitle = "ZY"
Output: 701
\`\`\`

### Constraints:
- \`1 <= columnTitle.length <= 7\`
- \`columnTitle\` consists only of uppercase English letters.
- \`columnTitle\` is in the range \`["A", "FXSHRXW"]\`.
`,
    starterCode: {
      javascript: `/**
 * @param {string} columnTitle
 * @return {number}
 */
function titleToNumber(columnTitle) {
  let res = 0;
  for (let i = 0; i < columnTitle.length; i++) {
    res = res * 26 + (columnTitle.charCodeAt(i) - 64);
  }
  return res;
}`,
      python: `class Solution:
    def titleToNumber(self, columnTitle: str) -> int:
        res = 0
        for char in columnTitle:
            res = res * 26 + (ord(char) - ord('A') + 1)
        return res`,
      cpp: `#include <string>
using namespace std;

class Solution {
public:
    int titleToNumber(string columnTitle) {
        long long res = 0;
        for (char c : columnTitle) {
            res = res * 26 + (c - 'A' + 1);
        }
        return (int)res;
    }
};`,
      java: `class Solution {
    public int titleToNumber(String columnTitle) {
        int res = 0;
        for (int i = 0; i < columnTitle.length(); i++) {
            res = res * 26 + (columnTitle.charAt(i) - 'A' + 1);
        }
        return res;
    }
}`
    },
    sampleTestCases: [
      { id: 'escn-1', input: ['A'], expectedOutput: 1 },
      { id: 'escn-2', input: ['AB'], expectedOutput: 28 },
      { id: 'escn-3', input: ['ZY'], expectedOutput: 701 }
    ],
    hiddenTestCases: [
      { id: 'escn-h1', input: ['FXSHRXW'], expectedOutput: 2147483647, isHidden: true }
    ],
    hints: ['Base-26 number system conversion.'],
    solutionExplanation: `Base 26 conversion: Process each character left-to-right: multiply accumulator by 26 and add \`,ord(char) - ord('A') + 1\`.

- **Time Complexity:** O(n)
- **Space Complexity:** O(1)`
  },

  {
    id: 'p-factorial-trailing-zeroes',
    slug: 'factorial-trailing-zeroes',
    timeLimitMs: 2000,
    memoryLimitMb: 128,
    title: 'Factorial Trailing Zeroes',
    difficulty: 'Medium',
    category: 'Math & Geometry',
    tags: ['Math'],
    functionName: 'trailingZeroes',
    paramNames: ['n'],
    description: `Given an integer \`n\`, return *the number of trailing zeroes in \`n!\`*.

Note that \`n! = n * (n - 1) * (n - 2) * ... * 3 * 2 * 1\`.

### Example 1:
\`\`\`
Input: n = 3
Output: 0
Explanation: 3! = 6, no trailing zero.
\`\`\`

### Example 2:
\`\`\`
Input: n = 5
Output: 1
Explanation: 5! = 120, one trailing zero.
\`\`\`

### Example 3:
\`\`\`
Input: n = 0
Output: 0
\`\`\`

### Constraints:
- \`0 <= n <= 10^4\`
`,
    starterCode: {
      javascript: `/**
 * @param {number} n
 * @return {number}
 */
function trailingZeroes(n) {
  let count = 0;
  while (n >= 5) {
    n = Math.floor(n / 5);
    count += n;
  }
  return count;
}`,
      python: `class Solution:
    def trailingZeroes(self, n: int) -> int:
        count = 0
        while n >= 5:
            n //= 5
            count += n
        return count`,
      cpp: `using namespace std;

class Solution {
public:
    int trailingZeroes(int n) {
        int count = 0;
        while (n >= 5) {
            n /= 5;
            count += n;
        }
        return count;
    }
};`,
      java: `class Solution {
    public int trailingZeroes(int n) {
        int count = 0;
        while (n >= 5) {
            n /= 5;
            count += n;
        }
        return count;
    }
}`
    },
    sampleTestCases: [
      { id: 'ftz-1', input: [3], expectedOutput: 0 },
      { id: 'ftz-2', input: [5], expectedOutput: 1 },
      { id: 'ftz-3', input: [0], expectedOutput: 0 }
    ],
    hiddenTestCases: [
      { id: 'ftz-h1', input: [25], expectedOutput: 6, isHidden: true }
    ],
    hints: ['Trailing zeroes are formed by 2 * 5 pairs. Count the number of factor 5s.'],
    solutionExplanation: `Legendre's formula: The number of trailing zeros in n! equals the number of times 5 appears as a prime factor: floor(n/5) + floor(n/25) + floor(n/125) + ...

- **Time Complexity:** O(log_5(n))
- **Space Complexity:** O(1)`,
  },

  {
    id: 'p-string-to-integer-atoi',
    slug: 'string-to-integer-atoi',
    timeLimitMs: 2000,
    memoryLimitMb: 128,
    title: 'String to Integer (atoi)',
    difficulty: 'Medium',
    category: 'Math & Geometry',
    tags: ['String'],
    functionName: 'myAtoi',
    paramNames: ['s'],
    description: `Implement the \`myAtoi(string s)\` function, which converts a string to a 32-bit signed integer.

The algorithm for \`myAtoi(string s)\` is as follows:
1. **Whitespace:** Ignore any leading whitespace (\`" "\`).
2. **Signedness:** Determine the sign by checking if the next character is \`'-'\` or \`'+'\`, assuming positivity if neither present.
3. **Conversion:** Read the integer by ignoring leading zeros until a non-digit character is encountered or the end of the string is reached. If no digits were read, then the result is \`0\`.
4. **Rounding:** If the integer is out of the 32-bit signed integer range \`[-2^31, 2^31 - 1]\`, then clamp the integer so that it remains in the range.

Return *the integer as the final result*.

### Example 1:
\`\`\`
Input: s = "42"
Output: 42
\`\`\`

### Example 2:
\`\`\`
Input: s = "   -42"
Output: -42
\`\`\`

### Example 3:
\`\`\`
Input: s = "1337c0d3"
Output: 1337
\`\`\`

### Constraints:
- \`0 <= s.length <= 200\`
- \`s\` consists of English letters, digits, \`' '\`, \`'+'\`, \`'-'\`, and \`'.'\`.
`,
    starterCode: {
      javascript: `/**
 * @param {string} s
 * @return {number}
 */
function myAtoi(s) {
  let i = 0;
  while (i < s.length && s[i] === ' ') i++;
  if (i >= s.length) return 0;
  let sign = 1;
  if (s[i] === '+' || s[i] === '-') {
    sign = s[i] === '-' ? -1 : 1;
    i++;
  }
  let res = 0;
  const INT_MAX = 2147483647;
  const INT_MIN = -2147483648;
  while (i < s.length && s[i] >= '0' && s[i] <= '9') {
    const digit = s.charCodeAt(i) - 48;
    res = res * 10 + digit;
    if (sign === 1 && res > INT_MAX) return INT_MAX;
    if (sign === -1 && -res < INT_MIN) return INT_MIN;
    i++;
  }
  return sign * res;
}`,
      python: `class Solution:
    def myAtoi(self, s: str) -> int:
        s = s.lstrip()
        if not s:
            return 0
        sign = 1
        i = 0
        if s[0] in ['+', '-']:
            sign = -1 if s[0] == '-' else 1
            i = 1
        res = 0
        INT_MAX = 2147483647
        INT_MIN = -2147483648
        while i < len(s) and s[i].isdigit():
            res = res * 10 + int(s[i])
            if sign == 1 and res > INT_MAX:
                return INT_MAX
            if sign == -1 and -res < INT_MIN:
                return INT_MIN
            i += 1
        return sign * res`,
      cpp: `#include <string>
#include <climits>
using namespace std;

class Solution {
public:
    int myAtoi(string s) {
        int i = 0, n = s.size();
        while (i < n && s[i] == ' ') i++;
        if (i >= n) return 0;
        int sign = 1;
        if (s[i] == '+' || s[i] == '-') {
            sign = (s[i] == '-') ? -1 : 1;
            i++;
        }
        long long res = 0;
        while (i < n && isdigit(s[i])) {
            res = res * 10 + (s[i] - '0');
            if (sign == 1 && res > INT_MAX) return INT_MAX;
            if (sign == -1 && -res < INT_MIN) return INT_MIN;
            i++;
        }
        return (int)(sign * res);
    }
};`,
      java: `class Solution {
    public int myAtoi(String s) {
        int i = 0, n = s.length();
        while (i < n && s.charAt(i) == ' ') i++;
        if (i >= n) return 0;
        int sign = 1;
        if (s.charAt(i) == '+' || s.charAt(i) == '-') {
            sign = (s.charAt(i) == '-') ? -1 : 1;
            i++;
        }
        long res = 0;
        while (i < n && Character.isDigit(s.charAt(i))) {
            res = res * 10 + (s.charAt(i) - '0');
            if (sign == 1 && res > Integer.MAX_VALUE) return Integer.MAX_VALUE;
            if (sign == -1 && -res < Integer.MIN_VALUE) return Integer.MIN_VALUE;
            i++;
        }
        return (int)(sign * res);
    }
}`
    },
    sampleTestCases: [
      { id: 'ma-1', input: ['42'], expectedOutput: 42 },
      { id: 'ma-2', input: ['   -42'], expectedOutput: -42 },
      { id: 'ma-3', input: ['1337c0d3'], expectedOutput: 1337 }
    ],
    hiddenTestCases: [
      { id: 'ma-h1', input: ['-91283472332'], expectedOutput: -2147483648, isHidden: true }
    ],
    hints: ['Handle whitespace, sign, digits, and clamp to [INT_MIN, INT_MAX].'],
    solutionExplanation: `Direct finite state parser: Strip whitespace, check optional leading sign, parse consecutive digits, and clamp strictly within 32-bit signed limits.

- **Time Complexity:** O(n)
- **Space Complexity:** O(1)`,
  },

  {
    id: 'p-zigzag-conversion',
    slug: 'zigzag-conversion',
    timeLimitMs: 2000,
    memoryLimitMb: 128,
    title: 'Zigzag Conversion',
    difficulty: 'Medium',
    category: 'Math & Geometry',
    tags: ['String'],
    functionName: 'convert',
    paramNames: ['s', 'numRows'],
    description: `The string \`"PAYPALISHIRING"\` is written in a zigzag pattern on a given number of rows like this: (you may want to display this pattern in a fixed font for better legibility)

\`\`\`
P   A   H   N
A P L S I I G
Y   I   R
\`\`\`

And then read line by line: \`"PAHNAPLSIIGYIR"\`.

Write the code that will take a string and make this conversion given a number of rows.

### Example 1:
\`\`\`
Input: s = "PAYPALISHIRING", numRows = 3
Output: "PAHNAPLSIIGYIR"
\`\`\`

### Example 2:
\`\`\`
Input: s = "PAYPALISHIRING", numRows = 4
Output: "PINALSIGYAHRPI"
Explanation:
P     I    N
A   L S  I G
Y A   H R
P     I
\`\`\`

### Example 3:
\`\`\`
Input: s = "A", numRows = 1
Output: "A"
\`\`\`

### Constraints:
- \`1 <= s.length <= 1000\`
- \`s\` consists of English letters (lower-case and upper-case), \`','\` and \`'.'\`.
- \`1 <= numRows <= 1000\`
`,
    starterCode: {
      javascript: `/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
function convert(s, numRows) {
  if (numRows === 1 || s.length <= numRows) return s;
  const rows = Array.from({ length: numRows }, () => '');
  let curRow = 0;
  let goingDown = false;
  for (const c of s) {
    rows[curRow] += c;
    if (curRow === 0 || curRow === numRows - 1) goingDown = !goingDown;
    curRow += goingDown ? 1 : -1;
  }
  return rows.join('');
}`,
      python: `class Solution:
    def convert(self, s: str, numRows: int) -> str:
        if numRows == 1 or len(s) <= numRows:
            return s
        rows = [''] * numRows
        cur_row = 0
        going_down = False
        for c in s:
            rows[cur_row] += c
            if cur_row == 0 or cur_row == numRows - 1:
                going_down = not going_down
            cur_row += 1 if going_down else -1
        return ''.join(rows)`,
      cpp: `#include <string>
#include <vector>
using namespace std;

class Solution {
public:
    string convert(string s, int numRows) {
        if (numRows == 1 || (int)s.size() <= numRows) return s;
        vector<string> rows(numRows);
        int curRow = 0;
        bool goingDown = false;
        for (char c : s) {
            rows[curRow] += c;
            if (curRow == 0 || curRow == numRows - 1) goingDown = !goingDown;
            curRow += goingDown ? 1 : -1;
        }
        string res = "";
        for (const string& row : rows) res += row;
        return res;
    }
};`,
      java: `class Solution {
    public String convert(String s, int numRows) {
        if (numRows == 1 || s.length() <= numRows) return s;
        StringBuilder[] rows = new StringBuilder[numRows];
        for (int i = 0; i < numRows; i++) rows[i] = new StringBuilder();
        int curRow = 0;
        boolean goingDown = false;
        for (char c : s.toCharArray()) {
            rows[curRow].append(c);
            if (curRow == 0 || curRow == numRows - 1) goingDown = !goingDown;
            curRow += goingDown ? 1 : -1;
        }
        StringBuilder res = new StringBuilder();
        for (StringBuilder sb : rows) res.append(sb);
        return res.toString();
    }
}`
    },
    sampleTestCases: [
      { id: 'zc-1', input: ['PAYPALISHIRING', 3], expectedOutput: 'PAHNAPLSIIGYIR' },
      { id: 'zc-2', input: ['PAYPALISHIRING', 4], expectedOutput: 'PINALSIGYAHRPI' },
      { id: 'zc-3', input: ['A', 1], expectedOutput: 'A' }
    ],
    hiddenTestCases: [
      { id: 'zc-h1', input: ['AB', 1], expectedOutput: 'AB', isHidden: true }
    ],
    hints: ['Simulate row movement: toggle direction when hitting row 0 or numRows - 1.'],
    solutionExplanation: `Track current row and direction flag \`,goingDown\`. Whenever row 0 or \`numRows - 1\` is reached, invert the direction. Concatenate all rows.

- **Time Complexity:** O(n)
- **Space Complexity:** O(n)`
  }
];
