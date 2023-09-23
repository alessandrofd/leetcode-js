/**
 * You are given an array of words where each word consists of lowercase English
 * letters.
 *
 * wordA is a predecessor of wordB if and only if we can insert exactly one
 * letter anywhere in wordA without changing the order of the other characters
 * to make it equal to wordB.
 *
 *    For example, "abc" is a predecessor of "abac", while "cba" is not a
 *    predecessor of "bcad".
 *
 * A word chain is a sequence of words [word1, word2, ..., wordk] with k >= 1,
 * where word1 is a predecessor of word2, word2 is a predecessor of word3,
 * and so on. A single word is trivially a word chain with k == 1.
 *
 * Return the length of the longest possible word chain with words chosen from
 * the given list of words.
 *
 * Constraints:
 *    1 <= words.length <= 1000
 *    1 <= words[i].length <= 16
 *    words[i] only consists of lowercase English letters.
 */

/**
 * @param {string[]} words
 * @return {number}
 */
const longestStrChain_topDown_DP = (words) => {
  // Approach 1: Top-Down Dynamic Programming (Recursion + Memoization)
}

/**
 * @param {string[]} words
 * @return {number}
 */
const longestStrChain_bottomUp_DP = (words) => {
  // Approach 2: Bottom-Up Dynamic Programming
}

// prettier-ignore
const funcs = [
  // longestStrChain_topDown_DP, 
  longestStrChain_bottomUp_DP
]

const data = [
  [['bdca', 'a', 'b', 'ba', 'bca', 'bda'], 4],
  [['xbc', 'pcxbcf', 'xb', 'cxbc', 'pcxbc'], 5],
  [['abcd', 'dbqca'], 1],
]

for (const func of funcs) {
  for (const [words, expected] of data) {
    console.log(func(words) === expected)
  }
}
