/**
 * @param {number[][]} matrix
 * @return {number}
 */

// Approach #1 (Naive DFS) [Time Limit Exceeded]
// const longestIncreasingPath = (matrix) => {
//   if (matrix.length === 0) return 0

//   const directions = [
//     [0, 1],
//     [1, 0],
//     [0, -1],
//     [-1, 0],
//   ]
//   const m = matrix.length,
//     n = matrix[0].length

//   const dfs = (row, col) => {
//     let result = 0
//     for (const [dRow, dCol] of directions) {
//       const newRow = row + dRow,
//         newCol = col + dCol
//       if (
//         newRow >= 0 &&
//         newRow < m &&
//         newCol >= 0 &&
//         newCol < n &&
//         matrix[newRow][newCol] > matrix[row][col]
//       )
//         result = Math.max(result, dfs(newRow, newCol))
//     }
//     return ++result
//   }

//   let result = 0
//   for (let row = 0; row < m; row++) {
//     for (let col = 0; col < n; col++) {
//       result = Math.max(result, dfs(row, col))
//     }
//   }
//   return result
// }

//Approach #2 (DFS + Memoization) [Accepted]
// const longestIncreasingPath = (matrix) => {
//   if (matrix.length === 0) return 0

//   const directions = [
//     [0, 1],
//     [1, 0],
//     [0, -1],
//     [-1, 0],
//   ]
//   const m = matrix.length,
//     n = matrix[0].length

//   const cache = new Array(m).fill(null).map((x) => new Array(n).fill(0))

//   const dfs = (row, col) => {
//     if (cache[row][col]) return cache[row][col]
//     for (const [dRow, dCol] of directions) {
//       const newRow = row + dRow,
//         newCol = col + dCol
//       if (
//         newRow >= 0 &&
//         newRow < m &&
//         newCol >= 0 &&
//         newCol < n &&
//         matrix[newRow][newCol] > matrix[row][col]
//       )
//         cache[row][col] = Math.max(cache[row][col], dfs(newRow, newCol))
//     }
//     return ++cache[row][col]
//   }

//   let result = 0
//   for (let row = 0; row < m; row++) {
//     for (let col = 0; col < n; col++) {
//       result = Math.max(result, dfs(row, col))
//     }
//   }
//   return result
// }

// Approach #3 (Peeling Onion) [Accepted]
const longestIncreasingPath = (matrix) => {
  if (matrix.length === 0) return 0

  const directions = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ]

  const rowLength = matrix.length
  const colLength = matrix[0].length

  const validNeighbor = (row, col) => {
    if (row >= 0 && row < rowLength && col >= 0 && col < colLength) return true
    return false
  }

  const outdegrees = new Array(rowLength)
    .fill(null)
    .map((x) => new Array(colLength).fill(0))

  for (let row = 0; row < rowLength; row++) {
    for (let col = 0; col < colLength; col++) {
      for (const [dRow, dCol] of directions) {
        const neighborRow = row + dRow
        const neighborCol = col + dCol
        if (
          validNeighbor(neighborRow, neighborCol) &&
          matrix[neighborRow][neighborCol] > matrix[row][col]
        )
          outdegrees[row][col]++
      }
    }
  }

  let leaves = []

  for (let row = 0; row < rowLength; row++) {
    for (let col = 0; col < colLength; col++) {
      if (outdegrees[row][col] === 0) leaves.push([row, col])
    }
  }

  let height = 0

  while (leaves.length) {
    height++
    const newLeaves = []
    for (const [leafRow, leafCol] of leaves) {
      for (const [dRow, dCol] of directions) {
        const neighborRow = leafRow + dRow
        const neighborCol = leafCol + dCol
        if (
          validNeighbor(neighborRow, neighborCol) &&
          matrix[leafRow][leafCol] > matrix[neighborRow][neighborCol]
        )
          if (--outdegrees[neighborRow][neighborCol] === 0)
            newLeaves.push([neighborRow, neighborCol])
      }
    }
    leaves = newLeaves
  }
  return height
}

matrix = [
  [9, 9, 4],
  [6, 6, 8],
  [2, 1, 1],
]

matrix = [
  [3, 4, 5],
  [3, 2, 6],
  [2, 2, 1],
]

matrix = [[1]]

console.log(longestIncreasingPath(matrix))
