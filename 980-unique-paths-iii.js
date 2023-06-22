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
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ]

  let distance = 0
  let startRow, startCol
  for (let col = 0; col < cols; col++) {
    for (let row = 0; row < rows; row++) {
      if (grid[row][col] === 1) {
        ;[startRow, startCol] = [row, col]
        grid[startRow][startCol] = -1
      } else if (grid[row][col] == 0) {
        distance++
      }
    }
  }

  let paths = 0
  const backtrack = (row, col) => {
    for (const dir of dirs) {
      const [nextRow, nextCol] = [row + dir[0], col + dir[1]]
      if (
        nextRow >= 0 &&
        nextRow < rows &&
        nextCol >= 0 &&
        nextCol < cols &&
        grid[nextRow][nextCol] !== -1
      ) {
        if (grid[nextRow][nextCol] === 2) {
          if (distance === 0) paths++
        } else {
          grid[nextRow][nextCol] = -1
          distance--
          backtrack(nextRow, nextCol)
          distance++
          grid[nextRow][nextCol] = 0
        }
      }
    }
  }

  backtrack(startRow, startCol)
  return paths
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
Output: 0

console.log(uniquePathsIII(grid))
