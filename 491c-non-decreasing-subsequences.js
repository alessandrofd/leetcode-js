/**
 * Given an integer array nums, return all the different possible non-decreasing
 * subsequences of the given array with at least two elements. You may return
 * the answer in any order.
 *
 * Constraints:
 *    1 <= nums.length <= 15
 *    -100 <= nums[i] <= 100
 */

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
// Recursão pura
const findSubsequences_backtracking_1 = (nums) => {}

// Recursão com laço
const findSubsequences_backtracking_2 = (nums) => {}

// Approach 2: Bitmasks
// Utiliza um bitmask para testar todas as possíveis combinações
const findSubsequences_bitmask = (nums) => {}

nums = [4, 6, 7, 7]
// Output: [[4,6],[4,6,7],[4,6,7,7],[4,7],[4,7,7],[6,7],[6,7,7],[7,7]]

nums = [4, 4, 3, 2, 1]
// Output: [[4,4]]

console.log(findSubsequences_backtracking_1(nums))
console.log(findSubsequences_backtracking_2(nums))
console.log(findSubsequences_bitmask(nums))
