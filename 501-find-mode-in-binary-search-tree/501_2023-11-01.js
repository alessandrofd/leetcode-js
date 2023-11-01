import _ from 'lodash'

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

/**
 * @param {TreeNode} root
 * @return {number[]}
 */
const findMode_dfs_iterative = (root) => {
  const counter = new Map()

  const stack = [root]
  while (stack.length) {
    const node = stack.pop()
    counter.set(node.val, (counter.get(node.val) ?? 0) + 1)
    if (node.left) stack.push(node.left)
    if (node.right) stack.push(node.right)
  }

  const maxCount = Math.max(...counter.values())
  const result = []
  for (const [num, count] of counter.entries()) {
    if (count === maxCount) result.push(num)
  }

  return result
}

/**
 * @param {TreeNode} root
 * @return {number[]}
 */
const findMode_no_map = (root) => {
  const values = []

  const dfs = (node) => {
    if (!node) return

    dfs(node.left)
    values.push(node.val)
    dfs(node.right)
  }

  dfs(root)

  let maxStreak = 0
  let currStreak = 1
  let currNum = Infinity
  let result = []

  for (const num of values) {
    if (num === currNum) {
      currStreak += 1
    } else {
      currStreak = 1
      currNum = num
    }

    if (currStreak > maxStreak) {
      maxStreak = currStreak
      result = []
    }

    if (currStreak === maxStreak) {
      result.push(num)
    }
  }
  return result
}

/**
 * @param {TreeNode} root
 * @return {number[]}
 */
const findMode_no_map_constant_space = (root) => {
  let maxStreak = 0
  let currStreak = 0
  let currNum = Infinity
  let result = []

  const dfs = (node) => {
    if (!node) return

    dfs(node.left)

    if (node.val === currNum) {
      currStreak += 1
    } else {
      currStreak = 1
      currNum = node.val
    }

    if (currStreak > maxStreak) {
      maxStreak = currStreak
      result = []
    }

    if (currStreak === maxStreak) {
      result.push(node.val)
    }

    dfs(node.right)
  }

  dfs(root)
  return result
}

/**
 * @param {TreeNode} root
 * @return {number[]}
 */
const findMode_morris = (root) => {
  let maxStreak = 0
  let currStreak = 0
  let currNum = Infinity
  let result = []

  let curr = root
  while (curr) {
    if (curr.left) {
      // Find friend and connect it to curr
      let friend = curr.left
      while (friend.right) friend = friend.right
      friend.right = curr

      // Move to curr.left and delete the edge
      const left = curr.left
      curr.left = null
      curr = left
    } else {
      if (curr.val === currNum) {
        currStreak += 1
      } else {
        currStreak = 1
        currNum = curr.val
      }

      if (currStreak > maxStreak) {
        maxStreak = currStreak
        result = []
      }

      if (currStreak === maxStreak) {
        result.push(curr.val)
      }

      curr = curr.right
    }
  }

  return result
}

// prettier-ignore
const funcs = [
  // findMode_dfs_iterative,
  // findMode_no_map,
  // findMode_no_map_constant_space,
  findMode_morris,
]

const data = [
  [[1, null, 2, 2], [2]],
  [[0], [0]],
]

for (const func of funcs) {
  for (const [arr, expected] of data) {
    const root = buildTree(arr)
    const output = func(root).sort((a, b) => a - b)
    console.log(_.isEqual(output, expected))
  }
}
