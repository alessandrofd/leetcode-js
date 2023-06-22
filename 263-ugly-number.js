/**
 * An ugly number is a positive integer whose prime factors are limited to 2, 3,
 * and 5.
 *
 * Given an integer n, return true if n is an ugly number.
 *
 * Constraints:
 *    -2^31 <= n <= 2^31 - 1
 */

const isUgly = (n) => {
  if (n <= 0) return false

  while (n % 2 === 0) n /= 2
  while (n % 3 === 0) n /= 3
  while (n % 5 === 0) n /= 5
  return n === 1
}

n = 6 // true

n = 1 // true

n = 14 // false

console.log(isUgly(n))
