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
class Node {
  constructor(val, isLeaf, topLeft, topRight, bottomLeft, bottomRight) {
    this.val = val
    this.isLeaf = isLeaf
    this.topLeft = topLeft
    this.topRight = topRight
    this.bottomLeft = bottomLeft
    this.bottomRight = bottomRight
  }
}

/**
 * @param {number[][]} grid
 * @return {Node}
 */
const construct_recursionTopDown = (grid) => {}

const construct_recursionBottomUp = (grid) => {}

grid = [
  [0, 1],
  [1, 0],
]
// Output: [ [0, 1], [1, 0], [1, 1], [1, 1], [1, 0], ]

console.log(construct_recursionTopDown(grid))
console.log(construct_recursionBottomUp(grid))
