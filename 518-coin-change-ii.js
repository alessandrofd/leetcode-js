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
const change_topDown_DP = (amount, coins) => {
  if (amount == 0) return 1

  const n = coins.length
  const dp = new Array(amount + 1).fill().map((_) => new Array(n).fill(-1))

  const dfs = (partial, index) => {
    if (partial === 0) return 1
    if (index === n) return 0
    if (dp[partial][index] >= 0) return dp[partial][index]

    if (coins[index] > partial) dp[partial][index] = dfs(partial, index + 1)
    else
      dp[partial][index] =
        dfs(partial - coins[index], index) + dfs(partial, index + 1)

    return dp[partial][index]
  }

  return dfs(amount, 0)
}

/**
 * @param {number} amount
 * @param {number[]} coins
 * @return {number}
 */
const change_bottomUp_DP = (amount, coins) => {
  if (amount == 0) return 1

  const n = coins.length
  const dp = new Array(amount + 1).fill().map((_) => new Array(n + 1).fill(0))
  dp[0] = new Array(n + 1).fill(1)

  for (let partial = 1; partial <= amount; partial++) {
    for (let coinIndex = 1; coinIndex <= n; coinIndex++) {
      const coin = coins[coinIndex - 1]
      if (coin > partial) {
        dp[partial][coinIndex] = dp[partial][coinIndex - 1]
      } else {
        dp[partial][coinIndex] =
          dp[partial - coin][coinIndex] + dp[partial][coinIndex - 1]
      }
    }
  }

  return dp[amount][n]
}

/**
 * @param {number} amount
 * @param {number[]} coins
 * @return {number}
 */
const change_bottomUp_DP_spaceOptimized = (amount, coins) => {
  if (amount == 0) return 1

  const n = coins.length
  let dp = new Array(amount + 1).fill(0)
  dp[0] = 1

  for (let coinIndex = 0; coinIndex < n; coinIndex++) {
    let tmp = new Array(amount + 1).fill(0)
    tmp[0] = 1
    for (let partial = 1; partial <= amount; partial++) {
      const coin = coins[coinIndex]
      if (coin > partial) {
        tmp[partial] = dp[partial]
      } else {
        tmp[partial] = tmp[partial - coin] + dp[partial]
      }
    }
    dp = tmp
  }
  return dp[amount]
}

/**
 * @param {number} amount
 * @param {number[]} coins
 * @return {number}
 */
const change_bottomUp_1D_DP = (amount, coins) => {
  if (amount == 0) return 1

  let dp = new Array(amount + 1).fill(0)
  dp[0] = 1

  for (const coin of coins) {
    for (let partial = coin; partial <= amount; partial++) {
      dp[partial] += dp[partial - coin]
    }
  }
  return dp[amount]
}

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
