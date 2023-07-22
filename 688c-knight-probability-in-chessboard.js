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
const knightProbability_bfs = (n, k, initialRow, initialCol) => {}

// DP Bottom Up

/**
 * @param {number} n
 * @param {number} k
 * @param {number} row
 * @param {number} column
 * @return {number}
 */
const knightProbability_bottomUp_DP = (n, k, initialRow, initialCol) => {}

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
) => {}

// DP Top Down

/**
 * @param {number} n
 * @param {number} k
 * @param {number} row
 * @param {number} column
 * @return {number}
 */
const knightProbability_topDown_DP = (n, k, initialRow, initialCol) => {}

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
