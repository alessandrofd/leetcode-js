/**
 * You have a 2-D grid of size m x n representing a box, and you have n balls.
 * The box is open on the top and bottom sides.
 *
 * Each cell in the box has a diagonal board spanning two corners of the cell
 * that can redirect a ball to the right or to the left.
 *
 *    A board that redirects the ball to the right spans the top-left corner to
 *    the bottom-right corner and is represented in the grid as 1.
 *
 *    A board that redirects the ball to the left spans the top-right corner to
 *    the bottom-left corner and is represented in the grid as -1.
 *
 * We drop one ball at the top of each column of the box. Each ball can get
 * stuck in the box or fall out of the bottom. A ball gets stuck if it hits a
 * "V" shaped pattern between two boards or if a board redirects the ball into
 * either wall of the box.
 *
 * Return an array answer of size n where answer[i] is the column that the ball
 * falls out of at the bottom after dropping the ball from the ith column at the
 * top, or -1 if the ball gets stuck in the box.
 *
 * Constraints:
 *    m == grid.length
 *    n == grid[i].length
 *    1 <= m, n <= 100
 *    grid[i][j] is 1 or -1.
 */

/**
 * @param {number[][]} grid
 * @return {number[]}
 */
// Approach 1: Depth First Search (DFS)
const findBall_1 = (grid) => {
  const dfs = (row, col) => {
    if (row === grid.length) return col

    const nextCol = col + grid[row][col]
    if (
      nextCol >= 0 &&
      nextCol < grid[0].length &&
      grid[row][col] === grid[row][nextCol]
    )
      return dfs(row + 1, nextCol)
    else return -1
  }

  const result = new Array(grid[0].length)
  for (let i = 0; i < result.length; i++) result[i] = dfs(0, i)
  return result
}

// Approach 2: Dynamic Programming Approach
const findBall = (grid) => {
  const result = new Array(grid[0].length)
  const memo = new Array(grid.length + 1)
    .fill()
    .map((_) => new Array(grid[0].length))

  for (let row = grid.length; row >= 0; row--) {
    for (let col = 0; col < grid[0].length; col++) {
      if (row === grid.length) {
        memo[row][col] = col
        continue
      }

      const nextCol = col + grid[row][col]

      if (
        nextCol >= 0 &&
        nextCol < grid[0].length &&
        grid[row][col] === grid[row][nextCol]
      )
        memo[row][col] = memo[row + 1][nextCol]
      else memo[row][col] = -1

      if (row === 0) result[col] = memo[row][col]
    }
  }
  return result
}

grid = [
  [1, 1, 1, -1, -1],
  [1, 1, 1, -1, -1],
  [-1, -1, -1, 1, 1],
  [1, 1, 1, 1, -1],
  [-1, -1, -1, -1, -1],
]
// Output: [1, -1, -1, -1, -1]

grid = [[-1]]
// Output: [-1]

grid = [
  [1, 1, 1, 1, 1, 1],
  [-1, -1, -1, -1, -1, -1],
  [1, 1, 1, 1, 1, 1],
  [-1, -1, -1, -1, -1, -1],
]
// Output: [0, 1, 2, 3, 4, -1]

console.log(findBall(grid))
