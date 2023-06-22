/**
 * Given a binary tree where node values are digits from 1 to 9. A path in the
 * binary tree is said to be pseudo-palindromic if at least one permutation of
 * the node values in the path is a palindrome.
 *
 * Return the number of pseudo-palindromic paths going from the root node to
 * leaf nodes.
 *
 * Constraints:
 *    The number of nodes in the tree is in the range [1, 10^5].
 *    1 <= Node.val <= 9
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
 * @return {number}
 */
// Approach 1: Iterative Preorder Traversal.
const pseudoPalindromicPaths_1 = (root) => {
  let count = 0
  const stack = [[root, 0]]

  while (stack.length) {
    let [node, bitmap] = stack.pop()
    if (node) {
      bitmap ^= 1 << node.val
      if (!node.left && !node.right) {
        if ((bitmap & (bitmap - 1)) === 0) count++
      } else {
        stack.push([node.right, bitmap])
        stack.push([node.left, bitmap])
      }
    }
  }
  return count
}

// Approach 2: Recursive Preorder Traversal.
const pseudoPalindromicPaths_2 = (root) => {
  let count = 0

  const preorder = (node, bitmap) => {
    if (node) {
      bitmap ^= 1 << node.val
      if (!node.left && !node.right) if ((bitmap & (bitmap - 1)) === 0) count++
      preorder(node.left, bitmap)
      preorder(node.right, bitmap)
    }
  }

  preorder(root, 0)
  return count
}

// Discussion
const pseudoPalindromicPaths = (node, bitmap = 0) => {
  if (!node) return 0
  bitmap ^= 1 << node.val
  if (!node.left && !node.right) return (bitmap & (bitmap - 1)) === 0 ? 1 : 0
  return (
    pseudoPalindromicPaths(node.left, bitmap) +
    pseudoPalindromicPaths(node.right, bitmap)
  )
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

root = buildTree([2, 3, 1, 3, 1, null, 1])
// Output: 2

root = buildTree([2, 1, 1, 1, 3, null, null, null, null, null, 1])
// Output: 1

root = buildTree([9])
// Output: 1

console.log(pseudoPalindromicPaths(root))
