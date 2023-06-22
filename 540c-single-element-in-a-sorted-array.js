/**
 * You are given a sorted array consisting of only integers where every element
 * appears exactly twice, except for one element which appears exactly once.
 *
 * Return the single element that appears only once.
 *
 * Your solution must run in O(log n) time and O(1) space.
 *
 * Constraints:
 *    1 <= nums.length <= 10^5
 *    0 <= nums[i] <= 10^5
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
const singleNonDuplicate = (nums) => {}

nums = [1, 1, 2, 3, 3, 4, 4, 8, 8]
// Output: 2

// nums = [3, 3, 7, 7, 10, 11, 11]
// Output: 10

// nums = [1, 1, 2]
// Output: 2

nums = [1, 2, 2]
// Output: 1

nums = [3, 3, 4, 6, 6, 8, 8]
// Output: 4

nums = [3, 3, 6, 6, 7, 8, 8]
// Output: 7

console.log(singleNonDuplicate(nums))
