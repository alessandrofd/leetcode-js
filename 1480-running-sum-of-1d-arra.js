/**
 * @param {number[]} nums
 * @return {number[]}
 */
// var runningSum = function (nums) {
//   const result = []
//   for (const num of nums) result.push(num + (result[result.length - 1] ?? 0))
//   return result
// }

const runningSum = (nums) => {
  let temp = 0
  return nums.map((n) => (temp += n))
}

// let nums = [1, 2, 3, 4]
// let nums = [1, 1, 1, 1, 1]
let nums = [3, 1, 2, 10, 1]
console.log(runningSum(nums))
