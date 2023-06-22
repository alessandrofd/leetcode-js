/**
 * There are n cities numbered from 0 to n - 1 and n - 1 roads such that there
 * is only one way to travel between two different cities (this network form
 * a tree). Last year, The ministry of transport decided to orient the roads in
 * one direction because they are too narrow.
 *
 * Roads are represented by connections where connections[i] = [ai, bi]
 * represents a road from city ai to city bi.
 *
 * This year, there will be a big event in the capital (city 0), and many people
 * want to travel to this city.
 *
 * Your task consists of reorienting some roads such that each city can visit
 * the city 0. Return the minimum number of edges changed.
 *
 * It's guaranteed that each city can reach city 0 after reorder.
 *
 * Constraints:
 *    2 <= n <= 5 * 10^4
 *    connections.length == n - 1
 *    connections[i].length == 2
 *    0 <= ai, bi <= n - 1
 *    ai != bi
 */

/**
 * O fato de haver apenas um caminho entre duas cidades, permite que tratemos o grafo como uma árvore. Ao percorrer a árvore, toda vez que encontrarmos uma aresta que não "aponte" para baixo, devemos alterar a sua direção.
 */

/**
 * @param {number} numCities
 * @param {number[][]} connections
 * @return {number}
 */
const minReorder = (numCities, connections) => {
  const tree = new Array(numCities).fill(0).map(() => [])
  for (const [u, v] of connections) {
    tree[u].push([v, false])
    tree[v].push([u, true])
  }

  let reorientedRoads = 0

  const dfs = (node, parent) => {
    for (const [next, oriented] of tree[node]) {
      if (next !== parent) {
        if (!oriented) reorientedRoads++
        dfs(next, node)
      }
    }
  }

  dfs(0, -1)
  return reorientedRoads
}

numCities = 6
connections = [
  [0, 1],
  [1, 3],
  [2, 3],
  [4, 0],
  [4, 5],
]
// Output: 3

// numCities = 5
// connections = [
//   [1, 0],
//   [1, 2],
//   [3, 2],
//   [3, 4],
// ]
// Output: 2

// numCities = 3
// connections = [
//   [1, 0],
//   [2, 0],
// ]
// Output: 0

console.log(minReorder(numCities, connections))
