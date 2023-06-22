/**
 * Given the roots of two binary trees p and q, write a function to check if
 * they are the same or not.
 *
 * Two binary trees are considered the same if they are structurally identical,
 * and the nodes have the same value.
 *
 * Constraints:
 *    The number of nodes in both trees is in the range [0, 100].
 *    -10^4 <= Node.val <= 10^4
 */

const PriorityQueue = require('@datastructures-js/priority-queue/src/priorityQueue')

class TreeNode {
  constructor(val, left, right) {
    this.val = val === undefined ? 0 : val
    this.left = left === undefined ? null : left
    this.right = right === undefined ? null : right
  }
}

const buildTree = (array) => {
  if (!array || !array.length) return null

  const root = new TreeNode(array.shift())
  const queue = [root]

  while (array.length) {
    const leftVal = array.shift()
    const rightVal = array.shift() ?? null
    const node = queue.shift()
    if (node) {
      if (leftVal !== null) {
        node.left = new TreeNode(leftVal)
        queue.push(node.left)
      }
      if (rightVal !== null) {
        node.right = new TreeNode(rightVal)
        queue.push(node.right)
      }
    }
  }
  return root
}

/**
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
const isSameTree = (p, q) => {
  if (!p !== !q || p?.val !== q?.val) return false
  if (!p) return true
  return isSameTree(p.left, q.left) && isSameTree(p.right, q.right)
}

p = [1, 2, 3]
q = [1, 2, 3]
// Output: true

// p = [1, 2]
// q = [1, null, 2]
// Output: false

// p = [1, 2, 1]
// q = [1, 1, 2]
// Output: false

console.log(isSameTree(buildTree(p), buildTree(q)))
