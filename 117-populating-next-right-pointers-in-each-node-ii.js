/**
 * // Definition for a Node.
 * function Node(val, left, right, next) {
 *    this.val = val === undefined ? null : val;
 *    this.left = left === undefined ? null : left;
 *    this.right = right === undefined ? null : right;
 *    this.next = next === undefined ? null : next;
 * };
 */

/**
 * @param {Node} root
 * @return {Node}
 */
const connect_1 = (root) => {
  if (!root) return root

  const queue = [root]

  while (queue.length > 0) {
    const len = queue.length
    for (let i = 0; i < len; i++) {
      const node = queue.shift()
      if (i < len - 1) node.next = queue[0]
      if (node.left) queue.push(node.left)
      if (node.right) queue.push(node.right)
    }
  }
  return root
}

const connect = (root) => {
  if (!root) return root

  const processChild = (node) => {
    if (node) {
      if (previous) previous.next = node
      else leftmost = node
      previous = node
    }
  }

  let leftmost = root
  let current, previous
  while (leftmost) {
    previous = null
    current = leftmost
    leftmost = null
    while (current) {
      processChild(current.left)
      processChild(current.right)
      current = current.next
    }
  }

  return root
}
