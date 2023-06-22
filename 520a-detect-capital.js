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
  if (word.length === 1) return true
  if (word.toUpperCase() === word) return true
  if (word.toLowerCase() === word) return true

  if (word[0].toUpperCase() === word[0]) {
    const slice = word.slice(1)
    if (slice.toLowerCase() === slice) return true
  }

  return false
}

// Approach 1: Character by Character
const detectCapitalUse_character = (word) => {
  // const detectCapitalUse = (word) => {
  const isLowerCase = (c) => c === c.toLowerCase()

  const start = Math.min(word.length, isLowerCase(word[0]) ? 0 : 1)
  const startCase = isLowerCase(word[start])
  for (let i = start + 1; i < word.length; i++)
    if (isLowerCase(word[i]) !== startCase) return false

  return true
}

// Approach 2: Regex
const detectCapitalUse_regex = (word) => /^[A-Z]+$|^[A-Z]?[a-z]+$/.test(word)

word = 'USA'
// Output: true

// word = 'FlaG'
// Output: false

// word = 'Leetcode'
// Output: true

// word = 'g'
// Output: true

console.log(detectCapitalUse_character(word))
console.log(detectCapitalUse_regex(word))
console.log(detectCapitalUse_wholeWord(word))
