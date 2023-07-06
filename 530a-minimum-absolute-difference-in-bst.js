/**
 * Given the root of a Binary Search Tree (BST), return the minimum absolute
 * difference between the values of any two different nodes in the tree.
 *
 * Constraints:
 *    The number of nodes in the tree is in the range [2, 10^4].
 *    0 <= Node.val <= 10^5
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
const getMinimumDifference = (root) => {
  let minDiff = 1e5
  let prevNode

  const inorderTraversal = (node) => {
    if (!node) return

    inorderTraversal(node.left)

    if (prevNode) minDiff = Math.min(minDiff, node.val - prevNode.val)
    prevNode = node

    inorderTraversal(node.right)
  }

  inorderTraversal(root)
  return minDiff
}

array = [4, 2, 6, 1, 3]
// Expected: 1

// array = [1, 0, 48, null, null, 12, 49]
// Expected: 1

root = buildTree(array)
console.log(root)
console.log(getMinimumDifference(root))
