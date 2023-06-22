/**
 * Given the root of a binary tree, return the same tree where every subtree
 * (of the given tree) not containing a 1 has been removed.
 *
 * A subtree of a node node is node plus every node that is a descendant of node.
 *
 * Constraints:
 *    The number of nodes in the tree is in the range [1, 200].
 *    Node.val is either 0 or 1.
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
 * @return {TreeNode}
 */
// Approach #1: Recursion [Accepted]
const pruneTree = (root) => {
  const containsOne = (node) => {
    if (!node) return false

    const leftContainsOne = containsOne(node.left)
    const rightContainsOne = containsOne(node.right)

    node.left = leftContainsOne ? node.left : null
    node.right = rightContainsOne ? node.right : null

    return node.val === 1 || leftContainsOne || rightContainsOne
  }

  return containsOne(root) ? root : null
}
