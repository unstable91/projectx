import { Problem } from '../../types';

export const ARRAYS_HASHING_PROBLEMS: Problem[] = [
  {
    id: 'p-two-sum',
    slug: 'two-sum',
    title: 'Two Sum',
    difficulty: 'Easy',
    category: 'Arrays & Hashing',
    tags: ['Array', 'Hash Table'],
    functionName: 'twoSum',
    paramNames: ['nums', 'target'],
    description: `Given an array of integers \`nums\` and an integer \`target\`, return *indices of the two numbers such that they add up to \`target\`*.

You may assume that each input would have ***exactly one solution***, and you may not use the *same* element twice.

You can return the answer in any order.

### Example 1:
\`\`\`
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
\`\`\`

### Example 2:
\`\`\`
Input: nums = [3,2,4], target = 6
Output: [1,2]
\`\`\`

### Example 3:
\`\`\`
Input: nums = [3,3], target = 6
Output: [0,1]
\`\`\`

### Constraints:
- \`2 <= nums.length <= 10^4\`
- \`-10^9 <= nums[i] <= 10^9\`
- \`-10^9 <= target <= 10^9\`
- **Only one valid answer exists.**
`,
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function twoSum(nums, target) {
  // Write your code here
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}`,
      python: `class Solution:
    def twoSum(self, nums: list[int], target: int) -> list[int]:
        seen = {}
        for i, num in enumerate(nums):
            complement = target - num
            if complement in seen:
                return [seen[complement], i]
            seen[num] = i
        return []`,
      cpp: `#include <vector>
#include <unordered_map>
using namespace std;

class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> map;
        for (int i = 0; i < nums.size(); i++) {
            int complement = target - nums[i];
            if (map.find(complement) != map.end()) {
                return {map[complement], i};
            }
            map[nums[i]] = i;
        }
        return {};
    }
};`,
      java: `import java.util.*;

class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (map.containsKey(complement)) {
                return new int[] { map.get(complement), i };
            }
            map.put(nums[i], i);
        }
        return new int[] {};
    }
}`
    },
    sampleTestCases: [
      { id: 'ts-1', input: [[2, 7, 11, 15], 9], expectedOutput: [0, 1], explanation: 'nums[0] + nums[1] = 2 + 7 = 9' },
      { id: 'ts-2', input: [[3, 2, 4], 6], expectedOutput: [1, 2] },
      { id: 'ts-3', input: [[3, 3], 6], expectedOutput: [0, 1] }
    ],
    hiddenTestCases: [
      { id: 'ts-h1', input: [[-1, -2, -3, -4, -5], -8], expectedOutput: [2, 4], isHidden: true },
      { id: 'ts-h2', input: [[0, 4, 3, 0], 0], expectedOutput: [0, 3], isHidden: true },
      { id: 'ts-h3', input: [[1000000000, 3, 2, 1000000000], 2000000000], expectedOutput: [0, 3], isHidden: true }
    ],
    hints: [
      'A really brute force way would be to search for all possible pairs of numbers but that would be too slow (O(n²)).',
      'Can you use a Hash Table to look up the complement in O(1) time?'
    ],
    solutionExplanation: `### Optimal Solution: One-Pass Hash Table
