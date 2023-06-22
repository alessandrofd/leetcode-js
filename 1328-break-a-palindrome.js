/**
 * Given a palindromic string of lowercase English letters palindrome, replace
 * exactly one character with any lowercase English letter so that the resulting
 * string is not a palindrome and that it is the lexicographically smallest one
 * possible.
 *
 * Return the resulting string. If there is no way to replace a character to
 * make it not a palindrome, return an empty string.
 *
 * A string a is lexicographically smaller than a string b (of the same length)
 * if in the first position where a and b differ, a has a character strictly
 * smaller than the corresponding character in b. For example, "abcc" is
 * lexicographically smaller than "abcd" because the first position they differ
 * is at the fourth character, and 'c' is smaller than 'd'.
 *
 * Constraints:
 *    1 <= palindrome.length <= 1000
 *    palindrome consists of only lowercase English letters.
 */

/**
 * @param {string} palindrome
 * @return {string}
 */
const breakPalindrome_1 = (palindrome) => {
  if (palindrome.length === 1) return ''
  const array = [...palindrome]
  const n = array.length

  const index = array.findIndex((x) => x !== 'a')
  if (index === -1 || (n % 2 && index === ((n / 2) | 0))) array[n - 1] = 'b'
  else array[index] = 'a'
  return array.join('')
}

const breakPalindrome = (palindrome) => {
  const n = palindrome.length
  if (n === 1) return ''

  const array = [...palindrome]
  for (let i = 0; i < ((n / 2) | 0); i++)
    if (array[i] !== 'a') {
      array[i] = 'a'
      return array.join('')
    }

  array[n - 1] = 'b'
  return array.join('')
}

palindrome = 'abccba'
// Output: "aaccba"
// Explanation: There are many ways to make "abccba" not a palindrome, such as
// "zbccba", "aaccba", and "abacba".
// Of all the ways, "aaccba" is the lexicographically smallest.

palindrome = 'a'
// Output: ""
// Explanation: There is no way to replace a single character to make "a" not a
// palindrome, so return an empty string.

palindrome = 'aba'
// Output: 'abb'

console.log(breakPalindrome(palindrome))
