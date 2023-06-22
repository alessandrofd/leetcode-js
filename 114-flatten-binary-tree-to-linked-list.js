/**
 * Given the root of a binary tree, flatten the tree into a "linked list":
 *
 *    The "linked list" should use the same TreeNode class where the right child pointer
 *    points to the next node in the list and the left child pointer is always null.
 *
 *    The "linked list" should be in the same order as a pre-order traversal of the binary tree.
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
 * @return {void} Do not return anything, modify root in-place instead.
 */

// Approach 1: Recursion
const flatten_1 = (root) => {
  const recurse = (node) => {
    if (node === null) return null
    if (node.left === null && node.right === null) return node

    const leftTail = recurse(node.left)
    const rightTail = recurse(node.right)

    if (leftTail !== null) {
      leftTail.right = node.right
      node.right = node.left
      node.left = null
    }

    return rightTail === null ? leftTail : rightTail
  }

  recurse(root)
}

// Approach 2: Iterative Solution using Stack
const flatten_2 = (root) => {
  if (root === null) return null

  const START = 1
  const END = 2

  let tailNode
  const stack = [[root, START]]
  while (stack.length !== 0) {
    const [node, state] = stack.pop()
    if (node.left === null && node.right === null) {
      tailNode = node
      continue
    }
    if (state === START) {
      if (node.left !== null) {
        stack.push([node, END])
        stack.push([node.left, START])
      } else if (node.right !== null) {
        stack.push([node.right, START])
      }
    } else {
      const rightNode = node.right
      if (tailNode) {
        tailNode.right = node.right
        node.right = node.left
        node.left = null
        rightNode = tailNode.right
      }
      if (rightNode) stack.push([rightNode, START])
    }
  }
}

// Approach 3: O(1) Iterative Solution
const flatten_3 = (root) => {
  if (!root) return

  let node = root
  while (node) {
    if (node.left) {
      // Find the rightmost node
      let rightmost = node.left
      while (rightmost.right) rightmost = rightmost.right

      // Rewire the connections
      rightmost.right = node.right
      node.right = node.left
      node.left = null
    }
    node = node.right
  }
}

// Discussion board - sgallivan - w/ Morris Traversal:
const flatten_morris = (root) => {
  let curr = root
  while (curr) {
    if (curr.left) {
      let runner = curr.left
      while (runner.right) runner = runner.right
      runner.right = curr.right
      curr.right = curr.left
      curr.left = null
    }
    curr = curr.right
  }
}

// Discussion board - sgallivan - w/ O(1) Space
const flatten_o1_space = (root) => {
  let head = null
  let curr = root
  while (head !== root) {
    if (curr.right === head) curr.right = null
    if (curr.left === head) curr.left = null
    if (curr.right) curr = curr.right
    else if (curr.left) curr = curr.left
    else (curr.right = head), (head = curr), (curr = root)
  }
}

// Discussion board - sgallivan - w/ Recursion
const flatten = (root) => {
  let head = null
  const revPreOrder = (node) => {
    if (node.right) revPreOrder(node.right)
    if (node.left) revPreOrder(node.left)
    node.left = null
    node.right = head
    head = node
  }
  if (root) revPreOrder(root)
}
