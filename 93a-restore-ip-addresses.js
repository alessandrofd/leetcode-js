/**
 * A valid IP address consists of exactly four integers separated by single
 * dots. Each integer is between 0 and 255 (inclusive) and cannot have
 * leading zeros.
 *
 * For example, "0.1.2.201" and "192.168.1.1" are valid IP addresses,
 * but "0.011.255.245", "192.168.1.312" and "192.168@1.1" are invalid
 * IP addresses.
 *
 * Given a string s containing only digits, return all possible valid IP
 * addresses that can be formed by inserting dots into s. You are not allowed to
 * reorder or remove any digits in s. You may return the valid IP addresses in
 * any order.
 *
 * Constraints:
 *    1 <= s.length <= 20
 *    s consists of digits only.
 */

/**
 * @param {string} s
 * @return {string[]}
 */
// Approach 1: Backtracking
const restoreIpAddresses_backtracking = (s) => {}

// Approach 2: Iterative
const restoreIpAddresses_iterative = (s) => {}

s = '25525511135'
// Output: ["255.255.11.135","255.255.111.35"]

// s = '0000'
// Output: ["0.0.0.0"]

// s = '101023'
// Output: ["1.0.10.23","1.0.102.3","10.1.0.23","10.10.2.3","101.0.2.3"]

// s = '1111'
// Output: ['1.1.1.1']

console.log(restoreIpAddresses_backtracking(s))
console.log(restoreIpAddresses_iterative(s))
