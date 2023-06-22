/**
 * A path in a binary tree is a sequence of nodes where each pair of adjacent
 * nodes in the sequence has an edge connecting them. A node can only appear in
 * the sequence at most once. Note that the path does not need to pass through
 * the root.
 *
 * The path sum of a path is the sum of the node's values in the path.
 *
 * Given the root of a binary tree, return the maximum path sum of any non-empty
 * path.
 *
 * Constraints:
 *    The number of nodes in the tree is in the range [1, 3 * 10^4].
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

const maxPathSum = (root) => {
  let max = 0

  const gainTree = (node) => {
    if (!node) return 0
    const gainLeft = Math.max(0, gainTree(node.left))
    const gainRight = Math.max(0, gainTree(node.right))
    max = Math.max(max, gainLeft + node.val + gainRight)
    return node.val + Math.max(gainLeft, gainRight)
  }

  gainTree(root)
  return max
}

root = [1, 2, 3]
// Output: 6
// Explanation: The optimal path is 2 -> 1 -> 3 with a path sum of 2 + 1 + 3 = 6.

root = [-10, 9, 20, null, null, 15, 7]
// Output: 42
// Explanation: The optimal path is 15 -> 20 -> 7 with a path sum of 15 + 20 + 7 = 42.

console.log(maxPathSum(buildTree(root)))
