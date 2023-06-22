/**
 * You are given an integer array prices where prices[i] is the price of a given
 * stock on the ith day, and an integer k.
 *
 * Find the maximum profit you can achieve. You may complete at most k
 * transactions.
 *
 * Note: You may not engage in multiple transactions simultaneously (i.e., you
 * must sell the stock before you buy again).
 *
 * Constraints:
 *    0 <= k <= 100
 *    0 <= prices.length <= 1000
 *    0 <= prices[i] <= 1000
 */

/**
 * @param {number} k
 * @param {number[]} prices
 * @return {number}
 */
// Approach 1: Dynamic Programming
const maxProfit_1 = (k, prices) => {
  const n = prices.length

  if (k <= 0 || n <= 0) return 0

  if (2 * k > n) {
    let result = 0
    for (let i = 1; i < n; i++) result += Math.max(0, prices[i] - prices[i - 1])
    return result
  }

  const dp = new Array(n)
    .fill()
    .map((x) =>
      new Array(k + 1).fill().map((z) => new Array(2).fill(-Infinity))
    )

  dp[0][0][0] = 0
  dp[0][1][1] = -prices[0]

  for (let i = 1; i < n; i++)
    for (let j = 0; j <= k; j++) {
      dp[i][j][0] = Math.max(dp[i - 1][j][0], dp[i - 1][j][1] + prices[i])
      // you can't hold stock without any transaction
      if (j > 0)
        dp[i][j][1] = Math.max(dp[i - 1][j][1], dp[i - 1][j - 1][0] - prices[i])
    }

  let result = 0
  for (let j = 0; j <= k; j++) result = Math.max(result, dp[n - 1][j][0])
  return result
}

// Approach 2: Merging
const maxProfit = (k, prices) => {
  const n = prices.length

  if (n <= 0 || k <= 0) return 0

  // find all consecutively increasing subsequences
  const transactions = []
  let start = 0
  let end = 0
  for (let i = 1; i < n; i++) {
    if (prices[i] >= prices[i - 1]) end = i
    else {
      if (end > start) transactions.push([start, end])
      start = i
    }
  }
  if (end > start) transactions.push([start, end])

  while (transactions.length > k) {
    let deleteIndex = 0
    let minDeleteLoss = Infinity
    for (let i = 0; i < transactions.length; i++) {
      const [start, end] = transactions[i]
      const loss = prices[end] - prices[start]
      if (loss < minDeleteLoss) {
        minDeleteLoss = loss
        deleteIndex = i
      }
    }

    let mergeIndex = 0
    let minMergeLoss = Infinity
    for (let i = 1; i < transactions.length; i++) {
      const [, end] = transactions[i - 1]
      const [start] = transactions[i]
      const loss = prices[end] - prices[start]
      if (loss < minMergeLoss) {
        minMergeLoss = loss
        mergeIndex = i
      }
    }

    // delete or merge
    if (minDeleteLoss <= minMergeLoss) {
      transactions.splice(deleteIndex, 1)
    } else {
      transactions[mergeIndex - 1][1] = transactions[mergeIndex][1]
      transactions.splice(mergeIndex, 1)
    }
  }

  let result = 0
  for ([start, end] of transactions) result += prices[end] - prices[start]

  return result
}

k = 2
prices = [2, 4, 1]
// Output: 2

k = 2
prices = [3, 2, 6, 5, 0, 3]
// Output: 7

console.log(maxProfit(k, prices))
