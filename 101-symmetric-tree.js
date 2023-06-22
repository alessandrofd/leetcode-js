/**
 * Given the root of a binary tree, check whether it is a mirror of itself
 * (i.e., symmetric around its center).
 *
 * Constraints:
 *    The number of nodes in the tree is in the range [1, 1000].
 *    -100 <= Node.val <= 100
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

// Como o temos que fazer uma análise camada a camada, me parece que a melhor
// estratégia é BFS. Podemos colocar todos os nós de um mesmo nível em um array
// e testar se o array é simétrico.

/**
 * @param {TreeNode} root
 * @return {boolean}
 */
const isSymmetric = (root) => {
  const isArraySymmetric = (arr) => {
    const n = arr.length
    if (n > 1 && n % 2) return false
    for (let i = 0; i < n / 2; i++)
      if (arr[i]?.val !== arr[n - 1 - i]?.val) return false
    return true
  }

  let queue = [root]
  while (queue.length) {
    if (!isArraySymmetric(queue)) return false
    const newQueue = []
    while (queue.length) {
      node = queue.shift()
      if (node) {
        newQueue.push(node.left)
        newQueue.push(node.right)
      }
    }
    queue = newQueue
  }

  return true
}

const isSymmetric_DFS = (root) => {
  const isMirror = (left, right) => {
    if (!left && !right) return true
    if (!left || !right) return false

    return (
      left.val === right.val &&
      isMirror(left.left, right.right) &&
      isMirror(left.right, right.left)
    )
  }

  return isMirror(root, root)
}

const isSymmetric_BFS = (root) => {
  const queue = [root, root]
  while (queue.length) {
    const left = queue.shift()
    const right = queue.shift()

    if (!left && !right) continue
    if (!left || !right) return false
    if (left.val !== right.val) return false

    queue.push(left.left)
    queue.push(right.right)
    queue.push(left.right)
    queue.push(right.left)
  }
  return true
}

array = [1, 2, 2, 3, 4, 4, 3]
// Output: true

array = [1, 2, 2, null, 3, null, 3]
// Output: false

const root = buildTree(array)
console.log(isSymmetric(root))
console.log(isSymmetric_DFS(root))
console.log(isSymmetric_BFS(root))
