/**
 * @param {number[]} nums
 * @return {boolean}
 */

// Approach 1: brute force
const find132pattern_1 = (nums) => {
  for (let i = 0; i < nums.length - 2; i++) {
    for (let j = i + 1; j < nums.length - 1; j++) {
      for (let k = j + 1; k < nums.length; k++) {
        if (nums[k] > nums[i] && nums[j] > nums[k]) return true
      }
    }
  }
  return false
}

// Approach 2: better brute force
const find132pattern_2 = (nums) => {
  let minI = Infinity
  for (let j = 0; j < nums.length - 1; j++) {
    minI = Math.min(minI, nums[j])
    for (let k = j + 1; k < nums.length; k++) {
      if (nums[k] < nums[j] && minI < nums[k]) return true
    }
  }
  return false
}

// Approach 3: searching intervals
const find132pattern_3 = (nums) => {
  const intervals = []
  let s = 0
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] < nums[i - 1]) {
      if (s < i - 1) intervals.push([nums[s], nums[i - 1]])
      s = i
    }
    for (let interval of intervals) {
      const [start, end] = interval
      if (nums[i] > start && nums[i] < end) return true
    }
  }
  return false
}

// Approach 4: stack
const find132pattern = (nums) => {
  if (nums.length < 3) return false

  const mins = Array(nums.length)
  mins[0] = nums[0]
  for (let i = 1; i < mins.length; i++) {
    mins[i] = Math.min(mins[i - 1], nums[i])
  }

  const stack = []

  for (let j = nums.length - 1; j >= 0; j--) {
    if (nums[j] > mins[j]) {
      while (stack.length > 0 && stack[stack.length - 1] <= mins[j]) {
        stack.pop()
      }
      if (stack.length > 0 && stack[stack.length - 1] < nums[j]) {
        return true
      }
      stack.push(nums[j])
    }
  }

  return false
}

console.log(find132pattern([1, 2, 3, 4])) //false
console.log(find132pattern([3, 1, 4, 2])) // true
console.log(find132pattern([-1, 3, 2, 0])) // true
/* 
Example 1:

Input: nums = [1,2,3,4]
Output: false
Explanation: There is no 132 pattern in the sequence.

Example 2:

Input: nums = [3,1,4,2]
Output: true
Explanation: There is a 132 pattern in the sequence: [1, 4, 2].

Example 3:

Input: nums = [-1,3,2,0]
Output: true
Explanation: There are three 132 patterns in the sequence: [-1, 3, 2], [-1, 3, 0] and [-1, 2, 0].
*/
