/**
 * Given an integer array nums, find the contiguous subarray (containing at least
 * one number) which has the largest sum and return its sum.
 *
 * A subarray is a contiguous part of an array.
 *
 * Constraints:
 *    1 <= nums.length <= 10^5
 *    -10^4 <= nums[i] <= 10^4
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
// Approach 2: Dynamic Programming, Kadane's Algorithm
const maxSubArray = (nums) => {
  let curr = nums[0]
  let max = nums[0]
  for (let i = 1; i < nums.length; i++) {
    curr = Math.max(nums[i], curr + nums[i])
    max = Math.max(max, curr)
  }
  return max
}

nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]
// Output: 6

// nums = [1]
// Output: 1

// nums = [5, 4, -1, 7, 8]
// Output: 23

console.log(maxSubArray(nums))
