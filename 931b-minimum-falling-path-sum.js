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
  const rows = matrix.length
  const cols = matrix[0].length

  const memo = new Array(rows).fill().map((_) => new Array(cols))

  const fall = (row, col) => {
    if (row >= rows) return 0
    if (col < 0 || col >= cols) return Infinity
    if (memo[row][col] !== undefined) return memo[row][col]

    memo[row][col] =
      matrix[row][col] +
      Math.min(
        fall(row + 1, col - 1),
        fall(row + 1, col),
        fall(row + 1, col + 1)
      )
    return memo[row][col]
  }

  for (let col = 0; col < cols; col++) fall(0, col)
  return Math.min(...memo[0])
}

// Approach 3: Bottom-Up Dynamic Programming (Tabulation)
const minFallingPathSum_DP_bottomUp = (matrix) => {
  // const minFallingPathSum = (matrix) => {
  const rows = matrix.length
  const cols = matrix[0].length

  const memo = new Array(rows).fill().map((_) => new Array(cols))

  for (let row = rows - 1; row >= 0; row--)
    for (let col = 0; col < cols; col++) {
      memo[row][col] = matrix[row][col]
      if (row < rows - 1) {
        const left = col === 0 ? Infinity : memo[row + 1][col - 1]
        const down = memo[row + 1][col]
        const right = col === cols - 1 ? Infinity : memo[row + 1][col + 1]
        memo[row][col] += Math.min(left, down, right)
      }
    }

  return Math.min(...memo[0])
}

// Approach 4: Space Optimized, Bottom-Up Dynamic Programming
const minFallingPathSum_dpSpaceOptimized = (matrix) => {
  // const minFallingPathSum = (matrix) => {
  const rows = matrix.length
  const cols = matrix[0].length

  let memo = [...matrix[rows - 1]]

  for (let row = rows - 2; row >= 0; row--) {
    const newMemo = []
    for (let col = 0; col < cols; col++) {
      const left = col === 0 ? Infinity : memo[col - 1]
      const down = memo[col]
      const right = col === cols - 1 ? Infinity : memo[col + 1]
      newMemo[col] = matrix[row][col] + Math.min(left, down, right)
    }
    memo = newMemo
  }

  return Math.min(...memo)
}

// Top Submission: Space Optimized (use matrix passed as parameter), Bottom-Up Dynamic Programming
// const minFallingPathSum_matrixAsMemo = (matrix) => {
const minFallingPathSum = (matrix) => {
  const rows = matrix.length
  const cols = matrix[0].length

  for (let row = rows - 2; row >= 0; row--) {
    for (let col = 0; col < cols; col++) {
      const left = col === 0 ? Infinity : matrix[row + 1][col - 1]
      const down = matrix[row + 1][col]
      const right = col === cols - 1 ? Infinity : matrix[row + 1][col + 1]
      matrix[row][col] += Math.min(left, down, right)
    }
  }
  return Math.min(...matrix[0])
}

matrix = [
  [2, 1, 3],
  [6, 5, 4],
  [7, 8, 9],
]
// Output: 13

// matrix = [
//   [-19, 57],
//   [-40, -5],
// ]
// Output: -59

// matrix = [
//   [100, -42, -46, -41],
//   [31, 97, 10, -10],
//   [-58, -51, 82, 89],
//   [51, 81, 69, -51],
// ]
// Output: -36

console.log(minFallingPathSum(matrix))
