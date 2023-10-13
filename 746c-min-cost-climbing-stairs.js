/**
 * You are given an integer array cost where cost[i] is the cost of ith step
 * on a staircase. Once you pay the cost, you can either climb one or two steps.
 *
 * You can either start from the step with index 0, or the step with index 1.
 *
 * Return the minimum cost to reach the top of the floor.
 *
 * Constraints:
 *    2 <= cost.length <= 1000
 *    0 <= cost[i] <= 999
 */

/**
 * @param {number[]} cost
 * @return {number}
 */
const minCostClimbingStairs_dp_bottom_up = (cost) => {}

/**
 * @param {number[]} cost
 * @return {number}
 */
const minCostClimbingStairs_dp_top_down = (cost) => {}

/**
 * @param {number[]} cost
 * @return {number}
 */
const minCostClimbingStairs_dp_bottom_up_constant_space = (cost) => {}

/**
 * @param {number[]} cost
 * @return {number}
 */
const minCostClimbingStairs_no_extra_space = (cost) => {}

// prettier-ignore
const funcs = [
  minCostClimbingStairs_dp_top_down,
  minCostClimbingStairs_dp_bottom_up,
  minCostClimbingStairs_dp_bottom_up_constant_space,
  minCostClimbingStairs_no_extra_space,
]

const data = [
  [[10, 15, 20], 15],
  [[1, 100, 1, 1, 1, 100, 1, 1, 100, 1], 6],
]

for (const func of funcs) {
  for (const [cost, expected] of data) {
    console.log(func(cost) === expected)
  }
}
