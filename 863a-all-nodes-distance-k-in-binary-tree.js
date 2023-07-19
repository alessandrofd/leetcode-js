/**
 * Given the root of a binary tree, the value of a target node target, and
 * an integer k, return an array of the values of all nodes that have
 * a distance k from the target node.
 *
 * You can return the answer in any order.
 *
 * Constraints:
 *    The number of nodes in the tree is in the range [1, 500].
 *    0 <= Node.val <= 500
 *    All the values Node.val are unique.
 *    target is the value of one of the nodes in the tree.
 *    0 <= k <= 1000
 */

class TreeNode {
  constructor(val, left, right) {
    this.val = val === undefined ? 0 : val
    this.left = left === undefined ? null : left
    this.right = right === undefined ? null : right
  }
}

const buildTree = (array) => {
  if (!array || !array.length) return null

  const root = new TreeNode(array.shift())
  const queue = [root]

  while (array.length) {
    const leftVal = array.shift()
    const rightVal = array.shift() ?? null
    const node = queue.shift()
    if (node) {
      if (leftVal !== null) {
        node.left = new TreeNode(leftVal)
        queue.push(node.left)
      }
      if (rightVal !== null) {
        node.right = new TreeNode(rightVal)
        queue.push(node.right)
      }
    }
  }
  return root
}

/**
 * @param {TreeNode} root
 * @param {TreeNode} target
 * @param {number} k
 * @return {number[]}
 */
const distanceK = (root, target, k) => {
  const graph = new Map()

  const buildGraph = (node, parent) => {
    if (!node) return

    if (node && parent) {
      graph.get(parent.val).push(node.val)

      if (!graph.has(node.val)) graph.set(node.val, [])
      graph.get(node.val).push(parent.val)
    }

    buildGraph(node.left, node)
    buildGraph(node.right, node)
  }

  graph.set(root.val, [])
  buildGraph(root, null)

  const queue = [target]
  const visited = new Set()

  let distance = 0
  while (distance < k) {
    const n = queue.length
    for (let i = 0; i < n; i++) {
      node = queue.shift()
      visited.add(node)
      for (const neighbor of graph.get(node)) {
        if (visited.has(neighbor)) continue
        queue.push(neighbor)
      }
    }
    distance += 1
  }

  return queue
}

array = [3, 5, 1, 6, 2, 0, 8, null, null, 7, 4]
target = 5
k = 2
// Expected: [7,4,1]

array = [1]
target = 1
k = 3
// Expected: []

root = buildTree(array)
console.log(distanceK(root, target, k))
