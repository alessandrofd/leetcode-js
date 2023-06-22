/**
 * @param {number[][]} envelopes
 * @return {number}
 */
// const maxEnvelopes = (envelopes) => {
//   const lengthOfLIS = (nums) => {
//     const dp = new Array(nums.length).fill(1)
//     for (let i = 0; i < nums.length; i++)
//       for (let j = 0; j < i; j++)
//         if (nums[i] > nums[j]) dp[i] = Math.max(dp[i], dp[j] + 1)

//     return dp.sort((a, b) => b - a)[0]
//   }

//   const heights = envelopes
//     .sort(([wA, hA], [wB, hB]) => (wA - wB ? wA - wB : hB - hA))
//     .map(([w, h]) => h)

//   return lengthOfLIS(heights)
// }

var maxEnvelopes = function (envelopes) {
  const n = envelopes.length
  const sortde = (a, b) => a[0] - b[0] || b[1] - a[1]
  envelopes.sort(sortde)
  const dp = []
  for (const [w, h] of envelopes) {
    let l = 0,
      r = dp.length
    while (l < r) {
      const m = (l + r) >> 1
      if (dp[m] < h) l = m + 1
      else r = m
    }
    dp[l] = h
  }
  return dp.length
}

let envelopes = [
  [5, 4],
  [6, 4],
  [6, 7],
  [2, 3],
]
// Output: 3

// let envelopes = [
//   [1, 1],
//   [1, 1],
//   [1, 1],
// ]
// Output: 1

console.log(maxEnvelopes(envelopes))
