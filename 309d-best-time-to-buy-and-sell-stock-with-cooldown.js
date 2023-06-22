/**
 * You are given an array prices where prices[i] is the price of a given stock
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

/*
espera -> comprar -> comprado
espera -> aguardar -> espera
comprado -> aguardar -> comprado
comprado -> vender -> vendido
vendido -> aguardar -> espera
*/

// Approach 1: Dynamic Programming with State Machine
const maxProfit_DP_stateMachine = (prices) => {
  const n = prices.length
  if (n <= 2) return 0

  let comprado = -Infinity
  let vendido = -Infinity
  let espera = 0

  for (const price of prices) {
    const temp = comprado
    comprado = Math.max(comprado, espera - price)
    espera = Math.max(espera, vendido)
    vendido = temp + price
  }

  return Math.max(espera, vendido)
}

// Approach 2: Yet-Another Dynamic Programming
// Analisa duas posibilidades dia-a-dia: comprar e vender ou aguardar
const maxProfit_DP_reverseOrder = (prices) => {
  const n = prices.length
  if (n <= 2) return 0

  const profits = new Array(n + 2).fill(0)

  for (let i = n - 2; i <= 0; i--) {
    const hold = profits[i + 1]
    let buyAndSell = 0
    for (let j = i + 1; j < n; j++) {
      buyAndSell = Math.max(buyAndSell, prices[j] - prices[i] + profits[j + 2])
    }
    profits[i] = Math.max(hold, buyAndSell)
  }

  return profits[0]
}

prices = [1, 2, 3, 0, 2]
// Output: 3
// Explanation: transactions = [buy, sell, cooldown, buy, sell]

// Input: prices = [1]
// Output: 0

console.log(maxProfit_DP_stateMachine(prices))
console.log(maxProfit_DP_reverseOrder(prices))
