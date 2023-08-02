/**
 * Given an array nums of distinct integers, return all the possible
 * permutations. You can return the answer in any order.
 *
 * Constraints:
 *    1 <= nums.length <= 6
 *    -10 <= nums[i] <= 10
 *    All the integers of nums are unique.
 */

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
const permute = (nums) => {
  const n = nums.length
  const result = []

  const backtrack = (permutation, usedNums) => {
    if (permutation.length === n) result.push([...permutation])

    for (const num of nums) {
      if (!usedNums.has(num)) {
        usedNums.add(num)
        permutation.push(num)

        backtrack(permutation, usedNums)

        permutation.pop()
        usedNums.delete(num)
      }
    }
  }

  backtrack([], new Set())
  return result
}

nums = [1, 2, 3]
// Expected: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]

// nums = [0, 1]
// Expected: [[0,1],[1,0]]

// nums = [1]
// Expected: [[1]]

console.log(permute(nums))
