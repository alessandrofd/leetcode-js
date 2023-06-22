/**
 * @param {string[]} strs
 * @return {string}
 
Constraints:
1 <= strs.length <= 200
0 <= strs[i].length <= 200
strs[i] consists of only lower-case English letters.
 */

const longestCommonPrefix1 = (strs) => {
  if (!strs || strs.length === 0) return ''

  for (let i = 0; i < strs[0].length; i++)
    if (!strs.every((s) => s[i] === strs[0][i])) return strs[0].slice(0, i)
  return strs[0]
}

const longestCommonPrefix = (strs) => {
  if (!strs || strs.length === 0) return ''

  const isCommonPrefix = (strs, len) =>
    strs.every((s) => s.startsWith(strs[0].slice(0, len)))

  let low = 1
  let high = strs.reduce((len, s) => Math.min(len, s.length), Infinity)

  while (low <= high) {
    let middle = Math.trunc((low + high) / 2)
    isCommonPrefix(strs, middle) ? (low = middle + 1) : (high = middle - 1)
  }
  return strs[0].slice(0, Math.trunc((low + high) / 2))
}

/*
Input: strs = ["flower","flow","flight"]
Output: "fl"
*/
console.log(longestCommonPrefix(['flower', 'flow', 'flight']))

/* 
Input: strs = ["dog","racecar","car"]
Output: ""
Explanation: There is no common prefix among the input strings.
*/
console.log(longestCommonPrefix(['dog', 'racecar', 'car']))

console.log(longestCommonPrefix(['a']))

console.log(longestCommonPrefix(['cir', 'car']))
