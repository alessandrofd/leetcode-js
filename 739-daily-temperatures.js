/**
 * Given an array of integers temperatures represents the daily temperatures,
 * return an array answer such that answer[i] is the number of days you have to
 * wait after the ith day to get a warmer temperature. If there is no future day
 * for which this is possible, keep answer[i] == 0 instead.Given an array of
 * integers temperatures represents the daily temperatures, return an array
 * answer such that answer[i] is the number of days you have to wait after the
 * ith day to get a warmer temperature. If there is no future day for which this
 * is possible, keep answer[i] == 0 instead.
 *
 * Constraints:
 *    1 <= temperatures.length <= 10^5
 *    30 <= temperatures[i] <= 100
 *
 */

/**
 * @param {number[]} temperatures
 * @return {number[]}
 */
// Approach 1: Monotonic Stack
const dailyTemperatures_monotonicStack = (temps) => {
  // const dailyTemperatures = (temps) => {
  const result = Array(temps.length).fill(0)

  const stack = []
  for (let day = 0; day < temps.length; day++) {
    while (stack.length && temps[stack.at(-1)] < temps[day]) {
      const prevDay = stack.pop()
      result[prevDay] = day - prevDay
    }
    stack.push(day)
  }
  return result
}

// Approach 2: Array, Optimized Space - uses result to determine warmer day
// const dailyTemperatures_optimizedSpace = (temps) => {
const dailyTemperatures = (temps) => {
  const result = Array(temps.length).fill(0)
  let hottest = 0

  for (let day = temps.length - 1; day >= 0; day--) {
    if (temps[day] >= hottest) {
      hottest = temps[day]
      continue
    }
    daysAhead = 1
    while (temps[day + daysAhead] <= temps[day])
      daysAhead += result[day + daysAhead]
    result[day] = daysAhead
  }
  return result
}

temperatures = [73, 74, 75, 71, 69, 72, 76, 73]
// Output: [1, 1, 4, 2, 1, 1, 0, 0]

temperatures = [30, 40, 50, 60]
// Output: [1, 1, 1, 0]

temperatures = [30, 60, 90]
// Output: [1, 1, 0]

console.log(dailyTemperatures(temperatures))
