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
// Approach: Greedy /// decidir calcular um prefixSum e aplicar um binSearch
const maximumBags = (capacity, rocks, additionalRocks) => {
  const sumSpace = Array.from(capacity, (c, i) => c - rocks[i])
    .sort((a, b) => a - b)
    .map(((sum = 0), (n) => (sum += n)))

  let lo = 0
  let hi = sumSpace.length - 1
  while (lo < hi) {
    const mid = ((lo + hi) / 2) | 0
    if (sumSpace[mid] < additionalRocks) lo = mid + 1
    else hi = mid
  }
  return sumSpace[lo] > additionalRocks ? lo : lo + 1
}

capacity = [2, 3, 4, 5]
rocks = [1, 2, 4, 4]
additionalRocks = 2
// Output: 3

// capacity = [10, 2, 2]
// rocks = [2, 2, 0]
// additionalRocks = 100
// Output: 3

console.log(maximumBags(capacity, rocks, additionalRocks))
