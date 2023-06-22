/**
 * You are given an integer n. We reorder the digits in any order (including the
 * original order) such that the leading digit is not zero.
 *
 * Return true if and only if we can do this so that the resulting number is a
 * power of two.
 *
 * Constraints:
 *    1 <= n <= 10^9
 */

/**
 * @param {number} n
 * @return {boolean}
 */

// Discussion board
var reorderedPowerOf2_d = function (N) {
  let res = N.toString().split('').sort().join('')
  for (let i = 0; i < 30; i++)
    if ((1 << i).toString().split('').sort().join('') === res) return true
  return false
}

// Approach 1: Permutations
const reorderedPowerOf2_1 = (n) => {
  const isPowerof2 = (arr) => {
    if (arr[0] === 0) return false
    const n = arr.reduce((acc, nxt) => acc * 10 + nxt)
    return n && !(n & (n - 1))
  }

  const permutations = (arr, start) => {
    if (start === arr.length) return isPowerof2(arr)
    for (let i = start; i < arr.length; i++) {
      ;[arr[start], arr[i]] = [arr[i], arr[start]]
      if (permutations(arr, start + 1)) return true
      ;[arr[start], arr[i]] = [arr[i], arr[start]]
    }
    return false
  }

  const arr = n
    .toString()
    .split('')
    .map((n) => parseInt(n))

  return permutations(arr, 0)
}

// Approach 2: Counting
const reorderedPowerOf2 = (n) => {
  const count = (n) => {
    const arr = new Array(10).fill(0)
    while (n > 0) {
      arr[n % 10]++
      n = (n / 10) | 0
    }
    return arr
  }

  const a = count(n)
  for (let i = 0; i < 31; i++) {
    const b = count(1 << i)
    if (a.every((num, index) => num === b[index])) return true
  }
  return false
}

n = 1
// Output: true

n = 10
// Output: false

console.log(reorderedPowerOf2(n))
