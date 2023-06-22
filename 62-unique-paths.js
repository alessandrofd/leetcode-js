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
const uniquePaths = (m, n) => {
  const dp = new Array(m).fill(null).map((_) => new Array(n).fill(1))

  for (let row = 1; row < m; row++)
    for (let col = 1; col < n; col++)
      dp[row][col] = dp[row - 1][col] + dp[row][col - 1]

  return dp[m - 1][n - 1]
}

m = 3
n = 7
// Output: 28

// m = 3
// n = 2
// Output: 3

console.log(uniquePaths(m, n))
