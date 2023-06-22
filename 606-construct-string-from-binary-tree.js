/**
 * Given the root of a binary tree, construct a string consisting of parenthesis
 * and integers from a binary tree with the preorder traversal way, and return
 * it.
 *
 * Omit all the empty parenthesis pairs that do not affect the one-to-one
 * mapping relationship between the string and the original binary tree.
 *
 * Constraints:
 *    The number of nodes in the tree is in the range [1, 104].
 *    -1000 <= Node.val <= 1000
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
 * @return {string}
 */

// Approach #1 Using Recursion [Accepted]
const tree2str_1 = (node) => {
  if (!node) return ''
  if (!node.left && !node.right) return `${node.val}`
  if (!node.right) return `${node.val}(${tree2str(node.left)})`
  return `${node.val}(${tree2str(node.left)})(${tree2str(node.right)})`
}

// Approach #1 Using Recursion - no template strings
const tree2str = (node) => {
  if (!node) return ''
  if (!node.left && !node.right) return '' + node.val
  if (!node.right) return node.val + '(' + tree2str(node.left) + ')'
  return (
    node.val + '(' + tree2str(node.left) + ')(' + tree2str(node.right) + ')'
  )
}

// Approach #2 Iterative Method Using stack [Accepted]
const tree2str_2 = (root) => {
  if (!root) return ''

  let result = ''
  const stack = [root]
  const visited = new Set()
  while (stack.length) {
    const node = stack[stack.length - 1]
    if (visited.has(node)) {
      stack.pop()
      result += ')'
    } else {
      visited.add(node)
      result += '(' + node.val
      if (!node.left && node.right) result += '()'
      if (node.right) stack.push(node.right)
      if (node.left) stack.push(node.left)
    }
  }
  return result.substring(1, result.length - 1)
}
