/**
 * @param {number[]} nums
 * @return {number}
 */
// const missingNumber = (nums) => {
//   for (let i = 0; i <= nums.length; i++) if (!nums.includes(i)) return i
// }

const missingNumber = (nums) => {
  const sum = nums.reduce((acc, next) => acc + next)
  return (nums.length * (nums.length + 1)) / 2 - sum
}

nums = [9, 6, 4, 2, 3, 5, 7, 0, 1]
// nums = [0, 1]
console.log(missingNumber(nums))

console.log(...Array(10).keys())
