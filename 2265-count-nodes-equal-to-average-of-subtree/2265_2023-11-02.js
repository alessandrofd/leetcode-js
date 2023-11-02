class TreeNode {
  constructor(val, left, right) {
    this.val = val === undefined ? 0 : val
    this.left = left === undefined ? null : left
    this.right = right === undefined ? null : right
  }
}

const buildTree = (array) => {
  if (!array || !array.length) return null

  array = [...array]

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
const averageOfSubtree = (root) => {
  let result = 0

  const dfs = (node) => {
    if (!node) return [0, 0]

    const [sumLeft, countLeft] = dfs(node.left)
    const [sumRight, countRight] = dfs(node.right)
    const sumNode = sumLeft + sumRight + node.val
    const countNode = countLeft + countRight + 1
    if (node.val === Math.floor(sumNode / countNode)) result += 1

    return [sumNode, countNode]
  }

  dfs(root)
  return result
}

// prettier-ignore
const funcs = [
  averageOfSubtree,
]

const data = [
  [[4, 8, 5, 0, 1, null, 6], 5],
  [[1], 1],
]

for (const func of funcs) {
  for (const [arr, expected] of data) {
    const root = buildTree(arr)
    console.log(func(root) === expected)
  }
}
