/**
 * You are given an array of n pairs pairs where pairs[i] = [lefti, righti] and
 * lefti < righti.
 *
 * A pair p2 = [c, d] follows a pair p1 = [a, b] if b < c. A chain of pairs can
 * be formed in this fashion.
 *
 * Return the length longest chain which can be formed.
 *
 * You do not need to use up all the given intervals. You can select pairs in any order.
 *
 * Constraints:
 *    n == pairs.length
 *    1 <= n <= 1000
 *    -1000 <= lefti < righti <= 1000
 */

/**
 * @param {number[][]} pairs
 * @return {number}
 */
const findLongestChain_DP_TopDown = (pairs) => {
  const n = pairs.length
  if (n == 1) return 1

  pairs.sort(([a], [b]) => a - b)

  const memo = new Array(n).fill(0)

  const dfs = (i) => {
    if (memo[i]) return memo[i]

    memo[i] = 1
    for (let j = i + 1; j < n; j++) {
      if (pairs[i][1] < pairs[j][0]) {
        memo[i] = Math.max(memo[i], dfs(j) + 1)
      }
    }

    return memo[i]
  }

  let result = 0
  for (let i = 0; i < n; i++) {
    result = Math.max(result, dfs(i))
  }
  return result
}

/**
 * @param {number[][]} pairs
 * @return {number}
 */
const findLongestChain_DP_BottomUp = (pairs) => {
  const n = pairs.length
  if (n == 1) return 1

  pairs.sort(([a], [b]) => a - b)

  const memo = new Array(n).fill(1)

  for (let i = n - 1; i >= 0; i--) {
    for (let j = i + 1; j < n; j++) {
      if (pairs[i][1] < pairs[j][0]) {
        memo[i] = Math.max(memo[i], memo[j] + 1)
      }
    }
  }

  return Math.max(...memo)
}

/**
 * @param {number[][]} pairs
 * @return {number}
 */
const findLongestChain_greedy = (pairs) => {
  const n = pairs.length
  if (n == 1) return 1

  pairs.sort(([, a], [, b]) => a - b)

  let tail = -1001
  let result = 0
  for (const [left, right] of pairs) {
    if (left > tail) {
      result += 1
      tail = right
    }
  }

  return result
}

exports.findLongestChain_DP_TopDown = findLongestChain_DP_TopDown
exports.findLongestChain_DP_BottomUp = findLongestChain_DP_BottomUp
exports.findLongestChain_greedy = findLongestChain_greedy

const data = [
  [
    // prettier-ignore
    [ [1, 2], [2, 3], [3, 4], ],
    2,
  ],
  [
    // prettier-ignore
    [ [1, 2], [7, 8], [4, 5], ],
    3,
  ],
]

// prettier-ignore
const funcs = [
  findLongestChain_DP_TopDown, 
  findLongestChain_DP_BottomUp
]

for (const func of funcs) {
  for (const [pairs, expected] of data) {
    console.log(func(pairs) === expected)
  }
}
