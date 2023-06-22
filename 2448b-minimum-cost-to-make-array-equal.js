/**
 * You are given two 0-indexed arrays nums and cost consisting each of n
 * positive integers.
 *
 * You can do the following operation any number of times:
 *
 *    Increase or decrease any element of the array nums by 1.
 *
 * The cost of doing one operation on the ith element is cost[i].
 *
 * Return the minimum total cost such that all the elements of the array nums
 * become equal.
 *
 * Constraints:
 *    n == nums.length == cost.length
 *    1 <= n <= 10^5
 *    1 <= nums[i], cost[i] <= 10^6
 */

/**
 * @param {number[]} nums
 * @param {number[]} cost
 * @return {number}
 */
const minCost_prefix = (nums, cost) => {}

/**
 * @param {number[]} nums
 * @param {number[]} cost
 * @return {number}
 */
const minCost_binSearch = (nums, cost) => {}

nums = [1, 3, 5, 2]
cost = [2, 3, 1, 14]
// Expected: 8

nums = [2, 2, 2, 2, 2]
cost = [4, 2, 8, 1, 3]
// Expected: 0

console.log(minCost_prefix(nums, cost))
console.log(minCost_binSearch(nums, cost))
