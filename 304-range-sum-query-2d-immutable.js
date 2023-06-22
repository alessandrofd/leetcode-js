/**
 * Given a 2D matrix matrix, handle multiple queries of the following type:
 *
 *    Calculate the sum of the elements of matrix inside the rectangle defined
 * by its upper left corner (row1, col1) and lower right corner (row2, col2).
 *
 * Implement the NumMatrix class:
 *
 *    NumMatrix(int[][] matrix) Initializes the object with the integer matrix.
 *
 *    int sumRegion(int row1, int col1, int row2, int col2) Returns the sum of
 *    the elements of matrix inside the rectangle defined by its upper left
 *    corner (row1, col1) and lower right corner (row2, col2).
 *
 * You must design an algorithm where sumRegion works on O(1) time complexity.
 */

class NumMatrix {
  constructor(matrix) {
    const m = matrix.length
    const n = matrix[0].length
    const sum = new Array(m).fill(null).map(() => new Array(n).fill(0))

    for (let row = 0; row < m; row++)
      for (let col = 0; col < n; col++) {
        const top = row > 0 ? sum[row - 1][col] : 0
        const left = col > 0 ? sum[row][col - 1] : 0
        const topLeft = row > 0 && col > 0 ? sum[row - 1][col - 1] : 0
        sum[row][col] = matrix[row][col] + top + left - topLeft
      }
    this.sum = sum
  }

  sumRegion(row1, col1, row2, col2) {
    const { sum } = this
    return (
      sum[row2][col2] -
      (row1 > 0 ? sum[row1 - 1][col2] : 0) -
      (col1 > 0 ? sum[row2][col1 - 1] : 0) +
      (row1 > 0 && col1 > 0 ? sum[row1 - 1][col1 - 1] : 0)
    )
  }
}

const matrix = [
  [3, 0, 1, 4, 2],
  [5, 6, 3, 2, 1],
  [1, 2, 0, 1, 5],
  [4, 1, 0, 1, 7],
  [1, 0, 3, 0, 5],
]

const params = [
  [2, 1, 4, 3],
  [1, 1, 2, 2],
  [1, 2, 2, 4],
]

var obj = new NumMatrix(matrix)

for ([row1, col1, row2, col2] of params)
  console.log(obj.sumRegion(row1, col1, row2, col2))
