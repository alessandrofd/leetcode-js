/**
 * A pangram is a sentence where every letter of the English alphabet appears at
 * least once.
 *
 * Given a string sentence containing only lowercase English letters, return
 * true if sentence is a pangram, or false otherwise.
 *
 * Constraints:
 *    1 <= sentence.length <= 1000
 *    sentence consists of lowercase English letters.
 */

/**
 * @param {string} sentence
 * @return {boolean}
 */
const checkIfPangram = (sentence) => {
  const set = new Set([...'abcdefghijklmnopqrstuvwxyz'])
  for (const char of sentence) {
    set.delete(char)
    if (set.size === 0) return true
  }
  return false
}

sentence = 'thequickbrownfoxjumpsoverthelazydog'
// Output: true
// Explanation: sentence contains at least one of every letter of the English
// alphabet.

// sentence = 'leetcode'
// Output: false

console.log(checkIfPangram(sentence))
