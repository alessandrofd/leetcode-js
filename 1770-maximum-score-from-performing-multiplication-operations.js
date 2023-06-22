/**
 * You are given two integer arrays nums and multipliers of size n and m
 * respectively, where n >= m. The arrays are 1-indexed.
 *
 * You begin with a score of 0. You want to perform exactly m operations. On the
 * ith operation (1-indexed), you will:
 *    Choose one integer x from either the start or the end of the array nums.
 *    Add multipliers[i] * x to your score.
 *    Remove x from the array nums.
 *
 * Return the maximum score after performing m operations.
 *
 * Constraints:
 *    n == nums.length
 *    m == multipliers.length
 *    1 <= m <= 103
 *    m <= n <= 105
 *    -1000 <= nums[i], multipliers[i] <= 1000
 */

/**
 * @param {number[]} nums
 * @param {number[]} multipliers
 * @return {number}
 */
// Approach 1: Brute Force
const maximumScore_1 = (nums, multipliers) => {
  const helper = (left, right, operation) => {
    if (operation === multipliers.length) return 0
    return Math.max(
      nums[left] * multipliers[operation] +
        helper(left + 1, right, operation + 1),
      nums[right] * multipliers[operation] +
        helper(left, right - 1, operation + 1)
    )
  }
  return helper(0, nums.length - 1, 0)
}

// Approach 2: Recursive Dynamic Programming
const maximumScore_2 = (nums, multipliers) => {
  const memo = new Array(nums.length)
    .fill()
    .map((x) => new Array(multipliers.length))

  const dp = (op, left) => {
    if (op === multipliers.length) return 0
    if (memo[op][left]) return memo[op][left]

    const n = nums.length
    const l = nums[left] * multipliers[op] + dp(op + 1, left + 1)
    const r = nums[n - 1 - (op - left)] * multipliers[op] + dp(op + 1, left)

    return (memo[op][left] = Math.max(l, r))
  }

  return dp(0, 0)
}

// Approach 3: Iterative Dynamic Programming
const maximumScore_3 = (nums, multipliers) => {
  const n = nums.length
  const m = multipliers.length
  const dp = new Array(m + 1).fill().map((x) => new Array(m + 1).fill(0))

  for (let op = m - 1; op >= 0; op--) {
    for (let left = op; left >= 0; left--) {
      const l = multipliers[op] * nums[left] + dp[op + 1][left + 1]
      const r = multipliers[op] * nums[n - 1 - (op - left)] + dp[op + 1][left]
      dp[op][left] = Math.max(l, r)
    }
  }
  return dp[0][0]
}

// Approach 4: Space Optimized Dynamic Programming
const maximumScore = (nums, multipliers) => {
  const n = nums.length
  const m = multipliers.length
  let dp = new Array(m + 1).fill(0)

  for (let op = m - 1; op >= 0; op--) {
    let previous = [...dp]
    for (let left = op; left >= 0; left--) {
      const l = multipliers[op] * nums[left] + previous[left + 1]
      const r = multipliers[op] * nums[n - 1 - (op - left)] + previous[left]
      dp[left] = Math.max(l, r)
    }
  }

  return dp[0]
}

nums = [1, 2, 3]
multipliers = [3, 2, 1]
// Output: 14
// Explanation: An optimal solution is as follows:
// - Choose from the end, [1,2,3], adding 3 * 3 = 9 to the score.
// - Choose from the end, [1,2], adding 2 * 2 = 4 to the score.
// - Choose from the end, [1], adding 1 * 1 = 1 to the score.
// The total score is 9 + 4 + 1 = 14.

// nums = [-5, -3, -3, -2, 7, 1]
// multipliers = [-10, -5, 3, 4, 6]
// Output: 102
// Explanation: An optimal solution is as follows:
// - Choose from the start, [-5,-3,-3,-2,7,1], adding -5 * -10 = 50 to the score.
// - Choose from the start, [-3,-3,-2,7,1], adding -3 * -5 = 15 to the score.
// - Choose from the start, [-3,-2,7,1], adding -3 * 3 = -9 to the score.
// - Choose from the end, [-2,7,1], adding 1 * 4 = 4 to the score.
// - Choose from the end, [-2,7], adding 7 * 6 = 42 to the score.
// The total score is 50 + 15 - 9 + 4 + 42 = 102.

console.log(maximumScore(nums, multipliers))
