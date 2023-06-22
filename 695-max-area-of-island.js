/**
 * @param {number[][]} grid
 * @return {number}
 */
// Approach #1: Depth-First Search (Recursive) [Accepted]
const maxAreaOfIsland_1 = (grid) => {
  const seen = new Array(grid.length)
    .fill()
    .map((_) => new Array(grid[0].length).fill(false))
  const area = (row, col) => {
    if (
      row < 0 ||
      row >= grid.length ||
      col < 0 ||
      col >= grid[0].length ||
      seen[row][col] ||
      grid[row][col] === 0
    )
      return 0
    seen[row][col] = true
    return (
      1 +
      area(row - 1, col) +
      area(row + 1, col) +
      area(row, col - 1) +
      area(row, col + 1)
    )
  }

  let result = 0
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      result = Math.max(result, area(row, col))
    }
  }
  return result
}

// Approach #2: Depth-First Search (Iterative) [Accepted]
const maxAreaOfIsland_2 = (grid) => {
  const seen = new Array(grid.length)
    .fill()
    .map((_) => new Array(grid[0].length).fill(false))
  const deltaRow = [-1, 1, 0, 0]
  const deltaCol = [0, 0, -1, 1]

  let result = 0
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      if (grid[row][col] === 1 && !seen[row][col]) {
        seen[row][col] = true
        let size = 0
        const stack = [[row, col]]
        while (stack.length) {
          size++
          const [r, c] = stack.pop()
          for (let i = 0; i < 4; i++) {
            const nr = r + deltaRow[i]
            const nc = c + deltaCol[i]
            if (
              nr >= 0 &&
              nr < grid.length &&
              nc >= 0 &&
              nc < grid[0].length &&
              grid[nr][nc] === 1 &&
              !seen[nr][nc]
            ) {
              stack.push([nr, nc])
              seen[nr][nc] = true
            }
          }
        }
        result = Math.max(result, size)
      }
    }
  }
  return result
}

// Discussion board - sgallivan
const maxAreaOfIsland = (grid) => {
  const traverse = (row, col) => {
    if (
      row < 0 ||
      row >= grid.length ||
      col < 0 ||
      col >= grid[0].length ||
      !grid[row][col]
    )
      return 0
    grid[row][col] = 0
    return (
      1 +
      traverse(row - 1, col) +
      traverse(row + 1, col) +
      traverse(row, col - 1) +
      traverse(row, col + 1)
    )
  }

  let result = 0
  for (row = 0; row < grid.length; row++) {
    for (col = 0; col < grid[0].length; col++) {
      if (grid[row][col]) result = Math.max(result, traverse(row, col))
    }
  }
  return result
}

grid = [
  [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
  [0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0],
  [0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
]
// Output: 6

// grid = [[0, 0, 0, 0, 0, 0, 0, 0]]
// Output: 0

console.log(maxAreaOfIsland(grid))

b = false
if (grid[grid.length][0]) b = true
b
