/**
 * You are given two 0-indexed integer arrays nums1 and nums2 of equal length n
 * and a positive integer k. You must choose a subsequence of indices from nums1
 * of length k.
 *
 * For chosen indices i0, i1, ..., ik - 1, your score is defined as:
 *
 *    The sum of the selected elements from nums1 multiplied with the minimum of
 *    the selected elements from nums2.
 *
 *    It can defined simply as: (nums1[i0] + nums1[i1] +...+ nums1[ik - 1]) *
 *    min(nums2[i0] , nums2[i1], ... ,nums2[ik - 1]).
 *
 * Return the maximum possible score.
 *
 * A subsequence of indices of an array is a set that can be derived from
 * the set {0, 1, ..., n-1} by deleting some or no elements.
 *
 * Constraints:
 *    n == nums1.length == nums2.length
 *    1 <= n <= 10^5
 *    0 <= nums1[i], nums2[j] <= 10^5
 *    1 <= k <= n
 */

import { MinPriorityQueue } from '@datastructures-js/priority-queue'

// TLE
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number} k
 * @return {number}
 */
const maxScore_sort = (nums1, nums2, k) => {}

// A conversão do priority queue para array é muito cara. Melhor manter a soma
// dos maiores k - 1 valores do vetor nums1 à medida em que são enfileirados

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number} k
 * @return {number}
 */
const maxScore_pq = (nums1, nums2, k) => {}

nums1 = [1, 3, 3, 2]
nums2 = [2, 1, 3, 4]
k = 3
// Expected: 12

// nums1 = [4, 2, 3, 1, 1]
// nums2 = [7, 5, 10, 9, 6]
// k = 1
// Expected: 30

console.log(maxScore_sort(nums1, nums2, k))
console.log(maxScore_pq(nums1, nums2, k))
