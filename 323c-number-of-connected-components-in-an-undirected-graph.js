/**
 * You have a graph of n nodes. You are given an integer n and an array edges
 * where edges[i] = [ai, bi] indicates that there is an edge between ai and bi
 * in the graph.
 *
 * Return the number of connected components in the graph.
 *
 * Constraints:
 *    1 <= n <= 2000
 *    1 <= edges.length <= 5000
 *    edges[i].length == 2
 *    0 <= ai <= bi < n
 *    ai != bi
 *    There are no repeated edges.
 */

/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number}
 */
// Approach 1: Depth-First Search (DFS)
// const countComponents = (n, edges) => {
const countComponents_dfs = (n, edges) => {
  const adjacents = new Array(n).fill().map((_) => [])
  for (const [node1, node2] of edges) {
    adjacents[node1].push(node2)
    adjacents[node2].push(node1)
  }

  const visited = new Array(n).fill(false)

  const visit = (node) => {
    visited[node] = true
    for (const adjacent of adjacents[node])
      if (!visited[adjacent]) visit(adjacent)
  }

  let components = 0
  for (let node = 0; node < n; node++)
    if (!visited[node]) {
      components++
      visit(node)
    }
  return components
}

// Approach 2: Disjoint Set Union (DSU)
const countComponents = (n, edges) => {
  // const countComponents_DSU = (n, edges) => {
  const reps = Array.from(new Array(n).keys())
  const sizes = new Array(n).fill(1)

  const find = (node) => {
    if (node === reps[node]) return node
    return (reps[node] = find(reps[node]))
  }

  const combine = ([node1, node2]) => {
    node1 = find(node1)
    node2 = find(node2)

    if (node1 === node2) return 0

    if (sizes[node1] > sizes[node2]) {
      sizes[node1] += sizes[node2]
      reps[node2] = node1
    } else {
      sizes[node2] += sizes[node1]
      reps[node1] = node2
    }

    return 1
  }

  let comps = n
  for (const edge of edges) comps -= combine(edge)
  return comps
}

n = 5
edges = [
  [0, 1],
  [1, 2],
  [3, 4],
]
// Output: 2

// n = 5
// edges = [
//   [0, 1],
//   [1, 2],
//   [2, 3],
//   [3, 4],
// ]
// Output: 1

// n = 5
// edges = [
//   [0, 1],
//   [1, 2],
//   [0, 2],
//   [3, 4],
// ]
// Output: 2

// n = 4
// edges = [
//   [0, 1],
//   [2, 3],
//   [1, 2],
// ]
// Output: 1

// n = 6
// edges = [
//   [0, 1],
//   [0, 2],
//   [2, 5],
//   [3, 4],
//   [3, 5],
// ]
// Output: 1

console.log(countComponents(n, edges))
