/**
 * Given an integer array nums, move all the even integers at the beginning of
 * the array followed by all the odd integers.
 *
 * Return any array that satisfies this condition.
 *
 * Constraints:
 *    1 <= nums.length <= 5000
 *    0 <= nums[i] <= 5000
 */

import _ from 'lodash'

/**
 * @param {number[]} nums
 * @return {number[]}
 */
const sortArrayByParity_swap = (nums) => {}

/**
 * @param {number[]} nums
 * @return {number[]}
 */
const sortArrayByParity_sort = (nums) => {}

// prettier-ignore
const funcs = [
  sortArrayByParity_swap, 
  sortArrayByParity_sort,
]

// prettier-ignore
const data = [
  [[3, 1, 2, 4], [2, 4, 3, 1]],
  [[0], [0]],
]

for (const func of funcs) {
  for (const [nums, expected] of data) {
    console.log(_.isEqual(func(nums), expected))
  }
}
