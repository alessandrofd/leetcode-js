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
  const n = ratings.length
  const candies = new Array(n).fill(1)

  let changed = true
  while (changed) {
    changed = false
    for (let i = 0; i < n; i++) {
      if (
        i > 0 &&
        ratings[i] > ratings[i - 1] &&
        candies[i] <= candies[i - 1]
      ) {
        candies[i] = candies[i - 1] + 1
        changed = true
      }
      if (
        i < n - 1 &&
        ratings[i] > ratings[i + 1] &&
        candies[i] <= candies[i + 1]
      ) {
        candies[i] = candies[i + 1] + 1
        changed = true
      }
    }
  }

  return candies.reduce((acc, n) => acc + n)
}

/**
 * @param {number[]} ratings
 * @return {number}
 */
const candy_two_arrays = (ratings) => {
  // Using two arrays
  const n = ratings.length
  const left2right = new Array(n).fill(1)
  const right2left = new Array(n).fill(1)

  for (let i = 1; i < n; i++) {
    if (ratings[i] > ratings[i - 1]) {
      left2right[i] = left2right[i - 1] + 1
    }
  }

  for (let i = n - 2; i >= 0; i--) {
    if (ratings[i] > ratings[i + 1]) {
      right2left[i] = right2left[i + 1] + 1
    }
  }

  let sum = 0
  for (let i = 0; i < n; i++) {
    sum += Math.max(left2right[i], right2left[i])
  }
  return sum
}

/**
 * @param {number[]} ratings
 * @return {number}
 */
const candy_single_array = (ratings) => {
  // Using one array
  const n = ratings.length
  const candies = new Array(n).fill(1)

  for (let i = 1; i < n; i++) {
    if (ratings[i] > ratings[i - 1]) {
      candies[i] = candies[i - 1] + 1
    }
  }

  for (let i = n - 2; i >= 0; i--) {
    if (ratings[i] > ratings[i + 1]) {
      candies[i] = Math.max(candies[i], candies[i + 1] + 1)
    }
  }

  return candies.reduce((acc, n) => acc + n)
}

/**
 * @param {number[]} ratings
 * @return {number}
 */
const candy_single_pass = (ratings) => {
  // Single Pass Approach with Constant Space
  const n = ratings.length
  if (n <= 1) return n

  let candies = 1
  let up = 0,
    down = 0,
    peak = 0
  for (let i = 1; i < n; i++) {
    if (ratings[i] > ratings[i - 1]) {
      up += 1
      peak = up
      down = 0
      candies += up + 1
    } else if (ratings[i] < ratings[i - 1]) {
      up = 0
      down += 1
      candies += 1 + down + (peak >= down ? -1 : 0)
    } else {
      up = down = peak = 0
      candies += 1
    }
  }
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
