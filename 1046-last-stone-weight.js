/**
 * You are given an array of integers stones where stones[i] is the weight of
 * the ith stone.
 *
 * We are playing a game with the stones. On each turn, we choose the heaviest
 * two stones and smash them together. Suppose the heaviest two stones have
 * weights x and y with x <= y. The result of this smash is:
 *
 *    If x == y, both stones are destroyed, and
 *    If x != y, the stone of weight x is destroyed, and the stone of weight y
 *    has new weight y - x.
 *
 * At the end of the game, there is at most one stone left.
 *
 * Return the weight of the last remaining stone. If there are no stones left,
 * return 0.
 *
 * Constraints:
 *    1 <= stones.length <= 30
 *    1 <= stones[i] <= 1000
 */

import { MaxPriorityQueue } from '@datastructures-js/priority-queue'

/**
 * @param {number[]} stones
 * @return {number}
 */
const lastStoneWeight = (stones) => {
  const queue = new MaxPriorityQueue({ priority: (stone) => stone })
  for (const stone of stones) queue.enqueue(stone)
  while (queue.size() >= 2) {
    const stone1 = queue.dequeue().element
    const stone2 = queue.dequeue().element
    if (stone1 !== stone2) queue.enqueue(stone1 - stone2)
  }

  return queue.size() ? queue.dequeue().element : 0
}

let stones = [2, 7, 4, 1, 8, 1]
// Output: 1

// stones = [1]
// Output: 1

console.log(lastStoneWeight(stones))
