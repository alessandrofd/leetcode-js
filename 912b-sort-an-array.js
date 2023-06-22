/**
 * Given an array of integers nums, sort the array in ascending order and
 * return it.
 *
 * You must solve the problem without using any built-in functions in O(nlog(n))
 * time complexity and with the smallest space complexity possible.
 *
 * Constraints:
 *    1 <= nums.length <= 5 * 10^4
 *    -5 * 10^4 <= nums[i] <= 5 * 10^4
 */

/**
 * @param {number[]} nums
 * @return {number[]}
 */
const sortArray_merge = (nums) => {}

const sortArray_heap = (nums) => {}

const sortArray_counting = (nums) => {}

const sortArray_radix = (nums) => {}

nums = [5, 2, 3, 1]
// Output: [1,2,3,5]

nums = [5, 1, 1, 2, 0, 0, -11, -4, -25]
// Output: [0,0,1,1,2,5]

console.log(sortArray_merge(nums))
console.log(sortArray_heap(nums))
console.log(sortArray_counting(nums))
console.log(sortArray_radix(nums))

for (let i = 0, val = 1; i < 3; i++, val *= 10 ** i) console.log(10 ** i)
