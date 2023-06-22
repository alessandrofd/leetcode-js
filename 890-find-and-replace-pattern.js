/**
 * Given a list of strings words and a string pattern, return a list of
 * words[i] that match pattern. You may return the answer in any order.
 *
 * A word matches the pattern if there exists a permutation of letters p so
 * that after replacing every letter x in the pattern with p(x), we get the
 * desired word.
 *
 * Recall that a permutation of letters is a bijection from letters to letters:
 * every letter maps to another letter, and no two letters map to the same letter.
 */

/**
 * @param {string[]} words
 * @param {string} pattern
 * @return {string[]}
 */

// Approach 1: Two Maps
const findAndReplacePattern_1 = (words, pattern) => {
  const match = (word, pattern) => {
    const m1 = new Map()
    const m2 = new Map()

    for (let i = 0; i < word.length; i++) {
      if (!m1.has(word[i])) m1.set(word[i], pattern[i])
      if (!m2.has(pattern[i])) m2.set(pattern[i], word[i])
      if (m1.get(word[i]) !== pattern[i] || m2.get(pattern[i]) !== word[i])
        return false
    }
    return true
  }

  const result = []
  for (const word of words) if (match(word, pattern)) result.push(word)
  return result
}

// Approach 2: One Map
const findAndReplacePattern = (words, pattern) => {
  const match = (word, pattern) => {
    const m = new Map()

    for (let i = 0; i < word.length; i++) {
      if (!m.has(word[i])) m.set(word[i], pattern[i])
      if (m.get(word[i]) !== pattern[i]) return false
    }

    const seen = new Array(26).fill(false)
    for (const char of [...m.values()]) {
      const index = char.charCodeAt(0) - 'a'.charCodeAt(0)
      if (seen[index]) return false
      seen[index] = true
    }
    return true
  }

  const result = []
  for (const word of words) if (match(word, pattern)) result.push(word)
  return result
}

// words = ['abc', 'deq', 'mee', 'aqq', 'dkd', 'ccc']
// pattern = 'abb'
// Output: ["mee","aqq"]

words = ['a', 'b', 'c']
pattern = 'a'
// Output: ["a","b","c"]

console.log(findAndReplacePattern(words, pattern))
