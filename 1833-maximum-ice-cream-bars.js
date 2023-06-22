/**
 * It is a sweltering summer day, and a boy wants to buy some ice cream bars.
 *
 * At the store, there are n ice cream bars. You are given an array costs of
 * length n, where costs[i] is the price of the ith ice cream bar in coins.
 * The boy initially has coins coins to spend, and he wants to buy as many ice
 * cream bars as possible.
 *
 * Return the maximum number of ice cream bars the boy can buy with coins coins.
 *
 * Note: The boy can buy the ice cream bars in any order.
 *
 * Constraints:
 *    costs.length == n
 *    1 <= n <= 10^5
 *    1 <= costs[i] <= 10^5
 *    1 <= coins <= 10^8
 */

/**
 * @param {number[]} costs
 * @param {number} coins
 * @return {number}
 */
// Sort + greedy
const maxIceCream_greedy = (costs, coins) => {
  // const maxIceCream = (costs, coins) => {
  costs.sort((a, b) => a - b)

  let count
  let remainingCoins = coins
  for (
    count = 0;
    count < costs.length && remainingCoins >= costs[count];
    remainingCoins -= costs[count], count++
  );
  return count
}

// Counting Sort
// const maxIceCream_countingSort = (costs, coins) => {
const maxIceCream = (costs, coins) => {
  const maxCost = Math.max(...costs)
  const costsFreq = new Array(maxCost + 1).fill(0)
  costs.forEach((n) => costsFreq[n]++)

  let remainingCoins = coins
  let totalIceCreams = 0
  for (let cost = 1; cost < costsFreq.length; cost++) {
    if (remainingCoins < cost) break
    if (costsFreq[cost] === 0) continue

    iceCreamsAtCost = Math.min((remainingCoins / cost) | 0, costsFreq[cost])
    totalIceCreams += iceCreamsAtCost
    remainingCoins -= iceCreamsAtCost * cost
  }

  return totalIceCreams
}

costs = [1, 3, 2, 4, 1]
coins = 7
Output: 4

// costs = [10, 6, 8, 7, 7, 8]
// coins = 5
// Output: 0

// costs = [1, 6, 3, 1, 2, 5]
// coins = 20
// Output: 6

// costs = [7, 3, 3, 6, 6, 6, 10, 5, 9, 2]
// coins = 56
// Output: 9

console.log(maxIceCream(costs, coins))

const prefixSum = costs
  .sort((a, b) => a - b)
  .map(((sum = 0), (n) => (sum += n)))
console.log(prefixSum)
