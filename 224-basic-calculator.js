/**
 * Given a string s representing a valid expression, implement a basic
 * calculator to evaluate it, and return the result of the evaluation.
 *
 * Note: You are not allowed to use any built-in function which evaluates
 * strings as mathematical expressions, such as eval().
 *
 * Constraints:
 *    1 <= s.length <= 3 * 10^5
 *    s consists of digits, '+', '-', '(', ')', and ' '.
 *    s represents a valid expression.
 *    '+' is not used as a unary operation (i.e., "+1" and "+(2 + 3)" is invalid).
 *    '-' could be used as a unary operation (i.e., "-1" and "-(2 + 3)" is valid).
 *    There will be no two consecutive operators in the input.
 *    Every number and running calculation will fit in a signed 32-bit integer.
 */

/**
 * @param {string} s
 * @return {number}
 */
// Approach 1: Stack and String Reversal
const calculate_stackAndReversal = (s) => {
  const isCharDigit = (c) => !isNaN(parseInt(c))

  const evaluateExpression = (stack) => {
    // If stack is empty or the expression start with a symbol, then append
    // zero to the stack
    // [1, '-', 2, '-'] becomes [1, '-', 2, '-', 0]
    if (!stack.length || !(typeof stack.at(-1) === 'number')) stack.push(0)

    let result = stack.pop()
    while (stack.length && stack.at(-1) !== ')') {
      const sign = stack.pop()
      if (sign === '+') result += stack.pop()
      else result -= stack.pop()
    }
    return result
  }

  stack = []
  let operand = 0
  let n = 0

  for (let i = s.length - 1; i >= 0; i--) {
    if (isCharDigit(s[i])) {
      operand += Math.pow(10, n) * parseInt(s[i])
      n++
    } else if (s[i] != ' ') {
      if (n !== 0) {
        stack.push(operand)
        operand = 0
        n = 0
      }
      if (s[i] === '(') {
        const result = evaluateExpression(stack)
        stack.pop() // se livra do ')'
        stack.push(result)
      } else {
        stack.push(s[i])
      }
    }
  }
  if (n != 0) stack.push(operand)
  return evaluateExpression(stack)
}

// Approach 2: Stack and No String Reversal
const calculate_stackAndNoReversal = (s) => {
  const stack = []
  let operand = 0
  let result = 0
  let sign = 1

  for (let i = 0; i < s.length; i++) {
    if (!isNaN(parseInt(s[i]))) {
      operand = 10 * operand + parseInt(s[i])
    } else if (s[i] === '+') {
      result += sign * operand
      sign = 1
      operand = 0
    } else if (s[i] === '-') {
      result += sign * operand
      sign = -1
      operand = 0
    } else if (s[i] === '(') {
      stack.push(result)
      stack.push(sign)
      sign = 1
      result = 0
    } else if (s[i] === ')') {
      result += sign * operand
      result *= stack.pop()
      result += stack.pop()
      operand = 0
    }
  }
  result += sign * operand
  return result
}

// Top submission
const calculate = (s) => {
  let result = 0
  let operand = 0
  let sign = 1

  const stack = [sign]

  for (const char of s) {
    if (char === ' ') continue

    if (char === '+' || char === '-') {
      result += sign * operand
      sign = stack.at(-1) * (char === '+' ? 1 : -1)
      operand = 0
    } else if (char === '(') {
      stack.push(sign)
    } else if (char === ')') {
      stack.pop()
    } else {
      operand = operand * 10 + parseInt(char)
    }
  }
  result += sign * operand
  return result
}

s = ' 2-1 + 2 '
// Output: 3

s = '(1+(4+5+2)-3)+(6+8)'
// Output: 23

console.log(calculate(s))
