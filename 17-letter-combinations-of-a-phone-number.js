/**
 * @param {string} digits
 * @return {string[]}
 */
const letterCombinations1 = (digits) => {
  if (!digits || digits.length === 0) return []

  const letters = {
    2: ['a', 'b', 'c'],
    3: ['d', 'e', 'f'],
    4: ['g', 'h', 'i'],
    5: ['j', 'k', 'l'],
    6: ['m', 'n', 'o'],
    7: ['p', 'q', 'r', 's'],
    8: ['t', 'u', 'v'],
    9: ['w', 'x', 'y', 'z'],
  }
  const arr = digits.split('').map((s) => letters[Number(s)])

  let f = (a, b) =>
    [].concat(...a.map((a) => b.map((b) => [].concat(a, b).join(''))))
  let cartesian = (a, b, ...c) => (b ? cartesian(f(a, b), ...c) : a)

  return cartesian(...arr)
}

const letterCombinations = (digits) => {
  if (!digits || digits.length === 0) return []

  const letters = {
    2: ['a', 'b', 'c'],
    3: ['d', 'e', 'f'],
    4: ['g', 'h', 'i'],
    5: ['j', 'k', 'l'],
    6: ['m', 'n', 'o'],
    7: ['p', 'q', 'r', 's'],
    8: ['t', 'u', 'v'],
    9: ['w', 'x', 'y', 'z'],
  }
  const arr = digits.split('').map((s) => letters[Number(s)])

  const cartesian = (...a) =>
    a.reduce((a, b) => a.flatMap((c) => b.map((d) => [c, d].join(''))))

  return cartesian(...arr)
}

/*
Input: digits = "234"
Output: ["ad","ae","af","bd","be","bf","cd","ce","cf"]
*/
console.log(letterCombinations('23'))

/*
Input: digits = ""
Output: []
*/
//console.log(letterCombinations(''))

/*
Input: digits = "2"
Output: ["a","b","c"]
*/
console.log(letterCombinations('2'))
