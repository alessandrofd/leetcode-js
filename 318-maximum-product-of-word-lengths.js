/**
 * @param {string[]} words
 * @return {number}
 */

const bitNumber = (char) => char.charCodeAt(0) - 'a'.charCodeAt(0)

const getBitmask = (s) => {
  bitmask = 0
  for (c of s) bitmask |= 1 << bitNumber(c)
  return bitmask
}

const noCommonLetters = (s1, s2) => {
  return !(getBitmask(s1) & getBitmask(s2))
}

// Approach 1: Optimize noCommonLetters function : Bitmasks + Precomputation

const maxProduct = (words) => {
  const arr = []
  for (const word of words) arr.push([getBitmask(word), word.length])

  let maxLen = 0
  for (let i = 0; i < words.length - 1; i++)
    for (let j = i + 1; j < words.length; j++)
      if (!(arr[i][0] & arr[j][0]))
        maxLen = Math.max(maxLen, arr[i][1] * arr[j][1])

  return maxLen
}

// Approach 2: Optimise Number of Comparisons : Bitmasks + Precomputation + Hashmap

// const maxProduct = (words) => {
//   const map = new Map()
//   for (const word of words) {
//     const bm = getBitmask(word)
//     map.set(bm, Math.max(word.length, map.get(bm) ?? 0))
//   }

//   let maxLen = 0
//   for ([bm1, len1] of map)
//     for ([bm2, len2] of map)
//       if (!(bm1 & bm2)) maxLen = Math.max(maxLen, len1 * len2)
//   return maxLen
// }

// let words = ['abcw', 'baz', 'foo', 'bar', 'xtfn', 'abcdef'] // Output: 16
// let words = ['a', 'ab', 'abc', 'd', 'cd', 'bcd', 'abcd'] // Output: 4
// let words = ["a","aa","aaa","aaaa"] // Ouutput: 0

let words = [
  'bdcecbcadca',
  'caafd',
  'bcadc',
  'eaedfcd',
  'fcdecf',
  'dee',
  'bfedd',
  'ffafd',
  'eceaffa',
  'caabe',
  'fbdb',
  'acafbccaa',
  'cdc',
  'ecfdebaafde',
  'cddbabf',
  'adc',
  'cccce',
  'cbbe',
  'beedf',
  'fafbfdcb',
  'ceecfabedbd',
  'aadbedeaf',
  'cffdcfde',
  'fbbdfdccce',
  'ccada',
  'fb',
  'fa',
  'ec',
  'dddafded',
  'accdda',
  'acaad',
  'ba',
  'dabe',
  'cdfcaa',
  'caadfedd',
  'dcdcab',
  'fadbabace',
  'edfdb',
  'dbaaffdfa',
  'efdffceeeb',
  'aefdf',
  'fbadcfcc',
  'dcaeddd',
  'baeb',
  'beddeed',
  'fbfdffa',
  'eecacbbd',
  'fcde',
  'fcdb',
  'eac',
  'aceffea',
  'ebabfffdaab',
  'eedbd',
  'fdeed',
  'aeb',
  'fbb',
  'ad',
  'bcafdabfbdc',
  'cfcdf',
  'deadfed',
  'acdadbdcdb',
  'fcbdbeeb',
  'cbeb',
  'acbcafca',
  'abbcbcbaef',
  'aadcafddf',
  'bd',
  'edcebadec',
  'cdcbabbdacc',
  'adabaea',
  'dcebf',
  'ffacdaeaeeb',
  'afedfcadbb',
  'aecccdfbaff',
  'dfcfda',
  'febb',
  'bfffcaa',
  'dffdbcbeacf',
  'cfa',
  'eedeadfafd',
  'fcaa',
  'addbcad',
  'eeaaa',
  'af',
  'fafc',
  'bedbbbdfae',
  'adfecadcabe',
  'efffdaa',
  'bafbcbcbe',
  'fcafabcc',
  'ec',
  'dbddd',
  'edfaeabecee',
  'fcbedad',
  'abcddfbc',
  'afdafb',
  'afe',
  'cdad',
  'abdffbc',
  'dbdbebdbb',
]

console.log(maxProduct(words))
