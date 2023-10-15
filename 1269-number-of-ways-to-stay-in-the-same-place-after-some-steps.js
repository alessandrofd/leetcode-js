/**
 * You have a pointer at index 0 in an array of size arrLen. At each step, you
 * can move 1 position to the left, 1 position to the right in the array, or
 * stay in the same place (The pointer should not be placed outside the array at
 * any time).
 *
 * Given two integers steps and arrLen, return the number of ways such that your
 * pointer is still at index 0 after exactly steps steps. Since the answer may
 * be too large, return it modulo 10^9 + 7.
 *
 * Constraints:
 *    1 <= steps <= 500
 *    1 <= arrLen <= 10^6
 */

/**
 * @param {number} steps
 * @param {number} arrLen
 * @return {number}
 */
const numWays_dp_top_down = (steps, arrLen) => {
  const MOD = 1e9 + 7

  /**
   * If we want to use a 2D array to implement memo, we must be careful with the
   * sizing. Notice in the constraints that while steps can be up to 500, arrLen
   * can be up to 10^6. However, it is impossible for any call to have a value of
   * curr greater than steps. The furthest we can go is by only making moves to
   * the right, but we would run out of moves after steps moves. Thus, we can
   * safely perform arrLen = min(arrLen, steps) before starting the algorithm.
   */

  arrLen = Math.min(arrLen, steps)
  const memo = new Array(arrLen).fill().map((_) => new Array(steps + 1))

  const dp = (i, remain) => {
    if (remain === 0) {
      if (i === 0) return 1
      return 0
    }

    if (memo[i][remain]) return memo[i][remain]

    const left = i === 0 ? 0 : dp(i - 1, remain - 1)
    const right = i === arrLen - 1 ? 0 : dp(i + 1, remain - 1)
    const stay = dp(i, remain - 1)

    memo[i][remain] = (left + right + stay) % MOD

    return memo[i][remain]
  }

  return dp(0, steps)
}

/**
 * @param {number} steps
 * @param {number} arrLen
 * @return {number}
 */
const numWays_dp_bottom_up = (steps, arrLen) => {
  const MOD = 1e9 + 7

  arrLen = Math.min(arrLen, steps)
  const dp = new Array(arrLen).fill().map((_) => new Array(steps + 1).fill(0))
  dp[0][0] = 1

  for (let remain = 1; remain <= steps; remain++) {
    for (let i = 0; i < arrLen; i++) {
      const left = i === 0 ? 0 : dp[i - 1][remain - 1]
      const right = i === arrLen - 1 ? 0 : dp[i + 1][remain - 1]
      const stay = dp[i][remain - 1]

      dp[i][remain] = (left + right + stay) % MOD
    }
  }

  return dp[0][steps]
}

/**
 * @param {number} steps
 * @param {number} arrLen
 * @return {number}
 */
const numWays_dp_bottom_up_space_optimized = (steps, arrLen) => {
  const MOD = 1e9 + 7

  arrLen = Math.min(arrLen, steps)
  let prevDp = new Array(arrLen).fill(0)
  prevDp[0] = 1

  for (let remain = 1; remain <= steps; remain++) {
    const dp = new Array(arrLen)
    for (let i = 0; i < arrLen; i++) {
      const left = i === 0 ? 0 : prevDp[i - 1]
      const right = i === arrLen - 1 ? 0 : prevDp[i + 1]
      const stay = prevDp[i]

      dp[i] = (left + right + stay) % MOD
    }
    prevDp = dp
  }

  return prevDp[0]
}

// prettier-ignore
const funcs = [
  numWays_dp_top_down,
  numWays_dp_bottom_up,
  numWays_dp_bottom_up_space_optimized,
]

const data = [
  [3, 2, 4],
  [2, 4, 2],
  [4, 2, 8],
]

for (const func of funcs) {
  for (const [steps, arrLen, expected] of data) {
    console.log(func(steps, arrLen) === expected)
  }
}
