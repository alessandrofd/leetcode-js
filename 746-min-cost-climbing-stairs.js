/**
 * @param {number[]} cost
 * @return {number}
 */
// Recursion - Time Limit Exceeded
const minCostClimbingStairs_recursion = (cost) => {
  const climb = (stair) => {
    if (stair < 0) return 0
    return (cost[stair] ?? 0) + Math.min(climb(stair - 1), climb(stair - 2))
  }

  return climb(cost.length)
}

// Recursion + memoization
const minCostClimbingStairs_recursion_memo = (cost) => {
  const memo = new Array(cost.length + 1)

  const climb = (stair) => {
    if (stair < 0) return 0
    if (memo[stair]) return memo[stair]
    return (memo[stair] =
      (cost[stair] ?? 0) + Math.min(climb(stair - 1), climb(stair - 2)))
  }

  return climb(cost.length)
}

// Approach 1: Bottom-Up Dynamic Programming (Tabulation)
const minCostClimbingStairs_1 = (cost) => {
  const minCost = new Array(cost.length + 1).fill(0)

  for (let i = 2; i < minCost.length; i++) {
    const takeOneStep = minCost[i - 1] + cost[i - 1]
    const takeTwoSteps = minCost[i - 2] + cost[i - 2]
    minCost[i] = Math.min(takeOneStep, takeTwoSteps)
  }

  return minCost[minCost.length - 1]
}

// Approach 2: Top-Down Dynamic Programming (Recursion + Memoization)
const minCostClimbingStairs_2 = (cost) => {
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

// Approach 3: Bottom-Up, Constant Space
const minCostClimbingStairs_3 = (cost) => {
  let downOne = 0
  let downTwo = 0

  for (let i = 2; i < cost.length + 1; i++) {
    temp = downOne
    downOne = Math.min(downOne + cost[i - 1], downTwo + cost[i - 2])
    downTwo = temp
  }

  return downOne
}

// Discussion board -  sgallivan
const minCostClimbingStairs = (cost) => {
  for (let i = cost.length - 3; ~i; i--)
    cost[i] += Math.min(cost[i + 1], cost[i + 2])
  return Math.min(cost[0], cost[1])
}

cost = [10, 15, 20]
// Output: 15

cost = [1, 100, 1, 1, 1, 100, 1, 1, 100, 1]
// Output: 6

console.log(minCostClimbingStairs(cost))
