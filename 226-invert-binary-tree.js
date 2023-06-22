/**
 * Given the root of a binary tree, invert the tree, and return its root.
 *
 * Constraints:
 *    The number of nodes in the tree is in the range [0, 100].
 *    -100 <= Node.val <= 100
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

const destroyTree = (root) => {
  const array = []
  const queue = [root]
  while (queue.length) {
    const node = queue.shift()
    array.push(node ? node.val : null)
    if (!node || (!node.left && !node.right)) continue
    queue.push(node.left)
    queue.push(node.right)
  }
  return array
}

/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
// Approach 1: Recursive
const invertTree_recursive = (node) =>
  node
    ? new TreeNode(
        node.val,
        invertTree_recursive(node.right),
        invertTree_recursive(node.left)
      )
    : null

// Approach 2: Iterative
const invertTree_iterative = (root) => {
  if (!root) return null

  const queue = [root]
  while (queue.length) {
    const node = queue.shift()
    const temp = node.left
    node.left = node.right
    node.right = temp
    if (node.left) queue.push(node.left)
    if (node.right) queue.push(node.right)
  }

  return root
}

root = [4, 2, 7, 1, 3, 6, 9]
// Output: [4, 7, 2, 9, 6, 3, 1]

// root = [2, 1, 3]
// Output: [2, 3, 1]

// root = []
// Output: []

const tree = buildTree(root)
console.log(destroyTree(invertTree_recursive(tree)))
console.log(destroyTree(invertTree_iterative(tree)))
