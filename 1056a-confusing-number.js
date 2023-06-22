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
  const invalids = [2, 3, 4, 5, 7]
  const map = [0, 1, , , , , 9, , 8, 6]

  const nums = n
    .toString()
    .split('')
    .reverse()
    .map((c) => parseInt(c))

  let inverted = 0
  for (let i = 0; i < nums.length; i++) {
    console.log(nums[i])
    if (invalids.includes(nums[i])) return false
    inverted = inverted * 10 + map[nums[i]]
  }

  inverted
  if (inverted === n) return false
  return true
}

// Approach 2: Use the remainder
const confusingNumber_remainder = (n) => {
  const invalids = [2, 3, 4, 5, 7]
  const map = [0, 1, , , , , 9, , 8, 6]

  let inverted = 0
  let original = n
  while (original) {
    const num = original % 10
    if (invalids.includes(num)) return false
    inverted = inverted * 10 + map[num]
    original = (original / 10) | 0
  }

  inverted
  if (inverted === n) return false
  return true
}

n = 6
// Output: true
// Explanation: We get 9 after rotating 6, 9 is a valid number, and 9 != 6.

n = 89
// Output: true
// Explanation: We get 68 after rotating 89, 68 is a valid number and 68 != 89.

n = 11
// Output: false
// Explanation: We get 11 after rotating 11, 11 is a valid number but the value
// remains the same, thus 11 is not a confusing number

n = 8000

n = 25

console.log(confusingNumber_invertAndReverse(n))
console.log(confusingNumber_remainder(n))
