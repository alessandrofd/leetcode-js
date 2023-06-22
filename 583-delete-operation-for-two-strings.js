/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
//Approach #1 Using Longest Common Subsequence [Time Limit Exceeded]

// const minDistance = (word1, word2) => {
//   const lcs = (i1, i2) => {
//     if (i1 === 0 || i2 === 0) return 0
//     if (word1[i1 - 1] === word2[i2 - 1]) return 1 + lcs(i1 - 1, i2 - 1)
//     else return Math.max(lcs(i1 - 1, i2), lcs(i1, i2 - 1))
//   }
//   return word1.length + word2.length - 2 * lcs(word1.length, word2.length)
// }

// Approach #2 Longest Common Subsequence with Memoization [Accepted]

// const minDistance = (word1, word2) => {
//   const memo = new Array(word1.length + 1)
//     .fill()
//     .map(() => new Array(word2.length + 1).fill(0))

//   const lcs = (i1, i2) => {
//     if (i1 === 0 || i2 === 0) return 0

//     if (memo[i1][i2] > 0) return memo[i1][i2]

//     if (word1[i1 - 1] === word2[i2 - 1]) memo[i1][i2] = 1 + lcs(i1 - 1, i2 - 1)
//     else memo[i1][i2] = Math.max(lcs(i1 - 1, i2), lcs(i1, i2 - 1))

//     return memo[i1][i2]
//   }

//   return word1.length + word2.length - 2 * lcs(word1.length, word2.length)
// }

// Approach #3 Using Longest Common Subsequence- Dynamic Programming [Accepted]

const minDistance_3 = (word1, word2) => {
  const dp = new Array(word1.length + 1)
    .fill()
    .map(() => new Array(word2.length + 1).fill(0))

  for (let i = 1; i <= word1.length; i++) {
    for (let j = 1; j <= word2.length; j++) {
      if (word1[i - 1] === word2[j - 1]) dp[i][j] = 1 + dp[i - 1][j - 1]
      else dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1])
    }
  }

  return word1.length + word2.length - 2 * dp[word1.length][word2.length]
}

// Approach #4 Without using LCS Dynamic Programmming [Accepted]:

const minDistance_4 = (word1, word2) => {
  const dp = new Array(word1.length + 1)
    .fill()
    .map(() => new Array(word2.length).fill(0))

  for (let i = 0; i <= word1.length; i++)
    for (let j = 0; j <= word2.length; j++)
      if (i === 0 || j === 0) dp[i][j] = i + j
      else if (word1[i - 1] === word2[j - 1]) dp[i][j] = dp[i - 1][j - 1]
      else dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1])

  return dp[word1.length][word2.length]
}

// Approach #5 1-D Dynamic Programming [Accepted]:

const minDistance_5 = (word1, word2) => {
  let dp = new Array(word2.length + 1).fill(0)
  for (let i = 0; i <= word1.length; i++) {
    const temp = new Array(word2.length + 1).fill(0)
    for (let j = 0; j <= word2.length; j++) {
      if (i === 0 || j === 0) temp[j] = i + j
      else if (word1[i - 1] === word2[j - 1]) temp[j] = dp[j - 1]
      else temp[j] = 1 + Math.min(dp[j], temp[j - 1])
    }
    dp = temp
  }
  return dp[word2.length]
}

// From discussion - LCS with 1D DP array

const minDistance = (w1, w2) => {
  let m = w1.length
  let n = w2.length
  if (m < n) [w1, m, w2, n] = [w2, n, w1, m]
  let dpLast = new Uint16Array(n + 1)
  let dpCurr = new Uint16Array(n + 1)
  for (i = 0; i < m; i++) {
    for (j = 0; j < n; j++) {
      dpCurr[j + 1] =
        w1[i] === w2[j] ? dpLast[j] + 1 : Math.max(dpCurr[j], dpLast[j + 1])
    }
    ;[dpLast, dpCurr] = [dpCurr, dpLast]
  }
  return m + n - 2 * dpLast[n]
}
// word1 = 'sea'
// word2 = 'eat'

//;(word1 = 'leetcode'), (word2 = 'etco')

// word1 = 'a'
// word2 = 'b'

word1 = 'food'
word2 = 'money'

console.log(minDistance(word1, word2))
