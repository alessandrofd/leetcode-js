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
  const sums = nums.sort((a, b) => a - b).map(((sum = 0), (n) => (sum += n)))
  return queries.map((n) => sums.filter((sum) => sum <= n).length)
}

const answerQueries = (nums, queries) => {
  const sums = nums.sort((a, b) => a - b).map(((sum = 0), (n) => (sum += n)))
  return queries.map((n) => {
    let count
    for (count = 0; count < sums.length; count++) if (sums[count] > n) break
    return count
  })
}

// Approach 2: Prefix Sum + Binary Search
const answerQueries_prefixSum_binSearch = (nums, queries) => {
  // const answerQueries = (nums, queries) => {
  const sums = nums.sort((a, b) => a - b).map(((sum = 0), (n) => (sum += n)))

  const binSearch = (target) => {
    let lo = 0
    let hi = sums.length - 1
    while (lo < hi) {
      const mid = ((lo + hi) / 2) | 0

      if (sums[mid] === target) return mid + 1

      if (sums[mid] < target) lo = mid + 1
      else hi = mid - 1
    }
    return sums[lo] > target ? lo : lo + 1
  }

  return queries.map((n) => binSearch(n))
}

nums = [4, 5, 2, 1]
queries = [3, 10, 21]
// Output: [2, 3, 4]

// nums = [2, 3, 4, 5]
// queries = [1]
// Output: [0]

console.log(answerQueries(nums, queries))
