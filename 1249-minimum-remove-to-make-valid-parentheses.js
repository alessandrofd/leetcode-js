/**
 * @param {string} s
 * @return {string}
 */
const minRemoveToMakeValid1 = (s) => {
  const open = [],
    close = []

  for (let i = 0; i < s.length; i++) {
    if (s[i] === '(') open.push(i)
    else if (s[i] === ')') {
      if (open.pop() === undefined) close.push(i)
    }
  }
  const remove = [...open, ...close]
  return s
    .split('')
    .filter((_, i) => !remove.includes(i))
    .join('')
}

const minRemoveToMakeValid2 = (s) => {
  const stack = []
  const string = s.split('')

  for (let i = 0; i < string.length; i++) {
    if (string[i] === '(') stack.push(i)
    else if (string[i] === ')') {
      if (stack.pop() === undefined) string[i] = ''
    }
  }
  for (let i of stack) string[i] = ''
  return string.join('')
}

const minRemoveToMakeValid3 = (s) => {
  const stack = []
  const string = s.split('')

  for (let i = 0; i < string.length; i++) {
    if (string[i] === '(') stack.push(i)
    else if (string[i] === ')') {
      if (stack.pop() === undefined) delete string[i]
    }
  }
  for (i of stack) delete string[i]
  return string.join('')
}

const minRemoveToMakeValid4 = (s) => {
  const open = [],
    close = []

  for (let i = 0; i < s.length; i++) {
    if (s[i] === '(') open.push(i)
    else if (s[i] === ')') {
      if (open.pop() === undefined) close.push(i)
    }
  }

  const remove = open.concat(close).sort((a, b) => a - b)
  let result = ''
  let start = 0
  for (i of remove) {
    result += s.slice(start, i)
    start = i + 1
  }
  result += s.slice(start)
  return result
}

const minRemoveToMakeValid = (s) => {
  const open = [],
    close = []

  for (let i = 0; i < s.length; i++) {
    if (s[i] === '(') open.push(i)
    else if (s[i] === ')') {
      if (open.pop() === undefined) close.push(i)
    }
  }

  const remove = open.concat(close)
  const string = s.split('')
  for (i of remove) delete string[i]
  return string.join('')
}

// Input: s = "lee(t(c)o)de)"
// Output: "lee(t(c)o)de"
// Explanation: "lee(t(co)de)" , "lee(t(c)ode)" would also be accepted.

console.time()
console.log(minRemoveToMakeValid('lee(t(c)o)de)'))
console.timeEnd()

// Input: s = "a)b(c)d"
// Output: "ab(c)d"

console.log(minRemoveToMakeValid('a)b(c)d'))

// Input: s = "))(("
// Output: ""
// Explanation: An empty string is also valid.

console.log(minRemoveToMakeValid('))(('))
