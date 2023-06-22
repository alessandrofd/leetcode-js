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

// Input: s = "bcabc"
// Output: "abc"
console.log(removeDuplicateLetters('bcabc'))

// Input: s = "cbacdcbc"
// Output: "acdb"
console.log(removeDuplicateLetters('cbacdc c'))

// Input: "leetcode"
// Output:'letcod'
console.log(removeDuplicateLetters('leetcode'))
