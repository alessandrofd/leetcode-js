/**
 * A row-sorted binary matrix means that all elements are 0 or 1 and each row of
 * the matrix is sorted in non-decreasing order.
 *
 * Given a row-sorted binary matrix binaryMatrix, return the index (0-indexed)
 *  of the leftmost column with a 1 in it. If such an index does not exist,
 * return -1.
 *
 * You can't access the Binary Matrix directly. You may only access the matrix
 * using a BinaryMatrix interface:
 *
 *    BinaryMatrix.get(row, col) returns the element of the matrix at index
 *    (row, col) (0-indexed).
 *
 *    BinaryMatrix.dimensions() returns the dimensions of the matrix as a list
 *    of 2 elements [rows, cols], which means the matrix is rows x cols.
 *
 * Submissions making more than 1000 calls to BinaryMatrix.get will be judged
 * Wrong Answer. Also, any solutions that attempt to circumvent the judge will
 * result in disqualification.
 *
 * For custom testing purposes, the input will be the entire binary matrix matrix
 * You will not have access to the binary matrix directly.
 *
 * Constraints:
 *    rows == mat.length
 *    cols == mat[i].length
 *    1 <= rows, cols <= 100
 *    mat[i][j] is either 0 or 1.
 *    mat[i] is sorted in non-decreasing order.
 */

/**
 * // This is the BinaryMatrix's API interface.
 * // You should not implement it, or speculate about its implementation
 * function BinaryMatrix() {
 *     @param {integer} row, col
 *     @return {integer}
 *     this.get = function(row, col) {
 *         ...
 *     };
 *
 *     @return {[integer, integer]}
 *     this.dimensions = function() {
 *         ...
 *     };
 * };
 */

class BinaryMatrix {
  constructor(matrix) {
    this.matrix = matrix
  }

  get = (row, col) => this.matrix[row][col]
  dimensions = () => [this.matrix.length, this.matrix[0].length]
}

/**
 * @param {BinaryMatrix} binaryMatrix
 * @return {number}
 */

// Approach 1: Linear Search Each Row -- You made too many calls to BinaryMatrix.get().
const leftMostColumnWithOne_linear = (binaryMatrix) => {
  const [rows, cols] = binaryMatrix.dimensions()

  for (let col = 0; col < cols; col++)
    for (let row = 0; row < rows; row++)
      if (binaryMatrix.get(row, col) === 1) return col

  return -1
}

// Approach 2: Binary Search Each Row
const leftMostColumnWithOne_binSearch = (binMatrix) => {
  const [rows, cols] = binMatrix.dimensions()

  for (let row = rows - 1; row >= 0; row--) {
    let lo = 0
    let hi = cols
    while (lo < hi) {
      const mid = ((lo + hi) / 2) | 0
      if (binMatrix.get(row, mid) === 0) lo = mid + 1
      else hi = mid
    }
    if (lo < cols) return lo
  }
  return -1
}

// Approach 3: Start at Top Right, Move Only Left and Down
// with binary search
const leftMostColumnWithOne_downAndLeft_binSearch = (binMatrix) => {
  const [rows, cols] = binMatrix.dimensions()

  let leftMost = cols
  for (let row = 0; row < rows; row++) {
    let lo = 0
    let hi = leftMost
    while (lo < hi) {
      const mid = ((lo + hi) / 2) | 0
      if (binMatrix.get(row, mid) === 0) lo = mid + 1
      else hi = mid
    }
    leftMost = Math.min(leftMost, lo)
  }
  return leftMost === cols ? -1 : leftMost
}

// without binary search, linear
const leftMostColumnWithOne_downAndLeft_linear = (binMatrix) => {
  const [rows, cols] = binMatrix.dimensions()

  let leftMost = cols
  for (let row = 0; row < rows; row++) {
    let col = leftMost - 1
    while (col >= 0 && binMatrix.get(row, col) === 1) col--
    leftMost = col + 1
  }

  return leftMost === cols ? -1 : leftMost
}

mat = [
  [0, 0],
  [1, 1],
]
// Output: 0

// mat = [
//   [0, 0],
//   [0, 1],
// ]
// Output: 1

// mat = [
//   [0, 0],
//   [0, 0],
// ]
// Output: -1

// mat = [
//   [0, 0, 0, 1],
//   [0, 0, 1, 1],
//   [0, 1, 1, 1],
// ]
// Output: 1

console.log(leftMostColumnWithOne_linear(new BinaryMatrix(mat)))
console.log(leftMostColumnWithOne_binSearch(new BinaryMatrix(mat)))
console.log(leftMostColumnWithOne_downAndLeft_binSearch(new BinaryMatrix(mat)))
console.log(leftMostColumnWithOne_downAndLeft_linear(new BinaryMatrix(mat)))
