import { Problem } from '../../types';

export const GRAPH_PROBLEMS: Problem[] = [
  {
    id: 'p-number-of-islands',
    slug: 'number-of-islands',
    title: 'Number of Islands',
    difficulty: 'Medium',
    category: 'Graphs',
    tags: ['Array', 'Depth-First Search', 'Breadth-First Search', 'Union Find', 'Matrix'],
    functionName: 'numIslands',
    paramNames: ['grid'],
    description: `Given an \`m x n\` 2D binary grid \`grid\` which represents a map of \`'1'\`s (land) and \`'0'\`s (water), return *the number of islands*.

An **island** is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.

### Example 1:
\`\`\`
Input: grid = [
  ["1","1","1","1","0"],
  ["1","1","0","1","0"],
  ["1","1","0","0","0"],
  ["0","0","0","0","0"]
]
Output: 1
\`\`\`

### Example 2:
\`\`\`
Input: grid = [
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
]
Output: 3
\`\`\`

### Constraints:
- \`m == grid.length\`
- \`n == grid[i].length\`
- \`1 <= m, n <= 300\`
- \`grid[i][j]\` is \`'0'\` or \`'1'\`.
`,
    starterCode: {
      javascript: `/**
 * @param {character[][]} grid
 * @return {number}
 */
function numIslands(grid) {
  if (!grid || grid.length === 0) return 0;
  const m = grid.length, n = grid[0].length;
  let count = 0;

  function dfs(r, c) {
    if (r < 0 || r >= m || c < 0 || c >= n || grid[r][c] === '0') return;
    grid[r][c] = '0'; // Sink the island
    dfs(r + 1, c);
    dfs(r - 1, c);
    dfs(r, c + 1);
    dfs(r, c - 1);
  }

  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (grid[r][c] === '1') {
        count++;
        dfs(r, c);
      }
    }
  }
  return count;
}`,
      python: `class Solution:
    def numIslands(self, grid: list[list[str]]) -> int:
        if not grid:
            return 0
        m, n = len(grid), len(grid[0])
        count = 0

        def dfs(r, c):
            if r < 0 or r >= m or c < 0 or c >= n or grid[r][c] == '0':
                return
            grid[r][c] = '0'
            dfs(r + 1, c)
            dfs(r - 1, c)
            dfs(r, c + 1)
            dfs(r, c - 1)

        for r in range(m):
            for c in range(n):
                if grid[r][c] == '1':
                    count += 1
                    dfs(r, c)
        return count`,
      cpp: `#include <vector>
using namespace std;

class Solution {
public:
    int numIslands(vector<vector<char>>& grid) {
        if (grid.empty()) return 0;
        int m = grid.size(), n = grid[0].size();
        int count = 0;

        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                if (grid[r][c] == '1') {
                    count++;
                    dfs(r, c, grid);
                }
            }
        }
        return count;
    }
private:
    void dfs(int r, int c, vector<vector<char>>& grid) {
        if (r < 0 || r >= grid.size() || c < 0 || c >= grid[0].size() || grid[r][c] == '0') return;
        grid[r][c] = '0';
        dfs(r + 1, c, grid);
        dfs(r - 1, c, grid);
        dfs(r, c + 1, grid);
        dfs(r, c - 1, grid);
    }
};`,
      java: `class Solution {
    public int numIslands(char[][] grid) {
        if (grid == null || grid.length == 0) return 0;
        int m = grid.length, n = grid[0].length;
        int count = 0;

        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                if (grid[r][c] == '1') {
                    count++;
                    dfs(r, c, grid);
                }
            }
        }
        return count;
    }
    private void dfs(int r, int c, char[][] grid) {
        if (r < 0 || r >= grid.length || c < 0 || c >= grid[0].length || grid[r][c] == '0') return;
        grid[r][c] = '0';
        dfs(r + 1, c, grid);
        dfs(r - 1, c, grid);
        dfs(r, c + 1, grid);
        dfs(r, c - 1, grid);
    }
}`
    },
    sampleTestCases: [
      {
        id: 'ni-1',
        input: [
          [
            ['1', '1', '1', '1', '0'],
            ['1', '1', '0', '1', '0'],
            ['1', '1', '0', '0', '0'],
            ['0', '0', '0', '0', '0']
          ]
        ],
        expectedOutput: 1
      },
      {
        id: 'ni-2',
        input: [
          [
            ['1', '1', '0', '0', '0'],
            ['1', '1', '0', '0', '0'],
            ['0', '0', '1', '0', '0'],
            ['0', '0', '0', '1', '1']
          ]
        ],
        expectedOutput: 3
      }
    ],
    hiddenTestCases: [
      { id: 'ni-h1', input: [[['1']]], expectedOutput: 1, isHidden: true },
      { id: 'ni-h2', input: [[['0']]], expectedOutput: 0, isHidden: true }
    ],
    hints: [
      'Traverse the grid. Every time you encounter a "1", trigger a DFS/BFS to visit all connected land and mark as "0".'
    ],
    solutionExplanation: `Flood fill DFS/BFS: Traverse each cell. When a '1' is found, increment island count and run DFS in all 4 cardinal directions, mutating visited cells to '0' to avoid double-counting.

- **Time Complexity:** O(M * N)
- **Space Complexity:** O(M * N) in worst-case recursion call stack`,
    timeLimitMs: 2000,
    memoryLimitMb: 128,
    acceptanceRate: 58.2,
    totalSubmissions: 310000,
    acceptedSubmissions: 180420
  },
  {
    id: 'p-max-area-of-island',
    slug: 'max-area-of-island',
    title: 'Max Area of Island',
    difficulty: 'Medium',
    category: 'Graphs',
    tags: ['Array', 'Depth-First Search', 'Breadth-First Search', 'Union Find', 'Matrix'],
    functionName: 'maxAreaOfIsland',
    paramNames: ['grid'],
    description: `You are given an \`m x n\` binary matrix \`grid\`. An island is a group of \`1\`'s (representing land) connected **4-directionally** (horizontal or vertical.) You may assume all four edges of the grid are surrounded by water.

The **area** of an island is the number of cells with a value \`1\` in the island.

Return *the maximum **area** of an island in* \`grid\`. If there is no island, return \`0\`.

### Example 1:
\`\`\`
Input: grid = [
  [0,0,1,0,0,0,0,1,0,0,0,0,0],
  [0,0,0,0,0,0,0,1,1,1,0,0,0],
  [0,1,1,0,1,0,0,0,0,0,0,0,0],
  [0,1,0,0,1,1,0,0,1,0,1,0,0],
  [0,1,0,0,1,1,0,0,1,1,1,0,0],
  [0,0,0,0,0,0,0,0,0,0,1,0,0],
  [0,0,0,0,0,0,0,1,1,1,0,0,0],
  [0,0,0,0,0,0,0,1,1,0,0,0,0]
]
Output: 6
Explanation: The answer is not 11, because the island must be connected 4-directionally.
\`\`\`

### Constraints:
- \`m == grid.length\`
- \`n == grid[i].length\`
- \`1 <= m, n <= 50\`
- \`grid[i][j]\` is either \`0\` or \`1\`.
`,
    starterCode: {
      javascript: `/**
 * @param {number[][]} grid
 * @return {number}
 */
function maxAreaOfIsland(grid) {
  const m = grid.length, n = grid[0].length;
  let maxArea = 0;

  function dfs(r, c) {
    if (r < 0 || r >= m || c < 0 || c >= n || grid[r][c] === 0) return 0;
    grid[r][c] = 0;
    return 1 + dfs(r + 1, c) + dfs(r - 1, c) + dfs(r, c + 1) + dfs(r, c - 1);
  }

  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (grid[r][c] === 1) {
        maxArea = Math.max(maxArea, dfs(r, c));
      }
    }
  }
  return maxArea;
}`,
      python: `class Solution:
    def maxAreaOfIsland(self, grid: list[list[int]]) -> int:
        m, n = len(grid), len(grid[0])
        max_area = 0

        def dfs(r, c):
            if r < 0 or r >= m or c < 0 or c >= n or grid[r][c] == 0:
                return 0
            grid[r][c] = 0
            return 1 + dfs(r + 1, c) + dfs(r - 1, c) + dfs(r, c + 1) + dfs(r, c - 1)

        for r in range(m):
            for c in range(n):
                if grid[r][c] == 1:
                    max_area = max(max_area, dfs(r, c))
        return max_area`,
      cpp: `#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int maxAreaOfIsland(vector<vector<int>>& grid) {
        int m = grid.size(), n = grid[0].size();
        int maxArea = 0;
        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                if (grid[r][c] == 1) {
                    maxArea = max(maxArea, dfs(r, c, grid));
                }
            }
        }
        return maxArea;
    }
private:
    int dfs(int r, int c, vector<vector<int>>& grid) {
        if (r < 0 || r >= grid.size() || c < 0 || c >= grid[0].size() || grid[r][c] == 0) return 0;
        grid[r][c] = 0;
        return 1 + dfs(r + 1, c, grid) + dfs(r - 1, c, grid) + dfs(r, c + 1, grid) + dfs(r, c - 1, grid);
    }
};`,
      java: `class Solution {
    public int maxAreaOfIsland(int[][] grid) {
        int m = grid.length, n = grid[0].length;
        int maxArea = 0;
        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                if (grid[r][c] == 1) {
                    maxArea = Math.max(maxArea, dfs(r, c, grid));
                }
            }
        }
        return maxArea;
    }
    private int dfs(int r, int c, int[][] grid) {
        if (r < 0 || r >= grid.length || c < 0 || c >= grid[0].length || grid[r][c] == 0) return 0;
        grid[r][c] = 0;
        return 1 + dfs(r + 1, c, grid) + dfs(r - 1, c, grid) + dfs(r, c + 1, grid) + dfs(r, c - 1, grid);
    }
}`
    },
    sampleTestCases: [
      {
        id: 'mai-1',
        input: [
          [
            [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
            [0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0],
            [0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0]
          ]
        ],
        expectedOutput: 6
      },
      {
        id: 'mai-2',
        input: [[[0, 0, 0, 0, 0, 0, 0, 0]]],
        expectedOutput: 0
      }
    ],
    hiddenTestCases: [
      { id: 'mai-h1', input: [[[1]]], expectedOutput: 1, isHidden: true }
    ],
    hints: [
      'DFS returning 1 + dfs(neighbors) easily calculates the connected component area.'
    ],
    solutionExplanation: `Run DFS on each unvisited '1'. Return 1 + sum of areas of all 4 neighboring cells. Keep track of the maximum returned area.

- **Time Complexity:** O(M * N)
- **Space Complexity:** O(M * N)`,
    timeLimitMs: 2000,
    memoryLimitMb: 128,
    acceptanceRate: 72.1,
    totalSubmissions: 180000,
    acceptedSubmissions: 129780
  },
  {
    id: 'p-rotting-oranges',
    slug: 'rotting-oranges',
    title: 'Rotting Oranges',
    difficulty: 'Medium',
    category: 'Graphs',
    tags: ['Array', 'Breadth-First Search', 'Matrix'],
    functionName: 'orangesRotting',
    paramNames: ['grid'],
    description: `You are given an \`m x n\` grid where each cell can have one of three values:
- \`0\` representing an empty cell,
- \`1\` representing a fresh orange, or
- \`2\` representing a rotten orange.

Every minute, any fresh orange that is **4-directionally adjacent** to a rotten orange becomes rotten.

Return *the minimum number of minutes that must elapse until no cell has a fresh orange*. If this is impossible, return \`-1\`.

### Example 1:
\`\`\`
Input: grid = [[2,1,1],[1,1,0],[0,1,1]]
Output: 4
\`\`\`

### Example 2:
\`\`\`
Input: grid = [[2,1,1],[0,1,1],[1,0,1]]
Output: -1
Explanation: The orange in the bottom left corner (row 2, column 0) is never rotten, because rotting only happens 4-directionally.
\`\`\`

### Example 3:
\`\`\`
Input: grid = [[0,2]]
Output: 0
Explanation: Since there are already no fresh oranges at minute 0, the answer is just 0.
\`\`\`

### Constraints:
- \`m == grid.length\`
- \`n == grid[i].length\`
- \`1 <= m, n <= 10\`
- \`grid[i][j]\` is \`0\`, \`1\`, or \`2\`.
`,
    starterCode: {
      javascript: `/**
 * @param {number[][]} grid
 * @return {number}
 */
function orangesRotting(grid) {
  const m = grid.length, n = grid[0].length;
  const queue = [];
  let fresh = 0;

  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (grid[r][c] === 2) queue.push([r, c]);
      else if (grid[r][c] === 1) fresh++;
    }
  }

  if (fresh === 0) return 0;
  let minutes = 0;
  const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];

  while (queue.length > 0 && fresh > 0) {
    const size = queue.length;
    for (let i = 0; i < size; i++) {
      const [r, c] = queue.shift();
      for (const [dr, dc] of directions) {
        const nr = r + dr, nc = c + dc;
        if (nr >= 0 && nr < m && nc >= 0 && nc < n && grid[nr][nc] === 1) {
          grid[nr][nc] = 2;
          fresh--;
          queue.push([nr, nc]);
        }
      }
    }
    minutes++;
  }

  return fresh === 0 ? minutes : -1;
}`,
      python: `from collections import deque

class Solution:
    def orangesRotting(self, grid: list[list[int]]) -> int:
        m, n = len(grid), len(grid[0])
        q = deque()
        fresh = 0
        for r in range(m):
            for c in range(n):
                if grid[r][c] == 2:
                    q.append((r, c))
                elif grid[r][c] == 1:
                    fresh += 1

        if fresh == 0:
            return 0

        minutes = 0
        directions = [(1, 0), (-1, 0), (0, 1), (0, -1)]
        while q and fresh > 0:
            for _ in range(len(q)):
                r, c = q.popleft()
                for dr, dc in directions:
                    nr, nc = r + dr, c + dc
                    if 0 <= nr < m and 0 <= nc < n and grid[nr][nc] == 1:
                        grid[nr][nc] = 2
                        fresh -= 1
                        q.append((nr, nc))
            minutes += 1

        return minutes if fresh == 0 else -1`,
      cpp: `#include <vector>
#include <queue>
using namespace std;

class Solution {
public:
    int orangesRotting(vector<vector<int>>& grid) {
        int m = grid.size(), n = grid[0].size();
        queue<pair<int, int>> q;
        int fresh = 0;

        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                if (grid[r][c] == 2) q.push({r, c});
                else if (grid[r][c] == 1) fresh++;
            }
        }

        if (fresh == 0) return 0;
        int minutes = 0;
        vector<pair<int, int>> dirs = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};

        while (!q.empty() && fresh > 0) {
            int sz = q.size();
            for (int i = 0; i < sz; i++) {
                auto [r, c] = q.front(); q.pop();
                for (auto [dr, dc] : dirs) {
                    int nr = r + dr, nc = c + dc;
                    if (nr >= 0 && nr < m && nc >= 0 && nc < n && grid[nr][nc] == 1) {
                        grid[nr][nc] = 2;
                        fresh--;
                        q.push({nr, nc});
                    }
                }
            }
            minutes++;
        }
        return fresh == 0 ? minutes : -1;
    }
};`,
      java: `import java.util.*;

class Solution {
    public int orangesRotting(int[][] grid) {
        int m = grid.length, n = grid[0].length;
        Queue<int[]> q = new LinkedList<>();
        int fresh = 0;

        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                if (grid[r][c] == 2) q.offer(new int[]{r, c});
                else if (grid[r][c] == 1) fresh++;
            }
        }

        if (fresh == 0) return 0;
        int minutes = 0;
        int[][] dirs = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};

        while (!q.isEmpty() && fresh > 0) {
            int sz = q.size();
            for (int i = 0; i < sz; i++) {
                int[] curr = q.poll();
                for (int[] d : dirs) {
                    int nr = curr[0] + d[0], nc = curr[1] + d[1];
                    if (nr >= 0 && nr < m && nc >= 0 && nc < n && grid[nr][nc] == 1) {
                        grid[nr][nc] = 2;
                        fresh--;
                        q.offer(new int[]{nr, nc});
                    }
                }
            }
            minutes++;
        }
        return fresh == 0 ? minutes : -1;
    }
}`
    },
    sampleTestCases: [
      { id: 'ro-1', input: [[[2, 1, 1], [1, 1, 0], [0, 1, 1]]], expectedOutput: 4 },
      { id: 'ro-2', input: [[[2, 1, 1], [0, 1, 1], [1, 0, 1]]], expectedOutput: -1 },
      { id: 'ro-3', input: [[[0, 2]]], expectedOutput: 0 }
    ],
    hiddenTestCases: [
      { id: 'ro-h1', input: [[[1]]], expectedOutput: -1, isHidden: true },
      { id: 'ro-h2', input: [[[0]]], expectedOutput: 0, isHidden: true }
    ],
    hints: [
      'Multi-source BFS: initialize queue with all rotten oranges simultaneously.'
    ],
    solutionExplanation: `Multi-source BFS: Place all originally rotten oranges into a BFS queue. At each level of BFS, rot all 4-directionally adjacent fresh oranges and decrement fresh count.

- **Time Complexity:** O(M * N)
- **Space Complexity:** O(M * N)`,
    timeLimitMs: 2000,
    memoryLimitMb: 128,
    acceptanceRate: 53.4,
    totalSubmissions: 210000,
    acceptedSubmissions: 112140
  },
  {
    id: 'p-course-schedule',
    slug: 'course-schedule',
    title: 'Course Schedule',
    difficulty: 'Medium',
    category: 'Graphs',
    tags: ['Depth-First Search', 'Breadth-First Search', 'Graph', 'Topological Sort'],
    functionName: 'canFinish',
    paramNames: ['numCourses', 'prerequisites'],
    description: `There are a total of \`numCourses\` courses you have to take, labeled from \`0\` to \`numCourses - 1\`. You are given an array \`prerequisites\` where \`prerequisites[i] = [a_i, b_i]\` indicates that you **must** take course \`b_i\` first if you want to take course \`a_i\`.

- For example, the pair \`[0, 1]\`, indicates that to take course \`0\` you have to first take course \`1\`.

Return \`true\` if you can finish all courses. Otherwise, return \`false\`.

### Example 1:
\`\`\`
Input: numCourses = 2, prerequisites = [[1,0]]
Output: true
Explanation: There are a total of 2 courses to take. 
To take course 1 you should have finished course 0. So it is possible.
\`\`\`

### Example 2:
\`\`\`
Input: numCourses = 2, prerequisites = [[1,0],[0,1]]
Output: false
Explanation: To take course 1 you should have finished course 0, and to take course 0 you should also have finished course 1. So it is impossible.
\`\`\`

### Constraints:
- \`1 <= numCourses <= 2000\`
- \`0 <= prerequisites.length <= 5000\`
- \`prerequisites[i].length == 2\`
- \`0 <= a_i, b_i < numCourses\`
- All the pairs prerequisites[i] are **unique**.
`,
    starterCode: {
      javascript: `/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
function canFinish(numCourses, prerequisites) {
  const adj = Array.from({ length: numCourses }, () => []);
  const inDegree = new Array(numCourses).fill(0);

  for (const [course, pre] of prerequisites) {
    adj[pre].push(course);
    inDegree[course]++;
  }

  const queue = [];
  for (let i = 0; i < numCourses; i++) {
    if (inDegree[i] === 0) queue.push(i);
  }

  let taken = 0;
  while (queue.length > 0) {
    const node = queue.shift();
    taken++;
    for (const next of adj[node]) {
      inDegree[next]--;
      if (inDegree[next] === 0) queue.push(next);
    }
  }

  return taken === numCourses;
}`,
      python: `from collections import deque

class Solution:
    def canFinish(self, numCourses: int, prerequisites: list[list[int]]) -> bool:
        adj = [[] for _ in range(numCourses)]
        in_degree = [0] * numCourses
        for course, pre in prerequisites:
            adj[pre].append(course)
            in_degree[course] += 1

        q = deque([i for i in range(numCourses) if in_degree[i] == 0])
        taken = 0
        while q:
            node = q.popleft()
            taken += 1
            for next_node in adj[node]:
                in_degree[next_node] -= 1
                if in_degree[next_node] == 0:
                    q.append(next_node)

        return taken == numCourses`,
      cpp: `#include <vector>
#include <queue>
using namespace std;

class Solution {
public:
    bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {
        vector<vector<int>> adj(numCourses);
        vector<int> inDegree(numCourses, 0);

        for (const auto& p : prerequisites) {
            adj[p[1]].push_back(p[0]);
            inDegree[p[0]]++;
        }

        queue<int> q;
        for (int i = 0; i < numCourses; i++) {
            if (inDegree[i] == 0) q.push(i);
        }

        int taken = 0;
        while (!q.empty()) {
            int node = q.front(); q.pop();
            taken++;
            for (int next : adj[node]) {
                inDegree[next]--;
                if (inDegree[next] == 0) q.push(next);
            }
        }
        return taken == numCourses;
    }
};`,
      java: `import java.util.*;

class Solution {
    public boolean canFinish(int numCourses, int[][] prerequisites) {
        List<Integer>[] adj = new ArrayList[numCourses];
        for (int i = 0; i < numCourses; i++) adj[i] = new ArrayList<>();
        int[] inDegree = new int[numCourses];

        for (int[] p : prerequisites) {
            adj[p[1]].add(p[0]);
            inDegree[p[0]]++;
        }

        Queue<Integer> q = new LinkedList<>();
        for (int i = 0; i < numCourses; i++) {
            if (inDegree[i] == 0) q.offer(i);
        }

        int taken = 0;
        while (!q.isEmpty()) {
            int node = q.poll();
            taken++;
            for (int next : adj[node]) {
                inDegree[next]--;
                if (inDegree[next] == 0) q.offer(next);
            }
        }
        return taken == numCourses;
    }
}`
    },
    sampleTestCases: [
      { id: 'cs-1', input: [2, [[1, 0]]], expectedOutput: true },
      { id: 'cs-2', input: [2, [[1, 0], [0, 1]]], expectedOutput: false }
    ],
    hiddenTestCases: [
      { id: 'cs-h1', input: [1, []], expectedOutput: true, isHidden: true },
      { id: 'cs-h2', input: [3, [[0, 1], [1, 2], [2, 0]]], expectedOutput: false, isHidden: true }
    ],
    hints: [
      "Topological sort (Kahn's Algorithm) detects directed cycles in DAGs."
    ],
    solutionExplanation: `Kahn's Algorithm for Topological Sort: Compute in-degree for all courses. Add zero in-degree courses to queue. Incrementally reduce in-degrees of dependent courses. If total taken courses == numCourses, no cycle exists.

- **Time Complexity:** O(V + E)
- **Space Complexity:** O(V + E)`,
    timeLimitMs: 2000,
    memoryLimitMb: 128,
    acceptanceRate: 46.2,
    totalSubmissions: 250000,
    acceptedSubmissions: 115500
  }
];
