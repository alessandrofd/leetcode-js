/**
 * You are given an array of n strings strs, all of the same length.
 *
 * The strings can be arranged such that there is one on each line, making a
 * grid.
 *
 * For example, strs = ["abc", "bce", "cae"] can be arranged as:
 *    abc
 *    bce
 *    cae
 *
 * You want to delete the columns that are not sorted lexicographically. In the
 * above example (0-indexed), columns 0 ('a', 'b', 'c') and 2 ('c', 'e', 'e')
 * are sorted while column 1 ('b', 'c', 'a') is not, so you would delete
 * column 1.
 *
 * Return the number of columns that you will delete.
 *
 * Constraints:
 *    n == strs.length
 *    1 <= n <= 100
 *    1 <= strs[i].length <= 1000
 *    strs[i] consists of lowercase English letters.
 */

/**
 * @param {string[]} strs
 * @return {number}
 */
// Approach 1: Matrix Traversing
const minDeletionSize = (strs) => {
  const rows = strs.length
  const cols = strs[0].length

  let count = 0
  for (let col = 0; col < cols; col++) {
    for (let row = 1; row < rows; row++) {
      if (strs[row - 1][col].charCodeAt() > strs[row][col].charCodeAt()) {
        count++
        break
      }
    }
  }
  return count
}

strs = ['cba', 'daf', 'ghi']
// Output: 1

// strs = ['a', 'b']
// Output: 0

// strs = ['zyx', 'wvu', 'tsr']
// Output: 3

console.log(minDeletionSize(strs))
