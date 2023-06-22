// Approach 2: Using Recursion with Memoization
const kInversePairs_2 = (n, k) => {
  const MODULO = 10 ** 9 + 7
  memo = new Array(1001).fill().map((_) => new Array(1001))

  const recurse = (n, k) => {
    if (n === 0) return 0
    if (k === 0) return 1
    if (memo[n][k] !== undefined) return memo[n][k]
    let result = 0
    for (let i = 0; i <= Math.min(k, n - 1); i++)
      result = (result + recurse(n - 1, k - i)) % MODULO
    return (memo[n][k] = result)
  }
  return recurse(n, k)
}

// Approach 3: Dynamic Programming
const kInversePairs_3 = (n, k) => {
  const MODULO = 10 ** 9 + 7
  const dp = new Array(n + 1).fill().map((_) => new Array(k + 1).fill(0))
  for (let i = 1; i <= n; i++)
    for (let j = 0; j <= k; j++)
      if (j === 0) dp[i][j] = 1
      else
        for (let p = 0; p <= Math.min(j, i - 1); p++)
          dp[i][j] = (dp[i][j] + dp[i - 1][j - p]) % MODULO
  return dp[n][k]
}

// Approach 4: Dynamic Programming with Cumulative Sum
const kInversePairs_4 = (n, k) => {
  const MODULO = 10 ** 9 + 7
  const dp = new Array(n + 1).fill().map((_) => new Array(k + 1).fill(0))
  for (let i = 1; i <= n; i++)
    for (let j = 0; j <= k; j++)
      if (j === 0) dp[i][j] = 1
      else {
        const val =
          (dp[i - 1][j] + MODULO - (j - i >= 0 ? dp[i - 1][j - i] : 0)) % MODULO
        dp[i][j] = (dp[i][j - 1] + val) % MODULO
      }

  return (dp[n][k] + MODULO - (k > 0 ? dp[n][k - 1] : 0)) % MODULO
}

// Approach 5: Another Optimized Dynamic Programming Approach
const kInversePairs_5 = (n, k) => {
  const MODULO = 10 ** 9 + 7
  const dp = new Array(n + 1).fill().map((_) => new Array(k + 1).fill(0))
  for (let i = 1; i <= n; i++)
    for (let j = 0; j <= k && j <= (i * (i - 1)) / 2; j++)
      if (j === 0) dp[i][j] = 1
      else {
        const val =
          (dp[i - 1][j] + MODULO - (j - i >= 0 ? dp[i - 1][j - i] : 0)) % MODULO
        dp[i][j] = (dp[i][j - 1] + val) % MODULO
      }
  return dp[n][k]
}

// Approach 6: Once Again Memoization
const kInversePairs_6 = (n, k) => {
  const MODULO = 10 ** 9 + 7
  const memo = new Array(1001).fill().map((_) => new Array(1001))

  const recurse = (n, k) => {
    if (n === 0) return 0
    if (k === 0) return 1
    if (memo[n][k] !== undefined) return memo[n][k]
    const val =
      (recurse(n - 1, k) + MODULO - (k - n >= 0 ? recurse(n - 1, k - n) : 0)) %
      MODULO
    return (memo[n][k] = (recurse(n, k - 1) + val) % MODULO)
  }

  return (recurse(n, k) + MODULO - (k > 0 ? recurse(n, k - 1) : 0)) % MODULO
}

// Approach 7: 1-D Dynamic Programmming
const kInversePairs = (n, k) => {
  const MODULO = 10 ** 9 + 7
  let dp = new Array(k + 1).fill(0)
  for (let i = 1; i <= n; i++) {
    let temp = new Array(k + 1)
    temp[0] = 1
    for (let j = 1; j <= k; j++) {
      const val = dp[j] + MODULO - ((j - i >= 0 ? dp[j - i] : 0) % MODULO)
      temp[j] = (temp[j - 1] + val) % MODULO
    }
    dp = temp
  }
  return (dp[k] + MODULO - (k > 0 ? dp[k - 1] : 0)) % MODULO
}

n = 3
k = 0
// Output: 1

// n = 3
// k = 1
// Output: 2

// n = 1000
// k = 1000
console.log(kInversePairs(n, k))
