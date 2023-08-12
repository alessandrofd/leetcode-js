/**
 * You are given an m x n integer array grid. There is a robot initially located
 * at the top-left corner (i.e., grid[0][0]). The robot tries to move to the
 * bottom-right corner (i.e., grid[m - 1][n - 1]). The robot can only move
 * either down or right at any point in time.
 *
 * An obstacle and space are marked as 1 or 0 respectively in grid. A path that
 * the robot takes cannot include any square that is an obstacle.
 *
 * Return the number of possible unique paths that the robot can take to reach
 * the bottom-right corner.
 *
 * The testcases are generated so that the answer will be less than or equal to
 * 2 * 10^9.
 *
 * Constraints:
 *    m == obstacleGrid.length
 *    n == obstacleGrid[i].length
 *    1 <= m, n <= 100
 *    obstacleGrid[i][j] is 0 or 1.
 */

/**
 * @param {number[][]} grid
 * @return {number}
 */
const uniquePathsWithObstacles = (grid) => {
  const rows = grid.length
  const cols = grid[0].length

  if (grid[0][0] === 1 || grid[rows - 1][cols - 1] === 1) return 0

  grid[0][0] = 1
  for (let col = 1; col < cols; col++)
    grid[0][col] = grid[0][col - 1] === 1 && grid[0][col] === 0 ? 1 : 0
  for (let row = 1; row < rows; row++)
    grid[row][0] = grid[row - 1][0] === 1 && grid[row][0] === 0 ? 1 : 0

  for (let row = 1; row < rows; row++) {
    for (let col = 1; col < cols; col++) {
      grid[row][col] =
        grid[row][col] === 0 ? grid[row - 1][col] + grid[row][col - 1] : 0
    }
  }

  return grid[rows - 1][cols - 1]
}

obstacleGrid = [
  [0, 0, 0],
  [0, 1, 0],
  [0, 0, 0],
]
// Expected: 2

// obstacleGrid = [
//   [0, 1],
//   [0, 0],
// ]
// Expected: 1

console.log(uniquePathsWithObstacles(obstacleGrid))
