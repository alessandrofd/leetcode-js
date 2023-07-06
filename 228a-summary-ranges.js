/**
 * You are given a sorted unique integer array nums.
 *
 * A range [a,b] is the set of all integers from a to b (inclusive).
 *
 * Return the smallest sorted list of ranges that cover all the numbers in the
 * array exactly. That is, each element of nums is covered by exactly one of the
 * ranges, and there is no integer x such that x is in one of the ranges but not
 * in nums.
 *
 * Each range [a,b] in the list should be output as:
 *    "a->b" if a != b
 *    "a" if a == b
 *
 * Constraints:
 *    0 <= nums.length <= 20
 *    -2^31 <= nums[i] <= 2^31 - 1
 *    All the values of nums are unique.
 *    nums is sorted in ascending order.
 */

/**
 * @param {number[]} nums
 * @return {string[]}
 */
const summaryRanges = (nums) => {
  const n = nums.length
  const result = []

  if (n === 0) return result

  let start = 0

  for (let i = 1; i < n; i++) {
    if (nums[i] === nums[i - 1] + 1) continue

    if (start === i - 1) result.push(nums[start].toString())
    else result.push(`${nums[start]}->${nums[i - 1]}`)

    start = i
  }

  if (start === n - 1) result.push(nums[start].toString())
  else result.push(`${nums[start]}->${nums[n - 1]}`)

  return result
}

nums = [0, 1, 2, 4, 5, 7]
// Expected: ["0->2","4->5","7"]

// nums = [0, 2, 3, 4, 6, 8, 9]
// Expected: ["0","2->4","6","8->9"]

// nums = []
// Expected: []

console.log(summaryRanges(nums))
