/**
 * Given an undirected tree consisting of n vertices numbered from 0 to n-1,
 * which has some apples in their vertices. You spend 1 second to walk over one
 * edge of the tree. Return the minimum time in seconds you have to spend to
 * collect all apples in the tree, starting at vertex 0 and coming back to this
 * vertex.
 *
 * The edges of the undirected tree are given in the array edges, where
 * edges[i] = [ai, bi] means that exists an edge connecting the
 * vertices ai and bi. Additionally, there is a boolean array hasApple,
 * where hasApple[i] = true means that vertex i has an apple; otherwise,
 * it does not have any apple.
 *
 * Constraints:
 *    1 <= n <= 10^5
 *    edges.length == n - 1
 *    edges[i].length == 2
 *    0 <= ai < bi <= n - 1
 *    fromi < toi
 *    hasApple.length == n
 */

/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {boolean[]} hasApple
 * @return {number}
 */
const minTime = (n, edges, hasApple) => {
  const tree = new Array(n).fill().map((_) => [])
  for (const [u, v] of edges) {
    tree[u].push(v)
    tree[v].push(u)
  }

  const depth = (node, parent) => {
    let path = 0
    for (let child of tree[node])
      if (child !== parent) path += depth(child, node)
    return path + (hasApple[node] || path ? 1 : 0)
  }

  const visitedNodes = depth(0, -1) // includes root
  return visitedNodes ? (visitedNodes - 1) * 2 : 0
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
hasApple = [false, false, true, false, true, true, false]
// Output: 8

// n = 7
// edges = [
//   [0, 1],
//   [0, 2],
//   [1, 4],
//   [1, 5],
//   [2, 3],
//   [2, 6],
// ]
// hasApple = [false, false, true, false, false, true, false]
// Output: 6

// n = 7
// edges = [
//   [0, 1],
//   [0, 2],
//   [1, 4],
//   [1, 5],
//   [2, 3],
//   [2, 6],
// ]
// hasApple = [false, false, false, false, false, false, false]
// Output: 0

n = 4
edges = [
  [0, 2],
  [0, 3],
  [1, 2],
]
hasApple = [false, true, false, false]
// Output: 4

console.log(minTime(n, edges, hasApple))
