/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {number}
 */
// Approach 1: Number of Subarrays that Sum to Target: Horizontal 1D Prefix Sum
const numSubmatrixSumTarget_1 = (matrix, target) => {
  const rows = matrix.length
  const cols = matrix[0].length

  // Compute 2D prefix sum
  const ps = new Array(rows + 1).fill().map((_) => new Array(cols + 1).fill(0))
  for (let row = 1; row <= rows; row++)
    for (let col = 1; col <= cols; col++)
      ps[row][col] =
        ps[row - 1][col] +
        ps[row][col - 1] -
        ps[row - 1][col - 1] +
        matrix[row - 1][col - 1]

  let count = 0
  const map = new Map()
  // reduce 2D problem to 1D one
  // by fixing two rows r1 and c2 and
  // computing 1D prefix sum to all matrices using  [r1...r2] rows
  for (let r1 = 1; r1 <= rows; r1++) {
    for (let r2 = r1; r2 <= rows; r2++) {
      map.clear()
      map.set(0, 1)
      for (let col = 1; col <= cols; col++) {
        const sum = ps[r2][col] - ps[r1 - 1][col]
        count += map.get(sum - target) ?? 0
        map.set(sum, (map.get(sum) ?? 0) + 1)
      }
    }
  }
  return count
}

// Approach 2: Number of Subarrays that Sum to Target: Vertical 1D Prefix Sum
const numSubmatrixSumTarget = (matrix, target) => {
  const rows = matrix.length
  const cols = matrix[0].length

  // Compute 2D prefix sum
  const ps = new Array(rows + 1).fill().map((_) => new Array(cols + 1).fill(0))
  for (let row = 1; row <= rows; row++)
    for (let col = 1; col <= cols; col++)
      ps[row][col] =
        ps[row - 1][col] +
        ps[row][col - 1] -
        ps[row - 1][col - 1] +
        matrix[row - 1][col - 1]

  let count = 0
  const map = new Map()
  for (let c1 = 1; c1 <= cols; c1++) {
    for (let c2 = c1; c2 <= cols; c2++) {
      map.clear()
      map.set(0, 1)
      for (let row = 1; row <= rows; row++) {
        const sum = ps[row][c2] - ps[row][c1 - 1]
        count += map.get(sum - target) ?? 0
        map.set(sum, (map.get(sum) ?? 0) + 1)
      }
    }
  }
  return count
}

matrix = [
  [0, 1, 0],
  [1, 1, 1],
  [0, 1, 0],
]
target = 0
// Output: 4

matrix = [
  [1, -1],
  [-1, 1],
]
target = 0
// Output: 5

matrix = [[904]]
target = 0
// Output: 0

console.log(numSubmatrixSumTarget(matrix, target))
