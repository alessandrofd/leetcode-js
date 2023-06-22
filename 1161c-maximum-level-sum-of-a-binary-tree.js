/**
 * Given the root of a binary tree, the level of its root is 1, the level of its
 * children is 2, and so on.
 *
 * Return the smallest level x such that the sum of all the values of nodes at
 * level x is maximal.
 *
 * Constraints:
 *    The number of nodes in the tree is in the range [1, 10^4].
 *    -10^5 <= Node.val <= 10^5
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
const maxLevelSum_dfs = (root) => {}

/**
 * @param {TreeNode} root
 * @return {number}
 */
const maxLevelSum_bfs = (root) => {}

array = [1, 7, 0, 7, -8, null, null]
// Expected: 2

// array = [989, null, 10250, 98693, -89388, null, null, null, -32127]
// Expected: 2

root = buildTree(array)
console.log(maxLevelSum_dfs(root))
console.log(maxLevelSum_bfs(root))
