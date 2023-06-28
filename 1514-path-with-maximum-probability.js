/**
 * You are given an undirected weighted graph of n nodes (0-indexed),
 * represented by an edge list where edges[i] = [a, b] is an undirected edge
 * connecting the nodes a and b with a probability of success of traversing that
 * edge succProb[i].
 *
 * Given two nodes start and end, find the path with the maximum probability of
 * success to go from start to end and return its success probability.
 *
 * If there is no path from start to end, return 0. Your answer will be accepted
 * if it differs from the correct answer by at most 1e-5.
 *
 * Constraints:
 *    2 <= n <= 10^4
 *    0 <= start, end < n
 *    start != end
 *    0 <= a, b < n
 *    a != b
 *    0 <= succProb.length == edges.length <= 2*10^4
 *    0 <= succProb[i] <= 1
 *    There is at most one edge between every two nodes.
 */

import { MaxPriorityQueue } from '@datastructures-js/priority-queue'

//Dijkstra's Algorithm

/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number[]} succProb
 * @param {number} start
 * @param {number} end
 * @return {number}
 */
const maxProbability = (n, edges, succProb, start, end) => {
  const neighbors = new Array(n).fill().map((_) => [])
  for (let i = 0; i < edges.length; i++) {
    const [u, v] = edges[i]
    neighbors[u].push([v, succProb[i]])
    neighbors[v].push([u, succProb[i]])
  }

  const probs = new Array(n).fill(0)
  probs[start] = 1

  const pq = new MaxPriorityQueue({ priority: (e) => e.prob })
  pq.enqueue({ node: start, prob: 1 })

  while (pq.size()) {
    const { node: currentNode, prob: currentProb } = pq.dequeue().element
    if (currentNode === end) return currentProb

    for (const [nextNode, nextProb] of neighbors[currentNode]) {
      const prob = currentProb * nextProb
      if (prob > probs[nextNode]) {
        probs[nextNode] = prob
        pq.enqueue({ node: nextNode, prob })
      }
    }
  }

  return 0
}

let n = 3
let edges = [
  [0, 1],
  [1, 2],
  [0, 2],
]
let succProb = [0.5, 0.5, 0.2]
let start = 0
let end = 2
// Expected: 0.25000

// n = 3
// edges = [
//   [0, 1],
//   [1, 2],
//   [0, 2],
// ]
// succProb = [0.5, 0.5, 0.3]
// start = 0
// end = 2
// Expected: 0.30000

// n = 3
// edges = [[0, 1]]
// succProb = [0.5]
// start = 0
// end = 2
// Expected: 0.00000

console.log(maxProbability(n, edges, succProb, start, end))
