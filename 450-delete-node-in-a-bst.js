/**
 * Given a root node reference of a BST and a key, delete the node with the
 * given key in the BST. Return the root node reference (possibly updated) of
 * the BST.
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
 * @param {number} key
 * @return {TreeNode}
 */

// Approach 1: Recursion
const deleteNode = (root, key) => {
  // One step right and then always left
  const successor = (root) => {
    root = root.right
    while (root.left) root = root.left
    return root.val
  }

  // One step left and the alwary right
  const predecessor = (root) => {
    root = root.left
    while (root.right) root = root.right
    return root.val
  }

  if (!root) return root

  // delete from the right subtree
  if (key > root.val) root.right = deleteNode(root.right, key)
  // delete from the left subtree
  else if (key < root.val) root.left = deleteNode(root.left, key)
  // delete the current node
  else {
    // the node is a leaf
    if (!root.left && !root.right) root = null
    // the node is not a leaf and has a right child
    else if (root.right) {
      root.val = successor(root)
      root.right = deleteNode(root.right, root.val)
    }
    // the node is not a leaf, has no right child, and has a left child
    else {
      root.val = predecessor(root)
      root.left = deleteNode(root.left, root.val)
    }
  }
  return root
}
