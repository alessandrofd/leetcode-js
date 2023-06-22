/**
 * @param {number[]} nums
 * @return {number}
 */
const longestConsecutive = (nums) => {
  const set = new Set(nums)
  let longestStreak = 0
  for (let num of set) {
    if (!set.has(num - 1)) {
      let currentNum = num
      let currentStreak = 1
      while (set.has(currentNum + 1)) {
        currentNum++
        currentStreak++
      }
      longestStreak = Math.max(longestStreak, currentStreak)
    }
  }
  return longestStreak
}

nums = [100, 4, 200, 1, 3, 2]
// Output: 4
// Explanation: The longest consecutive elements sequence is [1, 2, 3, 4]. Therefore its length is 4.

nums = [0, 3, 7, 2, 5, 8, 4, 6, 0, 1]
// Output: 9

console.log(longestConsecutive(nums))
