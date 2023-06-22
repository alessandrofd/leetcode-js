/**
 * You have some number of sticks with positive integer lengths. These lengths
 * are given as an array sticks, where sticks[i] is the length of the ith stick.
 *
 * You can connect any two sticks of lengths x and y into one stick by paying a
 * cost of x + y. You must connect all the sticks until there is only one stick
 * remaining.
 *
 * Return the minimum cost of connecting all the given sticks into one stick in
 * this way.
 *
 * Constraints:
 *    1 <= sticks.length <= 10^4
 *    1 <= sticks[i] <= 10^4
 */

/**
 * @param {number[]} sticks
 * @return {number}
 */
// Minha solução - Greedy (similar à solução proposta pelo LeetCode)
import { MinPriorityQueue } from '@datastructures-js/priority-queue'
// const connectSticks_minha = (sticks) => {
const connectSticks = (sticks) => {
  const queue = new MinPriorityQueue({ priority: (stick) => stick })
  for (const stick of sticks) queue.enqueue(stick)

  let cost = 0
  while (queue.size() >= 2) {
    const stick = queue.dequeue().element + queue.dequeue().element
    cost += stick
    queue.enqueue(stick)
  }

  return cost
}

// const connectSticks = (sticks) => {}

let sticks = [2, 4, 3]
// Output: 14

sticks = [1, 8, 3, 5]
// Output: 30

sticks = [5]
// Output: 0

console.log(connectSticks(sticks))
