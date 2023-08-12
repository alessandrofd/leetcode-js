/**
 * There is an integer array nums sorted in non-decreasing order (not
 * necessarily with distinct values).
 *
 * Before being passed to your function, nums is rotated at an unknown pivot
 * index k (0 <= k < nums.length) such that the resulting array is
 * [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]]
 * (0-indexed). For example, [0,1,2,4,4,4,5,6,6,7] might be rotated at pivot
 * index 5 and become [4,5,6,6,7,0,1,2,4,4].
 *
 * Given the array nums after the rotation and an integer target, return true if
 * target is in nums, or false if it is not in nums.
 *
 * You must decrease the overall operation steps as much as possible.
 *
 * Constraints:
 *    1 <= nums.length <= 5000
 *    -10^4 <= nums[i] <= 10^4
 *    nums is guaranteed to be rotated at some pivot.
 *    -10^4 <= target <= 10^4
 */

/**
 * O problema é uma extensão do '33. Search in rotated sorted array' com a
 * diferença que permite números repetidos.
 *
 * Como há a possibilidade de números repetidos, é possivel que as
 * comparações abaixo envolvam números que tenham sido rotacionados e outros
 * que não. Logo, temos que colapsar os números rotacionados para que
 * possamos decidir se o segmento à esquerda está, de fato, ordenado.
 */

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {boolean}
 */
const search = (nums, target) => {}

nums = [2, 5, 6, 0, 0, 1, 2]
target = 0
// Expected: true

nums = [2, 5, 6, 0, 0, 1, 2]
target = 3
// Expected: false

nums = [1, 0, 1, 1, 1]
target = 0
// Expected: true

nums = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1]
target = 2
// Expected: true

console.log(search(nums, target))