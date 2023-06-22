/**
 * You are given an integer n, the number of nodes in a directed graph where the
 * nodes are labeled from 0 to n - 1. Each edge is red or blue in this graph,
 * and there could be self-edges and parallel edges.
 *
 * You are given two arrays redEdges and blueEdges where:
 *
 *    redEdges[i] = [ai, bi] indicates that there is a directed red edge from
 *    node ai to node bi in the graph, and
 *
 *    blueEdges[j] = [uj, vj] indicates that there is a directed blue edge from
 *    node uj to node vj in the graph.
 *
 * Return an array answer of length n, where each answer[x] is the length of the
 * shortest path from node 0 to node x such that the edge colors alternate along
 * the path, or -1 if such a path does not exist.
 *
 * Constraints:
 *    1 <= n <= 100
 *    0 <= redEdges.length, blueEdges.length <= 400
 *    redEdges[i].length == blueEdges[j].length == 2
 *    0 <= ai, bi, uj, vj < n
 */

/**
 * @param {number} n
 * @param {number[][]} redEdges
 * @param {number[][]} blueEdges
 * @return {number[]}
 */
const shortestAlternatingPaths_bfs = (n, redEdges, blueEdges) => {
  const map = new Map()
  for (const [u, v] of redEdges) {
    if (!map.get(u)) map.set(u, [])
    map.get(u).push([v, 'red'])
  }
  for (const [u, v] of blueEdges) {
    if (!map.get(u)) map.set(u, [])
    map.get(u).push([v, 'blue'])
  }

  const result = new Array(n).fill(-1)
  result[0] = 0

  let distance = 1

  const queue = [[0, undefined]]
  while (queue.length) {
    let qLen = queue.length
    while (qLen--) {
      const [node, edge] = queue.shift()
      const edgesNotVisited = []
      for (const [nextNode, nextEdge] of map.get(node) ?? []) {
        if (nextEdge !== edge) {
          if (result[nextNode] === -1) result[nextNode] = distance
          else result[nextNode] = Math.min(result[nextNode], distance)
          queue.push([nextNode, nextEdge])
        } else {
          edgesNotVisited.push([nextNode, nextEdge])
        }
      }
      map.set(node, edgesNotVisited)
    }
    distance++
  }
  return result
}

n = 3
redEdges = [
  [0, 1],
  [1, 2],
]
blueEdges = []
// Output: [0,1,-1]

// n = 3
// redEdges = [[0, 1]]
// blueEdges = [[2, 1]]
// Output: [0,1,-1]

// n = 3
// redEdges = [[0, 1]]
// blueEdges = [[1, 2]]
// Output: [0,1,2]

// n = 5
// redEdges = [
//   [0, 1],
//   [1, 2],
//   [2, 3],
//   [3, 4],
// ]
// blueEdges = [
//   [1, 2],
//   [2, 3],
//   [3, 1],
// ]
// Output: [0,1,2,3,7]

// n = 3
// redEdges = [
//   [0, 1],
//   [0, 2],
// ]
// blueEdges = [[1, 0]]
// Output: [0,1,1]

console.log(shortestAlternatingPaths_bfs(n, redEdges, blueEdges))
