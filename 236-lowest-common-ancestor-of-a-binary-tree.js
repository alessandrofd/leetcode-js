/**
 * Given a binary tree, find the lowest common ancestor (LCA) of two given nodes in
 * the tree.
 *
 * According to the definition of LCA on Wikipedia: “The lowest common ancestor is
 * defined between two nodes p and q as the lowest node in T that has both p and q
 * as descendants (where we allow a node to be a descendant of itself).”
 */

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
// Approach 1: Recursive Approach
const lowestCommonAncestor_1 = (root, p, q) => {
  const recurseTree = (node) => {
    if (node === null) return false

    const left = recurseTree(node.left) ? 1 : 0
    const right = recurseTree(node.right) ? 1 : 0
    const mid = node === p || node === q ? 1 : 0
    if (left + right + mid >= 2) result = node

    return left + right + mid > 0
  }

  let result
  recurseTree(root)
  return result
}

// Approach 2: Iterative using parent pointers
const lowestCommonAncestor_2 = (root, p, q) => {
  const stack = []
  const parents = new Map()

  stack.push(root)
  parents.set(root, null)
  while (!parents.has(p) || !parents.has(q)) {
    const node = stack.pop()

    if (node.left !== null) {
      stack.push(node.left)
      parents.set(node.left, node)
    }
    if (node.right !== null) {
      stack.push(node.right)
      parents.set(node.right, node)
    }
  }

  const ancestors = new Set()
  while (p !== null) {
    ancestors.add(p)
    p = parents.get(p)
  }

  while (!ancestors.has(q)) q = parents.get(q)

  return q
}

// Approach 3: Iterative without parent pointers
const lowestCommonAncestor = (root, p, q) => {
  const BOTH_PENDING = 2
  const LEFT_DONE = 1
  const BOTH_DONE = 0

  const stack = [[root, BOTH_PENDING]]

  let nodeFound = false
  let LCA = null,
    childNode = null

  while (stack.length !== 0) {
    const [parentNode, parentState] = stack[stack.length - 1]
    if (parentState !== BOTH_DONE) {
      // if the parentState is not BOTH_DONE,
      // it means that the parentNode can't be popped yet
      if (parentState === BOTH_PENDING) {
        if (parentNode === p || parentNode === q) {
          if (nodeFound) return LCA
          else {
            nodeFound = true
            LCA = parentNode
          }
        }
        childNode = parentNode.left
      } else {
        childNode = parentNode.right
      }
      stack.pop()
      stack.push([parentNode, parentState - 1])
      if (childNode) stack.push([childNode, BOTH_PENDING])
    } else {
      // If the parent state of the node is BOTH_DONE,
      // the top node could be popped off the stack.
      // Update the LCA node to be the next top node
      if (LCA === stack.pop()[0] && nodeFound)
        LCA = stack.length ? stack[stack.length - 1][0] : null
    }
  }
  return null
}
