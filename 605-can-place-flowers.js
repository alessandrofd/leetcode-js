/**
 * You have a long flowerbed in which some of the plots are planted, and some
 * are not. However, flowers cannot be planted in adjacent plots.
 *
 * Given an integer array flowerbed containing 0's and 1's, where 0 means empty
 * and 1 means not empty, and an integer n, return if n new flowers can be
 * planted in the flowerbed without violating the no-adjacent-flowers rule.
 *
 * Constraints:
 *    1 <= flowerbed.length <= 2 * 104
 *    flowerbed[i] is 0 or 1.
 *    There are no two adjacent flowers in flowerbed.
 *    0 <= n <= flowerbed.length
 */

/**
 * @param {number[]} flowerbed
 * @param {number} n
 * @return {boolean}
 */
const canPlaceFlowers = (flowerbed, newFlowers) => {
  if (newFlowers <= 0) return true

  const n = flowerbed.length

  for (let i = 0; i < n; i++) {
    if (!flowerbed[i - 1] && !flowerbed[i] && !flowerbed[i + 1]) {
      flowerbed[i] = 1
      newFlowers--
    }
    if (newFlowers === 0) return true
  }

  return false
}

flowerbed = [1, 0, 0, 0, 1]
n = 1
// Output: true

// flowerbed = [1, 0, 0, 0, 1]
// n = 2
// Output: false

// flowerbed = [1, 0, 0, 0, 1, 0, 0]
// n = 2
// Output: true

// flowerbed = [0, 0]
// n = 2
// Output: false

// flowerbed = [0]
// n = 1
// Outpu: true

console.log(canPlaceFlowers(flowerbed, n))
