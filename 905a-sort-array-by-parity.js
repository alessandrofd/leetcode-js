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
const sortArrayByParity_swap = (nums) => {
  const n = nums.length
  let i = 0
  for (let j = 0; j < n; j++) {
    if (nums[j] % 2 === 0) {
      ;[nums[i], nums[j]] = [nums[j], nums[i]]
      i += 1
    }
  }

  return nums
}

/**
 * @param {number[]} nums
 * @return {number[]}
 */
const sortArrayByParity_sort = (nums) => nums.sort((a, b) => (a % 2) - (b % 2))

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
