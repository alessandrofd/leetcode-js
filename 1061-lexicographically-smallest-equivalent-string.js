/**
 * You are given two strings of the same length s1 and s2 and a string baseStr.
 *
 * We say s1[i] and s2[i] are equivalent characters.
 *
 * For example, if s1 = "abc" and s2 = "cde", then we have 'a' == 'c',
 * 'b' == 'd', and 'c' == 'e'.
 *
 * Equivalent characters follow the usual rules of any equivalence relation:
 *
 *    Reflexivity: 'a' == 'a'.
 *    Symmetry: 'a' == 'b' implies 'b' == 'a'.
 *    Transitivity: 'a' == 'b' and 'b' == 'c' implies 'a' == 'c'.
 *
 * For example, given the equivalency information from s1 = "abc" and
 * s2 = "cde", "acd" and "aab" are equivalent strings of baseStr = "eed",
 * and "aab" is the lexicographically smallest equivalent string of baseStr.
 *
 * Return the lexicographically smallest equivalent string of baseStr by using
 * the equivalency information from s1 and s2.
 *
 * Constraints:
 *    1 <= s1.length, s2.length, baseStr <= 1000
 *    s1.length == s2.length
 *    s1, s2, and baseStr consist of lowercase English letters.
 */

/**
 * @param {string} s1
 * @param {string} s2
 * @param {string} baseStr
 * @return {string}
 */
const smallestEquivalentString = (s1, s2, baseStr) => {
  const parents = []

  find = (i) => {
    if (!parents[i]) parents[i] = i
    if (parents[i] === i) return i
    return (parents[i] = find(parents[i]))
  }

  union = (i, j) => {
    i = find(i)
    j = find(j)

    if (i === j) return

    if (i < j) parents[j] = i
    else parents[i] = j
  }

  for (let i = 0; i < s1.length; i++)
    union(s1[i].charCodeAt(), s2[i].charCodeAt())

  charCodes = []
  for (const char of baseStr) charCodes.push(find(char.charCodeAt()))
  return String.fromCharCode(...charCodes)
}

s1 = 'parker'
s2 = 'morris'
baseStr = 'parser'
// Output: 'makkek'

// s1 = 'hello'
// s2 = 'world'
// baseStr = 'hold'
// Output: 'hdld'

// s1 = 'leetcode'
// s2 = 'programs'
// baseStr = 'sourcecode'
// Output: 'aauaaaaada'

console.log(smallestEquivalentString(s1, s2, baseStr))
