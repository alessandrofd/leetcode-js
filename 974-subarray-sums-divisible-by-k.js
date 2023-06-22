/**
 * Given an integer array nums and an integer k, return the number of non-empty
 * subarrays that have a sum divisible by k.
 *
 * A subarray is a contiguous part of an array.
 *
 * Constraints:
 *  1 <= nums.length <= 3 * 10^4
 *  -10^4 <= nums[i] <= 10^4
 *  2 <= k <= 10^4
 */

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
const subarraysDivByK = (nums, k) => {
  const mods = new Array(k).fill(0)
  mods[0] = 1

  let result = 0

  let mod = 0
  for (const num of nums) {
    mod = (mod + (num % k) + k) % k
    result += mods[mod]
    mods[mod]++
  }

  return result
}

nums = [4, 5, 0, -2, -3, 1]
k = 5
// Output: 7

nums = [5]
k = 9
// Output: 0

console.log(subarraysDivByK(nums, k))
