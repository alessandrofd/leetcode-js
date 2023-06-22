/**
 * You are given a directed graph of n nodes numbered from 0 to n - 1, where
 * each node has at most one outgoing edge.
 *
 * The graph is represented with a given 0-indexed array edges of size n,
 * indicating that there is a directed edge from node i to node edges[i].
 * If there is no outgoing edge from i, then edges[i] == -1.
 *
 * You are also given two integers node1 and node2.
 *
 * Return the index of the node that can be reached from both node1 and node2,
 * such that the maximum between the distance from node1 to that node, and from
 * node2 to that node is minimized. If there are multiple answers, return the
 * node with the smallest index, and if no possible answer exists, return -1.
 *
 * Note that edges may contain cycles.
 *
 * Constraints:
 *    n == edges.length
 *    2 <= n <= 10^5
 *    -1 <= edges[i] < n
 *    edges[i] != i
 *    0 <= node1, node2 < n
 */

/**
 * @param {number[]} edges
 * @param {number} node1
 * @param {number} node2
 * @return {number}
 */
const closestMeetingNode_bfs = (edges, node1, node2) => {
  const n = edges.length

  const bfs = (startingNode) => {
    const distances = new Array(n).fill(Infinity)

    const visited = new Set([startingNode])
    const queue = [[startingNode, 0]]
    while (queue.length) {
      const [node, distance] = queue.shift()
      distances[node] = distance
      const neighbor = edges[node]
      if (neighbor === -1 || visited.has(neighbor)) continue
      visited.add(neighbor)
      queue.push([neighbor, distance + 1])
    }

    return distances
  }

  const distances1 = bfs(node1)
  const distances2 = bfs(node2)

  let minDistance = Infinity
  let meetingNode = -1

  for (let node = 0; node < n; node++) {
    if (minDistance > Math.max(distances1[node], distances2[node])) {
      meetingNode = node
      minDistance = Math.max(distances1[node], distances2[node])
    }
  }

  return meetingNode
}

const closestMeetingNode_dfs = (edges, node1, node2) => {
  const n = edges.length

  const dfs = (node, distances, visited) => {
    const neighbor = edges[node]
    if (neighbor === -1 || visited.has(neighbor)) return
    visited.add(neighbor)
    distances[neighbor] = distances[node] + 1
    dfs(neighbor, distances, visited)
  }

  const distances1 = new Array(n).fill(Infinity)
  distances1[node1] = 0
  const visited1 = new Set([node1])
  dfs(node1, distances1, visited1)

  const distances2 = new Array(n).fill(Infinity)
  distances2[node2] = 0
  const visited2 = new Set([node2])
  dfs(node2, distances2, visited2)

  let minDistance = Infinity
  let meetingNode = -1
  for (let node = 0; node < n; node++) {
    if (minDistance > Math.max(distances1[node], distances2[node])) {
      minDistance = Math.max(distances1[node], distances2[node])
      meetingNode = node
    }
  }

  return meetingNode
}

edges = [2, 2, 3, -1]
node1 = 0
node2 = 1
// Output: 2

edges = [1, 2, -1]
node1 = 0
node2 = 2
// Output: 2

console.log(closestMeetingNode_bfs(edges, node1, node2))
console.log(closestMeetingNode_dfs(edges, node1, node2))
