/**
 * Given an integer array nums, return the largest perimeter of a triangle with
 * a non-zero area, formed from three of these lengths. If it is impossible to
 * form any triangle of a non-zero area, return 0.
 *
 * Constraints:
 *    3 <= nums.length <= 10^4
 *    1 <= nums[i] <= 10^6
 */

const largestPerimeter = (nums) => {
  nums = nums.sort((a, b) => b - a)
  while (nums.length >= 3) {
    const [a, b, c] = nums
    if (a < b + c) return a + b + c
    else nums.shift()
  }
  return 0
}

nums = [2, 1, 2]
// Output: 5

// nums = [1,2,1]
// Output: 0

console.log(largestPerimeter(nums))
