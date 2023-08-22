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

class DSU {
  constructor(n) {
    this.parents = Array.from(Array(n).keys())
    this.components = n
  }

  find = (i) => {
    if (this.parents[i] !== i) {
      this.parents[i] = this.find(this.parents[i])
    }
    return this.parents[i]
  }

  union = (i, j) => {
    i = this.find(i)
    j = this.find(j)

    if (i === j) return false

    this.parents[j] = i
    this.components -= 1
    return true
  }
}

/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number[][]}
 */
const findCriticalAndPseudoCriticalEdges = (n, edges) => {
  edges = edges.map((edge) => edge.slice())
  edges.forEach((edge, i) => edge.push(i))
  edges.sort(([, , a], [, , b]) => a - b)

  const stdDSU = new DSU(n)
  let stdWeight = 0

  for (const [u, v, w] of edges) {
    if (!stdDSU.union(u, v)) continue
    stdWeight += w
    if (stdDSU.components === 1) break
  }

  const critical = []
  const pseudo = []

  for (const [ui, vi, wi, i] of edges) {
    const criticalDSU = new DSU(n)
    let criticalWeight = 0

    for (const [uj, vj, wj, j] of edges) {
      if (j === i || !criticalDSU.union(uj, vj)) continue
      criticalWeight += wj
      if (criticalDSU.components === 1) break
    }

    if (criticalDSU.components > 1 || criticalWeight > stdWeight) {
      critical.push(i)
      continue
    }

    const pseudoDSU = new DSU(n)
    pseudoDSU.union(ui, vi)
    let pseudoWeight = wi

    for (const [uj, vj, wj, j] of edges) {
      if (j === i || !pseudoDSU.union(uj, vj)) continue
      pseudoWeight += wj
      if (pseudoDSU.components === 1) break
    }

    if (pseudoDSU.components === 1 && pseudoWeight === stdWeight) {
      pseudo.push(i)
    }
  }

  return [critical, pseudo]
}

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

// n = 4
// edges = [
//   [0, 1, 1],
//   [1, 2, 1],
//   [2, 3, 1],
//   [0, 3, 1],
// ]
// Expected: [[],[0,1,2,3]]

console.log(findCriticalAndPseudoCriticalEdges(n, edges))
