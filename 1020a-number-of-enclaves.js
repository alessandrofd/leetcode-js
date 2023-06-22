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
const numEnclaves_dsu = (grid) => {}

/**
 * Podemos aplicar DFS ao partir das bordas e visitando todas as células
 * conectadas, marcando-as como inválidas. A seguir percorremos o miolo da
 * matriz e contamos as células válidas.
 */

/**
 * @param {number[][]} grid
 * @return {number}
 */
const numEnclaves_dfs = (grid) => {}

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
const numEnclaves_bfs = (grid) => {}

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
