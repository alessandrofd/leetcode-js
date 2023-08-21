/**
 * Given a string s, check if it can be constructed by taking a substring of it
 * and appending multiple copies of the substring together.
 *
 * Constraints:
 *    1 <= s.length <= 10^4
 *    s consists of lowercase English letters.
 */

/**
 * @param {string} s
 * @return {boolean}
 */
const repeatedSubstringPattern = (s) => /^(.*)\1+$/.test(s)

s = 'abab'
// Expected: true

// s = 'aba'
// Expected: false

// s = 'abcabcabcabc'
// Expected: true

// s = 'ababba'
// Expected: false

// s = 'babbabbabbabbab'
// Expected: true

console.log(repeatedSubstringPattern(s))
