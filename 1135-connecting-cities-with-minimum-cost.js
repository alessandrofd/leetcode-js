/**
 * There are N cities numbered from 1 to N.
 *
 * You are given connections, where each connections[i] = [city1, city2, cost]
 * represents the cost to connect city1 and city2 together. A connection is
 * bidirectional: connecting city1 and city2 is the same as connecting city2 and
 * city1.
 *
 * Return the minimum cost so that for every pair of cities, there exists a path
 * of connections (possibly of length 1) that connects those two cities together.
 * The cost is the sum of the connection costs used. If the task is impossible,
 * return -1.
 *
 * Constraints:
 *    1 <= N <= 10000
 *    1 <= connections.length <= 10000
 *    1 <= connections[i][0], connections[i][1] <= N
 *    0 <= connections[i][2] <= 10^5
 *    connections[i][0] != connections[i][1]
 */

/**
 * The Kruskal algorithm is based on the idea of greed. First, arrange all edges
 * from smallest to largest based on their weights, and then select each edge in
 * order. If the two endpoints of this edge do not belong to the same set, then
 * merge them until all the points belong to the same set. To merge them into a
 * set, we can use a tool like a union-find data structure. In other words, the
 * Kruskal algorithm is a greedy algorithm based on the union-find data
 * structure.
 */

/**
 * @param {number} n
 * @param {number[][]} connections
 * @return {number}
 */
const minimumCost = (n, connections) => {
  const parents = Array.from(Array(n).keys())

  const find = (i) => {
    if (parents[i] !== i) parents[i] = find(parents[i])
    return parents[i]
  }

  const union = (i, j) => {
    i = find(i)
    j = find(j)

    if (i === j) return false

    parents[j] = i
    return true
  }

  connections.sort(([, , a], [, , b]) => a - b)

  let result = 0
  for (const [u, v, cost] of connections) {
    if (!union(u, v)) continue
    result += cost
    if (--n === 1) return result
  }

  return -1
}

n = 3
connections = [
  [1, 2, 5],
  [1, 3, 6],
  [2, 3, 1],
]
// Expected: 6

n = 4
connections = [
  [1, 2, 3],
  [3, 4, 4],
]
// Expected: -1

console.log(minimumCost(n, connections))
