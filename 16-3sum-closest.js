/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
const threeSumClosest = function (nums, target) {
  nums.sort((a, b) => a - b)
  let result = 0,
    minDiff = Infinity

  for (let i = 0; i < nums.length - 2; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue
    let left = i + 1
    let right = nums.length - 1
    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right]
      const diff = Math.abs(target - sum)
      if (diff < minDiff) {
        minDiff = diff
        result = sum
      }
      if (sum < target) left++
      else if (sum > target) right--
      else return sum
    }
  }
  return result
}

//Input: nums = [-1,2,1,-4], target = 1
//Output: 2
console.log(threeSumClosest([-1, 2, 1, -4], 1))

//Input: nums = [0,0,0], target = 1
//Output: 0
console.log(threeSumClosest([0, 0, 0]))
