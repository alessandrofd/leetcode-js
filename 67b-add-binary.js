/**
 * Given two binary strings a and b, return their sum as a binary string.
 *
 * Constraints:
 *    1 <= a.length, b.length <= 10^4
 *    a and b consist only of '0' or '1' characters.
 *    Each string does not contain leading zeros except for the zero itself.
 */

/**
 * @param {string} a
 * @param {string} b
 * @return {string}
 */
// Approach 1: Bit-by-Bit Computation
const addBinary_bitComputation = (a, b) => {}

// Approach 2: Bit Manipulation --- using BigInt
const addBinary_bitManipulation = (a, b) => {}

// Top submission --- BigInt operations
const addBinary_bigInt = (a, b) => {}

a = '11'
b = '1'
// Output: "100"

a = '1010'
b = '1011'
// Output: "10101"

console.log(addBinary_bitComputation(a, b))
console.log(addBinary_bitManipulation(a, b))
console.log(addBinary_bigInt(a, b))

a = BigInt(5)
b = BigInt(3)
console.log(a ^ b)
