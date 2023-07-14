/**
 * Given an integer array arr and an integer difference, return the length of
 * the longest subsequence in arr which is an arithmetic sequence such that
 * the difference between adjacent elements in the subsequence equals difference.
 *
 * A subsequence is a sequence that can be derived from arr by deleting some or
 * no elements without changing the order of the remaining elements.
 *
 * Constraints:
 *    1 <= arr.length <= 10^5
 *    -10^4 <= arr[i], difference <= 10^4
 */

// Programação dinâmica
// Dimensão: elemento avaliado
// Transição: dp[arr[i]] = dp[arr[i] - difference] + 1
// Condição inicial: dp[arr[0]] = 1
// Resultado: max(dp[arr[i]])

/**
 * @param {number[]} arr
 * @param {number} difference
 * @return {number}
 */
const longestSubsequence = (arr, difference) => {
  const n = arr.length
  const dp = new Map()
  dp.set(arr[0], 1)

  let longest = 1
  for (let i = 1; i < n; i++) {
    dp.set(arr[i], (dp.get(arr[i] - difference) ?? 0) + 1)
    longest = Math.max(longest, dp.get(arr[i]))
  }

  return longest
}

arr = [1, 2, 3, 4]
difference = 1
// Expected: 4

arr = [1, 3, 5, 7]
difference = 1
// Expected: 1

arr = [1, 5, 7, 8, 5, 3, 4, 2, 1]
difference = -2
// Expected: 4

console.log(longestSubsequence(arr, difference))
