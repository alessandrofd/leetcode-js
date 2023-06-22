/**
 * We define the usage of capitals in a word to be right when one of the
 * following cases holds:
 *    All letters in this word are capitals, like "USA".
 *    All letters in this word are not capitals, like "leetcode".
 *    Only the first letter in this word is capital, like "Google".
 *    Given a string word, return true if the usage of capitals in it is right.
 *
 * Constraints:
 *    1 <= word.length <= 100
 *    word consists of lowercase and uppercase English letters.
 */

/**
 * @param {string} word
 * @return {boolean}
 */

// Top submission: Whole word
const detectCapitalUse_wholeWord = (word) => {
  // const detectCapitalUse = (word) => {
}

// Approach 1: Character by Character
const detectCapitalUse_character = (word) => {
  // const detectCapitalUse = (word) => {
}

// Approach 2: Regex
// const detectCapitalUse_regex = (word) => {
const detectCapitalUse = (word) => {}

word = 'USA'
// Output: true

// word = 'FlaG'
// Output: false

word = 'Leetcode'
// Output: true

word = 'g'
// Output: true

console.log(detectCapitalUse(word))
