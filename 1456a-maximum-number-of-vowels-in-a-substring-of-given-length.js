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
const maxVowels = (inputString, windowLength) => {}

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
