/**
 * You are given an array of integers nums, there is a sliding window of size k
 * which is moving from the very left of the array to the very right. You can
 * only see the k numbers in the window. Each time the sliding window moves
 * right by one position.
 *
 * Return the max sliding window.
 *
 * Constraints:
 *    1 <= nums.length <= 10^5
 *    -10^4 <= nums[i] <= 10^4
 *    1 <= k <= nums.length
 */

// Força bruta: TLE

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
const maxSlidingWindow = (nums, k) => {}

// Approach: Monotonic Deque

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
const maxSlidingWindow_monotonic = (nums, k) => {}

// Mesma solução anterior mas sem operações de shift e pop.
// A falta que um deque faz
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
const maxSlidingWindow_monotonic_noShiftPop = (nums, k) => {}

nums = [1, 3, -1, -3, 5, 3, 6, 7]
k = 3
// Expected: [3, 3, 5, 5, 6, 7]

// nums = [1]
// k = 1
// Expected: [1]

console.log(maxSlidingWindow(nums, k))
console.log(maxSlidingWindow_monotonic(nums, k))
console.log(maxSlidingWindow_monotonic_noShiftPop(nums, k))
