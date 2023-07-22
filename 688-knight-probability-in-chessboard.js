/**
 * On an n x n chessboard, a knight starts at the cell (row, column) and
 * attempts to make exactly k moves. The rows and columns are 0-indexed, so the
 * top-left cell is (0, 0), and the bottom-right cell is (n - 1, n - 1).
 *
 * A chess knight has eight possible moves it can make, as illustrated below.
 * Each move is two cells in a cardinal direction, then one cell in an
 * orthogonal direction.
 *
 * Each time the knight is to move, it chooses one of eight possible moves
 * uniformly at random (even if the piece would go off the chessboard) and moves
 * there.
 *
 * The knight continues moving until it has made exactly k moves or has moved
 * off the chessboard.
 *
 * Return the probability that the knight remains on the board after it has
 * stopped moving.
 *
 * Constraints:
 *    1 <= n <= 25
 *    0 <= k <= 100
 *    0 <= row, column <= n - 1
 */

// BFS - TLE

/**
 * @param {number} n
 * @param {number} k
 * @param {number} row
 * @param {number} column
 * @return {number}
 */
const knightProbability_bfs = (n, k, initialRow, initialCol) => {
  if (k === 0) return 1

  // prettier-ignore
  const moves = [
    [-2, -1], [-2, 1],
    [-1, 2],  [1, 2],
    [2, -1],  [2, 1],
    [-1, -2], [1, -2],
  ]

  let count
  let turns = 0
  queue = [[initialRow, initialCol]]
  while (queue.length > 0 && turns < k) {
    count = 0
    const queueLength = queue.length
    for (let i = 0; i < queueLength; i++) {
      const [row, col] = queue.shift()
      for (const [moveRow, moveCol] of moves) {
        const [nextRow, nextCol] = [row + moveRow, col + moveCol]
        if (nextRow >= 0 && nextRow < n && nextCol >= 0 && nextCol < n) {
          count += 1
          queue.push([nextRow, nextCol])
        }
      }
    }
    turns += 1
  }

  return count / Math.pow(8, k)
}

// DP Bottom Up

/**
 * @param {number} n
 * @param {number} k
 * @param {number} row
 * @param {number} column
 * @return {number}
 */
const knightProbability_bottomUp_DP = (n, k, initialRow, initialCol) => {
  if (k === 0) return 1

  // prettier-ignore
  const moves = [
    [-2, -1], [-2, 1],
    [-1, 2],  [1, 2],
    [2, -1],  [2, 1],
    [-1, -2], [1, -2],
  ]

  const dp = new Array(k + 1)
    .fill()
    .map((_) => new Array(n).fill().map((_) => new Array(n).fill(0)))

  dp[0][initialRow][initialCol] = 1

  for (let turn = 1; turn <= k; turn++) {
    for (let row = 0; row < n; row++) {
      for (let col = 0; col < n; col++) {
        for (const [moveRow, moveCol] of moves) {
          const [prevRow, prevCol] = [row - moveRow, col - moveCol]
          if (prevRow >= 0 && prevRow < n && prevCol >= 0 && prevCol < n) {
            dp[turn][row][col] += dp[turn - 1][prevRow][prevCol]
          }
        }
        dp[turn][row][col] /= 8
      }
    }
  }

  return dp[k].reduce((acc, col) => acc + col.reduce((acc, p) => acc + p, 0), 0)
}

// DP Bottom Up Space Optimized

/**
 * @param {number} n
 * @param {number} k
 * @param {number} row
 * @param {number} column
 * @return {number}
 */
const knightProbability_bottomUp_DP_optimized = (
  n,
  k,
  initialRow,
  initialCol
) => {
  if (k === 0) return 1

  // prettier-ignore
  const moves = [
    [-2, -1], [-2, 1],
    [-1, 2],  [1, 2],
    [2, -1],  [2, 1],
    [-1, -2], [1, -2],
  ]

  let prevDP = new Array(n).fill().map((_) => new Array(n).fill(0))
  prevDP[initialRow][initialCol] = 1

  for (let turn = 1; turn <= k; turn++) {
    const currDP = new Array(n).fill().map((_) => new Array(n).fill(0))
    for (let row = 0; row < n; row++) {
      for (let col = 0; col < n; col++) {
        for (const [moveRow, moveCol] of moves) {
          const [prevRow, prevCol] = [row - moveRow, col - moveCol]
          if (prevRow >= 0 && prevRow < n && prevCol >= 0 && prevCol < n) {
            currDP[row][col] += prevDP[prevRow][prevCol]
          }
        }
        currDP[row][col] /= 8
      }
    }
    prevDP = currDP
  }

  return prevDP.reduce(
    (acc, col) => acc + col.reduce((acc, p) => acc + p, 0),
    0
  )
}

// DP Top Down

/**
 * @param {number} n
 * @param {number} k
 * @param {number} row
 * @param {number} column
 * @return {number}
 */
const knightProbability_topDown_DP = (n, k, initialRow, initialCol) => {
  if (k === 0) return 1

  const dp = new Array(k + 1)
    .fill()
    .map((_) => new Array(n).fill().map((_) => new Array(n)))

  dp[0] = new Array(n).fill().map((_) => new Array(n).fill(0))
  dp[0][initialRow][initialCol] = 1

  const calculateProbability = (turn, row, col) => {
    if (dp[turn][row][col] != undefined) return dp[turn][row][col]

    // prettier-ignore
    const moves = [
      [-2, -1], [-2, 1],
      [-1, 2],  [1, 2],
      [2, -1],  [2, 1],
      [-1, -2], [1, -2],
    ]

    let prob = 0
    for (const [moveRow, moveCol] of moves) {
      const [prevRow, prevCol] = [row - moveRow, col - moveCol]
      if (prevRow >= 0 && prevRow < n && prevCol >= 0 && prevCol < n) {
        prob += calculateProbability(turn - 1, prevRow, prevCol)
      }
    }
    prob /= 8

    return (dp[turn][row][col] = prob)
  }

  result = 0
  for (let row = 0; row < n; row++) {
    for (let col = 0; col < n; col++) {
      result += calculateProbability(k, row, col)
    }
  }
  return result
}

n = 3
k = 2
row = 0
column = 0
// Expected: 0.06250

// n = 1
// k = 0
// row = 0
// column = 0
// Expected: 1.00000

console.log(knightProbability_bfs(n, k, row, column))
console.log(knightProbability_bottomUp_DP(n, k, row, column))
console.log(knightProbability_bottomUp_DP_optimized(n, k, row, column))
console.log(knightProbability_topDown_DP(n, k, row, column))
