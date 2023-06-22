/**
 * Given an m x n matrix, return true if the matrix is Toeplitz. Otherwise,
 * return false.
 *
 * A matrix is Toeplitz if every diagonal from top-left to bottom-right has the
 * same elements.
 *
 * Constraints:
 *    m == matrix.length
 *    n == matrix[i].length
 *    1 <= m, n <= 20
 *    0 <= matrix[i][j] <= 99
 */

/**
 * @param {number[][]} matrix
 * @return {boolean}
 */
const isToeplitzMatrix_0 = (matrix) => {
  for (let row = 0; row < matrix.length - 1; row++)
    for (let col = 0; col < matrix[0].length - 1; col++)
      if (matrix[row][col] !== matrix[row + 1][col + 1]) return false
  return true
}

// Approach #1: Group by Category [Accepted]
const isToeplitzMatrix = (matrix) => {
  const map = new Map()
  for (let row = 0; row < matrix.length; row++)
    for (let col = 0; col < matrix[0].length; col++)
      if (!map.has(row - col)) map.set(row - col, matrix[row][col])
      else if (map.get(row - col) !== matrix[row][col]) return false
  return true
}

matrix = [
  [1, 2, 3, 4],
  [5, 1, 2, 3],
  [9, 5, 1, 2],
]
// Output: true

matrix = [
  [1, 2],
  [2, 2],
]
// Output: false

console.log(isToeplitzMatrix(matrix))
