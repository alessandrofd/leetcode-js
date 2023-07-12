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
const countNegatives = (grid) => {
  const rows = grid.length
  const cols = grid[0].length

  let count = 0
  let lastPositive = cols - 1
  for (let row = 0; row < rows; row++) {
    while (grid[row][lastPositive] < 0) lastPositive -= 1
    count += cols - 1 - lastPositive
  }
  return count
}

const countNegatives_binSearch = (grid) => {
  const rows = grid.length
  const cols = grid[0].length

  let count = 0
  let lastPositive = cols - 1
  for (let row = 0; row < rows; row++) {
    let lo = 0
    let hi = lastPositive
    while (lo <= hi) {
      const mid = Math.floor((lo + hi) / 2)
      if (grid[row][mid] >= 0) lo = mid + 1
      else hi = mid - 1
    }
    lastPositive = lo - 1
    count += cols - 1 - lastPositive
  }
  return count
}

// prettier-ignore
grid = [[4,3,2,-1],[3,2,1,-1],[1,1,-1,-2],[-1,-1,-2,-3]]
// Expected: 8

// prettier-ignore
grid = [[3,2],[1,0]]
// Expected: 0

console.log(countNegatives(grid))
console.log(countNegatives_binSearch(grid))

console.log(Math.floor(-0.5))
