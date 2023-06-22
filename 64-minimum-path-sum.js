/**
 * Given a m x n grid filled with non-negative numbers, find a path from top
 * left to bottom right, which minimizes the sum of all numbers along its path.
 *
 * Note: You can only move either down or right at any point in time.
 *
 * Constraints:
 *    m == grid.length
 *    n == grid[i].length
 *    1 <= m, n <= 200
 *    0 <= grid[i][j] <= 100
 */

/**
 * Podemos reduzir a matriz a um grafo e percorrer o grafo da esquerda para
 * direita e de cima para baixo até atingir o seu ponto final. Como o próprio
 * enunciado do problema estabelece, podemos nos mover na matriz em um único
 * sentido - isto torna o grafo resultante dirigido e, neste caso, dada a
 * estrutura da matriz, acíclico.
 *
 * A melhor estratégia para percorrer o grafo é o BFS, pois garantirá que todos
 * os caminhos que antecedem um nó já tenham sido percorridos ao analisá-lo.
 * Mas como há mais de um caminho que leva a um nó, podemos controlar se este
 * já está na fila de processamento.
 */

/**
 * @param {number[][]} grid
 * @return {number}
 */
const minPathSum_bfs = (grid) => {
  const rows = grid.length
  const cols = grid[0].length

  const visited = new Array(rows).fill().map((_) => new Array(cols).fill(false))

  const queue = [[0, 0]]
  while (queue.length) {
    const [row, col] = queue.shift()
    if (visited[row][col]) continue
    visited[row][col] = true

    const shortest = Math.min(
      row > 0 ? grid[row - 1][col] : Infinity,
      col > 0 ? grid[row][col - 1] : Infinity
    )

    grid[row][col] = (shortest === Infinity ? 0 : shortest) + grid[row][col]

    if (row < rows - 1) queue.push([row + 1, col])
    if (col < cols - 1) queue.push([row, col + 1])
  }

  return grid[rows - 1][cols - 1]
}

/**
 * Não precisamos da fila nem do vetor para controlar os nós já visitados.
 * Podemos simplesmente percorrer a matriz na direção permitida que os caminhos
 * que levam ao próximo nó já terão sido percorridos.
 */

const minPathSum_dp = (grid) => {
  const rows = grid.length
  const cols = grid[0].length

  let sumRows = 0
  for (let row = 0; row < rows; row++) {
    sumRows += grid[row][0]
    grid[row][0] = sumRows
  }

  let sumCols = 0
  for (let col = 0; col < cols; col++) {
    sumCols += grid[0][col]
    grid[0][col] = sumCols
  }

  for (let row = 1; row < rows; row++) {
    for (let col = 1; col < cols; col++) {
      const shortest = Math.min(grid[row - 1][col], grid[row][col - 1])
      grid[row][col] = shortest + grid[row][col]
    }
  }
  return grid[rows - 1][cols - 1]
}

grid = [
  [1, 3, 1],
  [1, 5, 1],
  [4, 2, 1],
]
// Output: 7

grid = [
  [1, 2, 3],
  [4, 5, 6],
]
// Output: 12

// console.log(minPathSum_bfs(grid))
console.log(minPathSum_dp(grid))
