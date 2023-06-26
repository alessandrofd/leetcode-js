/**
 * You are given a 0-indexed integer array costs where costs[i] is the cost of
 * hiring the ith worker.
 *
 * You are also given two integers k and candidates. We want to hire exactly k
 * workers according to the following rules:
 *
 *    You will run k sessions and hire exactly one worker in each session.
 *
 *    In each hiring session, choose the worker with the lowest cost from either
 *    the first candidates workers or the last candidates workers. Break the tie
 *    by the smallest index.
 *
 *        For example, if costs = [3,2,7,7,1,2] and candidates = 2, then in the
 *        first hiring session, we will choose the 4th worker (1) because they have
 *        the lowest cost [3,2,7,7,1,2].
 *
 *        In the second hiring session, we will choose 1st worker because they
 *        have the same lowest cost as 4th worker but they have the smallest
 *        index [3,2,7,7,2]. Please note that the indexing may be changed in the
 *        process.
 *
 *    If there are fewer than candidates workers remaining, choose the worker
 *     with the lowest cost among them. Break the tie by the smallest index.
 *
 *    A worker can only be chosen once.
 *
 * Return the total cost to hire exactly k workers.
 *
 * Constraints:
 *    1 <= costs.length <= 10^5
 *    1 <= costs[i] <= 10^5
 *    1 <= k, candidates <= costs.length
 */

import { PriorityQueue } from '@datastructures-js/priority-queue'

/**
 * @param {number[]} costs
 * @param {number} k
 * @param {number} candidates
 * @return {number}
 */
const totalCost_2Queues = (costs, k, candidates) => {
  const n = costs.length

  const leftQueue = new PriorityQueue({ compare: (a, b) => a - b })
  const rightQueue = new PriorityQueue({ compare: (a, b) => a - b })

  let leftPointer = candidates
  for (let i = 0; i < leftPointer; i++) leftQueue.enqueue(costs[i])

  let rightPointer = Math.max(candidates, n - candidates) - 1
  for (let i = n - 1; i > rightPointer; i--) rightQueue.enqueue(costs[i])

  let cost = 0
  for (let i = 0; i < k; i++) {
    if (
      rightQueue.size() === 0 ||
      (leftQueue.size() > 0 && leftQueue.front() <= rightQueue.front())
    ) {
      cost += leftQueue.dequeue()
      if (leftPointer <= rightPointer) leftQueue.enqueue(costs[leftPointer++])
    } else {
      cost += rightQueue.dequeue()
      if (leftPointer <= rightPointer) rightQueue.enqueue(costs[rightPointer--])
    }
  }

  return cost
}

const totalCost_1Queue = (costs, k, candidates) => {
  const n = costs.length

  const pq = new PriorityQueue({
    compare: (a, b) => (a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]),
  })

  let leftPointer = candidates
  for (let i = 0; i < leftPointer; i++) pq.enqueue([costs[i], 0])

  let rightPointer = Math.max(candidates, n - candidates) - 1
  for (let i = n - 1; i > rightPointer; i--) pq.enqueue([costs[i], 1])

  let result = 0
  for (let i = 0; i < k; i++) {
    const [cost, queue] = pq.dequeue()
    result += cost
    if (leftPointer <= rightPointer)
      if (queue === 0) pq.enqueue([costs[leftPointer++], 0])
      else pq.enqueue([costs[rightPointer--], 1])
  }

  return result
}

let costs = [17, 12, 10, 2, 7, 2, 11, 20, 8]
let k = 3
let candidates = 4
// Expected: 11

costs = [1, 2, 4, 1]
k = 3
candidates = 3
// Expected: 4

costs = [
  25, 20, 60, 21, 11, 99, 55, 22, 83, 62, 12, 63, 100, 41, 33, 92, 13, 92, 58,
  85, 61, 93, 5, 46, 26, 25, 36, 27, 12, 30, 13, 52, 30,
]
k = 8
candidates = 22
// Expected: 107

console.log(totalCost_2Queues(costs, k, candidates))
console.log(totalCost_1Queue(costs, k, candidates))
