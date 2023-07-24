/**
 * Implement pow(x, n), which calculates x raised to the power n (i.e., x^n).
 *
 * Constraints:
 *    -100.0 < x < 100.0
 *    -2^31 <= n <= 2^31 - 1
 *    n is an integer.
 *    Either x is not zero or n > 0.
 *    -10^4 <= x^n <= 10^4
 */

/**
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
const myPow_recursive = (x, n) => {
  if (n === 0) return 1
  if (n < 0) return 1 / myPow_recursive(x, -n)

  if (n % 2) return x * myPow_recursive(x * x, (n - 1) / 2)
  return myPow_recursive(x * x, n / 2)
}

/**
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
const myPow_iterative = (x, n) => {
  if (n < 0) {
    x = 1 / x
    n = -n
  }

  let result = 1
  while (n > 0) {
    if (n % 2) {
      result *= x
      n -= 1
    } else {
      x *= x
      n /= 2
    }
  }

  return result
}

x = 2.0
n = 10
// Expected: 1024.00000

x = 2.1
n = 3
// Expected: 9.26100

x = 2.0
n = -2
// Expected: 0.25000

console.log(myPow_recursive(x, n))
console.log(myPow_iterative(x, n))
