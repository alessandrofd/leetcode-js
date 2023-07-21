/**
 * Given an integer array nums, return the length of the longest strictly
 * increasing subsequence
 *
 * Constraints:
 *    1 <= nums.length <= 2500
 *    -10^4 <= nums[i] <= 10^4
 */

/**
 * This is a classic Dynamic Programming problem.
 *
 * Let dp[i] is the longest increase subsequence of nums[0..i] which has nums[i]
 * as the end element of the subsequence.
 *
 * Complexity
 *    Time: O(N^2), where N <= 2500 is the number of elements in array nums.
 *    Space: O(N)
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
const lengthOfLIS_dp = (nums) => {
  const n = nums.length
  const dp = Array(n).fill(1)
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[i] > nums[j] && dp[i] < dp[j] + 1) {
        dp[i] = dp[j] + 1
      }
    }
  }
  return Math.max(...dp)
}

/**
 * GREEDY WITH BIN SEARCH
 *
 * ### Multiple arrays ###
 *
 * Let's construct the idea from following example.
 *
 *    Consider the example nums = [2, 6, 8, 3, 4, 5, 1], let's try to build the
 *    increasing subsequences starting with an empty one: sub1 = [].
 *
 *    Let pick the first element, sub1 = [2].
 *
 *    6 is greater than previous number, sub1 = [2, 6]
 *
 *    8 is greater than previous number, sub1 = [2, 6, 8]
 *
 *    3 is less than previous number, we can't extend the subsequence sub1, but
 *    we must keep 3 because in the future there may have the longest
 *    subsequence start with [2, 3], sub1 = [2, 6, 8], sub2 = [2, 3].
 *
 *    With 4, we can't extend sub1, but we can extend sub2, so sub1 = [2, 6, 8],
 *    sub2 = [2, 3, 4].
 *
 *    With 5, we can't extend sub1, but we can extend sub2, so sub1 = [2, 6, 8],
 *    sub2 = [2, 3, 4, 5].
 *
 *    With 1, we can't extend neighter sub1 nor sub2, but we need to keep 1, so
 *    sub1 = [2, 6, 8], sub2 = [2, 3, 4, 5], sub3 = [1].
 *
 *    Finally, length of longest increase subsequence = len(sub2) = 4.
 *
 * ### Single array ###
 *
 * In the above steps, we need to keep different sub arrays (sub1, sub2..., subk)
 * which causes poor performance. But we notice that we can just keep one sub
 * array, when new number x is not greater than the last element of the
 * subsequence sub, we do binary search to find the smallest element >= x in sub,
 * and replace with number x.
 *
 * Let's run that example nums = [2, 6, 8, 3, 4, 5, 1] again:
 *
 *    Let pick the first element, sub = [2].
 *
 *    6 is greater than previous number, sub = [2, 6]
 *
 *    8 is greater than previous number, sub = [2, 6, 8]
 *
 *    3 is less than previous number, so we can't extend the subsequence sub.
 *    We need to find the smallest number >= 3 in sub, it's 6. Then we overwrite
 *    it, now sub = [2, 3, 8].
 *
 *    4 is less than previous number, so we can't extend the subsequence sub.
 *    We overwrite 8 by 4, so sub = [2, 3, 4].
 *
 *    5 is greater than previous number, sub = [2, 3, 4, 5].
 *
 *    1 is less than previous number, so we can't extend the subsequence sub.
 *    We overwrite 2 by 1, so sub = [1, 3, 4, 5].
 *
 *    Finally, length of longest increase subsequence = len(sub) = 4.
 *
 * Reference: https://www.cs.princeton.edu/courses/archive/spring13/cos423/lectures/LongestIncreasingSubsequence.pdf
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
const lengthOfLIS_greedy_binSearch = (nums) => {
  const dp = []
  for (const num of nums) {
    let lo = 0
    let hi = dp.length
    while (lo < hi) {
      const mid = Math.floor((lo + hi) / 2)
      if (num > dp[mid]) lo = mid + 1
      else hi = mid
    }
    dp[lo] = num
  }
  return dp.length
}

nums = [10, 9, 2, 5, 3, 7, 101, 18]
// Expected: 4

nums = [0, 1, 0, 3, 2, 3]
// Expected: 4

nums = [7, 7, 7, 7, 7, 7, 7]
// Expected: 1

console.log(lengthOfLIS_dp(nums))
console.log(lengthOfLIS_greedy_binSearch(nums))
