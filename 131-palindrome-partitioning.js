/**
 * Given a string s, partition s such that every substring of the partition is
 * a palindrome.
 *
 * Return all possible palindrome partitioning of s.
 *
 * Constraints:
 *    1 <= s.length <= 16
 *    s contains only lowercase English letters.
 */

/**
 * @param {string} s
 * @return {string[][]}
 */
// Approach 1: Backtracking
const partition_backtracking = (s) => {
  const result = []

  const isPalindrome = (start, end) => {
    while (start <= end) if (s[start++] !== s[end--]) return false
    return true
  }

  const backtrack = (start, palindromes) => {
    if (start >= s.length) result.push([...palindromes])
    for (let end = start; end < s.length; end++) {
      if (isPalindrome(start, end)) {
        palindromes.push(s.slice(start, end + 1))
        backtrack(end + 1, palindromes)
        palindromes.pop()
      }
    }
  }

  backtrack(0, [])
  return result
}

// Approach 2: Backtracking with Dynamic Programming
const partition_dynamic_programming = (s) => {
  const n = s.length
  const memo = new Array(n).fill().map((_) => new Array(n))
  const result = []

  const dp = (start, palindromes) => {
    if (start >= n) result.push([...palindromes])
    for (let end = start; end < n; end++) {
      if (
        s[start] === s[end] &&
        (end - start <= 2 || memo[start + 1][end - 1])
      ) {
        memo[start][end] = true
        palindromes.push(s.slice(start, end + 1))
        dp(end + 1, palindromes)
        palindromes.pop()
      }
    }
  }

  dp(0, [])
  return result
}

s = 'aab'
// Output: [["a","a","b"],["aa","b"]]

// s = 'a'
// Output: [["a"]]

s = 'mamam'

console.log(partition_backtracking(s))
console.log(partition_dynamic_programming(s))
