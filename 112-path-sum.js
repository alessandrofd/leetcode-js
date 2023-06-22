/**
 * Given the root of a binary tree and an integer targetSum, return true if the
 * tree has a root-to-leaf path such that adding up all the values along the
 * path equals targetSum.
 *
 * A leaf is a node with no children.
 *
 * Constraints:
 *    The number of nodes in the tree is in the range [0, 5000].
 *    -1000 <= Node.val <= 1000
 *    -1000 <= targetSum <= 1000
 */

function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val
  this.left = left === undefined ? null : left
  this.right = right === undefined ? null : right
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
 * @param {number} targetSum
 * @return {boolean}
 */
// Approach 1: Recursion
var hasPathSum_1 = function (node, sum) {
  if (node === null) return false

  sum -= node.val
  if (!node.left && !node.right) return sum === 0
  return hasPathSum(node.left, sum) || hasPathSum(node.right, sum)
}

// Approach 2: Iterations
const hasPathSum = (root, targetSum) => {
  if (!root) return false

  const nodes = [root]
  const sums = [targetSum - root.val]

  while (nodes.length) {
    const node = nodes.pop()
    const sum = sums.pop()

    if (!node.left && !node.right && sum === 0) return true

    if (node.left) {
      nodes.push(node.left)
      sums.push(sum - node.left.val)
    }

    if (node.right) {
      nodes.push(node.right)
      sums.push(sum - node.right.val)
    }
  }
  return false
}

root = [5, 4, 8, 11, null, 13, 4, 7, 2, null, null, null, 1]
targetSum = 22
// Output: true
// Explanation: The root-to-leaf path with the target sum is shown.

root = [1, 2, 3]
targetSum = 5
// Output: false
// Explanation: There two root-to-leaf paths in the tree:
// (1 --> 2): The sum is 3.
// (1 --> 3): The sum is 4.
// There is no root-to-leaf path with sum = 5.

root = []
targetSum = 0
// Output: false
// Explanation: Since the tree is empty, there are no root-to-leaf paths.

console.log(hasPathSum(buildTree(root), targetSum))
