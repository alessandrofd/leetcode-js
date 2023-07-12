/**
 * Given a m x n matrix grid which is sorted in non-increasing order both
 * row-wise and column-wise, return the number of negative numbers in grid.
 *
 * Constraints:
 *    m == grid.length
 *    n == grid[i].length
 *    1 <= m, n <= 100
 *    -100 <= grid[i][j] <= 100
 */

/**
 * @param {number[][]} grid
 * @return {number}
 */
const countNegatives_traversal = (grid) => {}

const countNegatives_binSearch = (grid) => {}

// prettier-ignore
grid = [[4,3,2,-1],[3,2,1,-1],[1,1,-1,-2],[-1,-1,-2,-3]]
// Expected: 8

// prettier-ignore
grid = [[3,2],[1,0]]
// Expected: 0

console.log(countNegatives_traversal(grid))
console.log(countNegatives_binSearch(grid))

console.log(Math.floor(-0.5))
