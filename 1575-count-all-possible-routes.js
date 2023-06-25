/**
 * You are given an array of distinct positive integers locations where
 * locations[i] represents the position of city i. You are also given integers
 * start, finish and fuel representing the starting city, ending city, and the
 * initial amount of fuel you have, respectively.
 *
 * At each step, if you are at city i, you can pick any city j such that j != i
 * and 0 <= j < locations.length and move to city j. Moving from city i to
 * city j reduces the amount of fuel you have by |locations[i] - locations[j]|.
 * Please notice that |x| denotes the absolute value of x.
 *
 * Notice that fuel cannot become negative at any point in time, and that you
 * are allowed to visit any city more than once (including start and finish).
 *
 * Return the count of all possible routes from start to finish.
 * Since the answer may be too large, return it modulo 10^9 + 7.
 *
 * Constraints:
 *    2 <= locations.length <= 100
 *    1 <= locations[i] <= 10^9
 *    All integers in locations are distinct.
 *    0 <= start, finish < locations.length
 *    1 <= fuel <= 200
 */

// TLE
/**
 * @param {number[]} locations
 * @param {number} start
 * @param {number} finish
 * @param {number} fuel
 * @return {number}
 */
var countRoutes_DP_TopDown = function (locations, start, finish, fuel) {
  const n = locations.length
  const dp = new Array(n).fill().map((_) => new Array(fuel))

  const travel = (city, fuelLeft) => {
    if (fuelLeft < 0) return 0
    if (dp[city][fuelLeft]) return dp[city][fuelLeft]

    let routes = 0
    if (city === finish) routes += 1

    for (let i = 0; i < n; i++) {
      if (i !== city) {
        const fuelCost = Math.abs(locations[i] - locations[city])
        routes = (routes + travel(i, fuelLeft - fuelCost)) % (1e9 + 7)
      }
    }
    return (dp[city][fuelLeft] = routes)
  }

  return travel(start, fuel)
}

/**
 * @param {number[]} locations
 * @param {number} start
 * @param {number} finish
 * @param {number} fuel
 * @return {number}
 */
var countRoutes_DP_BottomUp = function (locations, start, finish, fuel) {
  const n = locations.length
  const dp = new Array(n).fill().map((_) => new Array(fuel + 1).fill(0))
  dp[finish] = new Array(fuel + 1).fill(1)

  for (let fuelLeft = 0; fuelLeft <= fuel; fuelLeft++) {
    for (let origin = 0; origin < n; origin++) {
      for (let destination = 0; destination < n; destination++) {
        if (origin === destination) continue

        const fuelCost = Math.abs(locations[destination] - locations[origin])
        if (fuelCost > fuelLeft) continue

        dp[origin][fuelLeft] =
          (dp[origin][fuelLeft] + dp[destination][fuelLeft - fuelCost]) %
          (1e9 + 7)
      }
    }
  }

  return dp[start][fuel]
}

// TLE - mesmo otimizada a recusão estoura o tempo no JS
/**
 * @param {number[]} locations
 * @param {number} start
 * @param {number} finish
 * @param {number} fuel
 * @return {number}
 */
const countRoutes_DP_TopDown_Optimized = function (
  locations,
  start,
  finish,
  fuel
) {
  const n = locations.length

  const fuelCosts = new Array(n).fill().map((_) => [])
  for (let city = 0; city < n; city++) {
    for (let nextCity = city + 1; nextCity < n; nextCity++) {
      const fuelCost = Math.abs(locations[nextCity] - locations[city])
      if (fuelCost > fuel) continue
      fuelCosts[city].push([fuelCost, nextCity])
      fuelCosts[nextCity].push([fuelCost, city])
    }
  }
  for (const fuelCostsCity of fuelCosts) fuelCostsCity.sort(([a], [b]) => a - b)

  const dp = new Array(n).fill().map((_) => [])

  const travel = (city, fuelLeft) => {
    if (dp[city][fuelLeft]) return dp[city][fuelLeft]

    let routes = city === finish ? 1 : 0
    for (const [fuelCost, nextCity] of fuelCosts[city]) {
      if (fuelCost > fuelLeft) break
      routes = (routes + travel(nextCity, fuelLeft - fuelCost)) % 1_000_000_007
    }

    return (dp[city][fuelLeft] = routes)
  }

  return travel(start, fuel)
}

locations = [2, 3, 6, 8, 4]
start = 1
finish = 3
fuel = 5
// Expected: 4

// locations = [4, 3, 1]
// start = 1
// finish = 0
// fuel = 6
// Expected: 5

// locations = [5, 2, 1]
// start = 0
// finish = 2
// fuel = 3
// Expected: 0

// locations = [2, 1, 5]
// start = 0
// finish = 0
// fuel = 3
// Expected: 2

console.log(countRoutes_DP_TopDown(locations, start, finish, fuel))
console.log(countRoutes_DP_BottomUp(locations, start, finish, fuel))
console.log(countRoutes_DP_TopDown_Optimized(locations, start, finish, fuel))

map = new Map()
console.log(map.get(0))
