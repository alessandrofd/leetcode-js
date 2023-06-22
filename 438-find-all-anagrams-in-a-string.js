/**
 * Given two strings s and p, return an array of all the start indices of p's
 * anagrams in s. You may return the answer in any order.
 *
 * An Anagram is a word or phrase formed by rearranging the letters of a
 * different word or phrase, typically using all the original letters
 * exactly once.
 *
 * Constraints:
 *    1 <= s.length, p.length <= 3 * 10^4
 *    s and p consist of lowercase English letters.
 */

/**
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */
// Approach 1: Sliding Window with HashMap
const findAnagrams = (long, short) => {
  if (short.length > long.length) return []

  const compareMaps = (m1, m2) => {
    for (const [key, value] of m1) if (m2.get(key) !== value) return false
    return true
  }
  const mapShort = new Map()
  for (const letter of short)
    mapShort.set(letter, (mapShort.get(letter) ?? 0) + 1)

  const result = []

  const mapLong = new Map()
  for (let i = 0; i < long.length; i++) {
    mapLong.set(long[i], (mapLong.get(long[i]) ?? 0) + 1)
    if (i >= short.length - 1) {
      const start = i - (short.length - 1)
      if (compareMaps(mapShort, mapLong)) result.push(start)
      mapLong.set(long[start], mapLong.get(long[start]) - 1)
    }
  }

  return result
}

s = 'cbaebabacd'
p = 'abc'
// Output: [0,6]
// Explanation:
// The substring with start index = 0 is "cba", which is an anagram of "abc".
// The substring with start index = 6 is "bac", which is an anagram of "abc".

// s = 'abab'
// p = 'ab'
// Output: [0,1,2]
// Explanation:
// The substring with start index = 0 is "ab", which is an anagram of "ab".
// The substring with start index = 1 is "ba", which is an anagram of "ab".
// The substring with start index = 2 is "ab", which is an anagram of "ab".

console.log(findAnagrams(s, p))
