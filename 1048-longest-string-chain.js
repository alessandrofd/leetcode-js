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

  const set = new Set(words)
  const memo = new Map()
  const dfs = (word) => {
    if (memo.has(word)) return memo.get(word)
    let maxLength = 1
    for (let i = 0; i < word.length; i++) {
      const newWord = word.slice(0, i) + word.slice(i + 1)
      if (set.has(newWord)) {
        const currentLength = 1 + dfs(newWord)
        maxLength = Math.max(maxLength, currentLength)
      }
    }
    memo[word] = maxLength
    return maxLength
  }

  let result = 0
  for (const word of words) result = Math.max(result, dfs(word))
  return result
}

/**
 * @param {string[]} words
 * @return {number}
 */
const longestStrChain_bottomUp_DP = (words) => {
  // Approach 2: Bottom-Up Dynamic Programming

  const dp = new Map()
  words.sort((a, b) => a.length - b.length)
  let longest = 1
  for (const word of words) {
    let length = 1
    for (let i = 0; i < word.length; i++) {
      const predecessor = word.slice(0, i) + word.slice(i + 1)
      length = Math.max(length, (dp.get(predecessor) ?? 0) + 1)
    }
    dp.set(word, length)
    longest = Math.max(longest, length)
  }
  return longest
}

/**
 * @param {string[]} words
 * @return {number}
 */
const longestStrChain_discussion = (words) => {
  // Discussion

  const sets = Array.from({ length: 17 }, (_) => new Set())
  for (const word of words) sets[word.length].add(word)
  const dp = new Map()
  let best = 1
  for (let i = 16; i; i--) {
    if (!sets[i - 1].size) continue
    for (const word of sets[i]) {
      let wVal = dp.get(word) ?? 1
      for (let j = 0; j < word.length; j++) {
        const pred = word.slice(0, j) + word.slice(j + 1)
        if (sets[i - 1].has(pred) && wVal >= (dp.get(pred) ?? 1)) {
          dp.set(pred, wVal + 1)
          best = Math.max(best, wVal + 1)
        }
      }
    }
  }
  return best
}

const funcs = [
  longestStrChain_topDown_DP,
  longestStrChain_bottomUp_DP,
  longestStrChain_discussion,
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
