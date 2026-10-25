import { Problem } from '../../types';

export const BACKTRACKING_PROBLEMS: Problem[] = [
  {
    id: 'p-subsets',
    slug: 'subsets',
    title: 'Subsets',
    difficulty: 'Medium',
    category: 'Backtracking',
    tags: ['Array', 'Backtracking', 'Bit Manipulation'],
    functionName: 'subsets',
    paramNames: ['nums'],
    description: `Given an integer array \`nums\` of **unique** elements, return *all possible subsets (the power set)*.

The solution set **must not** contain duplicate subsets. Return the solution in **any order**.

### Example 1:
\`\`\`
Input: nums = [1,2,3]
Output: [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]
\`\`\`

### Example 2:
\`\`\`
Input: nums = [0]
Output: [[],[0]]
\`\`\`

### Constraints:
- \`1 <= nums.length <= 10\`
- \`-10 <= nums[i] <= 10\`
- All the numbers of \`nums\` are **unique**.
`,
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @return {number[][]}
 */
function subsets(nums) {
  const res = [];
  const subset = [];

  function dfs(i) {
    if (i >= nums.length) {
      res.push([...subset]);
      return;
    }
    // Include nums[i]
    subset.push(nums[i]);
    dfs(i + 1);
    // Don't include nums[i]
    subset.pop();
    dfs(i + 1);
  }

  dfs(0);
  return res;
}`,
      python: `class Solution:
    def subsets(self, nums: list[int]) -> list[list[int]]:
        res = []
        subset = []
        def dfs(i):
            if i >= len(nums):
                res.append(subset.copy())
                return
            subset.append(nums[i])
            dfs(i + 1)
            subset.pop()
            dfs(i + 1)
        dfs(0)
        return res`,
      cpp: `#include <vector>
using namespace std;

class Solution {
public:
    vector<vector<int>> subsets(vector<int>& nums) {
        vector<vector<int>> res;
        vector<int> subset;
        dfs(0, nums, subset, res);
        return res;
    }
private:
    void dfs(int i, const vector<int>& nums, vector<int>& subset, vector<vector<int>>& res) {
        if (i >= nums.size()) {
            res.push_back(subset);
            return;
        }
        subset.push_back(nums[i]);
        dfs(i + 1, nums, subset, res);
        subset.pop();
        dfs(i + 1, nums, subset, res);
    }
};`,
      java: `import java.util.*;

class Solution {
    public List<List<Integer>> subsets(int[] nums) {
        List<List<Integer>> res = new ArrayList<>();
        dfs(0, nums, new ArrayList<>(), res);
        return res;
    }
    private void dfs(int i, int[] nums, List<Integer> subset, List<List<Integer>> res) {
        if (i >= nums.length) {
            res.add(new ArrayList<>(subset));
            return;
        }
        subset.add(nums[i]);
        dfs(i + 1, nums, subset, res);
        subset.remove(subset.size() - 1);
        dfs(i + 1, nums, subset, res);
    }
}`
    },
    sampleTestCases: [
      { id: 'sub-1', input: [[1, 2, 3]], expectedOutput: [[1, 2, 3], [1, 2], [1, 3], [1], [2, 3], [2], [3], []] },
      { id: 'sub-2', input: [[0]], expectedOutput: [[0], []] }
    ],
    hiddenTestCases: [
      { id: 'sub-h1', input: [[1, 2]], expectedOutput: [[1, 2], [1], [2], []], isHidden: true }
    ],
    hints: [
      'At each index, you make a binary choice: include the element or exclude it.'
    ],
    solutionExplanation: `Binary decision tree backtracking: for each element, recurse with the element included, then backtrack and recurse with it excluded. There are 2ⁿ subsets.

- **Time Complexity:** O(n * 2ⁿ)
- **Space Complexity:** O(n)`,
    timeLimitMs: 2000,
    memoryLimitMb: 128,
    acceptanceRate: 76.5,
    totalSubmissions: 220000,
    acceptedSubmissions: 168300
  },
  {
    id: 'p-combination-sum',
    slug: 'combination-sum',
    title: 'Combination Sum',
    difficulty: 'Medium',
    category: 'Backtracking',
    tags: ['Array', 'Backtracking'],
    functionName: 'combinationSum',
    paramNames: ['candidates', 'target'],
    description: `Given an array of **distinct** integers \`candidates\` and a target integer \`target\`, return *a list of all **unique combinations** of* \`candidates\` *where the chosen numbers sum to* \`target\`. You may return the combinations in **any order**.

The **same** number may be chosen from \`candidates\` an **unlimited number of times**. Two combinations are unique if the frequency of at least one of the chosen numbers is different.

### Example 1:
\`\`\`
Input: candidates = [2,3,6,7], target = 7
Output: [[2,2,3],[7]]
Explanation:
2 and 3 are candidates, and 2 + 2 + 3 = 7. Note that 2 can be used multiple times.
7 is a candidate, and 7 = 7.
These are the only two combinations.
\`\`\`

### Example 2:
\`\`\`
Input: candidates = [2,3,5], target = 8
Output: [[2,2,2,2],[2,3,3],[3,5]]
\`\`\`

### Constraints:
- \`1 <= candidates.length <= 30\`
- \`2 <= candidates[i] <= 40\`
- All elements of \`candidates\` are **distinct**.
- \`1 <= target <= 40\`
`,
    starterCode: {
      javascript: `/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
function combinationSum(candidates, target) {
  const res = [];
  function dfs(i, cur, total) {
    if (total === target) {
      res.push([...cur]);
      return;
    }
    if (i >= candidates.length || total > target) return;

    // Option 1: Include candidate[i]
    cur.push(candidates[i]);
    dfs(i, cur, total + candidates[i]);
    cur.pop();

    // Option 2: Skip candidate[i]
    dfs(i + 1, cur, total);
  }

  dfs(0, [], 0);
  return res;
}`,
      python: `class Solution:
    def combinationSum(self, candidates: list[int], target: int) -> list[list[int]]:
        res = []
        def dfs(i, cur, total):
            if total == target:
                res.append(cur.copy())
                return
            if i >= len(candidates) or total > target:
                return
            cur.append(candidates[i])
            dfs(i, cur, total + candidates[i])
            cur.pop()
            dfs(i + 1, cur, total)
        dfs(0, [], 0)
        return res`,
      cpp: `#include <vector>
using namespace std;

class Solution {
public:
    vector<vector<int>> combinationSum(vector<int>& candidates, int target) {
        vector<vector<int>> res;
        vector<int> cur;
        dfs(0, 0, candidates, target, cur, res);
        return res;
    }
private:
    void dfs(int i, int total, const vector<int>& c, int target, vector<int>& cur, vector<vector<int>>& res) {
        if (total == target) {
            res.push_back(cur);
            return;
        }
        if (i >= c.size() || total > target) return;

        cur.push_back(c[i]);
        dfs(i, total + c[i], c, target, cur, res);
        cur.pop();
        dfs(i + 1, total, c, target, cur, res);
    }
};`,
      java: `import java.util.*;

class Solution {
    public List<List<Integer>> combinationSum(int[] candidates, int target) {
        List<List<Integer>> res = new ArrayList<>();
        dfs(0, 0, candidates, target, new ArrayList<>(), res);
        return res;
    }
    private void dfs(int i, int total, int[] c, int target, List<Integer> cur, List<List<Integer>> res) {
        if (total == target) {
            res.add(new ArrayList<>(cur));
            return;
        }
        if (i >= c.length || total > target) return;

        cur.add(c[i]);
        dfs(i, total + c[i], c, target, cur, res);
        cur.remove(cur.size() - 1);
        dfs(i + 1, total, c, target, cur, res);
    }
}`
    },
    sampleTestCases: [
      { id: 'combs-1', input: [[2, 3, 6, 7], 7], expectedOutput: [[2, 2, 3], [7]] },
      { id: 'combs-2', input: [[2, 3, 5], 8], expectedOutput: [[2, 2, 2, 2], [2, 3, 3], [3, 5]] }
    ],
    hiddenTestCases: [
      { id: 'combs-h1', input: [[2], 1], expectedOutput: [], isHidden: true }
    ],
    hints: [
      'Since you can reuse numbers, in the recursive step you can remain at index i instead of i + 1.'
    ],
    solutionExplanation: `Backtracking: At each candidate \`i\`, either add \`candidates[i]\` and recurse on index \`i\` again, or do not add and advance to \`i + 1\`. Base cases handle \`total == target\` and \`total > target\`.

- **Time Complexity:** O(2^(target / min_candidate))
- **Space Complexity:** O(target / min_candidate)`,
    timeLimitMs: 2000,
    memoryLimitMb: 128,
    acceptanceRate: 70.4,
    totalSubmissions: 250000,
    acceptedSubmissions: 176000
  },
  {
    id: 'p-permutations',
    slug: 'permutations',
    title: 'Permutations',
    difficulty: 'Medium',
    category: 'Backtracking',
    tags: ['Array', 'Backtracking'],
    functionName: 'permute',
    paramNames: ['nums'],
    description: `Given an array \`nums\` of distinct integers, return *all the possible permutations*. You can return the answer in **any order**.

### Example 1:
\`\`\`
Input: nums = [1,2,3]
Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
\`\`\`

### Example 2:
\`\`\`
Input: nums = [0,1]
Output: [[0,1],[1,0]]
\`\`\`

### Example 3:
\`\`\`
Input: nums = [1]
Output: [[1]]
\`\`\`

### Constraints:
- \`1 <= nums.length <= 6\`
- \`-10 <= nums[i] <= 10\`
- All the integers of \`nums\` are **unique**.
`,
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @return {number[][]}
 */
function permute(nums) {
  const res = [];
  const used = new Array(nums.length).fill(false);
  const cur = [];

  function backtrack() {
    if (cur.length === nums.length) {
      res.push([...cur]);
      return;
    }
    for (let i = 0; i < nums.length; i++) {
      if (!used[i]) {
        used[i] = true;
        cur.push(nums[i]);
        backtrack();
        cur.pop();
        used[i] = false;
      }
    }
  }

  backtrack();
  return res;
}`,
      python: `class Solution:
    def permute(self, nums: list[int]) -> list[list[int]]:
        res = []
        used = [False] * len(nums)
        cur = []
        def backtrack():
            if len(cur) == len(nums):
                res.append(cur.copy())
                return
            for i in range(len(nums)):
                if not used[i]:
                    used[i] = True
                    cur.append(nums[i])
                    backtrack()
                    cur.pop()
                    used[i] = False
        backtrack()
        return res`,
      cpp: `#include <vector>
using namespace std;

class Solution {
public:
    vector<vector<int>> permute(vector<int>& nums) {
        vector<vector<int>> res;
        vector<int> cur;
        vector<bool> used(nums.size(), false);
        backtrack(nums, used, cur, res);
        return res;
    }
private:
    void backtrack(const vector<int>& nums, vector<bool>& used, vector<int>& cur, vector<vector<int>>& res) {
        if (cur.size() == nums.size()) {
            res.push_back(cur);
            return;
        }
        for (size_t i = 0; i < nums.size(); i++) {
            if (!used[i]) {
                used[i] = true;
                cur.push_back(nums[i]);
                backtrack(nums, used, cur, res);
                cur.pop();
                used[i] = false;
            }
        }
    }
};`,
      java: `import java.util.*;

class Solution {
    public List<List<Integer>> permute(int[] nums) {
        List<List<Integer>> res = new ArrayList<>();
        boolean[] used = new boolean[nums.length];
        backtrack(nums, used, new ArrayList<>(), res);
        return res;
    }
    private void backtrack(int[] nums, boolean[] used, List<Integer> cur, List<List<Integer>> res) {
        if (cur.size() == nums.length) {
            res.add(new ArrayList<>(cur));
            return;
        }
        for (int i = 0; i < nums.length; i++) {
            if (!used[i]) {
                used[i] = true;
                cur.add(nums[i]);
                backtrack(nums, used, cur, res);
                cur.remove(cur.size() - 1);
                used[i] = false;
            }
        }
    }
}`
    },
    sampleTestCases: [
      { id: 'perm-1', input: [[1, 2, 3]], expectedOutput: [[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]] },
      { id: 'perm-2', input: [[0, 1]], expectedOutput: [[0, 1], [1, 0]] }
    ],
    hiddenTestCases: [
      { id: 'perm-h1', input: [[1]], expectedOutput: [[1]], isHidden: true }
    ],
    hints: [
      'Use a boolean array `used` to mark elements included in the current permutation.'
    ],
    solutionExplanation: `Backtracking with state tracking: Iterate over all elements. If an element has not been used, mark it, push to current permutation, recurse, then unmark upon returning.

- **Time Complexity:** O(n! * n)
- **Space Complexity:** O(n)`,
    timeLimitMs: 2000,
    memoryLimitMb: 128,
    acceptanceRate: 77.2,
    totalSubmissions: 240000,
    acceptedSubmissions: 185280
  },
  {
    id: 'p-word-search',
    slug: 'word-search',
    title: 'Word Search',
    difficulty: 'Medium',
    category: 'Backtracking',
    tags: ['Array', 'String', 'Backtracking', 'Matrix'],
    functionName: 'exist',
    paramNames: ['board', 'word'],
    description: `Given an \`m x n\` grid of characters \`board\` and a string \`word\`, return \`true\` *if* \`word\` *exists in the grid*.

The word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once.

### Example 1:
\`\`\`
Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"
Output: true
\`\`\`

### Example 2:
\`\`\`
Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "SEE"
Output: true
\`\`\`

### Example 3:
\`\`\`
Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCB"
Output: false
\`\`\`

### Constraints:
- \`m == board.length\`
- \`n = board[i].length\`
- \`1 <= m, n <= 6\`
- \`1 <= word.length <= 15\`
- \`board\` and \`word\` consists of only lowercase and uppercase English letters.
`,
    starterCode: {
      javascript: `/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
function exist(board, word) {
  const m = board.length, n = board[0].length;

  function dfs(r, c, k) {
    if (k === word.length) return true;
    if (r < 0 || r >= m || c < 0 || c >= n || board[r][c] !== word[k]) {
      return false;
    }
    const temp = board[r][c];
    board[r][c] = '#'; // Mark visited
    const found =
      dfs(r + 1, c, k + 1) ||
      dfs(r - 1, c, k + 1) ||
      dfs(r, c + 1, k + 1) ||
      dfs(r, c - 1, k + 1);
    board[r][c] = temp; // Unmark
    return found;
  }

  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (board[r][c] === word[0] && dfs(r, c, 0)) {
        return true;
      }
    }
  }
  return false;
}`,
      python: `class Solution:
    def exist(self, board: list[list[str]], word: str) -> bool:
        m, n = len(board), len(board[0])
        def dfs(r, c, k):
            if k == len(word):
                return True
            if r < 0 or r >= m or c < 0 or c >= n or board[r][c] != word[k]:
                return False
            temp = board[r][c]
            board[r][c] = '#'
            found = (dfs(r + 1, c, k + 1) or
                     dfs(r - 1, c, k + 1) or
                     dfs(r, c + 1, k + 1) or
                     dfs(r, c - 1, k + 1))
            board[r][c] = temp
            return found

        for r in range(m):
            for c in range(n):
                if board[r][c] == word[0] and dfs(r, c, 0):
                    return True
        return False`,
      cpp: `#include <vector>
#include <string>
using namespace std;

class Solution {
public:
    bool exist(vector<vector<char>>& board, string word) {
        int m = board.size(), n = board[0].size();
        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                if (board[r][c] == word[0] && dfs(r, c, 0, board, word)) {
                    return true;
                }
            }
        }
        return false;
    }
private:
    bool dfs(int r, int c, int k, vector<vector<char>>& board, const string& word) {
        if (k == word.size()) return true;
        if (r < 0 || r >= board.size() || c < 0 || c >= board[0].size() || board[r][c] != word[k]) {
            return false;
        }
        char temp = board[r][c];
        board[r][c] = '#';
        bool found = dfs(r + 1, c, k + 1, board, word) ||
                     dfs(r - 1, c, k + 1, board, word) ||
                     dfs(r, c + 1, k + 1, board, word) ||
                     dfs(r, c - 1, k + 1, board, word);
        board[r][c] = temp;
        return found;
    }
};`,
      java: `class Solution {
    public boolean exist(char[][] board, String word) {
        int m = board.length, n = board[0].length;
        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                if (board[r][c] == word.charAt(0) && dfs(r, c, 0, board, word)) {
                    return true;
                }
            }
        }
        return false;
    }
    private boolean dfs(int r, int c, int k, char[][] board, String word) {
        if (k == word.length()) return true;
        if (r < 0 || r >= board.length || c < 0 || c >= board[0].length || board[r][c] != word.charAt(k)) {
            return false;
        }
        char temp = board[r][c];
        board[r][c] = '#';
        boolean found = dfs(r + 1, c, k + 1, board, word) ||
                        dfs(r - 1, c, k + 1, board, word) ||
                        dfs(r, c + 1, k + 1, board, word) ||
                        dfs(r, c - 1, k + 1, board, word);
        board[r][c] = temp;
        return found;
    }
}`
    },
    sampleTestCases: [
      { id: 'ws-1', input: [[['A', 'B', 'C', 'E'], ['S', 'F', 'C', 'S'], ['A', 'D', 'E', 'E']], 'ABCCED'], expectedOutput: true },
      { id: 'ws-2', input: [[['A', 'B', 'C', 'E'], ['S', 'F', 'C', 'S'], ['A', 'D', 'E', 'E']], 'SEE'], expectedOutput: true },
      { id: 'ws-3', input: [[['A', 'B', 'C', 'E'], ['S', 'F', 'C', 'S'], ['A', 'D', 'E', 'E']], 'ABCB'], expectedOutput: false }
    ],
    hiddenTestCases: [
      { id: 'ws-h1', input: [[['a']], 'a'], expectedOutput: true, isHidden: true }
    ],
    hints: [
      'Modify board[r][c] to a sentinel character like "#" during search to prevent revisiting, then restore on backtrack.'
    ],
    solutionExplanation: `DFS from each matching starting cell. Check 4 directions (up, down, left, right). Temporarily mark visited cells to avoid re-using cells in the same path, and restore upon backtracking.

- **Time Complexity:** O(M * N * 3^L) where L is word length.
- **Space Complexity:** O(L)`,
    timeLimitMs: 2500,
    memoryLimitMb: 128,
    acceptanceRate: 41.2,
    totalSubmissions: 200000,
    acceptedSubmissions: 82400
  }
];
