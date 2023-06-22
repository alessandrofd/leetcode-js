/**
 * Given a n * n matrix grid of 0's and 1's only. We want to represent the grid
 * with a Quad-Tree.
 *
 * Return the root of the Quad-Tree representing the grid.
 *
 * Notice that you can assign the value of a node to True or False when isLeaf
 * is False, and both are accepted in the answer.
 *
 * A Quad-Tree is a tree data structure in which each internal node has exactly
 * four children. Besides, each node has two attributes:
 *
 *    val: True if the node represents a grid of 1's or False if the node
 *    represents a grid of 0's.
 *
 *    isLeaf: True if the node is leaf node on the tree or False if the node
 *    has the four children.
 *
 * Constraints:
 *    n == grid.length == grid[i].length
 *    n == 2^x where 0 <= x <= 6
 */

// Definition for a QuadTree node.
function Node(val, isLeaf, topLeft, topRight, bottomLeft, bottomRight) {
  this.val = val
  this.isLeaf = isLeaf
  this.topLeft = topLeft
  this.topRight = topRight
  this.bottomLeft = bottomLeft
  this.bottomRight = bottomRight
}

/**
 * @param {number[][]} grid
 * @return {Node}
 */
const construct_recursionTopDown = (grid) => {
  const recurse = (x, y, length) => {
    const sameValue = (x, y, length) => {
      for (let i = 0; i < length; i++)
        for (let j = 0; j < length; j++)
          if (grid[x][y] !== grid[x + i][y + j]) return false
      return true
    }

    if (sameValue(x, y, length)) return new Node(grid[x][y] === 1, true)
    length /= 2
    return new Node(
      false,
      false,
      recurse(x, y, length),
      recurse(x, y + length, length),
      recurse(x + length, y, length),
      recurse(x + length, y + length, length)
    )
  }

  return recurse(0, 0, grid.length)
}

const construct_recursionBottomUp = (grid) => {
  const recurse = (x, y, length) => {
    if (1 === length) return new Node(grid[x][y] === 1, true)

    length /= 2
    const topLeft = recurse(x, y, length)
    const topRight = recurse(x, y + length, length)
    const bottomLeft = recurse(x + length, y, length)
    const bottomRight = recurse(x + length, y + length, length)

    if (
      topLeft.isLeaf &&
      topRight.isLeaf &&
      bottomLeft.isLeaf &&
      bottomRight.isLeaf &&
      topLeft.val === topRight.val &&
      topRight.val === bottomLeft.val &&
      bottomLeft.val === bottomRight.val
    )
      return new Node(1 === grid[x][y], true)

    return new Node(false, false, topLeft, topRight, bottomLeft, bottomRight)
  }

  return recurse(0, 0, grid.length)
}

grid = [
  [0, 1],
  [1, 0],
]
// Output: [ [0, 1], [1, 0], [1, 1], [1, 1], [1, 0], ]

console.log(construct_recursionTopDown(grid))
console.log(construct_recursionBottomUp(grid))
