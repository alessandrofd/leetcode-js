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
const countComponents_dfs = (n, edges) => {
  // const countComponents = (n, edges) => {
  const adjacents = new Array(n).fill().map((_) => [])
  for (const [v1, v2] of edges) {
    adjacents[v1].push(v2)
    adjacents[v2].push(v1)
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

// Approach 2: Disjoint Set Union (DSU) - Union-Find
const countComponents = (n, edges) => {
  // const countComponents_DSU = (n, edges) => {
  const reps = Array.from(new Array(n).keys())
  const sizes = new Array(n).fill(1)

  const find = (i) => {
    if (i === reps[i]) return i
    return (reps[i] = find(reps[i]))
  }

  combine = (left, right) => {
    left = find(left)
    right = find(right)

    if (left === right) return 0

    if (sizes[left] > sizes[right]) {
      sizes[left] += sizes[right]
      reps[right] = left
    } else {
      sizes[right] += sizes[left]
      reps[left] = right
    }
    return 1
  }
  let components = n
  for (const [left, right] of edges) components -= combine(left, right)
  return components
}

n = 5
edges = [
  [0, 1],
  [1, 2],
  [3, 4],
]
// Output: 2

n = 5
edges = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
]
// Output: 1

n = 5
edges = [
  [0, 1],
  [1, 2],
  [0, 2],
  [3, 4],
]
// Output: 2

n = 4
edges = [
  [0, 1],
  [2, 3],
  [1, 2],
]
// Output: 1

n = 6
edges = [
  [0, 1],
  [0, 2],
  [2, 5],
  [3, 4],
  [3, 5],
]
// Output: 1

console.log(countComponents(n, edges))
