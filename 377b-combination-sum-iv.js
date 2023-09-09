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
// Approach 1: Top-Down Dynamic Programming
const combinationSum4_DP_TopDown = (nums, target) => {}

// Approach 2: Bottom-Up Dynamic Programming
const combinationSum4_DP_BottomUp = (nums, target) => {}

// Approach 2: Bottom-Up Dynamic Programming - optimized
const combinationSum4_DP_BottomUp_Optimized = (nums, target) => {}

// prettier-ignore
const funcs = [
  combinationSum4_DP_TopDown,
  combinationSum4_DP_BottomUp,
  combinationSum4_DP_BottomUp_Optimized,
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
