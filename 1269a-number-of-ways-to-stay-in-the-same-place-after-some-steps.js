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
  /**
   * If we want to use a 2D array to implement memo, we must be careful with the
   * sizing. Notice in the constraints that while steps can be up to 500, arrLen
   * can be up to 10^6. However, it is impossible for any call to have a value of
   * curr greater than steps. The furthest we can go is by only making moves to
   * the right, but we would run out of moves after steps moves. Thus, we can
   * safely perform arrLen = min(arrLen, steps) before starting the algorithm.
   */
}

/**
 * @param {number} steps
 * @param {number} arrLen
 * @return {number}
 */
const numWays_dp_bottom_up = (steps, arrLen) => {}

/**
 * @param {number} steps
 * @param {number} arrLen
 * @return {number}
 */
const numWays_dp_bottom_up_space_optimized = (steps, arrLen) => {}

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
