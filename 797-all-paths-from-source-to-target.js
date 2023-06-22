/** Given a directed acyclic graph (DAG) of n nodes labeled from 0 to n - 1,
 * find all possible paths from node 0 to node n - 1 and return them in any
 * order.
 *
 * The graph is given as follows: graph[i] is a list of all nodes you can visit
 * from node i (i.e., there is a directed edge from node i to node graph[i][j]).
 *
 * Constraints:
 *    n == graph.length
 *    2 <= n <= 15
 *    0 <= graph[i][j] < n
 *    graph[i][j] != i (i.e., there will be no self-loops).
 *    All the elements of graph[i] are unique.
 *    The input graph is guaranteed to be a DAG.
 */

/**
 * @param {number[][]} graph
 * @return {number[][]}
 */

const allPathsSourceTarget_minha_recursion = (graph) => {
  // const allPathsSourceTarget = (graph) => {
  const result = []

  const dfs = (node, path) => {
    if (node === graph.length - 1) result.push([...path, node])
    for (const child of graph[node]) dfs(child, [...path, node])
  }

  dfs(0, [])
  return result
}

// Approach 1: Backtracking
const allPathsSourceTarget_backtracking = (graph) => {
  // const allPathsSourceTarget = (graph) => {
  const result = []

  const backtrack = (node, path) => {
    if (node === graph.length - 1) result.push([...path])
    for (const child of graph[node]) {
      path.push(child)
      backtrack(child, path)
      path.pop(child)
    }
  }

  backtrack(0, [0])
  return result
}

// Approach 2: Top-Down Dynamic Programming
// const allPathsSourceTarget_DP_TopDown = graph => {
const allPathsSourceTarget = (graph) => {
  const memo = []

  const dfs = (node) => {
    if (memo[node]) return memo[node]
    if (node === graph.length - 1) return [[graph.length - 1]]

    const paths = []
    for (const child of graph[node])
      for (const path of dfs(child)) paths.push([node, ...path])

    return (memo[node] = paths)
  }

  return dfs(0)
}

graph = [[1, 2], [3], [3], []]
// Output: [
//   [0, 1, 3],
//   [0, 2, 3],
// ]

graph = [[4, 3, 1], [3, 2, 4], [3], [4], []]
// Output: [
//   [0, 4],
//   [0, 3, 4],
//   [0, 1, 3, 4],
//   [0, 1, 2, 3, 4],
//   [0, 1, 4],
// ]

console.log(allPathsSourceTarget(graph))
