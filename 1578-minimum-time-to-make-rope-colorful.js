/** Alice has n balloons arranged on a rope. You are given a 0-indexed string
 * colors where colors[i] is the color of the ith balloon.
 *
 * Alice wants the rope to be colorful. She does not want two consecutive
 * balloons to be of the same color, so she asks Bob for help. Bob can remove
 * some balloons from the rope to make it colorful. You are given a 0-indexed
 * integer array neededTime where neededTime[i] is the time (in seconds) that
 * Bob needs to remove the ith balloon from the rope.
 *
 * Return the minimum time Bob needs to make the rope colorful.
 *
 * Constraints:
 *    n == colors.length == neededTime.length
 *    1 <= n <= 10^5
 *    1 <= neededTime[i] <= 10^4
 *    colors contains only lowercase English letters.
 * */

/**
 * @param {string} colors
 * @param {number[]} neededTime
 * @return {number}
 */
const minCost_1 = (colors, neededTime) => {
  let totalSum = 0
  let maxTime = neededTime[0]
  let groupSum = maxTime
  let repeated = false
  for (i = 1; i < colors.length; i++) {
    if (colors[i] === colors[i - 1]) {
      maxTime = Math.max(maxTime, neededTime[i])
      groupSum += neededTime[i]
      repeated = true
    } else {
      if (repeated) totalSum += groupSum - maxTime
      groupSum = maxTime = neededTime[i]
      repeated = false
    }
  }
  if (repeated) totalSum += groupSum - maxTime
  return totalSum
}

const minCost = (colors, neededTime) => {
  let totalTime = 0
  let currMaxTime = 0
  for (let i = 0; i < colors.length; i++) {
    if ((i > 0) & (colors[i] != colors[i - 1])) currMaxTime = 0
    totalTime += Math.min(neededTime[i], currMaxTime)
    currMaxTime = Math.max(currMaxTime, neededTime[i])
  }
  return totalTime
}

colors = 'abaac'
neededTime = [1, 2, 3, 4, 5]
// Output: 3
// Explanation: In the above image, 'a' is blue, 'b' is red, and 'c' is green.
// Bob can remove the blue balloon at index 2. This takes 3 seconds.
// There are no longer two consecutive balloons of the same color.
// Total time = 3.

colors = 'abc'
neededTime = [1, 2, 3]
// Output: 0
// Explanation: The rope is already colorful. Bob does not need to remove any
// balloons from the rope.

colors = 'aabaa'
neededTime = [1, 2, 3, 4, 1]
// Output: 2
// Explanation: Bob will remove the ballons at indices 0 and 4. Each ballon takes 1
// second to remove.
// There are no longer two consecutive balloons of the same color.
// Total time = 1 + 1 = 2.

colors = 'bbbaaa'
neededTime = [4, 9, 3, 8, 8, 9]

console.log(minCost(colors, neededTime))
