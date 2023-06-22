/**
 * Given an integer array nums, return all the different possible non-decreasing
 * subsequences of the given array with at least two elements. You may return
 * the answer in any order.
 *
 * Constraints:
 *    1 <= nums.length <= 15
 *    -100 <= nums[i] <= 100
 */

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
// Recursão pura
const findSubsequences_backtracking_1 = (nums) => {
  const result = []
  const map = {}

  const backtrack = (index, sequence) => {
    if (map[sequence]) return

    if (index === nums.length) {
      if (sequence.length >= 2) {
        map[sequence] = true
        result.push([...sequence])
      }
      return
    }

    if (sequence.length === 0 || sequence.at(-1) <= nums[index]) {
      sequence.push(nums[index])
      backtrack(index + 1, sequence)
      sequence.pop()
    }
    backtrack(index + 1, sequence)
  }

  backtrack(0, [])
  return result
}

// Recursão com laço
const findSubsequences_backtracking_2 = (nums) => {
  const result = []

  const backtrack = (index, sequence) => {
    const unique = new Set()

    for (let i = index; i < nums.length; i++) {
      if (
        !unique.has(nums[i]) &&
        (sequence.length === 0 || sequence.at(-1) <= nums[i])
      ) {
        unique.add(nums[i])
        sequence.push(nums[i])
        if (sequence.length >= 2) result.push([...sequence])
        backtrack(i + 1, sequence)
        sequence.pop()
      }
    }
  }

  backtrack(0, [])
  return result
}

// Approach 2: Bitmasks
const findSubsequences_bitmask = (nums) => {
  const n = nums.length
  const map = {}
  const result = []

  for (let bitmask = 1; bitmask < 1 << n; bitmask++) {
    const sequence = []
    for (i = 0; i < n; i++) if (bitmask & (1 << i)) sequence.push(nums[i])
    if (sequence.length >= 2 && !map[sequence]) {
      map[sequence] = true
      let isIncreasing = true
      for (let i = 1; i < sequence.length; i++)
        isIncreasing &= sequence[i - 1] <= sequence[i]
      if (isIncreasing) result.push(sequence)
    }
  }

  return result
}

nums = [4, 6, 7, 7]
// Output: [[4,6],[4,6,7],[4,6,7,7],[4,7],[4,7,7],[6,7],[6,7,7],[7,7]]

nums = [4, 4, 3, 2, 1]
// Output: [[4,4]]

console.log(findSubsequences_backtracking_1(nums))
console.log(findSubsequences_backtracking_2(nums))
console.log(findSubsequences_bitmask(nums))
