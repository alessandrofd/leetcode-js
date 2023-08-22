/**
 * Given a weighted undirected connected graph with n vertices numbered from 0
 * to n - 1, and an array edges where edges[i] = [ai, bi, weighti] represents a
 * bidirectional and weighted edge between nodes ai and bi. A minimum spanning
 * ree (MST) is a subset of the graph's edges that connects all vertices without
 * cycles and with the minimum possible total edge weight.
 *
 * Find all the critical and pseudo-critical edges in the given graph's minimum
 * spanning tree (MST). An MST edge whose deletion from the graph would cause
 * the MST weight to increase is called a critical edge. On the other hand, a
 * pseudo-critical edge is that which can appear in some MSTs but not all.
 *
 * Note that you can return the indices of the edges in any order.
 *
 * Constraints:
 *    2 <= n <= 100
 *    1 <= edges.length <= min(200, n * (n - 1) / 2)
 *    edges[i].length == 3
 *    0 <= ai < bi < n
 *    1 <= weighti <= 1000
 *    All pairs (ai, bi) are distinct.
 */

/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number[][]}
 */
var findCriticalAndPseudoCriticalEdges = function (n, edges) {}

n = 5
edges = [
  [0, 1, 1],
  [1, 2, 1],
  [2, 3, 2],
  [0, 3, 2],
  [0, 4, 3],
  [3, 4, 3],
  [1, 4, 6],
]
// Expected: [[0,1],[2,3,4,5]]

n = 4
edges = [
  [0, 1, 1],
  [1, 2, 1],
  [2, 3, 1],
  [0, 3, 1],
]
// Expected: [[],[0,1,2,3]]

console.log(findCriticalAndPseudoCriticalEdges(n, edges))
