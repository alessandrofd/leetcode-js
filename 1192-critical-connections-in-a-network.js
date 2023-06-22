/**
 * @param {number} n
 * @param {number[][]} connections
 * @return {number[][]}
 */
const criticalConnections_1 = (n, connections) => {
  class ArraySet extends Set {
    add(arr) {
      super.add(arr.toString())
    }
    delete(arr) {
      super.delete(arr.toString())
    }
  }

  const dfs = (node, discoveryRank) => {
    if (rank.get(node) != null) return rank.get(node)
    rank.set(node, discoveryRank)

    // This is the max we have seen till now. So we start with this instead of Infinity or something.
    let minRank = discoveryRank + 1

    for (const neighbor of graph.get(node)) {
      const neighborRank = rank.get(neighbor)

      // skip parent
      if (neighborRank === discoveryRank - 1) continue

      // recurse on the neighbor
      const recursiveRank = dfs(neighbor, discoveryRank + 1)

      // step 1. check if this edge needs to be discarded
      if (recursiveRank <= discoveryRank)
        edges.delete([Math.min(node, neighbor), Math.max(node, neighbor)])

      // step 2. update minRank if needed
      minRank = Math.min(minRank, recursiveRank)
    }

    return minRank
  }

  const graph = new Map()
  const rank = new Map()
  const edges = new ArraySet()

  for (let i = 0; i < n; i++) {
    graph.set(i, [])
    rank.set(i, null)
  }

  // Bidirectional edges
  for (const [u, v] of connections) {
    graph.get(u).push(v)
    graph.get(v).push(u)
    edges.add([Math.min(u, v), Math.max(u, v)])
  }

  dfs(0, 0)
  return Array.from(edges).map((s) => s.split(',').map((c) => Number(c)))
}

const criticalConnections = (n, connections) => {
  const graph = []
  for (let i = 0; i < n; i++) graph[i] = []
  for (const [u,v] of connections) {
    graph[u].push(v)
    graph[v].push(u)
  }

  let count = 1
  const rank = new Array(n).fill(0)
  const low = new Array(n)
  const result = []

  const dfs = (current, parent) => {
    if (rank[current] > 0) return
    
    rank[current] = count
    low[current] = count
    count++

    for (let neighbor of graph[current]) {
      if (neighbor !== parent) {
        dfs(neighbor, current)
        low[current] = Math.min(low[current], low[neighbor])
        if (low[neighbor] > rank[current]) result.push([current, neighbor])
      }
    }
  }
  dfs(0, null)
  return result
}



//

const n = 4
const connections = [
  [0, 1],
  [1, 2],
  [2, 0],
  [1, 3],
]

console.log(criticalConnections(n, connections))
