/**
 * You are given a 0-indexed integer array nums. In one operation you can
 * replace any element of the array with any two elements that sum to it.
 *
 *    For example, consider nums = [5,6,7]. In one operation, we can replace
 *    nums[1] with 2 and 4 and convert nums to [5,2,4,7].
 *
 * Return the minimum number of operations to make an array that is sorted in
 * non-decreasing order.
 *
 * Constraints:
 *    1 <= nums.length <= 10^5
 *    1 <= nums[i] <= 10^9
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
const minimumReplacement = (nums) => {
  const n = nums.length
  let count = 0
  for (let i = n - 2; i >= 0; i--) {
    if (nums[i] <= nums[i + 1]) continue

    const elements = Math.ceil(nums[i] / nums[i + 1])
    count += elements - 1
    nums[i] = Math.floor(nums[i] / elements)
  }

  return count
}

exports.minimumReplacement = minimumReplacement

// prettier-ignore
const funcs = [
  minimumReplacement,
]

const data = [
  [[3, 9, 3], 2],
  [[1, 2, 3, 4, 5], 0],
  [[12, 9, 7, 6, 17, 19, 21], 6],
  [[7, 6, 15, 6, 11, 14, 10], 10],
]

for (const func of funcs) {
  for (const [nums, expected] of data) {
    console.log(func(nums) === expected)
  }
}
