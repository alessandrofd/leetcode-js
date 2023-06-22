/**
 * @param {number[]} nums
 * @return {number}
 */
const lengthOfLIS_1 = (nums) => {
  const dp = new Array(nums.length).fill(1)
  for (let i = 0; i < nums.length; i++)
    for (let j = 0; j < i; j++)
      if (nums[i] < nums[j]) dp[i] = Math.max(dp[i], dp[j] + 1)
  return dp.sort((a, b) => b - a)[0]
}

const lengthOfLIS = (nums) => {
  const dp = []
  for (let num of nums) {
    let l = 0,
      r = dp.length
    while (l < r) {
      const m = (l + r) >> 1
      if (dp[m] < num) l = m + 1
      else r = m
    }
    dp[l] = num
  }
  return dp.length
}
