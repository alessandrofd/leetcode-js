/**
 * Given two strings s1 and s2, return the lowest ASCII sum of deleted
 * characters to make two strings equal.
 *
 * Constraints:
 *    1 <= s1.length, s2.length <= 1000
 *    s1 and s2 consist of lowercase English letters.
 *
 * OBS: O problema "583. Delete operations for two string" descreve a base da
 * resolução deste problema.
 */

/**
 * @param {string} s1
 * @param {string} s2
 * @return {number}
 */
const minimumDeleteSum_top_down_dp = (s1, s2) => {}

/**
 * @param {string} s1
 * @param {string} s2
 * @return {number}
 */
const minimumDeleteSum_bottom_up_dp = (s1, s2) => {}

/**
 * @param {string} s1
 * @param {string} s2
 * @return {number}
 */
const minimumDeleteSum_bottom_up_1D_dp = (s1, s2) => {}

s1 = 'sea'
s2 = 'eat'
// Expected: 231

// s1 = 'delete'
// s2 = 'leet'
// Expected: 403

console.log(minimumDeleteSum_top_down_dp(s1, s2))
console.log(minimumDeleteSum_bottom_up_dp(s1, s2))
console.log(minimumDeleteSum_bottom_up_1D_dp(s1, s2))
