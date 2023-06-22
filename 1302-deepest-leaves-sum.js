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

// Approach 1: Iterative DFS Preorder Traversal.
const deepestLeavesSum_dfs = (root) => {
  let deepestSum = 0,
    depth = 0,
    currDepth
  const stack = []
  stack.push([root, 0])
  while (stack.length > 0) {
    ;[root, currDepth] = stack.pop()

    if (!root.left && !root.right) {
      if (depth < currDepth) {
        depth = currDepth
        deepestSum = root.val
      } else if (depth === currDepth) {
        deepestSum += root.val
      }
    } else {
      if (root.left) stack.push([root.left, currDepth + 1])
      if (root.right) stack.push([root.right, currDepth + 1])
    }
  }
  return deepestSum
}

// Approach 2: Iterative BFS Traversal.
const deepestLeavesSum = (root) => {
  let currLevel = [],
    nextLevel = [root]

  while (nextLevel.length) {
    currLevel = nextLevel
    nextLevel = []
    for (const node of currLevel) {
      if (node.left) nextLevel.push(node.left)
      if (node.right) nextLevel.push(node.right)
    }
  }
  return currLevel.reduce((acc, node) => acc + node.val, 0)
}
