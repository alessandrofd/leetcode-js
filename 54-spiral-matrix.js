/**
 * Given an m x n matrix, return all elements of the matrix in spiral order.
 *
 * Constraints:
 *    m == matrix.length
 *    n == matrix[i].length
 *    1 <= m, n <= 10
 *    -100 <= matrix[i][j] <= 100
 */

// Principal dificuldade é estabelecer a condição de saída do laço.

/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
const spiralOrder_loop = (matrix) => {
  let top = 0
  let bottom = matrix.length - 1
  let left = 0
  let right = matrix[0].length - 1

  const result = []

  while (true) {
    for (let col = left; col <= right; col++) result.push(matrix[top][col])
    if (++top > bottom) break

    for (let row = top; row <= bottom; row++) result.push(matrix[row][right])
    if (--right < left) break

    for (let col = right; col >= left; col--) result.push(matrix[bottom][col])
    if (--bottom < top) break

    for (let row = bottom; row >= top; row--) result.push(matrix[row][left])
    if (++left > right) break
  }

  return result
}

// Consome a matriz

/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
const spiralOrder_shift_reverse = (matrix) => {
  const result = []

  while (matrix.length) {
    result.push(...matrix.shift())
    for (const row of matrix) {
      const end = row.pop()
      if (end) result.push(end)
      row.reverse()
    }
    matrix.reverse()
  }

  return result
}

matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
]
// Expected: [1,2,3,6,9,8,7,4,5]

// matrix = [
//   [1, 2, 3, 4],
//   [5, 6, 7, 8],
//   [9, 10, 11, 12],
// ]
// Expected: [1,2,3,4,8,12,11,10,9,5,6,7]

// matrix = [
//   [2, 5, 8],
//   [4, 0, -1],
// ]
// Expected: [2,5,8,-1,0,4]

matrix = [[7], [9], [6]]
// Expected: [7,9,6]

console.log(spiralOrder_loop(matrix))
console.log(spiralOrder_shift_reverse(matrix))
