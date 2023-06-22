/**
 * You are given two images, img1 and img2, represented as binary, square
 * matrices of size n x n. A binary matrix has only 0s and 1s as values.
 *
 * We translate one image however we choose by sliding all the 1 bits left,
 * right, up, and/or down any number of units. We then place it on top of the
 * other image. We can then calculate the overlap by counting the number of
 * positions that have a 1 in both images.
 *
 * Note also that a translation does not include any kind of rotation. Any 1
 * bits that are translated outside of the matrix borders are erased.
 *
 * Return the largest possible overlap.
 *
 * Constraints:
 *    n == img1.length == img1[i].length
 *    n == img2.length == img2[i].length
 *    1 <= n <= 30
 *    img1[i][j] is either 0 or 1.
 *    img2[i][j] is either 0 or 1.
 */

/**
 * @param {number[][]} img1
 * @param {number[][]} img2
 * @return {number}
 */
// Approach 1: Shift and Count
const largestOverlap_1 = (A, B) => {
  const shiftAndCount = (x, y, M, R) => {
    let leftOverlap = 0,
      rightOverlap = 0

    for (
      let shiftRow = y, fixedRow = 0;
      shiftRow < M.length;
      shiftRow++, fixedRow++
    ) {
      for (
        let shiftCol = x, fixedCol = 0, r;
        shiftCol < M.length;
        shiftCol++, fixedCol++
      ) {
        // movo M para a esquerda
        if (
          M[shiftRow][shiftCol] === 1 &&
          M[shiftRow][shiftCol] === R[fixedRow][fixedCol]
        )
          leftOverlap++
        // move R para a esquerda o que equivale mover M para a direita
        if (
          M[shiftRow][fixedCol] === 1 &&
          M[shiftRow][fixedCol] === R[fixedRow][shiftCol]
        )
          rightOverlap++
      }
    }
    return Math.max(leftOverlap, rightOverlap)
  }

  let maxOverlaps = 0
  for (let y = 0; y < A.length; y++) {
    for (let x = 0; x < A.length; x++) {
      // move A para cima (na rotina shiftAndCount moveremos para a esquerda e
      // para a direita)
      maxOverlaps = Math.max(maxOverlaps, shiftAndCount(x, y, A, B))
      // move B para cima o que equivale mover A para baixo
      maxOverlaps = Math.max(maxOverlaps, shiftAndCount(x, y, B, A))
    }
  }
  return maxOverlaps
}

// Approach 2: Linear Transformation
const largestOverlap_2 = (A, B) => {
  const nonZeroCells = (matrix) => {
    const array = []
    for (let row = 0; row < matrix.length; row++)
      for (let col = 0; col < matrix.length; col++)
        if (matrix[row][col]) array.push([row, col])
    return array
  }

  let maxOverlaps = 0
  const aOnes = nonZeroCells(A)
  const bOnes = nonZeroCells(B)
  const overlappingZones = new Map()

  for (const a of aOnes)
    for (const b of bOnes) {
      const key = `${b[0] - a[0]}#${b[1] - a[1]}`
      overlappingZones.set(key, (overlappingZones.get(key) ?? 0) + 1)
    }
  return [...overlappingZones].reduce(
    (max, [, count]) => (max > count ? max : count),
    0
  )
}

// Approach 3: Imagine Convolution
const largestOverlap = (A, B) => {
  const convolute = (matrix, kernel, shiftRow, shiftCol) => {
    let result = 0
    for (let row = 0; row < matrix.length; row++)
      for (let col = 0; col < matrix.length; col++)
        result += matrix[row][col] * kernel[row + shiftRow][col + shiftCol]
    return result
  }

  const n = A.length
  const paddedB = new Array(3 * n - 2)
    .fill()
    .map((_) => new Array(3 * n - 2).fill(0))
  for (let row = 0; row < n; row++)
    for (let col = 0; col < n; col++)
      paddedB[n - 1 + row][n - 1 + col] = B[row][col]

  let maxOverlaps = 0
  for (let shiftRow = 0; shiftRow < 2 * n - 1; shiftRow++)
    for (let shiftCol = 0; shiftCol < 2 * n - 1; shiftCol++)
      maxOverlaps = Math.max(
        maxOverlaps,
        convolute(A, paddedB, shiftRow, shiftCol)
      )
  return maxOverlaps
}

img1 = [
  [1, 1, 0],
  [0, 1, 0],
  [0, 1, 0],
]
img2 = [
  [0, 0, 0],
  [0, 1, 1],
  [0, 0, 1],
]
// Output: 3

// img1 = [[1]]
// img2 = [[1]]
// Output: 1

// img1 = [[0]]
// img2 = [[0]]
// Output: 0

console.log(largestOverlap(img1, img2))
