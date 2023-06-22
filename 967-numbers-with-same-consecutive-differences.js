/**
 * Return all non-negative integers of length n such that the absolute
 * difference between every two consecutive digits is k.
 *
 * Note that every number in the answer must not have leading zeros. For
 * example, 01 has one leading zero and is invalid.
 *
 * You may return the answer in any order.
 *
 * Constraints:
 *    2 <= n <= 9
 *    0 <= k <= 9
 */

/**
 * @param {number} n
 * @param {number} k
 * @return {number[]}
 */
// Approach 1: DFS (Depth-First Search)
const numsSameConsecDiff_1 = (len, diff) => {
  const results = []

  const dfs = (num, len) => {
    if (len === 0) {
      results.push(num)
      return
    }
    const tail = num % 10
    const digits = diff ? [tail - diff, tail + diff] : [tail + diff]
    for (const digit of digits)
      if (digit >= 0 && digit < 10) dfs(num * 10 + digit, len - 1)
  }

  for (let i = 1; i < 10; i++) dfs(i, len - 1)
  return results
}

// Approach 2: BFS (Breadth-First Search)
const numsSameConsecDiff = (levels, diff) => {
  let nums = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  for (let level = 1; level < levels; level++) {
    const nextLevel = []
    for (const num of nums) {
      const tail = num % 10
      const digits = diff ? [tail - diff, tail + diff] : [tail + diff]
      for (const digit of digits)
        if (digit >= 0 && digit < 10) nextLevel.push(num * 10 + digit)
    }
    nums = nextLevel
  }
  return nums
}

n = 3
k = 7
// Output: [181, 292, 707, 818, 929]

n = 2
k = 1
// Output: [10, 12, 21, 23, 32, 34, 43, 45, 54, 56, 65, 67, 76, 78, 87, 89, 98]

console.log(numsSameConsecDiff(n, k))
