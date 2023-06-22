/**
 * @param {string} s
 * @return {boolean}
 */
const repeatedSubstringPattern1 = (s) => {
  if (s.length === 1) return false

  for (let i = Math.floor(s.length / 2); i >= 1; i--) {
    if (s.length % i) continue
    const re = new RegExp(`^(${s.slice(0, i)})+$`)
    if (s.search(re) != -1) return true
  }

  return false
}

var repeatedSubstringPattern = function (s) {
  let res = s.repeat(2)
  s
  res
  console.log(res.slice(1, res.length - 1))
  if (res.slice(1, res.length - 1).includes(s)) return true
  return false
}

// Input: s = "abab"
// Output: true
console.log(repeatedSubstringPattern('abab'))

// Input: s = "aba"
// Output: false
// console.log(repeatedSubstringPattern('aba'))

// Input: s = "abcabcabcabc"
// Output: true
//  console.log(repeatedSubstringPattern('abcabcabcabc'))

//  console.log(repeatedSubstringPattern('ababba'))

//  console.log(repeatedSubstringPattern('babbabbabbabbab'))
