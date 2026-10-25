import { GoogleGenerativeAI } from '@google/generative-ai';
import { Difficulty, Problem, TestCase, TestCaseResult } from '../../types';

export interface GenerateProblemOptions {
  topic: string;
  difficulty: Difficulty;
  customPrompt?: string;
  language?: string;
}

export class GeminiService {
  private static STORAGE_KEY = 'algoforge_gemini_api_key';

  public static getApiKey(): string {
    return (
      localStorage.getItem(this.STORAGE_KEY) ||
      (import.meta.env.VITE_GEMINI_API_KEY as string) ||
      ''
    );
  }

  public static setApiKey(key: string): void {
    if (key.trim()) {
      localStorage.setItem(this.STORAGE_KEY, key.trim());
    } else {
      localStorage.removeItem(this.STORAGE_KEY);
    }
  }

  public static hasApiKey(): boolean {
    return Boolean(this.getApiKey());
  }

  private static getClient(): GoogleGenerativeAI {
    const key = this.getApiKey();
    if (!key) {
      throw new Error(
        'Gemini API key is required. Please set your Gemini API key in Settings or VITE_GEMINI_API_KEY.'
      );
    }
    return new GoogleGenerativeAI(key);
  }

  /**
   * Generates a complete, high-quality LeetCode problem with test cases, starter code, and hints.
   */
  public static async generateProblem(options: GenerateProblemOptions): Promise<Problem> {
    const genAI = this.getClient();
    // Using gemini-2.5-flash or gemini-1.5-flash
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      generationConfig: {
        responseMimeType: 'application/json',
        temperature: 0.7
      }
    });

    const prompt = `You are a Principal Software Engineer and LeetCode problem author.
Generate a brand new, highly engaging, and algorithmic coding interview problem with the following parameters:
- Topic / Category: ${options.topic}
- Difficulty Level: ${options.difficulty}
${options.customPrompt ? `- Custom Requirements / Theme: ${options.customPrompt}` : ''}

Output a strictly valid JSON object conforming to this TypeScript schema:
{
  "title": string,
  "slug": string (kebab-case, e.g. "longest-increasing-path"),
  "difficulty": "Easy" | "Medium" | "Hard",
  "category": string,
  "tags": string[],
  "description": string (Markdown format with Problem statement, Example 1, Example 2, and Constraints),
  "functionName": string (camelCase JavaScript/standard function name, e.g. "maxSubarraySum"),
  "paramNames": string[] (parameter names in order, e.g. ["nums", "k"]),
  "starterCode": {
    "javascript": string (valid JavaScript function boilerplate with JSDoc),
    "python": string (valid Python 3 Solution class boilerplate with type annotations),
    "cpp": string (valid C++ Solution class boilerplate),
    "java": string (valid Java Solution class boilerplate)
  },
  "sampleTestCases": [
    {
      "id": string,
      "input": any[] (array of arguments matching paramNames order),
      "expectedOutput": any,
      "explanation": string
    }
  ],
  "hiddenTestCases": [
    {
      "id": string,
      "input": any[] (edge case inputs: empty, negatives, bounds, duplicates, single elements),
      "expectedOutput": any,
      "isHidden": true
    }
  ],
  "hints": [
    string (Hint 1: subtle nudge or conceptual question),
    string (Hint 2: data structure / pattern clue),
    string (Hint 3: near-solution algorithmic strategy)
  ],
  "solutionExplanation": string (Markdown explaining the optimal algorithm with Big-O Time and Space analysis)
}

Important:
- Provide 3 sample test cases and 3-4 hidden edge test cases.
- In JavaScript, ensure starterCode defines: function functionName(param1, param2) { ... }
- Ensure all test case inputs are accurate arrays of arguments matching the function parameters.
- Provide clean, production-grade problem descriptions matching real LeetCode problems.`;

    const response = await model.generateContent(prompt);
    const text = response.response.text();
    const data = JSON.parse(text);

    const generatedProblem: Problem = {
      id: `ai-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      slug: data.slug || data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      title: data.title,
      difficulty: data.difficulty || options.difficulty,
      category: data.category || options.topic,
      tags: data.tags || [options.topic],
      description: data.description,
      functionName: data.functionName,
      paramNames: data.paramNames || ['nums'],
      starterCode: data.starterCode,
      sampleTestCases: data.sampleTestCases,
      hiddenTestCases: data.hiddenTestCases,
      hints: data.hints || [],
      solutionExplanation: data.solutionExplanation || '',
      timeLimitMs: 2000,
      memoryLimitMb: 128,
      acceptanceRate: 48.0,
      totalSubmissions: 0,
      acceptedSubmissions: 0,
      isAiGenerated: true,
      createdAt: new Date().toISOString()
    };

    return generatedProblem;
  }

  /**
   * Generates a context-aware hint based on the user's specific current code.
   */
  public static async getAiHint(
    problem: Problem,
    userCode: string,
    hintLevel: number
  ): Promise<string> {
    const genAI = this.getClient();
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const prompt = `You are a compassionate coding mentor helping a student solve this coding problem on a LeetCode platform.
Problem: "${problem.title}" (${problem.difficulty})
Description summary: ${problem.description.slice(0, 500)}

Student's current code:
\`\`\`
${userCode}
\`\`\`

The student is requesting Hint Level ${hintLevel} (1 = general direction, 2 = data structure / invariant clue, 3 = algorithmic step).
Provide a concise, motivating hint (2-4 sentences).
IMPORTANT: DO NOT give the complete code solution! Help them think through the logic.`;

    const response = await model.generateContent(prompt);
    return response.response.text();
  }

  /**
   * Analyzes student code and derives precise Big-O Time & Space complexity.
   */
  public static async analyzeCodeAndComplexity(
    problem: Problem,
    userCode: string,
    language: string
  ): Promise<{
    timeComplexity: string;
    spaceComplexity: string;
    analysis: string;
    suggestions: string[];
  }> {
    const genAI = this.getClient();
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      generationConfig: { responseMimeType: 'application/json' }
    });

    const prompt = `Analyze this student solution for LeetCode problem "${problem.title}".
Language: ${language}
Code:
\`\`\`
${userCode}
\`\`\`

Return a strictly valid JSON object with:
{
  "timeComplexity": "O(...) with short description",
  "spaceComplexity": "O(...) with short description",
  "analysis": "2-3 sentences assessing efficiency, bottlenecks, and correctness",
  "suggestions": ["specific suggestion 1", "specific suggestion 2"]
}`;

    const response = await model.generateContent(prompt);
    return JSON.parse(response.response.text());
  }

  /**
   * Explains why a specific test case failed and how to debug it.
   */
  public static async debugFailingTestCase(
    problem: Problem,
    userCode: string,
    testCaseResult: TestCaseResult
  ): Promise<string> {
    const genAI = this.getClient();
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const prompt = `The student submitted code for "${problem.title}" and failed a test case:
Input: ${JSON.stringify(testCaseResult.input)}
Expected Output: ${JSON.stringify(testCaseResult.expectedOutput)}
Actual Output: ${JSON.stringify(testCaseResult.actualOutput)}
Stdout Logs: ${testCaseResult.stdout.join(' | ')}
${testCaseResult.errorMessage ? `Error Message: ${testCaseResult.errorMessage}` : ''}

Student's Code:
\`\`\`
${userCode}
\`\`\`

Explain concisely in 2-4 sentences:
1. What invariant or edge condition their logic missed for this input.
2. How they can fix their condition or loop boundary without rewriting everything.`;

    const response = await model.generateContent(prompt);
    return response.response.text();
  }

  /**
   * Translates code between languages (e.g. JavaScript -> Python or C++ -> Java)
   */
  public static async translateCode(
    sourceCode: string,
    fromLang: string,
    toLang: string,
    problemTitle: string
  ): Promise<{ translatedCode: string; notes: string }> {
    const genAI = this.getClient();
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      generationConfig: { responseMimeType: 'application/json' }
    });

    const prompt = `You are an expert polyglot software engineer.
Translate this ${fromLang} solution for problem "${problemTitle}" into idiomatic ${toLang}.
Source Code:
\`\`\`${fromLang}
${sourceCode}
\`\`\`

Return a strictly valid JSON object conforming to:
{
  "translatedCode": "string (the clean code in ${toLang})",
  "notes": "string (1-2 sentences on key language idiom differences)"
}`;

    const response = await model.generateContent(prompt);
    return JSON.parse(response.response.text());
  }

  /**
   * Suggests tricky algorithmic edge cases that might break code.
   */
  public static async suggestEdgeCases(
    problem: Problem,
    userCode: string
  ): Promise<Array<{ title: string; input: string; reason: string }>> {
    const genAI = this.getClient();
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      generationConfig: { responseMimeType: 'application/json' }
    });

    const prompt = `For LeetCode problem "${problem.title}", analyze this user code and generate 3 tricky edge cases that often cause Wrong Answer or TLE.
User Code:
\`\`\`
${userCode}
\`\`\`

Return a strictly valid JSON array of objects:
[
  {
    "title": "Short title, e.g. Single element or Duplicates",
    "input": "Sample input representation",
    "reason": "Why this edge case could fail"
  }
]`;

    const response = await model.generateContent(prompt);
    return JSON.parse(response.response.text());
  }
}
