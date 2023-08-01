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
const combine_recurse = (n, k) => {}

/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
const combine_backtrack = (n, k) => {}

n = 4
k = 2
// Expected: [[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]

n = 1
k = 1
// Expected: [[1]]

console.log(combine_recurse(n, k))
console.log(combine_backtrack(n, k))
