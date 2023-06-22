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
const spiralOrder_loop = (matrix) => {}

// Consome a matriz

/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
const spiralOrder_shift_reverse = (matrix) => {}

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
