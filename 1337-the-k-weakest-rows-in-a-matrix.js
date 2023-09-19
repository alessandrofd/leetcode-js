/**
 * You are given an m x n binary matrix mat of 1's (representing soldiers) and
 * 0's (representing civilians). The soldiers are positioned in front of the
 * civilians. That is, all the 1's will appear to the left of all the 0's in
 * each row.
 *
 * A row i is weaker than a row j if one of the following is true:
 *
 *    The number of soldiers in row i is less than the number of soldiers in
 *    row j.
 *
 *    Both rows have the same number of soldiers and i < j.
 *
 * Return the indices of the k weakest rows in the matrix ordered from weakest
 * to strongest.
 *
 * Constraints:
 *    m == mat.length
 *    n == mat[i].length
 *    2 <= n, m <= 100
 *    1 <= k <= m
 *    matrix[i][j] is either 0 or 1.
 */

import _ from 'lodash'
import { MaxPriorityQueue } from '@datastructures-js/priority-queue'

/**
 * @param {number[][]} matrix
 * @param {number} numWeakestRows
 * @return {number[]}
 */
const kWeakestRows_sort = (matrix, numWeakestRows) =>
  matrix
    .map((row, i) => [row.reduce((acc, n) => acc + n), i])
    .sort(([a], [b]) => a - b)
    .slice(0, numWeakestRows)
    .map((row) => row[1])

/**
 * @param {number[][]} matrix
 * @param {number} numWeakestRows
 * @return {number[]}
 */
const kWeakestRows_pq = (matrix, numWeakestRows) => {
  const n = matrix.length

  const pq = new MaxPriorityQueue({
    priority: (element) => element[1] * 100 + element[0],
  })
  for (let i = 0; i < n; i++) {
    const row = matrix[i]
    const soldiers = row.reduce((acc, n) => acc + n)
    pq.enqueue([i, soldiers])
    if (pq.size() > numWeakestRows) pq.dequeue()
  }

  const result = []
  while (pq.size()) result.push(pq.dequeue().element[0])
  return result.reverse()
}

// prettier-ignore
const funcs = [
  kWeakestRows_sort, 
  kWeakestRows_pq
]

const data = [
  [
    [
      [1, 1, 0, 0, 0],
      [1, 1, 1, 1, 0],
      [1, 0, 0, 0, 0],
      [1, 1, 0, 0, 0],
      [1, 1, 1, 1, 1],
    ],
    3,
    [2, 0, 3],
  ],

  [
    [
      [1, 0, 0, 0],
      [1, 1, 1, 1],
      [1, 0, 0, 0],
      [1, 0, 0, 0],
    ],
    2,
    [0, 2],
  ],
  [
    [
      [1, 1, 1, 0, 0, 0, 0],
      [1, 1, 1, 1, 1, 1, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 0, 0, 0, 0],
      [1, 1, 1, 1, 1, 1, 1],
    ],
    4,
    [2, 0, 3, 1],
  ],
]

for (const func of funcs) {
  for (const [matrix, numWeakestRows, expected] of data) {
    console.log(_.isEqual(func(matrix, numWeakestRows), expected))
  }
}
