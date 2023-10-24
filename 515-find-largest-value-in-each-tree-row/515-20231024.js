/**
 * 515. Find Largest Value in Each Tree Row
 *
 * Given the root of a binary tree, return an array of the largest value in each
 * row of the tree (0-indexed).
 *
 * Constraints:
 *    The number of nodes in the tree will be in the range [0, 10^4].
 *    -2^31 <= Node.val <= 2^31 - 1
 */

import _ from 'lodash'

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
 * @param {TreeNode} root
 * @return {number[]}
 */
const largestValues = (root) => {
  if (!root) return []

  const queue = [root]
  const result = []

  while (queue.length > 0) {
    const queueLen = queue.length
    let maxVal = -Infinity
    for (let i = 0; i < queueLen; i++) {
      const node = queue.shift()
      maxVal = Math.max(maxVal, node.val)
      if (node.left) queue.push(node.left)
      if (node.right) queue.push(node.right)
    }
    result.push(maxVal)
  }

  return result
}

// prettier-ignore
const funcs = [
  largestValues,
]

// prettier-ignore
const data = [
  [[1, 3, 2, 5, 3, null, 9], [1, 3, 9]],
  [[1, 2, 3], [1, 3]],
  [[], []]
]

for (const func of funcs) {
  for (const [arr, expected] of data) {
    const root = buildTree(arr)
    console.log(_.isEqual(func(root), expected))
  }
}
