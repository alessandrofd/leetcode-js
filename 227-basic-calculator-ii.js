/**
 * Given a string s which represents an expression, evaluate this expression and
 * return its value.
 *
 * The integer division should truncate toward zero.
 *
 * You may assume that the given expression is always valid. All intermediate
 * results will be in the range of [-2^31, 2^31 - 1].
 *
 * Note: You are not allowed to use any built-in function which evaluates
 * strings as mathematical expressions, such as eval().
 *
 * Constraints:
 *    1 <= s.length <= 3 * 10^5
 *    s consists of integers and operators ('+', '-', '*', '/') separated by
 *    some number of spaces.
 *    s represents a valid expression.
 *    All the integers in the expression are non-negative integers in the range
 *    [0, 2^31 - 1].
 *    The answer is guaranteed to fit in a 32-bit integer.
 */

/**
 * @param {string} s
 * @return {number}
 */
// Approach 1: Using Stack
const calculate_stack = (s) => {
  let operand = 0
  let operation = '+'
  const stack = []

  for (let i = 0; i < s.length; i++) {
    if (!isNaN(parseInt(s[i]))) operand = 10 * operand + parseInt(s[i])

    if ((isNaN(parseInt(s[i])) && s[i] !== ' ') || i === s.length - 1) {
      if (operation === '+') stack.push(operand)
      else if (operation === '-') stack.push(-operand)
      else if (operation === '*') stack.push(stack.pop() * operand)
      else if (operation === '/') stack.push((stack.pop() / operand) | 0)
      operation = s[i]
      operand = 0
    }
  }
  return stack.reduce((acc, next) => (acc += next))
}

// Approach 2: Optimised Approach without the stack
const calculate = (s) => {
  let result = 0
  let last = 0
  let operand = 0
  let operation = '+'

  for (let i = 0; i < s.length; i++) {
    if (!isNaN(parseInt(s[i]))) operand = 10 * operand + parseInt(s[i])

    if ((isNaN(parseInt(s[i])) && s[i] !== ' ') || i === s.length - 1) {
      if (operation === '+' || operation === '-') {
        result += last
        last = operation === '+' ? operand : -operand
      } else if (operation === '*') last *= operand
      else if (operation === '/') last = (last / operand) | 0
      operation = s[i]
      operand = 0
    }
  }
  result += last
  return result
}

s = '3+2*2'
// Output: 7

s = ' 3/2 '
// Output: 1

s = ' 3+5 / 2 '
// Output: 5

console.log(calculate(s))
