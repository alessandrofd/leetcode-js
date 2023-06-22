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
  if (word.length === 1) return true

  if (word === word.toUpperCase()) return true
  if (word === word.toLowerCase()) return true

  if (word[0] === word[0].toUpperCase()) {
    const slice = word.slice(1)
    if (slice === slice.toLowerCase()) return true
  }

  return false
}

// Approach 1: Character by Character
const detectCapitalUse_character = (word) => {
  // const detectCapitalUse = (word) => {
  if (word.length === 1) return true

  let isCapital = word[0] === word[0].toUpperCase()
  let start = 1
  if (isCapital) {
    isCapital = word[1] === word[1].toUpperCase()
    start = 2
  }

  for (let i = start; i < word.length; i++)
    if ((word[i] === word[i].toUpperCase()) !== isCapital) return false

  return true
}

// Approach 2: Regex
// const detectCapitalUse_regex = (word) => {
const detectCapitalUse = (word) => /^[A-Z]+$|^[A-Z]?[a-z]+$/.test(word)

word = 'USA'
// Output: true

// word = 'FlaG'
// Output: false

word = 'Leetcode'
// Output: true

word = 'g'
// Output: true

console.log(detectCapitalUse(word))
