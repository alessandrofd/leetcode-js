/**
 * You are given an array prices where prices[i] is the price of a given stock
 * on the ith day, and an integer fee representing a transaction fee.
 *
 * Find the maximum profit you can achieve. You may complete as many
 * transactions as you like, but you need to pay the transaction fee for each
 * transaction.
 *
 * Note: You may not engage in multiple transactions simultaneously (i.e., you
 * must sell the stock before you buy again).
 *
 * Constraints:
 *    1 <= prices.length <= 5 * 10^4
 *    1 <= prices[i] < 5 * 10^4
 *    0 <= fee < 5 * 10^4
 */

/**
 * @param {number[]} prices
 * @param {number} fee
 * @return {number}
 */
var maxProfit_dp = (prices, fee) => {}

var maxProfit_dp_optimized = (prices, fee) => {}

prices = [1, 3, 2, 8, 4, 9]
fee = 2
// Expected: 8

prices = [1, 3, 7, 5, 10, 3]
fee = 3
// Expected: 6

console.log(maxProfit_dp(prices, fee))
console.log(maxProfit_dp_optimized(prices, fee))
