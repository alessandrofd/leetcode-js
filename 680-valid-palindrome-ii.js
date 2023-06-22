/**
 * @param {string} s
 * @return {boolean}
 */
const validPalindrome = (s, skipped = false) => {
  if (s.length < 2) return true
  if (s[0] === s[s.length - 1])
    return validPalindrome(s.slice(1, s.length - 1), skipped)
  else {
    if (skipped) return false
    else {
      return (
        validPalindrome(s.slice(1, s.length), true) ||
        validPalindrome(s.slice(0, s.length - 1), true)
      )
    }
  }
}

// Input: s = "aba"
// Output: true

console.log(validPalindrome('aba'))

// Input: s = "abca"
// Output: true
// Explanation: You could delete the character 'c'.

console.log(validPalindrome('abca'))

// Input: s = "abc"
// Output: false

console.log(validPalindrome('abc'))

console.log(validPalindrome("ebcbbececabbacecbbcbe"))

