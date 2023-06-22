/**
 * Given a positive integer n, generate an n x n matrix filled with elements
 * from 1 to n2 in spiral order.
 *
 * Constraints:
 *    1 <= n <= 20
 */

/**
 * @param {number} n
 * @return {number[][]}
 */
const generateMatrix = (n) => {
  const matrix = new Array(n).fill().map((_) => new Array(n))
  let top = 0,
    bottom = n - 1
  let left = 0,
    right = n - 1
  let count = 1
  let row = 0,
    col = 0

  while (count < n * n) {
    while (col < right) matrix[top][col++] = count++
    top++

    while (row < bottom) matrix[row++][right] = count++
    right--

    while (col > left) matrix[bottom][col--] = count++
    bottom--

    while (row > top) matrix[row--][left] = count++
    left++
  }

  matrix[row][col] = count
  return matrix
}

const generateMatrix_1 = (n) => {
  const matrix = new Array(n).fill().map((_) => new Array(n))
  let top = 0
  let bottom = n - 1
  let left = 0
  let right = n - 1
  let count = 0

  while (count < n * n) {
    for (let col = left; count < n * n && col <= right; col++)
      matrix[top][col] = ++count
    top++

    for (let row = top; count < n * n && row <= bottom; row++)
      matrix[row][right] = ++count
    right--

    for (let col = right; count < n * n && col >= left; col--)
      matrix[bottom][col] = ++count
    bottom--

    for (let row = bottom; count < n * n && row >= top; row--)
      matrix[row][left] = ++count
    left++
  }

  return matrix
}

const generateMatrix_0 = (n) => {
  const matrix = new Array(n).fill().map((_) => new Array(n))
  let top = 0
  let bottom = n - 1
  let left = 0
  let right = n - 1
  let count = 1

  while (true) {
    for (let col = left; col <= right; col++) matrix[top][col] = count++
    if (++top > bottom) break

    for (let row = top; row <= bottom; row++) matrix[row][right] = count++
    if (--right < left) break

    for (let col = right; col >= left; col--) matrix[bottom][col] = count++
    if (--bottom < top) break

    for (let row = bottom; row >= top; row--) matrix[row][left] = count++
    if (++left > right) break
  }

  return matrix
}

n = 3
// Expected: [[1,2,3],[8,9,4],[7,6,5]]

n = 1
// Expected: [[1]]

console.log(generateMatrix(n))
