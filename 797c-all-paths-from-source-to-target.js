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
const allPathsSourceTarget_recursion = (graph) => {
  const n = graph.length
  const result = []

  const dfs = (node, path) => {
    if (node === n - 1) {
      result.push([...path, n - 1])
      return
    }
    if (path.includes(node)) return

    for (const next of graph[node]) dfs(next, [...path, node])
  }

  dfs(0, [])
  return result
}

// Approach 1: Backtracking
const allPathsSourceTarget_backtracking = (graph) => {
  const n = graph.length
  const result = []

  const backtrack = (node, path) => {
    if (node === n - 1) {
      result.push([...path, n - 1])
      return
    }

    if (path.includes(node)) return

    for (const next of graph[node]) {
      path.push(node)
      backtrack(next, path)
      path.pop()
    }
  }

  backtrack(0, [])
  return result
}

// Approach 2: Top-Down Dynamic Programming
const allPathsSourceTarget_DP_TopDown = (graph) => {
  const n = graph.length

  const memo = []
  memo[n - 1] = [[n - 1]]
  const dfs = (node) => {
    if (memo[node]) return memo[node]

    const path = []
    for (const next of graph[node])
      for (const nextPath of dfs(next)) path.push([node, ...nextPath])
    return (memo[node] = path)
  }

  dfs(0)
  return memo[0]
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

console.log(allPathsSourceTarget_recursion(graph))
console.log(allPathsSourceTarget_backtracking(graph))
console.log(allPathsSourceTarget_DP_TopDown(graph))
