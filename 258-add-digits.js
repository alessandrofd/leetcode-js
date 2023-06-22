/**
 * Given an integer num, repeatedly add all its digits until the result has only
 * one digit, and return it.
 *
 * Constraints:
 *    0 <= num <= 231 - 1
 */

/**
 * @param {number} num
 * @return {number}
 */
const addDigits_loop = (num) => {
  while (num >= 10)
    num = num
      .toString()
      .split('')
      .map((x) => parseInt(x))
      .reduce((acc, n) => (acc += n))

  return num
}

/**
 * @param {number} num
 * @return {number}
 */
const addDigits_math = (num) => {
  if (num === 0) return 0
  if (num % 9 === 0) return 9
  return num % 9
}

/**
 * @param {number} num
 * @return {number}
 */
const addDigits_math2 = (num) => {
  if (num === 0) return 0
  return num === 0 ? 0 : 1 + ((num - 1) % 9)
}

num = 38
// Output: 2

// num = 0
// Output: 0

console.log(addDigits_loop(num))
console.log(addDigits_math(num))
console.log(addDigits_math2(num))
