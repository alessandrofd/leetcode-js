/**
 * A conveyor belt has packages that must be shipped from one port to another
 * within days days.
 *
 * The ith package on the conveyor belt has a weight of weights[i]. Each day,
 * we load the ship with packages on the conveyor belt (in the order given
 * by weights). We may not load more weight than the maximum weight capacity
 * of the ship.
 *
 * Return the least weight capacity of the ship that will result in all the
 * packages on the conveyor belt being shipped within days days.
 *
 * Constraints:
 *    1 <= days <= weights.length <= 5 * 10^4
 *    1 <= weights[i] <= 500
 */

/**
 * @param {number[]} weights
 * @param {number} days
 * @return {number}
 */
// Approach: Binary Search
const shipWithinDays_binSearch = (weights, days) => {
  let totalLoad = 0
  let maxLoad = 0
  for (const weight of weights) {
    totalLoad += weight
    maxLoad = Math.max(maxLoad, weight)
  }

  const feasible = (load) => {
    let daysNeeded = 1
    let currentLoad = 0
    for (const weight of weights) {
      currentLoad += weight
      if (currentLoad > load) {
        daysNeeded++
        currentLoad = weight
      }
    }
    return daysNeeded <= days
  }

  let lo = maxLoad
  let hi = totalLoad
  while (lo < hi) {
    const mid = Math.floor((lo + hi) / 2)
    if (feasible(mid)) {
      hi = mid
    } else {
      lo = mid + 1
    }
  }
  return lo
}

weights = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
days = 5
// Output: 15
// Explanation: A ship capacity of 15 is the minimum to ship all the packages in 5 days like this:
// 1st day: 1, 2, 3, 4, 5
// 2nd day: 6, 7
// 3rd day: 8
// 4th day: 9
// 5th day: 10

// Note that the cargo must be shipped in the order given, so using a ship of
// capacity 14 and splitting the packages into parts like (2, 3, 4, 5),
// (1, 6, 7), (8), (9), (10) is not allowed.

// weights = [3, 2, 2, 4, 1, 4]
// days = 3
// Output: 6
// Explanation: A ship capacity of 6 is the minimum to ship all the packages in 3 days like this:
// 1st day: 3, 2
// 2nd day: 2, 4
// 3rd day: 1, 4

// weights = [1, 2, 3, 1, 1]
// days = 4
// Output: 3
// Explanation:
// 1st day: 1
// 2nd day: 2
// 3rd day: 3
// 4th day: 1, 1

// weights = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
// days = 10
// Output: 10

console.log(shipWithinDays_binSearch(weights, days))
