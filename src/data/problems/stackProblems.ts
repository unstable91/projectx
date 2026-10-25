import { Problem } from '../../types';

export const STACK_PROBLEMS: Problem[] = [
  {
    id: 'p-valid-parentheses',
    slug: 'valid-parentheses',
    title: 'Valid Parentheses',
    difficulty: 'Easy',
    category: 'Stack',
    tags: ['Stack', 'String'],
    functionName: 'isValid',
    paramNames: ['s'],
    description: `Given a string \`s\` containing just the characters \`'('\`, \`')'\`, \`'{'\`, \`'}'\`, \`'['\` and \`']'\`, determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.

### Example 1:
\`\`\`
Input: s = "()"
Output: true
\`\`\`

### Example 2:
\`\`\`
Input: s = "()[]{}"
Output: true
\`\`\`

### Example 3:
\`\`\`
Input: s = "(]"
Output: false
\`\`\`

### Constraints:
- \`1 <= s.length <= 10^4\`
- \`s\` consists of parentheses only \`'()[]{}'.\`
`,
    starterCode: {
      javascript: `/**
 * @param {string} s
 * @return {boolean}
 */
function isValid(s) {
  const stack = [];
  const map = { ')': '(', '}': '{', ']': '[' };
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (map[c]) {
      if (stack.length === 0 || stack[stack.length - 1] !== map[c]) {
        return false;
      }
      stack.pop();
    } else {
      stack.push(c);
    }
  }
  return stack.length === 0;
}`,
      python: `class Solution:
    def isValid(self, s: str) -> bool:
        stack = []
        mapping = {')': '(', '}': '{', ']': '['}
        for char in s:
            if char in mapping:
                top = stack.pop() if stack else '#'
                if mapping[char] != top:
                    return False
            else:
                stack.append(char)
        return not stack`,
      cpp: `#include <string>
#include <stack>
#include <unordered_map>
using namespace std;

class Solution {
public:
    bool isValid(string s) {
        stack<char> st;
        unordered_map<char, char> map = {{')', '('}, {'}', '{'}, {']', '['}};
        for (char c : s) {
            if (map.count(c)) {
                if (st.empty() || st.top() != map[c]) return false;
                st.pop();
            } else {
                st.push(c);
            }
        }
        return st.empty();
    }
};`,
      java: `import java.util.*;

class Solution {
    public boolean isValid(String s) {
        Stack<Character> stack = new Stack<>();
        for (char c : s.toCharArray()) {
            if (c == '(') stack.push(')');
            else if (c == '{') stack.push('}');
            else if (c == '[') stack.push(']');
            else if (stack.isEmpty() || stack.pop() != c) return false;
        }
        return stack.isEmpty();
    }
}`
    },
    sampleTestCases: [
      { id: 'vp-1', input: ['()'], expectedOutput: true },
      { id: 'vp-2', input: ['()[]{}'], expectedOutput: true },
      { id: 'vp-3', input: ['(]'], expectedOutput: false }
    ],
    hiddenTestCases: [
      { id: 'vp-h1', input: ['{[]}'], expectedOutput: true, isHidden: true },
      { id: 'vp-h2', input: [']'], expectedOutput: false, isHidden: true },
      { id: 'vp-h3', input: ['((('], expectedOutput: false, isHidden: true }
    ],
    hints: [
      'Use a Stack to keep track of the most recently opened bracket.'
    ],
    solutionExplanation: `Push opening brackets onto a stack. When encountering a closing bracket, check if it matches the top of the stack and pop. The string is valid if and only if the stack is empty at the end.

- **Time Complexity:** O(n)
- **Space Complexity:** O(n)`,
    timeLimitMs: 2000,
    memoryLimitMb: 128,
    acceptanceRate: 40.8,
    totalSubmissions: 310000,
    acceptedSubmissions: 126480
  },
  {
    id: 'p-evaluate-reverse-polish-notation',
    slug: 'evaluate-reverse-polish-notation',
    title: 'Evaluate Reverse Polish Notation',
    difficulty: 'Medium',
    category: 'Stack',
    tags: ['Array', 'Math', 'Stack'],
    functionName: 'evalRPN',
    paramNames: ['tokens'],
    description: `You are given an array of strings \`tokens\` that represents an arithmetic expression in a **Reverse Polish Notation**.

Evaluate the expression. Return *an integer that represents the value of the expression*.

**Note** that:
- The valid operators are \`'+'\`, \`'-'\`, \`'*'\`, and \`'/'\`.
- Each operand may be an integer or another expression.
- The division between two integers always **truncates toward zero**.

### Example 1:
\`\`\`
Input: tokens = ["2","1","+","3","*"]
Output: 9
Explanation: ((2 + 1) * 3) = 9
\`\`\`

### Example 2:
\`\`\`
Input: tokens = ["4","13","5","/","+"]
Output: 6
Explanation: (4 + (13 / 5)) = 6
\`\`\`

### Constraints:
- \`1 <= tokens.length <= 10^4\`
- \`tokens[i]\` is either an operator: \`"+"\`, \`"-"\`, \`"*"\`, or \`"/"\`, or an integer in the range \`[-200, 200]\`.
`,
    starterCode: {
      javascript: `/**
 * @param {string[]} tokens
 * @return {number}
 */
function evalRPN(tokens) {
  const stack = [];
  for (const token of tokens) {
    if (token === '+' || token === '-' || token === '*' || token === '/') {
      const b = stack.pop();
      const a = stack.pop();
      if (token === '+') stack.push(a + b);
      else if (token === '-') stack.push(a - b);
      else if (token === '*') stack.push(a * b);
      else stack.push(Math.trunc(a / b));
    } else {
      stack.push(Number(token));
    }
  }
  return stack[0];
}`,
      python: `class Solution:
    def evalRPN(self, tokens: list[str]) -> int:
        stack = []
        for token in tokens:
            if token in "+-*/":
                b = stack.pop()
                a = stack.pop()
                if token == '+':
                    stack.append(a + b)
                elif token == '-':
                    stack.append(a - b)
                elif token == '*':
                    stack.append(a * b)
                else:
                    stack.append(int(a / b))
            else:
                stack.append(int(token))
        return stack[0]`,
      cpp: `#include <vector>
#include <string>
#include <stack>
using namespace std;

class Solution {
public:
    int evalRPN(vector<string>& tokens) {
        stack<int> st;
        for (const string& t : tokens) {
            if (t == "+" || t == "-" || t == "*" || t == "/") {
                int b = st.top(); st.pop();
                int a = st.top(); st.pop();
                if (t == "+") st.push(a + b);
                else if (t == "-") st.push(a - b);
                else if (t == "*") st.push(a * b);
                else st.push(a / b);
            } else {
                st.push(stoi(t));
            }
        }
        return st.top();
    }
};`,
      java: `import java.util.*;

class Solution {
    public int evalRPN(String[] tokens) {
        Stack<Integer> stack = new Stack<>();
        for (String t : tokens) {
            if (t.equals("+") || t.equals("-") || t.equals("*") || t.equals("/")) {
                int b = stack.pop();
                int a = stack.pop();
                if (t.equals("+")) stack.push(a + b);
                else if (t.equals("-")) stack.push(a - b);
                else if (t.equals("*")) stack.push(a * b);
                else stack.push(a / b);
            } else {
                stack.push(Integer.parseInt(t));
            }
        }
        return stack.pop();
    }
}`
    },
    sampleTestCases: [
      { id: 'rpn-1', input: [['2', '1', '+', '3', '*']], expectedOutput: 9 },
      { id: 'rpn-2', input: [['4', '13', '5', '/', '+']], expectedOutput: 6 }
    ],
    hiddenTestCases: [
      { id: 'rpn-h1', input: [['10', '6', '9', '3', '+', '-11', '*', '/', '*', '17', '+', '5', '+']], expectedOutput: 22, isHidden: true }
    ],
    hints: [
      'Operands are pushed to a stack; whenever an operator is encountered, pop the last two operands.'
    ],
    solutionExplanation: `Use a stack to evaluate Reverse Polish Notation. Push numbers onto the stack. For operators, pop the top two numbers, apply the operation (note operand order: first popped is second operand), and push result back.

- **Time Complexity:** O(n)
- **Space Complexity:** O(n)`,
    timeLimitMs: 2000,
    memoryLimitMb: 128,
    acceptanceRate: 47.9,
    totalSubmissions: 155000,
    acceptedSubmissions: 74245
  },
  {
    id: 'p-generate-parentheses',
    slug: 'generate-parentheses',
    title: 'Generate Parentheses',
    difficulty: 'Medium',
    category: 'Stack',
    tags: ['String', 'Dynamic Programming', 'Backtracking'],
    functionName: 'generateParenthesis',
    paramNames: ['n'],
    description: `Given \`n\` pairs of parentheses, write a function to *generate all combinations of well-formed parentheses*.

### Example 1:
\`\`\`
Input: n = 3
Output: ["((()))","(()())","(())()","()(())","()()()"]
\`\`\`

### Example 2:
\`\`\`
Input: n = 1
Output: ["()"]
\`\`\`

### Constraints:
- \`1 <= n <= 8\`
`,
    starterCode: {
      javascript: `/**
 * @param {number} n
 * @return {string[]}
 */
function generateParenthesis(n) {
  const res = [];
  function backtrack(s, open, close) {
    if (s.length === 2 * n) {
      res.push(s);
      return;
    }
    if (open < n) {
      backtrack(s + '(', open + 1, close);
    }
    if (close < open) {
      backtrack(s + ')', open, close + 1);
    }
  }
  backtrack('', 0, 0);
  return res;
}`,
      python: `class Solution:
    def generateParenthesis(self, n: int) -> list[str]:
        res = []
        def backtrack(s, open_count, close_count):
            if len(s) == 2 * n:
                res.append(s)
                return
            if open_count < n:
                backtrack(s + '(', open_count + 1, close_count)
            if close_count < open_count:
                backtrack(s + ')', open_count, close_count + 1)
        backtrack('', 0, 0)
        return res`,
      cpp: `#include <vector>
#include <string>
using namespace std;

class Solution {
public:
    vector<string> generateParenthesis(int n) {
        vector<string> res;
        backtrack(res, "", 0, 0, n);
        return res;
    }
private:
    void backtrack(vector<string>& res, string s, int open, int close, int n) {
        if (s.length() == 2 * n) {
            res.push_back(s);
            return;
        }
        if (open < n) backtrack(res, s + "(", open + 1, close, n);
        if (close < open) backtrack(res, s + ")", open, close + 1, n);
    }
};`,
      java: `import java.util.*;

class Solution {
    public List<String> generateParenthesis(int n) {
        List<String> res = new ArrayList<>();
        backtrack(res, new StringBuilder(), 0, 0, n);
        return res;
    }
    private void backtrack(List<String> res, StringBuilder sb, int open, int close, int n) {
        if (sb.length() == 2 * n) {
            res.add(sb.toString());
            return;
        }
        if (open < n) {
            sb.append('(');
            backtrack(res, sb, open + 1, close, n);
            sb.deleteCharAt(sb.length() - 1);
        }
        if (close < open) {
            sb.append(')');
            backtrack(res, sb, open, close + 1, n);
            sb.deleteCharAt(sb.length() - 1);
        }
    }
}`
    },
    sampleTestCases: [
      { id: 'gp-1', input: [3], expectedOutput: ['((()))', '(()())', '(())()', '()(())', '()()()'] },
      { id: 'gp-2', input: [1], expectedOutput: ['()'] }
    ],
    hiddenTestCases: [
      { id: 'gp-h1', input: [2], expectedOutput: ['(())', '()()'], isHidden: true }
    ],
    hints: [
      'Only add an opening bracket if open < n; only add a closing bracket if close < open.'
    ],
    solutionExplanation: `Backtracking: At each state, append '(' if \`open < n\`. Append ')' if \`close < open\`. Base case is reached when string length is \`2 * n\`.

- **Time Complexity:** O(4ⁿ / √n) (Catalan number)
- **Space Complexity:** O(n)`,
    timeLimitMs: 2000,
    memoryLimitMb: 128,
    acceptanceRate: 74.2,
    totalSubmissions: 210000,
    acceptedSubmissions: 155820
  },
  {
    id: 'p-daily-temperatures',
    slug: 'daily-temperatures',
    title: 'Daily Temperatures',
    difficulty: 'Medium',
    category: 'Stack',
    tags: ['Array', 'Stack', 'Monotonic Stack'],
    functionName: 'dailyTemperatures',
    paramNames: ['temperatures'],
    description: `Given an array of integers \`temperatures\` represents the daily temperatures, return *an array* \`answer\` *such that* \`answer[i]\` *is the number of days you have to wait after the* \`i-th\` *day to get a warmer temperature*. If there is no future day for which this is possible, keep \`answer[i] == 0\` instead.

### Example 1:
\`\`\`
Input: temperatures = [73,74,75,71,69,72,76,73]
Output: [1,1,4,2,1,1,0,0]
\`\`\`

### Example 2:
\`\`\`
Input: temperatures = [30,40,50,60]
Output: [1,1,1,0]
\`\`\`

### Example 3:
\`\`\`
Input: temperatures = [30,60,90]
Output: [1,1,0]
\`\`\`

### Constraints:
- \`1 <= temperatures.length <= 10^5\`
- \`30 <= temperatures[i] <= 100\`
`,
    starterCode: {
      javascript: `/**
 * @param {number[]} temperatures
 * @return {number[]}
 */
function dailyTemperatures(temperatures) {
  const n = temperatures.length;
  const res = new Array(n).fill(0);
  const stack = []; // indices of temperatures in decreasing order

  for (let i = 0; i < n; i++) {
    while (stack.length > 0 && temperatures[i] > temperatures[stack[stack.length - 1]]) {
      const prevIdx = stack.pop();
      res[prevIdx] = i - prevIdx;
    }
    stack.push(i);
  }
  return res;
}`,
      python: `class Solution:
    def dailyTemperatures(self, temperatures: list[int]) -> list[int]:
        res = [0] * len(temperatures)
        stack = [] # (index)
        for i, t in enumerate(temperatures):
            while stack and t > temperatures[stack[-1]]:
                prev_i = stack.pop()
                res[prev_i] = i - prev_i
            stack.append(i)
        return res`,
      cpp: `#include <vector>
#include <stack>
using namespace std;

class Solution {
public:
    vector<int> dailyTemperatures(vector<int>& temperatures) {
        int n = temperatures.size();
        vector<int> res(n, 0);
        stack<int> st;
        for (int i = 0; i < n; i++) {
            while (!st.empty() && temperatures[i] > temperatures[st.top()]) {
                int prev = st.top(); st.pop();
                res[prev] = i - prev;
            }
            st.push(i);
        }
        return res;
    }
};`,
      java: `import java.util.*;

class Solution {
    public int[] dailyTemperatures(int[] temperatures) {
        int n = temperatures.length;
        int[] res = new int[n];
        Stack<Integer> stack = new Stack<>();
        for (int i = 0; i < n; i++) {
            while (!stack.isEmpty() && temperatures[i] > temperatures[stack.peek()]) {
                int prev = stack.pop();
                res[prev] = i - prev;
            }
            stack.push(i);
        }
        return res;
    }
}`
    },
    sampleTestCases: [
      { id: 'dt-1', input: [[73, 74, 75, 71, 69, 72, 76, 73]], expectedOutput: [1, 1, 4, 2, 1, 1, 0, 0] },
      { id: 'dt-2', input: [[30, 40, 50, 60]], expectedOutput: [1, 1, 1, 0] },
      { id: 'dt-3', input: [[30, 60, 90]], expectedOutput: [1, 1, 0] }
    ],
    hiddenTestCases: [
      { id: 'dt-h1', input: [[90, 80, 70]], expectedOutput: [0, 0, 0], isHidden: true }
    ],
    hints: [
      'Use a monotonic decreasing stack storing indices.'
    ],
    solutionExplanation: `Maintain a monotonic decreasing stack of indices. For each day, pop elements while the current temperature is warmer than the temperature at the stack top. The difference in indices is the waiting period.

- **Time Complexity:** O(n)
- **Space Complexity:** O(n)`,
    timeLimitMs: 2000,
    memoryLimitMb: 128,
    acceptanceRate: 66.2,
    totalSubmissions: 220000,
    acceptedSubmissions: 145640
  },
  {
    id: 'p-car-fleet',
    slug: 'car-fleet',
    title: 'Car Fleet',
    difficulty: 'Medium',
    category: 'Stack',
    tags: ['Array', 'Stack', 'Sorting', 'Monotonic Stack'],
    functionName: 'carFleet',
    paramNames: ['target', 'position', 'speed'],
    description: `There are \`n\` cars going to the same destination along a one-lane road. The destination is \`target\` miles away.

You are given two integer array \`position\` and \`speed\`, both of length \`n\`, where \`position[i]\` is the position of the \`i-th\` car and \`speed[i]\` is the speed of the \`i-th\` car (in miles per hour).

A car can never pass another car ahead of it, but it can catch up to it and drive bumper to bumper at the same speed. The faster car will slow down to match the slower car's speed.

Return *the number of car fleets that will arrive at the destination*.

### Example 1:
\`\`\`
Input: target = 12, position = [10,8,0,5,3], speed = [2,4,1,1,3]
Output: 3
Explanation:
The cars starting at 10 and 8 form a fleet, meeting at 12.
The car starting at 0 does not catch up to any other car, so it is a fleet by itself.
The cars starting at 5 and 3 form a fleet, meeting at 6. The fleet moves at speed 1 until it reaches target.
\`\`\`

### Example 2:
\`\`\`
Input: target = 10, position = [3], speed = [3]
Output: 1
\`\`\`

### Constraints:
- \`n == position.length == speed.length\`
- \`1 <= n <= 10^5\`
- \`0 < target <= 10^6\`
- \`0 <= position[i] < target\`
- All the values of \`position\` are unique.
- \`0 < speed[i] <= 10^6\`
`,
    starterCode: {
      javascript: `/**
 * @param {number} target
 * @param {number[]} position
 * @param {number[]} speed
 * @return {number}
 */
function carFleet(target, position, speed) {
  const cars = position.map((p, i) => ({ pos: p, time: (target - p) / speed[i] }));
  cars.sort((a, b) => b.pos - a.pos);

  let fleets = 0;
  let currTime = 0;

  for (const car of cars) {
    if (car.time > currTime) {
      fleets++;
      currTime = car.time;
    }
  }
  return fleets;
}`,
      python: `class Solution:
    def carFleet(self, target: int, position: list[int], speed: list[int]) -> int:
        pair = [(p, (target - p) / s) for p, s in zip(position, speed)]
        pair.sort(reverse=True)
        fleets = 0
        curr_time = 0
        for p, time in pair:
            if time > curr_time:
                fleets += 1
                curr_time = time
        return fleets`,
      cpp: `#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int carFleet(int target, vector<int>& position, vector<int>& speed) {
        int n = position.size();
        vector<pair<int, double>> cars(n);
        for (int i = 0; i < n; i++) {
            cars[i] = {position[i], (double)(target - position[i]) / speed[i]};
        }
        sort(cars.rbegin(), cars.rend());

        int fleets = 0;
        double currTime = 0;
        for (const auto& car : cars) {
            if (car.second > currTime) {
                fleets++;
                currTime = car.second;
            }
        }
        return fleets;
    }
};`,
      java: `import java.util.*;

class Solution {
    public int carFleet(int target, int[] position, int[] speed) {
        int n = position.length;
        double[][] cars = new double[n][2];
        for (int i = 0; i < n; i++) {
            cars[i][0] = position[i];
            cars[i][1] = (double)(target - position[i]) / speed[i];
        }
        Arrays.sort(cars, (a, b) -> Double.compare(b[0], a[0]));

        int fleets = 0;
        double currTime = 0;
        for (double[] car : cars) {
            if (car[1] > currTime) {
                fleets++;
                currTime = car[1];
            }
        }
        return fleets;
    }
}`
    },
    sampleTestCases: [
      { id: 'cf-1', input: [12, [10, 8, 0, 5, 3], [2, 4, 1, 1, 3]], expectedOutput: 3 },
      { id: 'cf-2', input: [10, [3], [3]], expectedOutput: 1 }
    ],
    hiddenTestCases: [
      { id: 'cf-h1', input: [100, [0, 2, 4], [4, 2, 1]], expectedOutput: 1, isHidden: true }
    ],
    hints: [
      'Sort cars in descending order of position. A car behind will join the fleet ahead if its arrival time <= the fleet ahead.'
    ],
    solutionExplanation: `Sort cars by starting position from closest to furthest from target. Calculate the time each car needs to reach the target: \`(target - position) / speed\`. If a car takes longer than the fleet ahead, it becomes a new fleet head.

- **Time Complexity:** O(n log n)
- **Space Complexity:** O(n)`,
    timeLimitMs: 2000,
    memoryLimitMb: 128,
    acceptanceRate: 50.4,
    totalSubmissions: 140000,
    acceptedSubmissions: 70560
  }
];
