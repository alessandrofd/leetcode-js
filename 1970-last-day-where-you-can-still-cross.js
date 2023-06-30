/**
 * There is a 1-based binary matrix where 0 represents land and 1 represents
 * water. You are given integers row and col representing the number of rows and
 * columns in the matrix, respectively.
 *
 * Initially on day 0, the entire matrix is land. However, each day a new cell
 * becomes flooded with water. You are given a 1-based 2D array cells, where
 * cells[i] = [ri, ci] represents that on the ith day, the cell on the rith row
 * and cith column (1-based coordinates) will be covered with water
 * (i.e., changed to 1).
 *
 * You want to find the last day that it is possible to walk from the top to
 * the bottom by only walking on land cells. You can start from any cell in
 * the top row and end at any cell in the bottom row. You can only travel in
 * the four cardinal directions (left, right, up, and down).
 *
 * Return the last day where it is possible to walk from the top to the bottom
 * by only walking on land cells.
 *
 * Constraints:
 *    2 <= row, col <= 2 * 10^4
 *    4 <= row * col <= 2 * 10^4
 *    cells.length == row * col
 *    1 <= ri <= row
 *    1 <= ci <= col
 *    All the values of cells are unique.
 */

// BFS. Como todas as células na primeira fila são pontos de partida válido,
// incluímos todas elas na fila ao mesmo tempo.

/**
 * @param {number} row
 * @param {number} col
 * @param {number[][]} cells
 * @return {number}
 */
var latestDayToCross_BFS_binSearch = function (rows, cols, cells) {
  const days = cells.length
  const canCross = (day) => {
    // prettier-ignore
    const moves = [ [-1, 0], [0, 1], [1, 0], [0, -1], ]

    const grid = Array.from(Array(rows), () => Array(cols).fill(0))
    for (let i = 0; i < day; i++) grid[cells[i][0] - 1][cells[i][1] - 1] = 1

    const queue = []
    for (let i = 0; i < cols; i++) if (grid[0][i] === 0) queue.push([0, i])

    while (queue.length > 0) {
      const [row, col] = queue.shift()
      if (
        row < 0 ||
        row >= rows ||
        col < 0 ||
        col >= cols ||
        grid[row][col] === 1
      )
        continue

      if (row === rows - 1) return true

      grid[row][col] = 1

      for (const [moveRow, moveCol] of moves)
        queue.push([row + moveRow, col + moveCol])
    }

    return false
  }

  let lo = 1
  let hi = days
  while (lo < hi) {
    const mid = Math.floor((lo + hi) / 2)
    if (canCross(mid)) lo = mid + 1
    else hi = mid
  }

  return lo - 1
}

/**
 * @param {number} row
 * @param {number} col
 * @param {number[][]} cells
 * @return {number}
 */
var latestDayToCross_DFS_binSearch = function (rows, cols, cells) {
  const days = cells.length

  const canCross = (day) => {
    // prettier-ignore
    const moves = [ [-1, 0], [0, 1], [1, 0], [0, -1], ]

    const grid = Array.from(Array(rows), () => Array(cols).fill(0))
    for (let i = 0; i < day; i++) grid[cells[i][0] - 1][cells[i][1] - 1] = 1

    const visit = (row, col) => {
      if (
        row < 0 ||
        row >= rows ||
        col < 0 ||
        col >= cols ||
        grid[row][col] === 1
      )
        return false

      if (row === rows - 1) return true

      grid[row][col] = 1

      for (const [moveRow, moveCol] of moves)
        if (visit(row + moveRow, col + moveCol)) return true

      return false
    }

    for (let i = 0; i < cols; i++)
      if (grid[0][i] === 0 && visit(0, i)) return true

    return false
  }

  let lo = 1
  let hi = days
  while (lo < hi) {
    const mid = Math.floor((lo + hi) / 2)
    if (canCross(mid)) lo = mid + 1
    else hi = mid
  }

  return lo - 1
}

/**
 * @param {number} row
 * @param {number} col
 * @param {number[][]} cells
 * @return {number}
 */
const latestDayToCross_DSU_binSearch = function (rows, cols, cells) {
  const days = cells.length

  const canCross = (day) => {
    const reps = Array.from(Array(rows * cols).keys())
    const sizes = Array(rows * cols).fill(1)

    const find = (i) => {
      if (i === reps[i]) return i
      return (reps[i] = find(reps[i]))
    }

    const union = (i, j) => {
      i = find(i)
      j = find(j)

      if (i === j) return

      if (sizes[i] > sizes[j]) {
        sizes[i] += sizes[j]
        reps[j] = i
      } else {
        sizes[j] += sizes[i]
        reps[i] = j
      }
    }

    const grid = Array.from(Array(rows), () => Array(cols).fill(0))
    for (let i = 0; i < day; i++) grid[cells[i][0] - 1][cells[i][1] - 1] = 1

    // prettier-ignore
    const moves = [ [0, 1], [1, 0] ]

    for (let row = 0; row < rows; row++)
      for (let col = 0; col < cols; col++) {
        if (grid[row][col] === 1) continue
        for (const [moveRow, moveCol] of moves) {
          const [nextRow, nextCol] = [row + moveRow, col + moveCol]
          if (
            nextRow < 0 ||
            nextRow >= rows ||
            nextCol < 0 ||
            nextCol >= cols ||
            grid[nextRow][nextCol] === 1
          )
            continue
          union(row * cols + col, nextRow * cols + nextCol)
        }
      }

    for (let i = 0; i < cols; i++)
      for (let j = (rows - 1) * cols; j < rows * cols; j++)
        if (find(i) === find(j)) return true

    return false
  }

  let lo = 1
  let hi = days
  while (lo < hi) {
    const mid = Math.floor((lo + hi) / 2)
    if (canCross(mid)) lo = mid + 1
    else hi = mid
  }

  return lo - 1
}

