/**You are given an array prices where prices[i] is the price of a given stock
 * on the ith day.
 *
 * Find the maximum profit you can achieve. You may complete as many
 * transactions as you like (i.e., buy one and sell one share of the stock
 * multiple times) with the following restrictions:
 *
 *    After you sell your stock, you cannot buy stock on the next day
 *    (i.e., cooldown one day).
 *
 * Note: You may not engage in multiple transactions simultaneously
 * (i.e., you must sell the stock before you buy again).
 *
 * Constraints:
 *    1 <= prices.length <= 5000
 *    0 <= prices[i] <= 1000
 */

// Approach 1: Dynamic Programming with State Machine
const maxProfit_DP_stateMachine = (prices) => {
  // const maxProfit = (prices) => {
  let reset = 0
  let sold = -Infinity
  let held = -Infinity

  for (const price of prices) {
    const temp = sold
    sold = held + price
    held = Math.max(held, reset - price)
    reset = Math.max(reset, temp)
  }
  return Math.max(reset, sold)
}

// Approach 2: Yet-Another Dynamic Programming
// const maxProfit_DP_reverseOrder = (prices) => {
const maxProfit = (prices) => {
  const max = new Array(prices.length + 2).fill(0)

  for (let i = prices.length - 1; i >= 0; i--) {
    // Case 1 - buy and sell the stock
    let case1 = 0
    for (let j = i + 1; j < prices.length; j++) {
      const profit = prices[j] - prices[i] + max[j + 2]
      case1 = Math.max(case1, profit)
    }

    // Case 2 - do nothing
    const case2 = max[i + 1]

    max[i] = Math.max(case1, case2)
  }

  return max[0]
}

prices = [1, 2, 3, 0, 2]
// Output: 3
// Explanation: transactions = [buy, sell, cooldown, buy, sell]

Input: prices = [1]
// Output: 0

console.log(maxProfit(prices))
