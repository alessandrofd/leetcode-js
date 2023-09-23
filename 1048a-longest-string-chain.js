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

  const wordSet = new Set(words)
  const dp = new Map()

  const dfs = (word) => {
    if (dp.has(word)) return dp.get(word)

    let chain = 1
    for (let i = 0; i < word.length; i++) {
      const pred = word.slice(0, i) + word.slice(i + 1)
      if (wordSet.has(pred)) {
        chain = Math.max(chain, dfs(pred) + 1)
      }
    }
    dp.set(word, chain)
    return chain
  }

  let result = 0
  for (const word of words) {
    result = Math.max(result, dfs(word))
  }
  return result
}

/**
 * @param {string[]} words
 * @return {number}
 */
const longestStrChain_bottomUp_DP = (words) => {
  // Approach 2: Bottom-Up Dynamic Programming

  words.sort((a, b) => a.length - b.length)
  const dp = new Map()

  let longestChain = 0
  for (const word of words) {
    let chain = 1
    for (let i = 0; i < word.length; i++) {
      const pred = word.slice(0, i) + word.slice(i + 1)
      if (dp.has(pred)) {
        chain = Math.max(chain, dp.get(pred) + 1)
      }
    }
    dp.set(word, chain)
    longestChain = Math.max(longestChain, chain)
  }

  return longestChain
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
