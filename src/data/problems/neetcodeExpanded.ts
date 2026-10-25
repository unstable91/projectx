import { Problem } from '../../types';

export const NEETCODE_EXPANDED_PROBLEMS: Problem[] = [
  {
    id: 'p-contains-duplicate-ii',
    slug: 'contains-duplicate-ii',
    title: 'Contains Duplicate II',
    difficulty: 'Easy',
    category: 'Arrays & Hashing',
    tags: ['Array', 'Hash Table', 'Sliding Window'],
    functionName: 'containsNearbyDuplicate',
    paramNames: ['nums', 'k'],
    description: `Given an integer array \`nums\` and an integer \`k\`, return \`true\` if there are two **distinct indices** \`i\` and \`j\` in the array such that \`nums[i] == nums[j]\` and \`abs(i - j) <= k\`.

### Example 1:
\`\`\`
Input: nums = [1,2,3,1], k = 3
Output: true
\`\`\`

### Example 2:
\`\`\`
Input: nums = [1,0,1,1], k = 1
Output: true
\`\`\`

### Example 3:
\`\`\`
Input: nums = [1,2,3,1,2,3], k = 2
Output: false
\`\`\`

### Constraints:
- \`1 <= nums.length <= 10^5\`
- \`-10^9 <= nums[i] <= 10^9\`
- \`0 <= k <= 10^5\`
`,
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
function containsNearbyDuplicate(nums, k) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    if (map.has(nums[i]) && i - map.get(nums[i]) <= k) {
      return true;
    }
    map.set(nums[i], i);
  }
  return false;
}`,
      python: `class Solution:
    def containsNearbyDuplicate(self, nums: list[int], k: int) -> bool:
        seen = {}
        for i, n in enumerate(nums):
            if n in seen and i - seen[n] <= k:
                return True
            seen[n] = i
        return False`,
      cpp: `#include <vector>
#include <unordered_map>
using namespace std;

class Solution {
public:
    bool containsNearbyDuplicate(vector<int>& nums, int k) {
        unordered_map<int, int> seen;
        for (int i = 0; i < nums.size(); i++) {
            if (seen.count(nums[i]) && i - seen[nums[i]] <= k) return true;
            seen[nums[i]] = i;
        }
        return false;
    }
};`,
      java: `import java.util.*;

class Solution {
    public boolean containsNearbyDuplicate(int[] nums, int k) {
        Map<Integer, Integer> seen = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            if (seen.containsKey(nums[i]) && i - seen.get(nums[i]) <= k) return true;
            seen.put(nums[i], i);
        }
        return false;
    }
}`
    },
    sampleTestCases: [
      { id: 'cnd-1', input: [[1, 2, 3, 1], 3], expectedOutput: true },
      { id: 'cnd-2', input: [[1, 0, 1, 1], 1], expectedOutput: true },
      { id: 'cnd-3', input: [[1, 2, 3, 1, 2, 3], 2], expectedOutput: false }
    ],
    hiddenTestCases: [
      { id: 'cnd-h1', input: [[99, 99], 2], expectedOutput: true, isHidden: true }
    ],
    hints: ['Hash map stores the most recent index of each element.'],
    solutionExplanation: `Store the last seen index of each number in a hash map. If the current index minus the previous index <= k, return true.

- **Time Complexity:** O(n)
- **Space Complexity:** O(min(n, k))`,
    timeLimitMs: 2000,
    memoryLimitMb: 128,
    acceptanceRate: 44.1,
    totalSubmissions: 250000,
    acceptedSubmissions: 110250
  },
  {
    id: 'p-remove-duplicates-from-sorted-array',
    slug: 'remove-duplicates-from-sorted-array',
    title: 'Remove Duplicates from Sorted Array',
    difficulty: 'Easy',
    category: 'Two Pointers',
    tags: ['Array', 'Two Pointers'],
    functionName: 'removeDuplicates',
    paramNames: ['nums'],
    description: `Given an integer array \`nums\` sorted in **non-decreasing order**, remove the duplicates **in-place** such that each unique element appears only **once**. The **relative order** of the elements should be kept the same. Then return *the number of unique elements in* \`nums\`.

Consider the number of unique elements of \`nums\` to be \`k\`, to get accepted, you need to do the following things:
- Change the array \`nums\` such that the first \`k\` elements of \`nums\` contain the unique elements in the order they were present in \`nums\` initially. The remaining elements of \`nums\` are not important as well as the size of \`nums\`.
- Return \`k\`.

### Example 1:
\`\`\`
Input: nums = [1,1,2]
Output: 2, nums = [1,2,_]
Explanation: Your function should return k = 2, with the first two elements of nums being 1 and 2 respectively.
\`\`\`

### Example 2:
\`\`\`
Input: nums = [0,0,1,1,1,2,2,3,3,4]
Output: 5, nums = [0,1,2,3,4,_,_,_,_,_]
\`\`\`

### Constraints:
- \`1 <= nums.length <= 3 * 10^4\`
- \`-100 <= nums[i] <= 100\`
- \`nums\` is sorted in **non-decreasing** order.
`,
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @return {number}
 */
