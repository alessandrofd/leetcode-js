/**
 * You are given an array points representing integer coordinates of some points
 * on a 2D-plane, where points[i] = [xi, yi]
 *
 * The cost of connecting two points [xi, yi] and [xj, yj] is the manhattan
 * distance between them: |xi - xj| + |yi - yj|, where |val| denotes the
 * absolute value of val.
 *
 * Return the minimum cost to make all points connected. All points are
 * connected if there is exactly one simple path between any two points.
 *
 * Constraints:
 *    1 <= points.length <= 1000
 *    -10^6 <= xi, yi <= 10^6
 *    All pairs (xi, yi) are distinct.
 */

// Aplicação do algoritmo de Kruskal
/**
 * @param {number[][]} points
 * @return {number}
 */
const minCostConnectPoints_kruskal = (points) => {}

/**
 * Aplicação do algoritmo de Prim
 *
 * The algorithm starts with an empty spanning tree. The idea is to maintain two
 * sets of vertices. The first set contains the vertices already included in the
 * MST, and the other set contains the vertices not yet included. At every step,
 * it considers all the edges that connect the two sets and picks the minimum
 * weight edge from these edges. After picking the edge, it moves the other
 * endpoint of the edge to the set containing MST.
 */
/**
 * @param {number[][]} points
 * @return {number}
 */
const minCostConnectPoints_prim = (points) => {}

/**
 * @param {number[][]} points
 * @return {number}
 */
const minCostConnectPoints_prim_cached = (points) => {
  // Aplicação do algoritmo de Prim com as distâncias cacheadas. Escolhemos
  // arbitrariament um nó, no nosso caso 0, para iniciar a árvore. Percorremos
  // todos os outros nós e calculamos a distância entre eles e a árvore. Esta é
  // uma distinção importante, calculamos, e armazenamos, a menor distância entre
  // um nó desconectado e a árvore e não a distância entre nós. Isto torna
  // desnecessário um laço entre os nós conectados e outro entre os desconectados.
  // Basta que calculemos a distância entre o último nó a se conectar à árvore e
  // cada um dos nós ainda desconectados. Caso a nova distância seja menor que a
  // distância calculada anteriormente, passamos a considerá-lo como a distância
  // entre o nó e a árvore. O nó mais próximo da árvore passa a ser o último nó
  // conectado à árvore. Repetimos estes passos até que não haja mais nós
  // desconectados.
}

points = [
  [0, 0],
  [2, 2],
  [3, 10],
  [5, 2],
  [7, 0],
]
// Expected: 20

points = [
  [3, 12],
  [-2, 5],
  [-4, 1],
]
// Expected: 18

points = [
  [0, 0],
  [1, 1],
  [1, 0],
  [-1, 1],
]
// Expected: 4

console.log(minCostConnectPoints_kruskal(points))
console.log(minCostConnectPoints_prim(points))
console.log(minCostConnectPoints_prim_cached(points))
