/**
 * Given an n-ary tree, return the level order traversal of its nodes' values.
 *
 * Nary-Tree input serialization is represented in their level order traversal,
 * each group of children is separated by the null value (See examples).
 *
 * Constraints:
 *    The height of the n-ary tree is less than or equal to 1000
 *    The total number of nodes is between [0, 104]
 */

/**
 * // Definition for a Node.
 * function Node(val,children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */

/**
 * @param {Node|null} root
 * @return {number[][]}
 */
// Approach 1: Breadth-first Search using a Queue
const levelOrder_1 = (root) => {
  const result = []
  if (!root) return result

  let queue = [root]
  while (queue.length) {
    const level = []
    const tmp = []
    while (queue.length) {
      const node = queue.shift()
      level.push(node.val)
      tmp.push(...node.children)
    }
    result.push(level)
    queue = tmp
  }
  return result
}

// Approach 3: Recursion
const levelOrder = (root) => {
  const result = []

  const traverse = (node, level) => {
    if (result.length <= level) result.push([])
    result[level].push(node.val)
    for (const child of node.children) traverse(node.child, level + 1)
  }

  if (root) traverse(root, 0)
  return result
}
