/**
 * There is an undirected connected tree with n nodes labeled from 0 to n - 1
 * and n - 1 edges.
 *
 * You are given the integer n and the array edges where edges[i] = [ai, bi]
 * indicates that there is an edge between nodes ai and bi in the tree.
 *
 * Return an array answer of length n where answer[i] is the sum of the
 * distances between the ith node in the tree and all other nodes.
 *
 * Constraints:
 *    1 <= n <= 3 * 10^4
 *    edges.length == n - 1
 *    edges[i].length == 2
 *    0 <= ai, bi < n
 *    ai != bi
 *    The given input represents a valid tree.
 */

/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number[]}
 */
const sumOfDistancesInTree = (n, edges) => {
  const graph = new Array(n).fill().map((_) => new Array())
  for (const [n1, n2] of edges) {
    graph[n1].push(n2)
    graph[n2].push(n1)
  }
  const count = new Array(n).fill(1)
  const result = new Array(n).fill(0)

  const dfs1 = (node, parent) => {
    for (const child of graph[node]) {
      if (child !== parent) {
        dfs1(child, node)
        count[node] += count[child]
        result[node] += result[child] + count[child]
      }
    }
  }

  const dfs2 = (node, parent) => {
    for (const child of graph[node]) {
      if (child !== parent) {
        result[child] = result[node] - count[child] + (n - count[child])
        dfs2(child, node)
      }
    }
  }

  dfs1(0, -1)
  dfs2(0, -1)
  return result
}

n = 6
edges = [
  [0, 1],
  [0, 2],
  [2, 3],
  [2, 4],
  [2, 5],
]
// Output: [8,12,6,10,10,10]

n = 1
edges = []
// Output: [0]

n = 2
edges = [[1, 0]]
// Output: [1, 1]

console.log(sumOfDistancesInTree(n, edges))
