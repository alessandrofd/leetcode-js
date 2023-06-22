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
const countSubTrees_dfs = (n, edges, labels) => {}

// Approach 2: Breadth First Search
const countSubTrees_bfs = (n, edges, labels) => {}

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

console.log(countSubTrees_dfs(n, edges, labels))
console.log(countSubTrees_bfs(n, edges, labels))
