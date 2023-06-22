/**
 * Two strings are considered close if you can attain one from the other using
 * the following operations:
 *
 * Operation 1: Swap any two existing characters.
 *    For example, abcde -> aecdb
 *
 * Operation 2: Transform every occurrence of one existing character into
 * another existing character, and do the same with the other character.
 *    For example, aacabb -> bbcbaa (all a's turn into b's, and all b's turn
 *    into a's)
 *
 * You can use the operations on either string as many times as necessary.
 *
 * Given two strings, word1 and word2, return true if word1 and word2 are close,
 * and false otherwise.
 *
 * Constraints:
 *    1 <= word1.length, word2.length <= 10^5
 *    word1 and word2 contain only lowercase English letters.
 */

/**
 * @param {string} word1
 * @param {string} word2
 * @return {boolean}
 */
const closeStrings_me = (word1, word2) => {
  if (word1.length !== word2.length) return false

  const map1 = new Map()
  for (const letter of word1) map1.set(letter, (map1.get(letter) ?? 0) + 1)

  const map2 = new Map()
  for (const letter of word2) map2.set(letter, (map2.get(letter) ?? 0) + 1)

  const keys1 = Array.from(map1.keys()).sort()
  const keys2 = Array.from(map2.keys()).sort()

  if (keys1.length !== keys2.length) return false

  while (keys1.length) if (keys1.pop() !== keys2.pop()) return false

  const values1 = Array.from(map1.values()).sort((a, b) => a - b)
  const values2 = Array.from(map2.values()).sort((a, b) => a - b)

  while (values1.length) if (values1.pop() !== values2.pop()) return false

  return true
}

// Approach 2: Using Frequency Array Map
// const closeStrings = (word1, word2) => {
const closeStrings_frequencyArray = (word1, word2) => {
  const A = 'a'.charCodeAt()

  if (word1.length !== word2.length) return false
  const arr1 = new Array(26).fill(0)
  const arr2 = new Array(26).fill(0)

  for (const letter of word1) arr1[letter.charCodeAt() - A]++
  for (const letter of word2) arr2[letter.charCodeAt() - A]++

  for (let i = 0; i < 26; i++)
    if ((arr1[i] === 0 && arr2[i] !== 0) || (arr2[i] === 0 && arr1[i] !== 0))
      return false

  arr1.sort((a, b) => a - b)
  arr2.sort((a, b) => a - b)

  for (let i = 0; i < arr1.length; i++) if (arr1[i] !== arr2[i]) return false

  return true
}

// Approach 3: Using Bitwise Operation and Frequency Array Map
const closeStrings = (word1, word2) => {
  if (word1.length !== word2.length) return false

  const A = 'a'.charCodeAt()
  const arr1 = new Array(26).fill(0)
  const arr2 = new Array(26).fill(0)
  let bitmap1 = 0
  let bitmap2 = 0

  for (const letter of word1) {
    const index = letter.charCodeAt() - A
    arr1[index]++
    bitmap1 |= 1 << index
  }

  for (const letter of word2) {
    const index = letter.charCodeAt() - A
    arr2[index]++
    bitmap2 |= 1 << index
  }

  if (bitmap1 !== bitmap2) return false

  arr1.sort((a, b) => a - b)
  arr2.sort((a, b) => a - b)

  for (let i = 0; i < 26; i++) if (arr1[i] !== arr2[i]) return false

  return true
}

word1 = 'abc'
word2 = 'bca'
// Output: true
// Explanation: You can attain word2 from word1 in 2 operations.
// Apply Operation 1: "abc" -> "acb"
// Apply Operation 1: "acb" -> "bca"

word1 = 'a'
word2 = 'aa'
// Output: false
// Explanation: It is impossible to attain word2 from word1, or vice versa, in
// any number of operations.

word1 = 'cabbba'
word2 = 'abbccc'
// Output: true
// Explanation: You can attain word2 from word1 in 3 operations.
// Apply Operation 1: "cabbba" -> "caabbb"
// Apply Operation 2: "caabbb" -> "baaccc"
// Apply Operation 2: "baaccc" -> "abbccc"

word1 = 'uau'
word2 = 'ssx'

console.log(closeStrings(word1, word2))
