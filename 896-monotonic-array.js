/**
 * @param {number[]} nums
 * @return {boolean}
 */
const isMonotonic = (nums) => {
  if (nums.length === 1) return true

  let i = 1
  while (i < nums.length && nums[i - 1] === nums[i]) i++

  const compare =
    nums[i - 1] > nums[i]
      ? (a, b) => (a >= b ? true : false)
      : (a, b) => (b >= a ? true : false)
  for (; i < nums.length; i++) if (!compare(nums[i - 1], nums[i])) return false

  return true
}

// Input: nums = [1,2,2,3]
// Output: true
console.log(isMonotonic([1, 2, 2, 3]))

// Input: nums = [6,5,4,4]
// Output: true
console.log(isMonotonic([6, 5, 3, 4, 4]))

// Input: nums = [1,3,2]
// Output: false
console.log(isMonotonic([1, 3, 2]))
