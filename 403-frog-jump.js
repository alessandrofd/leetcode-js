/**
 * A frog is crossing a river. The river is divided into some number of units,
 * and at each unit, there may or may not exist a stone. The frog can jump on a
 * stone, but it must not jump into the water.
 *
 * Given a list of stones' positions (in units) in sorted ascending order,
 * determine if the frog can cross the river by landing on the last stone.
 * Initially, the frog is on the first stone and assumes the first jump must be
 * 1 unit.
 *
 * If the frog's last jump was k units, its next jump must be either k - 1, k,
 * or k + 1 units. The frog can only jump in the forward direction.
 *
 * Constraints:
 *    2 <= stones.length <= 2000
 *    0 <= stones[i] <= 2^31 - 1
 *    stones[0] == 0
 *    stones is sorted in a strictly increasing order.
 */

/**
 * @param {number[]} stones
 * @return {boolean}
 */
const canCross_DP_bottomUp = (stones) => {
  const n = stones.length

  if (stones[1] !== 1) return false
  if (n === 2) return true

  const map = new Map(stones.map((n, i) => [n, i]))

  const memo = new Array(n).fill().map((_) => [])
  memo[1][1] = true
  let maxJump = 1

  for (let i = 2; i < n; i++) {
    for (let j = 1; j <= maxJump + 1; j++) {
      const previous = stones[i] - j
      if (map.has(previous)) {
        for (let k = Math.max(1, j - 1); k <= Math.min(maxJump, j + 1); k++) {
          if (memo[map.get(previous)][k]) {
            memo[i][j] = true
            maxJump = Math.max(maxJump, j)
          }
        }
      }
    }
  }

  return memo[n - 1].some((b) => b)
}

/**
 * @param {number[]} stones
 * @return {boolean}
 */
const canCross_DP_topDown = (stones) => {
  const n = stones.length

  const binSearch = (start, target) => {
    let lo = start
    let hi = n
    while (lo < hi) {
      const mid = lo + Math.floor((hi - lo) / 2)
      if (stones[mid] < target) lo = mid + 1
      else hi = mid
    }
    return lo
  }

  const memo = new Array(n).fill().map((_) => [])

  const dfs = (i, k) => {
    if (i === n - 1) return true

    if (memo[i][k] !== undefined) return memo[i][k]

    memo[i][k] = false

    for (const delta of [-1, 0, 1]) {
      const step = k + delta
      if (step > 0) {
        const target = stones[i] + step
        const next = binSearch(i + 1, target)
        if (next < n && stones[next] === target) memo[i][k] ||= dfs(next, step)
      }
    }

    return memo[i][k]
  }

  return dfs(0, 0)
}

exports.canCross_DP_bottomUp = canCross_DP_bottomUp
exports.canCross_DP_topDown = canCross_DP_topDown

// prettier-ignore
const funcs = [
  // canCross_DP_topDown, 
  canCross_DP_bottomUp
]

const data = [
  // [[0, 1, 3, 5, 6, 8, 12, 17], true],
  // [[0, 1, 2, 3, 4, 8, 9, 11], false],
  [[0, 1, 2147483647], false],
]

for (const func of funcs) {
  for (const [stones, expected] of data) {
    console.log(func(stones) === expected)
  }
}
