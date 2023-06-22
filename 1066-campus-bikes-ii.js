/**
 * On a campus represented as a 2D grid, there are n workers and m bikes, with
 * n <= m. Each worker and bike is a 2D coordinate on this grid.
 *
 * We assign one unique bike to each worker so that the sum of the Manhattan
 * distances between each worker and their assigned bike is minimized.
 *
 * Return the minimum possible sum of Manhattan distances between each worker
 * and their assigned bike.
 *
 * The Manhattan distance between two points p1 and p2 is:
 *    Manhattan(p1, p2) = |p1.x - p2.x| + |p1.y - p2.y|.
 *
 * Constraints:
 *    n == workers.length
 *    m == bikes.length
 *    1 <= n <= m <= 10
 *    workers[i].length == 2
 *    bikes[i].length == 2
 *    0 <= workers[i][0], workers[i][1], bikes[i][0], bikes[i][1] < 1000
 *    All the workers and the bikes locations are unique.
 */

/**
 * @param {number[][]} workers
 * @param {number[][]} bikes
 * @return {number}
 */
// Approach 1: Greedy Backtracking
const assignBikes_greedyBacktracking = (workers, bikes) => {
  // const assignBikes = (workers, bikes) => {
  let smallestDistance = Infinity
  const visited = new Array(bikes.length).fill(false)

  const calcDistance = (worker, bike) =>
    Math.abs(workers[worker][0] - bikes[bike][0]) +
    Math.abs(workers[worker][1] - bikes[bike][1])

  const findSmallestDistance = (worker, distance) => {
    if (worker >= workers.length) {
      smallestDistance = Math.min(smallestDistance, distance)
      return
    }

    if (distance >= smallestDistance) return

    for (let bike = 0; bike < bikes.length; bike++) {
      if (!visited[bike]) {
        visited[bike] = true
        findSmallestDistance(worker + 1, distance + calcDistance(worker, bike))
        visited[bike] = false
      }
    }
  }

  findSmallestDistance(0, 0)
  return smallestDistance
}

// Approach 2: Top-Down Dynamic Programming + BitMasking
const assignBikes_topDownDP = (workers, bikes) => {
  // const assignBikes = (workers, bikes) => {
  const memo = []

  const calcDistance = (worker, bike) =>
    Math.abs(workers[worker][0] - bikes[bike][0]) +
    Math.abs(workers[worker][1] - bikes[bike][1])

  const findSmallestDistance = (worker, mask) => {
    if (worker >= workers.length) return 0

    if (memo[mask]) return memo[mask]

    let smallestDistance = Infinity
    for (let bike = 0; bike < bikes.length; bike++) {
      if ((mask & (1 << bike)) === 0) {
        smallestDistance = Math.min(
          smallestDistance,
          calcDistance(worker, bike) +
            findSmallestDistance(worker + 1, mask | (1 << bike))
        )
      }
    }
    return (memo[mask] = smallestDistance)
  }

  return findSmallestDistance(0, 0)
}

// Approach 3: Bottom-Up Dynamic Programming + BitMasking
const assignBikes_bottomUpDP = (workers, bikes) => {
  // const assignBikes = (workers, bikes) => {
  const memo = new Array(1024).fill(Infinity)
  memo[0] = 0

  const countWorkersWithBikes = (mask) => {
    let count = 0
    while (mask) {
      mask &= mask - 1
      count++
    }
    return count
  }

  const calcDistance = (worker, bike) =>
    Math.abs(workers[worker][0] - bikes[bike][0]) +
    Math.abs(workers[worker][1] - bikes[bike][1])

  let smallestDistance = Infinity

  for (let mask = 0; mask < 1 << bikes.length; mask++) {
    const worker = countWorkersWithBikes(mask)
    if (worker >= workers.length) {
      smallestDistance = Math.min(smallestDistance, memo[mask])
      continue
    }

    for (let bike = 0; bike < bikes.length; bike++) {
      if ((mask & (1 << bike)) === 0) {
        const newMask = mask | (1 << bike)
        memo[newMask] = Math.min(
          memo[newMask],
          memo[mask] + calcDistance(worker, bike)
        )
      }
    }
  }
  return smallestDistance
}

// Approach 4: Priority Queue (Similar to Dijkstra's Algorithm)
import { MinPriorityQueue } from '@datastructures-js/priority-queue'
// const assignBikes_priorityQueue = (workers, bikes) => {
const assignBikes = (workers, bikes) => {
  const countWorkersWithBikes = (mask) => {
    let count = 0
    while (mask) {
      mask &= mask - 1
      count++
    }
    return count
  }

  const calcDistance = (worker, bike) =>
    Math.abs(workers[worker][0] - bikes[bike][0]) +
    Math.abs(workers[worker][1] - bikes[bike][1])

  const queue = new MinPriorityQueue({
    priority: (assignment) => assignment.distance,
  })
  queue.enqueue({ distance: 0, mask: 0 })

  const visited = new Set()

  while (!queue.isEmpty()) {
    const { distance: currDistance, mask: currMask } = queue.dequeue().element
    if (visited.has(currMask)) continue
    visited.add(currMask)

    const worker = countWorkersWithBikes(currMask)
    if (worker === workers.length) return currDistance

    for (let bike = 0; bike < bikes.length; bike++) {
      if ((currMask & (1 << bike)) === 0) {
        const distance = currDistance + calcDistance(worker, bike)
        const mask = currMask | (1 << bike)
        queue.enqueue({ distance, mask })
      }
    }
  }
}

let workers = [
  [0, 0],
  [2, 1],
]
let bikes = [
  [1, 2],
  [3, 3],
]
// Output: 6
// Explanation:
// We assign bike 0 to worker 0, bike 1 to worker 1. The Manhattan distance of
// both assignments is 3, so the output is 6.

workers = [
  [0, 0],
  [1, 1],
  [2, 0],
]
bikes = [
  [1, 0],
  [2, 2],
  [2, 1],
]
// Output: 4
// Explanation:
// We first assign bike 0 to worker 0, then assign bike 1 to worker 1 or
// worker 2, bike 2 to worker 2 or worker 1. Both assignments lead to sum of the
// Manhattan distances as 4.

workers = [
  [0, 0],
  [1, 0],
  [2, 0],
  [3, 0],
  [4, 0],
]
bikes = [
  [0, 999],
  [1, 999],
  [2, 999],
  [3, 999],
  [4, 999],
]
// Output: 4995

console.log(assignBikes(workers, bikes))
