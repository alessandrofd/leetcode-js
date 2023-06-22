/**
 * You are given a string s of even length. Split this string into two halves of
 * equal lengths, and let a be the first half and b be the second half.
 *
 * Two strings are alike if they have the same number of vowels
 * ('a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U'). Notice that s contains
 * uppercase and lowercase letters.
 *
 * Return true if a and b are alike. Otherwise, return false
 *
 * Constraints:
 *    2 <= s.length <= 1000
 *    s.length is even.
 *    s consists of uppercase and lowercase letters.
 */

/**
 * @param {string} s
 * @return {boolean}
 */
const halvesAreAlike = (s) => {
  const vowels = ['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U']
  let count = 0
  for (let i = 0; i < s.length / 2; i++) if (vowels.includes(s[i])) count++
  for (let i = s.length / 2; i < s.length; i++)
    if (vowels.includes(s[i])) count--

  return count === 0
}

s = 'book'
// Output: true
// Explanation: a = "bo" and b = "ok". a has 1 vowel and b has 1 vowel.
// Therefore, they are alike.

// s = 'textbook'
// Output: false
// Explanation: a = "text" and b = "book". a has 1 vowel whereas b has 2.
// Therefore, they are not alike.
// Notice that the vowel o is counted twice.

console.log(halvesAreAlike(s))
