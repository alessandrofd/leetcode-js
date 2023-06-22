/**
 * Given a string s, reverse only all the vowels in the string and return it.
 *
 * The vowels are 'a', 'e', 'i', 'o', and 'u', and they can appear in both lower
 * and upper cases, more than once.
 *
 * Constraints:
 *    1 <= s.length <= 3 * 10^5
 *    s consist of printable ASCII characters.
 */

/**
 * @param {string} s
 * @return {string}
 */
const reverseVowels_0 = (s) => {
  const vowels = ['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U']
  const array = [...s]
  const reversed = array.filter((c) => vowels.includes(c)).reverse()
  for (let i = 0; i < array.length; i++)
    if (vowels.includes(array[i])) array[i] = reversed.shift()
  return array.join('')
}

const reverseVowels_01 = (s) => {
  const vowels = new Set(['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U'])
  const array = [...s]
  const reversed = array.filter((c) => vowels.has(c)).reverse()
  for (let i = 0; i < array.length; i++)
    if (vowels.has(array[i])) array[i] = reversed.shift()
  return array.join('')
}

// Approach 1: Two Pointers
const reverseVowels = (s) => {
  const vowels = ['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U']
  const array = [...s]

  let start = 0
  let end = s.length - 1
  while (start < end) {
    while (start < s.length && !vowels.includes(array[start])) start++
    while (end >= 0 && !vowels.includes(array[end])) end--
    if (start < end) {
      const temp = array[start]
      array[start] = array[end]
      array[end] = temp
      start++
      end--
    }
  }
  return array.join('')
}

s = 'hello'
// Output: "holle"

s = 'leetcode'
// Output: "leotcede"

console.log(reverseVowels(s))
