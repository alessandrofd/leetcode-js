/**
 * You are given an m x n binary matrix grid, where 0 represents a sea cell
 * and 1 represents a land cell.
 *
 * A move consists of walking from one land cell to another adjacent
 * (4-directionally) land cell or walking off the boundary of the grid.
 *
 * Return the number of land cells in grid for which we cannot walk off the
 * boundary of the grid in any number of moves.
 *
 * Constraints:
 *    m == grid.length
 *    n == grid[i].length
 *    1 <= m, n <= 500
 *    grid[i][j] is either 0 or 1.
 */

/**
 * Problema parecido ao 1254 - Number of closed islands. Vamos aplicar DSU na
 * matriz linearizada. Percorreremos a matriz uma primeira vez em que
 * agruparemos as células válidas outras células válida para trás, acima e
 * à esquerda. Em seguida percorremos as células das bordas da matriz e
 * acrescentamos os grupos às quais as células válidas pertencem, temos que
 * resolver o encadeamento de parentes para isso, a um conjunto. Em seguida,
 * percorremos o miolo da matriz contanto todas as células que não pertencem
 * aos grupos da borda.
 */

/**
 * @param {number[][]} grid
 * @return {number}
 */
const numEnclaves_dsu = (grid) => {
  const rows = grid.length
  const cols = grid[0].length

  const flatten = (row, col) => col + row * cols

  const parent = Array.from(new Array(rows * cols).keys())
  const rank = new Array(rows * cols).fill(1)

  const find = (i) => {
    if (parent[i] === i) return i
    return (parent[i] = find(parent[i]))
  }

  const union = (i, j) => {
    i = find(i)
    j = find(j)

    if (i === j) return false

    if (rank[i] >= rank[j]) {
      parent[j] = i
      rank[i] += rank[j]
    } else {
      parent[i] = j
      rank[j] += rank[i]
    }
    return true
  }

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (grid[row][col] === 1) {
        index = flatten(row, col)
        if (row > 0 && grid[row - 1][col] === 1)
          union(index, flatten(row - 1, col))
        if (col > 0 && grid[row][col - 1] === 1)
          union(index, flatten(row, col - 1))
      }
    }
  }

  borderGroups = new Set()

  for (let row of [0, rows - 1])
    for (let col = 0; col < cols; col++)
      if (grid[row][col] === 1) borderGroups.add(find(flatten(row, col)))

  for (let row = 0; row < rows; row++)
    for (let col of [0, cols - 1])
      if (grid[row][col] === 1) borderGroups.add(find(flatten(row, col)))

  let count = 0
  for (let row = 1; row < rows - 1; row++)
    for (let col = 1; col < cols - 1; col++)
      if (grid[row][col] === 1 && !borderGroups.has(find(flatten(row, col))))
        count++

  return count
}

/**
 * Podemos aplicar DFS ao partir das bordas e visitando todas as células
 * conectadas, marcando-as como inválidas. A seguir percorremos o miolo da
 * matriz e contamos as células válidas.
 */

/**
 * @param {number[][]} grid
 * @return {number}
 */
const numEnclaves_dfs = (grid) => {
  const rows = grid.length
  const cols = grid[0].length

  const dfs = (row, col) => {
    if (
      row < 0 ||
      row >= rows ||
      col < 0 ||
      col >= cols ||
      grid[row][col] !== 1
    )
      return

    grid[row][col] = -1
    dfs(row - 1, col)
    dfs(row, col - 1)
    dfs(row, col + 1)
    dfs(row + 1, col)
  }

  for (let row of [0, rows - 1])
    for (let col = 0; col < cols; col++) dfs(row, col)

  for (let row = 0; row < rows; row++)
    for (let col of [0, cols - 1]) dfs(row, col)

  let count = 0
  for (let row = 1; row < rows - 1; row++)
    for (let col = 1; col < cols - 1; col++) if (grid[row][col] === 1) count++

  return count
}

/**
 * Quanto utilizamos BFS temos que ter o cuidado de marcar a célula como
 * visitada o quanto antes para evitar um enfileiramentos duplicados. Portanto,
 * temos que marcar a célula quando ele é enfileirada, evitando novos
 * enfileiramentos da mesma célula, e não no seu desfileiramento.
 */

/**
 * @param {number[][]} grid
 * @return {number}
 */
const numEnclaves = (grid) => {
  const rows = grid.length
  const cols = grid[0].length

  const bfs = (row, col) => {
    const deltas = [
      [-1, 0],
      [0, -1],
      [0, 1],
      [1, 0],
    ]

    grid[row][col] = -1
    const queue = [[row, col]]

    while (queue.length) {
      const [row, col] = queue.shift()
      for (const [dRow, dCol] of deltas) {
        const newRow = row + dRow
        const newCol = col + dCol
        if (
          newRow >= 0 &&
          newRow < rows &&
          newCol >= 0 &&
          newCol < cols &&
          grid[newRow][newCol] === 1
        ) {
          grid[newRow][newCol] = -1
          queue.push([newRow, newCol])
        }
      }
    }
  }

  for (let row of [0, rows - 1])
    for (let col = 0; col < cols; col++) if (grid[row][col] === 1) bfs(row, col)

  for (let row = 0; row < rows; row++)
    for (let col of [0, cols - 1]) if (grid[row][col] === 1) bfs(row, col)

  let count = 0

  for (let row = 1; row < rows - 1; row++)
    for (let col = 1; col < cols - 1; col++) if (grid[row][col] === 1) count++

  return count
}

grid = [
  [0, 0, 0, 0],
  [1, 0, 1, 0],
  [0, 1, 1, 0],
  [0, 0, 0, 0],
]
// Output: 3

// grid = [
//   [0, 1, 1, 0],
//   [0, 0, 1, 0],
//   [0, 0, 1, 0],
//   [0, 0, 0, 0],
// ]
// Output: 0

console.log(numEnclaves(grid))
