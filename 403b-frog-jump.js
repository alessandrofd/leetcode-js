/**
 * A frog is crossing a river. The river is divided into some number of units,
 * and at each unit, there may or may not exist a stone. The frog can jump on a
 * stone, but it must not jump into the water.
 *
 * Given a list of stones' positions (in units) in sorted ascending order,
 * determine if the frog can cross the river by landing on the last stone.
 * Initially, the frog is on the first stone and assumes the first jump must be
 * 1 unit.
 *
 * If the frog's last jump was k units, its next jump must be either k - 1, k,
 * or k + 1 units. The frog can only jump in the forward direction.
 *
 * Constraints:
 *    2 <= stones.length <= 2000
 *    0 <= stones[i] <= 2^31 - 1
 *    stones[0] == 0
 *    stones is sorted in a strictly increasing order.
 */

/**
 * @param {number[]} stones
 * @return {boolean}
 */
const canCross_DP_bottomUp = (stones) => {}

/**
 * @param {number[]} stones
 * @return {boolean}
 */
const canCross_DP_topDown = (stones) => {}

exports.canCross_DP_bottomUp = canCross_DP_bottomUp
exports.canCross_DP_topDown = canCross_DP_topDown

// prettier-ignore
const funcs = [
  // canCross_DP_topDown, 
  canCross_DP_bottomUp
]

const data = [
  // [[0, 1, 3, 5, 6, 8, 12, 17], true],
  // [[0, 1, 2, 3, 4, 8, 9, 11], false],
  [[0, 1, 2147483647], false],
]

for (const func of funcs) {
  for (const [stones, expected] of data) {
    console.log(func(stones) === expected)
  }
}
