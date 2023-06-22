/**
 * Given an array nums of n integers, return an array of all the unique
 * quadruplets [nums[a], nums[b], nums[c], nums[d]] such that:
 *
 *    0 <= a, b, c, d < n
 *    a, b, c, and d are distinct.
 *    nums[a] + nums[b] + nums[c] + nums[d] == target
 *
 *  You may return the answer in any order.
 *
 * Constraints:
 *    1 <= nums.length <= 200
 *    -10^9 <= nums[i] <= 10^9
 *    -10^9 <= target <= 10^9
 */

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
// Approach 1: Two Pointers
const fourSum_2Pointers = (nums, target) => {
  // const fourSum = (nums, target) => {
  nums.sort((a, b) => a - b)

  const twoSum = (nums, target, start) => {
    const result = []

    let lo = start
    let hi = nums.length - 1
    while (lo < hi) {
      const sum = nums[lo] + nums[hi]
      if (sum < target) lo++
      else if (sum > target) hi--
      else {
        result.push([nums[lo++], nums[hi--]])
        while (lo < hi && nums[lo] === nums[lo - 1]) lo++
      }
    }

    return result
  }

  const kSum = (nums, target, start, k) => {
    const result = []

    if (start === nums.length) return result

    const average = target / k
    if (nums[start] > average || nums[nums.length - 1] < average) return result

    if (k === 2) return twoSum(nums, target, start)

    for (let i = start; i < nums.length; i++) {
      if (i > start && nums[i] === nums[i - 1]) continue
      for (const subset of kSum(nums, target - nums[i], i + 1, k - 1))
        result.push([nums[i], ...subset])
    }

    return result
  }

  return kSum(nums, target, 0, 4)
}

// Approach 2: Hash Set
const fourSum = (nums, target) => {
  // const fourSum_set = (nums, target) => {
  nums.sort((a, b) => a - b)

  const twoSum = (nums, target, start) => {
    const result = []

    const set = new Set()
    for (let i = start; i < nums.length; i++) {
      if (set.has(target - nums[i])) {
        result.push([target - nums[i], nums[i]])
        while (i < nums.length - 1 && nums[i] === nums[i + 1]) i++
      }
      set.add(nums[i])
    }

    return result
  }

  const kSum = (nums, target, start, k) => {
    const result = []

    if (start === nums.length - 1) return result

    const average = target / k
    if (nums[start] > average || nums[nums.length - 1] < average) return result

    if (k === 2) return twoSum(nums, target, start)

    for (let i = start; i < nums.length; i++) {
      if (i > start && nums[i] === nums[i - 1]) continue
      for (const subset of kSum(nums, target - nums[i], i + 1, k - 1))
        result.push([nums[i], ...subset])
    }

    return result
  }

  return kSum(nums, target, 0, 4)
}

nums = [1, 0, -1, 0, -2, 2]
target = 0
// Output: [
//   [-2, -1, 1, 2],
//   [-2, 0, 0, 2],
//   [-1, 0, 0, 1],
// ]

nums = [2, 2, 2, 2, 2]
target = 8
// Output: [[2, 2, 2, 2]]

console.log(fourSum(nums, target))
