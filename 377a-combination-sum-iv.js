/**
 * Given an array of distinct integers nums and a target integer target, return
 * the number of possible combinations that add up to target.
 *
 * The test cases are generated so that the answer can fit in a 32-bit integer.
 *
 * Constraints:
 *    1 <= nums.length <= 200
 *    1 <= nums[i] <= 1000
 *    All the elements of nums are unique.
 *    1 <= target <= 1000
 */

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
const combinationSum4_DP_TopDown = (nums, target) => {
  // Approach 1: Top-Down Dynamic Programming
  const n = nums.length
  const memo = new Map([[target, 1]])

  const dfs = (sum) => {
    if (memo.has(sum)) return memo.get(sum)
    if (sum > target) return 0

    result = 0
    for (const num of nums) {
      result += dfs(sum + num)
    }
    memo.set(sum, result)
    return result
  }

  return dfs(0)
}

const combinationSum4_DP_BottomUp = (nums, target) => {
  // Bottom-Up Dynamic Programming
  const n = nums.length
  const dp = new Array(target + 1).fill(0)
  dp[target] = 1

  for (let i = target - 1; i >= 0; i--) {
    for (const num of nums) {
      if (i + num <= target) {
        dp[i] += dp[i + num]
      }
    }
  }

  return dp[0]
}

const combinationSum4_DP_BottomUp_Optimized = (nums, target) => {
  // Bottom-Up Dynamic Programming - optimized
  sorted_nums = nums.slice(0).sort((a, b) => a - b)
  const n = sorted_nums.length

  const dp = new Array(target + 1).fill(0)
  dp[target] = 1

  for (let i = target - 1; i >= 0; i--)
    for (const num of sorted_nums)
      if (i + num <= target) dp[i] += dp[i + num]
      else break
  return dp[0]
}

// prettier-ignore
const funcs = [
  // combinationSum4_DP_TopDown,
  combinationSum4_DP_BottomUp,
  // combinationSum4_DP_BottomUp_Optimized,
]

const data = [
  [[1, 2, 3], 4, 7],
  [[9], 3, 0],
]

for (const func of funcs) {
  for (const [nums, target, expected] of data) {
    console.log(func(nums, target) === expected)
  }
}
