/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */

// Approach 1: Brute Force -- Time Limit Exceeded
const subarraySum_1 = (nums, k) => {
  let count = 0
  for (let start = 0; start < nums.length; start++)
    for (let end = start + 1; end <= nums.length; end++) {
      let sum = 0
      for (let i = start; i < end; i++) sum += nums[i]
      if (sum === k) count++
    }
  return count
}

// Approach 2: Using Cumulative Sum -- Time Limit Exceeded
const subarraySum_2 = (nums, k) => {
  let count = 0
  const sum = new Array(nums.length + 1)
  sum[0] = 0
  for (let i = 1; i < sum.length; i++) sum[i] = sum[i - 1] + nums[i - 1]
  for (let start = 0; start < nums.length; start++)
    for (let end = start + 1; end <= nums.length; end++)
      if (sum[end] - sum[start] === k) count++
  return count
}

// Approach 3: Without Space -- 	Time Limit Exceeded
const subarraySum_3 = (nums, k) => {
  let count = 0
  for (let start = 0; start < nums.length; start++) {
    let sum = 0
    for (let end = start; end < nums.length; end++) {
      sum += nums[end]
      if (sum === k) count++
    }
  }
  return count
}

// Approach 4: Using Hashmap
const subarraySum = (nums, k) => {
  let count = 0
  let sum = 0
  const map = new Map()
  map.set(0, 1)
  for (let i = 0; i < nums.length; i++) {
    sum += nums[i]
    count += map.get(sum - k) ?? 0
    map.set(sum, (map.get(sum) ?? 0) + 1)
  }
  return count
}

nums = [1, 1, 1]
k = 2
// Output: 2

nums = [1, 2, 3]
k = 3
// Output: 2

nums = [1, -1, 0]
k = 0
// Output: 3

console.log(subarraySum(nums, k))
