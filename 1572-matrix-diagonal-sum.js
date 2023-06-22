/**
 * @param {number[][]} mat
 * @return {number}
 */
const diagonalSum1 = (mat) => {
  const len = mat.length
  return mat
    .map((a, i) => (i === (len - 1) / 2 ? a[i] : a[i] + a[len - 1 - i]))
    .reduce((acc, n) => acc + n, 0)
}

const diagonalSum = (mat) => {
  const len = mat.length
  let sum = 0
  for (let i = 0; i < len; i++)
    sum += i === (len - 1) / 2 ? mat[i][i] : mat[i][i] + mat[i][len - 1 - i]

  return sum
}

/* 
Input: mat = [[1,2,3],
              [4,5,6],
              [7,8,9]]
Output: 25
Explanation: Diagonals sum: 1 + 5 + 9 + 3 + 7 = 25
Notice that element mat[1][1] = 5 is counted only once.
*/
console.log(
  diagonalSum([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ])
)

/*
Input: mat = [[1,1,1,1],
              [1,1,1,1],
              [1,1,1,1],
              [1,1,1,1]]
Output: 8
*/
console.log(
  diagonalSum([
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
  ])
)

/*
Input: mat = [[5]]
Output: 5
*/
console.log(diagonalSum([[5]]))
