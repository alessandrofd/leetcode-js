/**
 * Daily Challenge 09/01/2023
 *
 * Given the root of a binary tree, return the preorder traversal of its
 * nodes' values.
 *
 * Constraints:
 *    The number of nodes in the tree is in the range [0, 100].
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
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
// Approach 1: Recursion
const preorderTraversal_recursion = (root) => {
  // const preorderTraversal = (root) => {
}

// Approach 2: Iteration
const preorderTraversal_iteration = (root) => {
  // const preorderTraversal = (root) => {
}

// Approach 3: Morris Traversal
const preorderTraversal_morris = (root) => {
  // const preorderTraversal = (root) => {
}

root = [1, null, 2, 3]
// Output: [1,2,3]

// root = []
// Output: []

// root = [1]
// Output: [1]

// root = [1, 4, 3, 2]
// Output: [1, 4, 2, 3]

// root = [1, 2, 3, 4, 5, 8, 9, null, null, 6, 7]

// root = [1, 2, null, 3, null, 4]

const tree = buildTree(root)
console.log(preorderTraversal_recursion(tree))
console.log(preorderTraversal_iteration(tree))
console.log(preorderTraversal_morris(tree))
