/**
 * Implement a basic calculator to evaluate a simple expression string.
 *
 * The expression string contains only non-negative integers, '+', '-', '*', '/'
 * operators, and open '(' and closing parentheses ')'. The integer division
 * should truncate toward zero.
 *
 * You may assume that the given expression is always valid. All intermediate
 * results will be in the range of [-2^31, 2^31 - 1].
 *
 * Note: You are not allowed to use any built-in function which evaluates
 * strings as mathematical expressions, such as eval().
 *
 * Constraints:
 *    1 <= s <= 10^4
 *    s consists of digits, '+', '-', '*', '/', '(', and ')'.
 *    s is a valid expression.
 */

/**
 * @param {string} s
 * @return {number}
 */
// Discussion floydchen
const calculate_discussion = (s) => {
  const operation = (operator, b, a) => {
    switch (operator) {
      case '+':
        return a + b
      case '-':
        return a - b
      case '*':
        return a * b
      case '/':
        return (a / b) | 0
    }
    return 0
  }

  const precedence = (op1, op2) => {
    if (op2 === '(' || op2 === ')') return false
    if ((op1 === '*' || op1 === '/') && (op2 === '+' || op2 === '-'))
      return false
    return true
  }

  const nums = []
  const ops = []
  let num = 0

  for (let i = 0; i < s.length; i++) {
    if (s[i] === ' ') continue

    if (!isNaN(parseInt(s[i]))) {
      while (i < s.length && !isNaN(parseInt(s[i])))
        num = num * 10 + parseInt(s[i++])
      nums.push(num)
      num = 0
    }

    if (s[i] === '(') {
      ops.push(s[i])
    } else if (s[i] === ')') {
      while (ops.at(-1) !== '(')
        nums.push(operation(ops.pop(), nums.pop(), nums.pop()))
      ops.pop() // remove o '(' que serviu de marcador
    } else if (['+', '-', '*', '/'].includes(s[i])) {
      while (ops.length && precedence(s[i], ops.at(-1)))
        nums.push(operation(ops.pop(), nums.pop(), nums.pop()))
      ops.push(s[i])
    }
  }
  while (ops.length) nums.push(operation(ops.pop(), nums.pop(), nums.pop()))
  return nums.pop()
}

// Top submission
const calculate = (s) => {
  s += '+'
  let index = 0

  const helper = () => {
    let num = 0
    let sum = 0
    let prevSum = 0
    let prevOp = '+'

    while (index < s.length) {
      const char = s[index++]

      if (!isNaN(parseInt(char))) num = num * 10 + parseInt(char)
      else if (char === '(') num = helper()
      else {
        switch (prevOp) {
          case '+':
            sum += prevSum
            prevSum = num
            break
          case '-':
            sum += prevSum
            prevSum = -num
            break
          case '*':
            prevSum *= num
            break
          case '/':
            prevSum = (prevSum / num) | 0
            break
          default:
            break
        }

        if (char === ')') break

        prevOp = char
        num = 0
      }
    }
    return sum + prevSum
  }

  return helper()
}

s = '1+1'
// Output: 2

s = '6-4/2'
// Output: 4

s = '2*(5+5*2)/3+(6/2+8)'
// Output: 21

console.log(calculate(s))
