/**
 * Given a reference of a node in a connected undirected graph.
 *
 * Return a deep copy (clone) of the graph.
 *
 * Test case format:
 *
 * For simplicity, each node's value is the same as the node's index (1-indexed).
 * For example, the first node with val == 1, the second node with val == 2, and
 * so on. The graph is represented in the test case using an adjacency list.
 *
 * An adjacency list is a collection of unordered lists used to represent
 * a finite graph. Each list describes the set of neighbors of a node in
 * the graph.
 *
 * The given node will always be the first node with val = 1. You must return
 * the copy of the given node as a reference to the cloned graph.
 *
 * Constraints:
 *    The number of nodes in the graph is in the range [0, 100].
 *    1 <= Node.val <= 100
 *    Node.val is unique for each node.
 *    There are no repeated edges and no self-loops in the graph.
 *    The Graph is connected and all nodes can be visited starting from
 *    the given node.
 */

class Node {
  constructor(val, neighbors) {
    this.val = val === undefined ? 0 : val
    this.neighbors = neighbors === undefined ? [] : neighbors
  }
}

const buildGraph = (adjList, index = 0, nodes = []) => {
  if (adjList.length === 0) return null
  if (nodes[index]) return nodes[index]

  const node = new Node(index)
  nodes[index] = node
  for (const adj of adjList[index])
    node.neighbors.push(buildGraph(adjList, adj - 1, nodes))

  return node
}

const graphAdjList = (node, adjList = []) => {
  if (!node) return []
  if (adjList[node.val]) return

  adjList[node.val] = []
  for (const neighbor of node.neighbors) {
    adjList[node.val].push(neighbor.val)
    graphAdjList(neighbor, adjList)
  }

  return adjList
}

/**
 * @param {Node} node
 * @return {Node}
 */
const cloneGraph = (node, clones = []) => {
  if (!node) return null
  if (clones[node.val]) return clones[node.val]

  const clone = new Node(node.val)
  clones[node.val] = clone
  for (const neighbor of node.neighbors)
    clone.neighbors.push(cloneGraph(neighbor, clones))

  return clone
}

adjList = [
  [2, 4],
  [1, 3],
  [2, 4],
  [1, 3],
]
// Output: [
//   [2, 4],
//   [1, 3],
//   [2, 4],
//   [1, 3],
// ]

// adjList = [[]]
// Output: [[]]

// adjList = []

console.log(graphAdjList(cloneGraph(buildGraph(adjList))))
