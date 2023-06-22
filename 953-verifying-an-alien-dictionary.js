/**
 * In an alien language, surprisingly, they also use English lowercase letters,
 * but possibly in a different order. The order of the alphabet is some
 * permutation of lowercase letters.
 *
 * Given a sequence of words written in the alien language, and the order of the
 * alphabet, return true if and only if the given words are sorted
 * lexicographically in this alien language.
 *
 * Constraints:
 *    1 <= words.length <= 100
 *    1 <= words[i].length <= 20
 *    order.length == 26
 *    All characters in words[i] and order are English lowercase letters.
 */

/**
 * @param {string[]} words
 * @param {string} order
 * @return {boolean}
 */
const isAlienSorted = (words, order) => {
  const dict = new Map()
  for (let i = 0; i < order.length; i++) dict.set(order[i], i)
  dict.set(undefined, -1)

  for (let i = 1; i < words.length; i++) {
    const maxLength = Math.max(words[i - 1].length, words[i].length)
    for (let j = 0; j < maxLength; j++) {
      if (dict.get(words[i - 1][j]) > dict.get(words[i][j])) return false
      if (dict.get(words[i - 1][j]) < dict.get(words[i][j])) break
    }
  }

  return true
}

words = ['hello', 'leetcode']
order = 'hlabcdefgijkmnopqrstuvwxyz'
// Output: true

words = ['word', 'world', 'row']
order = 'worldabcefghijkmnpqstuvxyz'
// Output: false

words = ['apple', 'app']
order = 'abcdefghijklmnopqrstuvwxyz'
// Output: false

console.log(isAlienSorted(words, order))
