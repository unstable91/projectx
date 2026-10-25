import { Problem } from '../types';
import { ARRAYS_HASHING_PROBLEMS } from './problems/arraysHashing';
import { TWO_POINTERS_PROBLEMS } from './problems/twoPointers';
import { SLIDING_WINDOW_PROBLEMS } from './problems/slidingWindow';
import { STACK_PROBLEMS } from './problems/stackProblems';
import { BINARY_SEARCH_PROBLEMS } from './problems/binarySearchProblems';
import { DYNAMIC_PROGRAMMING_PROBLEMS } from './problems/dynamicProgramming';
import { GREEDY_INTERVALS_PROBLEMS } from './problems/greedyIntervals';
import { BACKTRACKING_PROBLEMS } from './problems/backtrackingProblems';
import { GRAPH_PROBLEMS } from './problems/graphProblems';
import { HEAP_PROBLEMS } from './problems/heapProblems';
import { MATH_BITWISE_PROBLEMS } from './problems/mathAndBitwise';
import { ADVANCED_ARRAYS_PROBLEMS } from './problems/advancedArrays';
import { ADVANCED_TWO_POINTERS_PROBLEMS } from './problems/advancedTwoPointers';
import { ADVANCED_SLIDING_STACK_PROBLEMS } from './problems/advancedSlidingStack';
import { ADVANCED_DP_PROBLEMS } from './problems/advancedDP';
import { ADVANCED_GREEDY_GRAPHS_PROBLEMS } from './problems/advancedGreedyGraphs';
import { ADVANCED_MATH_STRINGS_PROBLEMS } from './problems/advancedMathStrings';
import { TOP_INTERVIEW_CURATED_PROBLEMS } from './problems/topInterviewCurated';
import { NEETCODE_EXPANDED_PROBLEMS } from './problems/neetcodeExpanded';
import { NEETCODE_150_FINAL_PROBLEMS } from './problems/neetcode150Final';
import { NEETCODE_ADVANCED_PROBLEMS } from './problems/neetcodeAdvanced';
import { TOP_150_MASTERY_PROBLEMS } from './problems/top150Mastery';

const ALL_COLLECTIONS: Problem[] = [
  ...ARRAYS_HASHING_PROBLEMS,
  ...TWO_POINTERS_PROBLEMS,
  ...SLIDING_WINDOW_PROBLEMS,
  ...STACK_PROBLEMS,
  ...BINARY_SEARCH_PROBLEMS,
  ...DYNAMIC_PROGRAMMING_PROBLEMS,
  ...GREEDY_INTERVALS_PROBLEMS,
  ...BACKTRACKING_PROBLEMS,
  ...GRAPH_PROBLEMS,
  ...HEAP_PROBLEMS,
  ...MATH_BITWISE_PROBLEMS,
  ...ADVANCED_ARRAYS_PROBLEMS,
  ...ADVANCED_TWO_POINTERS_PROBLEMS,
  ...ADVANCED_SLIDING_STACK_PROBLEMS,
  ...ADVANCED_DP_PROBLEMS,
  ...ADVANCED_GREEDY_GRAPHS_PROBLEMS,
  ...ADVANCED_MATH_STRINGS_PROBLEMS,
  ...TOP_INTERVIEW_CURATED_PROBLEMS,
  ...NEETCODE_EXPANDED_PROBLEMS,
  ...NEETCODE_150_FINAL_PROBLEMS,
  ...NEETCODE_ADVANCED_PROBLEMS,
  ...TOP_150_MASTERY_PROBLEMS
];

// Deduplicate strictly by slug
const seenSlugs = new Set<string>();
export const DEFAULT_PROBLEMS: Problem[] = [];

for (const prob of ALL_COLLECTIONS) {
  if (!seenSlugs.has(prob.slug)) {
    seenSlugs.add(prob.slug);
    DEFAULT_PROBLEMS.push(prob);
  }
}
