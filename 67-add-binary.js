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
const addBinary_bitComputation = (a, b) => {
  const n = Math.max(a.length, b.length)
  if (a.length !== b.length)
    if (a.length > b.length) b = b.padStart(n, '0')
    else a = a.padStart(n, '0')

  result = []

  let carryOne = false
  for (let i = -1; i >= -n; i--) {
    const digitA = parseInt(a.at(i), 2)
    const digitB = parseInt(b.at(i), 2)
    const newDigit = digitA + digitB + (carryOne ? 1 : 0)
    carryOne = newDigit > 1
    result.unshift(newDigit.toString(2).at(-1))
  }

  if (carryOne) result.unshift('1')

  return result.join('')
}

// Approach 2: Bit Manipulation --- using BigInt
const addBinary_bitManipulation = (a, b) => {
  let x = BigInt('0b' + a)
  let y = BigInt('0b' + b)
  while (y !== 0n) {
    const answer = x ^ y
    const carry = (x & y) << 1n
    x = answer
    y = carry
  }
  return x.toString(2)
}

// Top submission --- BigInt operations
const addBinary_bigInt = (a, b) =>
  (BigInt('0b' + a) + BigInt('0b' + b)).toString(2)

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
