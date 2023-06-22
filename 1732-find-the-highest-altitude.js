/**
 * There is a biker going on a road trip. The road trip consists of n + 1 points
 * at different altitudes. The biker starts his trip on point 0 with altitude
 * equal 0.
 *
 * You are given an integer array gain of length n where gain[i] is the net gain
 * in altitude between points i​​​​​​ and i + 1 for all (0 <= i < n). Return the
 * highest altitude of a point.
 *
 * Constraints:
 *    n == gain.length
 *    1 <= n <= 100
 *    -100 <= gain[i] <= 100
 */

/**
 * @param {number[]} gain
 * @return {number}
 */
const largestAltitude = (gain) => {
  return Math.max(0, ...gain.map(((sum = 0), (n) => (sum += n))))
}

gain = [-5, 1, 5, 0, -7]
// Expected: 1

gain = [-4, -3, -2, -1, 4, 3, 2]
// Expected: 0

console.log(largestAltitude(gain))
