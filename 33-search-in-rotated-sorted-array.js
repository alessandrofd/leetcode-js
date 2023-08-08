/**
 * There is an integer array nums sorted in ascending order (with distinct
 * values).
 *
 * Prior to being passed to your function, nums is possibly rotated at an
 * unknown pivot index k (1 <= k < nums.length) such that the resulting array is
 * [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]]
 * (0-indexed). For example, [0,1,2,4,5,6,7] might be rotated at pivot index 3
 * and become [4,5,6,7,0,1,2].
 *
 * Given the array nums after the possible rotation and an integer target,
 * return the index of target if it is in nums, or -1 if it is not in nums.
 *
 * You must write an algorithm with O(log n) runtime complexity.
 *
 * Constraints:
 *    1 <= nums.length <= 5000
 *    -10^4 <= nums[i] <= 10^4
 *    All values of nums are unique.
 *    nums is an ascending array that is possibly rotated.
 *    -10^4 <= target <= 10^4
 */

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
const search_2loops = (nums, target) => {
  const n = nums.length

  let lo = 0
  let hi = n - 1
  while (lo < hi) {
    const mid = Math.floor((lo + hi) / 2)
    if (nums[mid] > nums[hi]) lo = mid + 1
    else hi = mid
  }

  const start = lo

  lo = 0
  hi = n
  while (lo < hi) {
    const mid = Math.floor((lo + hi) / 2)
    console.log(mid, (mid + start) % n)
    if (nums[(mid + start) % n] < target) lo = mid + 1
    else hi = mid
  }

  const targetIndex = (lo + start) % n
  return nums[targetIndex] === target ? targetIndex : -1
}

/**
 * Na busca binária temos que decidir qual metade do vetor está ordenada. Se o
 * valor procurado estiver na metade ordenada, procedemos com a busca nesta
 * metade, caso contrário na outra. A decisão só pode ser tomada avaliando a
 * metade ordenada.
 */

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
const search_1loop = (nums, target) => {
  const n = nums.length

  let lo = 0
  let hi = n - 1
  while (lo < hi) {
    const mid = Math.floor((lo + hi) / 2)
    if (nums[mid] === target) return mid

    if (nums[mid] >= nums[lo]) {
      if (target >= nums[lo] && target < nums[mid]) hi = mid
      else lo = mid + 1
    } else {
      if (target > nums[mid] && target <= nums[hi]) lo = mid + 1
      else hi = mid
    }
  }

  return nums[lo] === target ? lo : -1
}

nums = [4, 5, 6, 7, 0, 1, 2]
target = 0
// Expected: 4

// nums = [4, 5, 6, 7, 0, 1, 2]
// target = 3
// Expected: -1

// nums = [1]
// target = 0
// Expected: -1

nums = [1]
target = 1
// Expected: 0

// nums = [1, 3]
// target = 3
// Expected: 1

console.log(search_2loops(nums, target))
console.log(search_1loop(nums, target))
