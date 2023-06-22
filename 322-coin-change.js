/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
// Approach #1 (Brute force) [Time Limit Exceeded]
// const coinChange = (coins, amount) => {
//   const backtrack = (idxCoins, amount) => {
//     if (amount === 0) return 0
//     if (idxCoins < coins.length && amount > 0) {
//       const maxVal = amount / coins[idxCoins]
//       let minCost = Infinity
//       for (let x = 0; x <= maxVal; x++) {
//         if (amount >= x * coins[idxCoins]) {
//           const res = backtrack(idxCoins + 1, amount - x * coins[idxCoins])
//           if (res != -1) minCost = Math.min(minCost, res + x)
//         }
//       }
//       return minCost === Infinity ? -1 : minCost
//     }
//     return -1
//   }

//   return backtrack(0, amount)
// }

// Approach #2 (Dynamic programming - Top down) [Accepted]
// const coinChange = (coins, amount) => {
//   const backtrack = (amount) => {
//     if (amount < 0) return -1
//     if (amount === 0) return 0
//     if (count[amount - 1]) return count[amount - 1]
//     let min = Infinity
//     for (const coin of coins) {
//       const result = backtrack(amount - coin)
//       if (result >= 0 && result < min) min = result + 1
//     }
//     count[amount - 1] = min === Infinity ? -1 : min
//     return count[amount - 1]
//   }

//   if (amount < 1) return 0
//   const count = new Array(amount)
//   return backtrack(amount)
// }

const coinChange = (coins, amount) => {
  const dp = new Array(amount + 1).fill(Infinity)
  dp[0] = 0

  for (let i = 1; i <= amount; i++) {
    for (let coin of coins) {
      if (i - coin < 0) continue
      dp[i] = Math.min(dp[i], dp[i - coin] + 1)
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount]
}

let coins = [1, 2, 5]
let amount = 11
//Output: 3

// let coins = [2]
// let amount = 3
//Output: -1

// let coins = [1]
// let amount = 0
// Output: 0

console.log(coinChange(coins, amount))
