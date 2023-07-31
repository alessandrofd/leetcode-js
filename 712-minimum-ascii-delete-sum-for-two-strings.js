/**
 * Given two strings s1 and s2, return the lowest ASCII sum of deleted
 * characters to make two strings equal.
 *
 * Constraints:
 *    1 <= s1.length, s2.length <= 1000
 *    s1 and s2 consist of lowercase English letters.
 *
 * OBS: O problema "583. Delete operations for two string" descreve a base da
 * resolução deste problema.
 */

/**
 * @param {string} s1
 * @param {string} s2
 * @return {number}
 */
const minimumDeleteSum_top_down_dp = (s1, s2) => {
  const m = s1.length
  const n = s2.length

  const dp = new Array(m + 1).fill().map((_) => new Array(n + 1))

  const solve = (i, j) => {
    if (i === 0 && j === 0) return 0

    if (dp[i][j]) return dp[i][j]

    if (i === 0) return (dp[i][j] = s2[j - 1].charCodeAt() + solve(0, j - 1))

    if (j === 0) return (dp[i][j] = s1[i - 1].charCodeAt() + solve(i - 1, 0))

    if (s1[i - 1] === s2[j - 1]) return solve(i - 1, j - 1)

    dp[i][j] = Math.min(
      s1[i - 1].charCodeAt() + solve(i - 1, j),
      s2[j - 1].charCodeAt() + solve(i, j - 1)
    )

    return dp[i][j]
  }

  return solve(m, n)
}

/**
 * @param {string} s1
 * @param {string} s2
 * @return {number}
 */
const minimumDeleteSum_bottom_up_dp = (s1, s2) => {
  const m = s1.length
  const n = s2.length

  const dp = new Array(m + 1).fill().map((_) => new Array(n + 1).fill(0))
  for (let i = 1; i <= m; i++) dp[i][0] = s1[i - 1].charCodeAt() + dp[i - 1][0]
  for (let j = 1; j <= n; j++) dp[0][j] = s2[j - 1].charCodeAt() + dp[0][j - 1]

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (s1[i - 1] === s2[j - 1]) dp[i][j] = dp[i - 1][j - 1]
      else
        dp[i][j] = Math.min(
          s1[i - 1].charCodeAt() + dp[i - 1][j],
          s2[j - 1].charCodeAt() + dp[i][j - 1]
        )
    }
  }

  return dp[m][n]
}

/**
 * @param {string} s1
 * @param {string} s2
 * @return {number}
 */
const minimumDeleteSum_bottom_up_1D_dp = (s1, s2) => {
  const m = s1.length
  const n = s2.length

  let dpLast = new Array(n + 1).fill(0)
  for (let j = 1; j <= n; j++)
    dpLast[j] = s2[j - 1].charCodeAt() + dpLast[j - 1]

  for (let i = 1; i <= m; i++) {
    const dpCurrent = new Array(n + 1).fill(0)
    dpCurrent[0] = s1[i - 1].charCodeAt() + dpLast[0]
    for (let j = 1; j <= n; j++) {
      if (s1[i - 1] === s2[j - 1]) dpCurrent[j] = dpLast[j - 1]
      else
        dpCurrent[j] = Math.min(
          s1[i - 1].charCodeAt() + dpLast[j],
          s2[j - 1].charCodeAt() + dpCurrent[j - 1]
        )
    }
    dpLast = dpCurrent
  }

  return dpLast[n]
}

s1 = 'sea'
s2 = 'eat'
// Expected: 231

// s1 = 'delete'
// s2 = 'leet'
// Expected: 403

console.log(minimumDeleteSum_top_down_dp(s1, s2))
console.log(minimumDeleteSum_bottom_up_dp(s1, s2))
console.log(minimumDeleteSum_bottom_up_1D_dp(s1, s2))
