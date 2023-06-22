/**
 * Given an integer array nums, return true if there exists a triple of indices
 * (i, j, k) such that i < j < k and nums[i] < nums[j] < nums[k]. If no such
 * indices exists, return false.
 *
 * Constraints:
 * 1 <= nums.length <= 5 * 10^5
 * -2^31 <= nums[i] <= 2^31 - 1
 */

/**
 * @param {number[]} nums
 * @return {boolean}
 */

// Approach 1: Linear Scan
const increasingTriplet = (nums) => {
  if (nums.length < 3) return false

  let first = Infinity
  let second = Infinity

  for (const num of nums)
    if (num <= first) first = num
    else if (num <= second) second = num
    else return true

  return false
}

nums = [1, 2, 3, 4, 5]
// Output: true
// Explanation: Any triplet where i < j < k is valid.

// nums = [5, 4, 3, 2, 1]
// Output: false
// Explanation: No triplet exists.

// nums = [2, 1, 5, 0, 4, 6]
// Output: true
// Explanation: The triplet (3, 4, 5) is valid because nums[3] == 0 < nums[4] == 4 < nums[5] == 6.

console.log(increasingTriplet(nums))
