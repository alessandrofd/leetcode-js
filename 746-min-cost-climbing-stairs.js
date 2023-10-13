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
const minCostClimbingStairs_dp_bottom_up = (cost) => {
  const minCost = new Array(cost.length + 1).fill(0)

  for (let i = 2; i < minCost.length; i++) {
    const takeOneStep = minCost[i - 1] + cost[i - 1]
    const takeTwoSteps = minCost[i - 2] + cost[i - 2]
    minCost[i] = Math.min(takeOneStep, takeTwoSteps)
  }

  return minCost[minCost.length - 1]
}

/**
 * @param {number[]} cost
 * @return {number}
 */
const minCostClimbingStairs_dp_top_down = (cost) => {
  const memo = new Map()

  const findMinCost = (i) => {
    if (i < 2) return 0
    if (memo.has(i)) return memo.get(i)

    const downOne = cost[i - 1] + findMinCost(i - 1)
    const downTwo = cost[i - 2] + findMinCost(i - 2)
    memo.set(i, Math.min(downOne, downTwo))
    return memo.get(i)
  }

  return findMinCost(cost.length)
}

/**
 * @param {number[]} cost
 * @return {number}
 */
const minCostClimbingStairs_dp_bottom_up_constant_space = (cost) => {
  let downOne = 0
  let downTwo = 0

  for (let i = 2; i < cost.length + 1; i++) {
    let temp = downOne
    downOne = Math.min(downOne + cost[i - 1], downTwo + cost[i - 2])
    downTwo = temp
  }

  return downOne
}

/**
 * @param {number[]} cost
 * @return {number}
 */
const minCostClimbingStairs_discussion_board = (cost) => {
  for (let i = cost.length - 3; ~i; i--)
    cost[i] += Math.min(cost[i + 1], cost[i + 2])
  return Math.min(cost[0], cost[1])
}

// prettier-ignore
const funcs = [
  minCostClimbingStairs_dp_top_down,
  minCostClimbingStairs_dp_bottom_up,
  minCostClimbingStairs_dp_bottom_up_constant_space,
  minCostClimbingStairs_discussion_board,
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
