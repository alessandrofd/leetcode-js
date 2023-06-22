/**
 * @param {number[]} nums
 * @return {number}
 */
const findUnsortedSubarray = (nums) => {
  sorted = [...nums].sort((a, b) => a - b)
  let start = 0
  while (nums[start] === sorted[start] && start < nums.length) start++
  if (start  === nums.length) return 0

  let end = nums.length - 1
  while (nums[end] === sorted[end]) end--

  return end - start + 1

}

nums = [2, 6, 4, 8, 10, 9, 15]
console.log(findUnsortedSubarray(nums))

/* 
Example 1:

Input: nums = [2,6,4,8,10,9,15]
Output: 5
Explanation: You need to sort [6, 4, 8, 10, 9] in ascending order to make the whole array sorted in ascending order.

Example 2:

Input: nums = [1,2,3,4]
Output: 0

Example 3:

Input: nums = [1]
Output: 0
*/
