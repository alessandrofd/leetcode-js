/**
 * Given strings s1, s2, and s3, find whether s3 is formed by an interleaving of
 * s1 and s2.
 *
 * An interleaving of two strings s and t is a configuration where s and t are
 * divided into n and m substrings respectively, such that:
 *
 *    s = s1 + s2 + ... + sn
 *
 *    t = t1 + t2 + ... + tm
 *
 *    |n - m| <= 1
 *
 *    The interleaving is s1 + t1 + s2 + t2 + s3 + t3 + ... or
 *    t1 + s1 + t2 + s2 + t3 + s3 + ...
 *
 * Note: a + b is the concatenation of strings a and b.
 *
 * Constraints:
 *    0 <= s1.length, s2.length <= 100
 *    0 <= s3.length <= 200
 *    s1, s2, and s3 consist of lowercase English letters.
 */

// DP Top-Down
/**
 * @param {string} s1
 * @param {string} s2
 * @param {string} s3
 * @return {boolean}
 */
const isInterleave_DP_topDown = (s1, s2, s3) => {}

// DP Bottom-Up
/**
 * @param {string} s1
 * @param {string} s2
 * @param {string} s3
 * @return {boolean}
 */
const isInterleave_DP_bottomUp = (s1, s2, s3) => {}

exports.isInterleave_DP_topDown = isInterleave_DP_topDown
exports.isInterleave_DP_bottomUp = isInterleave_DP_topDown

// const data = [
//   ['aabcc', 'dbbca', 'aadbbcbcac', true],
//   ['aabcc', 'dbbca', 'aadbbbaccc', false],
//   ['', '', '', true],
//   ['a', 'b', 'a', false],
//   ['a', '', 'a', true],
// ]

// // prettier-ignore
// const funcs = [
//   // isInterleave_DP_topDown,
//   isInterleave_DP_bottomUp
// ]

// for (const func of funcs)
//   for (const [s1, s2, s3, expected] of data)
//     console.log(func(s1, s2, s3) === expected)
