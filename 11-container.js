/**
 * @param {number[]} height
 * @return {number}
 */
const maxArea1 = (height) => {
  // timeout
  let max = 0
  for (let i = 0; i < height.length - 1; i++)
    for (let j = i + 1; j < height.length; j++)
      max = Math.max(max, Math.min(height[i], height[j]) * (j - i))

  return max
}

const maxArea2 = (height) => {
  let maxArea = 0,
    maxStart = 0
  for (let i = 0; i < height.length - 1; i++) {
    if (height[i] < maxStart) continue
    maxStart = height[i]
    for (let j = i + 1; j < height.length; j++)
      maxArea = Math.max(maxArea, Math.min(height[i], height[j]) * (j - i))
  }

  return maxArea
}

const maxArea = (height) => {
  let start = 0,
    end = height.length - 1,
    maxArea = 0

  while (start < end) {
    maxArea = Math.max(
      maxArea,
      Math.min(height[start], height[end]) * (end - start)
    )
    height[start] > height[end] ? end-- : start++
  }

  return maxArea
}

// console.log(maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7]))
// console.log(maxArea([1, 1]))
//console.log(maxArea([1, 2, 1]))
console.log(maxArea([1, 8, 6, 2, 5, 4, 8, 25, 7]))
