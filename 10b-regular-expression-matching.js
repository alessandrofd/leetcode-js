/** Given an input string s and a pattern p, implement regular expression
 * matching with support for '.' and '*' where:
 *
 *    '.' Matches any single character.​​​​
 *    '*' Matches zero or more of the preceding element.
 *
 * The matching should cover the entire input string (not partial).
 *
 * Constraints:
 *    1 <= s.length <= 20
 *    1 <= p.length <= 30
 *    s contains only lowercase English letters.
 *    p contains only lowercase English letters, '.', and '*'.
 *    It is guaranteed for each appearance of the character '*', there will be a
 *    previous valid character to match.
 */

// Approach 1: Recursion
const isMatch_recursion = (string, pattern) => {
  // const isMatch = (string, pattern) => {
  if (!pattern.length) return !string.length

  const firstMatch =
    string.length && (string[0] === pattern[0] || pattern[0] === '.')

  if (pattern.length >= 2 && pattern[1] === '*')
    return (
      isMatch(string, pattern.slice(2)) ||
      (firstMatch && isMatch(string.slice(1), pattern))
    )
  else return firstMatch && isMatch(string.slice(1), pattern.slice(1))
}

// Approach 2: Dynamic Programming
// const isMatch_DP = (string, pattern) => {
const isMatch = (string, pattern) => {
  const memo = new Array(string.length + 1)
    .fill()
    .map((_) => new Array(pattern.length + 1))

  const dp = (i, j) => {
    if (memo[i][j]) return memo[i][j]

    let result

    if (j === pattern.length) result = i === string.length
    else {
      const firstMatch =
        i !== string.length && (pattern[j] === string[i] || pattern[j] === '.')

      if (j < pattern.length - 1 && pattern[j + 1] === '*')
        result = dp(i, j + 2) || (firstMatch && dp(i + 1, j))
      else result = firstMatch && dp(i + 1, j + 1)
    }

    return (memo[i][j] = result)
  }

  return dp(0, 0)
}

s = 'aa'
p = 'a'
// Output: false
// Explanation: "a" does not match the entire string "aa".

s = 'aa'
p = 'a*'
// Output: true
// Explanation: '*' means zero or more of the preceding element, 'a'. Therefore,
// by repeating 'a' once, it becomes "aa".

s = 'ab'
p = '.*'
// Output: true
// Explanation: ".*" means "zero or more (*) of any character (.)".

console.log(isMatch(s, p))
