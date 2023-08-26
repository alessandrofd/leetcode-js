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
const findLongestChain_DP_TopDown = (pairs) => {}

/**
 * @param {number[][]} pairs
 * @return {number}
 */
const findLongestChain_DP_BottomUp = (pairs) => {}

/**
 * @param {number[][]} pairs
 * @return {number}
 */
const findLongestChain_greedy = (pairs) => {}

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
