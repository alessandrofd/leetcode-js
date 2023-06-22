/**
 * There is an m x n rectangular island that borders both the Pacific Ocean and
 * Atlantic Ocean. The Pacific Ocean touches the island's left and top edges,
 * and the Atlantic Ocean touches the island's right and bottom edges.
 *
 * The island is partitioned into a grid of square cells. You are given an m x n
 * integer matrix heights where heights[r][c] represents the height above sea
 * level of the cell at coordinate (r, c).
 *
 * The island receives a lot of rain, and the rain water can flow to neighboring
 * cells directly north, south, east, and west if the neighboring cell's height
 * is less than or equal to the current cell's height. Water can flow from any
 * cell adjacent to an ocean into the ocean.
 *
 * Return a 2D list of grid coordinates result where result[i] = [ri, ci]
 * denotes that rain water can flow from cell (ri, ci) to both the Pacific and
 * Atlantic oceans.
 *
 * Constraints:]
 *    m == heights.length
 *    n == heights[r].length
 *    1 <= m, n <= 200
 *    0 <= heights[r][c] <= 10^5
 */

/**
 * @param {number[][]} heights
 * @return {number[][]}
 */
// Approach 1: Breadth First Search (BFS)
const pacificAtlantic_1 = (heights) => {
  const directions = [
    [0, 1],
    [1, 0],
    [-1, 0],
    [0, -1],
  ]

  const rows = heights.length
  const cols = heights[0]?.length
  if (!rows || !cols) return []

  const bfs = (queue) => {
    const reachable = new Array(rows)
      .fill()
      .map((x) => new Array(cols).fill(false))
    while (queue.length) {
      const cell = queue.shift()
      // This cell is reachable so mark it
      reachable[cell[0]][cell[1]] = true
      // Check all 4 directions
      for (const direction of directions) {
        const row = cell[0] + direction[0]
        const col = cell[1] + direction[1]
        // Check if new cell is within bounds
        if (row < 0 || row >= rows || col < 0 || col >= cols) continue
        // Check that the new cell hasn't already been visited
        if (reachable[row][col]) continue
        // Check that the new cell has a higer or equal height,
        // so that water can flow from the new cell to the old cell
        if (heights[row][col] < heights[cell[0]][cell[1]]) continue
        // If we've gotten this far, that means the new cell is reachable
        queue.push([row, col])
      }
    }
    return reachable
  }

  // Setup each queue with cells adjacent to their respective ocean
  const pacificQueue = []
  const atlanticQueue = []
  for (let row = 0; row < rows; row++) {
    pacificQueue.push([row, 0])
    atlanticQueue.push([row, cols - 1])
  }
  for (let col = 0; col < cols; col++) {
    pacificQueue.push([0, col])
    atlanticQueue.push([rows - 1, col])
  }

  // Perform a BFS for each ocean to find all cells accessible by each ocean
  const pacificReachable = bfs(pacificQueue)
  const atlanticReachable = bfs(atlanticQueue)

  // Find all cells that can reach both oceans
  const commonCells = []
  for (let row = 0; row < rows; row++)
    for (let col = 0; col < cols; col++)
      if (pacificReachable[row][col] && atlanticReachable[row][col])
        commonCells.push([row, col])

  return commonCells
}

// Approach 2: Depth First Search (DFS)
const pacificAtlantic = (heights) => {
  const directions = [
    [0, 1],
    [1, 0],
    [-1, 0],
    [0, -1],
  ]

  const rows = heights.length
  const cols = heights[0]?.length
  if (!rows || !cols) return []

  const dfs = (row, col, reachable) => {
    // This cell is reachable, so mark it
    reachable[row][col] = true
    for (const direction of directions) {
      const newRow = row + direction[0]
      const newCol = col + direction[1]
      // Check if new cell is within bounds
      if (newRow < 0 || newRow >= rows || newCol < 0 || newCol >= cols) continue
      // Check that the new cell hasn't already been visited
      if (reachable[newRow][newCol]) continue
      // Check that the new cell has a higer or equal height,
      // so that water can flow from the new cell to the old cell
      if (heights[newRow][newCol] < heights[row][col]) continue
      // If we've gotten this far, that means that the new cell is reachable
      dfs(newRow, newCol, reachable)
    }
  }

  const pacific = new Array(rows).fill().map(_, new Array(cols).fill(false))
  const atlantic = new Array(rows).fill().map(_, new Array(cols).fill(false))

  // Loop through each cell adjacent to the oceans and start a DFS
  for (let row = 0; row < rows; row++) {
    dfs(row, 0, pacific)
    dfs(row, cols - 1, atlantic)
  }
  for (let col = 0; col < cols; col++) {
    dfs(0, col, pacific)
    dfs(rows - 1, col, atlantic)
  }

  // Find all cells that can reach both oceans
  const common = []
  for (let row = 0; row < rows; row++)
    for (let col = 0; col < cols; col++)
      if (pacific[row][col] && atlantic[row][col]) common.push([row, col])

  return common
}

heights = [
  [1, 2, 2, 3, 5],
  [3, 2, 3, 4, 4],
  [2, 4, 5, 3, 1],
  [6, 7, 1, 4, 5],
  [5, 1, 1, 2, 4],
]
// Output: [
//   [0, 4],
//   [1, 3],
//   [1, 4],
//   [2, 2],
//   [3, 0],
//   [3, 1],
//   [4, 0],
// ]

// heights = [[1]]
// Output: [[0, 0]]

console.log(pacificAtlantic(heights))
