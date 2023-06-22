/**
 * You have n flower seeds. Every seed must be planted first before it can begin
 * to grow, then bloom. Planting a seed takes time and so does the growth of a
 * seed. You are given two 0-indexed integer arrays plantTime and growTime, of
 * length n each:
 *
 *    plantTime[i] is the number of full days it takes you to plant the ith
 *    seed. Every day, you can work on planting exactly one seed. You do not
 *    have to work on planting the same seed on consecutive days, but the
 *    planting of a seed is not complete until you have worked plantTime[i] days
 *    on planting it in total.
 *
 *    growTime[i] is the number of full days it takes the ith seed to grow after
 *    being completely planted. After the last day of its growth, the flower
 *    blooms and stays bloomed forever.
 *
 *    From the beginning of day 0, you can plant the seeds in any order.
 *
 * Return the earliest possible day where all seeds are blooming.
 *
 * Constraints:
 *    n == plantTime.length == growTime.length
 *    1 <= n <= 10^5
 *    1 <= plantTime[i], growTime[i] <= 10^4
 */

/**
 * @param {number[]} plantTime
 * @param {number[]} growTime
 * @return {number}
 */
const earliestFullBloom_1 = (plantTime, growTime) => {
  const array = []
  for (let i = 0; i < plantTime.length; i++)
    array.push([plantTime[i], growTime[i]])

  array.sort(([, a], [, b]) => b - a)

  let sumPlantTime = 0
  let fullBloom = 0
  for (let i = 0; i < array.length; i++) {
    sumPlantTime += array[i][0]
    fullBloom = Math.max(fullBloom, sumPlantTime + array[i][1])
  }
  return fullBloom
}

const earliestFullBloom = (plantTime, growTime) => {
  const array = [...Array(plantTime.length).keys()]
  array.sort((a, b) => growTime[b] - growTime[a])

  let sumPlantTime = 0
  let fullBloom = 0
  for (let i = 0; i < array.length; i++) {
    sumPlantTime += plantTime[array[i]]
    fullBloom = Math.max(fullBloom, sumPlantTime + growTime[array[i]])
  }
  return fullBloom
}

plantTime = [1, 4, 3]
growTime = [2, 3, 1]
// Output: 9

// plantTime = [1, 2, 3, 2]
// growTime = [2, 1, 2, 1]
// Output: 9

// plantTime = [1]
// growTime = [1]
// Output: 2

console.log(earliestFullBloom(plantTime, growTime))
