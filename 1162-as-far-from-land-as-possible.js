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
const maxDistance_brute = (grid) => {}

// BFS
const maxDistance_bfs = (grid) => {}

//DP
const maxDistance_dp = (grid) => {}

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
