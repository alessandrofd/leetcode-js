/**
 * Given an integer array nums where the elements are sorted in ascending order,
 * convert it to a height-balanced binary search tree.
 *
 * A height-balanced binary tree is a binary tree in which the depth of the two
 * subtrees of every node never differs by more than one.
 */

function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val
  this.left = left === undefined ? null : left
  this.right = right === undefined ? null : right
}

/**
 * @param {number[]} nums
 * @return {TreeNode}
 */
// Approach 1: Preorder Traversal: Always Choose Left Middle Node as a Root
const sortedArrayToBST = (nums) => {
  const helper = (left, right) => {
    if (left > right) return null

    // always choose left middle node as a root
    const p = ((left + right) / 2) | 0

    // preorder traversal: node -> left -> right
    const root = new TreeNode(nums[p])
    root.left = helper(left, p - 1)
    root.right = helper(p + 1, right)
    return root
  }

  return helper(0, nums.length - 1)
}

nums = [-10, -3, 0, 5, 9]
// Output: [0, -3, 9, -10, null, 5]

// nums = [1, 3]
// Output: [3, 1]

console.log(sortedArrayToBST(nums))
