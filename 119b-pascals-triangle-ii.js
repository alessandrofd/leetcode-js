/**
 * Given an integer rowIndex, return the rowIndexth (0-indexed) row of the
 * Pascal's triangle.
 *
 * In Pascal's triangle, each number is the sum of the two numbers directly
 * above it.
 *
 * Constraints:
 *    0 <= rowIndex <= 33
 */

import _ from 'lodash'

/**
 * @param {number} rowIndex
 * @return {number[]}
 */
const getRow = (rowIndex) => {}

// prettier-ignore
const funcs = [
  getRow,
]

const data = [
  [3, [1, 3, 3, 1]],
  [0, [1]],
  [1, [1, 1]],
]

for (const func of funcs) {
  for (const [rowIndex, expected] of data) {
    const output = func(rowIndex)
    console.log(_.isEqual(output, expected))
  }
}
