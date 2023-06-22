/**
 * Given an n x n grid containing only values 0 and 1, where 0 represents water
 * and 1 represents land, find a water cell such that its distance to the
 * nearest land cell is maximized, and return the distance. If no land or water
 * exists in the grid, return -1.
 *
 * The distance used in this problem is the Manhattan distance: the distance
 * between two cells (x0, y0) and (x1, y1) is |x0 - x1| + |y0 - y1|.
 *
 * Constraints:
 *    n == grid.length
 *    n == grid[i].length
 *    1 <= n <= 100
 *    grid[i][j] is 0 or 1
 */

/**
 * @param {number[][]} grid
 * @return {number}
 */
const maxDistance_brute = (grid) => {
  const n = grid.length

  const calcDistance = ([x0, y0], [x1, y1]) =>
    Math.abs(x0 - x1) + Math.abs(y0 - y1)

  const waters = []
  const lands = []

  for (let row = 0; row < n; row++) {
    for (let col = 0; col < n; col++) {
      if (grid[row][col] === 0) waters.push([row, col])
      else lands.push([row, col])
    }
  }

  if (!waters.length || !lands.length) return -1

  let max = 0
  for (const water of waters) {
    let distance = Infinity
    for (const land of lands) {
      distance = Math.min(distance, calcDistance(water, land))
    }
    max = Math.max(max, distance)
  }
  return max
}

// BFS
const maxDistance_bfs = (grid) => {
  const n = grid.length

  const steps = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ]

  const visited = new Array(n).fill().map((_) => new Array(n))
  for (let i = 0; i < n; i++)
    for (let j = 0; j < n; j++) visited[i][j] = grid[i][j]

  const queue = []

  for (let row = 0; row < n; row++)
    for (let col = 0; col < n; col++)
      if (visited[row][col] === 1) queue.push([row, col])

  let distance = -1
  while (queue.length) {
    let qLen = queue.length
    while (qLen--) {
      const [row, col] = queue.shift()
      for (const [rowStep, colStep] of steps) {
        const [rowNext, colNext] = [row + rowStep, col + colStep]
        if (visited[rowNext]?.[colNext] === 0) {
          visited[rowNext][colNext] = 1
          queue.push([rowNext, colNext])
        }
      }
    }
    distance++
  }

  return distance === 0 ? -1 : distance
}

//DP
const maxDistance_dp = (grid) => {
  const n = grid.length
  const distance = new Array(n + 2)
    .fill()
    .map((_) => new Array(n + 2).fill(Infinity))

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= n; j++) {
      distance[i][j] =
        grid[i - 1][j - 1] === 1
          ? 0
          : 1 + Math.min(distance[i - 1][j], distance[i][j - 1])
    }
  }

  let maxDistance = 0
  for (let i = n; i >= 1; i--) {
    for (let j = n; j >= 1; j--) {
      distance[i][j] = Math.min(
        distance[i][j],
        1 + Math.min(distance[i + 1][j], distance[i][j + 1])
      )
      maxDistance = Math.max(maxDistance, distance[i][j])
    }
  }

  return maxDistance === 0 || maxDistance === Infinity ? -1 : maxDistance
}

grid = [
  [1, 0, 1],
  [0, 0, 0],
  [1, 0, 1],
]
// Output: 2
// Explanation: The cell (1, 1) is as far as possible from all the land with distance 2.

grid = [
  [1, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
]
// Output: 4
// Explanation: The cell (2, 2) is as far as possible from all the land with distance 4.

grid = [
  [1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1],
]
// Output: -1

grid = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
]

console.log(maxDistance_brute(grid))
console.log(maxDistance_bfs(grid))
console.log(maxDistance_dp(grid))
