/**
 * You are given an m x n integer array grid where grid[i][j] could be:
 *
 *    1 representing the starting square. There is exactly one starting square.
 *
 *    2 representing the ending square. There is exactly one ending square.
 *
 *    0 representing empty squares we can walk over.
 *
 *    -1 representing obstacles that we cannot walk over.
 *
 * Return the number of 4-directional walks from the starting square to the
 * ending square, that walk over every non-obstacle square exactly once.
 *
 * Constraints:
 *    m == grid.length
 *    n == grid[i].length
 *    1 <= m, n <= 20
 *    1 <= m * n <= 20
 *    -1 <= grid[i][j] <= 2
 */

/**
 * @param {number[][]} grid
 * @return {number}
 */
// Solução própria: Backtracking
const uniquePathsIII = (grid) => {
  const rows = grid.length
  const cols = grid[0].length

  const dirs = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ]

  let start
  let freeSquares = 0
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (grid[row][col] === 1) {
        start = [row, col]
        grid[row][col] = -1
      } else if (grid[row][col] === 0) freeSquares++
    }
  }

  let walks = 0

  const backtrack = ([row, col]) => {
    if (grid[row][col] === 2) {
      walks++
      return
    }
    for (const [dRow, dCol] of dirs) {
      const newRow = row + dRow
      const newCol = col + dCol
      if (
        newRow >= 0 &&
        newRow < rows &&
        newCol >= 0 &&
        newCol < cols &&
        grid[newRow][newCol] !== -1
      ) {
        if (grid[newRow][newCol] === 2) {
          if (freeSquares === 0) walks++
        } else {
          grid[newRow][newCol] = -1
          freeSquares--
          backtrack([newRow, newCol])
          grid[newRow][newCol] = 0
          freeSquares++
        }
      }
    }
  }

  backtrack(start)
  return walks
}

grid = [
  [1, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 2, -1],
]
// Output: 2

// grid = [
//   [1, 0, 0, 0],
//   [0, 0, 0, 0],
//   [0, 0, 0, 2],
// ]
// Output: 4

// grid = [
//   [0, 1],
//   [2, 0],
// ]
// Output: 0

console.log(uniquePathsIII(grid))
