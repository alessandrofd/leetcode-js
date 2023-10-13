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
const minCostClimbingStairs_dp_top_down = (cost) => {
  const n = cost.length
  const memo = new Array(n)

  const dp = (i) => {
    if (i >= n) return 0
    if (memo[i]) return memo[i]

    return (memo[i] = cost[i] + Math.min(dp(i + 1), dp(i + 2)))
  }

  return Math.min(dp(0), dp(1))
}

/**
 * @param {number[]} cost
 * @return {number}
 */
const minCostClimbingStairs_dp_bottom_up = (cost) => {
  const n = cost.length
  const dp = new Array(n + 2).fill(0)

  for (let i = n - 1; i >= 0; i--) {
    dp[i] = cost[i] + Math.min(dp[i + 1], dp[i + 2])
  }

  return Math.min(dp[0], dp[1])
}

/**
 * @param {number[]} cost
 * @return {number}
 */
const minCostClimbingStairs_dp_bottom_up_constant_space = (cost) => {
  const n = cost.length
  let oneStep = 0
  let twoSteps = 0

  for (let i = n - 1; i >= 0; i--) {
    const curr = cost[i] + Math.min(oneStep, twoSteps)
    twoSteps = oneStep
    oneStep = curr
  }

  return Math.min(oneStep, twoSteps)
}

/**
 * @param {number[]} cost
 * @return {number}
 */
const minCostClimbingStairs_no_extra_space = (cost) => {
  const n = cost.length
  for (let i = n - 3; i >= 0; i--) {
    cost[i] += Math.min(cost[i + 1], cost[i + 2])
  }
  return Math.min(cost[0], cost[1])
}

// prettier-ignore
const funcs = [
  // minCostClimbingStairs_dp_top_down,
  // minCostClimbingStairs_dp_bottom_up,
  // minCostClimbingStairs_dp_bottom_up_constant_space,
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
