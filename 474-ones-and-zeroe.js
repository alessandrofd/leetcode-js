/**
 * @param {string[]} strs
 * @param {number} m
 * @param {number} n
 * @return {number}
 */

// Approach #1 Brute Force [Time Limit Exceeded]
// const findMaxForm = (strs, maxZeroes, maxOnes) => {
//   const countZeroesOnes = (s) => {
//     const count = new Array(2).fill(0)
//     for (c of s) count[c - '0']++
//     return count
//   }

//   let maxLen = 0

//   for (i = 0; i < 1 << strs.length; i++) {
//     let zeroes = 0,
//       ones = 0,
//       len = 0
//     for (j = 0; j < strs.length; j++) {
//       if (i & (1 << j)) {
//         const count = countZeroesOnes(strs[j])
//         zeroes += count[0]
//         ones += count[1]
//         len++
//       }
//       if (zeroes <= maxZeroes && ones <= maxOnes) maxLen = Math.max(maxLen, len)
//     }
//   }
//   return maxLen
// }

// Approach #2 Better Brute Force [Time Limit Exceeded]
// const findMaxForm = (strs, maxZeroes, maxOnes) => {
//   const countZeroesOnes = (s) => {
//     const count = new Array(2).fill(0)
//     for (c of s) count[c - '0']++
//     return count
//   }

//   let maxLen = 0

//   for (i = 0; i < 1 << strs.length; i++) {
//     let zeroes = 0,
//       ones = 0,
//       len = 0
//     for (j = 0; j < strs.length; j++) {
//       if (i & (1 << j)) {
//         const count = countZeroesOnes(strs[j])
//         zeroes += count[0]
//         ones += count[1]
//         if (zeroes > maxZeroes || ones > maxOnes) break
//         len++
//       }
//       if (zeroes <= maxZeroes && ones <= maxOnes) maxLen = Math.max(maxLen, len)
//     }
//   }
//   return maxLen
// }

// Approach #3 Using Recursion [Time Limit Exceeded]
// const findMaxForm = (strs, maxZeroes, maxOnes) => {
//   const countZeroesOnes = (s) => {
//     const count = new Array(2).fill(0)
//     for (c of s) count[c - '0']++
//     return count
//   }

//   const calculate = (i, zeroes, ones) => {
//     if (i === strs.length) return 0
//     const count = countZeroesOnes(strs[i])
//     let taken = -1
//     if (zeroes - count[0] >= 0 && ones - count[1] >= 0)
//       taken = calculate(i + 1, zeroes - count[0], ones - count[1]) + 1
//     const notTaken = calculate(i + 1, zeroes, ones)
//     return Math.max(taken, notTaken)
//   }

//     return calculate(0, maxZeroes, maxOnes)
// }

// Approach #4 Using Memoization [Accepted]
// const findMaxForm = (strs, maxZeroes, maxOnes) => {
//   const memo = new Array(strs.length)
//     .fill(null)
//     .map((_) =>
//       new Array(maxZeroes + 1)
//         .fill(null)
//         .map((_) => new Array(maxOnes + 1).fill(0))
//     )

//   const countZeroesOnes = (s) => {
//     const count = new Array(2).fill(0)
//     for (c of s) count[c - '0']++
//     return count
//   }

//   const calculate = (i, zeroes, ones) => {
//     if (i === strs.length) return 0
//     if (memo[i][zeroes][ones] != 0) return memo[i][zeroes][ones]

//     const count = countZeroesOnes(strs[i])
//     let taken = -1
//     if (zeroes - count[0] >= 0 && ones - count[1] >= 0)
//       taken = calculate(i + 1, zeroes - count[0], ones - count[1]) + 1
//     const notTaken = calculate(i + 1, zeroes, ones)
//     memo[i][zeroes][ones] = Math.max(taken, notTaken)

//     return memo[i][zeroes][ones]
//   }

//   return calculate(0, maxZeroes, maxOnes)
// }

// Approach #5 Dynamic Programming [Accepted]
const findMaxForm = (strs, maxZeroes, maxOnes) => {
  const countZeroesOnes = (s) => {
    const count = new Array(2).fill(0)
    for (c of s) count[c - '0']++
    return count
  }

  const dp = new Array(maxZeroes + 1)
    .fill(null)
    .map((_) => new Array(maxOnes + 1).fill(0))

  for (const str of strs) {
    const count = countZeroesOnes(str)
    for (let zeroes = maxZeroes; zeroes >= count[0]; zeroes--)
      for (let ones = maxOnes; ones >= count[1]; ones--)
        dp[zeroes][ones] = Math.max(
          dp[zeroes - count[0]][ones - count[1]] + 1,
          dp[zeroes][ones]
        )
  }

  return dp[maxZeroes][maxOnes]
}

let strs = ['10', '0001', '111001', '1', '0']
let m = 5
let n = 3
// Output: 4

// let strs = ['10', '0', '1']
// let m = 1
// let n = 1
// Output: 2

console.log(findMaxForm(strs, m, n))
