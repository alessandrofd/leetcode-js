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
const isBalanced = (root) => {
  const heightBTree = (root) => {
    if (!root) return 0
    //console.log(root?.val)
    const leftHeight = heightBTree(root.left)
    const rightHeight = heightBTree(root.right)
    //console.log(leftHeight, rightHeight)
    if (
      leftHeight === -1 ||
      rightHeight === -1 ||
      Math.abs(leftHeight - rightHeight) > 1
    )
      return -1
    return Math.max(leftHeight, rightHeight) + 1
  }
  return heightBTree(root) !== -1 ? true : false
}

class TreeNode {
  constructor(val, left, right) {
    this.val = val === undefined ? 0 : val
    this.left = left === undefined ? null : left
    this.right = right === undefined ? null : right
  }
}
// [1, 2, 2, 3, 3, null, null, 4, 4]

//const t4_1 = new TreeNode(4)
//const t4_2 = new TreeNode(4)
//const t3_1 = new TreeNode(3, t4_1, t4_2)
//const t3_2 = new TreeNode(3)
//const t2_1 = new TreeNode(2, t3_1, t3_2)
//const t2_2 = new TreeNode(2)
//const t1 = new TreeNode(1, t2_1, t2_2)

//[3,9,20,null,null,15,7]

const t3_4 = new TreeNode(7)
const t3_3 = new TreeNode(15)
const t2_2 = new TreeNode(20, t3_3, t3_4)
const t2_1 = new TreeNode(9)
const t1 = new TreeNode(3, t2_1, t2_2)

console.log(isBalanced(t1))
