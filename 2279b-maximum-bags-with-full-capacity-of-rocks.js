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
  const availableSpace = capacity
    .map((space, i) => space - rocks[i])
    .sort((a, b) => a - b)

  let nextBag = availableSpace.indexOf(0) + 1

  while (additionalRocks > 0 && nextBag < availableSpace.length)
    if (additionalRocks >= availableSpace[nextBag])
      additionalRocks -= availableSpace[nextBag++]
    else break

  return nextBag
}

capacity = [2, 3, 4, 5]
rocks = [1, 2, 4, 4]
additionalRocks = 2
// Output: 3

capacity = [10, 2, 2]
rocks = [2, 2, 0]
additionalRocks = 100
// Output: 3

capacity = [91, 54, 63, 99, 24, 45, 78]
rocks = [35, 32, 45, 98, 6, 1, 25]
additionalRocks = 17

console.log(maximumBags(capacity, rocks, additionalRocks))
