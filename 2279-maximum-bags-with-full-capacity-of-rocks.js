/**
 * You have n bags numbered from 0 to n - 1. You are given two 0-indexed integer
 * arrays capacity and rocks. The ith bag can hold a maximum of capacity[i]
 * rocks and currently contains rocks[i] rocks. You are also given an integer
 * additionalRocks, the number of additional rocks you can place in any of the
 * bags.
 *
 * Return the maximum number of bags that could have full capacity after placing
 * the additional rocks in some bags.
 *
 * Constraints:
 *    n == capacity.length == rocks.length
 *    1 <= n <= 5 * 10^4
 *    1 <= capacity[i] <= 10^9
 *    0 <= rocks[i] <= capacity[i]
 *    1 <= additionalRocks <= 10^9
 */

/**
 * @param {number[]} capacity
 * @param {number[]} rocks
 * @param {number} additionalRocks
 * @return {number}
 */
// Approach: Greedy
const maximumBags = (capacity, rocks, additionalRocks) => {
  const space = new Array(capacity.length)
    .fill()
    .map((_, i) => capacity[i] - rocks[i])
    .sort((a, b) => a - b)

  let full = 0
  for (let i = 0; i < space.length; i++) {
    if (additionalRocks >= space[i]) {
      full++
      additionalRocks -= space[i]
    } else break
  }

  return full
}

capacity = [2, 3, 4, 5]
rocks = [1, 2, 4, 4]
additionalRocks = 2
// Output: 3

capacity = [10, 2, 2]
rocks = [2, 2, 0]
additionalRocks = 100
// Output: 3

console.log(maximumBags(capacity, rocks, additionalRocks))
