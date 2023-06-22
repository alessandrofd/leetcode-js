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
