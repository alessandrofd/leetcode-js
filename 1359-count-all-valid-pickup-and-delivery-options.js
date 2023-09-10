/**
 * Given n orders, each order consist in pickup and delivery services.
 *
 * Count all valid pickup/delivery possible sequences such that delivery(i) is
 * always after of pickup(i).
 *
 * Since the answer may be too large, return it modulo 10^9 + 7.
 *
 * Constraints:
 *    1 <= n <= 500
 */

/**
 * Assume we have already n - 1 pairs, now we need to insert the nth pair.
 * To insert the first element, there are n * 2 - 1 choices of position.
 * To insert the second element, there are n * 2 chioces of position。
 * So there are (n * 2 - 1) * n * 2 permutations.
 * Considering that delivery(i) is always after of pickup(i), we need to
 * divide by 2.
 * So it's (n * 2 - 1) * n.
 */

/**
 * @param {number} numOrders
 * @return {number}
 */
const countOrders_bottomUp = (numOrders) => {
  const MOD = 1e9 + 7
  let result = 1
  for (let i = 1; i <= numOrders; i++) {
    result = (result * (i * 2 - 1) * i) % MOD
  }
  return result
}

const countOrders_topDown = (numOrders) => {
  const MOD = 1e9 + 7
  if (numOrders === 0) return 1
  return (
    (countOrders_topDown(numOrders - 1) * (numOrders * 2 - 1) * numOrders) % MOD
  )
}

// prettier-ignore
const funcs = [
  countOrders_bottomUp,
  countOrders_topDown,
]

const data = [
  [1, 1],
  [2, 6],
  [3, 90],
  [7, 681080400],
]

for (const func of funcs) {
  for (const [numOrders, expected] of data) {
    console.log(func(numOrders) === expected)
  }
}
