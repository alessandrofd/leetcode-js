/**
 * An integer array original is transformed into a doubled array changed by
 * appending twice the value of every element in original, and then randomly
 * shuffling the resulting array.
 *
 * Given an array changed, return original if changed is a doubled array. If
 * changed is not a doubled array, return an empty array. The elements in
 * original may be returned in any order.
 *
 * Constraints:
 *    1 <= changed.length <= 10^5
 *    0 <= changed[i] <= 10^5
 */

/**
 * @param {number[]} changed
 * @return {number[]}
 */
// Approach 1: Sort + HashMap
var findOriginalArray_1 = function (changed) {
  if (changed.length % 2) return []

  changed.sort((a, b) => a - b)
  const freq = new Map()
  for (const number of changed) freq.set(number, (freq.get(number) ?? 0) + 1)

  const original = []
  for (const number of changed) {
    if (freq.get(number)) {
      freq.set(number, freq.get(number) - 1)
      const twice = number * 2
      if (freq.get(twice)) {
        freq.set(twice, freq.get(twice) - 1)
        original.push(number)
      } else return []
    }
  }
  return original
}

// Approach 2: Counting Sort
var findOriginalArray = function (changed) {
  if (changed.lenght % 2) return []

  const max = changed.reduce((acc, nxt) => Math.max(acc, nxt), -Infinity)
  const freq = new Array(max * 2 + 1).fill(0)
  for (const number of changed) freq[number]++

  const original = []
  for (let number = 0; number <= max; number++) {
    if (freq[number]) {
      freq[number]--
      const twice = number * 2
      if (freq[twice]) {
        freq[twice]--
        original.push(number)
        number--
      } else return []
    }
  }
  return original
}

changed = [1, 3, 4, 2, 6, 8]
// Output: [1,3,4]
// Explanation: One possible original array could be [1,3,4]:
// - Twice the value of 1 is 1 * 2 = 2.
// - Twice the value of 3 is 3 * 2 = 6.
// - Twice the value of 4 is 4 * 2 = 8.
// Other original arrays could be [4,3,1] or [3,1,4].

changed = [6, 3, 0, 1]
// Output: []
// Explanation: changed is not a doubled array.

changed = [1]
// Output: []
// Explanation: changed is not a doubled array.

changed = [2, 1]

console.log(findOriginalArray(changed))
