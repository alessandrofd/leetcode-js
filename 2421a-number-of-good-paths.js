/**
 * Daily Challenge 15/01/2023
 *
 * There is a tree (i.e. a connected, undirected graph with no cycles)
 * consisting of n nodes numbered from 0 to n - 1 and exactly n - 1 edges.
 *
 * You are given a 0-indexed integer array vals of length n where vals[i]
 * denotes the value of the ith node. You are also given a 2D integer array
 * edges where edges[i] = [ai, bi] denotes that there exists an undirected edge
 * connecting nodes ai and bi.
 *
 * A good path is a simple path that satisfies the following conditions:
 *
 *    The starting node and the ending node have the same value.
 *
 *    All nodes between the starting node and the ending node have values less
 *    than or equal to the starting node (i.e. the starting node's value should
 *    be the maximum value along the path).
 *
 * Return the number of distinct good paths.
 *
 * Note that a path and its reverse are counted as the same path. For example,
 * 0 -> 1 is considered to be the same as 1 -> 0. A single node is also
 * considered as a valid path.
 *
 * Constraints:
 *    n == vals.length
 *    1 <= n <= 3 * 10^4
 *    0 <= vals[i] <= 10^5
 *    edges.length == n - 1
 *    edges[i].length == 2
 *    0 <= ai, bi < n
 *    ai != bi
 *    edges represents a valid tree.
 */

/**
 * @param {number[]} vals
 * @param {number[][]} edges
 * @return {number}
 */
const numberOfGoodPaths = (vals, edges) => {
  const n = vals.length

  const adjs = new Array(n).fill().map((_) => [])
  for (const [u, v] of edges) {
    adjs[u].push(v)
    adjs[v].push(u)
  }

  const parents = Array.from(new Array(n).keys())
  const sizes = new Array(n).fill(1)

  const find = (i) => {
    if (parents[i] === i) return i
    return (parents[i] = find(parents[i]))
  }

  const union = (i, j) => {
    i = find(i)
    j = find(j)

    if (i === j) return

    if (sizes[i] > sizes[j]) {
      parents[j] = i
      sizes[i] += sizes[j]
    } else {
      parents[i] = j
      sizes[j] += sizes[i]
    }
  }

  const valuesToNodes = new Map()
  for (let i = 0; i < n; i++) {
    if (!valuesToNodes.has(vals[i])) valuesToNodes.set(vals[i], [])
    valuesToNodes.get(vals[i]).push(i)
  }

  let goodPaths = 0

  const sortedValues = [...valuesToNodes.keys()].sort((a, b) => a - b)
  for (const val of sortedValues) {
    if (val === 5) console.log('here we go again')
    for (const node of valuesToNodes.get(val)) {
      for (const adj of adjs[node]) if (val >= vals[adj]) union(node, adj)
    }
    const groups = new Map()
    for (const node of valuesToNodes.get(val)) {
      const group = find(node)
      groups.set(group, (groups.get(group) ?? 0) + 1)
    }
    for (const [_, size] of groups) goodPaths += (size * (size + 1)) / 2
  }

  return goodPaths
}

const numberOfGoodPaths_topSubmission = (vals, edges) => {
  const n = vals.length

  let goodPaths = n

  const parent = Array.from({ length: n }, (_, i) => i)
  const count = new Array(n).fill(1)

  const find = (i) => {
    if (parent[i] === i) return i
    return (parent[i] = find(parent[i]))
  }

  const union = (i, j) => {
    i = find(i)
    j = find(j)

    if (i === j) return

    if (vals[i] === vals[j]) {
      goodPaths += count[i] * count[j]
      count[i] += count[j]
      parent[j] = i
    } else if (vals[i] > vals[j]) {
      parent[j] = i
    } else {
      parent[i] = j
    }
  }

  const sortedEdges = [...edges].sort(
    (a, b) =>
      Math.max(vals[a[0]], vals[a[1]]) - Math.max(vals[b[0]], vals[b[1]])
  )

  for (const [u, v] of sortedEdges) union(u, v)

  return goodPaths
}

vals = [1, 3, 2, 1, 3]
edges = [
  [0, 1],
  [0, 2],
  [2, 3],
  [2, 4],
]
// Output: 6
// Explanation: There are 5 good paths consisting of a single node.
// There is 1 additional good path: 1 -> 0 -> 2 -> 4.
// (The reverse path 4 -> 2 -> 0 -> 1 is treated as the same as 1 -> 0 -> 2 -> 4.)
// Note that 0 -> 2 -> 3 is not a good path because vals[2] > vals[0].

vals = [1, 1, 2, 2, 3]
edges = [
  [0, 1],
  [1, 2],
  [2, 3],
  [2, 4],
]
// Output: 7
// Explanation: There are 5 good paths consisting of a single node.
// There are 2 additional good paths: 0 -> 1 and 2 -> 3.

vals = [1]
edges = []
// Output: 1
// Explanation: The tree consists of only one node, so there is one good path.

vals = [5, 1, 4, 2, 1, 5, 4, 3]
edges = [
  [1, 0],
  [2, 0],
  [3, 2],
  [4, 2],
  [5, 4],
  [6, 4],
  [6, 7],
]
// Expected: 10

console.log(numberOfGoodPaths(vals, edges))
console.log(numberOfGoodPaths_topSubmission(vals, edges))
