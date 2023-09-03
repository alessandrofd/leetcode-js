/**
 * There is a robot on an m x n grid. The robot is initially located at the
 * top-left corner (i.e., grid[0][0]). The robot tries to move to the
 * bottom-right corner (i.e., grid[m - 1][n - 1]). The robot can only move
 * either down or right at any point in time.
 *
 * Given the two integers m and n, return the number of possible unique paths
 * that the robot can take to reach the bottom-right corner.
 *
 * The test cases are generated so that the answer will be less than or equal to
 * 10^9.
 */

/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */

// Approach 1: Dynamic Programming
const uniquePaths = (rows, cols) => {
  const dp = new Array(rows).fill().map((_) => new Array(cols).fill(1))

  for (let row = 1; row < rows; row++) {
    for (let col = 1; col < cols; col++) {
      dp[row][col] = dp[row - 1][col] + dp[row][col - 1]
    }
  }

  return dp[rows - 1][cols - 1]
}

const funcs = [uniquePaths]

const data = [
  [3, 7, 28],
  [3, 2, 3],
]

for (const func of funcs) {
  for (const [m, n, expected] of data) {
    console.log(uniquePaths(m, n) === expected)
  }
}
