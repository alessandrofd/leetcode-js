/**
 * Given the root of a binary tree, return all duplicate subtrees.
 *
 * For each kind of duplicate subtrees, you only need to return the root node of
 * any one of them.
 *
 * Two trees are duplicate if they have the same structure with the same
 * node values.
 *
 * Constraints:
 *    The number of the nodes in the tree will be in the range [1, 5000]
 *    -200 <= Node.val <= 200
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
 * @param {TreeNode} root
 * @return {TreeNode[]}
 */
// A String Representation Approach
const findDuplicateSubtrees_string = (root) => {
  const countSubtrees = new Map()
  const result = []

  const traverse = (node) => {
    if (!node) return ''

    const subtree = `((${traverse(node.left)})${node.val}(${traverse(
      node.right
    )}))`
    countSubtrees.set(subtree, (countSubtrees.get(subtree) ?? 0) + 1)
    if (countSubtrees.get(subtree) === 2) result.push(node)

    return subtree
  }

  traverse(root)
  return result
}

// ID representation approach
const findDuplicateSubtrees_id = (root) => {
  const tripletToId = new Map()
  const countSubtrees = new Map()
  const result = []

  const traverse = (node) => {
    if (!node) return 0
    const triplet = `(${traverse(node.left)},${node.val},${traverse(
      node.right
    )})`
    if (!tripletToId.has(triplet))
      tripletToId.set(triplet, tripletToId.size + 1)
    const id = tripletToId.get(triplet)

    countSubtrees.set(id, (countSubtrees.get(id) ?? 0) + 1)
    if (countSubtrees.get(id) == 2) result.push(node)

    return id
  }

  traverse(root)
  return result
}

root = [1, 2, 3, 4, null, 2, 4, null, null, 4]
// Output: [[2,4],[4]]

root = [2, 1, 1]
// Output: [[1]]

root = [2, 2, 2, 3, null, 3, null]
// Output: [[2,3],[3]]

for (const solution of [
  findDuplicateSubtrees_string,
  findDuplicateSubtrees_id,
]) {
  const tree = buildTree([...root])
  const result = []
  for (const subtree of solution(tree)) result.push(destroyTree(subtree))
  console.log(result)
}
