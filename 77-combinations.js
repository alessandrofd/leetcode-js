/**
 * Given two integers n and k, return all possible combinations of k numbers
 * chosen from the range [1, n].
 *
 * You may return the answer in any order.
 *
 * Constraints:
 *    1 <= n <= 20
 *    1 <= k <= n
 */

/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
const combine_recurse = (n, k) => {
  const recurse = (start, end, position) => {
    if (position === 0) return [[]]

    const result = []
    for (let i = start; i <= end; i++) {
      for (const rest of recurse(i + 1, end, position - 1))
        result.push([i, ...rest])
    }

    return result
  }

  return recurse(1, n, k)
}

/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
const combine_backtrack = (n, k) => {
  const result = []

  const backtrack = (start, combination) => {
    if (combination.length === k) {
      result.push([...combination])
      return
    }

    for (let i = start; i <= n; i++) {
      combination.push(i)
      backtrack(i + 1, combination)
      combination.pop()
    }
  }

  backtrack(1, [])
  return result
}

n = 4
k = 2
// Expected: [[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]

n = 1
k = 1
// Expected: [[1]]

console.log(combine_recurse(n, k))
console.log(combine_backtrack(n, k))
