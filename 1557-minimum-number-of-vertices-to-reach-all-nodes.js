/**
 * Given a directed acyclic graph, with n vertices numbered from 0 to n-1, and
 *  an array edges where edges[i] = [fromi, toi] represents a directed edge from
 * node fromi to node toi.
 *
 * Find the smallest set of vertices from which all nodes in the graph are
 * reachable. It's guaranteed that a unique solution exists.
 *
 * Notice that you can return the vertices in any order.
 *
 * Constraints:
 *    2 <= n <= 10^5
 *    1 <= edges.length <= min(10^5, n * (n - 1) / 2)
 *    edges[i].length == 2
 *    0 <= fromi, toi < n
 *    All pairs (fromi, toi) are distinct.
 */

/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number[]}
 */
const findSmallestSetOfVertices = (numNodes, edges) => {
  reachedNodes = new Set()
  for (const [, to] of edges) reachedNodes.add(to)
  result = []
  for (let i = 0; i < numNodes; i++) {
    if (!reachedNodes.has(i)) result.push(i)
  }
  return result
}

numNodes = 6
// prettier-ignore
edges = [[0,1],[0,2],[2,5],[3,4],[4,2]]
// Expected: [0,3]

// numNodes = 5
// // prettier-ignore
// edges = [[0,1],[2,1],[3,1],[1,4],[2,4]]
// Expected: [0,2,3]

console.log(findSmallestSetOfVertices(numNodes, edges))
