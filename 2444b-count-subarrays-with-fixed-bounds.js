/**
 * You are given an integer array nums and two integers minK and maxK.
 *
 * A fixed-bound subarray of nums is a subarray that satisfies the
 * following conditions:
 *
 *    The minimum value in the subarray is equal to minK.
 *
 *    The maximum value in the subarray is equal to maxK.
 *
 * Return the number of fixed-bound subarrays.
 *
 * A subarray is a contiguous part of an array.
 *
 * Constraints:
 *    2 <= nums.length <= 10^5
 *    1 <= nums[i], minK, maxK <= 10^6
 */

/**
 * @param {number[]} nums
 * @param {number} minK
 * @param {number} maxK
 * @return {number}
 */
const countSubarrays = (nums, minK, maxK) => {}

const data = [
  [[1, 3, 5, 2, 7, 5], 1, 5, 2],
  [[1, 1, 1, 1], 1, 1, 10],
]

funcs = [countSubarrays]

for (func of funcs) {
  for ([nums, minK, maxK, output] of data) {
    console.log(func.name)
    console.log(func(nums, minK, maxK))
    console.log(output)
  }
}
