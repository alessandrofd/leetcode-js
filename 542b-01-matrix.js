/**
 * Given an m x n binary matrix mat, return the distance of the nearest 0 for
 * each cell.
 *
 * The distance between two adjacent cells is 1.
 *
 * Constraints:
 *    m == mat.length
 *    n == mat[i].length
 *    1 <= m, n <= 10^4
 *    1 <= m * n <= 10^4
 *    mat[i][j] is either 0 or 1.
 *    There is at least one 0 in mat.
 */

/**
 * @param {number[][]} mat
 * @return {number[][]}
 */
const updateMatrix = (matrix) => {}

mat = [
  [0, 0, 0],
  [0, 1, 0],
  [0, 0, 0],
]
// Expected: [[0,0,0],[0,1,0],[0,0,0]]

mat = [
  [0, 0, 0],
  [0, 1, 0],
  [1, 1, 1],
]
// Expected: [[0,0,0],[0,1,0],[1,2,1]]

console.log(updateMatrix(mat))
