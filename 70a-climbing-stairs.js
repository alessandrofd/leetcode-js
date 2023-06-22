/**
 * You are climbing a staircase. It takes n steps to reach the top.
 *
 * Each time you can either climb 1 or 2 steps. In how many distinct ways can
 * you climb to the top?
 *
 * Constraints:
 *    1 <= n <= 45
 */

// Approach 2: Recursion with Memoization
const climbStairs_recursionMemoization = (n) => {
  // const climbStairs = (n) => {
  const memo = new Array(n)

  const recurse = (n) => {
    if (n <= 2) return n
    if (memo[n]) return memo[n]
    return (memo[n] = recurse(n - 1) + recurse(n - 2))
  }

  return recurse(n)
}

// Approach 3: Dynamic Programming
// const climbStairs_dp = (n) => {
const climbStairs = (n) => {
  const dp = []
  dp[1] = 1
  dp[2] = 2

  for (let i = 3; i <= n; i++) dp[i] = dp[i - 2] + dp[i - 1]
  return dp[n]
}

n = 2
// Output: 2
// Explanation: There are two ways to climb to the top.
// 1. 1 step + 1 step
// 2. 2 steps

n = 3
// Output: 3
// Explanation: There are three ways to climb to the top.
// 1. 1 step + 1 step + 1 step
// 2. 1 step + 2 steps
// 3. 2 steps + 1 step

console.log(climbStairs(n))
