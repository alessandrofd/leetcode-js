/**
 * An array is monotonic if it is either monotone increasing or monotone
 * decreasing.
 *
 * An array nums is monotone increasing if for all i <= j, nums[i] <= nums[j].
 * An array nums is monotone decreasing if for all i <= j, nums[i] >= nums[j].
 *
 * Given an integer array nums, return true if the given array is monotonic, or
 * false otherwise.
 *
 * Constraints:
 *    1 <= nums.length <= 10^5
 *    -10^5 <= nums[i] <= 10^5
 */

/**
 * @param {number[]} nums
 * @return {boolean}
 */
const isMonotonic = (nums) => {}

// prettier-ignore
const funcs = [
  isMonotonic,
]

const data = [
  [[1, 2, 2, 3], true],
  [[6, 5, 4, 4], true],
  [[1, 3, 2], false],
]

for (const func of funcs) {
  for (const [nums, expected] of data) {
    console.log(func(nums) === expected)
  }
}
