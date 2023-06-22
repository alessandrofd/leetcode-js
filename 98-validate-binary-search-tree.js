/**
 * Given the root of a binary tree, determine if it is a valid binary search
 * tree (BST).
 *
 * A valid BST is defined as follows:
 *
 *    The left subtree of a node contains only nodes with keys less than the
 * node's key.
 *    The right subtree of a node contains only nodes with keys greater than the
 * node's key.
 *    Both the left and right subtrees must also be binary search trees.
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
 * @return {boolean}
 */

// Approach 1: Recursive Traversal with Valid Range
const isValidBST_1 = (root) => {
  const validate = (root, low, high) => {
    if (!root) return true
    if ((low != null && root.val <= low) || (high != null && root.val >= high))
      return false
    return (
      validate(root.left, low, root.val) && validate(root.right, root.val, high)
    )
  }
  return validate(root, null, null)
}

// Approach 2: Iterative Traversal with Valid Range
const isValidBST_2 = (root) => {
  const stack = [[root, null, null]]
  while (stack.length) {
    ;[root, low, high] = stack.pop()
    if (!root) continue
    if ((low != null && root.val <= low) || (high != null && root.val >= high))
      return false
    stack.push([root.left, low, root.val])
    stack.push([root.right, root.val, high])
  }
  return true
}

// Approach 3: Recursive Inorder Traversal
const isValidBST_3 = (root) => {
  let prev = null

  const inOrder = (root) => {
    if (!root) return true
    if (!inOrder(root.left)) return false
    if (prev != null && root.val <= prev) return false
    prev = root.val
    return inOrder(root.right)
  }

  return inOrder(root)
}

// Approach 4: Iterative Inorder Traversal
const isValidBST_4 = (root) => {
  const stack = []
  let prev = null
  while (stack.length || root) {
    while (root) {
      stack.push(root)
      root = root.left
    }
    root = stack.pop()
    if (prev != null && root.val <= prev) return false
    prev = root.val
    root = root.right
  }
  return true
}

var isValidBST = function (root, min = null, max = null) {
  if (!root) return true
  if (min && root.val <= min.val) return false
  if (max && root.val >= max.val) return false
  return isValidBST(root.left, min, root) && isValidBST(root.right, root, max)
}

root = [2, 1, 3]
// Output: true

root = [5, 1, 4, null, null, 3, 6]
// Output: false
