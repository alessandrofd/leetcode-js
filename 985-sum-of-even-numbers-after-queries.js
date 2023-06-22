/**
 * You are given an integer array nums and an array queries where
 * queries[i] = [vali, indexi].
 *
 * For each query i, first, apply nums[indexi] = nums[indexi] + vali, then print
 * the sum of the even values of nums.
 *
 * Return an integer array answer where answer[i] is the answer to the ith query.
 *
 * Constraints:
 *    1 <= nums.length <= 10^4
 *    -10^4 <= nums[i] <= 10^4
 *    1 <= queries.length <= 104
 *    -10^4 <= vali <= 10^4
 *    0 <= indexi < nums.length
 */

/**
 * @param {number[]} nums
 * @param {number[][]} queries
 * @return {number[]}
 */
const sumEvenAfterQueries_me = (nums, queries) => {
  const result = []
  let sum = nums.reduce((acc, nxt) => (acc += nxt % 2 ? 0 : nxt), 0)
  for (const [num, index] of queries) {
    if (nums[index] % 2) {
      if (num % 2) sum += nums[index] + num
    } else {
      if (num % 2) sum -= nums[index]
      else sum += num
    }

    nums[index] += num
    result.push(sum)
  }
  return result
}

// Submissions
const sumEvenAfterQueries_s1 = (nums, queries) => {
  const result = []
  let sum = nums.reduce((acc, next) => acc + (next % 2 ? 0 : next), 0)
  for (const [num, index] of queries) {
    if (nums[index] % 2 === 0) sum -= nums[index]
    nums[index] += num
    if (nums[index] % 2 === 0) sum += nums[index]
    result.push(sum)
  }
  return result
}

const sumEvenAfterQueries = (nums, queries) => {
  const result = new Array(queries.length)
  let sum = nums.reduce((acc, next) => acc + (next % 2 ? 0 : next), 0)
  for (let i = 0; i < queries.length; i++) {
    const [num, index] = queries[i]
    if (nums[index] % 2 == 0) sum -= nums[index]
    nums[index] += num
    if (nums[index] % 2 == 0) sum += nums[index]
    result[i] = sum
  }
  return result
}

nums = [1, 2, 3, 4]
queries = [
  [1, 0],
  [-3, 1],
  [-4, 0],
  [2, 3],
]
// Output: [8,6,2,4]
// Explanation: At the beginning, the array is [1,2,3,4].
// After adding 1 to nums[0], the array is [2,2,3,4], and the sum of even values is 2 + 2 + 4 = 8.
// After adding -3 to nums[1], the array is [2,-1,3,4], and the sum of even values is 2 + 4 = 6.
// After adding -4 to nums[0], the array is [-2,-1,3,4], and the sum of even values is -2 + 4 = 2.
// After adding 2 to nums[3], the array is [-2,-1,3,6], and the sum of even values is -2 + 6 = 4.

// nums = [1]
// queries = [[4, 0]]
// Output: [0]

console.log(sumEvenAfterQueries(nums, queries))
