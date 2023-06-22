/**
 * Given an n x n array of integers matrix, return the minimum sum of any
 * falling path through matrix.
 *
 * A falling path starts at any element in the first row and chooses the element
 * in the next row that is either directly below or diagonally left/right.
 * Specifically, the next element from position (row, col) will be
 * (row + 1, col - 1), (row + 1, col), or (row + 1, col + 1).
 *
 * Constraints:
 *    n == matrix.length == matrix[i].length
 *    1 <= n <= 100
 *    -100 <= matrix[i][j] <= 100
 */

/**
 * @param {number[][]} matrix
 * @return {number}
 */
const minFallingPathSum_recursionMemo = (matrix) => {
  const rows = matrix.length
  const cols = matrix[0].length
  const memo = new Array(rows).fill().map((_) => new Array(cols))

  const fall = (row, col) => {
    if (row === rows) return 0
    if (memo[row][col]) return memo[row][col]

    const left = col === 0 ? Infinity : fall(row + 1, col - 1)
    const down = fall(row + 1, col)
    const right = col === cols - 1 ? Infinity : fall(row + 1, col + 1)

    return (memo[row][col] = matrix[row][col] + Math.min(left, down, right))
  }

  let min = Infinity
  for (let col = 0; col < cols; col++) min = Math.min(min, fall(0, col))
  return min
}

const minFallingPathSum_dp = (matrix) => {
  const rows = matrix.length
  const cols = matrix[0].length
  const dp = new Array(rows).fill().map((_) => new Array(cols))

  for (let row = 0; row < rows; row++)
    for (let col = 0; col < cols; col++) {
      if (row === 0) dp[row][col] = matrix[row][col]
      else {
        const left = col === 0 ? Infinity : dp[row - 1][col - 1]
        const up = dp[row - 1][col]
        const right = col === cols - 1 ? Infinity : dp[row - 1][col + 1]
        dp[row][col] = matrix[row][col] + Math.min(left, up, right)
      }
    }
  return Math.min(...dp[rows - 1])
}

const minFallingPathSum_dpSpaceOptimized = (matrix) => {
  const n = matrix.length
  let dp = new Array(n).fill(0)

  for (let row = n - 1; row >= 0; row--) {
    let temp = new Array(n)
    for (let col = 0; col < n; col++) {
      const left = col === 0 ? Infinity : dp[col - 1]
      const down = dp[col]
      const right = col === n - 1 ? Infinity : dp[col + 1]
      temp[col] = matrix[row][col] + Math.min(left, down, right)
    }
    dp = temp
  }

  return Math.min(...dp)
}

const minFallingPathSum = (matrix) => {
  // const minFallingPathSum_matrixAsMemo = (matrix) => {
  const n = matrix.length

  for (let row = 1; row < n; row++)
    for (let col = 0; col < n; col++)
      matrix[row][col] += Math.min(
        col === 0 ? Infinity : matrix[row - 1][col - 1],
        matrix[row - 1][col],
        col === n - 1 ? Infinity : matrix[row - 1][col + 1]
      )

  return Math.min(...matrix[n - 1])
}

matrix = [
  [2, 1, 3],
  [6, 5, 4],
  [7, 8, 9],
]
// Output: 13
// Explanation: There are two falling paths with a minimum sum as shown.

matrix = [
  [-19, 57],
  [-40, -5],
]
// Output: -59
// Explanation: The falling path with a minimum sum is shown.

console.log(minFallingPathSum(matrix))
