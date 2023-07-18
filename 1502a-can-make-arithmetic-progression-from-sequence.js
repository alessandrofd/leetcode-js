/**
 * A sequence of numbers is called an arithmetic progression if the difference
 * between any two consecutive elements is the same.
 *
 * Given an array of numbers arr, return true if the array can be rearranged to
 * form an arithmetic progression. Otherwise, return false.
 *
 * Constraints:
 *    2 <= arr.length <= 1000
 *    -10^6 <= arr[i] <= 10^6
 */

/**
 * @param {number[]} arr
 * @return {boolean}
 */
const canMakeArithmeticProgression = (arr) => {
  n = arr.length
  arr.sort((a, b) => a - b)

  const diff = arr[1] - arr[0]
  for (let i = 2; i < n; i++) {
    if (arr[i] - arr[i - 1] !== diff) return false
  }

  return true
}

arr = [3, 5, 1]
// Expected: true

arr = [1, 2, 4]
// Expected: false

console.log(canMakeArithmeticProgression(arr))
