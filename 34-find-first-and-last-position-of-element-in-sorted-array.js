/**
 * Given an array of integers nums sorted in non-decreasing order, find the
 * starting and ending position of a given target value.
 *
 * If target is not found in the array, return [-1, -1].
 *
 * You must write an algorithm with O(log n) runtime complexity.
 *
 * Constraints:
 *    0 <= nums.length <= 10^5
 *    -10^9 <= nums[i] <= 10^9
 *      nums is a non-decreasing array.
 *    -10^9 <= target <= 10^9
 */

import _ from 'lodash'

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
const searchRange = (nums, target) => {
  const bisectLeft = (arr, val, lo = 0, hi = arr.length) => {
    /**
     * The returned insertion point ip partitions the array a into two slices
     * such that:
     *    all(elem < x for elem in a[lo : ip]) is true for the left slice and
     *    all(elem >= x for elem in a[ip : hi]) is true for the right slice.
     */
    while (lo < hi) {
      const mid = Math.floor((lo + hi) / 2)
      if (arr[mid] < val) lo = mid + 1
      else hi = mid
    }
    return lo
  }

  const bisectRight = (arr, val, lo = 0, hi = arr.length) => {
    /**
     * The returned insertion point ip partitions the array a into two slices
     * such that:
     *    all(elem <= x for elem in a[lo : ip]) is true for the left slice and
     *    all(elem > x for elem in a[ip : hi]) is true for the right slice.
     */
    while (lo < hi) {
      const mid = Math.floor((lo + hi) / 2)
      if (arr[mid] > val) hi = mid
      else lo = mid + 1
    }
    return lo
  }

  const start = bisectLeft(nums, target)
  if (start === nums.length || nums[start] !== target) return [-1, -1]

  const end = bisectRight(nums, target) - 1

  return [start, end]
}

const data = [
  [[5, 7, 7, 8, 8, 10], 8, [3, 4]],
  [[5, 7, 7, 8, 8, 10], 6, [-1, -1]],
  [[], 0, [-1, -1]],
]

// prettier-ignore
const funcs = [
  searchRange,
]

for (const func of funcs) {
  for (const [nums, target, expected] of data) {
    console.log(_.isEqual(func(nums, target), expected))
  }
}
