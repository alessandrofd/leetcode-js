/**
 * Given a string s, remove duplicate letters so that every letter appears once
 * and only once. You must make sure your result is the smallest in
 * lexicographical order among all possible results.
 *
 * Constraints:
 *  1 <= s.length <= 10^4
 *  s consists of lowercase English letters.
 */

/**
 * @param {string} s
 * @return {string}
 */

const removeDuplicateLetters = (string) => {
  const stack = []
  for (let i = 0; i < string.length; i++) {
    if (stack.indexOf(string[i]) > -1) continue
    while (
      stack.length > 0 &&
      stack[stack.length - 1] > string[i] &&
      string.indexOf(stack[stack.length - 1], i) > -1
    )
      stack.pop()
    stack.push(string[i])
  }
  return stack.join('')
}

//prettier-ignore
const funcs = [
  removeDuplicateLetters,
]

const data = [
  ['bcabc', 'abc'],
  ['cbacdcbc', 'acdb'],
  ['leetcode', 'letcod'],
]

for (const func of funcs) {
  for (const [str, expected] of data) {
    console.log(func(str) === expected)
  }
}
