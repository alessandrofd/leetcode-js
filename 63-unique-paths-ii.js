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
 * @param {number[][]} obstacleGrid
 * @return {number}
 */
const uniquePathsWithObstacles = (obstacleGrid) => {
  if (obstacleGrid[0][0] === 1) return 0
  obstacleGrid[0][0] = 1

  const rowLength = obstacleGrid.length
  const colLength = obstacleGrid[0].length

  for (let row = 1; row < rowLength; row++)
    obstacleGrid[row][0] =
      obstacleGrid[row][0] === 0 && obstacleGrid[row - 1][0] === 1 ? 1 : 0

  for (let col = 1; col < colLength; col++)
    obstacleGrid[0][col] =
      obstacleGrid[0][col] === 0 && obstacleGrid[0][col - 1] === 1 ? 1 : 0

  for (let row = 1; row < rowLength; row++)
    for (let col = 1; col < colLength; col++)
      obstacleGrid[row][col] =
        obstacleGrid[row][col] === 0
          ? obstacleGrid[row - 1][col] + obstacleGrid[row][col - 1]
          : 0

  return obstacleGrid[rowLength - 1][colLength - 1]
}

obstacleGrid = [
  [0, 0, 0],
  [0, 1, 0],
  [0, 0, 0],
]

// obstacleGrid = [
//   [0, 1],
//   [0, 0],
// ]

console.log(uniquePathsWithObstacles(obstacleGrid))
