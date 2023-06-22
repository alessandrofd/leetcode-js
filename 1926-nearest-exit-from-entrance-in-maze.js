/**
 * You are given an m x n matrix maze (0-indexed) with empty cells (represented
 * as '.') and walls (represented as '+'). You are also given the entrance of
 * the maze, where entrance = [entrancerow, entrancecol] denotes the row and
 * column of the cell you are initially standing at.
 *
 * In one step, you can move one cell up, down, left, or right. You cannot step
 * into a cell with a wall, and you cannot step outside the maze. Your goal is
 * to find the nearest exit from the entrance. An exit is defined as an empty
 * cell that is at the border of the maze. The entrance does not count as an
 * exit.
 *
 * Return the number of steps in the shortest path from the entrance to the
 * nearest exit, or -1 if no such path exists.
 *
 * Constraints:
 *    maze.length == m
 *    maze[i].length == n
 *    1 <= m, n <= 100
 *    maze[i][j] is either '.' or '+'.
 *    entrance.length == 2
 *    0 <= entrancerow < m
 *    0 <= entrancecol < n
 *    entrance will always be an empty cell.
 */

/**
 * @param {character[][]} maze
 * @param {number[]} entrance
 * @return {number}
 */

// Approach 1: Breadth First Search (BFS)
const nearestExit_bfs = (maze, [startCol, startRow]) => {
  const rows = maze.length
  const cols = maze[0].length
  const dirs = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ]
  maze[startCol][startRow] = '+'
  const queue = [[startCol, startRow, 0]]

  while (queue.length) {
    const [row, col, distance] = queue.shift()
    for (const [dRow, dCol] of dirs) {
      const nextRow = row + dRow
      const nextCol = col + dCol
      if (
        nextRow >= 0 &&
        nextRow < rows &&
        nextCol >= 0 &&
        nextCol < cols &&
        maze[nextRow][nextCol] === '.'
      ) {
        if (
          nextRow === 0 ||
          nextRow === rows - 1 ||
          nextCol === 0 ||
          nextCol === cols - 1
        )
          return distance + 1
        maze[nextRow][nextCol] = '+'
        queue.push([nextRow, nextCol, distance + 1])
      }
    }
  }
  return -1
}

// Top submission - BFS with a few improvements
const nearestExit = (maze, entrance) => {
  const rows = maze.length
  const cols = maze[0].length
  const dirs = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ]

  const queue = [[...entrance, 0]]
  while (queue.length) {
    const [row, col, distance] = queue.shift()
    if (maze[row][col] === '+') continue
    maze[row][col] = '+'
    for (const [dRow, dCol] of dirs) {
      const newRow = row + dRow
      const newCol = col + dCol
      if (
        newRow >= 0 &&
        newRow < rows &&
        newCol >= 0 &&
        newCol < cols &&
        maze[newRow][newCol] === '.'
      ) {
        if (
          newRow === 0 ||
          newRow === rows - 1 ||
          newCol === 0 ||
          newCol === cols - 1
        )
          return distance + 1
        queue.push([newRow, newCol, distance + 1])
      }
    }
  }
  return -1
}

maze = [
  ['+', '+', '+'],
  ['.', '.', '.'],
  ['+', '+', '+'],
]
entrance = [1, 0]
// Output: 2

maze = [['.', '+']]
entrance = [0, 0]
// Output: -1

console.log(nearestExit(maze, entrance))
