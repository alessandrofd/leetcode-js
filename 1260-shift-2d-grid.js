/**
 * @param {number[][]} grid
 * @param {number} k
 * @return {number[][]}
 */
const shiftGrid = (grid, k) => {
  const rows = grid.length
  const columns = grid[0].length
  const shiftedGrid = Array.from(Array(rows), () => new Array(columns))

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      const shiftedColumn = (j + k) % columns
      const shiftedRow = (i + Math.floor((j + k) / columns)) % rows
      shiftedGrid[shiftedRow][shiftedColumn] = grid[i][j]
    }
  }
  return shiftedGrid
}

// Input: grid = [[1,2,3],[4,5,6],[7,8,9]], k = 1
// Output: [[9,1,2],[3,4,5],[6,7,8]]

const grid = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
]
const k = 1

console.log(shiftGrid(grid, k))
