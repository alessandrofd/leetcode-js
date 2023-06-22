/**
 * Given an integer n, return true if it is a power of four. Otherwise, return
 * false.
 *
 * An integer n is a power of four, if there exists an integer x such that
 * n == 4^x.
 *
 * Constraints:
 *    -2^31 <= n <= 2^31 - 1
 */

/**
 * @param {number} n
 * @return {boolean}
 */

// Approach 1: Brute Force + Precomputations
const isPowerOfFour_1 = (n) => {
  const nums = new Set()
  for (let i = 0; i <= 15; i++) nums.add(4 ** i)
  return nums.has(n)
}

// Approach 2: Math
const isPowerOfFour_2 = (n) => {
  return n > 0 && (Math.log(n) / Math.log(2)) % 2 === 0
}

// Approach 3: Bit Manipulation
const isPowerOfFour = (n) => {
  return n > 0 && (n & (n - 1)) === 0 && (n & 0xaaaaaaaa) === 0
}

n = 16
// Output: true

n = 5
// Output: false

// n = 1
// Output: true

console.log(isPowerOfFour(n))
