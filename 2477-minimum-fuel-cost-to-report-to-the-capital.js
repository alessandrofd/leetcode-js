/**
 * There is a tree (i.e., a connected, undirected graph with no cycles)
 * structure country network consisting of n cities numbered from 0 to n - 1 and
 * exactly n - 1 roads. The capital city is city 0. You are given a 2D integer
 * array roads where roads[i] = [ai, bi] denotes that there exists a
 * bidirectional road connecting cities ai and bi.
 *
 * There is a meeting for the representatives of each city. The meeting is in
 * the capital city.
 *
 * There is a car in each city. You are given an integer seats that indicates
 * the number of seats in each car.
 *
 * A representative can use the car in their city to travel or change the car
 * and ride with another representative. The cost of traveling between two
 * cities is one liter of fuel.
 *
 * Return the minimum number of liters of fuel to reach the capital city.
 *
 * Constraints:
 *    1 <= n <= 10^5
 *    roads.length == n - 1
 *    roads[i].length == 2
 *    0 <= ai, bi < n
 *    ai != bi
 *    roads represents a valid tree.
 *    1 <= seats <= 105
 */

/**
 * @param {number[][]} roads
 * @param {number} seats
 * @return {number}
 */
const minimumFuelCost_dfs = (roads, seats) => {
  const n = roads.length

  const adjs = new Array(n + 1).fill().map((_) => [])
  for (const [u, v] of roads) {
    adjs[u].push(v)
    adjs[v].push(u)
  }

  const dfs = (node, parent) => {
    if (node === n) return [1, 1]

    let fuel = 0
    let reps = 1
    for (const child of adjs[node]) {
      if (child !== parent) {
        const [childFuel, childReps] = dfs(child, node)
        fuel += childFuel
        reps += childReps
      }
    }
    const cars = Math.ceil(reps / seats)
    return [fuel + cars, reps]
  }

  const [fuel, reps] = dfs(0)
  const cars = Math.ceil(reps / seats)
  return fuel - cars
}

const minimumFuelCost_bfs = (roads, seats) => {
  const n = roads.length

  const degree = new Array(n + 1).fill(0)

  const adjs = new Array(n + 1).fill().map((_) => [])
  for (const [u, v] of roads) {
    adjs[u].push(v)
    degree[u]++
    adjs[v].push(u)
    degree[v]++
  }

  const reps = new Array(n + 1).fill(1)

  let fuel = 0

  const queue = []
  for (let i = 0; i <= n; i++) if (degree[i] === 1 && i !== 0) queue.push(i)
  queue
  while (queue.length) {
    const node = queue.shift()
    fuel += Math.ceil(reps[node] / seats)
    for (const adj of adjs[node]) {
      degree[adj]--
      reps[adj] += reps[node]
      if (degree[adj] === 1 && adj !== 0) queue.push(adj)
    }
  }

  return fuel
}

roads = [
  [0, 1],
  [0, 2],
  [0, 3],
]
seats = 5
// Output: 3
// Explanation:
// - Representative1 goes directly to the capital with 1 liter of fuel.
// - Representative2 goes directly to the capital with 1 liter of fuel.
// - Representative3 goes directly to the capital with 1 liter of fuel.
// It costs 3 liters of fuel at minimum.
// It can be proven that 3 is the minimum number of liters of fuel needed.

roads = [
  [3, 1],
  [3, 2],
  [1, 0],
  [0, 4],
  [0, 5],
  [4, 6],
]
seats = 2
// Output: 7
// Explanation:
// - Representative2 goes directly to city 3 with 1 liter of fuel.
// - Representative2 and representative3 go together to city 1 with 1 liter of fuel.
// - Representative2 and representative3 go together to the capital with 1 liter of fuel.
// - Representative1 goes directly to the capital with 1 liter of fuel.
// - Representative5 goes directly to the capital with 1 liter of fuel.
// - Representative6 goes directly to city 4 with 1 liter of fuel.
// - Representative4 and representative6 go together to the capital with 1 liter of fuel.
// It costs 7 liters of fuel at minimum.
// It can be proven that 7 is the minimum number of liters of fuel needed.

roads = []
seats = 1
// Output: 0
// Explanation: No representatives need to travel to the capital city.

roads = [
  [0, 1],
  [1, 2],
]
seats = 3
// Output: 2

console.log(minimumFuelCost_dfs(roads, seats))
console.log(minimumFuelCost_bfs(roads, seats))
