/**
 * Given the root of a Binary Search Tree (BST), return the minimum difference 
 * between the values of any two different nodes in the tree.
 * 
 * Constraints:
 *    The number of nodes in the tree is in the range [2, 100].
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
// Approach 1: In-order Traversal with List
const minDiffInBST_list = (root) => {
  const array = []

  const inorderTraversal = (node) => {
    if (!node) return

    inorderTraversal(node.left)
    array.push(node.val)
    inorderTraversal(node.right)
  }

  inorderTraversal(root)

  let min = Infinity
  for (let i = 1; i < array.length; i++)
    min = Math.min(min, Math.abs(array[i - 1] - array[i]))
  return min
}

// Approach 2: In-order Traversal Without List
const minDiffInBST_noList = (root) => {
  let min = Infinity
  let prev

  const inorderTraversal = (node) => {
    if (!node) return

    inorderTraversal(node.left)

    if (prev !== undefined) min = Math.min(min, Math.abs(prev - node.val))
    prev = node.val

    inorderTraversal(node.right)
  }

  inorderTraversal(root)
  return min
}

root = [4, 2, 6, 1, 3]
// Output: 1

root = [1, 0, 48, null, null, 12, 49]
// Output: 1

root = [90, 69, null, 49, 89, null, 52]
// Output: 1

const tree = buildTree(root)
console.log(minDiffInBST_list(tree))
console.log(minDiffInBST_noList(tree))
