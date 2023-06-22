/**
 * @param {number[]} nums
 * @return {number[]}
 */
const sortArrayByParity_1 =  (nums) => {
  odds = []
  evens = []
  for (num of nums) {
    if (num % 2) odds.push(num)
    else evens.push(num)
  }
  return[...evens, ...odds]
}

const sortArrayByParity = nums => nums.sort((a, b) => (a % 2) - (b  % 2))

nums = [3, 1, 2, 4]
console.log(sortArrayByParity(nums))

/*
Example 1:

Input: nums = [3,1,2,4]
Output: [2,4,3,1]
Explanation: The outputs [4,2,3,1], [2,4,1,3], and [4,2,1,3] would also be accepted.

Example 2:

Input: nums = [0]
Output: [0]
*/