/**
 * You are playing a game that has n levels numbered from 0 to n - 1. You are
 * given a 0-indexed integer array damage where damage[i] is the amount of
 * health you will lose to complete the ith level.
 *
 * You are also given an integer armor. You may use your armor ability at most
 * once during the game on any level which will protect you from at most armor
 * damage.
 *
 * You must complete the levels in order and your health must be greater than 0
 * at all times to beat the game.
 *
 * Return the minimum health you need to start with to beat the game.
 *
 * Constraints:
 *    n == damage.length
 *    1 <= n <= 10^5
 *    0 <= damage[i] <= 10^5
 *    0 <= armor <= 10^5
 */

/**
 * @param {number[]} damage
 * @param {number} armor
 * @return {number}
 */
const minimumHealth = (damages, armor) => {
  let max = 0
  let total = 0
  for (const damage of damages) {
    total += damage
    max = Math.max(max, damage)
  }

  return total - Math.min(armor, max) + 1
}

damage = [2, 7, 4, 3]
armor = 4
// Output: 13

// damage = [2, 5, 3, 4]
// armor = 7
// Output: 10

// damage = [3, 3, 3]
// armor = 0
// Output: 10

console.log(minimumHealth(damage, armor))
