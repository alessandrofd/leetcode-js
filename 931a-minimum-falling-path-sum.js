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
// Approach 2: Top Down Dynamic Programming
const minFallingPathSum_recursionMemo = (matrix) => {
  // const minFallingPathSum = (matrix) => {
  const m = matrix.length
  const n = matrix[0].length
  const memo = new Array(m).fill().map((_) => new Array(n))

  const fall = (row, col) => {
    if (row >= m) return 0
    if (col < 0 || col >= n) return Infinity
    return (
      memo[row][col] ||
      (memo[row][col] =
        matrix[row][col] +
        Math.min(
          fall(row + 1, col - 1),
          fall(row + 1, col),
          fall(row + 1, col + 1)
        ))
    )
  }

  for (let col = 0; col < m; col++) fall(0, col)
  return Math.min(...memo[0])
}

// Approach 3: Bottom-Up Dynamic Programming (Tabulation)
const minFallingPathSum_dp = (matrix) => {
  // const minFallingPathSum = (matrix) => {
  const rows = matrix.length
  const cols = matrix[0].length
  const memo = new Array(rows).fill().map((_) => new Array(cols))
  memo[0] = [...matrix[0]]

  for (let row = 1; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const left = col === 0 ? Infinity : memo[row - 1][col - 1]
      const up = memo[row - 1][col]
      const right = col === cols - 1 ? Infinity : memo[row - 1][col + 1]
      memo[row][col] = matrix[row][col] + Math.min(left, up, right)
    }
  }
  return Math.min(...memo[rows - 1])
}

// Approach 4: Space Optimized, Bottom-Up Dynamic Programming
const minFallingPathSum_dpSpaceOptimized = (matrix) => {
  // const minFallingPathSum = (matrix) => {
  const rows = matrix.length
  const cols = matrix[0].length

  let memo = [...matrix[0]]
  for (let row = 1; row < rows; row++) {
    const tmp = new Array(cols)
    for (let col = 0; col < cols; col++) {
      const left = col === 0 ? Infinity : memo[col - 1]
      const right = col === cols - 1 ? Infinity : memo[col + 1]
      tmp[col] = matrix[row][col] + Math.min(left, memo[col], right)
    }
    memo = tmp
  }

  return Math.min(...memo)
}

// Top Submission: Space Optimized (use matrix passed as parameter), Bottom-Up Dynamic Programming
// const minFallingPathSum_matrixAsMemo = (matrix) => {
const minFallingPathSum = (matrix) => {
  const len = matrix.length

  for (let row = 1; row < len; row++) {
    for (let col = 0; col < len; col++) {
      matrix[row][col] += Math.min(
        col === 0 ? Infinity : matrix[row - 1][col - 1],
        matrix[row - 1][col],
        col === len - 1 ? Infinity : matrix[row - 1][col + 1]
      )
    }
  }
  return Math.min(...matrix[len - 1])
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
