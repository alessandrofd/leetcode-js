/**
 * Given an n x n matrix where each of the rows and columns is sorted in
 * ascending order, return the kth smallest element in the matrix.
 *
 * Note that it is the kth smallest element in the sorted order, not the kth
 * distinct element.
 *
 * You must find a solution with a memory complexity better than O(n^2).
 */

/**
 * @param {number[][]} matrix
 * @param {number} k
 * @return {number}
 */

// Approach 1: Min-Heap approach
// @datastructures-js/priority-queue@5.3.0
const { MinPriorityQueue } = require('@datastructures-js/priority-queue')
const kthSmallest_1 = (matrix, k) => {
  const n = matrix.length
  const minHeap = new MinPriorityQueue()

  for (let row = 0; row < Math.min(n, k); row++)
    minHeap.enqueue([row, 0], matrix[row][0])

  let data = minHeap.front().element
  while (k-- > 0) {
    data = minHeap.dequeue()
    const [row, col] = data.element
    if (col < n - 1) minHeap.enqueue([row, col + 1], matrix[row][col + 1])
  }
  return data.priority
}

// Approach 2: Binary Search
const kthSmallest = (matrix, k) => {
  const n = matrix.length

  const countLessEqual = (mid, startEndPair) => {
    let count = 0
    let row = n - 1
    let col = 0

    while (row >= 0 && col < n) {
      if (matrix[row][col] > mid) {
        startEndPair[1] = Math.min(startEndPair[1], matrix[row][col])
        row--
      } else {
        startEndPair[0] = Math.max(startEndPair[0], matrix[row][col])
        count += row + 1
        col++
      }
    }
    return count
  }

  let start = matrix[0][0]
  let end = matrix[n - 1][n - 1]
  while (start < end) {
    const mid = start + (end - start) / 2
    const startEndPair = [matrix[0][0], matrix[n - 1][n - 1]]
    const count = countLessEqual(mid, startEndPair)
    if (count === k) return startEndPair[0]
    if (count < k) start = startEndPair[1] // search higher
    else end = startEndPair[0] // search lower
  }
  return start
}

// matrix = [
//   [1, 5, 9],
//   [10, 11, 13],
//   [12, 13, 15],
// ]
// k = 8
// Output: 13

matrix = [[-5]]
k = 1
// // Output: -5

console.log(kthSmallest(matrix, k))
