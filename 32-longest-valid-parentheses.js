/**
 * @param {string} s
 * @return {number}
 */

// Approach 1: Brute Force
// const longestValidParentheses = (str) => {
//   const isValid = str => {
//     const stack = []
//     for (const char of str)
//       if (char === '(') stack.push(char)
//       else if (stack.length && stack[stack.length - 1] === '(') stack.pop()
//       else return false
//     return stack.length === 0
//   }

//   let maxlen = 0
//   for (let i = 0; i < str.length; i++)
//     for (let j = i + 2; j <= str.length; j += 2)
//       if (isValid(str.substring(i, j)))
//         maxlen = Math.max(maxlen, j - i)
//   return maxlen
// }

// Approach 2: Using Dynamic Programming
// const longestValidParentheses = (str) => {
//   let maxlen = 0
//   const dp = new Array(str.length).fill(0)
//   for (let i = 1; i < str.length; i++) {
//     if (str[i] === ')')
//       if (str[i - 1] === '(') {
//         dp[i] = (i >= 2 ? dp[i - 2] : 0) + 2
//       } else if (i - dp[i - 1] > 0 && str[i - dp[i - 1] - 1] === '(') {
//         dp[i] = dp[i - 1] + (i - dp[i - 1] >= 2 ? dp[i - dp[i - 1] - 2] : 0) + 2
//       }
//     maxlen = Math.max(maxlen, dp[i])
//   }
//   return maxlen
// }

// Approach 3: Using Stack
// const longestValidParentheses = (str) => {
//   let maxlen = 0
//   const stack = [-1]
//   for (let i = 0; i < str.length; i++) {
//     if (str[i] === '(') stack.push(i)
//     else {
//       stack.pop()
//       if (!stack.length) stack.push(i)
//       else maxlen = Math.max(maxlen, i - stack[stack.length - 1])
//     }
//   }

//   return maxlen
// }

// Approach 4: Without extra space
const longestValidParentheses = (str) => {
  let left = 0,
    right = 0,
    maxlen = 0
  for (let i = 0; i < str.length; i++) {
    if (str[i] === '(') left++
    else right++

    if (left === right) maxlen = Math.max(maxlen, right * 2)
    else if (right > left) left = right = 0
  }

  left = right = 0
  for (let i = str.length - 1; i >= 0; i--) {
    if (str[i] === '(') left++
    else right++

    if (left === right) maxlen = Math.max(maxlen, left * 2)
    else if (left > right) left = right = 0
  }

  return maxlen
}

// let s = "(()" // Output: 2

// let s = ')()())' // Output: 4

// let s = "" // Output: 0

console.log(longestValidParentheses(s))
