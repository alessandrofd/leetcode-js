/**
 * Given a wooden stick of length n units. The stick is labelled from 0 to n.
 * For example, a stick of length 6 is labelled as follows:
 *
 * Given an integer array cuts where cuts[i] denotes a position you should
 * perform a cut at.
 *
 * You should perform the cuts in order, you can change the order of the cuts as
 * you wish.
 *
 * The cost of one cut is the length of the stick to be cut, the total cost is
 * the sum of costs of all cuts. When you cut a stick, it will be split into two
 * smaller sticks (i.e. the sum of their lengths is the length of the stick
 * before the cut). Please refer to the first example for a better explanation.
 *
 * Return the minimum total cost of the cuts.
 *
 * Constraints:
 *    2 <= n <= 10^6
 *    1 <= cuts.length <= min(n - 1, 100)
 *    1 <= cuts[i] <= n - 1
 *    All the integers in cuts array are distinct.
 */

// dp[i][j] = min(dp[i][k] + dp[k][j]) + (j - i)

// Recursão estourou a pilha.

/**
 * @param {number} n
 * @param {number[]} cuts
 * @return {number}
 */
const minCost_recursion = (n, cuts) => {
  const memo = new Array(n + 1).fill().map((_) => new Array(n + 1))

  const f = (i, j) => {
    if (j - i <= 1) return 0
    if (memo[i][j]) return memo[i][j]

    let cost = 1e8
    for (const cut of cuts) {
      if (cut > i && cut < j) {
        cost = Math.min(cost, f(i, cut) + f(cut, j))
      }
    }
    return (memo[i][j] = cost == 1e8 ? 0 : cost + (j - i))
  }

  return f(0, n)
}

// Ao invés de considerarmos cada fragmento individual, nós os agrupamos pelos
// cortes, já que fragmentos sem cortes são inócuos para a resolução do problema

/**
 * @param {number} n
 * @param {number[]} cuts
 * @return {number}
 */
const minCost_recursion_optimized = (n, cuts) => {
  const frags = [0, ...cuts, n].sort((a, b) => a - b)
  const m = frags.length

  const memo = new Array(m + 1).fill().map((_) => new Array(m + 1))

  const f = (left, right) => {
    if (right - left <= 1) return 0
    if (memo[left][right]) return memo[left][right]

    let cost = 1e8
    for (let cut = left + 1; cut < right; cut++) {
      cost = Math.min(cost, f(left, cut) + f(cut, right))
    }

    return (memo[left][right] =
      cost == 1e8 ? 0 : cost + (frags[right] - frags[left]))
  }

  return f(0, m - 1)
}

/**
 * @param {number} n
 * @param {number[]} cuts
 * @return {number}
 */
const minCost_dp = (n, cuts) => {
  const dp = new Array(n + 1).fill().map((_) => new Array(n + 1).fill(0))

  for (let diff = 2; diff <= n; diff++) {
    for (let i = 0; i <= n - diff; i++) {
      const j = i + diff
      let cost = 1e8
      for (const cut of cuts) {
        if (cut > i && cut < j) {
          cost = Math.min(cost, dp[i][cut] + dp[cut][j])
        }
      }
      dp[i][j] = cost == 1e8 ? 0 : cost + (j - i)
    }
  }

  return dp[0][n]
}

// Ao invés de considerarmos cada fragmento individual, nós os agrupamos pelos
// cortes, já que fragmentos sem cortes são inócuos para a resolução do problema

/**
 * @param {number} n
 * @param {number[]} cuts
 * @return {number}
 */
const minCost_dp_optimized = (n, cuts) => {
  const frags = [0, ...cuts, n].sort((a, b) => a - b)
  const m = frags.length

  const dp = new Array(m).fill().map((_) => new Array(m).fill(0))

  for (let diff = 2; diff < m; diff++) {
    for (let i = 0; i < m - diff; i++) {
      const j = i + diff
      let cost = 1e8
      for (let cut = i + 1; cut < j; cut++) {
        cost = Math.min(cost, dp[i][cut] + dp[cut][j])
      }
      dp[i][j] = cost == 1e8 ? 0 : cost + (frags[j] - frags[i])
    }
  }

  return dp[0][m - 1]
}

n = 7
cuts = [1, 3, 4, 5]
// Expected: 16

n = 9
cuts = [5, 6, 1, 4, 2]
// Expected: 22

n = 3829
cuts = [
  3689, 2882, 1725, 1655, 1495, 2988, 1993, 1550, 2575, 1510, 1370, 2558, 1890,
  3580, 434, 3589, 601, 396, 3745, 2961, 229, 2275, 3559, 952, 2677, 682,
]

console.log(minCost_recursion_optimized(n, cuts))
console.log(minCost_dp_optimized(n, cuts))
