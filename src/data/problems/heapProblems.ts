import { Problem } from '../../types';

export const HEAP_PROBLEMS: Problem[] = [
  {
    id: 'p-kth-largest-element-in-an-array',
    slug: 'kth-largest-element-in-an-array',
    title: 'Kth Largest Element in an Array',
    difficulty: 'Medium',
    category: 'Heap / Priority Queue',
    tags: ['Array', 'Divide and Conquer', 'Sorting', 'Heap (Priority Queue)', 'Quickselect'],
    functionName: 'findKthLargest',
    paramNames: ['nums', 'k'],
    description: `Given an integer array \`nums\` and an integer \`k\`, return *the* \`k-th\` *largest element in the array*.

Note that it is the \`k-th\` largest element in the sorted order, not the \`k-th\` distinct element.

Can you solve it without sorting?

### Example 1:
\`\`\`
Input: nums = [3,2,1,5,6,4], k = 2
Output: 5
\`\`\`

### Example 2:
\`\`\`
Input: nums = [3,2,3,1,2,4,5,5,6], k = 4
Output: 4
\`\`\`

### Constraints:
- \`1 <= k <= nums.length <= 10^5\`
- \`-10^4 <= nums[i] <= 10^4\`
`,
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
function findKthLargest(nums, k) {
  // Quickselect algorithm
  const targetIdx = nums.length - k;

  function quickselect(left, right) {
    const pivot = nums[right];
    let p = left;
    for (let i = left; i < right; i++) {
      if (nums[i] <= pivot) {
        const temp = nums[p];
        nums[p] = nums[i];
        nums[i] = temp;
        p++;
      }
    }
    const temp = nums[p];
    nums[p] = nums[right];
    nums[right] = temp;

    if (p === targetIdx) return nums[p];
    if (p < targetIdx) return quickselect(p + 1, right);
    return quickselect(left, p - 1);
  }

  return quickselect(0, nums.length - 1);
}`,
      python: `import random

class Solution:
    def findKthLargest(self, nums: list[int], k: int) -> int:
        target_idx = len(nums) - k
        def quickselect(l, r):
            pivot = nums[r]
            p = l
            for i in range(l, r):
                if nums[i] <= pivot:
                    nums[p], nums[i] = nums[i], nums[p]
                    p += 1
            nums[p], nums[r] = nums[r], nums[p]
            if p == target_idx:
                return nums[p]
            elif p < target_idx:
                return quickselect(p + 1, r)
            else:
                return quickselect(l, p - 1)
        return quickselect(0, len(nums) - 1)`,
      cpp: `#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int findKthLargest(vector<int>& nums, int k) {
        int targetIdx = nums.size() - k;
        return quickselect(0, nums.size() - 1, targetIdx, nums);
    }
private:
    int quickselect(int left, int right, int targetIdx, vector<int>& nums) {
        int pivot = nums[right];
        int p = left;
        for (int i = left; i < right; i++) {
            if (nums[i] <= pivot) {
                swap(nums[p], nums[i]);
                p++;
            }
        }
        swap(nums[p], nums[right]);
        if (p == targetIdx) return nums[p];
        if (p < targetIdx) return quickselect(p + 1, right, targetIdx, nums);
        return quickselect(left, p - 1, targetIdx, nums);
    }
};`,
      java: `class Solution {
    public int findKthLargest(int[] nums, int k) {
        int targetIdx = nums.length - k;
        return quickselect(0, nums.length - 1, targetIdx, nums);
    }
    private int quickselect(int left, int right, int targetIdx, int[] nums) {
        int pivot = nums[right];
        int p = left;
        for (int i = left; i < right; i++) {
            if (nums[i] <= pivot) {
                int temp = nums[p];
                nums[p] = nums[i];
                nums[i] = temp;
                p++;
            }
        }
        int temp = nums[p];
        nums[p] = nums[right];
        nums[right] = temp;

        if (p == targetIdx) return nums[p];
        if (p < targetIdx) return quickselect(p + 1, right, targetIdx, nums);
        return quickselect(left, p - 1, targetIdx, nums);
    }
}`
    },
    sampleTestCases: [
      { id: 'fkl-1', input: [[3, 2, 1, 5, 6, 4], 2], expectedOutput: 5 },
      { id: 'fkl-2', input: [[3, 2, 3, 1, 2, 4, 5, 5, 6], 4], expectedOutput: 4 }
    ],
    hiddenTestCases: [
      { id: 'fkl-h1', input: [[1], 1], expectedOutput: 1, isHidden: true },
      { id: 'fkl-h2', input: [[2, 1], 1], expectedOutput: 2, isHidden: true }
    ],
    hints: [
      'Quickselect achieves O(n) average time complexity without full sorting.'
    ],
    solutionExplanation: `Quickselect finds the (n - k)-th smallest element. Partition around a pivot element. Recurse only into the side containing the target index.

