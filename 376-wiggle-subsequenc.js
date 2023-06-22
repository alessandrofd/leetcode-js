/**
 * @param {number[]} nums
 * @return {number}
 */
// Approach #1 Brute Force --- wrong answer
const wiggleMaxLength_1 = (nums) => {
  const calculate = (index, isUp) => {
    count = 0
    for (i = index + 1; i < nums.length; i++)
      if ((isUp && nums[i] > nums[index]) || (!isUp && nums[i] < nums[index]))
        count = Math.max(count, 1 + calculate(i, !isUp))
    return count
  }

  if (nums.length < 2) return nums.length
  return 1 + Math.max(calculate(0, true), calculate(0, false))
}

// Approach #2 Dynamic Programming
const wiggleMaxLength_2 = (nums) => {
  if (nums.length < 2) return nums.length

  up = new Array(nums.length).fill(0)
  down = new Array(nums.length).fill(0)
  for (i = 1; i < nums.length; i++)
    for (j = 0; j < i; j++)
      if (nums[i] > nums[j]) up[i] = Math.max(up[i], down[j] + 1)
      else if (nums[i] < nums[j]) down[i] = Math.max(down[i], up[j] + 1)

  return 1 + Math.max(down[nums.length - 1], up[nums.length - 1])
}

// Approach #3 Linear Dynamic Programming
const wiggleMaxLength_3 = (nums) => {
  if (nums.length < 2) return nums.length

  up = new Array(nums.length).fill(0)
  down = new Array(nums.length).fill(0)
  up[0] = down[0] = 1
  for (i = 1; i < nums.length; i++)
    if (nums[i] > nums[i - 1]) {
      up[i] = down[i - 1] + 1
      down[i] = down[i - 1]
    } else if (nums[i] < nums[i - 1]) {
      down[i] = up[i - 1] + 1
      up[i] = up[i - 1]
    } else {
      up[i] = up[i - 1]
      down[i] = down[i - 1]
    }

  return Math.max(down[nums.length - 1], up[nums.length - 1])
}

// Approach #4 Space-Optimized Dynamic Programming
const wiggleMaxLength_4 = (nums) => {
  if (nums.length < 2) return nums.length

  up = down = 1
  for (i = 1; i < nums.length; i++)
    if (nums[i] > nums[i - 1]) up = down + 1
    else if (nums[i] < nums[i - 1]) down = up + 1

  return Math.max(up, down)
}

// Approach #5 Greedy Approach
const wiggleMaxLength_6 = (nums) => {
  if (nums.length < 2) return nums.length

  prevDiff = nums[1] - nums[0]
  count = prevDiff ? 2 : 1

  for (i = 2; i < nums.length; i++) {
    diff = nums[i] - nums[i - 1]
    if ((diff > 0 && prevDiff <= 0) || (diff < 0 && prevDiff >= 0)) {
      count++
      prevDiff = diff
    }
  }
  return count
}

// Discuss - sgallivan
const wiggleMaxLength_d = (nums) => {
  i = 1
  while (nums[i] === nums[i - 1]) i++
  up = nums[i] < nums[i - 1]
  count = 1
  for (; i < nums.length; i++)
    if ((up && nums[i] < nums[i - 1]) || (!up && nums[i] > nums[i - 1])) {
      up = !up
      count++
    }
  return count
}

nums = [1, 7, 4, 9, 2, 5]
// Output: 6

nums = [1, 17, 5, 10, 13, 15, 10, 5, 16, 8]
// Output: 7

nums = [1, 2, 3, 4, 5, 6, 7, 8, 9]
// Output: 2

console.log(wiggleMaxLength(nums))

nums = [
  33, 53, 12, 64, 50, 41, 45, 21, 97, 35, 47, 92, 39, 0, 93, 55, 40, 46, 69, 42,
  6, 95, 51, 68, 72, 9, 32, 84, 34, 64, 6, 2, 26, 98, 3, 43, 30, 60, 3, 68, 82,
  9, 97, 19, 27, 98, 99, 4, 30, 96, 37, 9, 78, 43, 64, 4, 65, 30, 84, 90, 87,
  64, 18, 50, 60, 1, 40, 32, 48, 50, 76, 100, 57, 29, 63, 53, 46, 57, 93, 98,
  42, 80, 82, 9, 41, 55, 69, 84, 82, 79, 30, 79, 18, 97, 67, 23, 52, 38, 74, 15,
]

console.log(wiggleMaxLength(nums))
