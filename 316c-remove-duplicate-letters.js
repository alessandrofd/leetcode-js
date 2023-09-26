/**
 * Given a string s, remove duplicate letters so that every letter appears once
 * and only once. You must make sure your result is the smallest in
 * lexicographical order among all possible results.
 *
 * Constraints:
 *  1 <= s.length <= 10^4
 *  s consists of lowercase English letters.
 */

/**
 * @param {string} s
 * @return {string}
 */

const removeDuplicateLetters = (str) => {}

//prettier-ignore
const funcs = [
  removeDuplicateLetters,
]

const data = [
  ['bcabc', 'abc'],
  ['cbacdcbc', 'acdb'],
  ['leetcode', 'letcod'],
  ['bbcaac', 'bac'],
]

for (const func of funcs) {
  for (const [str, expected] of data) {
    console.log(func(str) === expected)
  }
}
