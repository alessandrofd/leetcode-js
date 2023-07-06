/**
 * Given an n x n binary matrix grid, return the length of the shortest clear
 * path in the matrix. If there is no clear path, return -1.
 *
 * A clear path in a binary matrix is a path from the top-left cell
 * (i.e., (0, 0)) to the bottom-right cell (i.e., (n - 1, n - 1)) such that:
 *
 *    All the visited cells of the path are 0.
 *
 *    All the adjacent cells of the path are 8-directionally connected
 *    (i.e., they are different and they share an edge or a corner).
 *
 * The length of a clear path is the number of visited cells of this path.
 *
 * Constraints:
 *    n == grid.length
 *    n == grid[i].length
 *    1 <= n <= 100
 *    grid[i][j] is 0 or 1
 */

/**
 * @param {number[][]} grid
 * @return {number}
 */
const shortestPathBinaryMatrix = (grid) => {
  const n = grid.length
  // prettier-ignore
  const moves = [[-1,-1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1] ]

  if (grid[0][0] || grid[n - 1][n - 1]) return -1

  const queue = [[0, 0, 1]]

  while (queue.length) {
    const [row, col, distance] = queue.shift()
    if (row === n - 1 && col === n - 1) return distance

    if (row < 0 || row >= n || col < 0 || col >= n || grid[row][col] === 1)
      continue

    grid[row][col] = 1
    for (const [moveRow, moveCol] of moves)
      queue.push([row + moveRow, col + moveCol, distance + 1])
  }

  return -1
}

// prettier-ignore
grid = [ [0, 1], [1, 0], ]
// Expected: 2

// prettier-ignore
// grid = [ [0, 0, 0], [1, 1, 0], [1, 1, 0] ]
// Expected: 4

// prettier-ignore
// grid = [ [1, 0, 0], [1, 1, 0], [1, 1, 0], ]
// Expected: -1

console.log(shortestPathBinaryMatrix(grid))
