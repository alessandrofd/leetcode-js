/**
 * Given a string s and an integer k, return the maximum number of vowel letters
 * in any substring of s with length k.
 *
 * Vowel letters in English are 'a', 'e', 'i', 'o', and 'u'.
 *
 * Constraints:
 *    1 <= s.length <= 10^5
 *    s consists of lowercase English letters.
 *    1 <= k <= s.length
 */

/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
const maxVowels = (inputString, windowLength) => {
  const VOWELS = new Set(['a', 'e', 'i', 'o', 'u'])
  const isVowel = (letter) => VOWELS.has(letter)

  let numVowels = 0
  for (let end = 0; end < windowLength; end++) {
    if (isVowel(inputString[end])) numVowels++
  }

  let maxNumVowels = numVowels
  for (let end = windowLength; end < inputString.length; end++) {
    if (isVowel(inputString[end - windowLength])) numVowels--
    if (isVowel(inputString[end])) numVowels++
    if (numVowels == windowLength) return windowLength
    maxNumVowels = Math.max(maxNumVowels, numVowels)
  }

  return maxNumVowels
}

inputString = 'abciiidef'
windowLength = 3
// Expected: 3

// inputString = 'aeiou'
// windowLength = 2
// Expected: 2

// inputString = 'leetcode'
// windowLength = 3
// Expected: 2

console.log(maxVowels(inputString, windowLength))
