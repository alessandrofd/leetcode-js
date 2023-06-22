/**
 * You are given two positive integer arrays spells and potions, of length
 * n and m respectively, where spells[i] represents the strength of the ith
 * spell and potions[j] represents the strength of the jth potion.
 *
 * You are also given an integer success. A spell and potion pair is considered
 * successful if the product of their strengths is at least success.
 *
 * Return an integer array pairs of length n where pairs[i] is the number of
 * potions that will form a successful pair with the ith spell.
 *
 * Constraints:
 *    n == spells.length
 *    m == potions.length
 *    1 <= n, m <= 10^5
 *    1 <= spells[i], potions[i] <= 10^5
 *    1 <= success <= 10^10
 */

/**
 * @param {number[]} spells
 * @param {number[]} potions
 * @param {number} success
 * @return {number[]}
 */
const successfulPairs = (spells, potions, success) => {}

spells = [5, 1, 3]
potions = [1, 2, 3, 4, 5]
success = 7
// Output: [4,0,3]

// spells = [3, 1, 2]
// potions = [8, 5, 8]
// success = 16
// Output: [2,0,2]

console.log(successfulPairs(spells, potions, success))
