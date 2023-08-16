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
const maxSlidingWindow = (nums, k) => {
  const n = nums.length
  const queue = nums.slice(0, k)
  const result = [Math.max(...queue)]

  for (let i = 0; i < n - k; i++) {
    queue.shift()
    queue.push(nums[k + i])
    result.push(Math.max(...queue))
  }

  return result
}

// Approach: Monotonic Deque

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
const maxSlidingWindow_monotonic = (nums, k) => {
  const n = nums.length

  const queue = []
  for (let i = 0; i < k; i++) {
    if (i > 0) {
      while (nums[queue.at(-1)] < nums[i]) queue.pop()
    }
    queue.push(i)
  }

  const result = [nums[queue[0]]]

  for (let i = k; i < n; i++) {
    if (queue[0] <= i - k) queue.shift()
    while (nums[queue.at(-1)] < nums[i]) queue.pop()
    queue.push(i)
    result.push(nums[queue[0]])
  }

  return result
}

// Mesma solução anterior mas sem operações de shift e pop.
// A falta que um deque faz
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
const maxSlidingWindow_monotonic_noShiftPop = (nums, k) => {
  const n = nums.length
  let start = (end = 0)

  const queue = []
  for (let i = 0; i < k; i++) {
    while (start < end && nums[queue[end - 1]] < nums[i]) end -= 1
    queue[end++] = i
  }

  const result = [nums[queue[start]]]

  for (let i = k; i < n; i++) {
    if (queue[start] <= i - k) start += 1
    while (start < end && nums[queue[end - 1]] < nums[i]) end -= 1
    queue[end++] = i
    result.push(nums[queue[start]])
  }

  return result
}

nums = [1, 3, -1, -3, 5, 3, 6, 7]
k = 3
// Expected: [3, 3, 5, 5, 6, 7]

// nums = [1]
// k = 1
// Expected: [1]

console.log(maxSlidingWindow(nums, k))
console.log(maxSlidingWindow_monotonic(nums, k))
console.log(maxSlidingWindow_monotonic_noShiftPop(nums, k))
