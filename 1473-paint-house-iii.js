/**
 * @param {number[]} houses
 * @param {number[][]} cost
 * @param {number} m
 * @param {number} n
 * @param {number} target
 * @return {number}
 */

// Approach 1: Top-Down Dynamic Programming
const minCost_1 = (houses, cost, housesQtty, colorsQtty, nbhdTarget) => {
  const memo = new Array(100)
    .fill()
    .map((_) => new Array(100).fill().map((_) => new Array(21)))

  const findMinCost = (index, nbhdCount, prevColor) => {
    if (index === housesQtty) return nbhdCount === nbhdTarget ? 0 : Infinity
    if (nbhdCount > nbhdTarget) return Infinity
    if (memo[index][nbhdCount][prevColor])
      return memo[index][nbhdCount][prevColor]

    let minCost = Infinity
    let color = houses[index]
    // If the house is already painted, no need to repaint it, update nbhdCount
    if (color !== 0) {
      const updatedNbhdCount = nbhdCount + (color !== prevColor ? 1 : 0)
      minCost = findMinCost(index + 1, updatedNbhdCount, color)
    }
    // If the house is not painted, try every possible color and store the minimum cost
    else {
      for (color = 1; color <= colorsQtty; color++) {
        const updatedNbhdCount = nbhdCount + (color !== prevColor ? 1 : 0)
        const currCost =
          cost[index][color - 1] +
          findMinCost(index + 1, updatedNbhdCount, color)
        minCost = Math.min(minCost, currCost)
      }
    }
    // Return the minimum cost while storing it for future reference (memoization)
    return (memo[index][nbhdCount][prevColor] = minCost)
  }
  const minCost = findMinCost(0, 0, 0)
  return minCost === Infinity ? -1 : minCost
}

// Approach 2: Bottom-Up Dynamic Programming
const minCost_2 = (houses, costs, housesQtty, colorsQtty, nbhdTarget) => {
  const memo = new Array(housesQtty)
    .fill()
    .map((_) =>
      new Array(nbhdTarget + 1)
        .fill()
        .map((_) => new Array(colorsQtty).fill(Infinity))
    )

  let color = houses[0]
  if (color) memo[0][1][color - 1] = 0
  else
    for (color = 1; color <= colorsQtty; color++)
      memo[0][1][color - 1] = costs[0][color - 1]

  for (let house = 1; house < housesQtty; house++) {
    for (let nbhd = 1; nbhd <= Math.min(nbhdTarget, house + 1); nbhd++) {
      for (let color = 1; color <= colorsQtty; color++) {
        if (houses[house] !== 0 && color !== houses[house]) continue

        let cost = Infinity
        // Iterate over all the possible colors for previous house
        for (let prevColor = 1; prevColor <= colorsQtty; prevColor++)
          // Decrement the neighborhood as adjacent house has different color
          if (prevColor != color)
            cost = Math.min(cost, memo[house - 1][nbhd - 1][prevColor - 1])
          // Previous house has the same color, no change in neighborhood count
          else cost = Math.min(cost, memo[house - 1][nbhd][color - 1])

        // If the house is already painted, cost to paint is 0
        cost += houses[house] ? 0 : costs[house][color - 1]
        memo[house][nbhd][color - 1] = cost
      }
    }
  }
  let cost = Infinity
  for (let color = 0; color < colorsQtty; color++)
    cost = Math.min(cost, memo[housesQtty - 1][nbhdTarget][color])
  return cost === Infinity ? -1 : cost
}

// Approach 3: Bottom-Up Dynamic Programming (Space Optimized)
const minCost = (houses, costs, housesQtty, colorsQtty, nbhdTarget) => {
  let prevMemo = new Array(nbhdTarget + 1)
    .fill()
    .map((_) => new Array(colorsQtty).fill(Infinity))

  let color = houses[0]
  if (color) prevMemo[1][color - 1] = 0
  else
    for (color = 1; color <= colorsQtty; color++)
      prevMemo[1][color - 1] = costs[0][color - 1]

  for (let house = 1; house < housesQtty; house++) {
    const memo = new Array(nbhdTarget + 1)
      .fill()
      .map((_) => new Array(colorsQtty).fill(Infinity))

    for (let nbhd = 1; nbhd <= Math.min(nbhdTarget, house + 1); nbhd++) {
      for (let color = 1; color <= colorsQtty; color++) {
        if (houses[house] !== 0 && color !== houses[house]) continue

        let cost = Infinity
        // Iterate over all the possible colors for previous house
        for (let prevColor = 1; prevColor <= colorsQtty; prevColor++)
          // Decrement the neighborhood as adjacent house has different color
          if (prevColor != color)
            cost = Math.min(cost, prevMemo[nbhd - 1][prevColor - 1])
          // Previous house has the same color, no change in neighborhood count
          else cost = Math.min(cost, prevMemo[nbhd][color - 1])

        // If the house is already painted, cost to paint is 0
        cost += houses[house] ? 0 : costs[house][color - 1]
        memo[nbhd][color - 1] = cost
      }
    }
    prevMemo = memo
  }
  let cost = Infinity
  for (let color = 0; color < colorsQtty; color++)
    cost = Math.min(cost, prevMemo[nbhdTarget][color])
  return cost === Infinity ? -1 : cost
}

houses = [0, 0, 0, 0, 0]
cost = [
  [1, 10],
  [10, 1],
  [10, 1],
  [1, 10],
  [5, 1],
]
m = 5
n = 2
target = 3
// Output: 9

// houses = [0, 2, 1, 2, 0]
// cost = [
//   [1, 10],
//   [10, 1],
//   [10, 1],
//   [1, 10],
//   [5, 1],
// ]
// m = 5
// n = 2
// target = 3
// Output: 11

// houses = [3, 1, 2, 3]
// cost = [
//   [1, 1, 1],
//   [1, 1, 1],
//   [1, 1, 1],
//   [1, 1, 1],
// ]
// m = 4
// n = 3
// target = 3
// Output: -1

console.log(minCost(houses, cost, m, n, target))
