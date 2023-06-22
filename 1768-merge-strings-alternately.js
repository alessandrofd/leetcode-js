/**
 * You are given two strings word1 and word2. Merge the strings by adding
 * letters in alternating order, starting with word1. If a string is longer than
 * the other, append the additional letters onto the end of the merged string.
 *
 * Return the merged string.
 *
 * Constraints:
 *    1 <= word1.length, word2.length <= 100
 *    word1 and word2 consist of lowercase English letters.
 */

/**
 * @param {string} word1
 * @param {string} word2
 * @return {string}
 */

const mergeAlternately_max = (word1, word2) => {
  let merge = ''
  for (let i = 0; i < Math.max(word1.length, word2.length); i++)
    merge += (word1[i] ?? '') + (word2[i] ?? '')

  return merge
}

const mergeAlternately_min = (word1, word2) => {
  let merge = ''
  let minLen = Math.min(word1.length, word2.length)
  for (let i = 0; i < minLen; i++) merge += word1[i] + word2[i]
  merge += word1.slice(minLen) + word2.slice(minLen)

  return merge
}

word1 = 'abc'
word2 = 'pqr'
// Output: "apbqcr"

// word1 = 'ab'
// word2 = 'pqrs'
// Output: "apbqrs"

// word1 = 'abcd'
// word2 = 'pq'
// Output: "apbqcd"

console.log(mergeAlternately_max(word1, word2))
console.log(mergeAlternately_min(word1, word2))
