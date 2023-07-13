/**
 * You are given an array of characters letters that is sorted in non-decreasing
 * order, and a character target. There are at least two different characters in
 * letters.
 *
 * Return the smallest character in letters that is lexicographically greater
 * than target. If such a character does not exist, return the first character
 * n letters.
 *
 * Constraints:
 *    2 <= letters.length <= 10^4
 *    letters[i] is a lowercase English letter.
 *    letters is sorted in non-decreasing order.
 *    letters contains at least two different characters.
 *    target is a lowercase English letter.
 */

/**
 * @param {character[]} letters
 * @param {character} target
 * @return {character}
 */
const nextGreatestLetter = (letters, target) => {
  const n = letters.length

  lo = 0
  hi = n - 1
  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2)
    if (letters[mid] <= target) lo = mid + 1
    else hi = mid - 1
  }
  return lo < n ? letters[lo] : letters[0]
}

letters = ['c', 'f', 'j']
target = 'a'
// Expected: "c"

// letters = ['c', 'f', 'j']
// target = 'c'
// Expected: "f"

// letters = ['x', 'x', 'y', 'y']
// target = 'z'
// Expected: "x"

console.log(nextGreatestLetter(letters, target))

b = 'a' > 'b'
b
