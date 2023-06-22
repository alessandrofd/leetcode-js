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
  // const answerQueries = (nums, queries) => {
  const orderedNums = [...nums].sort((a, b) => a - b)
  const prefixSum = Array.from(orderedNums, ((sum = 0), (n) => (sum += n)))

  queries
  prefixSum

  const result = []
  for (let i = 0; i < queries.length; i++) {
    let j
    for (j = 0; j < prefixSum.length; j++) {
      if (prefixSum[j] > queries[i]) {
        result.push(j)
        break
      }
    }
    if (j === prefixSum.length) result.push(j)
  }
  return result
}

// Approach 2: Prefix Sum + Binary Search
// const answerQueries_prefixSum_binSearch = (nums, queries) => {
const answerQueries = (nums, queries) => {
  const prefixSum = [...nums]
    .sort((a, b) => a - b)
    .map(((sum = 0), (n) => (sum += n)))

  const result = []
  for (query of queries) {
    let lo = 0
    let hi = prefixSum.length - 1
    while (lo < hi) {
      const mid = ((lo + hi) / 2) | 0
      if (query >= prefixSum[mid]) lo = mid + 1
      else hi = mid - 1
    }
    // Única situação em que prefixSum[lo] será menor que query é quando query
    // for maior que a soma total dos números
    const count = prefixSum[lo] < query ? lo + 1 : lo
    result.push(count)
  }
  return result
}

nums = [4, 5, 2, 1]
queries = [3, 10, 21]
// Output: [2, 3, 4]

nums = [2, 3, 4, 5]
queries = [1]
// Output: [0]

console.log(answerQueries(nums, queries))
