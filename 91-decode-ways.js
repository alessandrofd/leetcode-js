/**
 * A message containing letters from A-Z can be encoded into numbers using the
 * following mapping:
 *    'A' -> "1"
 *    'B' -> "2"
 *    ...
 *    'Z' -> "26"
 *
 * To decode an encoded message, all the digits must be grouped then mapped back
 * into letters using the reverse of the mapping above (there may be multiple
 * ways). For example, "11106" can be mapped into:
 *    "AAJF" with the grouping (1 1 10 6)
 *    "KJF" with the grouping (11 10 6)
 *
 * Note that the grouping (1 11 06) is invalid because "06" cannot be mapped
 * into 'F' since "6" is different from "06".
 *
 * Given a string s containing only digits, return the number of ways to decode it.
 *
 * The test cases are generated so that the answer fits in a 32-bit integer.
 *
 * Constraints:
 *    1 <= s.length <= 100
 *    s contains only digits and may contain leading zero(s).
 */

/**
 * @param {string} s
 * @return {number}
 */
// Approach 1: Recursive Approach with Memoization
const numDecodings_1 = (s) => {
  const memo = new Map()

  const recurse = (index) => {
    if (memo.has(index)) return memo.get(index)
    if (index === s.length) return 1
    if (s[index] === '0') return 0
    if (index === s.length - 1) return 1

    let result = recurse(index + 1)
    if (parseInt(s.slice(index, index + 2)) <= 26) result += recurse(index + 2)
    memo.set(index, result)
    return result
  }

  return recurse(0)
}

// Approach 2: Iterative Approach
const numDecodings_2 = (s) => {
  const dp = new Uint32Array(s.length + 1)
  dp[0] = 1
  dp[1] = s[0] === '0' ? 0 : 1
  for (let i = 2; i < dp.length; i++) {
    if (s[i - 1] !== '0') dp[i] = dp[i - 1]
    const twoDigit = parseInt(s.slice(i - 2, i))
    if (twoDigit >= 10 && twoDigit <= 26) dp[i] += dp[i - 2]
  }
  return dp[s.length]
}

// Approach 3: Iterative, Constant Space
const numDecodings = (s) => {
  if (s[0] === '0') return 0

  let oneBack = 1
  let twoBack = 1
  for (let i = 1; i < s.length; i++) {
    let current = 0

    if (s[i] !== '0') current = oneBack

    const twoDigit = parseInt(s.slice(i - 1, i + 1))
    if (twoDigit >= 10 && twoDigit <= 26) current += twoBack

    twoBack = oneBack
    oneBack = current
  }
  return oneBack
}

s = '12'
// Output: 2
// Explanation: "12" could be decoded as "AB" (1 2) or "L" (12).

// s = '226'
// Output: 3
// Explanation: "226" could be decoded as "BZ" (2 26), "VF" (22 6), or
// "BBF" (2 2 6).

// s = "06"
// Output: 0
// Explanation: "06" cannot be mapped to "F" because of the leading zero
// ("6" is different from "06").

// s = '10'
// Output: 1

console.log(numDecodings(s))
