/**
 * Given an integer array nums and an integer k, return true if there are two
 * distinct indices i and j in the array such that nums[i] == nums[j] and
 * abs(i - j) <= k.
 *
 * Constraints:
 *    1 <= nums.length <= 10^5
 *    -10^9 <= nums[i] <= 10^9
 *    0 <= k <= 10^5
 */

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
// Approach #1: Naive Linear Search - Time Limit Exceeded
const containsNearbyDuplicate_1 = (nums, k) => {
  for (let i = 0; i < nums.length - 1; i++)
    for (let j = i + 1; j <= Math.min(i + k, nums.length); j++)
      if (nums[i] === nums[j]) return true
  return false
}

// Approach #2: Binary Search Tree
const containsNearbyDuplicate_2 = (nums, k) => {
  const set = new Set()
  for (let i = 0; i < nums.length; i++) {
    if (set.has(nums[i])) return true
    set.add(nums[i])
    if (set.size > k) set.delete(nums[i - k])
  }
  return false
}

const containsNearbyDuplicate = (nums, k) => {
  const map = new Map()
  for (let i = 0; i < nums.length; i++) {
    if (i - map.get(nums[i]) <= k) return true
    map.set(nums[i], i)
  }
  return false
}

nums = [1, 2, 3, 1]
k = 3
// Output: true

// nums = [1, 0, 1, 1]
// k = 1
// Output: true

// nums = [1, 2, 3, 1, 2, 3]
// k = 2
// Output: false

console.log(containsNearbyDuplicate(nums, k))
