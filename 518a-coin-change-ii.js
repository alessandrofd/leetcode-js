/**
 * You are given an integer array coins representing coins of different
 * denominations and an integer amount representing a total amount of money.
 *
 * Return the number of combinations that make up that amount. If that amount
 * of money cannot be made up by any combination of the coins, return 0.
 *
 * You may assume that you have an infinite number of each kind of coin.
 *
 * The answer is guaranteed to fit into a signed 32-bit integer.
 *
 * Constraints:
 *    1 <= coins.length <= 300
 *    1 <= coins[i] <= 5000
 *    All the values of coins are unique.
 *    0 <= amount <= 5000
 */

/**
 * @param {number} amount
 * @param {number[]} coins
 * @return {number}
 */
const change_topDown_DP = (amount, coins) => {}

/**
 * @param {number} amount
 * @param {number[]} coins
 * @return {number}
 */
const change_bottomUp_DP = (amount, coins) => {}

/**
 * @param {number} amount
 * @param {number[]} coins
 * @return {number}
 */
const change_bottomUp_DP_spaceOptimized = (amount, coins) => {}

/**
 * @param {number} amount
 * @param {number[]} coins
 * @return {number}
 */
const change_bottomUp_1D_DP = (amount, coins) => {}

amount = 5
coins = [1, 2, 5]
// Expected: 4

// amount = 3
// coins = [2]
// Expected: 0

// amount = 100
// coins = [3, 5, 7, 8, 9, 10, 11]
// Expected: 6606

// amount = 5000
// coins = [102, 89, 76, 63, 50, 37, 24, 11]
// Expected: 992951208

console.log(change_topDown_DP(amount, coins))
console.log(change_bottomUp_DP(amount, coins))
console.log(change_bottomUp_DP_spaceOptimized(amount, coins))
console.log(change_bottomUp_1D_DP(amount, coins))
