/**
 * @param {string} s
 * @return {number}
 */
// Approach #1: Check All Substrings
// const countSubstrings = (s) => {
//   const isPalindrome = (start, end) => {
//     while (start < end) {
//       if (s[start] != s[end]) return false
//       start++
//       end--
//     }
//     return true
//   }

//   let result = 0
//   for (let start = 0; start < s.length; start++)
//     for (let end = start; end < s.length; end++)
//       result += isPalindrome(start, end) ? 1 : 0

//   return result
// }

// Approach #2: Dynamic Programming
// const countSubstrings = (s) => {
//   if (s.length <= 0) return 0

//   let result = 0
//   const dp = new Array(s.length).fill(null).map((_) => new Array(s.length))

//   // Base case: single letter substrings
//   for (let i = 0; i < s.length; i++, result++) dp[i][i] = true

//   // Base case: double letter substrings
//   for (let i = 0; i < s.length - 1; i++) {
//     dp[i][i + 1] = s[i] === s[i + 1]
//     result += dp[i][i + 1] ? 1 : 0
//   }

//   // All other cases: substrings of length 3 to s.length
//   for (let len = 3; len <= s.length; len++) {
//     for (let i = 0, j = i + len - 1; j < s.length; i++, j++) {
//       dp[i][j] = dp[i + 1][j - 1] && s[i] === s[j]
//       result += dp[i][j] ? 1 : 0
//     }
//   }
//   return result
// }

// Approach #3: Expand Around Possible Centers
const countSubstrings = (s) => {
  const countAround = (start, end) => {
    let result = 0
    while (start >= 0 && end < s.length) {
      if (s[start] != s[end]) break
      result++
      start--
      end++
    }
    return result
  }

  let result = 0

  for (let i = 0; i < s.length; i++) {
    // odd-length palindromes, single character center
    result += countAround(i, i)

    // even-length palindromes, consecutive characters center
    result += countAround(i, i + 1)
  }

  return result
}

// let s = 'abc' // Output: 3
let s = 'aaa' // Output: 6

console.log(countSubstrings(s))

const str = 'alessandro'
