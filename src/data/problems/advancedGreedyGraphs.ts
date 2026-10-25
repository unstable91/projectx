import { Problem } from '../../types';

export const ADVANCED_GREEDY_GRAPHS_PROBLEMS: Problem[] = [
  {
    id: 'p-gas-station',
    slug: 'gas-station',
    title: 'Gas Station',
    difficulty: 'Medium',
    category: 'Greedy',
    tags: ['Array', 'Greedy'],
    functionName: 'canCompleteCircuit',
    paramNames: ['gas', 'cost'],
    description: `There are \`n\` gas stations along a circular route, where the amount of gas at the \`i-th\` station is \`gas[i]\`.

You have a car with an unlimited gas tank and it costs \`cost[i]\` of gas to travel from the \`i-th\` station to its next \`(i + 1)-th\` station. You begin the journey with an empty tank at one of the gas stations.

Given two integer arrays \`gas\` and \`cost\`, return *the starting gas station's index if you can travel around the circuit once in the clockwise direction, otherwise return* \`-1\`. If there exists a solution, it is **guaranteed** to be **unique**.

### Example 1:
\`\`\`
Input: gas = [1,2,3,4,5], cost = [3,4,5,1,2]
Output: 3
Explanation:
Start at station 3 (index 3) and fill up with 4 unit of gas. Your tank = 0 + 4 = 4
Travel to station 4. Your tank = 4 - 1 + 5 = 8
Travel to station 0. Your tank = 8 - 2 + 1 = 7
Travel to station 1. Your tank = 7 - 3 + 2 = 6
Travel to station 2. Your tank = 6 - 4 + 3 = 5
Travel to station 3. The cost is 5. Your gas is just enough to travel back to station 3.
Therefore, return 3 as the starting index.
\`\`\`

### Example 2:
\`\`\`
Input: gas = [2,3,4], cost = [3,4,3]
Output: -1
Explanation:
You cannot start at station 0 or 1, as there is not enough gas to travel to the next station.
Let's start at station 2 and fill up with 4 unit of gas. Your tank = 0 + 4 = 4
Travel to station 0. Your tank = 4 - 3 + 2 = 3
Travel to station 1. Your tank = 3 - 3 + 3 = 3
You cannot travel back to station 2, as it requires 4 unit of gas but you only have 3.
Therefore, you cannot travel around the circuit once no matter where you start.
\`\`\`

### Constraints:
- \`n == gas.length == cost.length\`
- \`1 <= n <= 10^5\`
- \`0 <= gas[i], cost[i] <= 10^4\`
`,
    starterCode: {
      javascript: `/**
 * @param {number[]} gas
 * @param {number[]} cost
 * @return {number}
 */
function canCompleteCircuit(gas, cost) {
  let totalGas = 0, totalCost = 0;
  for (let i = 0; i < gas.length; i++) {
    totalGas += gas[i];
    totalCost += cost[i];
  }
  if (totalGas < totalCost) return -1;

  let total = 0, start = 0;
  for (let i = 0; i < gas.length; i++) {
    total += gas[i] - cost[i];
    if (total < 0) {
      total = 0;
      start = i + 1;
    }
  }
  return start;
}`,
      python: `class Solution:
    def canCompleteCircuit(self, gas: list[int], cost: list[int]) -> int:
        if sum(gas) < sum(cost):
            return -1
        total = 0
        start = 0
        for i in range(len(gas)):
            total += gas[i] - cost[i]
            if total < 0:
                total = 0
                start = i + 1
        return start`,
      cpp: `#include <vector>
#include <numeric>
using namespace std;

class Solution {
public:
    int canCompleteCircuit(vector<int>& gas, vector<int>& cost) {
        int totalGas = 0, totalCost = 0;
        for (size_t i = 0; i < gas.size(); i++) {
            totalGas += gas[i];
            totalCost += cost[i];
        }
        if (totalGas < totalCost) return -1;

        int total = 0, start = 0;
        for (size_t i = 0; i < gas.size(); i++) {
            total += gas[i] - cost[i];
            if (total < 0) {
                total = 0;
                start = i + 1;
            }
        }
        return start;
    }
};`,
      java: `class Solution {
    public int canCompleteCircuit(int[] gas, int[] cost) {
        int totalGas = 0, totalCost = 0;
        for (int i = 0; i < gas.length; i++) {
            totalGas += gas[i];
            totalCost += cost[i];
        }
        if (totalGas < totalCost) return -1;

        int total = 0, start = 0;
        for (int i = 0; i < gas.length; i++) {
            total += gas[i] - cost[i];
            if (total < 0) {
                total = 0;
                start = i + 1;
            }
        }
        return start;
    }
}`
    },
    sampleTestCases: [
      { id: 'gc-1', input: [[1, 2, 3, 4, 5], [3, 4, 5, 1, 2]], expectedOutput: 3 },
      { id: 'gc-2', input: [[2, 3, 4], [3, 4, 3]], expectedOutput: -1 }
    ],
    hiddenTestCases: [
      { id: 'gc-h1', input: [[5, 1, 2, 3, 4], [4, 4, 1, 5, 1]], expectedOutput: 4, isHidden: true }
    ],
    hints: [
      'If sum(gas) < sum(cost), it is impossible to complete the circuit.',
      'Whenever the running gas tank dips below 0, reset start to i + 1.'
    ],
    solutionExplanation: `If total gas < total cost, completion is mathematically impossible. Otherwise, a unique valid start is guaranteed. Reset \`start = i + 1\` whenever the cumulative tank becomes negative.

- **Time Complexity:** O(n)
- **Space Complexity:** O(1)`,
    timeLimitMs: 2000,
    memoryLimitMb: 128,
    acceptanceRate: 45.4,
    totalSubmissions: 220000,
    acceptedSubmissions: 99880
  },
  {
    id: 'p-partition-labels',
    slug: 'partition-labels',
    title: 'Partition Labels',
    difficulty: 'Medium',
    category: 'Greedy',
    tags: ['Hash Table', 'Two Pointers', 'String', 'Greedy'],
    functionName: 'partitionLabels',
    paramNames: ['s'],
    description: `You are given a string \`s\`. We want to partition the string into as many parts as possible so that each letter appears in at most one part.

Note that the partition is done so that after concatenating all the parts in order, the resultant string should be \`s\`.

Return *a list of integers representing the size of these parts*.

### Example 1:
\`\`\`
Input: s = "ababcbacadefegdehijhklij"
Output: [9,7,8]
Explanation:
The partition is "ababcbaca", "defegde", "hijhklij".
This is a partition so that each letter appears in at most one part.
A partition like "ababcbacadefegde", "hijhklij" is incorrect, because it splits s into less parts.
\`\`\`

### Example 2:
\`\`\`
Input: s = "eccbbbbdec"
Output: [10]
\`\`\`

### Constraints:
- \`1 <= s.length <= 500\`
- \`s\` consists of lowercase English letters.
`,
    starterCode: {
      javascript: `/**
 * @param {string} s
 * @return {number[]}
 */
function partitionLabels(s) {
  const last = {};
  for (let i = 0; i < s.length; i++) last[s[i]] = i;

  const res = [];
  let size = 0, end = 0;
  for (let i = 0; i < s.length; i++) {
    size++;
    end = Math.max(end, last[s[i]]);
    if (i === end) {
      res.push(size);
      size = 0;
    }
  }
  return res;
}`,
      python: `class Solution:
    def partitionLabels(self, s: str) -> list[int]:
        last = {c: i for i, c in enumerate(s)}
        res = []
        size, end = 0, 0
        for i, c in enumerate(s):
            size += 1
            end = max(end, last[c])
            if i == end:
                res.append(size)
                size = 0
        return res`,
      cpp: `#include <vector>
#include <string>
#include <algorithm>
using namespace std;

class Solution {
public:
    vector<int> partitionLabels(string s) {
        vector<int> last(26, 0);
        for (int i = 0; i < s.size(); i++) last[s[i] - 'a'] = i;

        vector<int> res;
        int size = 0, end = 0;
        for (int i = 0; i < s.size(); i++) {
            size++;
            end = max(end, last[s[i] - 'a']);
            if (i == end) {
                res.push_back(size);
                size = 0;
            }
        }
        return res;
    }
};`,
      java: `import java.util.*;

class Solution {
    public List<Integer> partitionLabels(String s) {
        int[] last = new int[26];
        for (int i = 0; i < s.length(); i++) last[s.charAt(i) - 'a'] = i;

        List<Integer> res = new ArrayList<>();
        int size = 0, end = 0;
        for (int i = 0; i < s.length(); i++) {
            size++;
            end = Math.max(end, last[s.charAt(i) - 'a']);
            if (i == end) {
                res.add(size);
                size = 0;
            }
        }
        return res;
    }
}`
    },
    sampleTestCases: [
      { id: 'pl-1', input: ['ababcbacadefegdehijhklij'], expectedOutput: [9, 7, 8] },
      { id: 'pl-2', input: ['eccbbbbdec'], expectedOutput: [10] }
    ],
    hiddenTestCases: [
      { id: 'pl-h1', input: ['a'], expectedOutput: [1], isHidden: true }
    ],
    hints: [
      'Record the last occurrence of each character.'
    ],
    solutionExplanation: `Greedy strategy: Store the last index of every character. For each partition, expand \`end = max(end, last[c])\`. When index \`i == end\`, a clean partition boundary is reached.

- **Time Complexity:** O(n)
- **Space Complexity:** O(1)`,
    timeLimitMs: 2000,
    memoryLimitMb: 128,
    acceptanceRate: 79.8,
    totalSubmissions: 200000,
    acceptedSubmissions: 159600
  },
  {
    id: 'p-meeting-rooms',
    slug: 'meeting-rooms',
    title: 'Meeting Rooms',
    difficulty: 'Easy',
    category: 'Intervals',
    tags: ['Array', 'Sorting'],
    functionName: 'canAttendMeetings',
    paramNames: ['intervals'],
    description: `Given an array of meeting time \`intervals\` where \`intervals[i] = [start_i, end_i]\`, determine if a person could attend all meetings.

### Example 1:
\`\`\`
Input: intervals = [[0,30],[5,10],[15,20]]
Output: false
\`\`\`

### Example 2:
\`\`\`
Input: intervals = [[7,10],[2,4]]
Output: true
\`\`\`

### Constraints:
- \`0 <= intervals.length <= 10^4\`
- \`intervals[i].length == 2\`
- \`0 <= start_i < end_i <= 10^6\`
`,
    starterCode: {
      javascript: `/**
 * @param {number[][]} intervals
 * @return {boolean}
 */
function canAttendMeetings(intervals) {
  intervals.sort((a, b) => a[0] - b[0]);
  for (let i = 1; i < intervals.length; i++) {
    if (intervals[i][0] < intervals[i - 1][1]) {
      return false;
    }
  }
  return true;
}`,
      python: `class Solution:
    def canAttendMeetings(self, intervals: list[list[int]]) -> bool:
        intervals.sort(key=lambda x: x[0])
        for i in range(1, len(intervals)):
            if intervals[i][0] < intervals[i - 1][1]:
                return False
        return True`,
      cpp: `#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    bool canAttendMeetings(vector<vector<int>>& intervals) {
        sort(intervals.begin(), intervals.end());
        for (size_t i = 1; i < intervals.size(); i++) {
            if (intervals[i][0] < intervals[i - 1][1]) return false;
        }
        return true;
    }
};`,
      java: `import java.util.*;

class Solution {
    public boolean canAttendMeetings(int[][] intervals) {
        Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));
        for (int i = 1; i < intervals.length; i++) {
            if (intervals[i][0] < intervals[i - 1][1]) return false;
        }
        return true;
    }
}`
    },
    sampleTestCases: [
      { id: 'mr-1', input: [[[0, 30], [5, 10], [15, 20]]], expectedOutput: false },
      { id: 'mr-2', input: [[[7, 10], [2, 4]]], expectedOutput: true }
    ],
    hiddenTestCases: [
      { id: 'mr-h1', input: [[]], expectedOutput: true, isHidden: true }
    ],
    hints: [
      'Sort intervals by start time. Check if consecutive intervals overlap.'
    ],
    solutionExplanation: `Sort intervals by their starting times. If any meeting begins before the prior meeting concludes (\`intervals[i][0] < intervals[i - 1][1]\`), attendance is impossible.

- **Time Complexity:** O(n log n)
- **Space Complexity:** O(1)`,
    timeLimitMs: 2000,
    memoryLimitMb: 128,
    acceptanceRate: 57.1,
    totalSubmissions: 150000,
    acceptedSubmissions: 85650
  },
  {
    id: 'p-surrounded-regions',
    slug: 'surrounded-regions',
    title: 'Surrounded Regions',
    difficulty: 'Medium',
    category: 'Graphs',
    tags: ['Array', 'Depth-First Search', 'Breadth-First Search', 'Union Find', 'Matrix'],
    functionName: 'solve',
    paramNames: ['board'],
    description: `Given an \`m x n\` matrix \`board\` containing \`'X'\` and \`'O'\`, *capture all regions that are 4-directionally surrounded by* \`'X'\`.

A region is captured by flipping all \`'O'\`s into \`'X'\`s in that surrounded region. Any \`'O'\` on the border of the board is **not** surrounded.

### Example 1:
\`\`\`
Input: board = [
  ["X","X","X","X"],
  ["X","O","O","X"],
  ["X","X","O","X"],
  ["X","O","X","X"]
]
Output: [
  ["X","X","X","X"],
  ["X","X","X","X"],
  ["X","X","X","X"],
  ["X","O","X","X"]
]
Explanation: The 'O' at the bottom border is not surrounded.
\`\`\`

### Constraints:
- \`m == board.length\`
- \`n == board[i].length\`
- \`1 <= m, n <= 200\`
- \`board[i][j]\` is \`'X'\` or \`'O'\`.
`,
    starterCode: {
      javascript: `/**
 * @param {character[][]} board
 * @return {character[][]}
 */
function solve(board) {
  const m = board.length, n = board[0].length;

  function dfs(r, c) {
    if (r < 0 || r >= m || c < 0 || c >= n || board[r][c] !== 'O') return;
    board[r][c] = 'T'; // Mark temporary unsourrounded
    dfs(r + 1, c);
    dfs(r - 1, c);
    dfs(r, c + 1);
    dfs(r, c - 1);
  }

  // Capture boundary connected O's
  for (let r = 0; r < m; r++) {
    dfs(r, 0);
    dfs(r, n - 1);
  }
  for (let c = 0; c < n; c++) {
    dfs(0, c);
    dfs(m - 1, c);
  }

  // Flip remaining O to X and T back to O
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (board[r][c] === 'O') board[r][c] = 'X';
      else if (board[r][c] === 'T') board[r][c] = 'O';
    }
  }
  return board;
}`,
      python: `class Solution:
    def solve(self, board: list[list[str]]) -> list[list[str]]:
        m, n = len(board), len(board[0])
        def dfs(r, c):
            if r < 0 or r >= m or c < 0 or c >= n or board[r][c] != 'O':
                return
            board[r][c] = 'T'
            dfs(r + 1, c)
            dfs(r - 1, c)
            dfs(r, c + 1)
            dfs(r, c - 1)

        for r in range(m):
            dfs(r, 0)
            dfs(r, n - 1)
        for c in range(n):
            dfs(0, c)
            dfs(m - 1, c)

        for r in range(m):
            for c in range(n):
                if board[r][c] == 'O':
                    board[r][c] = 'X'
                elif board[r][c] == 'T':
                    board[r][c] = 'O'
        return board`,
      cpp: `#include <vector>
using namespace std;

class Solution {
public:
    vector<vector<char>> solve(vector<vector<char>>& board) {
        int m = board.size(), n = board[0].size();
        for (int r = 0; r < m; r++) {
            dfs(r, 0, board);
            dfs(r, n - 1, board);
        }
        for (int c = 0; c < n; c++) {
            dfs(0, c, board);
            dfs(m - 1, c, board);
        }
        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                if (board[r][c] == 'O') board[r][c] = 'X';
                else if (board[r][c] == 'T') board[r][c] = 'O';
            }
        }
        return board;
    }
private:
    void dfs(int r, int c, vector<vector<char>>& board) {
        if (r < 0 || r >= board.size() || c < 0 || c >= board[0].size() || board[r][c] != 'O') return;
        board[r][c] = 'T';
        dfs(r + 1, c, board);
        dfs(r - 1, c, board);
        dfs(r, c + 1, board);
        dfs(r, c - 1, board);
    }
};`,
      java: `class Solution {
    public char[][] solve(char[][] board) {
        int m = board.length, n = board[0].length;
        for (int r = 0; r < m; r++) {
            dfs(r, 0, board);
            dfs(r, n - 1, board);
        }
        for (int c = 0; c < n; c++) {
            dfs(0, c, board);
            dfs(m - 1, c, board);
        }
        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                if (board[r][c] == 'O') board[r][c] = 'X';
                else if (board[r][c] == 'T') board[r][c] = 'O';
            }
        }
        return board;
    }
    private void dfs(int r, int c, char[][] board) {
        if (r < 0 || r >= board.length || c < 0 || c >= board[0].length || board[r][c] != 'O') return;
        board[r][c] = 'T';
        dfs(r + 1, c, board);
        dfs(r - 1, c, board);
        dfs(r, c + 1, board);
        dfs(r, c - 1, board);
    }
}`
    },
    sampleTestCases: [
      {
        id: 'sr-1',
        input: [
          [
            ['X', 'X', 'X', 'X'],
            ['X', 'O', 'O', 'X'],
            ['X', 'X', 'O', 'X'],
            ['X', 'O', 'X', 'X']
          ]
        ],
        expectedOutput: [
          ['X', 'X', 'X', 'X'],
          ['X', 'X', 'X', 'X'],
          ['X', 'X', 'X', 'X'],
          ['X', 'O', 'X', 'X']
        ]
      }
    ],
    hiddenTestCases: [
      { id: 'sr-h1', input: [[['X']]], expectedOutput: [['X']], isHidden: true }
    ],
    hints: [
      'Inverse thinking: any O connected to the border cannot be captured.'
    ],
    solutionExplanation: `Start DFS from all border 'O's and temporarily mark them as 'T'. Any remaining 'O's in the interior are strictly surrounded and can be flipped to 'X'. Finally, restore 'T's back to 'O'.

- **Time Complexity:** O(M * N)
- **Space Complexity:** O(M * N)`,
    timeLimitMs: 2000,
    memoryLimitMb: 128,
    acceptanceRate: 38.6,
    totalSubmissions: 210000,
    acceptedSubmissions: 81060
  }
];
