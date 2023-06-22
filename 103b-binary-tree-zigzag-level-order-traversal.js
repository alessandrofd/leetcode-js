/**
 * Given the root of a binary tree, return the zigzag level order traversal of
 * its nodes' values. (i.e., from left to right, then right to left for the next
 *  level and alternate between).
 *
 * Constraints:
 *    The number of nodes in the tree is in the range [0, 2000].
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

/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
const zigzagLevelOrder = (root) => {}

root = [3, 9, 20, null, null, 15, 7]
// Output: [[3], [20, 9], [15, 7]]

// root = [1]
// Output: [[1]]

// root = []
// Output: []

// root = [1, 2, 3, 4, null, null, 5]
// Output: [[1],[3,2],[4,5]]

const tree = buildTree(root)
console.log(zigzagLevelOrder(tree))
