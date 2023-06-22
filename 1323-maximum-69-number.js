/**
 * You are given a positive integer num consisting only of digits 6 and 9.
 *
 * Return the maximum number you can get by changing at most one digit (6
 * becomes 9, and 9 becomes 6).
 *
 * Constraints:
 *    1 <= num <= 10^4
 *    num consists of only 6 and 9 digits.
 */

/**
 * @param {number} num
 * @return {number}
 */
const maximum69Number_1 = (num) => {
  const digits = []
  while (num) {
    digits.unshift(num % 10)
    num = (num / 10) | 0
  }

  for (let i = 0; i < digits.length; i++)
    if (digits[i] === 6) {
      digits[i] = 9
      break
    }

  return digits.reduce((acc, next) => acc * 10 + next)
}

const maximum69Number = (number) => {
  const digits = [...number.toString()]
  const i = digits.indexOf('6')
  if (i > -1) digits[i] = '9'
  return Number(digits.join(''))
}

num = 9669
// Output: 9969
// Explanation:
// Changing the first digit results in 6669.
// Changing the second digit results in 9969.
// Changing the third digit results in 9699.
// Changing the fourth digit results in 9666.
// The maximum number is 9969.

// num = 9996
// Output: 9999
// Explanation: Changing the last digit 6 to 9 results in the maximum number.

// num = 9999
// Output: 9999
// Explanation: It is better not to apply any change.

console.log(maximum69Number(num))
