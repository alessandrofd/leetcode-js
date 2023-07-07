/**
 * Given the root of a binary tree, the level of its root is 1, the level of its
 * children is 2, and so on.
 *
 * Return the smallest level x such that the sum of all the values of nodes at
 * level x is maximal.
 *
 * Constraints:
 *    The number of nodes in the tree is in the range [1, 10^4].
 *    -10^5 <= Node.val <= 10^5
 */

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
 * @return {number}
 */
const maxLevelSum_dfs = (root) => {
  const levels = []

  const dfs = (node, level) => {
    if (!node) return

    levels[level] = (levels[level] ?? 0) + node.val
    dfs(node.left, level + 1)
    dfs(node.right, level + 1)
  }

  dfs(root, 1)

  let maxSum = -Infinity
  let level = 0
  for (let i = 1; i < levels.length; i++) {
    if (levels[i] > maxSum) {
      maxSum = levels[i]
      level = i
    }
  }

  return level
}

/**
 * @param {TreeNode} root
 * @return {number}
 */
const maxLevelSum_bfs = (root) => {
  let maxSum = -Infinity
  let maxLevel = 0

  const queue = [root]
  let level = 1

  while (queue.length) {
    const n = queue.length
    let levelSum = 0
    for (let i = 0; i < n; i++) {
      const node = queue.shift()
      if (!node) continue

      levelSum += node.val

      queue.push(node.left)
      queue.push(node.right)
    }

    if (maxSum < levelSum) {
      maxSum = levelSum
      maxLevel = level
    }

    level += 1
  }

  return maxLevel
}

array = [1, 7, 0, 7, -8, null, null]
// Expected: 2

// array = [989, null, 10250, 98693, -89388, null, null, null, -32127]
// Expected: 2

root = buildTree(array)
console.log(maxLevelSum_dfs(root))
console.log(maxLevelSum_bfs(root))
