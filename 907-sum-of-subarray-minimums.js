/**
 * Given an array of integers arr, find the sum of min(b), where b ranges over
 * every (contiguous) subarray of arr. Since the answer may be large, return the
 * answer modulo 10^9 + 7.
 *
 * Constraints:
 *    1 <= arr.length <= 3 * 10^4
 *    1 <= arr[i] <= 3 * 10^4
 */

/**
 * @param {number[]} arr
 * @return {number}
 */
// Approach 1: Monotonic Stack - Contribution of Each Element
const sumSubarrayMins_element = (arr) => {
  const MODULO = 10 ** 9 + 7
  const stack = []
  let sum = 0

  for (let i = 0; i <= arr.length; i++) {
    while (stack.length && (i === arr.length || arr[stack.at(-1)] >= arr[i])) {
      const mid = stack.pop()
      const left = stack.length ? stack.at(-1) : -1
      const right = i
      const count = ((mid - left) * (right - mid)) % MODULO
      sum += (count * arr[mid]) % MODULO
      sum %= MODULO
    }
    stack.push(i)
  }
  return sum
}

// Approach 2: Monotonic Stack + Dynamic Programming
const sumSubarrayMins = (arr) => {
  const MODULO = 10 ** 9 + 7
  const stack = []
  const dp = new Array(arr.length).fill(0)

  for (let i = 0; i < arr.length; i++) {
    while (stack.length && arr[stack.at(-1)] >= arr[i]) {
      stack.pop()
    }

    if (stack.length) {
      const smaller = stack.at(-1)
      dp[i] = dp[smaller] + (i - smaller) * arr[i]
    } else {
      dp[i] = (i + 1) * arr[i]
    }

    stack.push(i)
  }
  return dp.reduce((acc, next) => (acc += next) % MODULO)
}

arr = [3, 1, 2, 4]
// Output: 17

// arr = [11, 81, 94, 43, 3]
// Output: 444

console.log(sumSubarrayMins(arr))
