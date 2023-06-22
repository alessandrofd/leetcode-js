/**
 * Given an integer array nums and an integer k, return the k most frequent
 * elements. You may return the answer in any order.
 *
 * Constraints:
 *    1 <= nums.length <= 10^5
 *    -10^4 <= nums[i] <= 10^4
 *    k is in the range [1, the number of unique elements in the array].
 *    It is guaranteed that the answer is unique.
 */

import { MinPriorityQueue } from '@datastructures-js/priority-queue'

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
const topKFrequent_pq = (nums, k) => {
  const freqs = new Map()
  nums.forEach((x) => freqs.set(x, (freqs.get(x) ?? 0) + 1))

  const pq = new MinPriorityQueue({ priority: (freq) => freq[1] })

  for (const freq of freqs) {
    pq.enqueue(freq)
    if (pq.size() > k) pq.dequeue()
  }

  const result = []
  while (!pq.isEmpty()) result.push(pq.dequeue().element[0])

  return result
}

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
const topKFrequent_sort = (nums, k) => {
  const freqs = new Map()
  nums.forEach((x) => freqs.set(x, (freqs.get(x) ?? 0) + 1))
  return [...freqs]
    .sort(([, a], [, b]) => b - a)
    .map(([a, b]) => a)
    .slice(0, k)
}

let nums = [1, 1, 1, 2, 2, 3]
let k = 2
// Expected: [1,2]

// nums = [1]
// k = 1
// Expected: [1]

console.log(topKFrequent_pq(nums, k))
console.log(topKFrequent_sort(nums, k))
