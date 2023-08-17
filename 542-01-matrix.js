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
const updateMatrix = (matrix) => {
  const rows = matrix.length
  const cols = matrix[0].length

  const result = new Array(rows).fill().map((_) => new Array(cols).fill(-1))

  const valid = (row, col) => {
    if (
      row >= 0 &&
      row < rows &&
      col >= 0 &&
      col < cols &&
      result[row][col] === -1
    )
      return true
    return false
  }

  const deltas = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ]

  const queue = []
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (matrix[row][col] === 0) {
        result[row][col] = 0
        queue.push([row, col])
      }
    }
  }

  while (queue.length) {
    const n = queue.length
    for (let i = 0; i < n; i++) {
      const [row, col] = queue.shift()
      for (const [deltaRow, deltaCol] of deltas) {
        const [nextRow, nextCol] = [row + deltaRow, col + deltaCol]
        if (valid(nextRow, nextCol)) {
          result[nextRow][nextCol] = result[row][col] + 1
          queue.push([nextRow, nextCol])
        }
      }
    }
  }

  return result
}

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
