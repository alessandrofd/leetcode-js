/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
const maxOperations = (nums, k) => {
  nums.sort((a, b) => a - b)
  let left = 0
  let right = nums.length
  let count = 0

  while (left < right) {
    const sum = nums[left] + nums[right]
    if (sum === k) count++, left++, right--
    else if (sum < k) left++
    else right--
  }

  return count
}

;[3, 1, 3, 4, 3], (k = 6)
console.log(maxOperations(nums, k))
/*
Example 1:

Input: nums = [1,2,3,4], k = 5
Output: 2
Explanation: Starting with nums = [1,2,3,4]:
- Remove numbers 1 and 4, then nums = [2,3]
- Remove numbers 2 and 3, then nums = []
There are no more pairs that sum up to 5, hence a total of 2 operations.

Example 2:

Input: nums = [3,1,3,4,3], k = 6
Output: 1
Explanation: Starting with nums = [3,1,3,4,3]:
- Remove the first two 3's, then nums = [1,4,3]
There are no more pairs that sum up to 6, hence a total of 1 operation.
 
*/
