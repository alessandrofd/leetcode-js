/**
 * Given the root of a binary tree, return the inorder traversal of its nodes'
 * values.
 *
 * Constraints:
 *    The number of nodes in the tree is in the range [0, 100]
 *    -100 <= Node.val <= 100
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
 * @return {number[]}
 */
const inorderTraversal_1 = (root) => {
  const result = []

  const traverse = (node) => {
    if (!node) return
    traverse(node.left)
    result.push(node.val)
    traverse(node.right)
  }

  traverse(root)
  return result
}

// Approach 2: Iterating method using Stack
const inorderTraversal_2 = (root) => {
  const result = []
  const stack = []
  let node = root
  while (node || stack.length){
    while (node) {
      stack.push(node)
      node = node.left
    }
    node = stack.pop()
    result.push(node.val)
    node = node.right
  }
  return result
}

// Approach 3: Morris Traversal
const inorderTraversal = (root) => {
  const result = []
  let current = root
  while (current) {
    if (!current.left) {
      result.push(current.val)
      current = current.right
    } else {
      let tail = current.left
      while (tail.right) tail = tail.right
      tail.right = current
      current = current.left
      tail.right.left = null
    }
  }
  return result
}