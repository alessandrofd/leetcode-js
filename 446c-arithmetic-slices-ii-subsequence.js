/**
 * Given an integer array nums, return the number of all the arithmetic
 * subsequences of nums.
 *
 * A sequence of numbers is called arithmetic if it consists of at least three
 * elements and if the difference between any two consecutive elements is the
 * same.
 *
 * For example, [1, 3, 5, 7, 9], [7, 7, 7, 7], and [3, -1, -5, -9] are
 * arithmetic sequences.
 *
 * For example, [1, 1, 2, 5, 7] is not an arithmetic sequence.
 *
 * A subsequence of an array is a sequence that can be formed by removing some
 * elements (possibly none) of the array.
 *
 * For example, [2,5,10] is a subsequence of [1,2,1,2,4,1,5,10].
 *
 * The test cases are generated so that the answer fits in 32-bit integer.
 *
 * Constraints:
 *    1  <= nums.length <= 1000
 *    -2^31 <= nums[i] <= 2^31 - 1
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
// Approach #1 Brute Force - DFS [Time Limit Exceeded]
const numberOfArithmeticslices_brute = (nums) => {
  // const numberOfArithmeticSlices = (nums) => {
  let result = 0
  const array = []

  const dfs = (depth) => {
    if (depth === nums.length) {
      if (array.length < 3) return

      const diff = array[1] - array[0]
      for (let i = 1; i < array.length; i++)
        if (array[i] - array[i - 1] !== diff) return

      result++
      return
    }

    dfs(depth + 1)
    array.push(nums[depth])
    dfs(depth + 1)
    array.pop()
  }

  dfs(0)
  return result
}

// Approach #2 Dynamic Programming [Accepted]
const numberOfArithmeticSlices_DParray = (nums) => {
  // const numberOfArithmeticSlices = (nums) => {
  let result = 0
  const dp = []

  for (let i = 0; i < nums.length; i++) {
    dp[i] = []
    for (let j = 0; j < i; j++) {
      const diff = nums[j] - nums[i]
      const sum = dp[j][diff] ?? 0
      dp[i][diff] = (dp[i][diff] ?? 0) + sum + 1
      result += sum
    }
  }
  return result
}

// const numberOfArithmeticSlices_DPMap = (nums) => {
const numberOfArithmeticSlices = (nums) => {
  let result = 0
  const dp = new Array(nums.length).fill().map((_) => new Map())

  for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      const diff = nums[i] - nums[j]
      const sum = dp[j].get(diff) ?? 0
      dp[i].set(diff, (dp[i].get(diff) ?? 0) + sum + 1)
      result += sum
    }
  }
  return result
}

nums = [2, 4, 6, 8, 10]
// Output: 7
// Explanation: All arithmetic subsequence slices are:
// [2,4,6]
// [4,6,8]
// [6,8,10]
// [2,4,6,8]
// [4,6,8,10]
// [2,4,6,8,10]
// [2,6,10]

nums = [7, 7, 7, 7, 7]
// Output: 16
// Explanation: Any subsequence of this array is arithmetic.

console.log(numberOfArithmeticSlices(nums))
