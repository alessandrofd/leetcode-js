/**
 * Given an integer array nums and an integer k, return true if nums has a
 * continuous subarray of size at least two whose elements sum up to a multiple
 * of k, or false otherwise.
 *
 * An integer x is a multiple of k if there exists an integer n such that
 * x = n * k. 0 is always a multiple of k.
 *
 * Constraints:
 *    1 <= nums.length <= 10^5
 *    0 <= nums[i] <= 10^9
 *    0 <= sum(nums[i]) <= 2^31 - 1
 *    1 <= k <= 2^31 - 1
 */

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
// Força bruta - Time limit exceeded
const checkSubarraySum_brute = (nums, k) => {
  for (let i = 0; i < nums.length - 1; i++) {
    let sum = nums[i]
    for (let j = i + 1; j < nums.length; j++) {
      sum += nums[j]
      if (sum % k === 0) return true
    }
  }
  return false
}

// Hash map approach
const checkSubarraySum = (nums, k) => {
  const map = new Map([[0, 0]])
  let sum = 0
  for (let i = 0; i < nums.length; i++) {
    sum += nums[i]
    if (!map.has(sum % k)) map.set(sum % k, i + 1)
    else if (map.get(sum % k) < i) return true
  }
  return false
}

nums = [23, 2, 4, 6, 7]
k = 6
// Output: true
// Explanation: [2, 4] is a continuous subarray of size 2 whose elements sum up to 6.

nums = [23, 2, 6, 4, 7]
k = 6
// Output: true
// Explanation: [23, 2, 6, 4, 7] is an continuous subarray of size 5 whose elements sum up to 42.
// 42 is a multiple of 6 because 42 = 7 * 6 and 7 is an integer.

nums = [23, 2, 6, 4, 7]
k = 13
// Output: false

nums = [2, 4]
k = 6

console.log(checkSubarraySum(nums, k))
