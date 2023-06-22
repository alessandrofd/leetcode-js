/**
 * Given an integer array nums, return all the triplets
 * [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and
 * nums[i] + nums[j] + nums[k] == 0.
 *
 * Notice that the solution set must not contain duplicate triplets.
 *
 * Constraints:
 *    3 <= nums.length <= 3000
 *    -10^5 <= nums[i] <= 10^5
 */

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
// Approach 1: Two Pointers
const threeSum_2pointers = (nums) => {
  // const threeSum = (nums) => {
  const result = []

  nums.sort((a, b) => a - b)

  for (let i = 0; i < nums.length - 2; i++) {
    if (nums[i] > 0) break
    if (i > 0 && nums[i] === nums[i - 1]) continue

    let lo = i + 1
    let hi = nums.length - 1
    while (lo < hi) {
      const sum = nums[i] + nums[lo] + nums[hi]
      if (sum < 0) lo++
      else if (sum > 0) hi--
      else {
        result.push([nums[i], nums[lo++], nums[hi--]])
        while (lo < hi && nums[lo] === nums[lo - 1]) lo++
      }
    }
  }
  return result
}

// Approach 2: Hashset
// const threeSum_hashset = (nums) => {
const threeSum = (nums) => {
  const result = []

  nums.sort((a, b) => a - b)

  for (let i = 0; i < nums.length - 2; i++) {
    if (nums[i] > 0) break
    if (i > 0 && nums[i] === nums[i - 1]) continue

    const set = new Set()
    for (let j = i + 1; j < nums.length; j++) {
      const complement = -(nums[i] + nums[j])
      if (set.has(complement)) {
        result.push([nums[i], complement, nums[j]])
        while (j < nums.length - 1 && nums[j] === nums[j + 1]) j++
      }
      set.add(nums[j])
    }
  }
  return result
}

nums = [-1, 0, 1, 2, -1, -4]
// Output: [[-1,-1,2],[-1,0,1]]
// Explanation:
// nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0.
// nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0.
// nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0.
// The distinct triplets are [-1,0,1] and [-1,-1,2].
// Notice that the order of the output and the order of the triplets does not matter.

nums = [0, 1, 1]
// Output: []
// Explanation: The only possible triplet does not sum up to 0.

nums = [0, 0, 0]
// Output: [[0,0,0]]
// Explanation: The only possible triplet sums up to 0.

threeSum(nums) //?
