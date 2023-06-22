/**
 * You are given a 0-indexed integer array piles, where piles[i] represents the
 * number of stones in the ith pile, and an integer k. You should apply the
 * following operation exactly k times:
 *
 *    Choose any piles[i] and remove floor(piles[i] / 2) stones from it.
 *
 * Notice that you can apply the operation on the same pile more than once.
 *
 * Return the minimum possible total number of stones remaining after applying
 * the k operations.
 *
 * floor(x) is the greatest integer that is smaller than or equal to x
 * (i.e., rounds x down).
 *
 * Constraints:
 *    1 <= piles.length <= 10^5
 *    1 <= piles[i] <= 10^4
 *    1 <= k <= 10^5
 */

/**
 * @param {number[]} piles
 * @param {number} k
 * @return {number}
 */
import { MaxPriorityQueue } from '@datastructures-js/priority-queue'
const minStoneSum = (piles, k) => {
  const queue = new MaxPriorityQueue({ priority: (rocks) => rocks })
  for (const pile of piles) queue.enqueue(pile)

  for (let i = 0; i < k; i++) {
    let pile = queue.dequeue().element
    queue.enqueue(pile - ((pile / 2) | 0))
  }

  let rocks = 0
  while (!queue.isEmpty()) rocks += queue.dequeue().element
  return rocks
}

let piles = [5, 4, 9]
let k = 2
// Output: 12

piles = [4, 3, 6, 7]
k = 3
// Output: 12

console.log(minStoneSum(piles, k))
