/**
 * Given an integer n, return true if it is a power of three. Otherwise, return
 * false.
 *
 * An integer n is a power of three, if there exists an integer x such that
 * n == 3^x.
 *
 * Constraints:
 *    -2^31 <= n <= 2^31 - 1
 */

/**
 * @param {number} n
 * @return {boolean}
 */
// Approach 1: Loop Iteration
const isPowerOfThree_1 = (n) => {
  if (n < 1) return false

  while (!(n % 3)) n /= 3
  return n === 1
}

// Approach 2: Base Conversion
const isPowerOfThree_2 = (n) => n.toString(3).match('^10*$') !== null

// Approach 3: Mathematics -- precision error
const isPowerOfThree_3 = (n) => Number.isInteger(Math.log(n) / Math.log(3))

n = 27
// Output: true

// n = 0
// Output: false

// n = 9
// Output: true

console.log(isPowerOfThree(n))

console.log(Number.EPSILON)
