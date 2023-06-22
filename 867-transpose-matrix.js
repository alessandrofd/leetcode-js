/**
 * @param {number[][]} matrix
 * @return {number[][]}
 */
const transpose = (matrix) => {
  const m = matrix.length
  const n = matrix[0].length
  const transposed = Array(n)
    .fill(null)
    .map((_) => Array(m))

  for (let i = 0; i < m; i++)
    for (let j = 0; j < n; j++) transposed[j][i] = matrix[i][j]

  return transposed
}

// let matrix = [
//   [1, 2, 3],
//   [4, 5, 6],
//   [7, 8, 9],
// ]

let matrix = [
  [1, 2, 3],
  [4, 5, 6],
]
console.log(transpose(matrix))
