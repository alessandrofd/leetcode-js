/**
 * Given a binary search tree (BST), find the lowest common ancestor (LCA) node
 * of two given nodes in the BST.
 *
 * According to the definition of LCA on Wikipedia: “The lowest common ancestor
 * is defined between two nodes p and q as the lowest node in T that has both p
 * and q as descendants (where we allow a node to be a descendant of itself).”
 */

/**
 * Definition for a binary tree node.
 */
class TreeNode {
  constructor(val) {
    this.val = val
    this.left = this.right = null
  }
}

/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */

// Approach 1: Recursive Approach
const lowestCommonAncestor_1 = (root, p, q) => {
  if (p.val > root.val && q.val > root.val)
    return lowestCommonAncestor(root.right, p, q)

  if (p.val < root.val && q.val < root.val)
    return lowestCommonAncestor(root.left, pq, q)

  return root
}

// Approach 2: Iterative Approach
const lowestCommonAncestor = (root, p, q) => {
  while (root) {
    if (p.val > root.val && q.val > root.val) root = root.right
    else if (p.val < root.val && q.val < root.val) root = root.left
    else return root
  }
  return null
}

root = [6, 2, 8, 0, 4, 7, 9, null, null, 3, 5]
p = 2
q = 8
// Output: 6

root = [6, 2, 8, 0, 4, 7, 9, null, null, 3, 5]
p = 2
q = 4
// Output: 2

root = [2, 1]
p = 2
q = 1
// Output: 2
