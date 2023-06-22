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

const wordPattern_2Maps = (pattern, s) => {
  const words = s.split(' ')

  const tokenToWord = new Map()
  const wordSet = new Set()

  for (let i = 0; i < pattern.length; i++) {
    const token = pattern[i]
    const word = tokenToWord.get(token)
    if (word) {
      if (word !== words[i]) return false
    } else {
      if (wordSet.has(words[i])) return false
      tokenToWord.set(token, words[i])
      wordSet.add(words[i])
    }
  }

  return true
}

// Approach 2: Single Index Hash Map
const wordPattern_singleMap = (pattern, s) => {
  const words = s.split(' ')

  const map = new Map()

  for (let i = 0; i < pattern.length; i++) {
    const token = pattern[i]
    const word = '$' + words[i]

    if (map.get(token) !== map.get(word)) return false

    map.set(token, i)
    map.set(word, i)
  }

  return true
}

pattern = 'abba'
s = 'dog cat cat dog'
// Output: true

// pattern = 'abba'
// s = 'dog cat cat fish'
Output: false

// pattern = 'aaaa'
// s = 'dog cat cat dog'
Output: false

// pattern = 'abba'
// s = 'dog dog dog dog'
Output: false

// pattern = 'abc'
// s = 'b c a'
Output: true

console.log(wordPattern_2Maps(pattern, s))
console.log(wordPattern_singleMap(pattern, s))
