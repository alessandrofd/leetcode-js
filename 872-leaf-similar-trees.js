/**
 * Consider all the leaves of a binary tree, from left to right order, the
 * values of those leaves form a leaf value sequence.
 *
 * Two binary trees are considered leaf-similar if their leaf value sequence is
 * the same.
 *
 * Return true if and only if the two given trees with head nodes root1 and
 * root2 are leaf-similar.
 *
 * Constraints:
 *    The number of nodes in each tree will be in the range [1, 200].
 *    Both of the given trees will have values in the range [0, 200].
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
      if (leftVal) {
        node.left = new TreeNode(leftVal)
        queue.push(node.left)
      }
      if (rightVal) {
        node.right = new TreeNode(rightVal)
        queue.push(node.right)
      }
    }
  }
  return root
}

/**
 * @param {TreeNode} root1
 * @param {TreeNode} root2
 * @return {boolean}
 */
const leafSimilar_recursion = (root1, root2) => {
  // const leafSimilar = (root1, root2) => {
  const dfs = (node, arr) => {
    if (node.left) dfs(node.left, arr)
    if (node.right) dfs(node.right, arr)
    if (!node.left && !node.right) arr.push(node.val)
  }

  const arr1 = []
  dfs(root1, arr1)

  const arr2 = []
  dfs(root2, arr2)

  if (arr1.length !== arr2.length) return false
  for (let i = 0; i < arr1.length; i++) if (arr1[i] !== arr2[i]) return false

  return true
}

// const leafSimilar_stack = (root1, root2) => {
const leafSimilar = (root1, root2) => {
  const leafs = (root) => {
    const result = []
    const stack = [root]

    while (stack.length) {
      const node = stack.pop()
      if (node) {
        stack.push(node.right)
        stack.push(node.left)
        if (!node.left && !node.right) result.push(node.val)
      }
    }

    return result
  }

  const arr1 = leafs(root1)
  const arr2 = leafs(root2)

  if (arr1.length !== arr2.length) return false
  for (let i = 0; i < arr1.length; i++) if (arr1[i] !== arr2[i]) return false

  return true
}

root1 = [3, 5, 1, 6, 2, 9, 8, null, null, 7, 4]
root2 = [3, 5, 1, 6, 7, 4, 2, null, null, null, null, null, null, 9, 8]
// Output: true

root1 = [1, 2, 3]
root2 = [1, 3, 2]
// Output: false

console.log(leafSimilar(buildTree(root1), buildTree(root2)))
