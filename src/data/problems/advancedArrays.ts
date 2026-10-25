import { Problem } from '../../types';

export const ADVANCED_ARRAYS_PROBLEMS: Problem[] = [
  {
    id: 'p-valid-sudoku',
    slug: 'valid-sudoku',
    title: 'Valid Sudoku',
    difficulty: 'Medium',
    category: 'Arrays & Hashing',
    tags: ['Array', 'Hash Table', 'Matrix'],
    functionName: 'isValidSudoku',
    paramNames: ['board'],
    description: `Determine if a \`9 x 9\` Sudoku board is valid. Only the filled cells need to be validated according to the following rules:

1. Each row must contain the digits \`1-9\` without repetition.
2. Each column must contain the digits \`1-9\` without repetition.
3. Each of the nine \`3 x 3\` sub-boxes of the grid must contain the digits \`1-9\` without repetition.

**Note:**
- A Sudoku board (partially filled) could be valid but is not necessarily solvable.
- Only the filled cells need to be validated according to the mentioned rules.

### Example 1:
\`\`\`
Input: board = 
[["5","3",".",".","7",".",".",".","."]
,["6",".",".","1","9","5",".",".","."]
,[".","9","8",".",".",".",".","6","."]
,["8",".",".",".","6",".",".",".","3"]
,["4",".",".","8",".","3",".",".","1"]
,["7",".",".",".","2",".",".",".","6"]
,[".","6",".",".",".",".","2","8","."]
,[".",".",".","4","1","9",".",".","5"]
,[".",".",".",".","8",".",".","7","9"]]
Output: true
\`\`\`

### Constraints:
- \`board.length == 9\`
- \`board[i].length == 9\`
- \`board[i][j]\` is a digit \`1-9\` or \`'.'\`.
`,
    starterCode: {
      javascript: `/**
 * @param {character[][]} board
 * @return {boolean}
 */
function isValidSudoku(board) {
  const seen = new Set();
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      const val = board[r][c];
      if (val !== '.') {
        const rowKey = val + ' in row ' + r;
        const colKey = val + ' in col ' + c;
        const boxKey = val + ' in box ' + Math.floor(r / 3) + '-' + Math.floor(c / 3);
        if (seen.has(rowKey) || seen.has(colKey) || seen.has(boxKey)) {
          return false;
        }
        seen.add(rowKey);
        seen.add(colKey);
        seen.add(boxKey);
      }
    }
  }
  return true;
}`,
      python: `class Solution:
    def isValidSudoku(self, board: list[list[str]]) -> bool:
        seen = set()
        for r in range(9):
            for c in range(9):
                val = board[r][c]
                if val != '.':
                    row_key = f"{val} in row {r}"
                    col_key = f"{val} in col {c}"
                    box_key = f"{val} in box {r // 3}-{c // 3}"
                    if row_key in seen or col_key in seen or box_key in seen:
                        return False
                    seen.add(row_key)
                    seen.add(col_key)
                    seen.add(box_key)
        return True`,
      cpp: `#include <vector>
#include <unordered_set>
#include <string>
using namespace std;

class Solution {
public:
    bool isValidSudoku(vector<vector<char>>& board) {
        unordered_set<string> seen;
        for (int r = 0; r < 9; r++) {
            for (int c = 0; c < 9; c++) {
                char val = board[r][c];
                if (val != '.') {
                    string rk = string(1, val) + " in row " + to_string(r);
                    string ck = string(1, val) + " in col " + to_string(c);
                    string bk = string(1, val) + " in box " + to_string(r / 3) + "-" + to_string(c / 3);
                    if (seen.count(rk) || seen.count(ck) || seen.count(bk)) return false;
                    seen.insert(rk);
                    seen.insert(ck);
                    seen.insert(bk);
                }
            }
        }
        return true;
    }
};`,
      java: `import java.util.*;

class Solution {
    public boolean isValidSudoku(char[][] board) {
        Set<String> seen = new HashSet<>();
        for (int r = 0; r < 9; r++) {
            for (int c = 0; c < 9; c++) {
                char val = board[r][c];
                if (val != '.') {
                    String rk = val + " in row " + r;
                    String ck = val + " in col " + c;
                    String bk = val + " in box " + (r / 3) + "-" + (c / 3);
                    if (seen.contains(rk) || seen.contains(ck) || seen.contains(bk)) return false;
                    seen.add(rk);
                    seen.add(ck);
                    seen.add(bk);
                }
            }
        }
        return true;
    }
}`
    },
    sampleTestCases: [
      {
        id: 'sudoku-1',
        input: [
          [
            ['5', '3', '.', '.', '7', '.', '.', '.', '.'],
            ['6', '.', '.', '1', '9', '5', '.', '.', '.'],
            ['.', '9', '8', '.', '.', '.', '.', '6', '.'],
            ['8', '.', '.', '.', '6', '.', '.', '.', '3'],
            ['4', '.', '.', '8', '.', '3', '.', '.', '1'],
            ['7', '.', '.', '.', '2', '.', '.', '.', '6'],
            ['.', '6', '.', '.', '.', '.', '2', '8', '.'],
            ['.', '.', '.', '4', '1', '9', '.', '.', '5'],
            ['.', '.', '.', '.', '8', '.', '.', '7', '9']
          ]
        ],
        expectedOutput: true
      }
    ],
    hiddenTestCases: [
      {
        id: 'sudoku-h1',
        input: [
          [
            ['8', '3', '.', '.', '7', '.', '.', '.', '.'],
            ['6', '.', '.', '1', '9', '5', '.', '.', '.'],
            ['.', '9', '8', '.', '.', '.', '.', '6', '.'],
            ['8', '.', '.', '.', '6', '.', '.', '.', '3'],
            ['4', '.', '.', '8', '.', '3', '.', '.', '1'],
            ['7', '.', '.', '.', '2', '.', '.', '.', '6'],
            ['.', '6', '.', '.', '.', '.', '2', '8', '.'],
            ['.', '.', '.', '4', '1', '9', '.', '.', '5'],
            ['.', '.', '.', '.', '8', '.', '.', '7', '9']
          ]
        ],
        expectedOutput: false,
        isHidden: true
      }
    ],
    hints: [
      'Store strings in a set like `val in row r`, `val in col c`, `val in box r/3-c/3`.'
    ],
    solutionExplanation: `Encode unique row, column, and 3x3 block constraints using a HashSet. If any duplicate encoded key exists, the board is invalid.

- **Time Complexity:** O(81) = O(1)
- **Space Complexity:** O(81) = O(1)`,
    timeLimitMs: 2000,
    memoryLimitMb: 128,
    acceptanceRate: 59.2,
    totalSubmissions: 190000,
    acceptedSubmissions: 112480
  },
  {
    id: 'p-subarray-sum-equals-k',
    slug: 'subarray-sum-equals-k',
    title: 'Subarray Sum Equals K',
    difficulty: 'Medium',
    category: 'Arrays & Hashing',
    tags: ['Array', 'Hash Table', 'Prefix Sum'],
    functionName: 'subarraySum',
    paramNames: ['nums', 'k'],
    description: `Given an array of integers \`nums\` and an integer \`k\`, return *the total number of subarrays whose sum equals to* \`k\`.

A subarray is a contiguous **non-empty** sequence of elements within an array.

### Example 1:
\`\`\`
Input: nums = [1,1,1], k = 2
Output: 2
\`\`\`

### Example 2:
\`\`\`
Input: nums = [1,2,3], k = 3
Output: 2
\`\`\`

### Constraints:
- \`1 <= nums.length <= 2 * 10^4\`
- \`-1000 <= nums[i] <= 1000\`
- \`-10^7 <= k <= 10^7\`
`,
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
function subarraySum(nums, k) {
  const map = new Map();
  map.set(0, 1);
  let prefix = 0, count = 0;

  for (const n of nums) {
    prefix += n;
    if (map.has(prefix - k)) {
      count += map.get(prefix - k);
    }
    map.set(prefix, (map.get(prefix) || 0) + 1);
  }
  return count;
}`,
      python: `class Solution:
    def subarraySum(self, nums: list[int], k: int) -> int:
        count = 0
        prefix = 0
        prefix_map = {0: 1}
        for n in nums:
            prefix += n
            if prefix - k in prefix_map:
                count += prefix_map[prefix - k]
            prefix_map[prefix] = prefix_map.get(prefix, 0) + 1
        return count`,
      cpp: `#include <vector>
#include <unordered_map>
using namespace std;

class Solution {
public:
    int subarraySum(vector<int>& nums, int k) {
        unordered_map<int, int> prefixMap;
        prefixMap[0] = 1;
        int prefix = 0, count = 0;
        for (int n : nums) {
            prefix += n;
            if (prefixMap.count(prefix - k)) {
                count += prefixMap[prefix - k];
            }
            prefixMap[prefix]++;
        }
        return count;
    }
};`,
      java: `import java.util.*;

class Solution {
    public int subarraySum(int[] nums, int k) {
        Map<Integer, Integer> map = new HashMap<>();
        map.put(0, 1);
        int prefix = 0, count = 0;
        for (int n : nums) {
            prefix += n;
            if (map.containsKey(prefix - k)) {
                count += map.get(prefix - k);
            }
            map.put(prefix, map.getOrDefault(prefix, 0) + 1);
        }
        return count;
    }
}`
    },
    sampleTestCases: [
      { id: 'ssek-1', input: [[1, 1, 1], 2], expectedOutput: 2 },
      { id: 'ssek-2', input: [[1, 2, 3], 3], expectedOutput: 2 }
    ],
    hiddenTestCases: [
      { id: 'ssek-h1', input: [[1, -1, 0], 0], expectedOutput: 3, isHidden: true }
    ],
    hints: [
      'If prefixSum[j] - prefixSum[i] == k, then subarray nums[i...j-1] sums to k.'
    ],
    solutionExplanation: `Store frequency of prefix sums in a hash map. At each index, check if \`prefix - k\` has occurred previously. Add its count to the result.

- **Time Complexity:** O(n)
- **Space Complexity:** O(n)`,
    timeLimitMs: 2000,
    memoryLimitMb: 128,
    acceptanceRate: 43.6,
    totalSubmissions: 220000,
    acceptedSubmissions: 95920
  },
  {
    id: 'p-find-all-numbers-disappeared-in-an-array',
    slug: 'find-all-numbers-disappeared-in-an-array',
    title: 'Find All Numbers Disappeared in an Array',
    difficulty: 'Easy',
    category: 'Arrays & Hashing',
    tags: ['Array', 'Hash Table'],
    functionName: 'findDisappearedNumbers',
    paramNames: ['nums'],
    description: `Given an array \`nums\` of \`n\` integers where \`nums[i]\` is in the range \`[1, n]\`, return *an array of all the integers in the range* \`[1, n]\` *that do not appear in* \`nums\`.

Can you do it without extra space and in \`O(n)\` runtime? You may assume the returned list does not count as extra space.

### Example 1:
\`\`\`
Input: nums = [4,3,2,7,8,2,3,1]
Output: [5,6]
\`\`\`

### Example 2:
\`\`\`
Input: nums = [1,1]
Output: [2]
\`\`\`

### Constraints:
- \`n == nums.length\`
- \`1 <= n <= 10^5\`
- \`1 <= nums[i] <= n\`
`,
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @return {number[]}
 */
function findDisappearedNumbers(nums) {
  for (let i = 0; i < nums.length; i++) {
    const idx = Math.abs(nums[i]) - 1;
    if (nums[idx] > 0) {
      nums[idx] = -nums[idx];
    }
  }
  const res = [];
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > 0) res.push(i + 1);
  }
  return res;
}`,
      python: `class Solution:
    def findDisappearedNumbers(self, nums: list[int]) -> list[int]:
        for i in range(len(nums)):
            idx = abs(nums[i]) - 1
            if nums[idx] > 0:
                nums[idx] = -nums[idx]
        return [i + 1 for i in range(len(nums)) if nums[i] > 0]`,
      cpp: `#include <vector>
