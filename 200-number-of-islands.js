/**
 * Given an m x n 2D binary grid grid which represents a map of '1's (land) and
 * '0's (water), return the number of islands.
 *
 * An island is surrounded by water and is formed by connecting adjacent lands
 * horizontally or vertically. You may assume all four edges of the grid are all
 * surrounded by water.
 *
 * Constraints:
 *    m == grid.length
 *    n == grid[i].length
 *    1 <= m, n <= 300
 *    grid[i][j] is '0' or '1'.
 */

/**
 * @param {character[][]} grid
 * @return {number}
 */
// Approach #1 DFS
const numIslands_1 = (grid) => {
  if (!grid || grid.length === 0) return 0

  const rows = grid.length
  const cols = grid[0].length

  const dfs = (row, col) => {
    if (
      row < 0 ||
      col < 0 ||
      row >= rows ||
      col >= cols ||
      grid[row][col] === '0'
    )
      return

    grid[row][col] = '0'
    dfs(row - 1, col)
    dfs(row + 1, col)
    dfs(row, col - 1)
    dfs(row, col + 1)
  }

  let islands = 0
  for (let row = 0; row < rows; row++)
    for (let col = 0; col < cols; col++)
      if (grid[row][col] === '1') {
        islands++
        dfs(row, col)
      }
  return islands
}

// Approach #2 BFS
const numIslands_2 = (grid) => {
  if (!grid || grid.length === 0) return 0

  const rows = grid.length
  const cols = grid[0].length

  let islands = 0

  for (let row = 0; row < rows; row++)
    for (let col = 0; col < cols; col++)
      if (grid[row][col] === '1') {
        islands++
        const neighbors = []
        neighbors.push([row, col])
        while (neighbors.length) {
          const [r, c] = neighbors.pop()
          if (r - 1 >= 0 && grid[r - 1][c] === '1') {
            neighbors.push([r - 1, c])
            grid[r - 1][c] = '0'
          }
          if (r + 1 < rows && grid[r + 1][c] === '1') {
            neighbors.push([r + 1, c])
            grid[r + 1][c] = '0'
          }
          if (c - 1 >= 0 && grid[r][c - 1] === '1') {
            neighbors.push([r, c - 1])
            grid[r][c - 1] = '0'
          }
          if (c + 1 < cols && grid[r][c + 1] === '1') {
            neighbors.push([r, c + 1])
            grid[r][c + 1] = '0'
          }
        }
      }
  return islands
}

// Approach #3: Union Find (aka Disjoint Set)
const numIslands = (grid) => {
  if (!grid || grid.length === 0) return 0

  const rows = grid.length
  const cols = grid[0].length

  class UnionFind {
    constructor() {
      this.count = 0
      this.parent = new Array(rows * cols).fill(0)
      this.rank = new Array(rows * cols).fill(0)

      for (let row = 0; row < rows; row++)
        for (let col = 0; col < cols; col++) {
          if (grid[row][col] === '1') {
            this.parent[row * cols + col] = row * cols + col
            this.count++
          }
        }
    }

    find = (i) => {
      if (this.parent[i] != i) this.parent[i] = this.find(this.parent[i])
      return this.parent[i]
    }

    union = (x, y) => {
      let rootX = this.find(x)
      let rootY = this.find(y)
      if (rootX !== rootY) {
        if (this.rank[rootX] > this.rank[rootY]) {
          this.parent[rootY] = rootX
        } else if (this.rank[rootX] < this.rank[rootY]) {
          this.parent[rootX] = rootY
        } else {
          this.parent[rootY] = rootX
          this.rank[rootX] += 1
        }
        this.count--
      }
    }
  }

  const uf = new UnionFind()

  for (let row = 0; row < rows; row++)
    for (let col = 0; col < cols; col++)
      if (grid[row][col] === '1') {
        grid[row][col] = '0'
        if (row - 1 >= 0 && grid[row - 1][col] === '1')
          uf.union(row * cols + col, (row - 1) * cols + col)
        if (row + 1 < rows && grid[row + 1][col] === '1')
          uf.union(row * cols + col, (row + 1) * cols + col)
        if (col - 1 >= 0 && grid[row][col - 1] === '1')
          uf.union(row * cols + col, row * cols + col - 1)
        if (col + 1 < cols && grid[row][col + 1] === '1')
          uf.union(row * cols + col, row * cols + col + 1)
      }

  return uf.count
}

grid = [
  ['1', '1', '1', '1', '0'],
  ['1', '1', '0', '1', '0'],
  ['1', '1', '0', '0', '0'],
  ['0', '0', '0', '0', '0'],
]
// Output: 1

grid = [
  ['1', '1', '0', '0', '0'],
  ['1', '1', '0', '0', '0'],
  ['0', '0', '1', '0', '0'],
  ['0', '0', '0', '1', '1'],
]
// Output: 3

console.log(numIslands(grid))
