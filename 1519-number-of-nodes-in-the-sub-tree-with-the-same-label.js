/**
 * You are given a tree (i.e. a connected, undirected graph that has no cycles)
 * consisting of n nodes numbered from 0 to n - 1 and exactly n - 1 edges.
 * The root of the tree is the node 0, and each node of the tree has a label
 * which is a lower-case character given in the string labels (i.e. The node
 * with the number i has the label labels[i]).
 *
 * The edges array is given on the form edges[i] = [ai, bi], which means there
 * is an edge between nodes ai and bi in the tree.
 *
 * Return an array of size n where ans[i] is the number of nodes in the subtree
 * of the ith node which have the same label as node i.
 *
 * A subtree of a tree T is the tree consisting of a node in T and all of its
 * descendant nodes.
 *
 * Constraints:
 *    1 <= n <= 10^5
 *    edges.length == n - 1
 *    edges[i].length == 2
 *    0 <= ai, bi < n
 *    ai != bi
 *    labels.length == n
 *    labels is consisting of only of lowercase English letters.
 */

/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {string} labels
 * @return {number[]}
 */
// Approach 1: Depth First Search
const countSubTrees_dfs = (n, edges, labels) => {
  const tree = new Array(n).fill().map((_) => [])
  for (const [u, v] of edges) {
    tree[u].push(v)
    tree[v].push(u)
  }

  const index = (label) => label.charCodeAt() - 97

  const answer = []
  let counts = new Array(26).fill(0)

  const dfs = (node, parent) => {
    const labelIndex = index(labels[node])
    const count = counts[labelIndex]++
    for (const child of tree[node]) if (child !== parent) dfs(child, node)
    answer[node] = counts[labelIndex] - count
  }

  dfs(0, -1)
  return answer
}

// Approach 2: Breadth First Search
const countSubTrees_bfs = (n, edges, labels) => {
  const tree = new Array(n).fill().map((_) => [])
  for (const [u, v] of edges) {
    tree[u].push(v)
    tree[v].push(u)
  }

  const index = (label) => label.charCodeAt() - 97 // 'a'.charCodeAt()

  const leafsQueue = []

  const counts = new Array(n).fill().map((_) => new Array(26).fill(0))
  for (let i = 0; i < n; i++) {
    const labelIndex = index(labels[i])
    counts[i][labelIndex]++
    if (i !== 0 && tree[i].length === 1) leafsQueue.push(i)
  }

  const result = []

  while (leafsQueue.length) {
    const leaf = leafsQueue.shift()
    const labelIndex = index(labels[leaf])
    result[leaf] = counts[leaf][labelIndex]

    const parent = tree[leaf][0]
    const childIndex = tree[parent].indexOf(leaf)
    tree[parent].splice(childIndex, 1)

    for (let i = 0; i <= 26; i++) counts[parent][i] += counts[leaf][i]

    if (parent != 0 && tree[parent].length === 1) leafsQueue.push(parent)
  }

  const labelIndex = index(labels[0])
  result[0] = counts[0][labelIndex]

  return result
}

n = 7
edges = [
  [0, 1],
  [0, 2],
  [1, 4],
  [1, 5],
  [2, 3],
  [2, 6],
]
labels = 'abaedcd'
// Output: [2,1,1,1,1,1,1]

n = 4
edges = [
  [0, 1],
  [1, 2],
  [0, 3],
]
labels = 'bbbb'
// Output: [4,2,1,1]

n = 5
edges = [
  [0, 1],
  [0, 2],
  [1, 3],
  [0, 4],
]
labels = 'aabab'
// Output: [3,2,1,1,1]

n = 4
edges = [
  [0, 2],
  [0, 3],
  [1, 2],
]
labels = 'aeed'
// Expected: [1, 1, 2, 1]

console.log(countSubTrees_dfs(n, edges, labels))
console.log(countSubTrees_bfs(n, edges, labels))
