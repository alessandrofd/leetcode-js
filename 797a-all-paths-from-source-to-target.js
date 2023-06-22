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

// Recursão simples
const allPathsSourceTarget_minha_recursion = (graph) => {
  // const allPathsSourceTarget = (graph) => {
  const destination = graph.length - 1
  const paths = []

  const findPath = (node, path) => {
    if (node === destination) paths.push(path)
    for (const next of graph[node]) findPath(next, [...path, next])
  }

  findPath(0, [0])
  return paths
}

// Approach 1: Backtracking
const allPathsSourceTarget_backtracking = (graph) => {
  // const allPathsSourceTarget = (graph) => {
  const destination = graph.length - 1
  const paths = []

  const path = [0]
  const backtrack = (node) => {
    if (node === destination) paths.push([...path])
    for (const next of graph[node]) {
      path.push(next)
      backtrack(next)
      path.pop()
    }
  }

  backtrack(0)
  return paths
}

// Approach 2: Top-Down Dynamic Programming
// const allPathsSourceTarget_DP_TopDown = (graph) => {
const allPathsSourceTarget = (graph) => {
  const destination = graph.length - 1
  const memo = []

  const dp = (node) => {
    if (memo[node]) return memo[node]
    if (node === destination) return [[destination]]

    const paths = []
    for (const next of graph[node])
      for (const path of dp(next)) paths.push([node, ...path])

    return (memo[node] = paths)
  }

  return dp(0)
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
