/**
 * You are given an array points representing integer coordinates of some points
 * on a 2D-plane, where points[i] = [xi, yi]
 *
 * The cost of connecting two points [xi, yi] and [xj, yj] is the manhattan
 * distance between them: |xi - xj| + |yi - yj|, where |val| denotes the
 * absolute value of val.
 *
 * Return the minimum cost to make all points connected. All points are
 * connected if there is exactly one simple path between any two points.
 *
 * Constraints:
 *    1 <= points.length <= 1000
 *    -10^6 <= xi, yi <= 10^6
 *    All pairs (xi, yi) are distinct.
 */

// Aplicação do algoritmo de Kruskal
/**
 * @param {number[][]} points
 * @return {number}
 */
const minCostConnectPoints_kruskal = (points) => {
  const n = points.length

  if (n === 1) return 0

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

  const connections = []
  for (let i = 0; i < n - 1; i++) {
    for (let j = i + 1; j < n; j++) {
      const [xi, yi] = points[i]
      const [xj, yj] = points[j]
      const cost = Math.abs(xi - xj) + Math.abs(yi - yj)
      connections.push([i, j, cost])
    }
  }

  connections.sort(([, , a], [, , b]) => a - b)

  let count = 0
  let result = 0
  for (const [i, j, cost] of connections) {
    if (!union(i, j)) continue
    result += cost
    count += 1
    if (count === n - 1) return result
  }

  return -1
}

/**
 * Aplicação do algoritmo de Prim
 *
 * The algorithm starts with an empty spanning tree. The idea is to maintain two
 * sets of vertices. The first set contains the vertices already included in the
 * MST, and the other set contains the vertices not yet included. At every step,
 * it considers all the edges that connect the two sets and picks the minimum
 * weight edge from these edges. After picking the edge, it moves the other
 * endpoint of the edge to the set containing MST.
 */
/**
 * @param {number[][]} points
 * @return {number}
 */
const minCostConnectPoints_prim = (points) => {
  const n = points.length
  const unconnected = new Set(Array(n).keys())
  const connected = new Set()

  unconnected.delete(0)
  connected.add(0)
  let totalDist = 0

  while (unconnected.size > 0) {
    let point = -1
    let minDist = Infinity
    for (const i of connected) {
      const [xi, yi] = points[i]
      for (const j of unconnected) {
        const [xj, yj] = points[j]
        const dist = Math.abs(xi - xj) + Math.abs(yi - yj)
        if (dist < minDist) {
          point = j
          minDist = dist
        }
      }
    }
    totalDist += minDist
    unconnected.delete(point)
    connected.add(point)
  }

  return totalDist
}

/**
 * @param {number[][]} points
 * @return {number}
 */
const minCostConnectPoints_prim_cached = (points) => {
  const n = points.length
  const dist = new Array(n).fill(Infinity)

  const connected = new Set([0])
  let totalDist = 0
  let last = 0

  while (connected.size < n) {
    const [xi, yi] = points[last]
    let minDist = Infinity
    let next = -1
    for (let current = 1; current < n; current++) {
      if (!connected.has(current)) {
        const [xj, yj] = points[current]
        dist[current] = Math.min(
          dist[current],
          Math.abs(xi - xj) + Math.abs(yi - yj)
        )
        if (dist[current] < minDist) {
          minDist = dist[current]
          next = current
        }
      }
    }
    totalDist += minDist
    connected.add(next)
    last = next
  }

  return totalDist
}

points = [
  [0, 0],
  [2, 2],
  [3, 10],
  [5, 2],
  [7, 0],
]
// Expected: 20

points = [
  [3, 12],
  [-2, 5],
  [-4, 1],
]
// Expected: 18

points = [
  [0, 0],
  [1, 1],
  [1, 0],
  [-1, 1],
]
// Expected: 4

console.log(minCostConnectPoints_kruskal(points))
console.log(minCostConnectPoints_prim(points))
console.log(minCostConnectPoints_prim_cached(points))
