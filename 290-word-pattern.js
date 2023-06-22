/**
 * Given a pattern and a string s, find if s follows the same pattern.
 *
 * Here follow means a full match, such that there is a bijection between a
 * letter in pattern and a non-empty word in s.
 *
 * Constraints:
 *    1 <= pattern.length <= 300
 *    pattern contains only lower-case English letters.
 *    1 <= s.length <= 3000
 *    s contains only lowercase English letters and spaces ' '.
 *    s does not contain any leading or trailing spaces.
 *    All the words in s are separated by a single space.
 */

/**
 * @param {string} pattern
 * @param {string} s
 * @return {boolean}
 */
// Approach 1: Two Hash Maps

const wordPattern_2hashes_alessandrofd = (pattern, s) => {
  // const wordPattern = (pattern, s) => {
  const tokens = pattern.split('')
  const words = s.split(' ')

  if (tokens.length !== words.length) return false

  const tokenMap = new Map()
  const wordMap = new Map()

  for (let i = 0; i < tokens.length; i++) {
    tokenExists = tokenMap.has(tokens[i])
    wordExists = wordMap.has(words[i])

    if (tokenExists !== wordExists) return false

    if (!tokenExists) {
      tokenMap.set(tokens[i], words[i])
      wordMap.set(words[i], tokens[i])
    } else {
      if (
        tokenMap.get(tokens[i]) !== words[i] ||
        wordMap.get(words[i]) !== tokens[i]
      )
        return false
    }
  }
  return true
}

// Solução mais elegante, mas acabou sendo mais lenta no Leetcode. No entanto,
// a expectativa era que fosse mais rápida pois há uma quantidade menor de
// operações

const wordPattern_2hashes_leetcode = (pattern, s) => {
  // const wordPattern = (pattern, s) => {
  const words = s.split(' ')

  if (pattern.length !== words.length) return false

  const tokenMap = new Map()
  const wordSet = new Set()

  for (let i = 0; i < words.length; i++) {
    const token = pattern[i]
    const word = words[i]

    if (!tokenMap.has(token)) {
      if (wordSet.has(word)) return false
      else {
        tokenMap.set(token, word)
        wordSet.add(word)
      }
    } else if (tokenMap.get(token) !== word) return false
  }
  return true
}

// Approach 2: Single Index Hash Map
const wordPattern = (pattern, s) => {
  const words = s.split(' ')

  if (words.length !== pattern.length) return false

  const map = new Map()
  for (let i = 0; i < words.length; i++) {
    const token = pattern[i]
    const word = '$' + words[i]

    if (!map.has(token)) map.set(token, i)
    if (!map.has(word)) map.set(word, i)

    if (map.get(token) !== map.get(word)) return false
  }
  return true
}

pattern = 'abba'
s = 'dog cat cat dog'
// Output: true

// pattern = 'abba'
// s = 'dog cat cat fish'
// Output: false

// pattern = 'aaaa'
// s = 'dog cat cat dog'
// Output: false

// pattern = 'abba'
// s = 'dog dog dog dog'
// Output: false

// pattern = 'abc'
// s = 'b c a'
// Output: true

console.log(wordPattern(pattern, s))
