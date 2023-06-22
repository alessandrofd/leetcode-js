/**
 * Given the root of a binary tree and an integer targetSum, return all
 * root-to-leaf paths where the sum of the node values in the path equals
 * targetSum. Each path should be returned as a list of the node values, not
 * node references.
 *
 * A root-to-leaf path is a path starting from the root and ending at any leaf
 * node. A leaf is a node with no children.
 *
 * Constraints:
 *    The number of nodes in the tree is in the range [0, 5000].
 *    -1000 <= Node.val <= 1000
 *    -1000 <= targetSum <= 1000
 */

class TreeNode {
  constructor(val, left, right) {
    this.val = val === undefined ? 0 : val
    this.left = left === undefined ? null : left
    this.right = right === undefined ? null : right
  }
}

/**
 * @param {TreeNode} root
 * @param {number} targetSum
 * @return {number[][]}
 */
// Approach: Depth First Traversal | Recursion
const pathSum_1 = (root, targetSum) => {
  const recurse = (node, sum) => {
    if (!node) return

    path.push(node.val)
    if (sum === node.val && !node.left && !node.right) result.push([...path])
    else {
      recurse(node.left, sum - node.val)
      recurse(node.right, sum - node.val)
    }
    path.pop()
  }

  const result = []
  const path = []
  recurse(root, targetSum)
  return result
}

// Submission
const pathSum = (root, target) => {
  const result = []
  const stack = []

  const leaf = (node) => node && !node.left && !node.right
  const sum = (stack) => stack.reduce((acc, next) => (acc += next))

  const inner = (node) => {
    if (!node) return

    stack.push(node.val)

    if (leaf(node) && sum(stack) === target) result.push([...stack])
    else {
      if (node.left) inner(node.left)
      if (node.right) inner(node.right)
    }

    stack.pop()
  }

  inner(root)
  return result
}

const buildTree = (array) => {
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

root = [5, 4, 8, 11, null, 13, 4, 7, 2, null, null, 5, 1]
targetSum = 22
// Output: [[5,4,11,2],[5,8,4,5]]
// Explanation: There are two paths whose sum equals targetSum:
// 5 + 4 + 11 + 2 = 22
// 5 + 8 + 4 + 5 = 22

root = [1, 2, 3]
targetSum = 5
// Output: []

root = [1, 2]
targetSum = 0
// Output: []

console.log(pathSum(buildTree(root), targetSum))
