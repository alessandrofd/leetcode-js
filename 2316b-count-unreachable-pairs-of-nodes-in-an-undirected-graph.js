/**
 * You are given an integer n. There is an undirected graph with n nodes,
 * numbered from 0 to n - 1. You are given a 2D integer array edges where
 * edges[i] = [ai, bi] denotes that there exists an undirected edge connecting
 * nodes ai and bi.
 *
 * Return the number of pairs of different nodes that are unreachable from
 * each other.
 *
 * Constraints:
 *    1 <= n <= 10^5
 *    0 <= edges.length <= 2 * 10^5
 *    edges[i].length == 2
 *    0 <= ai, bi < n
 *    ai != bi
 *    There are no repeated edges.
 */

/**
 * @param {number} numNodes
 * @param {number[][]} edges
 * @return {number}
 */
const countPairs = (numNodes, edges) => {}

numNodes = 3
edges = [
  [0, 1],
  [0, 2],
  [1, 2],
]
// Output: 0

// numNodes = 7
// edges = [
//   [0, 2],
//   [0, 5],
//   [2, 4],
//   [1, 6],
//   [5, 4],
// ]
// Output: 14

// numNodes = 11
// edges = [
//   [5, 0],
//   [1, 0],
//   [10, 7],
//   [9, 8],
//   [7, 2],
//   [1, 3],
//   [0, 2],
//   [8, 5],
//   [4, 6],
//   [4, 2],
// ]
// Output: 0

// numNodes = 5
// edges = [
//   [0, 3],
//   [4, 1],
//   [0, 1],
// ]
// Output: 4

console.log(countPairs(numNodes, edges))
