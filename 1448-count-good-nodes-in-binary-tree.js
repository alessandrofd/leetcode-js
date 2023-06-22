/**
 * Given a binary tree root, a node X in the tree is named good if in the path
 * from root to X there are no nodes with a value greater than X.
 *
 * Return the number of good nodes in the binary tree.
 *
 * Constraints:
 *    The number of nodes in the binary tree is in the range [1, 10^5].
 *    Each node's value is between [-10^4, 10^4].
 */

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */

// Approach 1: Depth First Search, Recursion
var goodNodes_1 = function (root) {
  let qttyGoodNodes = 0
  const dfs = (node, maxSoFar) => {
    if (maxSoFar <= node.val) qttyGoodNodes++
    if (node.right) dfs(node.right, Math.max(node.val, maxSoFar))
    if (node.left) dfs(node.left, Math.max(node.val, maxSoFar))
  }

  dfs(root, -Infinity)
  return qttyGoodNodes
}

// Approach 2: Depth First Search, Iterative
const goodNodes_2 = (root) => {
  let qttyGoodNodes = 0

  const stack = [[root, -Infinity]]
  while (stack.length) {
    const [node, maxSoFar] = stack.pop()
    if (maxSoFar <= node.val) qttyGoodNodes++
    if (node.left) stack.push([node.left, Math.max(maxSoFar, node.val)])
    if (node.right) stack.push([node.right, Math.max(maxSoFar, node.val)])
  }

  return qttyGoodNodes
}

// Approach 3: Breadth First Search
const goodNodes = (root) => {
  let qttyGoodNodes = 0

  const queue = [[root, -Infinity]]
  while (queue.length) {
    const [node, maxSoFar] = queue.shift()
    if (maxSoFar <= node.val) qttyGoodNodes++
    if (node.left) queue.push([node.left, Math.max(maxSoFar, node.val)])
    if (node.right) queue.push([node.right, Math.max(maxSoFar, node.val)])
  }

  return qttyGoodNodes
}
