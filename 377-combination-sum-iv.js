/**
 * Given an array of distinct integers nums and a target integer target, return
 * the number of possible combinations that add up to target.
 *
 * The test cases are generated so that the answer can fit in a 32-bit integer.
 */

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
// Approach 1: Top-Down Dynamic Programming
const combinationSum4_1 = (nums, target) => {
  memo = new Map()
  const combs = (nums, remain) => {
    if (remain == 0) return 1
    if (memo.has(remain)) return memo.get(remain)

    result = 0
    for (const num of nums)
      if (remain - num >= 0) result += combs(nums, remain - num)
    memo.set(remain, result)
    return result
  }

  return combs(nums, target)
}

// Approach 2: Bottom-Up Dynamic Programming
const combinationSum4_2 = (nums, target) => {
  const dp = new Array(target + 1).fill(0)
  dp[0] = 1
  for (let i = 1; i <= target; i++)
    for (const num of nums) if (i - num >= 0) dp[i] += dp[i - num]
  return dp[target]
}

// Approach 2: Bottom-Up Dynamic Programming - optimized
const combinationSum4 = (nums, target) => {
  nums.sort((a, b) => a - b)
  const dp = new Array(target + 1).fill(0)
  dp[0] = 1
  for (let i = 1; i <= target; i++) {
    for (const num of nums) {
      if (i - num >= 0) dp[i] += dp[i - num]
      else break
    }
  }
  return dp[target]
}

nums = [1, 2, 3]
target = 4
// Output: 7

console.log(combinationSum4(nums, target))
