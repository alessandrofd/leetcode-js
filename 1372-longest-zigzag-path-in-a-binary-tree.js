/**
 * You are given the root of a binary tree.
 *
 * A ZigZag path for a binary tree is defined as follow:
 *
 *    Choose any node in the binary tree and a direction (right or left).
 *
 *    If the current direction is right, move to the right child of the current
 *    node; otherwise, move to the left child.
 *
 *    Change the direction from right to left or from left to right.
 *
 *    Repeat the second and third steps until you can't move in the tree.
 *
 * Zigzag length is defined as the number of nodes visited - 1. (A single node
 * has a length of 0).
 *
 * Return the longest ZigZag path contained in that tree.
 *
 * Constraints:
 *    The number of nodes in the tree is in the range [1, 5 * 104].
 *      1 <= Node.val <= 100
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
const longestZigZag = (root) => {
  let longest = 0

  const dfs = (node, leftNode) => {
    if (!node) return 0

    const leftPath = dfs(node.left, true)
    const rightPath = dfs(node.right, false)
    longest = Math.max(longest, Math.max(leftPath, rightPath))

    if (leftNode) return rightPath + 1
    return leftPath + 1
  }

  dfs(root)
  return longest
}

// prettier-ignore
root = [ 1, null, 1, 1, 1, null, null, 1, 1, null, 1, null, null, null, 1, null, 1, ]
// Output: 3

root = [1, 1, 1, null, 1, null, null, 1, 1, null, 1]
// Output: 4

root = [1]
// Output: 0

const tree = buildTree(root)
console.log(longestZigZag(tree))
