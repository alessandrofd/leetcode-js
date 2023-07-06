/**
 * Given an array of positive integers nums and a positive integer target,
 * return the minimal length of a subarray whose sum is greater than or equal to
 * target. If there is no such subarray, return 0 instead.
 *
 * Constraints:
 *    1 <= target <= 10^9
 *    1 <= nums.length <= 10^5
 *    1 <= nums[i] <= 104
 */

/**
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
const minSubArrayLen = (target, nums) => {
  const n = nums.length
  let minLength = 1e5
  let winSum = nums[0]
  let start = 0

  for (let i = 1; i <= n; i++) {
    if (winSum >= target) {
      while (winSum - nums[start] >= target) {
        winSum -= nums[start]
        start += 1
      }
      minLength = Math.min(minLength, i - start)
      winSum -= nums[start]
      start += 1
    }
    winSum += nums[i] ?? 0
  }

  return minLength === 1e5 ? 0 : minLength
}

target = 7
nums = [2, 3, 1, 2, 4, 3]
// Expected: 2

// target = 4
// nums = [1, 4, 4]
// Expected: 1

// target = 11
// nums = [1, 1, 1, 1, 1, 1, 1, 1]
// Expected: 0

console.log(minSubArrayLen(target, nums))
