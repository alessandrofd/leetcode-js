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
  const path = []

  const traverse = (node) => {
    if (!node) return
    path.push(node.val)
    traverse(node.left)
    traverse(node.right)
  }

  traverse(root)
  return path
}

// Approach 2: Iteration
const preorderTraversal_iteration = (root) => {
  // const preorderTraversal = (root) => {
  const path = []

  const stack = [root]
  while (stack.length) {
    node = stack.pop()
    if (!node) continue
    path.push(node.val)
    stack.push(node.right)
    stack.push(node.left)
  }

  return path
}

// Approach 3: Morris Traversal
const preorderTraversal = (root) => {
  const path = []

  let curr = root
  let last

  while (curr) {
    if (!curr.left) {
      path.push(curr.val)
      curr = curr.right
    } else {
      last = curr.left
      while (last.right && last.right !== curr) last = last.right
      if (!last.right) {
        path.push(curr.val)
        last.right = curr
        curr = curr.left
      } else {
        last.right = null
        curr = curr.right
      }
    }
  }

  return path
}

root = [1, null, 2, 3]
// Output: [1,2,3]

// root = []
Output: []

// root = [1]
Output: [1]

console.log(preorderTraversal(buildTree(root)))
