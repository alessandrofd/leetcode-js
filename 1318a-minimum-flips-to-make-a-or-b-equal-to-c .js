/**
 * Given 3 positives numbers a, b and c. Return the minimum flips required in
 * some bits of a and b to make ( a OR b == c ). (bitwise OR operation).
 *
 * Flip operation consists of change any single bit 1 to 0 or change
 * the bit 0 to 1 in their binary representation.
 *
 * Constraints:
 *    1 <= a <= 10^9
 *    1 <= b <= 10^9
 *    1 <= c <= 10^9
 */

// Mágica
// https://graphics.stanford.edu/~seander/bithacks.html#CountBitsSetParallel
// const countSetBits = (n) => {
//   n = n - ((n >> 1) & 0x55555555)
//   n = (n & 0x33333333) + ((n >> 2) & 0x33333333)
//   return (((n + (n >> 4)) & 0xf0f0f0f) * 0x1010101) >> 24
// }

/**
 * @param {number} a
 * @param {number} b
 * @param {number} c
 * @return {number}
 */
const minFlips = (a, b, c) => {}

a = 2
b = 6
c = 5
// Expected: 3

a = 4
b = 2
c = 7
// Expected: 1

a = 1
b = 2
c = 3
// Expected: 0

a = 8
b = 3
c = 5
// Expected: 3

a = 5
b = 2
c = 8
// Expected: 4

console.log(minFlips(a, b, c))
console.log(minFlips_optimized(a, b, c))

console.log(Math.ceil(Math.log2(5)))
a = 0b010
b = 0b010
console.log(a ^ b)
