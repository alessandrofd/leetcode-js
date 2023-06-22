/**
 * Given the root of a binary tree, calculate the vertical order traversal of
 * the binary tree.
 *
 * For each node at position (row, col), its left and right children will be at
 * positions (row + 1, col - 1) and (row + 1, col + 1) respectively. The root of
 * the tree is at (0, 0).
 *
 * The vertical order traversal of a binary tree is a list of top-to-bottom
 * orderings for each column index starting from the leftmost column and ending
 * on the rightmost column. There may be multiple nodes in the same row and same
 * column. In such a case, sort these nodes by their values.
 *
 * Return the vertical order traversal of the binary tree.
 *
 * Constraints:
 *    The number of nodes in the tree is in the range [1, 1000].
 *    0 <= Node.val <= 1000
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
 * @return {number[][]}
 */
// Approach 1: BFS/DFS with Global Sorting
// BFS
const verticalTraversal_1_bfs = (root) => {
  const nodes = []

  const bfs = (node) => {
    let row = 0
    let col = 0
    const queue = [[node, row, col]]

    while (queue.length) {
      ;[node, row, col] = queue.shift()
      if (node) {
        nodes.push([col, row, node.val])
        queue.push([node.left, row + 1, col - 1])
        queue.push([node.right, row + 1, col + 1])
      }
    }
  }

  if (!root) return nodes

  bfs(root)

  // Sort by col, row, val
  nodes.sort(([a1, a2, a3], [b1, b2, b3]) => a1 - b1 || a2 - b2 || a3 - b3)

  // Extract the values, partitioned by columns
  let result = []
  let column = []
  let index = nodes[0][0]
  for (const node of nodes) {
    const [col, row, val] = node
    if (col === index) column.push(val)
    else {
      result.push(column)
      column = [val]
      index = col
    }
  }
  result.push(column)

  return result
}

// Approach 1: BFS/DFS with Global Sorting
// DFS
const verticalTraversal_1_dfs = (root) => {
  const nodes = []

  const dfs = (node, row, col) => {
    if (!node) return
    nodes.push([col, row, node.val])
    dfs(node.left, row + 1, col - 1)
    dfs(node.right, row + 1, col + 1)
  }

  if (!root) return nodes

  dfs(root, 0, 0)

  // Sort by col, row, val
  nodes.sort(([a1, a2, a3], [b1, b2, b3]) => a1 - b1 || a2 - b2 || a3 - b3)

  // Extract the values, partitioned by columns
  let result = []
  let column = []
  let index = nodes[0][0]
  for (const node of nodes) {
    const [col, row, val] = node
    if (col === index) column.push(val)
    else {
      result.push(column)
      column = [val]
      index = col
    }
  }
  result.push(column)

  return result
}

// Approach 2: BFS/DFS with Partition Sorting
// BFS Traversal
const verticalTraversal_2_bfs = (root) => {
  const map = new Map()
  let minCol = Infinity
  let maxCol = -Infinity

  const bfs = (node) => {
    let row = 0
    let col = 0
    let queue = [[node, row, col]]

    while (queue.length) {
      ;[node, row, col] = queue.shift()
      if (node) {
        if (!map.get(col)) map.set(col, [])
        map.get(col).push([row, node.val])

        minCol = Math.min(minCol, col)
        maxCol = Math.max(maxCol, col)

        queue.push([node.left, row + 1, col - 1])
        queue.push([node.right, row + 1, col + 1])
      }
    }
  }

  const result = []
  if (!root) return result

  bfs(root)

  for (let i = minCol; i <= maxCol; i++) {
    const column = map.get(i)
    column.sort(([a1, a2], [b1, b2]) => a1 - b1 || a2 - b2)

    const sorted = []
    for (const [_, val] of column) sorted.push(val)

    result.push(sorted)
  }

  return result
}

// Approach 2: BFS/DFS with Partition Sorting
// DFS Traversal
const verticalTraversal = (root) => {
  const map = new Map()
  let minCol = Infinity
  let maxCol = -Infinity

  const dfs = (node, row, col) => {
    if (node === null) return

    if (!map.get(col)) map.set(col, [])
    map.get(col).push([row, node.val])

    minCol = Math.min(minCol, col)
    maxCol = Math.max(maxCol, col)

    dfs(node.left, row + 1, col - 1)
    dfs(node.right, row + 1, col + 1)
  }

  const result = []
  if (!root) return result

  bfs(root, 0, 0)

  for (let i = minCol; i <= maxCol; i++) {
    const column = map.get(i)
    column.sort(([a1, a2], [b1, b2]) => a1 - b1 || a2 - b2)

    const sorted = []
    for (const [_, val] of column) sorted.push(val)

    result.push(sorted)
  }

  return result
}

map = new Map()
map.set(0, [1, 2, 3])
console.log(map)
if (!map.get(1)) map.set(1, [])
map.get(1).push(4, 5, 6)
// map.set(1, map.get(1).push([4, 5, 6]))
map
