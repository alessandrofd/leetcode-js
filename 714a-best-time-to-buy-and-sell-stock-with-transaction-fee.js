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
var maxProfit_dp = (prices, fee) => {
  const n = prices.length
  const dp = new Array(n).fill().map((_) => Array(2).fill(-Infinity))
  dp[0][0] = 0
  dp[0][1] = -prices[0]

  for (let i = 1; i < n; i++) {
    dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i] - fee)
    dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][0] - prices[i])
  }

  return dp[n - 1][0]
}

var maxProfit_dp_optimized = (prices, fee) => {
  const n = prices.length
  let sold = 0
  let bought = -prices[0]

  for (let i = 1; i < n; i++) {
    temp = Math.max(sold, bought + prices[i] - fee)
    bought = Math.max(bought, sold - prices[i])
    sold = temp
  }

  return sold
}

prices = [1, 3, 2, 8, 4, 9]
fee = 2
// Expected: 8

prices = [1, 3, 7, 5, 10, 3]
fee = 3
// Expected: 6

console.log(maxProfit_dp(prices, fee))
console.log(maxProfit_dp_optimized(prices, fee))
