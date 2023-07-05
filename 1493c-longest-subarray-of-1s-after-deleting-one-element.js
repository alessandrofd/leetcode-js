/**
 * Given a binary array nums, you should delete one element from it.
 *
 * Return the size of the longest non-empty subarray containing only 1's in
 * the resulting array. Return 0 if there is no such subarray.
 *
 * Constraints:
 *    1 <= nums.length <= 10^5
 *    nums[i] is either 0 or 1.
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
const longestSubarray = (nums) => {}

nums = [1, 1, 0, 1]
// Expected: 3

nums = [0, 1, 1, 1, 0, 1, 1, 0, 1]
// Expected: 5

// nums = [1,1,1]
// Expected: 2

console.log(longestSubarray(nums))