function removeDuplicates(nums) {
  if (nums.length === 0) return 0;
  let k = 1;
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] !== nums[i - 1]) {
      nums[k] = nums[i];
      k++;
    }
  }
  return k;
}`,
      python: `class Solution:
    def removeDuplicates(self, nums: list[int]) -> int:
        if not nums:
            return 0
        k = 1
        for i in range(1, len(nums)):
            if nums[i] != nums[i - 1]:
                nums[k] = nums[i]
                k += 1
        return k`,
      cpp: `#include <vector>
using namespace std;

class Solution {
public:
    int removeDuplicates(vector<int>& nums) {
        if (nums.empty()) return 0;
        int k = 1;
        for (size_t i = 1; i < nums.size(); i++) {
            if (nums[i] != nums[i - 1]) {
                nums[k++] = nums[i];
            }
        }
        return k;
    }
};`,
      java: `class Solution {
    public int removeDuplicates(int[] nums) {
        if (nums.length == 0) return 0;
        int k = 1;
        for (int i = 1; i < nums.length; i++) {
            if (nums[i] != nums[i - 1]) {
                nums[k++] = nums[i];
            }
        }
        return k;
    }
}`
    },
    sampleTestCases: [
      { id: 'rd-1', input: [[1, 1, 2]], expectedOutput: 2 },
      { id: 'rd-2', input: [[0, 0, 1, 1, 1, 2, 2, 3, 3, 4]], expectedOutput: 5 }
    ],
    hiddenTestCases: [
      { id: 'rd-h1', input: [[1]], expectedOutput: 1, isHidden: true }
    ],
    hints: ['Two pointers: write pointer k advances only when a new distinct value is encountered.'],
    solutionExplanation: `Maintain write pointer \`k = 1\`. As you scan with read pointer \`i\`, whenever \`nums[i] != nums[i - 1]\`, write \`nums[k] = nums[i]\` and increment \`k\`.

- **Time Complexity:** O(n)
- **Space Complexity:** O(1)`,
    timeLimitMs: 2000,
    memoryLimitMb: 128,
    acceptanceRate: 53.4,
    totalSubmissions: 350000,
    acceptedSubmissions: 186900
  },
  {
    id: 'p-remove-element',
    slug: 'remove-element',
    title: 'Remove Element',
    difficulty: 'Easy',
    category: 'Two Pointers',
    tags: ['Array', 'Two Pointers'],
    functionName: 'removeElement',
    paramNames: ['nums', 'val'],
    description: `Given an integer array \`nums\` and an integer \`val\`, remove all occurrences of \`val\` in \`nums\` **in-place**. The order of the elements may be changed. Then return *the number of elements in* \`nums\` *which are not equal to* \`val\`.

### Example 1:
\`\`\`
Input: nums = [3,2,2,3], val = 3
Output: 2, nums = [2,2,_,_]
\`\`\`

### Example 2:
\`\`\`
Input: nums = [0,1,2,2,3,0,4,2], val = 2
Output: 5, nums = [0,1,4,0,3,_,_,_]
\`\`\`

### Constraints:
- \`0 <= nums.length <= 100\`
- \`0 <= nums[i] <= 50\`
- \`0 <= val <= 100\`
`,
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
function removeElement(nums, val) {
  let k = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== val) {
      nums[k] = nums[i];
      k++;
    }
  }
  return k;
}`,
      python: `class Solution:
    def removeElement(self, nums: list[int], val: int) -> int:
        k = 0
        for x in nums:
            if x != val:
                nums[k] = x
                k += 1
        return k`,
      cpp: `#include <vector>
