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
const removeDuplicateLetters = (str) => {
  const arr = str.split('')

  const lastIndex = new Map()
  arr.forEach((char, i) => lastIndex.set(char, i))

  const seen = new Set()
  const stack = []
  let last = ''
  arr.forEach((current, i) => {
    if (seen.has(current)) return
    while (stack.length > 0 && last > current && lastIndex.get(last) > i) {
      stack.pop()
      seen.delete(last)
      last = stack.at(-1)
    }
    stack.push(current)
    seen.add(current)
    last = current
  })

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