#include <cmath>
using namespace std;

class Solution {
public:
    vector<int> findDisappearedNumbers(vector<int>& nums) {
        for (int i = 0; i < nums.size(); i++) {
            int idx = abs(nums[i]) - 1;
            if (nums[idx] > 0) nums[idx] = -nums[idx];
        }
        vector<int> res;
        for (int i = 0; i < nums.size(); i++) {
            if (nums[i] > 0) res.push_back(i + 1);
        }
        return res;
    }
};`,
      java: `import java.util.*;

class Solution {
    public List<Integer> findDisappearedNumbers(int[] nums) {
        for (int i = 0; i < nums.length; i++) {
            int idx = Math.abs(nums[i]) - 1;
            if (nums[idx] > 0) nums[idx] = -nums[idx];
        }
        List<Integer> res = new ArrayList<>();
        for (int i = 0; i < nums.length; i++) {
            if (nums[i] > 0) res.add(i + 1);
        }
        return res;
    }
}`
    },
    sampleTestCases: [
      { id: 'fnd-1', input: [[4, 3, 2, 7, 8, 2, 3, 1]], expectedOutput: [5, 6] },
      { id: 'fnd-2', input: [[1, 1]], expectedOutput: [2] }
    ],
    hiddenTestCases: [
      { id: 'fnd-h1', input: [[2, 2]], expectedOutput: [1], isHidden: true }
    ],
    hints: [
      'Use the elements as indices and negate the value at that index to mark presence.'
    ],
    solutionExplanation: `In-place marking: For each number \`x\`, negate \`nums[abs(x) - 1]\`. Any index with a positive number at the end was never visited.

- **Time Complexity:** O(n)
- **Space Complexity:** O(1) auxiliary space`,
    timeLimitMs: 2000,
    memoryLimitMb: 128,
    acceptanceRate: 60.5,
    totalSubmissions: 180000,
    acceptedSubmissions: 108900
  },
  {
    id: 'p-first-unique-character-in-a-string',
    slug: 'first-unique-character-in-a-string',
    title: 'First Unique Character in a String',
    difficulty: 'Easy',
    category: 'Arrays & Hashing',
    tags: ['Hash Table', 'String', 'Queue', 'Counting'],
    functionName: 'firstUniqChar',
    paramNames: ['s'],
    description: `Given a string \`s\`, *find the first non-repeating character in it and return its index*. If it does not exist, return \`-1\`.

### Example 1:
\`\`\`
Input: s = "leetcode"
Output: 0
\`\`\`

### Example 2:
\`\`\`
Input: s = "loveleetcode"
Output: 2
\`\`\`

### Example 3:
\`\`\`
Input: s = "aabb"
Output: -1
\`\`\`

### Constraints:
- \`1 <= s.length <= 10^5\`
- \`s\` consists of only lowercase English letters.
`,
    starterCode: {
      javascript: `/**
 * @param {string} s
 * @return {number}
 */
function firstUniqChar(s) {
  const count = {};
  for (const c of s) count[c] = (count[c] || 0) + 1;
  for (let i = 0; i < s.length; i++) {
    if (count[s[i]] === 1) return i;
  }
  return -1;
}`,
      python: `from collections import Counter

class Solution:
    def firstUniqChar(self, s: str) -> int:
        count = Counter(s)
        for i, c in enumerate(s):
            if count[c] == 1:
                return i
        return -1`,
      cpp: `#include <string>
#include <vector>
using namespace std;

class Solution {
public:
    int firstUniqChar(string s) {
        vector<int> count(26, 0);
        for (char c : s) count[c - 'a']++;
        for (int i = 0; i < s.size(); i++) {
            if (count[s[i] - 'a'] == 1) return i;
        }
        return -1;
    }
};`,
      java: `class Solution {
    public int firstUniqChar(String s) {
        int[] count = new int[26];
        for (char c : s.toCharArray()) count[c - 'a']++;
        for (int i = 0; i < s.length(); i++) {
            if (count[s.charAt(i) - 'a'] == 1) return i;
        }
        return -1;
    }
}`
    },
    sampleTestCases: [
      { id: 'fuc-1', input: ['leetcode'], expectedOutput: 0 },
      { id: 'fuc-2', input: ['loveleetcode'], expectedOutput: 2 },
      { id: 'fuc-3', input: ['aabb'], expectedOutput: -1 }
    ],
    hiddenTestCases: [
      { id: 'fuc-h1', input: ['dddccdbba'], expectedOutput: 8, isHidden: true }
    ],
    hints: [
      'Two passes: first count frequencies, second find the first character with count 1.'
    ],
    solutionExplanation: `First pass: count frequencies of all 26 characters. Second pass: scan string and return the first index where frequency is 1.

- **Time Complexity:** O(n)
- **Space Complexity:** O(1)`,
    timeLimitMs: 2000,
    memoryLimitMb: 128,
    acceptanceRate: 60.1,
    totalSubmissions: 250000,
    acceptedSubmissions: 150250
  }
];
