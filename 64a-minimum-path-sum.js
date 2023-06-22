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
const minPathSum_bfs = (grid) => {}

/**
 * Não precisamos da fila nem do vetor para controlar os nós já visitados.
 * Podemos simplesmente percorrer a matriz na direção permitida que os caminhos
 * que levam ao próximo nó já terão sido percorridos.
 */

const minPathSum_dp = (grid) => {}

grid = [
  [1, 3, 1],
  [1, 5, 1],
  [4, 2, 1],
]
// Output: 7

// grid = [
//   [1, 2, 3],
//   [4, 5, 6],
// ]
// Output: 12

// console.log(minPathSum_bfs(grid))
console.log(minPathSum_dp(grid))
