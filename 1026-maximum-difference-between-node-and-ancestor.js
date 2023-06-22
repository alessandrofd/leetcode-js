/**
 * Given the root of a binary tree, find the maximum value v for which there
 * exist different nodes a and b where v = |a.val - b.val| and a is an ancestor
 * of b.
 *
 * A node a is an ancestor of b if either: any child of a is equal to b or any
 * child of a is an ancestor of b.
 *
 * Constraints:
 *    The number of nodes in the tree is in the range [2, 5000].
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

// Approach #1: Recursion
// const maxAncestorDiff = (root) => {
const maxAncestorDiff_recursion = (root) => {
  let result = 0

  const recurse = (node, max, min) => {
    if (!node) return

    result = Math.max(
      result,
      Math.abs(max - node.val),
      Math.abs(min - node.val)
    )

    max = Math.max(max, node.val)
    min = Math.min(min, node.val)

    recurse(node.left, max, min)
    recurse(node.right, max, min)
  }

  recurse(root, root.val, root.val)
  return result
}

// Approach #2: Maximum Minus Minimum
const maxAncestorDiff = (root) => {
  // const maxAncestorDiff_leafs = (root) => {
  const recurse = (node, max, min) => {
    if (!node) return max - min

    max = Math.max(max, node.val)
    min = Math.min(min, node.val)

    const left = recurse(node.left, max, min)
    const right = recurse(node.right, max, min)

    return Math.max(left, right)
  }

  return recurse(root, root.val, root.val)
}

root = [8, 3, 10, 1, 6, null, 14, null, null, 4, 7, 13]
// Output: 7
// Explanation: We have various ancestor-node differences, some of which are given below :
// |8 - 3| = 5
// |3 - 7| = 4
// |8 - 1| = 7
// |10 - 13| = 3
// Among all possible differences, the maximum value of 7 is obtained by |8 - 1| = 7.

root = [1, null, 2, null, 0, 3]
// Output: 3

console.log(maxAncestorDiff(buildTree(root)))
