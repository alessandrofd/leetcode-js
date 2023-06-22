/**
 * Given two integer arrays nums1 and nums2, return the maximum length of a
 * subarray that appears in both arrays.
 *
 * Constraints:
 *    1 <= nums1.length, nums2.length <= 1000
 *    0 <= nums1[i], nums2[i] <= 100
 */

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
// Approach #3: Dynamic Programming
const findLength = (nums1, nums2) => {
  let result = 0
  const dp = new Array(nums1.length + 1)
    .fill()
    .map((x) => new Array(nums2.length + 1).fill(0))

  for (let i = nums1.length - 1; i >= 0; i--)
    for (let j = nums2.length - 1; j >= 0; j--)
      if (nums1[i] === nums2[j]) {
        dp[i][j] = dp[i + 1][j + 1] + 1
        result = Math.max(result, dp[i][j])
      }
  return result
}

nums1 = [1, 2, 3, 2, 1]
nums2 = [3, 2, 1, 4, 7]
// Output: 3
// Explanation: The repeated subarray with maximum length is [3,2,1].

// nums1 = [0, 0, 0, 0, 0]
// nums2 = [0, 0, 0, 0, 0]
// Output: 5

console.log(findLength(nums1, nums2))
