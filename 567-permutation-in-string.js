/**
 * Given two strings s1 and s2, return true if s2 contains a permutation of s1,
 * or false otherwise.
 *
 * In other words, return true if one of s1's permutations is the substring
 * of s2.
 *
 * Constraints:
 *    1 <= s1.length, s2.length <= 10^4
 *    s1 and s2 consist of lowercase English letters.
 */

/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
const checkInclusion = (s1, s2) => {
  if (s2.length < s1.length) return false

  const compareMaps = (m1, m2) => {
    for (const [key, value] of m1) if (value !== m2.get(key)) return false
    return true
  }

  const map1 = new Map()
  for (const letter of s1) map1.set(letter, (map1.get(letter) ?? 0) + 1)

  const map2 = new Map()
  for (let i = 0; i < s2.length; i++) {
    map2.set(s2[i], (map2.get(s2[i]) ?? 0) + 1)
    if (i >= s1.length - 1) {
      if (compareMaps(map1, map2)) return true
      const firstLetter = s2[i - (s1.length - 1)]
      map2.set(firstLetter, map2.get(firstLetter) - 1)
    }
  }

  return false
}

s1 = 'ab'
s2 = 'eidbaooo'
// Output: true

// s1 = 'ab'
// s2 = 'eidboaoo'
// Output: false

console.log(checkInclusion(s1, s2))

s = 'alessandro'