Store each element and its index in a hash map as we iterate. For each element \`nums[i]\`, calculate \`complement = target - nums[i]\`. If the complement exists in the map, return \`[map[complement], i]\`.

- **Time Complexity:** O(n)
- **Space Complexity:** O(n)`,
    timeLimitMs: 2000,
    memoryLimitMb: 128,
    acceptanceRate: 51.2,
    totalSubmissions: 124800,
    acceptedSubmissions: 63900
  },
  {
    id: 'p-contains-duplicate',
    slug: 'contains-duplicate',
    title: 'Contains Duplicate',
    difficulty: 'Easy',
    category: 'Arrays & Hashing',
    tags: ['Array', 'Hash Table', 'Sorting'],
    functionName: 'containsDuplicate',
    paramNames: ['nums'],
    description: `Given an integer array \`nums\`, return \`true\` if any value appears **at least twice** in the array, and return \`false\` if every element is distinct.

### Example 1:
\`\`\`
Input: nums = [1,2,3,1]
Output: true
\`\`\`

### Example 2:
\`\`\`
Input: nums = [1,2,3,4]
Output: false
\`\`\`

### Example 3:
\`\`\`
Input: nums = [1,1,1,3,3,4,3,2,4,2]
Output: true
\`\`\`

### Constraints:
- \`1 <= nums.length <= 10^5\`
- \`-10^9 <= nums[i] <= 10^9\`
`,
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @return {boolean}
 */
function containsDuplicate(nums) {
  const set = new Set();
  for (const num of nums) {
    if (set.has(num)) return true;
    set.add(num);
  }
  return false;
}`,
      python: `class Solution:
    def containsDuplicate(self, nums: list[int]) -> bool:
        return len(nums) != len(set(nums))`,
      cpp: `#include <vector>
#include <unordered_set>
using namespace std;

class Solution {
public:
    bool containsDuplicate(vector<int>& nums) {
        unordered_set<int> seen;
        for (int x : nums) {
            if (seen.count(x)) return true;
            seen.insert(x);
        }
        return false;
    }
};`,
      java: `import java.util.*;

class Solution {
    public boolean containsDuplicate(int[] nums) {
        Set<Integer> seen = new HashSet<>();
        for (int num : nums) {
            if (seen.contains(num)) return true;
            seen.add(num);
        }
        return false;
    }
}`
    },
    sampleTestCases: [
      { id: 'cd-1', input: [[1, 2, 3, 1]], expectedOutput: true },
      { id: 'cd-2', input: [[1, 2, 3, 4]], expectedOutput: false },
      { id: 'cd-3', input: [[1, 1, 1, 3, 3, 4, 3, 2, 4, 2]], expectedOutput: true }
    ],
    hiddenTestCases: [
      { id: 'cd-h1', input: [[0]], expectedOutput: false, isHidden: true },
      { id: 'cd-h2', input: [[-1, -1]], expectedOutput: true, isHidden: true }
    ],
    hints: [
      'A set only stores unique elements. What happens when you insert an existing element?'
    ],
    solutionExplanation: `Use a HashSet to keep track of elements seen so far. If an element is already in the set, a duplicate is found.

- **Time Complexity:** O(n)
- **Space Complexity:** O(n)`,
    timeLimitMs: 2000,
    memoryLimitMb: 128,
    acceptanceRate: 61.4,
    totalSubmissions: 250000,
    acceptedSubmissions: 153500
  },
  {
    id: 'p-valid-anagram',
    slug: 'valid-anagram',
    title: 'Valid Anagram',
    difficulty: 'Easy',
    category: 'Arrays & Hashing',
    tags: ['Hash Table', 'String', 'Sorting'],
    functionName: 'isAnagram',
    paramNames: ['s', 't'],
    description: `Given two strings \`s\` and \`t\`, return \`true\` if \`t\` is an anagram of \`s\`, and \`false\` otherwise.

An **Anagram** is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.

### Example 1:
\`\`\`
Input: s = "anagram", t = "nagaram"
Output: true
\`\`\`

### Example 2:
\`\`\`
Input: s = "rat", t = "car"
Output: false
\`\`\`

### Constraints:
- \`1 <= s.length, t.length <= 5 * 10^4\`
- \`s\` and \`t\` consist of lowercase English letters.
`,
    starterCode: {
      javascript: `/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
function isAnagram(s, t) {
  if (s.length !== t.length) return false;
  const count = {};
  for (let i = 0; i < s.length; i++) {
    count[s[i]] = (count[s[i]] || 0) + 1;
    count[t[i]] = (count[t[i]] || 0) - 1;
  }
  for (const key in count) {
    if (count[key] !== 0) return false;
  }
  return true;
}`,
      python: `class Solution:
    def isAnagram(self, s: str, t: str) -> bool:
        if len(s) != len(t):
            return False
        count = {}
        for c in s:
            count[c] = count.get(c, 0) + 1
        for c in t:
            if c not in count or count[c] == 0:
                return False
            count[c] -= 1
        return True`,
      cpp: `#include <string>
#include <vector>
using namespace std;

class Solution {
public:
    bool isAnagram(string s, string t) {
        if (s.length() != t.length()) return false;
        vector<int> counts(26, 0);
        for (int i = 0; i < s.length(); i++) {
            counts[s[i] - 'a']++;
            counts[t[i] - 'a']--;
        }
        for (int c : counts) {
            if (c != 0) return false;
        }
        return true;
    }
};`,
      java: `import java.util.*;

class Solution {
    public boolean isAnagram(String s, String t) {
        if (s.length() != t.length()) return false;
        int[] counts = new int[26];
        for (int i = 0; i < s.length(); i++) {
            counts[s.charAt(i) - 'a']++;
            counts[t.charAt(i) - 'a']--;
        }
        for (int c : counts) {
            if (c != 0) return false;
        }
        return true;
    }
}`
    },
    sampleTestCases: [
      { id: 'va-1', input: ['anagram', 'nagaram'], expectedOutput: true },
      { id: 'va-2', input: ['rat', 'car'], expectedOutput: false }
    ],
    hiddenTestCases: [
      { id: 'va-h1', input: ['a', 'ab'], expectedOutput: false, isHidden: true },
      { id: 'va-h2', input: ['aacc', 'ccac'], expectedOutput: false, isHidden: true }
    ],
    hints: [
      'What if the inputs contain unicode characters? How would you adapt your solution?',
      'Check if character frequencies in both strings match.'
    ],
    solutionExplanation: `Count character frequencies using an array of size 26 or a hash map. Increment for string \`s\` and decrement for string \`t\`. All counts must be zero.

- **Time Complexity:** O(n)
- **Space Complexity:** O(1) auxiliary space (fixed 26 chars)`,
    timeLimitMs: 2000,
    memoryLimitMb: 128,
    acceptanceRate: 63.8,
    totalSubmissions: 280000,
    acceptedSubmissions: 178600
  },
  {
    id: 'p-group-anagrams',
    slug: 'group-anagrams',
    title: 'Group Anagrams',
    difficulty: 'Medium',
    category: 'Arrays & Hashing',
    tags: ['Array', 'Hash Table', 'String', 'Sorting'],
    functionName: 'groupAnagrams',
    paramNames: ['strs'],
    description: `Given an array of strings \`strs\`, group **the anagrams** together. You can return the answer in **any order**.

### Example 1:
\`\`\`
Input: strs = ["eat","tea","tan","ate","nat","bat"]
Output: [["bat"],["nat","tan"],["ate","eat","tea"]]
\`\`\`

### Example 2:
\`\`\`
Input: strs = [""]
Output: [[""]]
\`\`\`

### Example 3:
\`\`\`
Input: strs = ["a"]
Output: [["a"]]
\`\`\`

### Constraints:
- \`1 <= strs.length <= 10^4\`
- \`0 <= strs[i].length <= 100\`
- \`strs[i]\` consists of lowercase English letters.
`,
    starterCode: {
      javascript: `/**
 * @param {string[]} strs
 * @return {string[][]}
 */
function groupAnagrams(strs) {
  const map = new Map();
  for (const s of strs) {
    const key = s.split('').sort().join('');
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(s);
  }
  return Array.from(map.values());
}`,
      python: `from collections import defaultdict

class Solution:
    def groupAnagrams(self, strs: list[str]) -> list[list[str]]:
        groups = defaultdict(list)
        for s in strs:
            key = ''.join(sorted(s))
            groups[key].append(s)
        return list(groups.values())`,
      cpp: `#include <vector>
#include <string>
#include <unordered_map>
#include <algorithm>
using namespace std;

class Solution {
public:
    vector<vector<string>> groupAnagrams(vector<string>& strs) {
        unordered_map<string, vector<string>> map;
        for (const string& s : strs) {
            string key = s;
            sort(key.begin(), key.end());
            map[key].push_back(s);
        }
        vector<vector<string>> result;
        for (auto& pair : map) {
            result.push_back(pair.second);
        }
        return result;
    }
};`,
      java: `import java.util.*;

class Solution {
    public List<List<String>> groupAnagrams(String[] strs) {
        Map<String, List<String>> map = new HashMap<>();
        for (String s : strs) {
            char[] chars = s.toCharArray();
            Arrays.sort(chars);
            String key = new String(chars);
            if (!map.containsKey(key)) {
                map.put(key, new ArrayList<>());
            }
            map.get(key).add(s);
        }
        return new ArrayList<>(map.values());
    }
}`
    },
    sampleTestCases: [
      { id: 'ga-1', input: [['eat', 'tea', 'tan', 'ate', 'nat', 'bat']], expectedOutput: [['eat', 'tea', 'ate'], ['tan', 'nat'], ['bat']] },
      { id: 'ga-2', input: [['']], expectedOutput: [['']] },
      { id: 'ga-3', input: [['a']], expectedOutput: [['a']] }
    ],
    hiddenTestCases: [
      { id: 'ga-h1', input: [['cab', 'tin', 'pew', 'duh', 'may', 'ill', 'buy', 'bar', 'max', 'doc']], expectedOutput: [['cab'], ['tin'], ['pew'], ['duh'], ['may'], ['ill'], ['buy'], ['bar'], ['max'], ['doc']], isHidden: true }
    ],
    hints: [
      'Two strings are anagrams if and only if their sorted versions are identical.',
      'Use the sorted string as a key in a hash table.'
    ],
    solutionExplanation: `Sort each string alphabetically to form a canonical key. Group all original strings sharing the same canonical key in a hash map.

- **Time Complexity:** O(N * K log K) where N is number of strings, K is maximum string length.
- **Space Complexity:** O(N * K)`,
    timeLimitMs: 2500,
    memoryLimitMb: 128,
    acceptanceRate: 67.2,
    totalSubmissions: 220000,
    acceptedSubmissions: 147840
  },
  {
    id: 'p-top-k-frequent-elements',
    slug: 'top-k-frequent-elements',
    title: 'Top K Frequent Elements',
    difficulty: 'Medium',
    category: 'Arrays & Hashing',
    tags: ['Array', 'Hash Table', 'Sorting', 'Heap (Priority Queue)', 'Bucket Sort'],
    functionName: 'topKFrequent',
    paramNames: ['nums', 'k'],
    description: `Given an integer array \`nums\` and an integer \`k\`, return *the* \`k\` *most frequent elements*. You may return the answer in **any order**.

### Example 1:
\`\`\`
Input: nums = [1,1,1,2,2,3], k = 2
Output: [1,2]
\`\`\`

### Example 2:
\`\`\`
Input: nums = [1], k = 1
Output: [1]
\`\`\`

### Constraints:
- \`1 <= nums.length <= 10^5\`
- \`-10^4 <= nums[i] <= 10^4\`
- \`k\` is in the range \`[1, the number of unique elements in the array]\`.
- It is **guaranteed** that the answer is **unique**.
`,
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
function topKFrequent(nums, k) {
  const map = new Map();
  for (const n of nums) map.set(n, (map.get(n) || 0) + 1);

  const buckets = Array.from({ length: nums.length + 1 }, () => []);
  for (const [num, count] of map.entries()) {
    buckets[count].push(num);
  }

  const res = [];
  for (let i = buckets.length - 1; i >= 0 && res.length < k; i--) {
    if (buckets[i].length > 0) {
      res.push(...buckets[i]);
    }
  }
  return res.slice(0, k);
}`,
      python: `from collections import Counter

class Solution:
    def topKFrequent(self, nums: list[int], k: int) -> list[int]:
        count = Counter(nums)
        buckets = [[] for _ in range(len(nums) + 1)]
        for num, freq in count.items():
            buckets[freq].append(num)
        
        res = []
        for i in range(len(buckets) - 1, 0, -1):
            for num in buckets[i]:
                res.append(num)
                if len(res) == k:
                    return res
        return res`,
      cpp: `#include <vector>
#include <unordered_map>
using namespace std;

class Solution {
public:
    vector<int> topKFrequent(vector<int>& nums, int k) {
        unordered_map<int, int> counts;
        for (int n : nums) counts[n]++;

        vector<vector<int>> buckets(nums.size() + 1);
        for (auto& p : counts) {
            buckets[p.second].push_back(p.first);
        }

        vector<int> res;
        for (int i = buckets.size() - 1; i >= 0 && res.size() < k; i--) {
            for (int val : buckets[i]) {
                res.push_back(val);
                if (res.size() == k) return res;
            }
        }
        return res;
    }
};`,
      java: `import java.util.*;

class Solution {
    public int[] topKFrequent(int[] nums, int k) {
        Map<Integer, Integer> map = new HashMap<>();
        for (int n : nums) map.put(n, map.getOrDefault(n, 0) + 1);

        List<Integer>[] buckets = new List[nums.length + 1];
        for (int i = 0; i < buckets.length; i++) buckets[i] = new ArrayList<>();

        for (int key : map.keySet()) {
            int freq = map.get(key);
            buckets[freq].add(key);
        }

        int[] res = new int[k];
        int idx = 0;
        for (int i = buckets.length - 1; i >= 0 && idx < k; i--) {
            for (int val : buckets[i]) {
                res[idx++] = val;
                if (idx == k) return res;
            }
        }
        return res;
    }
}`
    },
    sampleTestCases: [
      { id: 'tk-1', input: [[1, 1, 1, 2, 2, 3], 2], expectedOutput: [1, 2] },
      { id: 'tk-2', input: [[1], 1], expectedOutput: [1] }
    ],
    hiddenTestCases: [
      { id: 'tk-h1', input: [[4, 1, -1, 2, -1, 2, 3], 2], expectedOutput: [-1, 2], isHidden: true }
    ],
    hints: [
      'Can you do this faster than O(n log n) sorting?',
      'Consider Bucket Sort where the index represents frequency.'
    ],
    solutionExplanation: `Use Bucket Sort: count frequencies in a hash map, then group numbers by frequency in an array of lists. Traverse from highest frequency down to collect top k elements.

- **Time Complexity:** O(n)
- **Space Complexity:** O(n)`,
    timeLimitMs: 2000,
    memoryLimitMb: 128,
    acceptanceRate: 63.1,
    totalSubmissions: 195000,
    acceptedSubmissions: 123000
  },
  {
    id: 'p-product-of-array-except-self',
    slug: 'product-of-array-except-self',
    title: 'Product of Array Except Self',
    difficulty: 'Medium',
    category: 'Arrays & Hashing',
    tags: ['Array', 'Prefix Sum'],
    functionName: 'productExceptSelf',
    paramNames: ['nums'],
    description: `Given an integer array \`nums\`, return *an array* \`answer\` *such that* \`answer[i]\` *is equal to the product of all the elements of* \`nums\` *except* \`nums[i]\`.

The product of any prefix or suffix of \`nums\` is **guaranteed** to fit in a **32-bit** integer.

You must write an algorithm that runs in \`O(n)\` time and without using the division operation.

### Example 1:
\`\`\`
Input: nums = [1,2,3,4]
Output: [24,12,8,6]
\`\`\`

### Example 2:
\`\`\`
Input: nums = [-1,1,0,-3,3]
Output: [0,0,9,0,0]
\`\`\`

### Constraints:
- \`2 <= nums.length <= 10^5\`
- \`-30 <= nums[i] <= 30\`
`,
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @return {number[]}
 */
function productExceptSelf(nums) {
  const n = nums.length;
  const res = new Array(n).fill(1);
  let prefix = 1;
  for (let i = 0; i < n; i++) {
    res[i] = prefix;
    prefix *= nums[i];
  }
  let postfix = 1;
  for (let i = n - 1; i >= 0; i--) {
    res[i] *= postfix;
    postfix *= nums[i];
  }
  return res;
}`,
      python: `class Solution:
    def productExceptSelf(self, nums: list[int]) -> list[int]:
        n = len(nums)
        res = [1] * n
        prefix = 1
        for i in range(n):
            res[i] = prefix
            prefix *= nums[i]
        postfix = 1
        for i in range(n - 1, -1, -1):
            res[i] *= postfix
            postfix *= nums[i]
        return res`,
      cpp: `#include <vector>
using namespace std;

class Solution {
public:
    vector<int> productExceptSelf(vector<int>& nums) {
        int n = nums.size();
        vector<int> res(n, 1);
        int prefix = 1;
        for (int i = 0; i < n; i++) {
            res[i] = prefix;
            prefix *= nums[i];
        }
        int postfix = 1;
        for (int i = n - 1; i >= 0; i--) {
            res[i] *= postfix;
            postfix *= nums[i];
        }
        return res;
    }
};`,
      java: `class Solution {
    public int[] productExceptSelf(int[] nums) {
        int n = nums.length;
        int[] res = new int[n];
        int prefix = 1;
        for (int i = 0; i < n; i++) {
            res[i] = prefix;
            prefix *= nums[i];
        }
        int postfix = 1;
        for (int i = n - 1; i >= 0; i--) {
            res[i] *= postfix;
            postfix *= nums[i];
        }
        return res;
    }
}`
    },
    sampleTestCases: [
      { id: 'pes-1', input: [[1, 2, 3, 4]], expectedOutput: [24, 12, 8, 6] },
      { id: 'pes-2', input: [[-1, 1, 0, -3, 3]], expectedOutput: [0, 0, 9, 0, 0] }
    ],
    hiddenTestCases: [
      { id: 'pes-h1', input: [[0, 0]], expectedOutput: [0, 0], isHidden: true },
      { id: 'pes-h2', input: [[2, 3]], expectedOutput: [3, 2], isHidden: true }
    ],
    hints: [
      'How does the product of elements to the left and elements to the right help?',
      'Compute prefix products in a first pass and suffix products in a second pass.'
    ],
    solutionExplanation: `Compute prefix products going left-to-right, then multiply by postfix products going right-to-left in-place.

- **Time Complexity:** O(n)
- **Space Complexity:** O(1) auxiliary space (output array not counted)`,
    timeLimitMs: 2000,
    memoryLimitMb: 128,
    acceptanceRate: 65.5,
    totalSubmissions: 210000,
    acceptedSubmissions: 137550
  },
  {
    id: 'p-longest-consecutive-sequence',
    slug: 'longest-consecutive-sequence',
    title: 'Longest Consecutive Sequence',
    difficulty: 'Medium',
    category: 'Arrays & Hashing',
    tags: ['Array', 'Hash Table', 'Union Find'],
    functionName: 'longestConsecutive',
    paramNames: ['nums'],
    description: `Given an unsorted array of integers \`nums\`, return *the length of the longest consecutive elements sequence.*

You must write an algorithm that runs in \`O(n)\` time.

### Example 1:
\`\`\`
Input: nums = [100,4,200,1,3,2]
Output: 4
Explanation: The longest consecutive elements sequence is [1, 2, 3, 4]. Therefore its length is 4.
\`\`\`

### Example 2:
\`\`\`
Input: nums = [0,3,7,2,5,8,4,6,0,1]
Output: 9
\`\`\`

### Constraints:
- \`0 <= nums.length <= 10^5\`
- \`-10^9 <= nums[i] <= 10^9\`
`,
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @return {number}
 */
function longestConsecutive(nums) {
  const set = new Set(nums);
  let longest = 0;

  for (const n of set) {
    // Only check if n is the start of a sequence
    if (!set.has(n - 1)) {
      let current = n;
      let streak = 1;
      while (set.has(current + 1)) {
        current++;
        streak++;
      }
      longest = Math.max(longest, streak);
    }
  }
  return longest;
}`,
      python: `class Solution:
    def longestConsecutive(self, nums: list[int]) -> int:
        num_set = set(nums)
        longest = 0
        for n in num_set:
            if n - 1 not in num_set:
                length = 1
                while n + length in num_set:
                    length += 1
                longest = max(longest, length)
        return longest`,
      cpp: `#include <vector>
#include <unordered_set>
#include <algorithm>
using namespace std;

class Solution {
public:
    int longestConsecutive(vector<int>& nums) {
        unordered_set<int> num_set(nums.begin(), nums.end());
        int longest = 0;
        for (int n : num_set) {
            if (!num_set.count(n - 1)) {
                int length = 1;
                while (num_set.count(n + length)) {
                    length++;
                }
                longest = max(longest, length);
            }
        }
        return longest;
    }
};`,
      java: `import java.util.*;

class Solution {
    public int longestConsecutive(int[] nums) {
        Set<Integer> set = new HashSet<>();
        for (int n : nums) set.add(n);

        int longest = 0;
        for (int n : set) {
            if (!set.contains(n - 1)) {
                int length = 1;
                while (set.contains(n + length)) {
                    length++;
                }
                longest = Math.max(longest, length);
            }
        }
        return longest;
    }
}`
    },
    sampleTestCases: [
      { id: 'lcs-1', input: [[100, 4, 200, 1, 3, 2]], expectedOutput: 4 },
      { id: 'lcs-2', input: [[0, 3, 7, 2, 5, 8, 4, 6, 0, 1]], expectedOutput: 9 }
    ],
    hiddenTestCases: [
      { id: 'lcs-h1', input: [[]], expectedOutput: 0, isHidden: true },
      { id: 'lcs-h2', input: [[9, 1, 4, 7, 3, -1, 0, 5, 8, -1, 6]], expectedOutput: 7, isHidden: true }
    ],
    hints: [
      'Insert all numbers into a HashSet for O(1) lookups.',
      'A number starts a new sequence only if `num - 1` is not present in the set.'
    ],
    solutionExplanation: `Put all elements into a HashSet. Only initiate a sequence count from numbers that do NOT have a predecessor \`n - 1\` in the set. This ensures each sequence element is visited at most twice.

- **Time Complexity:** O(n)
- **Space Complexity:** O(n)`,
    timeLimitMs: 2000,
    memoryLimitMb: 128,
    acceptanceRate: 47.5,
    totalSubmissions: 170000,
    acceptedSubmissions: 80750
  },
  {
    id: 'p-majority-element',
    slug: 'majority-element',
    title: 'Majority Element',
    difficulty: 'Easy',
    category: 'Arrays & Hashing',
    tags: ['Array', 'Hash Table', 'Divide and Conquer', 'Sorting', 'Counting'],
    functionName: 'majorityElement',
    paramNames: ['nums'],
    description: `Given an array \`nums\` of size \`n\`, return *the majority element*.

The majority element is the element that appears more than \`⌊n / 2⌋\` times. You may assume that the majority element always exists in the array.

### Example 1:
\`\`\`
Input: nums = [3,2,3]
Output: 3
\`\`\`

### Example 2:
\`\`\`
Input: nums = [2,2,1,1,1,2,2]
Output: 2
\`\`\`

### Constraints:
- \`n == nums.length\`
- \`1 <= n <= 5 * 10^4\`
- \`-10^9 <= nums[i] <= 10^9\`
`,
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @return {number}
 */
function majorityElement(nums) {
  // Boyer-Moore Voting Algorithm
  let candidate = nums[0];
  let count = 0;
  for (const num of nums) {
    if (count === 0) candidate = num;
    count += (num === candidate) ? 1 : -1;
  }
  return candidate;
}`,
      python: `class Solution:
    def majorityElement(self, nums: list[int]) -> int:
        candidate, count = nums[0], 0
        for num in nums:
            if count == 0:
                candidate = num
            count += 1 if num == candidate else -1
        return candidate`,
      cpp: `#include <vector>
using namespace std;

class Solution {
public:
    int majorityElement(vector<int>& nums) {
        int candidate = nums[0], count = 0;
        for (int num : nums) {
            if (count == 0) candidate = num;
            count += (num == candidate) ? 1 : -1;
        }
        return candidate;
    }
};`,
      java: `class Solution {
    public int majorityElement(int[] nums) {
        int candidate = nums[0], count = 0;
        for (int num : nums) {
            if (count == 0) candidate = num;
            count += (num == candidate) ? 1 : -1;
        }
        return candidate;
    }
}`
    },
    sampleTestCases: [
      { id: 'me-1', input: [[3, 2, 3]], expectedOutput: 3 },
      { id: 'me-2', input: [[2, 2, 1, 1, 1, 2, 2]], expectedOutput: 2 }
    ],
    hiddenTestCases: [
      { id: 'me-h1', input: [[1]], expectedOutput: 1, isHidden: true },
      { id: 'me-h2', input: [[6, 5, 5]], expectedOutput: 5, isHidden: true }
    ],
    hints: [
      'Could you solve it in linear time and in O(1) space?',
      'Check the Boyer-Moore Voting Algorithm.'
    ],
    solutionExplanation: `Boyer-Moore Voting Algorithm maintains a candidate and a counter. Increment when the current element matches candidate, decrement otherwise. Reset candidate when count hits 0.

- **Time Complexity:** O(n)
- **Space Complexity:** O(1)`,
    timeLimitMs: 2000,
    memoryLimitMb: 128,
    acceptanceRate: 64.2,
    totalSubmissions: 310000,
    acceptedSubmissions: 199020
  }
];
