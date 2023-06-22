/**
 * A car travels from a starting position to a destination which is target miles
 * east of the starting position.
 *
 * There are gas stations along the way. The gas stations are represented as an
 * array stations where stations[i] = [positioni, fueli] indicates that the ith
 * gas station is positioni miles east of the starting position and has fueli
 * liters of gas.
 *
 * The car starts with an infinite tank of gas, which initially has startFuel
 * liters of fuel in it. It uses one liter of gas per one mile that it drives.
 * When the car reaches a gas station, it may stop and refuel, transferring all
 * the gas from the station into the car.
 *
 * Return the minimum number of refueling stops the car must make in order to
 * reach its destination. If it cannot reach the destination, return -1.
 *
 * Note that if the car reaches a gas station with 0 fuel left, the car can
 * still refuel there. If the car reaches the destination with 0 fuel left, it
 * is still considered to have arrived.
 */

/**
 * @param {number} target
 * @param {number} startFuel
 * @param {number[][]} stations
 * @return {number}
 */
// Approach 1: Dynamic Programming
const minRefuelStops_1 = (target, startFuel, stations) => {
  const dp = new Array(stations.length + 1).fill(0)
  dp[0] = startFuel
  for (let i = 0; i < stations.length; i++)
    for (let t = i; t >= 0; t--)
      if (dp[t] >= stations[i][0])
        dp[t + 1] = Math.max(dp[t + 1], dp[t] + stations[i][1])

  for (let i = 0; i <= stations.length; i++) {
    if (dp[i] >= target) {
      return i
    }
  }

  return -1
}

// Approach 2: Heap
// import { MaxPriorityQueue } from '@datastructures-js/priority-queue'
const minRefuelStops_2 = (target, tank, stations) => {
  stations.push([target, 0])
  const pq = new MaxPriorityQueue()
  let result = 0

  for (const [distance, fuel] of stations) {
    while (tank < distance) {
      if (pq.isEmpty()) return -1
      tank += pq.dequeue().element
      result++
    }
    pq.enqueue(fuel, fuel)
  }

  return result
}

// Top submission
const minRefuelStops = (target, startFuel, stations) => {
  let pq = []
  let ret = 0,
    stationId = 0,
    range = startFuel

  while (range < target) {
    while (stationId < stations.length && stations[stationId][0] <= range) {
      pq.push(stations[stationId++][1])
    }

    if (!pq.length) return -1

    let max = Math.max(...pq)
    range += max
    pq.splice(pq.indexOf(max), 1)
    ret++
  }

  return ret
}

target = 1
startFuel = 1
stations = []
// Output: 0

target = 100
startFuel = 1
stations = [[10, 100]]
// Output: -1

target = 100
startFuel = 10
stations = [
  [10, 60],
  [20, 30],
  [30, 30],
  [60, 40],
]
// Output: 2

console.log(minRefuelStops(target, startFuel, stations))
