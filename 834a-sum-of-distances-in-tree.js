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

// Approach #1: Subtree Sum and Count [Accepted]
const sumOfDistancesInTree = (n, edges) => {
  const adjs = new Array(n).fill().map((_) => [])
  for (const [u, v] of edges) {
    adjs[u].push(v)
    adjs[v].push(u)
  }

  const count = new Array(n).fill(1)
  const distances = new Array(n).fill(0)

  const dfs1 = (node, parent) => {
    for (const child of adjs[node]) {
      if (child !== parent) {
        dfs1(child, node)
        count[node] += count[child]
        distances[node] += distances[child] + count[child]
      }
    }
  }

  const dfs2 = (node, parent) => {
    for (const child of adjs[node]) {
      if (child !== parent) {
        distances[child] = distances[node] - count[child] + (n - count[child])
        dfs2(child, node)
      }
    }
  }

  dfs1(0, -1)
  dfs2(0, -1)
  return distances
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

// n = 1
// edges = []
// Output: [0]

// n = 2
// edges = [[1, 0]]
// Output: [1, 1]

console.log(sumOfDistancesInTree(n, edges))
