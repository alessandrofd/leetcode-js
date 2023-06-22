/**
 * Given the root of a binary tree, split the binary tree into two subtrees by
 * removing one edge such that the product of the sums of the subtrees is
 * maximized.
 *
 * Return the maximum product of the sums of the two subtrees. Since the answer
 * may be too large, return it modulo 10^9 + 7.
 *
 * Note that you need to maximize the answer before taking the mod and not after
 * taking it.
 *
 * Constraints:
 *    The number of nodes in the tree is in the range [2, 5 * 10^4].
 *    1 <= Node.val <= 10^4
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

// Approach 1: One-Pass DFS
// const maxProduct = (root) => {
const maxProduct_1pass = (root) => {
  const sums = []

  const treeSum = (node) => {
    if (!node) return 0
    const sum = node.val + treeSum(node.left) + treeSum(node.right)
    sums.push(sum)
    return sum
  }

  const totalSum = treeSum(root)
  let max = 0
  for (const sum of sums) max = Math.max(max, (totalSum - sum) * sum)
  return max % (10 ** 9 + 7)
}

// Approach 2: Two-Pass DFS
// const maxProduct = (root) => {
const maxProduct_2pass = (root) => {
  const treeSum = (node) => {
    if (!node) return 0
    return node.val + treeSum(node.left) + treeSum(node.right)
  }

  const totalSum = treeSum(root)
  let max = 0

  const maxProd = (node) => {
    if (!node) return 0
    const sum = node.val + maxProd(node.left) + maxProd(node.right)
    max = Math.max(max, (totalSum - sum) * sum)
    return sum
  }

  maxProd(root)
  return max % (10 ** 9 + 7)
}

// Approach 3: Advanced Strategies for Dealing with 32-Bit Integers
const maxProduct = (root) => {
  // const maxProduct_modular = (root) => {
  const sums = []

  const treeSum = (node) => {
    if (!node) return 0
    const sum = node.val + treeSum(node.left) + treeSum(node.right)
    sums.push(sum)
    return sum
  }

  const modularMultiplication = (a, b, m) => {
    let product = 0
    while (b) {
      const bit = b % 2
      b >>= 1
      if (bit) {
        product += a
        product %= m
      }
      a <<= 1
      a %= m
    }
    return product
  }

  const totalSum = treeSum(root)
  let minDiff = Infinity
  let closestToHalf

  for (const sum of sums) {
    const diff = Math.abs(totalSum - sum - sum)
    if (diff < minDiff) {
      minDiff = diff
      closestToHalf = sum
    }
  }

  return modularMultiplication(
    totalSum - closestToHalf,
    closestToHalf,
    10 ** 9 + 7
  )
}

root = [1, 2, 3, 4, 5, 6]
// Output: 110
// Explanation: Remove the red edge and get 2 binary trees with sum 11 and 10. Their product is 110 (11*10)

root = [1, null, 2, 3, 4, null, null, 5, 6]
// Output: 90
// Explanation: Remove the red edge and get 2 binary trees with sum 15 and 6.Their product is 90 (15*6)

console.log(maxProduct(buildTree(root)))
