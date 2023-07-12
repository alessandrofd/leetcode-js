/**
 * There is a directed graph of n nodes with each node labeled from 0 to n - 1.
 * The graph is represented by a 0-indexed 2D integer array graph where graph[i]
 * is an integer array of nodes adjacent to node i, meaning there is an edge
 * from node i to each node in graph[i].
 *
 * A node is a terminal node if there are no outgoing edges. A node is a safe
 * node if every possible path starting from that node leads to a terminal node
 * (or another safe node).
 *
 * Return an array containing all the safe nodes of the graph. The answer should
 * be sorted in ascending order.
 *
 * Constraints:
 *    n == graph.length
 *    1 <= n <= 10^4
 *    0 <= graph[i].length <= n
 *    0 <= graph[i][j] <= n - 1
 *    graph[i] is sorted in a strictly increasing order.
 *    The graph may contain self-loops.
 *    The number of edges in the graph will be in the range [1, 4 * 10^4].
 */

// Algoritmo de Kahn

/**
 * @param {number[][]} graph
 * @return {number[]}
 */
const eventualSafeNodes = (graph) => {
  const n = graph.length
  const indegree = Array(n).fill(0)
  const reverse = Array.from(Array(n), () => [])
  for (let i = 0; i < n; i++) {
    for (const neighbor of graph[i]) {
      reverse[neighbor].push(i)
      indegree[i] += 1
    }
  }

  const queue = []
  indegree.forEach((n, i) => {
    if (n == 0) queue.push(i)
  })

  result = []
  while (queue.length > 0) {
    node = queue.shift()
    result.push(node)
    for (const neighbor of reverse[node]) {
      indegree[neighbor] -= 1
      if (indegree[neighbor] === 0) queue.push(neighbor)
    }
  }

  return result.sort((a, b) => a - b)
}

graph = [[1, 2], [2, 3], [5], [0], [5], [], []]
// Expected: [2,4,5,6]

// graph = [[1, 2, 3, 4], [1, 2], [3, 4], [0, 4], []]
// Expected: [4]

console.log(eventualSafeNodes(graph))
