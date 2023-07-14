/**
 * You are given three positive integers: n, index, and maxSum. You want to
 * construct an array nums (0-indexed) that satisfies the following conditions:
 *
 *    nums.length == n
 *    nums[i] is a positive integer where 0 <= i < n.
 *    abs(nums[i] - nums[i+1]) <= 1 where 0 <= i < n-1.
 *    The sum of all the elements of nums does not exceed maxSum.
 *    nums[index] is maximized.
 *
 * Return nums[index] of the constructed array.
 *
 * Note that abs(x) equals x if x >= 0, and -x otherwise.
 *
 * Constraints:
 *    1 <= n <= maxSum <= 10^9
 *    0 <= index < n


*/

/**
 * @param {number} n
 * @param {number} index
 * @param {number} maxSum
 * @return {number}
 */
const maxValue = (n, index, maxSum) => {
  const validNum = (value) => {
    let left = 0
    if (value <= index) {
      left = ((value + 1) * value) / 2
      left += index - value + 1
    } else {
      left = ((value + value - index) * (index + 1)) / 2
    }

    let right = 0
    if (value <= n - index) {
      right = ((value + 1) * value) / 2
      right += n - index - value
    } else {
      right = ((value + value - (n - 1 - index)) * (n - index)) / 2
    }

    return left + right - value <= maxSum
  }

  let lo = 1
  let hi = maxSum
  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2)
    if (validNum(mid)) lo = mid + 1
    else hi = mid - 1
  }

  return lo - 1
}

n = 4
index = 2
maxSum = 6
// Expected: 2

n = 6
index = 1
maxSum = 10
// Expected: 3

n = 8
index = 7
maxSum = 14
// Expected: 4

n = 1
index = 0
maxSum = 24
// Expected: 24

n = 4
index = 0
maxSum = 4
// Expected: 1

console.log(maxValue(n, index, maxSum))
