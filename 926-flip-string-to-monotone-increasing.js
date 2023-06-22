/**
 * A binary string is monotone increasing if it consists of some number of
 * 0's (possibly none), followed by some number of 1's (also possibly none).
 *
 * You are given a binary string s. You can flip s[i] changing it from 0 to 1 or
 * from 1 to 0.
 *
 * Return the minimum number of flips to make s monotone increasing.
 *
 * Constraints:
 *  1 <= s.length <= 10^5
 *  s[i] is either '0' or '1'.
 */

/**
 * @param {string} s
 * @return {number}
 */
const minFlipsMonoIncr_dynamicWindows = (s) => {
  let flips = [...s].reduce((acc, digit) => (acc += digit === '0' ? 1 : 0), 0)

  let result = flips
  for (const digit of s) {
    if (digit === '0') result = Math.min(result, --flips)
    else flips++
  }

  return result
}

const minFlipsMonoIncr_dynamicProgramming = (s) => {
  let result = 0
  let countOnes = 0
  for (const digit of s) {
    if (digit === '0') result = Math.min(countOnes, result + 1)
    else countOnes++
  }
  return result
}

s = '00110'
// Output: 1
// Explanation: We flip the last digit to get 00111.

s = '010110'
// Output: 2
// Explanation: We flip to get 011111, or alternatively 000111.

s = '00011000'
// Output: 2
// Explanation: We flip to get 00000000.

console.log(minFlipsMonoIncr_dynamicWindows(s))
console.log(minFlipsMonoIncr_dynamicProgramming(s))
