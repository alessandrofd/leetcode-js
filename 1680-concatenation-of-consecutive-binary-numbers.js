/**
 * Given an integer n, return the decimal value of the binary string formed by
 * concatenating the binary representations of 1 to n in order, modulo 10^9 + 7.
 *
 * Constraints:
 *    1 <= n <= 10^5
 */

/**
 * @param {number} n
 * @return {number}
 */
const concatenatedBinary_1 = (n) => {
  const modulo = 10 ** 9 + 7
  let binary = ''
  for (let i = 1; i <= n; i++) binary = binary + i.toString(2)
  return [...binary].reduce((acc, next) => (acc * 2 + parseInt(next)) % modulo)
}

const concatenatedBinary_2 = (n) => {
  const modulo = 10 ** 9 + 7
  let result = 0
  for (let i = 1; i <= n; i++) {
    result *= 2 ** i.toString(2).length
    result += i
    result %= modulo
  }
  return result
}

const concatenatedBinary = (n) => {
  const modulo = 10 ** 9 + 7
  let len = 0b100
  let result = 1
  for (let i = 2; i <= n; i++) {
    if (i === len) len <<= 1
    result = (result * len + i) % modulo
  }
  return result
}

n = 1
// Output: 1
// Explanation: "1" in binary corresponds to the decimal value 1.

n = 3
// Output: 27
// Explanation: In binary, 1, 2, and 3 corresponds to "1", "10", and "11".
// After concatenating them, we have "11011", which corresponds to the decimal value 27.

// n = 12
// Output: 505379714
// Explanation: The concatenation results in "1101110010111011110001001101010111100".
// The decimal value of that is 118505380540.
// After modulo 10^9 + 7, the result is 505379714.

// n = 42

console.log(concatenatedBinary(n))
