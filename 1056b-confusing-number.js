/**
 * A confusing number is a number that when rotated 180 degrees becomes a
 * different number with each digit valid.
 *
 * We can rotate digits of a number by 180 degrees to form new digits.
 *
 *    When 0, 1, 6, 8, and 9 are rotated 180 degrees, they become 0, 1, 9, 8,
 *    and 6 respectively.
 *
 *    When 2, 3, 4, 5, and 7 are rotated 180 degrees, they become invalid.
 *
 * Note that after rotating a number, we can ignore leading zeros.
 *
 * For example, after rotating 8000, we have 0008 which is considered as just 8.
 *
 * Given an integer n, return true if it is a confusing number,
 * or false otherwise.
 *
 * Constraints:
 *    0 <= n <= 10^9
 */

/**
 * @param {number} n
 * @return {boolean}
 */

// Approach 1: Invert and Reverse
const confusingNumber_invertAndReverse = (n) => {
  const invalids = new Set(['2', '3', '4', '5', '7'])
  const rotated = new Map([
    ['0', '0'],
    ['1', '1'],
    ['6', '9'],
    ['8', '8'],
    ['9', '6'],
  ])

  const digits = [...n.toString()]
  for (const digit of digits) if (invalids.has(digit)) return false
  return (
    parseInt(
      digits
        .reverse()
        .map((digit) => rotated.get(digit))
        .join('')
    ) !== n
  )
}

// Approach 2: Use the remainder
const confusingNumber_remainder = (n) => {
  const invalids = new Set([2, 3, 4, 5, 7])
  const rotated = new Map([
    [0, 0],
    [1, 1],
    [6, 9],
    [8, 8],
    [9, 6],
  ])

  let original = n
  let result = 0
  while (n) {
    const digit = n % 10
    if (invalids.has(digit)) return false
    result = result * 10 + rotated.get(digit)
    n = (n / 10) | 0
  }

  return result !== original
}

n = 6
// Output: true
// Explanation: We get 9 after rotating 6, 9 is a valid number, and 9 != 6.

// n = 89
// Output: true
// Explanation: We get 68 after rotating 89, 68 is a valid number and 68 != 89.

// n = 11
// Output: false
// Explanation: We get 11 after rotating 11, 11 is a valid number but the value
// remains the same, thus 11 is not a confusing number

// n = 8000

// n = 25

console.log(confusingNumber_invertAndReverse(n))
console.log(confusingNumber_remainder(n))
