/**
 * Given an array of integers nums which is sorted in ascending order, and
 * an integer target, write a function to search target in nums. If target
 * exists, then return its index. Otherwise, return -1.
 *
 * You must write an algorithm with O(log n) runtime complexity.
 *
 * Constraints:
 *    1 <= nums.length <= 10^4
 *    -10^4 < nums[i], target < 10^4
 *    All the integers in nums are unique.
 *    nums is sorted in ascending order.
 */

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
const search = (nums, target) => {
  const n = nums.length
  let lo = 0
  let hi = n - 1
  while (lo < hi) {
    const mid = Math.floor((lo + hi) / 2)
    if (nums[mid] < target) lo = mid + 1
    else hi = mid
  }
  return nums[lo] === target ? lo : -1
}

nums = [-1, 0, 3, 5, 9, 12]
target = 9
// Output: 4

nums = [-1, 0, 3, 5, 9, 12]
target = 2
// Output: -1

console.log(search(nums, target))
