/**
 * You are given an m x n integer matrix grid where each cell is either 0
 * (empty) or 1 (obstacle). You can move up, down, left, or right from and to an
 * empty cell in one step.
 *
 * Return the minimum number of steps to walk from the upper left corner (0, 0)
 * to the lower right corner (m - 1, n - 1) given that you can eliminate at most
 * k obstacles. If it is not possible to find such walk return -1.
 *
 * Constraints:
 *    m == grid.length
 *    n == grid[i].length
 *    1 <= m, n <= 40
 *    1 <= k <= m * n
 *    grid[i][j] is either 0 or 1.
 *    grid[0][0] == grid[m - 1][n - 1] == 0
 */

/**
 * @param {number[][]} grid
 * @param {number} k
 * @return {number}
 */

//Approach 1: BFS (Breadth-First Search)
const shortestPath_1 = (grid, eliminations) => {
  const makeKey = ([steps, row, col, k]) => `${steps}#${row}#${col}#${k}`

  const rows = grid.length
  const cols = grid[0].length

  if (eliminations >= rows + cols - 2) return rows + cols - 2

  const moves = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ]

  // steps, row, col, eliminationsLeft
  const initialState = [0, 0, 0, eliminations]
  const queue = [initialState]
  const seen = new Set(makeKey(initialState))

  while (queue.length) {
    const [steps, row, col, eliminationsLeft] = queue.shift()
    if (row === rows - 1 && col === cols - 1) return steps

    for (const move of moves) {
      const nextRow = row + move[0]
      const nextCol = col + move[1]

      if (nextRow < 0 || nextRow === rows || nextCol < 0 || nextCol === cols)
        continue

      const nextEliminations = eliminationsLeft - grid[nextRow][nextCol]
      const newState = [steps + 1, nextRow, nextCol, nextEliminations]
      const newKey = makeKey(newState)

      if (nextEliminations >= 0 && !seen.has(newKey)) {
        queue.push(newState)
        seen.add(newKey)
      }
    }
  }
  return -1
}

const shortestPath = (grid, eliminations) => {
  if (!grid || !grid.length) return -1

  const rows = grid.length
  const cols = grid[0].length

  if (eliminations >= rows + cols - 2) return rows + cols - 2

  const directions = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ]

  let queue = [[0, 0, eliminations]]
  const seen = new Array(rows).fill().map((_) => new Array(cols).fill(-1))
  let steps = 0

  while (queue.length) {
    const nextQueue = []
    for (let [row, col, remain] of queue) {
      if (row === rows - 1 && col === cols - 1) return steps

      if (grid[row][col] === 1) {
        if (remain === 0) continue
        else remain--
      }

      if (seen[row][col] >= remain) continue

      seen[row][col] = remain
      for (const [dx, dy] of directions) {
        const nextRow = row + dy
        const nextCol = col + dx
        if (nextRow >= 0 && nextRow < rows && nextCol >= 0 && nextCol < cols) {
          nextQueue.push([nextRow, nextCol, remain])
        }
      }
    }
    steps++
    queue = nextQueue
  }
  return -1
}

// TODO: Approach 2: A* (A Star) Algorithm

grid = [
  [0, 0, 0],
  [1, 1, 0],
  [0, 0, 0],
  [0, 1, 1],
  [0, 0, 0],
]
k = 1
// Output: 6

grid = [
  [0, 1, 1],
  [1, 1, 1],
  [1, 0, 0],
]
k = 1
// Output: -1

console.log(shortestPath(grid, k))
