/**
 * Given the root node of a binary search tree and two integers low and high,
 * return the sum of values of all nodes with a value in the inclusive range
 * [low, high].
 *
 * Constraints:
 *    The number of nodes in the tree is in the range [1, 2 * 10^4].
 *    1 <= Node.val <= 10^5
 *    1 <= low <= high <= 10^5
 *    All Node.val are unique.
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
 * @param {number} low
 * @param {number} high
 * @return {number}
 */
// Recursion
// const rangeSumBST = (root, low, high) => {
const rangeSumBST_recursion = (root, low, hight) => {
  const dfs = (node, low, high) => {
    result = 0

    if (node) {
      if (low <= node.val && node.val <= high) result += node.val
      if (low < node.val) result += dfs(node.left, low, high)
      if (node.val < high) result += dfs(node.right, low, high)
    }

    return result
  }

  return dfs(root, low, high)
}

// Stack
// const rangeSumBST_stack = (root, low, high) => {
const rangeSumBST = (root, low, high) => {
  let result = 0
  const stack = [root]

  while (stack.length) {
    const node = stack.pop()
    if (node) {
      if (low <= node.val && node.val <= high) result += node.val
      if (low < node.val) stack.push(node.left)
      if (node.val < high) stack.push(node.right)
    }
  }

  return result
}

root = [10, 5, 15, 3, 7, null, 18]
low = 7
high = 15
// Output: 32
// Explanation: Nodes 7, 10, and 15 are in the range [7, 15]. 7 + 10 + 15 = 32.

root = [10, 5, 15, 3, 7, 13, 18, 1, null, 6]
low = 6
high = 10
// Output: 23
// Explanation: Nodes 6, 7, and 10 are in the range [6, 10]. 6 + 7 + 10 = 23.

console.log(rangeSumBST(buildTree(root), low, high))
