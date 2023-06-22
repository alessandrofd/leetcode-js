/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
const nextPermutation = (nums) => {
  const swap = (nums, i, j) => {
    const temp = nums[i]
    nums[i] = nums[j]
    nums[j] = temp
  }

  const reverse = (nums, start) => {
    let end = nums.length - 1
    while (start < end) {
      swap(nums, start, end)
      start++
      end--
    }
  }

  let i = nums.length - 2
  while (i >= 0 && nums[i] >= nums[i + 1]) i--

  if (i >= 0) {
    let j = nums.length - 1
    while (j > i && nums[i] >= nums[j]) j--
    swap(nums, i, j)
  }

  reverse(nums, i + 1)
}

// Input: nums = [1,2,3]
// Output: [1,3,2]
let nums = [1, 2, 3]
nextPermutation(nums)
nums

// Input: nums = [3,2,1]
// Output: [1,2,3]
nums = [3, 2, 1]
nextPermutation(nums)
nums

// Input: nums = [1,1,5]
// Output: [1,5,1]
nums = [1, 1, 5]
nextPermutation(nums)
nums

nums = [1, 3, 2]
nextPermutation(nums)
nums
