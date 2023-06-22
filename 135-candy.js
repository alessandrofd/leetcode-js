/**
 * @param {number[]} ratings
 * @return {number}
 */

// Approach 1: Brute Force
const candy_1 = (ratings) => {
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

// Approach 2: Using two arrays
const candy_2 = (ratings) => {
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

// Approach 3: Using one array
const candy_3 = (ratings) => {
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

// Approach 4: Single Pass Approach with Constant Space
const candy = (ratings) => {
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

ratings = [1, 0, 2]
// Output: 5
// Explanation: You can allocate to the first, second and third child with 2, 1, 2 candies respectively.

ratings = [1, 2, 2]
// Output: 4
// Explanation: You can allocate to the first, second and third child with 1, 2, 1 candies respectively.
// The third child gets 1 candy because it satisfies the above two conditions.

console.log(candy(ratings))
