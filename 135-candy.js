/**
 * There are n children standing in a line. Each child is assigned a rating
 * value given in the integer array ratings.
 *
 * You are giving candies to these children subjected to the following
 * requirements:
 *
 *    Each child must have at least one candy.
 *
 *    Children with a higher rating get more candies than their neighbors.
 *
 * Return the minimum number of candies you need to have to distribute the
 * candies to the children.
 *
 * Constraints:
 *    n == ratings.length
 *    1 <= n <= 2 * 10^4
 *    0 <= ratings[i] <= 2 * 10^4
 */

/**
 * @param {number[]} ratings
 * @return {number}
 */
const candy_brute_force = (ratings) => {
  // Brute Force

  candies = Array(ratings.length).fill(1)
  hasChanged = true
  while (hasChanged) {
    hasChanged = false
    for (i = 0; i < ratings.length; i++) {
      if (
        i != ratings.length - 1 &&
        ratings[i] > ratings[i + 1] &&
        candies[i] <= candies[i + 1]
      ) {
        candies[i] = candies[i + 1] + 1
        hasChanged = true
      }
      if (
        i > 0 &&
        ratings[i] > ratings[i - 1] &&
        candies[i] <= candies[i - 1]
      ) {
        candies[i] = candies[i - 1] + 1
        hasChanged = true
      }
    }
  }
  return candies.reduce((acc, nxt) => acc + nxt)
}

/**
 * @param {number[]} ratings
 * @return {number}
 */
const candy_two_arrays = (ratings) => {
  // Using two arrays

  left2right = Array(ratings.length).fill(1)
  right2left = Array(ratings.length).fill(1)
  for (i = 1; i < ratings.length; i++)
    if (ratings[i] > ratings[i - 1]) left2right[i] = left2right[i - 1] + 1
  for (i = ratings.length - 2; i >= 0; i--)
    if (ratings[i] > ratings[i + 1]) right2left[i] = right2left[i + 1] + 1

  sum = 0
  for (i = 0; i < ratings.length; i++)
    sum += Math.max(left2right[i], right2left[i])

  return sum
}

/**
 * @param {number[]} ratings
 * @return {number}
 */
const candy_single_array = (ratings) => {
  // Approach 3: Using one array

  candies = Array(ratings.length).fill(1)

  for (i = 1; i < ratings.length; i++)
    if (ratings[i] > ratings[i - 1]) candies[i] = candies[i - 1] + 1

  sum = candies[ratings.length - 1]

  for (i = ratings.length - 2; i >= 0; i--) {
    if (ratings[i] > ratings[i + 1])
      candies[i] = Math.max(candies[i], candies[i + 1] + 1)
    sum += candies[i]
  }

  return sum
}

/**
 * @param {number[]} ratings
 * @return {number}
 */
const candy_single_pass = (ratings) => {
  // Single Pass Approach with Constant Space

  const count = (n) => (n * (n + 1)) / 2

  if (ratings.length <= 1) return ratings.length
  candies = 0
  up = 0
  down = 0
  oldSlope = 0
  for (i = 1; i < ratings.length; i++) {
    newSlope =
      ratings[i] > ratings[i - 1] ? 1 : ratings[i] < ratings[i - 1] ? -1 : 0
    if ((oldSlope > 0 && newSlope == 0) || (oldSlope < 0 && newSlope >= 0)) {
      candies += count(up) + count(down) + Math.max(up, down)
      up = 0
      down = 0
    }

    if (newSlope > 0) up++
    else if (newSlope < 0) down++
    else candies++

    oldSlope = newSlope
  }
  candies += count(up) + count(down) + Math.max(up, down) + 1
  return candies
}

const funcs = [
  candy_brute_force,
  candy_two_arrays,
  candy_single_array,
  candy_single_pass,
]

const data = [
  [[1, 0, 2], 5],
  [[1, 2, 2], 4],
]

for (const func of funcs) {
  for (const [ratings, expected] of data) {
    console.log(func(ratings) === expected)
  }
}
