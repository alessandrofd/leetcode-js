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
}

/**
 * @param {number[]} ratings
 * @return {number}
 */
const candy_two_arrays = (ratings) => {
  // Using two arrays
}

/**
 * @param {number[]} ratings
 * @return {number}
 */
const candy_single_array = (ratings) => {
  // Using one array
}

/**
 * @param {number[]} ratings
 * @return {number}
 */
const candy_single_pass = (ratings) => {
  // Single Pass Approach with Constant Space
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
  [[1, 3, 2, 2, 1], 7],
]

for (const func of funcs) {
  for (const [ratings, expected] of data) {
    console.log(func(ratings) === expected)
  }
}
