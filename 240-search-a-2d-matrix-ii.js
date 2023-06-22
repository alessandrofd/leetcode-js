/**
 * Write an efficient algorithm that searches for a value target in an m x n integer matrix matrix.
 * This matrix has the following properties:
 *  Integers in each row are sorted in ascending from left to right.
 *  Integers in each column are sorted in ascending from top to bottom.
 */

/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */

// Approach 2: Binary Search
const searchMatrix_2 = (matrix, target) => {
  if (matrix === null || matrix.length === 0) return false

  const binarySearch = (start, vertical) => {
    const log = start === 2 && vertical === true
    let lo = start
    let hi = vertical ? matrix[0].length - 1 : matrix.length - 1

    while (hi >= lo) {
      const mid = Math.floor((lo + hi) / 2)
      // searching a columns
      if (vertical) {
        if (matrix[start][mid] < target) lo = mid + 1
        else if (matrix[start][mid] > target) hi = mid - 1
        else return true
      }
      // searching a row
      else {
        if (matrix[mid][start] < target) lo = mid + 1
        else if (matrix[mid][start] > target) hi = mid - 1
        else return true
      }
    }
    return false
  }

  const shorter = Math.min(matrix.length, matrix[0].length)
  for (let i = 0; i < shorter; i++)
    if (binarySearch(i, true) || binarySearch(i, false)) return true

  return false
}

// Approach 3: Divide and Conquer (recursion)
const searchMatrix_3 = (matrix, target) => {
  const recurse = (left, top, right, bottom) => {
    // the submatrix has no height or no width
    if (left > right || top > bottom) return false
    // target is already larger than the largest element or
    // smaller than the smallest element in the submatrix
    if (target < matrix[top][left] || target > matrix[bottom][right])
      return false

    // locate row such that matrix[row-1][mid] < target < matrix[row][mid]
    const mid = left + Math.floor((right - left) / 2)
    let row
    for (row = top; row <= bottom && matrix[row][mid] <= target; row++)
      if (matrix[row][mid] === target) return true

    return (
      recurse(left, row, mid - 1, bottom) ||
      recurse(mid + 1, top, right, row - 1)
    )
  }

  if (matrix === null || matrix.length === 0) return false
  return recurse(0, 0, matrix[0].length - 1, matrix.length - 1)
}

// Approach 4: Search Space Reduction
const searchMatrix = (matrix, target) => {
  let row = matrix.length - 1
  let col = 0

  while (row >= 0 && col < matrix[0].length) {
    if (matrix[row][col] > target) row--
    else if (matrix[row][col] < target) col++
    else return true
  }
  return false
}

matrix = [
  [1, 4, 7, 11, 15],
  [2, 5, 8, 12, 19],
  [3, 6, 9, 16, 22],
  [10, 13, 14, 17, 24],
  [18, 21, 23, 26, 30],
]
target = 5
// Output: true

// matrix = [
//   [1, 4, 7, 11, 15],
//   [2, 5, 8, 12, 19],
//   [3, 6, 9, 16, 22],
//   [10, 13, 14, 17, 24],
//   [18, 21, 23, 26, 30],
// ]
// target = 20
// Output: false

console.log(searchMatrix(matrix, target))