using namespace std;

class Solution {
public:
    int removeElement(vector<int>& nums, int val) {
        int k = 0;
        for (int x : nums) {
            if (x != val) nums[k++] = x;
        }
        return k;
    }
};`,
      java: `class Solution {
    public int removeElement(int[] nums, int val) {
        int k = 0;
        for (int x : nums) {
            if (x != val) nums[k++] = x;
        }
        return k;
    }
}`
    },
    sampleTestCases: [
      { id: 're-1', input: [[3, 2, 2, 3], 3], expectedOutput: 2 },
      { id: 're-2', input: [[0, 1, 2, 2, 3, 0, 4, 2], 2], expectedOutput: 5 }
    ],
    hiddenTestCases: [
      { id: 're-h1', input: [[1], 1], expectedOutput: 0, isHidden: true }
    ],
    hints: ['Overwriting in-place with pointer k when element != val.'],
    solutionExplanation: `Two-pointer in-place assignment: When \`nums[i] != val\`, copy to \`nums[k]\` and advance \`k\`.

- **Time Complexity:** O(n)
- **Space Complexity:** O(1)`,
    timeLimitMs: 2000,
    memoryLimitMb: 128,
    acceptanceRate: 55.8,
    totalSubmissions: 310000,
    acceptedSubmissions: 172980
  },
  {
    id: 'p-isomorphic-strings',
    slug: 'isomorphic-strings',
    title: 'Isomorphic Strings',
    difficulty: 'Easy',
    category: 'Arrays & Hashing',
    tags: ['Hash Table', 'String'],
    functionName: 'isIsomorphic',
    paramNames: ['s', 't'],
    description: `Given two strings \`s\` and \`t\`, *determine if they are isomorphic*.

Two strings \`s\` and \`t\` are isomorphic if the characters in \`s\` can be replaced to get \`t\`.

All occurrences of a character must be replaced with another character while preserving the order of characters. No two characters may map to the same character, but a character may map to itself.

### Example 1:
\`\`\`
Input: s = "egg", t = "add"
Output: true
\`\`\`

### Example 2:
\`\`\`
Input: s = "foo", t = "bar"
Output: false
\`\`\`

### Example 3:
\`\`\`
Input: s = "paper", t = "title"
Output: true
\`\`\`

### Constraints:
- \`1 <= s.length <= 5 * 10^4\`
- \`t.length == s.length\`
- \`s\` and \`t\` consist of any valid ascii character.
`,
    starterCode: {
      javascript: `/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
function isIsomorphic(s, t) {
  const mapST = new Map();
  const mapTS = new Map();

  for (let i = 0; i < s.length; i++) {
    const c1 = s[i], c2 = t[i];
    if ((mapST.has(c1) && mapST.get(c1) !== c2) || (mapTS.has(c2) && mapTS.get(c2) !== c1)) {
      return false;
    }
    mapST.set(c1, c2);
    mapTS.set(c2, c1);
  }
  return true;
}`,
      python: `class Solution:
    def isIsomorphic(self, s: str, t: str) -> bool:
        map_st, map_ts = {}, {}
        for c1, c2 in zip(s, t):
            if (c1 in map_st and map_st[c1] != c2) or (c2 in map_ts and map_ts[c2] != c1):
                return False
            map_st[c1] = c2
            map_ts[c2] = c1
        return True`,
      cpp: `#include <string>
#include <unordered_map>
using namespace std;

class Solution {
public:
    bool isIsomorphic(string s, string t) {
        unordered_map<char, char> mapST, mapTS;
        for (size_t i = 0; i < s.size(); i++) {
            char c1 = s[i], c2 = t[i];
            if ((mapST.count(c1) && mapST[c1] != c2) || (mapTS.count(c2) && mapTS[c2] != c1)) {
                return false;
            }
            mapST[c1] = c2;
            mapTS[c2] = c1;
        }
        return true;
    }
};`,
      java: `import java.util.*;

class Solution {
    public boolean isIsomorphic(String s, String t) {
        Map<Character, Character> mapST = new HashMap<>();
        Map<Character, Character> mapTS = new HashMap<>();
        for (int i = 0; i < s.length(); i++) {
            char c1 = s.charAt(i), c2 = t.charAt(i);
            if ((mapST.containsKey(c1) && mapST.get(c1) != c2) || (mapTS.containsKey(c2) && mapTS.get(c2) != c1)) {
                return false;
            }
            mapST.put(c1, c2);
            mapTS.put(c2, c1);
        }
        return true;
    }
}`
    },
    sampleTestCases: [
      { id: 'iso-1', input: ['egg', 'add'], expectedOutput: true },
      { id: 'iso-2', input: ['foo', 'bar'], expectedOutput: false },
      { id: 'iso-3', input: ['paper', 'title'], expectedOutput: true }
    ],
    hiddenTestCases: [
      { id: 'iso-h1', input: ['badc', 'baba'], expectedOutput: false, isHidden: true }
    ],
    hints: ['Check bijection: character mapping must be 1-to-1 in both directions.'],
    solutionExplanation: `Bijective mapping: Maintain two hash maps (\`mapST\` and \`mapTS\`). Check that each character in \`s\` maps to exactly one character in \`t\` and vice versa.

- **Time Complexity:** O(n)
- **Space Complexity:** O(1) (ASCII character set limit)`,
    timeLimitMs: 2000,
    memoryLimitMb: 128,
    acceptanceRate: 43.5,
    totalSubmissions: 260000,
    acceptedSubmissions: 113100
  },
  {
    id: 'p-word-pattern',
    slug: 'word-pattern',
    title: 'Word Pattern',
    difficulty: 'Easy',
    category: 'Arrays & Hashing',
    tags: ['Hash Table', 'String'],
    functionName: 'wordPattern',
    paramNames: ['pattern', 's'],
    description: `Given a \`pattern\` and a string \`s\`, find if \`s\` follows the same pattern.

Here **follow** means a full match, such that there is a bijection between a letter in \`pattern\` and a **non-empty** word in \`s\`.

### Example 1:
\`\`\`
Input: pattern = "abba", s = "dog cat cat dog"
Output: true
\`\`\`

### Example 2:
\`\`\`
Input: pattern = "abba", s = "dog cat cat fish"
Output: false
\`\`\`

### Example 3:
\`\`\`
Input: pattern = "aaaa", s = "dog cat cat dog"
Output: false
\`\`\`

### Constraints:
- \`1 <= pattern.length <= 300\`
- \`pattern\` contains only lower-case English letters.
- \`1 <= s.length <= 3000\`
- \`s\` contains only lowercase English letters and spaces \`' '\`.
- \`s\` **does not contain** any leading or trailing spaces.
- All the words in \`s\` are separated by a **single space**.
`,
    starterCode: {
      javascript: `/**
 * @param {string} pattern
 * @param {string} s
 * @return {boolean}
 */
function wordPattern(pattern, s) {
  const words = s.split(' ');
  if (words.length !== pattern.length) return false;

  const charToWord = new Map();
  const wordToChar = new Map();

  for (let i = 0; i < pattern.length; i++) {
    const c = pattern[i];
    const w = words[i];

    if ((charToWord.has(c) && charToWord.get(c) !== w) ||
        (wordToChar.has(w) && wordToChar.get(w) !== c)) {
      return false;
    }
    charToWord.set(c, w);
    wordToChar.set(w, c);
  }
  return true;
}`,
      python: `class Solution:
    def wordPattern(self, pattern: str, s: str) -> bool:
        words = s.split()
        if len(words) != len(pattern):
            return False
        c_to_w = {}
        w_to_c = {}
        for c, w in zip(pattern, words):
            if (c in c_to_w and c_to_w[c] != w) or (w in w_to_c and w_to_c[w] != c):
                return False
            c_to_w[c] = w
            w_to_c[w] = c
        return True`,
      cpp: `#include <string>
#include <vector>
#include <sstream>
#include <unordered_map>
using namespace std;

class Solution {
public:
    bool wordPattern(string pattern, string s) {
        stringstream ss(s);
        string word;
        vector<string> words;
        while (ss >> word) words.push_back(word);

        if (words.size() != pattern.size()) return false;
        unordered_map<char, string> c2w;
        unordered_map<string, char> w2c;

        for (size_t i = 0; i < pattern.size(); i++) {
            char c = pattern[i];
            const string& w = words[i];
            if ((c2w.count(c) && c2w[c] != w) || (w2c.count(w) && w2c[w] != c)) {
                return false;
            }
            c2w[c] = w;
            w2c[w] = c;
        }
        return true;
    }
};`,
      java: `import java.util.*;

class Solution {
    public boolean wordPattern(String pattern, String s) {
        String[] words = s.split(" ");
        if (words.length != pattern.length()) return false;

        Map<Character, String> c2w = new HashMap<>();
        Map<String, Character> w2c = new HashMap<>();

        for (int i = 0; i < pattern.length(); i++) {
            char c = pattern.charAt(i);
            String w = words[i];
            if ((c2w.containsKey(c) && !c2w.get(c).equals(w)) ||
                (w2c.containsKey(w) && w2c.get(w) != c)) {
                return false;
            }
            c2w.put(c, w);
            w2c.put(w, c);
        }
        return true;
    }
}`
    },
    sampleTestCases: [
      { id: 'wp-1', input: ['abba', 'dog cat cat dog'], expectedOutput: true },
      { id: 'wp-2', input: ['abba', 'dog cat cat fish'], expectedOutput: false },
      { id: 'wp-3', input: ['aaaa', 'dog cat cat dog'], expectedOutput: false }
    ],
    hiddenTestCases: [
      { id: 'wp-h1', input: ['abba', 'dog dog dog dog'], expectedOutput: false, isHidden: true }
    ],
    hints: ['Check two-way 1-to-1 correspondence between pattern characters and words.'],
    solutionExplanation: `Split string into words. Verify word count matches pattern length. Maintain two maps: \`charToWord\` and \`wordToChar\` to verify bijection.

- **Time Complexity:** O(N + M)
- **Space Complexity:** O(unique words)`,
    timeLimitMs: 2000,
    memoryLimitMb: 128,
    acceptanceRate: 41.8,
    totalSubmissions: 210000,
    acceptedSubmissions: 87780
  },
  {
    id: 'p-summary-ranges',
    slug: 'summary-ranges',
    title: 'Summary Ranges',
    difficulty: 'Easy',
    category: 'Intervals',
    tags: ['Array'],
    functionName: 'summaryRanges',
    paramNames: ['nums'],
    description: `You are given a **sorted unique** integer array \`nums\`.

A **range** \`[a,b]\` is the set of all integers from \`a\` to \`b\`, inclusive.

Return *the **smallest sorted** list of ranges that **cover all the numbers in the array exactly***. That is, each element of \`nums\` is covered by exactly one of the ranges, and there is no integer \`x\` such that \`x\` is in one of the ranges but not in \`nums\`.

Each range \`[a,b]\` in the list should be output as:
- \`"a->b"\` if \`a != b\`
- \`"a"\` if \`a == b\`

### Example 1:
\`\`\`
Input: nums = [0,1,2,4,5,7]
Output: ["0->2","4->5","7"]
Explanation: The ranges are:
[0,2] --> "0->2"
[4,5] --> "4->5"
[7,7] --> "7"
\`\`\`

### Example 2:
\`\`\`
Input: nums = [0,2,3,4,6,8,9]
Output: ["0","2->4","6","8->9"]
\`\`\`

### Constraints:
- \`0 <= nums.length <= 20\`
- \`-2^31 <= nums[i] <= 2^31 - 1\`
- All the values of \`nums\` are **unique**.
- \`nums\` is sorted in ascending order.
`,
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @return {string[]}
 */
function summaryRanges(nums) {
  const res = [];
  let i = 0;
  while (i < nums.length) {
    const start = nums[i];
    while (i + 1 < nums.length && nums[i + 1] === nums[i] + 1) {
      i++;
    }
    if (start === nums[i]) {
      res.push(String(start));
    } else {
      res.push(start + '->' + nums[i]);
    }
    i++;
  }
  return res;
}`,
      python: `class Solution:
    def summaryRanges(self, nums: list[int]) -> list[str]:
        res = []
        i = 0
        while i < len(nums):
            start = nums[i]
            while i + 1 < len(nums) and nums[i + 1] == nums[i] + 1:
                i += 1
            if start == nums[i]:
                res.append(str(start))
            else:
                res.append(f"{start}->{nums[i]}")
            i += 1
        return res`,
      cpp: `#include <vector>
#include <string>
using namespace std;

class Solution {
public:
    vector<string> summaryRanges(vector<int>& nums) {
        vector<string> res;
        size_t i = 0;
        while (i < nums.size()) {
            int start = nums[i];
            while (i + 1 < nums.size() && nums[i + 1] == nums[i] + 1) {
                i++;
            }
            if (start == nums[i]) res.push_back(to_string(start));
            else res.push_back(to_string(start) + "->" + to_string(nums[i]));
            i++;
        }
        return res;
    }
};`,
      java: `import java.util.*;

class Solution {
    public List<String> summaryRanges(int[] nums) {
        List<String> res = new ArrayList<>();
        int i = 0;
        while (i < nums.length) {
            int start = nums[i];
            while (i + 1 < nums.length && nums[i + 1] == nums[i] + 1) {
                i++;
            }
            if (start == nums[i]) res.add(String.valueOf(start));
            else res.add(start + "->" + nums[i]);
            i++;
        }
        return res;
    }
}`
    },
    sampleTestCases: [
      { id: 'sr-1', input: [[0, 1, 2, 4, 5, 7]], expectedOutput: ['0->2', '4->5', '7'] },
      { id: 'sr-2', input: [[0, 2, 3, 4, 6, 8, 9]], expectedOutput: ['0', '2->4', '6', '8->9'] }
    ],
    hiddenTestCases: [
      { id: 'sr-h1', input: [[]], expectedOutput: [], isHidden: true },
      { id: 'sr-h2', input: [[-1]], expectedOutput: ['-1'], isHidden: true }
    ],
    hints: ['Linear scan with a while loop to detect consecutive chains.'],
    solutionExplanation: `Scan with index \`i\`. For each chain start, increment \`i\` while consecutive elements increment by 1. Append formatted interval string.

- **Time Complexity:** O(n)
- **Space Complexity:** O(1)`,
    timeLimitMs: 2000,
    memoryLimitMb: 128,
    acceptanceRate: 50.1,
    totalSubmissions: 200000,
    acceptedSubmissions: 100200
  },
  {
    id: 'p-valid-palindrome-ii',
    slug: 'valid-palindrome-ii',
    title: 'Valid Palindrome II',
    difficulty: 'Easy',
    category: 'Two Pointers',
    tags: ['Two Pointers', 'String', 'Greedy'],
    functionName: 'validPalindrome',
    paramNames: ['s'],
    description: `Given a string \`s\`, return \`true\` *if the* \`s\` *can be palindrome after deleting **at most one** character from it*.

### Example 1:
\`\`\`
Input: s = "aba"
Output: true
\`\`\`

### Example 2:
\`\`\`
Input: s = "abca"
Output: true
Explanation: You could delete the character 'c'.
\`\`\`

### Example 3:
\`\`\`
Input: s = "abc"
Output: false
\`\`\`

### Constraints:
- \`1 <= s.length <= 10^5\`
- \`s\` consists of lowercase English letters.
`,
    starterCode: {
      javascript: `/**
 * @param {string} s
 * @return {boolean}
 */
function validPalindrome(s) {
  function isPal(l, r) {
    while (l < r) {
      if (s[l] !== s[r]) return false;
      l++;
      r--;
    }
    return true;
  }

  let l = 0, r = s.length - 1;
  while (l < r) {
    if (s[l] !== s[r]) {
      return isPal(l + 1, r) || isPal(l, r - 1);
    }
    l++;
    r--;
  }
  return true;
}`,
      python: `class Solution:
    def validPalindrome(self, s: str) -> bool:
        def is_pal(l, r):
            while l < r:
                if s[l] != s[r]:
                    return False
                l += 1
                r -= 1
            return True

        l, r = 0, len(s) - 1
        while l < r:
            if s[l] != s[r]:
                return is_pal(l + 1, r) or is_pal(l, r - 1)
            l += 1
            r -= 1
        return True`,
      cpp: `#include <string>
using namespace std;

class Solution {
public:
    bool validPalindrome(string s) {
        int l = 0, r = s.size() - 1;
        while (l < r) {
            if (s[l] != s[r]) {
                return isPal(s, l + 1, r) || isPal(s, l, r - 1);
            }
            l++;
            r--;
        }
        return true;
    }
private:
    bool isPal(const string& s, int l, int r) {
        while (l < r) {
            if (s[l] != s[r]) return false;
            l++;
            r--;
        }
        return true;
    }
};`,
      java: `class Solution {
    public boolean validPalindrome(String s) {
        int l = 0, r = s.length() - 1;
        while (l < r) {
            if (s.charAt(l) != s.charAt(r)) {
                return isPal(s, l + 1, r) || isPal(s, l, r - 1);
            }
            l++;
            r--;
        }
        return true;
    }
    private boolean isPal(String s, int l, int r) {
        while (l < r) {
            if (s.charAt(l) != s.charAt(r)) return false;
            l++;
            r--;
        }
        return true;
    }
}`
    },
    sampleTestCases: [
      { id: 'vp2-1', input: ['aba'], expectedOutput: true },
      { id: 'vp2-2', input: ['abca'], expectedOutput: true },
      { id: 'vp2-3', input: ['abc'], expectedOutput: false }
    ],
    hiddenTestCases: [
      { id: 'vp2-h1', input: ['eeccccbebaeeabebccceea'], expectedOutput: false, isHidden: true }
    ],
    hints: ['When a mismatch occurs, try skipping either s[left] or s[right].'],
    solutionExplanation: `Two pointers towards the middle. Upon the first mismatch \`s[l] != s[r]\`, check if deleting \`s[l]\` creates a palindrome (\`isPal(l + 1, r)\`) OR deleting \`s[r]\` creates a palindrome (\`isPal(l, r - 1)\`).

- **Time Complexity:** O(n)
- **Space Complexity:** O(1)`,
    timeLimitMs: 2000,
    memoryLimitMb: 128,
    acceptanceRate: 40.5,
    totalSubmissions: 280000,
    acceptedSubmissions: 113400
  },
  {
    id: 'p-find-the-difference',
    slug: 'find-the-difference',
    title: 'Find the Difference',
    difficulty: 'Easy',
    category: 'Bit Manipulation',
    tags: ['Hash Table', 'String', 'Bit Manipulation', 'Sorting'],
    functionName: 'findTheDifference',
    paramNames: ['s', 't'],
    description: `You are given two strings \`s\` and \`t\`.

String \`t\` is generated by random shuffling string \`s\` and then add one more letter at a random position.

Return the letter that was added to \`t\`.

### Example 1:
\`\`\`
Input: s = "abcd", t = "abcde"
Output: "e"
Explanation: 'e' is the letter that was added.
\`\`\`

### Example 2:
\`\`\`
Input: s = "", t = "y"
Output: "y"
\`\`\`

### Constraints:
- \`0 <= s.length <= 1000\`
- \`t.length == s.length + 1\`
- \`s\` and \`t\` consist of lowercase English letters.
`,
    starterCode: {
      javascript: `/**
 * @param {string} s
 * @param {string} t
 * @return {character}
 */
function findTheDifference(s, t) {
  let res = 0;
  for (let i = 0; i < s.length; i++) res ^= s.charCodeAt(i);
  for (let i = 0; i < t.length; i++) res ^= t.charCodeAt(i);
  return String.fromCharCode(res);
}`,
      python: `class Solution:
    def findTheDifference(self, s: str, t: str) -> str:
        res = 0
        for c in s:
            res ^= ord(c)
        for c in t:
            res ^= ord(c)
        return chr(res)`,
      cpp: `#include <string>
using namespace std;

class Solution {
public:
    char findTheDifference(string s, string t) {
        char res = 0;
        for (char c : s) res ^= c;
        for (char c : t) res ^= c;
        return res;
    }
};`,
      java: `class Solution {
    public char findTheDifference(String s, String t) {
        char res = 0;
        for (char c : s.toCharArray()) res ^= c;
        for (char c : t.toCharArray()) res ^= c;
        return res;
    }
}`
    },
    sampleTestCases: [
      { id: 'ftd-1', input: ['abcd', 'abcde'], expectedOutput: 'e' },
      { id: 'ftd-2', input: ['', 'y'], expectedOutput: 'y' }
    ],
    hiddenTestCases: [
      { id: 'ftd-h1', input: ['a', 'aa'], expectedOutput: 'a', isHidden: true }
    ],
    hints: ['XOR all characters in s and t together.'],
    solutionExplanation: `XOR all character codes across both strings. All characters in s will cancel with their counterpart in t, leaving only the added character.

- **Time Complexity:** O(n)
- **Space Complexity:** O(1)`,
    timeLimitMs: 2000,
    memoryLimitMb: 128,
    acceptanceRate: 61.2,
    totalSubmissions: 220000,
    acceptedSubmissions: 134640
  }
];
