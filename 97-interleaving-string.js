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
const isInterleave_DP_topDown = (s1, s2, s3) => {
  const m = s1.length
  const n = s2.length
  const k = s3.length

  if (k !== m + n) return false

  const freqs = new Map()
  for (const c of s1 + s2) freqs.set(c, (freqs.get(c) ?? 0) + 1)
  for (const c of s3) freqs.set(c, (freqs.get(c) ?? 0) - 1)

  if (Array.from(freqs.values()).some((count) => count !== 0)) return false

  const memo = new Array(m + 1).fill().map((_) => new Array(n + 1))
  memo[m][n] = true

  const backtrack = (p1, p2, p3) => {
    if (memo[p1][p2] !== undefined) return memo[p1][p2]

    memo[p1][p2] =
      (p1 < s1.length && s1[p1] === s3[p3] && backtrack(p1 + 1, p2, p3 + 1)) ||
      (p2 < s2.length && s2[p2] === s3[p3] && backtrack(p1, p2 + 1, p3 + 1))

    return memo[p1][p2]
  }

  return backtrack(0, 0, 0)
}

// DP Bottom-Up
/**
 * @param {string} s1
 * @param {string} s2
 * @param {string} s3
 * @return {boolean}
 */
const isInterleave_DP_bottomUp = (s1, s2, s3) => {
  const m = s1.length
  const n = s2.length
  const k = s3.length

  if (k !== m + n) return false

  const freqs = new Map()
  for (const c of s1 + s2) freqs.set(c, (freqs.get(c) ?? 0) + 1)
  for (const c of s3) freqs.set(c, (freqs.get(c) ?? 0) - 1)

  if (Array.from(freqs.values()).some((count) => count !== 0)) return false

  const dp = new Array(m + 1).fill().map((_) => new Array(n + 1))
  dp[0][0] = true

  for (let i = 0; i <= m; i++) {
    for (let j = 0; j <= n; j++) {
      dp[i][j] =
        dp[i][j] ||
        (i > 0 && dp[i - 1][j] && s1[i - 1] === s3[i + j - 1]) ||
        (j > 0 && dp[i][j - 1] && s2[j - 1] === s3[i + j - 1])
    }
  }

  return dp[m][n]
}

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
