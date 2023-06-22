/**
 * Given the root of a Binary Search Tree and a target number k, return true if
 * there exist two elements in the BST such that their sum is equal to the given
 * target.
 *
 * Constraints:
 *    The number of nodes in the tree is in the range [1, 10^4].
 *    -10^4 <= Node.val <= 10^4
 *    root is guaranteed to be a valid binary search tree.
 *    -10^5 <= k <= 10^5
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
 * @param {number} k
 * @return {boolean}
 */

// Approach #1 Using HashSet[Accepted]
const findTarget_1 = (root, k) => {
  const set = new Set()

  const find = (node) => {
    if (!node) return false
    if (set.has(k - node.val)) return true
    set.add(node.val)
    return find(node.left) || find(node.right)
  }

  return find(root)
}

// Approach #2 Using BFS and HashSet [Accepted]
const findTarget_2 = (root, k) => {
  const set = new Set()
  const queue = [root]
  while (queue.length) {
    const node = queue.shift()
    if (set.has(k - node.val)) return true
    set.add(node.val)
    if (node.left) queue.push(node.left)
    if (node.right) queue.push(node.right)
  }
  return false
}

// Approach #3 Using BST [Accepted]
const findTarget = (root, k) => {
  const list = []

  const inorder = (node) => {
    if (!node) return null
    inorder(node.left)
    list.push(node.val)
    inorder(node.right)
  }

  inorder(root)
  let left = 0
  let right = list.length - 1
  while (left < right) {
    const sum = list[left] + list[right]
    if (sum === k) return true
    else if (sum < k) left++
    else right--
  }
  return false
}

root = [5, 3, 6, 2, 4, null, 7]
k = 9
// Output: true

root = [5, 3, 6, 2, 4, null, 7]
k = 28
// Output: false

console.log(findTarget(buildTree(root), k))
