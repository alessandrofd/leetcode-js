/**
 * @param {number[]} nums
 * @return {number}
 */
const maximumUniqueSubarray = (nums) => {
  const set = new Set()
  let result = 0
  let start = 0;
  let sum = 0
  for (let end = 0; end < nums.length; end++) {
    while (set.has(nums[end])) {
       set.delete(nums[start])
       sum -= nums[start]
       start++
    }
    set.add(nums[end])
    sum
    sum += nums[end]
    result = Math.max(result, sum)
  }
  return result
}

nums = [4, 2, 4, 5, 6] // Output: 17
console.log(maximumUniqueSubarray(nums))
