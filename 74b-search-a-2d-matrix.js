/**
 * You are given an m x n integer matrix matrix with the following two
 * properties:
 *
 *    Each row is sorted in non-decreasing order.
 *
 *    The first integer of each row is greater than the last integer of the
 *    previous row.
 *
 * Given an integer target, return true if target is in matrix or false
 * otherwise.
 *
 * You must write a solution in O(log(m * n)) time complexity.
 *
 * Constraints:
 *    m == matrix.length
 *    n == matrix[i].length
 *    1 <= m, n <= 100
 *    -10^4 <= matrix[i][j], target <= 10^4
 */

/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
const searchMatrix = (matrix, target) => {}

matrix = [
  [1, 3, 5, 7],
  [10, 11, 16, 20],
  [23, 30, 34, 60],
]
target = 3
// Expected: true

matrix = [
  [1, 3, 5, 7],
  [10, 11, 16, 20],
  [23, 30, 34, 60],
]
target = 13
// Expected: false

matrix = [[1]]
target = 1
// Expected: true

console.log(searchMatrix(matrix, target))
