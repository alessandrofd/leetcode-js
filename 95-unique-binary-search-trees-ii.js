/**
 * Given an integer n, return all the structurally unique BST's (binary search
 * trees), which has exactly n nodes of unique values from 1 to n. Return the
 * answer in any order.
 *
 * Constraints:
 *    1 <= n <= 8
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

const destroyTree = (root) => {
  const array = []
  const queue = [root]
  while (queue.length) {
    const node = queue.shift()
    array.push(node ? node.val : null)
    if (!node || (!node.left && !node.right)) continue
    queue.push(node.left)
    queue.push(node.right)
  }
  return array
}

/**
 * @param {number} n
 * @return {TreeNode[]}
 */
const generateTrees = (n) => {
  const recurse = (start, end) => {
    if (start > end) return [null]

    const result = []
    for (let i = start; i <= end; i++) {
      for (const leftTree of recurse(start, i - 1)) {
        for (const rightTree of recurse(i + 1, end)) {
          result.push(new TreeNode(i, leftTree, rightTree))
        }
      }
    }
    return result
  }

  return recurse(1, n)
}

n = 3
// Expected: [[1,null,2,null,3],[1,null,3,2],[2,1,3],[3,1,null,null,2],[3,2,null,1]]

// n = 1
// Expected: [[1]]

const arrayOfTrees = generateTrees(n)
for (const tree of arrayOfTrees) {
  console.log(destroyTree(tree))
}
