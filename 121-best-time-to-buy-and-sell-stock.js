/**
 * You are given an array prices where prices[i] is the price of a given stock
 * on the ith day.
 *
 * You want to maximize your profit by choosing a single day to buy one stock
 * and choosing a different day in the future to sell that stock.
 *
 * Return the maximum profit you can achieve from this transaction. If you
 * cannot achieve any profit, return 0.
 *
 * Constraints:
 *    1 <= prices.length <= 10^5
 *    0 <= prices[i] <= 10^4
 */

/**
 * @param {number[]} prices
 * @return {number}
 */
const maxProfit_forLoop = (prices) => {
  let buy = (sell = prices[0])
  let profit = 0
  for (const price of prices) {
    if (price < buy) {
      buy = sell = price
    } else if (price > sell) {
      sell = price
      profit = Math.max(profit, price - buy)
    }
  }
  return profit
}

const maxProfit_pointers = (prices) => {
  const n = prices.length

  let buy = 0
  let sell = 1
  let profit = 0
  while (sell < n) {
    if (prices[sell] > prices[buy]) {
      profit = Math.max(profit, prices[sell] - prices[buy])
    } else {
      buy = sell
    }
    sell++
  }
  return profit
}

prices = [7, 1, 5, 3, 6, 4]
// Output: 5
// Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.
// Note that buying on day 2 and selling on day 1 is not allowed because you must buy before you sell.

// prices = [7, 6, 4, 3, 1]
// Output: 0
// Explanation: In this case, no transactions are done and the max profit = 0.

console.log(maxProfit_forLoop(prices))
console.log(maxProfit_pointers(prices))
