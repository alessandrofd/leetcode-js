/**
 * You are given an integer array nums of length n, and an integer array queries
 * of length m.
 *
 * Return an array answer of length m where answer[i] is the maximum size of a
 * subsequence that you can take from nums such that the sum of its elements is
 * less than or equal to queries[i].
 *
 * A subsequence is an array that can be derived from another array by deleting
 * some or no elements without changing the order of the remaining elements.
 *
 * Constraints:
 *    n == nums.length
 *    m == queries.length
 *    1 <= n, m <= 1000
 *    1 <= nums[i], queries[i] <= 10^6
 */

/**
 * @param {number[]} nums
 * @param {number[]} queries
 * @return {number[]}
 */
// My Approach: Prefix Sum
const answerQueries_prefixSum = (nums, queries) => {
  const prefixSum = [...nums]
    .sort((a, b) => a - b)
    .map(((sum = 0), (n) => (sum += n)))

  const result = []
  for (const query of queries) {
    let i = 0
    while (i < prefixSum.length && prefixSum[i] <= query) i++
    result.push(i)
  }

  return result
}

// Approach 2: Prefix Sum + Binary Search
const answerQueries_binSearch = (nums, queries) => {
  const prefixSum = [...nums]
    .sort((a, b) => a - b)
    .map(((sum = 0), (n) => (sum += n)))

  const result = []
  for (const query of queries) {
    let lo = 0,
      hi = prefixSum.length
    while (lo < hi) {
      const mid = ((lo + hi) / 2) | 0
      if (query > prefixSum[mid]) lo = mid + 1
      else hi = mid
    }
    result.push(prefixSum[lo] === query ? lo + 1 : lo)
  }

  return result
}

let nums = [4, 5, 2, 1]
let queries = [3, 10, 21]
// Output: [2, 3, 4]

// nums = [2, 3, 4, 5]
// queries = [1]
// Output: [0]

console.log(answerQueries_prefixSum(nums, queries))
console.log(answerQueries_binSearch(nums, queries))
