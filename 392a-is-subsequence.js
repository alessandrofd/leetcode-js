/**
 * Given two strings s and t, return true if s is a subsequence of t, or false
 * otherwise.
 *
 * A subsequence of a string is a new string that is formed from the original
 * string by deleting some (can be none) of the characters without disturbing
 * the relative positions of the remaining characters. (i.e., "ace" is a
 * subsequence of "abcde" while "aec" is not).
 *
 * Constraints:
 *    0 <= s.length <= 100
 *    0 <= t.length <= 10^4
 *    s and t consist only of lowercase English letters.
 */

/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
const isSubsequence = (s, t) => {}

// prettier-ignore
const funcs = [
  isSubsequence,
]

const data = [
  ['abc', 'ahbgdc', true],
  ['axc', 'ahbgdc', false],
]

for (const func of funcs) {
  for (const [subseq, full, expected] of data) {
    console.log(func(subseq, full) === expected)
  }
}
