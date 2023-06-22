/**
 * Given a circular integer array nums of length n, return the maximum possible
 * sum of a non-empty subarray of nums.
 *
 * A circular array means the end of the array connects to the beginning of the
 * array. Formally, the next element of nums[i] is nums[(i + 1) % n] and the
 * previous element of nums[i] is nums[(i - 1 + n) % n].
 *
 * A subarray may only include each element of the fixed buffer nums at most
 * once. Formally, for a subarray nums[i], nums[i + 1], ..., nums[j], there does
 * not exist i <= k1, k2 <= j with k1 % n == k2 % n.
 *
 * Constraints:
 *    n == nums.length
 *    1 <= n <= 3 * 10^4
 *    -3 * 10^4 <= nums[i] <= 3 * 10^4
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
// Approach 1: Enumerate prefix and suffix sums
const maxSubarraySumCircular_enumerate = (nums) => {
  const n = nums.length

  const suffixMax = new Array(n)
  suffixMax[n - 1] = nums[n - 1]
  for (let i = n - 2, suffixSum = nums[n - 1]; i >= 0; i--) {
    suffixSum += nums[i]
    suffixMax[i] = Math.max(suffixMax[i + 1], suffixSum)
  }

  let contiguousMax = -Infinity
  let splitMax = -Infinity
  for (let i = 0, localMax = 0, prefixSum = 0; i < n; i++) {
    localMax = Math.max(localMax, 0) + nums[i]
    contiguousMax = Math.max(contiguousMax, localMax)

    prefixSum += nums[i]
    if (i < n - 1) splitMax = Math.max(splitMax, prefixSum + suffixMax[i + 1])
  }

  return Math.max(contiguousMax, splitMax)
}

// Approach 2: Calculate the "Minimum Subarray"
const maxSubarraySumCircular_minSubarray = (nums) => {
  let curMax = 0,
    maxSum = nums[0],
    curMin = 0,
    minSum = nums[0],
    sum = 0

  for (const num of nums) {
    curMax = Math.max(curMax, 0) + num
    maxSum = Math.max(maxSum, curMax)

    curMin = Math.min(curMin, 0) + num
    minSum = Math.min(minSum, curMin)

    sum += num
  }

  return sum === minSum ? maxSum : Math.max(maxSum, sum - minSum)
}

nums = [1, -2, 3, -2]
// Output: 3
// Explanation: Subarray [3] has maximum sum 3.

nums = [5, -3, 5]
// Output: 10
// Explanation: Subarray [5,5] has maximum sum 5 + 5 = 10.

nums = [-3, -2, -3]
// Output: -2
// Explanation: Subarray [-2] has maximum sum -2.

console.log(maxSubarraySumCircular_enumerate(nums))
console.log(maxSubarraySumCircular_minSubarray(nums))
