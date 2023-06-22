/**
 * Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water
 * it can trap after raining.
 *
 * Constraints:
 *    n == height.length
 *    1 <= n <= 2 * 10^4
 *    0 <= height[i] <= 10^5
 */

/**
 * @param {number[]} height
 * @return {number}
 */

// Approach 2: Dynamic Programming
const trap_2 = (height) => {
  const n = height.length

  const left = new Array(n)
  left[0] = height[0]
  for (let i = 1; i < n; i++) left[i] = Math.max(left[i - 1], height[i])

  const right = new Array(n)
  right[n - 1] = height[n - 1]
  for (let i = n - 2; i >= 0; i--) right[i] = Math.max(right[i + 1], height[i])

  let result = 0
  for (let i = 1; i < n - 1; i++)
    result += Math.min(left[i], right[i]) - height[i]

  return result
}

// Approach 3: Using stacks
const trap_3 = (height) => {
  let result = 0
  let current = 0
  const stack = []
  while (current < height.length) {
    while (
      stack.length > 0 &&
      height[current] > height[stack[stack.length - 1]]
    ) {
      const last = stack.pop()
      if (stack.length === 0) continue
      const distance = current - stack[stack.length - 1] - 1
      const boundedHeight =
        Math.min(height[current], height[stack[stack.length - 1]]) -
        height[last]
      result += boundedHeight * distance
    }
    stack.push(current++)
  }
  return result
}

// Approach 4: Using 2 pointers
const trap = (heights) => {
  let result = 0
  let left = 0
  let right = heights.length - 1
  let leftMaxHeight = 0
  let rightMaxHeight = 0

  while (left < right) {
    if (heights[left] < heights[right]) {
      if (heights[left] >= leftMaxHeight) leftMaxHeight = heights[left]
      else result += leftMaxHeight - heights[left]
      left++
    } else {
      if (heights[right] >= rightMaxHeight) rightMaxHeight = heights[right]
      else result += rightMaxHeight - heights[right]
      right--
    }
  }

  return result
}

height = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]
// Output: 6

// height = [4, 2, 0, 3, 2, 5]
// Output: 9

console.log(trap(height))
