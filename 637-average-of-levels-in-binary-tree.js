/**
 * Given the root of a binary tree, return the average value of the nodes on
 * each level in the form of an array. Answers within 10-5 of the actual answer
 * will be accepted.
 *
 * Constraints:
 *    The number of nodes in the tree is in the range [1, 10^4].
 *    -2^31 <= Node.val <= 2^31 - 1
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
 * @return {number[]}
 */
// Approach #1 Using Depth First Search [Accepted]
const averageOfLevels_1 = (root) => {
  const sums = []
  const counts = []

  const average = (node, level) => {
    if (!node) return
    if (level < sums.length) {
      sums[level] += node.val
      counts[level]++
    } else {
      sums.push(node.val)
      counts.push(1)
    }

    average(node.left, level + 1)
    average(node.right, level + 1)
  }

  average(root, 0)
  for (let i = 0; i < sums.length; i++) sums[i] /= counts[i]

  return sums
}

// Approach #2 Breadth First Search [Accepted]
const averageOfLevels = (root) => {
  const averages = []
  const queue = [root]
  while (!queue.length) {
    let sum = 0
    let count = 0
    const tmp = []
    while (!queue.length) {
      const node = queue.shift()
      sum += node.val
      count++
      if (node.left) tmp.push(node.left)
      if (node.right) tmp.push(node.right)
    }
    averages.push(sum / count)
    queue = tmp
  }
  return averages
}
