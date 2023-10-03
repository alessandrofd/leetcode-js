/**
 * Given an array of integers nums, return the number of good pairs.
 *
 * A pair (i, j) is called good if nums[i] == nums[j] and i < j.
 *
 * Constraints:
 *    1 <= nums.length <= 100
 *    1 <= nums[i] <= 100
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
const numIdenticalPairs = (nums) => {
  const freqs = new Map()
  for (const num of nums) {
    freqs.set(num, (freqs.get(num) ?? 0) + 1)
  }

  let goodPairs = 0
  for (const freq of freqs.values()) {
    goodPairs += (freq * (freq - 1)) / 2
  }

  return goodPairs
}

// prettier-ignore
const funcs = [
  numIdenticalPairs,
]

const data = [
  [[1, 2, 3, 1, 1, 3], 4],
  [[1, 1, 1, 1], 6],
  [[1, 2, 3], 0],
]

for (const func of funcs) {
  for (const [nums, expected] of data) {
    console.log(func(nums) === expected)
  }
}
