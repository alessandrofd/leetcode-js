/**
 * You are given a 0-indexed array nums of n integers, and an integer k.
 *
 * The k-radius average for a subarray of nums centered at some index i with the
 * radius k is the average of all elements in nums between the indices i - k and
 * i + k (inclusive). If there are less than k elements before or after the
 * index i, then the k-radius average is -1.
 *
 * Build and return an array avgs of length n where avgs[i] is the k-radius
 * average for the subarray centered at index i.
 *
 * The average of x elements is the sum of the x elements divided by x, using
 * integer division. The integer division truncates toward zero, which means
 * losing its fractional part.
 *
 * For example, the average of four elements 2, 3, 1, and 5 is
 * (2 + 3 + 1 + 5) / 4 = 11 / 4 = 2.75, which truncates to 2.
 *
 * Constraints:
 *    n == nums.length
 *    1 <= n <= 10^5
 *    0 <= nums[i], k <= 10^5
 */

const { result } = require('lodash')

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
const getAverages = (nums, k) => {}

nums = [7, 4, 3, 9, 1, 8, 5, 2, 6]
k = 3
// Expected: [-1, -1, -1, 5, 4, 4, -1, -1, -1]

nums = [100000]
k = 0
// Expected: [100000]

nums = [8]
k = 100000
// Expected: [-1]

console.log(getAverages(nums, k))
