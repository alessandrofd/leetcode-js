/**
 * Given the root of a complete binary tree, return the number of the nodes in
 * the tree.
 *
 * According to Wikipedia, every level, except possibly the last, is completely
 * filled in a complete binary tree, and all nodes in the last level are as far
 * left as possible. It can have between 1 and 2h nodes inclusive at the last
 * level h.
 *
 * Design an algorithm that runs in less than O(n) time complexity.
 *
 * Constraints:
 *    The number of nodes in the tree is in the range [0, 5 * 10^4].
 *    0 <= Node.val <= 5 * 10^4
 *    The tree is guaranteed to be complete.
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
      if (leftVal) {
        node.left = new TreeNode(leftVal)
        queue.push(node.left)
      }
      if (rightVal) {
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
// Approach 1: Linear Time
const countNodes_linear = (root) => {
  return root ? 1 + countNodes(root.left) + countNodes(root.right) : 0
}

// Approach 2: Binary search
const countNodes_binSearch = (root) => {
  const computeDepth = (node) => {
    let depth = 0
    while (node.left) {
      node = node.left
      depth++
    }
    return depth
  }

  const exists = (target, depth, node) => {
    let left = 0
    let right = 2 ** depth - 1
    for (let i = 0; i < depth; i++) {
      const half = ((left + right) / 2) | 0
      if (target <= half) {
        node = node.left
        right = half
      } else {
        node = node.right
        left = half + 1
      }
    }
    return !!node
  }

  if (!root) return 0
  const depth = computeDepth(root)
  if (depth === 0) return 1

  let left = 1
  let right = 2 ** depth - 1
  while (left <= right) {
    const half = ((left + right) / 2) | 0
    if (exists(half, depth, root)) left = half + 1
    else right = half - 1
  }

  return 2 ** depth - 1 + left
}

// Top submission
const countNodes = (node, left = null, right = null) => {
  const countLeft = (node) => (node ? 1 + countLeft(node.left) : 0)
  const countRight = (node) => (node ? 1 + countRight(node.right) : 0)

  if (!node) return 0
  if (!left) left = countLeft(node.left)
  if (!right) right = countRight(node.right)
  if (left === right) return 2 ** (left + 1) - 1
  else
    return (
      1 +
      countNodes(node.left, left - 1, null) +
      countNodes(node.right, null, right - 1)
    )
}

root = []
// Output: 0

root = [1] // 1

root = [1, 2, 3, 4] // 4

root = [1, 2, 3, 4, 5, 6] // 6

root = [1, 2, 3, 4, 5, 6, 7, 8] // 8

console.log(countNodes(buildTree(root)))
