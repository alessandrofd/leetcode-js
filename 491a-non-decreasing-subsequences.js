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
  const n = nums.length
  const memo = {}
  const result = []

  const backtrack = (i, seq = []) => {
    if (memo[seq]) return

    if (i === n) {
      if (seq.length >= 2) {
        result.push([...seq])
        memo[seq] = true
      }
      return
    }

    if (seq.length === 0 || seq.at(-1) <= nums[i]) {
      seq.push(nums[i])
      backtrack(i + 1, seq)
      seq.pop()
    }
    backtrack(i + 1, seq)
  }

  backtrack(0)
  return result
}

// Recursão com laço
const findSubsequences_backtracking_2 = (nums) => {
  const n = nums.length
  const result = []

  const backtrack = (i, seq = []) => {
    const unique = new Set()

    seq.push(nums[i])
    if (seq.length >= 2) result.push([...seq])

    for (let j = i + 1; j < n; j++) {
      if (unique.has(nums[j])) continue
      unique.add(nums[j])
      backtrack(j, seq)
    }

    seq.pop()
  }

  for (let i = 0; i < n - 1; i++) backtrack(i)
  return result
}

// Approach 2: Bitmasks
// Utiliza um bitmask para testar todas as possíveis combinações
const findSubsequences_bitmask = (nums) => {
  const n = nums.length
  const result = []
  const memo = {}

  for (let bitmask = 1; bitmask < 1 << n; bitmask++) {
    const seq = []
    for (let i = 0; i < n; i++) if (bitmask & (1 << i)) seq.push(nums[i])
    if (seq.length >= 2 && !memo[seq]) {
      memo[seq] = true
      let asc = true
      for (let i = 1; i < seq.length; i++) {
        if (seq[i] < seq[i - 1]) {
          asc = false
          break
        }
      }
      if (asc) result.push(seq)
    }
  }

  return result
}

nums = [4, 6, 7, 7]
// Output: [[4,6],[4,6,7],[4,6,7,7],[4,7],[4,7,7],[6,7],[6,7,7],[7,7]]

// nums = [4, 4, 3, 2, 1]
// Output: [[4,4]]

console.log(findSubsequences_backtracking_1(nums))
console.log(findSubsequences_backtracking_2(nums))
console.log(findSubsequences_bitmask(nums))
