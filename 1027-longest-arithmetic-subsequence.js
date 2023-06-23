/**
 * Given an array nums of integers, return the length of the longest arithmetic
 * subsequence in nums.
 *
 * Note that:
 *
 *    A subsequence is an array that can be derived from another array by
 *    deleting some or no elements without changing the order of the remaining
 *    elements.
 *
 *    A sequence seq is arithmetic if seq[i + 1] - seq[i] are all the same value
 *    (for 0 <= i < seq.length - 1).
 *
 * Constraints:
 *    2 <= nums.length <= 1000
 *    0 <= nums[i] <= 500
 */

/**
 * DP com duas dimensões: posição no vetor e differença entre valores
 * Caso base: dp[0][*] = 0
 * Transição: dp[i][diff] = dp[j][diff] + 1, onde j < i e diff = nums[i] - nums[j]
 * Resultado: max(dp[i][diff])
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
var longestArithSeqLength = (nums) => {
  const n = nums.length
  const dp = new Array(n).fill().map((_) => new Map())

  let maxLength = 0
  for (let right = 1; right < n; right++) {
    for (let left = 0; left < right; left++) {
      const diff = nums[right] - nums[left]
      dp[right].set(diff, (dp[left].get(diff) ?? 1) + 1)
      maxLength = Math.max(maxLength, dp[right].get(diff))
    }
  }

  return maxLength
}

nums = [3, 6, 9, 12]
// Expected: 4

// nums = [9, 4, 7, 2, 10]
// Expected: 3

// nums = [20, 1, 15, 3, 10, 5, 8]
// Expected: 4

console.log(longestArithSeqLength(nums))
