/**
 * @param {number[][]} grid
 * @return {number}
 */
const shortestPathBinaryMatrix = (grid) => {
  const endRow = grid.length - 1,
    endCol = grid[0].length - 1

  const getNeighbors = (row, col) => {
    const directions = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1],
    ]
    const neighbors = []
    for (const direction of directions) {
      const newRow = row + direction[0]
      const newCol = col + direction[1]
      console.log(newRow, newCol)
      if (
        newRow < 0 ||
        newRow > endRow ||
        newCol < 0 ||
        newCol > endCol ||
        grid[newRow][newCol] != 0
      )
        continue
      neighbors.push([newRow, newCol])
    }
    return neighbors
  }

  if (grid[0][0] != 0 || grid[endRow][endCol] != 0) return -1

  const queue = [[0, 0]]
  grid[0][0] = 1

  while (queue.length) {
    const [row, col] = queue.shift()
    console.log(row, col)
    const distance = grid[row][col]
    if (row === endRow && col === endCol) return distance

    for (const neighbor of getNeighbors(row, col)) {
      queue.push(neighbor)
      grid[neighbor[0]][neighbor[1]] = distance + 1
    }
  }
  return -1
}

grid = [
  [1, 0, 0],
  [1, 1, 0],
  [1, 1, 0],
]
console.log(shortestPathBinaryMatrix(grid))
