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
 * @return {number}
 */
const sumOfLeftLeaves = (root) => {
  if (!root || root.length === 0) return 0
  const isLeaf = (node) => node && !node.left && !node.right
  return (
    (isLeaf(root.left) ? root.left.val : 0) +
    sumOfLeftLeaves(root.left) +
    sumOfLeftLeaves(root.right)
  )
}
