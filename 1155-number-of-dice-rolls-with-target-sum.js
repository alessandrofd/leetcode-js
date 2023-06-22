// TODO: Fazer o Bottom-Up DP funcionar e entender porque o array não está funcionando

/**
 * You have n dice, and each die has k faces numbered from 1 to k.
 *
 * Given three integers n, k, and target, return the number of possible ways
 * (out of the kn total ways) to roll the dice, so the sum of the face-up
 * numbers equals target. Since the answer may be too large, return it modulo
 * 10^9 + 7.
 *
 * Constraints:
 *    1 <= n, k <= 30
 *    1 <= target <= 1000
 */

/**
 * @param {number} n
 * @param {number} k
 * @param {number} target
 * @return {number}
 */

// Approach 1: Top-Down Dynamic Programming
const numRollsToTarget_1 = (n, k, target) => {
  const MOD = 10 ** 9 + 7
  const memo = new Map()

  const waysToTarget = (index, sum) => {
    if (index === n) return sum === target ? 1 : 0

    const key = `${index}#${sum}`
    if (memo.has(key)) return memo.get(key)

    let ways = 0
    for (let i = 1; i <= Math.min(k, target - sum); i++)
      ways = (ways + waysToTarget(index + 1, sum + i)) % MOD

    memo.set(key, ways)
    return ways
  }
  return waysToTarget(0, 0)
}

// Approach 2: Bottom-Up Dynamic Programming
const numRollsToTarget = (dice, faces, target) => {}

n = 1
k = 6
target = 3
// Output: 1
// Explanation: You throw one die with 6 faces.
// There is only one way to get a sum of 3.

n = 2
k = 6
target = 7
// Output: 6
// Explanation: You throw two dice, each with 6 faces.
// There are 6 ways to get a sum of 7: 1+6, 2+5, 3+4, 4+3, 5+2, 6+1.

n = 30
k = 30
target = 500
// Output: 222616187
// Explanation: The answer must be returned modulo 10^9 + 7.

console.log(numRollsToTarget(n, k, target))
