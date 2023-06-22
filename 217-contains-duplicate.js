/**
 * @param {number[]} nums
 * @return {boolean}
 */
const containsDuplicate1 = (nums) => {
  nums.sort((a, b) => a - b)
  for (i = 1; i < nums.length; i++) if (nums[i - 1] === nums[i]) return true
  return false
}

const containsDuplicate = (nums) => {
  const set = new Set()
  for (n of nums)
    if (set.has(n)) return true
    else set.add(n)
  return false
}

// Input: nums = [1,2,3,1]
// Output: true
console.log(containsDuplicate([1, 2, 3, 1]))

// Input: nums = [1,2,3,4]
// Output: false
console.log(containsDuplicate([1, 2, 3, 4]))

// Input: nums = [1,1,1,3,3,4,3,2,4,2]
// Output: true
console.log(containsDuplicate([1, 1, 1, 3, 3, 4, 3, 2, 4, 2]))
