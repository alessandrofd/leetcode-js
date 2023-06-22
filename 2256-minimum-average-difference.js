/**
 * You are given a 0-indexed integer array nums of length n.
 *
 * The average difference of the index i is the absolute difference between the
 * average of the first i + 1 elements of nums and the average of the last
 * n - i - 1 elements. Both averages should be rounded down to the nearest
 * integer.
 *
 * Return the index with the minimum average difference. If there are multiple
 * such indices, return the smallest one.
 *
 * Note:
 *    The absolute difference of two numbers is the absolute value of their
 *    difference.
 *
 *    The average of n elements is the sum of the n elements divided (integer
 *    division) by n.
 *
 *    The average of 0 elements is considered to be 0.
 *
 * Constraints:
 *    1 <= nums.length <= 10^5
 *    0 <= nums[i] <= 10^5
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
const minimumAverageDifference = (nums) => {
  const totalSum = nums.reduce((acc, next) => (acc += next))
  let sum = 0
  let minAvgDiff = Infinity
  let index

  for (let i = 0; i < nums.length; i++) {
    sum += nums[i]
    const first = (sum / (i + 1)) | 0
    const last =
      i === nums.length - 1
        ? 0
        : ((totalSum - sum) / (nums.length - (i + 1))) | 0
    const diff = Math.abs(first - last)
    if (diff < minAvgDiff) {
      minAvgDiff = diff
      index = i
    }
  }

  return index
}

nums = [2, 5, 3, 9, 5, 3]
//  Output: 3

nums = [0]
// Output: 0

console.log(minimumAverageDifference(nums))
