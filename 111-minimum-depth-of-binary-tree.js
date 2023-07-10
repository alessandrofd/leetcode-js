/**
 * Given a binary tree, find its minimum depth.
 *
 * The minimum depth is the number of nodes along the shortest path from
 * the root node down to the nearest leaf node.
 *
 * Note: A leaf is a node with no children.
 *
 * Constraints:
 *    The number of nodes in the tree is in the range [0, 10^5].
 *    -1000 <= Node.val <= 1000
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
 * @return {number}
 */
const minDepth = (root) => {
  let depth = 0
  if (!root) return depth

  const queue = [root]
  while (queue.length > 0) {
    const n = queue.length
    depth += 1
    for (let i = 0; i < n; i++) {
      const node = queue.shift()
      if (!node) continue

      if (!node.left && !node.right) return depth
      queue.push(node.left)
      queue.push(node.right)
    }
  }
}

array = [3, 9, 20, null, null, 15, 7]
// Expected: 2

// array = [2, null, 3, null, 4, null, 5, null, 6]
// Expected: 5

const root = buildTree(array)
console.log(minDepth(root))
