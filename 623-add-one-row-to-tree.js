/**
 * Given the root of a binary tree and two integers val and depth, add a row of
 * nodes with value val at the given depth depth.
 *
 * Note that the root node is at depth 1.
 *
 * The adding rule is:
 *    Given the integer depth, for each not null tree node cur at the depth
 *    depth - 1, create two tree nodes with value val as cur's left subtree root
 *    and right subtree root.
 *
 *    cur's original left subtree should be the left subtree of the new left
 *    subtree root.
 *
 *    cur's original right subtree should be the right subtree of the new right
 *    subtree root.
 *
 *    If depth == 1 that means there is no depth depth - 1 at all, then create a
 *    tree node with value val as the new root of the whole original tree, and
 *    the original tree is the new root's left subtree.
 *
 * Constraints:
 *    The number of nodes in the tree is in the range [1, 104].
 *    The depth of the tree is in the range [1, 104].
 *    -100 <= Node.val <= 100
 *    -10^5 <= val <= 10^5
 *    1 <= depth <= the depth of tree + 1
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
 * @param {TreeNode} root
 * @param {number} val
 * @param {number} depth
 * @return {TreeNode}
 */
// Approach #1 Using Recursion(DFS) [Accepted]
const addOneRow_1 = (root, val, targetDepth) => {
  if (targetDepth === 1) {
    const newRoot = new TreeNode(val)
    newRoot.left = root
    return newRoot
  }

  const insert = (node, currDepth) => {
    if (!node) return
    if (currDepth === targetDepth - 1) {
      node.left = new TreeNode(val, node.left)
      node.right = new TreeNode(val, null, node.right)
    } else {
      insert(node.left, currDepth + 1)
      insert(node.right, currDepth + 1)
    }
  }

  insert(root, 1)
  return root
}

// Approach #2 Using stack(DFS) [Accepted]
const addOneRow_2 = (root, val, targetDepth) => {
  if (targetDepth === 1) {
    const newRoot = new TreeNode(val)
    newRoot.left = root
    return newRoot
  }

  const stack = [{ node: root, currDepth: 1 }]
  while (stack.length) {
    const { node, currDepth } = stack.pop()
    if (!node) continue
    if (currDepth === targetDepth - 1) {
      node.left = new TreeNode(val, node.left)
      node.right = new TreeNode(val, null, node.right)
    } else {
      stack.push({ node: node.left, currDepth: currDepth + 1 })
      stack.push({ node: node.right, currDepth: currDepth + 1 })
    }
  }

  return root
}

// Approach #3 Using queue(BFS) [Accepted]
const addOneRow = (root, val, targetDepth) => {
  if (targetDepth === 1) {
    const newRoot = new TreeNode(val)
    newRoot.left = root
    return newRoot
  }

  let queue = [root]
  let currDepth = 1
  while (currDepth < targetDepth - 1) {
    const temp = []
    while (queue.length) {
      const node = queue.shift()
      if (node.left) temp.push(node.left)
      if (node.right) temp.push(node.right)
    }
    queue = temp
    currDepth++
  }

  while (queue.length) {
    const node = queue.shift()
    node.left = new TreeNode(val, node.left)
    node.right = new TreeNode(val, null, node.right)
  }

  return root
}

root = [4, 2, 6, 3, 1, 5]
val = 1
depth = 2
// Output: [4, 1, 1, 2, null, null, 6, 3, 1, 5]

// root = [4, 2, null, 3, 1]
// val = 1
// depth = 3
// Output: [4, 2, null, 1, 1, 3, null, null, 1]

console.log(destroyTree(addOneRow(buildTree(root), val, depth)))
