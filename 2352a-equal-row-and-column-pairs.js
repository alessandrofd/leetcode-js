/**
 * Given a 0-indexed n x n integer matrix grid, return the number of pairs
 * (ri, cj) such that row ri and column cj are equal.
 *
 * A row and column pair is considered equal if they contain the same elements
 * in the same order (i.e., an equal array).
 *
 * Constraints:
 *    n == grid.length == grid[i].length
 *    1 <= n <= 200
 *    1 <= grid[i][j] <= 10^5
 */

/**
 * @param {number[][]} grid
 * @return {number}
 */
const equalPairs = (grid) => {}

/**
 * @param {number[][]} grid
 * @return {number}
 */
const equalPairs_hash = (grid) => {}

/**
 * @param {number[][]} grid
 * @return {number}
 */
const equalPairs_trie = (grid) => {}

// prettier-ignore
grid = [[3,2,1],[1,7,6],[2,7,7]]
// Expected: 1

// prettier-ignore
// grid = [[3,1,2,2],[1,4,4,5],[2,4,2,2],[2,4,2,2]]
// Expected: 3

console.log(equalPairs(grid))
console.log(equalPairs_hash(grid))
console.log(equalPairs_trie(grid))
