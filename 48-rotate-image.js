/**
 * You are given an n x n 2D matrix representing an image, rotate the image by
 * 90 degrees (clockwise).
 *
 * You have to rotate the image in-place, which means you have to modify the
 * input 2D matrix directly. DO NOT allocate another 2D matrix and do the
 * rotation.
 *
 * Constraints:
 *    n == matrix.length == matrix[i].length
 *    1 <= n <= 20
 *    -1000 <= matrix[i][j] <= 1000
 */

/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
// Approach 1: Rotate Groups of Four Cells
const rotate_1 = (matrix) => {
  const n = matrix.length
  for (let i = 0; i < (((n + 1) / 2) | 0); i++)
    for (let j = 0; j < ((n / 2) | 0); j++) {
      const temp = matrix[n - 1 - j][i]
      matrix[n - 1 - j][i] = matrix[n - 1 - i][n - 1 - j]
      matrix[n - 1 - i][n - 1 - j] = matrix[j][n - 1 - i]
      matrix[j][n - 1 - i] = matrix[i][j]
      matrix[i][j] = temp
    }
}

// Approach 2: Reverse on Diagonal and then Reverse Left to Right
const rotate = (matrix) => {
  const transpose = (matrix) => {
    const n = matrix.length
    for (let i = 0; i < n; i++)
      for (let j = i + 1; j < n; j++)
        [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]]
  }

  const reflect = (matrix) => {
    const n = matrix.length
    for (let i = 0; i < n; i++)
      for (let j = 0; j < ((n / 2) | 0); j++)
        [matrix[i][j], matrix[i][n - 1 - j]] = [
          matrix[i][n - 1 - j],
          matrix[i][j],
        ]
  }

  transpose(matrix)
  reflect(matrix)
}

matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
]
// Output: [
//   [7, 4, 1],
//   [8, 5, 2],
//   [9, 6, 3],
// ]

matrix = [
  [5, 1, 9, 11],
  [2, 4, 8, 10],
  [13, 3, 6, 7],
  [15, 14, 12, 16],
]
// Output: [
//   [15, 13, 2, 5],
//   [14, 3, 4, 1],
//   [12, 6, 8, 9],
//   [16, 7, 10, 11],
// ]

rotate(matrix)
console.log(matrix)

n = 5
x = (n / 2) | 0
x
