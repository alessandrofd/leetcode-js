/**
 * You are given two integer arrays nums1 and nums2. We write the integers of
 * nums1 and nums2 (in the order they are given) on two separate horizontal
 * lines.
 *
 * We may draw connecting lines: a straight line connecting two numbers
 * nums1[i] and nums2[j] such that:
 *
 *    nums1[i] == nums2[j], and
 *
 *    the line we draw does not intersect any other connecting (non-horizontal)
 *    line.
 *
 * Note that a connecting line cannot intersect even at the endpoints
 * (i.e., each number can only belong to one connecting line).
 *
 * Return the maximum number of connecting lines we can draw in this way.
 *
 * Constraints:
 *    1 <= nums1.length, nums2.length <= 500
 *    1 <= nums1[i], nums2[j] <= 2000
 */

// TLE

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
const maxUncrossedLines_recursion = (nums1, nums2) => {
  const n1 = nums1.length
  const n2 = nums2.length
  const memo = new Array(n1 + 1).fill().map((_) => new Array(n2 + 1))

  const recurse = (i, j) => {
    if (i <= 0 || j <= 0) return 0
    if (memo[i][j]) return memo[i][j]

    if (nums1[i - 1] == nums2[j - 1]) memo[i][j] = 1 + recurse(i - 1, j - 1)
    else memo[i][j] = Math.max(recurse(i, j - 1), recurse(i - 1, j))

    return memo[i][j]
  }

  return recurse(n1, n2)
}

/**
 * Programação dinâmica - 2 dimensões: a quantidade de números em cada vetor
 * consideradas
 * Caso base: dp[0][j] = dp[i][0] = 0
 * Transiçaõ : se nums1[i-1] == nums2[j-1] => dp[i][j] = 1 + dp[i-1][j-1]
 *             senão dp[i][j] = max(dp[i][j-1], dp[i-1][j])
 * Solução: dp[n1, n2], onde n1 = nums1.length e n2 = nums2.length
 */

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
const maxUncrossedLines_dp = (nums1, nums2) => {
  const n1 = nums1.length
  const n2 = nums2.length

  const dp = new Array(n1 + 1).fill().map((_) => new Array(n2 + 1).fill(0))

  for (let i = 1; i <= n1; i++) {
    for (let j = 1; j <= n2; j++) {
      if (nums1[i - 1] == nums2[j - 1]) dp[i][j] = 1 + dp[i - 1][j - 1]
      else dp[i][j] = Math.max(dp[i][j - 1], dp[i - 1][j])
    }
  }

  console.log(dp)
  return dp[n1][n2]
}

nums1 = [1, 4, 2]
nums2 = [1, 2, 4]
// Expected: 2

nums1 = [2, 5, 1, 2, 5]
nums2 = [10, 5, 2, 1, 5, 2]
// Expected: 3

nums1 = [1, 3, 7, 1, 7, 5]
nums2 = [1, 9, 2, 5, 1]
// Expected: 2

console.log(maxUncrossedLines_recursion(nums1, nums2))
console.log(maxUncrossedLines_dp(nums1, nums2))
