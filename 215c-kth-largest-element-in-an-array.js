/**
 * Given an integer array nums and an integer k, return the kth largest element
 * in the array
 *
 * Note that it is the kth largest element in the sorted order, not the kth
 * distinct element.
 *
 * Can you solve it without sorting?
 *
 * Constraints:
 *    1 <= k <= nums.length <= 10^5
 *    -10^4 <= nums[i] <= 10^4
 */

import { MinPriorityQueue } from '@datastructures-js/priority-queue'

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
const findKthLargest = (nums, k) => {}

let nums = [3, 2, 1, 5, 6, 4]
let k = 2
// Expected: 5

// nums = [3, 2, 3, 1, 2, 4, 5, 5, 6]
// k = 4
// Expected: 4

console.log(findKthLargest(nums, k))
