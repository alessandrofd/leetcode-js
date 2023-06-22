/**
 * Given a sorted array of distinct integers and a target value, return the
 * index if the target is found. If not, return the index where it would be if
 * it were inserted in order.
 *
 * You must write an algorithm with O(log n) runtime complexity.
 *
 * Constraints:
 *    1 <= nums.length <= 10^4
 *    -10^4 <= nums[i] <= 10^4
 *    nums contains distinct values sorted in ascending order.
 *    -10^4 <= target <= 10^4
 */

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
const searchInsert = (nums, target) => {
  const n = nums.length

  let lo = 0
  let hi = n - 1
  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2)
    if (nums[mid] === target) {
      return mid
    } else if (nums[mid] < target) {
      lo = mid + 1
    } else {
      hi = mid - 1
    }
  }
  return lo
}

nums = [1, 3, 5, 6]
target = 5
// Output: 2

// nums = [1, 3, 5, 6]
// target = 2
// Output: 1

// nums = [1, 3, 5, 6]
// target = 7
// Output: 4

console.log(searchInsert(nums, target))
