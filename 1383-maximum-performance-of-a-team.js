/**
 * You are given two integers n and k and two integer arrays speed and
 * efficiency both of length n. There are n engineers numbered from 1 to n.
 * speed[i] and efficiency[i] represent the speed and efficiency of the ith
 * engineer respectively.
 *
 * Choose at most k different engineers out of the n engineers to form a team
 * with the maximum performance.
 *
 * The performance of a team is the sum of their engineers' speeds multiplied by
 * the minimum efficiency among their engineers.
 *
 * Return the maximum performance of this team. Since the answer can be a huge
 * number, return it modulo 10^9 + 7.
 *
 * Constraints:
 *    1 <= k <= n <= 105
 *    speed.length == n
 *    efficiency.length == n
 *    1 <= speed[i] <= 105
 *    1 <= efficiency[i] <= 108
 */

/**
 * @param {number} n
 * @param {number[]} speed
 * @param {number[]} efficiency
 * @param {number} k
 * @return {number}
 */
const { MinPriorityQueue } = require('@datastructures-js/priority-queue')
const maxPerformance = (n, speed, efficiency, k) => {
  const candidates = Array.from({ length: n }, (_, i) => i)
  candidates.sort((a, b) => efficiency[b] - efficiency[a])
  const heap = new MinPriorityQueue({ priority: (speed) => speed })
  let totalSpeed = 0n
  let bestPerformance = 0n
  for (const engineer of candidates) {
    heap.enqueue(speed[engineer])
    if (heap.size() <= k) totalSpeed += BigInt(speed[engineer])
    else totalSpeed += BigInt(speed[engineer] - heap.dequeue().element)
    const performance = totalSpeed * BigInt(efficiency[engineer])
    if (performance > bestPerformance) bestPerformance = performance
  }
  return bestPerformance % 1000000007n
}

n = 6
speed = [2, 10, 3, 1, 5, 8]
efficiency = [5, 4, 3, 9, 7, 2]
k = 2
// Output: 60

// n = 6
// speed = [2, 10, 3, 1, 5, 8]
// efficiency = [5, 4, 3, 9, 7, 2]
// k = 3
// Output: 68

console.log(maxPerformance(n, speed, efficiency, k))
