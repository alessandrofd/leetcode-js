/**
 * There is a bi-directional graph with n vertices, where each vertex is labeled
 * from 0 to n - 1 (inclusive). The edges in the graph are represented as a 2D
 * integer array edges, where each edges[i] = [ui, vi] denotes a bi-directional
 * edge between vertex ui and vertex vi. Every vertex pair is connected by at
 * most one edge, and no vertex has an edge to itself.
 *
 * You want to determine if there is a valid path that exists from vertex source
 * to vertex destination.
 *
 * Given edges and the integers n, source, and destination, return true if there
 * is a valid path from source to destination, or false otherwise.
 *
 * Constraints:
 *    1 <= n <= 2 * 10^5
 *    0 <= edges.length <= 2 * 10^5
 *    edges[i].length == 2
 *    0 <= ui, vi <= n - 1
 *    ui != vi
 *    0 <= source, destination <= n - 1
 *    There are no duplicate edges.
 *    There are no self edges.
 */

/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number} source
 * @param {number} destination
 * @return {boolean}
 */
// Approach 1: Breadth First Search (BFS)
const validPath_BFS = (n, edges, source, destination) => {
  const adjs = new Array(n).fill().map((_) => [])
  for (const [u, v] of edges) {
    adjs[u].push(v)
    adjs[v].push(u)
  }

  const visited = new Set()
  const queue = [source]
  while (queue.length) {
    const node = queue.shift()
    if (node === destination) return true
    if (visited.has(node)) continue
    visited.add(node)
    for (const adj of adjs[node]) queue.push(adj)
  }

  return false
}

// Approach 2: Depth First Search (DFS): Recursive
const validPath_DFS = (n, edges, source, destination) => {
  const adjs = new Array(n).fill().map((_) => [])
  for (const [u, v] of edges) {
    adjs[u].push(v)
    adjs[v].push(u)
  }

  const dfs = (node, visited) => {
    if (node === destination) return true
    if (visited.has(node)) return false
    visited.add(node)
    for (const adj of adjs[node]) if (dfs(adj, visited)) return true
    return false
  }

  return dfs(source, new Set())
}

n = 3
edges = [
  [0, 1],
  [1, 2],
  [2, 0],
]
source = 0
destination = 2
// Output: true

n = 6
edges = [
  [0, 1],
  [0, 2],
  [3, 5],
  [5, 4],
  [4, 3],
]
source = 0
destination = 5
// Output: false

n = 1
edges = []
source = 0
destination = 0
// Output: true

console.log(validPath_BFS(n, edges, source, destination))
console.log(validPath_DFS(n, edges, source, destination))