/**
 * @param {number} row
 * @param {number} col
 * @param {number[][]} cells
 * @return {number}
 */
const latestDayToCross_DSU_waterCells_distance = function (rows, cols, cells) {
  const days = cells.length

  const reps = Array.from(Array(rows * cols + 2).keys())
  const sizes = Array(rows * cols + 2).fill(1)

  const find = (i) => {
    if (i === reps[i]) return i
    return (reps[i] = find(reps[i]))
  }

  const union = (i, j) => {
    i = find(i)
    j = find(j)

    if (i === j) return

    if (sizes[i] > sizes[j]) {
      sizes[i] += sizes[j]
      reps[j] = i
    } else {
      sizes[j] += sizes[i]
      reps[i] = j
    }
  }

  const leftMargin = 0
  const rightMargin = rows * cols + 1

  for (let i = 0; i < days; i++) {
    const [row, col] = cells[i]
    // menos 1 pois as células são 1-based, mais 1 para dar espaço para
    // a margem esquerda - célula 0
    const cell = (row - 1) * cols + col // - 1 + 1
    for (let j = 0; j < i; j++) {
      const [prevRow, prevCol] = cells[j]
      if (Math.abs(row - prevRow) <= 1 && Math.abs(col - prevCol) <= 1) {
        const prevCell = (prevRow - 1) * cols + prevCol
        union(cell, prevCell)
      }
    }
    if (col === 1) union(leftMargin, cell)
    if (col === cols) union(rightMargin, cell)
    // As duas margens se conectaram
    if (find(leftMargin) === find(rightMargin)) return i
  }
}

/**
 * @param {number} row
 * @param {number} col
 * @param {number[][]} cells
 * @return {number}
 */
const latestDayToCross_DSU_waterCells_grid = function (rows, cols, cells) {
  const days = cells.length

  const reps = Array.from(Array(rows * cols + 2).keys())
  const sizes = Array(rows * cols + 2).fill(1)

  const find = (i) => {
    if (i === reps[i]) return i
    return (reps[i] = find(reps[i]))
  }

  const union = (i, j) => {
    i = find(i)
    j = find(j)

    if (i === j) return

    if (sizes[i] > sizes[j]) {
      sizes[i] += sizes[j]
      reps[j] = i
    } else {
      sizes[j] += sizes[i]
      reps[i] = j
    }
  }

  const leftMargin = 0
  const rightMargin = rows * cols + 1

  const grid = Array.from(Array(rows), () => Array(cols).fill(0))

  // prettier-ignore
  const moves = [ [-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1] ]

  for (let i = 0; i < days; i++) {
    const [row, col] = [cells[i][0] - 1, cells[i][1] - 1]
    grid[row][col] = 1
    const cell = row * cols + col + 1 // mais 1 para dar espaço para a margem esquerda

    for (const [moveRow, moveCol] of moves) {
      const [neighborRow, neighborCol] = [row + moveRow, col + moveCol]
      if (
        neighborRow < 0 ||
        neighborRow >= rows ||
        neighborCol < 0 ||
        neighborCol >= cols ||
        grid[neighborRow][neighborCol] === 0
      )
        continue

      const neighborCell = neighborRow * cols + neighborCol + 1
      union(cell, neighborCell)
    }

    if (col === 0) union(leftMargin, cell)
    if (col === cols - 1) union(rightMargin, cell)
    // As duas margens se conectaram
    if (find(leftMargin) === find(rightMargin)) return i
  }
  return -1
}

row = 2
col = 2
// prettier-ignore
cells = [ [1, 1], [2, 1], [1, 2], [2, 2], ]
//Expected: 2

row = 2
col = 2
// prettier-ignore
cells = [ [1, 1], [1, 2], [2, 1], [2, 2], ]
//Expected: 1

row = 3
col = 3
// prettier-ignore
cells = [ [1, 2], [2, 1], [3, 3], [2, 2], [1, 1], [1, 3], [2, 3], [3, 2], [3, 1], ]
//Expected: 3

row = 6
;(col = 2),
  // prettier-ignore
  cells = [ [4, 2], [6, 2], [2, 1], [4, 1], [6, 1], [3, 1], [2, 2], [3, 2], [1, 1], [5, 1], [5, 2], [1, 2], ]
//Expected: 3

console.log(latestDayToCross_BFS_binSearch(row, col, cells))
console.log(latestDayToCross_DFS_binSearch(row, col, cells))
console.log(latestDayToCross_DSU_binSearch(row, col, cells))
console.log(latestDayToCross_DSU_waterCells_distance(row, col, cells))
console.log(latestDayToCross_DSU_waterCells_grid(row, col, cells))