- **Time Complexity:** O(n) average, O(n²) worst-case
- **Space Complexity:** O(1) auxiliary space`,
    timeLimitMs: 2000,
    memoryLimitMb: 128,
    acceptanceRate: 67.2,
    totalSubmissions: 250000,
    acceptedSubmissions: 168000
  },
  {
    id: 'p-last-stone-weight',
    slug: 'last-stone-weight',
    title: 'Last Stone Weight',
    difficulty: 'Easy',
    category: 'Heap / Priority Queue',
    tags: ['Array', 'Heap (Priority Queue)'],
    functionName: 'lastStoneWeight',
    paramNames: ['stones'],
    description: `You are given an array of integers \`stones\` where \`stones[i]\` is the weight of the \`i-th\` stone.

We are playing a game with the stones. On each turn, we choose the **heaviest two stones** and smash them together. Suppose the heaviest two stones have weights \`x\` and \`y\` with \`x <= y\`. The result of this smash is:
- If \`x == y\`, both stones are destroyed, and
- If \`x != y\`, the stone of weight \`x\` is destroyed, and the stone of weight \`y\` has new weight \`y - x\`.

At the end of the game, there is **at most one** stone left.

Return *the weight of the last remaining stone*. If there are no stones left, return \`0\`.

### Example 1:
\`\`\`
Input: stones = [2,7,4,1,8,1]
Output: 1
Explanation: 
We combine 7 and 8 to get 1 so the array converts to [2,4,1,1,1] then,
we combine 2 and 4 to get 2 so the array converts to [2,1,1,1] then,
we combine 2 and 1 to get 1 so the array converts to [1,1,1] then,
we combine 1 and 1 to get 0 so the array converts to [1] then that's the value of the last stone.
\`\`\`

### Example 2:
\`\`\`
Input: stones = [1]
Output: 1
\`\`\`

### Constraints:
- \`1 <= stones.length <= 30\`
- \`1 <= stones[i] <= 1000\`
`,
    starterCode: {
      javascript: `/**
 * @param {number[]} stones
 * @return {number}
 */
function lastStoneWeight(stones) {
  while (stones.length > 1) {
    stones.sort((a, b) => b - a);
    const y = stones.shift();
    const x = stones.shift();
    if (y > x) {
      stones.push(y - x);
    }
  }
  return stones.length === 1 ? stones[0] : 0;
}`,
      python: `import heapq

class Solution:
    def lastStoneWeight(self, stones: list[int]) -> int:
        h = [-s for s in stones]
        heapq.heapify(h)
        while len(h) > 1:
            y = -heapq.heappop(h)
            x = -heapq.heappop(h)
            if y > x:
                heapq.heappush(h, -(y - x))
        return -h[0] if h else 0`,
      cpp: `#include <vector>
#include <queue>
using namespace std;

class Solution {
public:
    int lastStoneWeight(vector<int>& stones) {
        priority_queue<int> pq(stones.begin(), stones.end());
        while (pq.size() > 1) {
            int y = pq.top(); pq.pop();
            int x = pq.top(); pq.pop();
            if (y > x) pq.push(y - x);
        }
        return pq.empty() ? 0 : pq.top();
    }
};`,
      java: `import java.util.*;

class Solution {
    public int lastStoneWeight(int[] stones) {
        PriorityQueue<Integer> pq = new PriorityQueue<>((a, b) -> b - a);
        for (int s : stones) pq.offer(s);
        while (pq.size() > 1) {
            int y = pq.poll();
            int x = pq.poll();
            if (y > x) pq.offer(y - x);
        }
        return pq.isEmpty() ? 0 : pq.peek();
    }
}`
    },
    sampleTestCases: [
      { id: 'lsw-1', input: [[2, 7, 4, 1, 8, 1]], expectedOutput: 1 },
      { id: 'lsw-2', input: [[1]], expectedOutput: 1 }
    ],
    hiddenTestCases: [
      { id: 'lsw-h1', input: [[2, 2]], expectedOutput: 0, isHidden: true }
    ],
    hints: [
      'A max-heap always gives you the two heaviest stones in O(log n).'
    ],
    solutionExplanation: `Insert all elements into a max-heap. Pop the two heaviest stones \`y\` and \`x\`. If \`y != x\`, push \`y - x\` back into the heap until at most one stone remains.

- **Time Complexity:** O(n log n)
- **Space Complexity:** O(n)`,
    timeLimitMs: 2000,
    memoryLimitMb: 128,
    acceptanceRate: 65.4,
    totalSubmissions: 175000,
    acceptedSubmissions: 114450
  },
  {
    id: 'p-k-closest-points-to-origin',
    slug: 'k-closest-points-to-origin',
    title: 'K Closest Points to Origin',
    difficulty: 'Medium',
    category: 'Heap / Priority Queue',
    tags: ['Array', 'Math', 'Divide and Conquer', 'Geometry', 'Sorting', 'Heap (Priority Queue)'],
    functionName: 'kClosest',
    paramNames: ['points', 'k'],
    description: `Given an array of \`points\` where \`points[i] = [x_i, y_i]\` represents a point on the **X-Y** plane and an integer \`k\`, return the \`k\` closest points to the origin \`(0, 0)\`.

The distance between two points on the **X-Y** plane is the Euclidean distance (i.e., \`√(x_1 - x_2)^2 + (y_1 - y_2)^2\`).

You may return the answer in **any order**. The answer is **guaranteed** to be **unique** (except for the order that it is in).

### Example 1:
\`\`\`
Input: points = [[1,3],[-2,2]], k = 1
Output: [[-2,2]]
Explanation:
The distance between (1, 3) and the origin is sqrt(10).
The distance between (-2, 2) and the origin is sqrt(8).
Since sqrt(8) < sqrt(10), (-2, 2) is closer to the origin.
We only want the closest k = 1 points from the origin, so the answer is just [[-2,2]].
\`\`\`

### Example 2:
\`\`\`
Input: points = [[3,3],[5,-1],[-2,4]], k = 2
Output: [[3,3],[-2,4]]
\`\`\`

### Constraints:
- \`1 <= k <= points.length <= 10^4\`
- \`-10^4 <= x_i, y_i <= 10^4\`
`,
    starterCode: {
      javascript: `/**
 * @param {number[][]} points
 * @param {number} k
 * @return {number[][]}
 */
function kClosest(points, k) {
  points.sort((a, b) => (a[0] ** 2 + a[1] ** 2) - (b[0] ** 2 + b[1] ** 2));
  return points.slice(0, k);
}`,
      python: `import heapq

class Solution:
    def kClosest(self, points: list[list[int]], k: int) -> list[list[int]]:
        points.sort(key=lambda p: p[0]**2 + p[1]**2)
        return points[:k]`,
      cpp: `#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    vector<vector<int>> kClosest(vector<vector<int>>& points, int k) {
        sort(points.begin(), points.end(), [](const vector<int>& a, const vector<int>& b) {
            return (a[0] * a[0] + a[1] * a[1]) < (b[0] * b[0] + b[1] * b[1]);
        });
        return vector<vector<int>>(points.begin(), points.begin() + k);
    }
};`,
      java: `import java.util.*;

class Solution {
    public int[][] kClosest(int[][] points, int k) {
        Arrays.sort(points, (a, b) -> Integer.compare(
            a[0] * a[0] + a[1] * a[1],
            b[0] * b[0] + b[1] * b[1]
        ));
        return Arrays.copyOfRange(points, 0, k);
    }
}`
    },
    sampleTestCases: [
      { id: 'kc-1', input: [[[1, 3], [-2, 2]], 1], expectedOutput: [[-2, 2]] },
      { id: 'kc-2', input: [[[3, 3], [5, -1], [-2, 4]], 2], expectedOutput: [[3, 3], [-2, 4]] }
    ],
    hiddenTestCases: [
      { id: 'kc-h1', input: [[[0, 1], [1, 0]], 2], expectedOutput: [[0, 1], [1, 0]], isHidden: true }
    ],
    hints: [
      'Square of distance x^2 + y^2 avoids floating point square roots.'
    ],
    solutionExplanation: `Calculate squared Euclidean distance \`x² + y²\` for each point. Sort or maintain a max-heap of size \`k\`. Return the first \`k\` points.

- **Time Complexity:** O(n log k) with max-heap or O(n log n) with sorting
- **Space Complexity:** O(k)`,
    timeLimitMs: 2000,
    memoryLimitMb: 128,
    acceptanceRate: 66.0,
    totalSubmissions: 190000,
    acceptedSubmissions: 125400
  }
];
