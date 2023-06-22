/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
const moveZeroes1 = (nums) => {
  if (!nums || nums.length < 2) return

  for (
    let idx = 0, count = 0;
    idx < nums.length && count < nums.length;
    count++
  ) {
    if (nums[idx] === 0) {
      nums.splice(idx, 1)
      nums.push(0)
    } else idx++
  }
}

const moveZeroes = (nums) => {
  for (let idx = 0, last = 0; idx < nums.length; idx++) {
    if (nums[idx] !== 0) {
      ;[nums[idx], nums[last++]] = [nums[last], nums[idx]]
    }
  }
}

/*
Input: nums = [0,1,0,3,12]
Output: [1,3,12,0,0]
*/
let nums = [0, 1, 0, 3, 12]
moveZeroes(nums)
console.log(nums)

/*
Input: nums = [0]
Output: [0]
*/
nums = [0]
moveZeroes(nums)
console.log(nums)

nums = [0, 0, 1]
moveZeroes(nums)
console.log(nums)
