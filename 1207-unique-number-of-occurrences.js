/**
 * Given an array of integers arr, return true if the number of occurrences of
 * each value in the array is unique or false otherwise.
 *
 * Constraints:
 *    1 <= arr.length <= 1000
 *    -1000 <= arr[i] <= 1000
 */

/**
 * @param {number[]} arr
 * @return {boolean}
 */
const uniqueOccurrences_sort = (arr) => {
  const map = new Map()
  for (num of arr) map.set(num, (map.get(num) ?? 0) + 1)

  freqs = [...map.values()].sort((a, b) => a - b)
  for (let i = 1; i < freqs.length; i++)
    if (freqs[i] === freqs[i - 1]) return false

  return true
}

const uniqueOccurrences = (arr) => {
  const map = new Map()
  for (num of arr) map.set(num, (map.get(num) ?? 0) + 1)

  set = new Set(map.values())

  return map.size === set.size
}

arr = [1, 2, 2, 1, 1, 3]
// Output: true
// Explanation: The value 1 has 3 occurrences, 2 has 2 and 3 has 1.
// No two values have the same number of occurrences.

arr = [1, 2]
// Output: false

arr = [-3, 0, 1, -3, 1, 1, 1, -3, 10, 0]
// Output: true

console.log(uniqueOccurrences(arr))
