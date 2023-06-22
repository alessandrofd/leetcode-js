/**
 * A matrix diagonal is a diagonal line of cells starting from some cell in
 * either the topmost row or leftmost column and going in the bottom-right
 * direction until reaching the matrix's end. For example, the matrix diagonal
 * starting from mat[2][0], where mat is a 6 x 3 matrix, includes cells
 * mat[2][0], mat[3][1], and mat[4][2].
 *
 * Given an m x n matrix mat of integers, sort each matrix diagonal in ascending
 * order and return the resulting matrix.
 *
 * Constraints:
 *    m == mat.length
 *    n == mat[i].length
 *    1 <= m, n <= 100
 *    1 <= mat[i][j] <= 100
 */

/**
 * @param {number[][]} mat
 * @return {number[][]}
 */

// Approach 1: Hash Table of Heaps
import { MinPriorityQueue } from '@datastructures-js/priority-queue'
const diagonalSort_1 = (mat) => {
  const rows = mat.length
  const cols = mat[0].length
  const diagonals = new Map()

  for (let row = 0; row < rows; row++)
    for (let col = 0; col < cols; col++) {
      if (!diagonals.has(row - col))
        diagonals.set(row - col, new MinPriorityQueue())
      diagonals.get(row - col).enqueue(mat[row][col], mat[row][col])
    }

  for (let row = 0; row < rows; row++)
    for (let col = 0; col < cols; col++)
      mat[row][col] = diagonals.get(row - col).dequeue().element

  return mat
}

// Approach 2: Sort Diagonals One by One Using Heap
const diagonalSort_2 = (mat) => {
  const rows = mat.length
  const cols = mat[0].length

  const sortDiag = (row, col) => {
    const len = Math.min(rows - row, cols - col)
    const diag = new MinPriorityQueue()

    for (let i = 0; i < len; i++)
      diag.enqueue(mat[row + i][col + i], mat[row + i][col + i])

    for (let i = 0; i < len; i++) mat[row + i][col + i] = diag.dequeue().element
  }

  for (let row = 0; row < rows; row++) sortDiag(row, 0)
  for (let col = 1; col < cols; col++) sortDiag(0, col)

  return mat
}

// Approach 2.1: Sort Diagonals One by One Using Array
const diagonalSort_2_1 = (mat) => {
  const rows = mat.length
  const cols = mat[0].length

  const sortDiag = (row, col) => {
    const len = Math.min(rows - row, cols - col)
    const arr = []

    for (let i = 0; i < len; i++) arr.push(mat[row + i][col + i])
    arr.sort((a, b) => b - a)
    for (let i = 0; i < len; i++) mat[row + i][col + i] = arr.pop()
  }

  for (let row = 0; row < rows; row++) sortDiag(row, 0)
  for (let col = 1; col < cols; col++) sortDiag(0, col)

  return mat
}

// Approach 3: Sort Diagonals One by One Using Counting Sort
const diagonalSort = (mat) => {
  const rows = mat.length
  const cols = mat[0].length

  const countingSort = (nums) => {
    const min = 1
    const max = 100
    const len = max - min + 1

    const count = new Array(len).fill(0)
    for (const num of nums) count[num - min]++

    const sorted = []
    for (let i = 0; i < len; i++)
      for (let times = count[i]; times > 0; times--) sorted.push(min + i)

    return sorted
  }

  const sortDiag = (row, col) => {
    const len = Math.min(rows - row, cols - col)
    let diag = []

    for (let i = 0; i < len; i++) diag.push(mat[row + i][col + i])
    diag = countingSort(diag)
    for (let i = 0; i < len; i++) mat[row + i][col + i] = diag.shift()
  }

  for (let row = 0; row < rows; row++) sortDiag(row, 0)
  for (let col = 1; col < cols; col++) sortDiag(0, col)

  return mat
}

mat = [
  [3, 3, 1, 1],
  [2, 2, 1, 2],
  [1, 1, 1, 2],
]
// Output: [
//   [1, 1, 1, 1],
//   [1, 2, 2, 2],
//   [1, 2, 3, 3],
// ]

mat = [
  [11, 25, 66, 1, 69, 7],
  [23, 55, 17, 45, 15, 52],
  [75, 31, 36, 44, 58, 8],
  [22, 27, 33, 25, 68, 4],
  [84, 28, 14, 11, 5, 50],
]
// Output: [
//   [5, 17, 4, 1, 52, 7],
//   [11, 11, 25, 45, 8, 69],
//   [14, 23, 25, 44, 58, 15],
//   [22, 27, 31, 36, 50, 66],
//   [84, 28, 75, 33, 55, 68],
// ]

console.log(diagonalSort(mat))
