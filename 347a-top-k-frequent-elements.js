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
const topKFrequent_pq = (nums, k) => {}

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
const topKFrequent_sort = (nums, k) => {}

let nums = [1, 1, 1, 2, 2, 3]
let k = 2
// Expected: [1,2]

// nums = [1]
// k = 1
// Expected: [1]

console.log(topKFrequent_pq(nums, k))
console.log(topKFrequent_sort(nums, k))
