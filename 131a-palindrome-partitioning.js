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
const partition_backtracking = (s) => {}

// Approach 2: Backtracking with Dynamic Programming
const partition_dynamic_programming = (s) => {}

s = 'aab'
// Output: [["a","a","b"],["aa","b"]]

// s = 'a'
// Output: [["a"]]

s = 'mamam'

console.log(partition_backtracking(s))
console.log(partition_dynamic_programming(s))
