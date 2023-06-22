/**
 * You are given an array of strings words. Each element of words consists of
 * two lowercase English letters.
 *
 * Create the longest possible palindrome by selecting some elements from words
 * and concatenating them in any order. Each element can be selected at most
 * once.
 *
 * Return the length of the longest palindrome that you can create. If it is
 * impossible to create any palindrome, return 0.
 *
 * A palindrome is a string that reads the same forward and backward.
 *
 * Constraints:
 *    1 <= words.length <= 10^5
 *    words[i].length == 2
 *    words[i] consists of lowercase English letters.
 */

/**
 * @param {string[]} words
 * @return {number}
 */
// Approach 1: A Hash Map Approach
const longestPalindrome_1 = (words) => {
  const map = new Map()
  for (const word of words) map.set(word, (map.get(word) ?? 0) + 1)

  let central = 0
  let sum = 0

  for (const [word, count] of map) {
    if (word[0] === word[1]) {
      sum += ((count / 2) | 0) * 2
      if (!central && count % 2) central = true
    } else if (word[0] < word[1]) {
      const reverse = word[1] + word[0]
      sum += Math.min(count, map.get(reverse) ?? 0) * 2
    }
  }
  return (sum + (central ? 1 : 0)) * 2
}

// Approach 2: A Two-Dimensional Array Approach
const longestPalindrome = (words) => {
  const count = new Array(26).fill().map((_) => new Array(26).fill(0))
  for (const word of words)
    count[word.charCodeAt(0) - 97][word.charCodeAt(1) - 97]++

  let central = false
  let sum = 0

  for (let i = 0; i < 26; i++) {
    sum += ((count[i][i] / 2) | 0) * 2
    if (!central && count[i][i] % 2) central = true
    for (let j = i + 1; j < 26; j++)
      sum += Math.min(count[i][j], count[j][i]) * 2
  }
  return (sum + (central ? 1 : 0)) * 2
}

words = ['lc', 'cl', 'gg']
// Output: 6
// Explanation: One longest palindrome is "lc" + "gg" + "cl" = "lcggcl", of length 6.
// Note that "clgglc" is another longest palindrome that can be created.

// words = ['ab', 'ty', 'yt', 'lc', 'cl', 'ab']
// Output: 8
// Explanation: One longest palindrome is "ty" + "lc" + "cl" + "yt" = "tylcclyt", of length 8.
// Note that "lcyttycl" is another longest palindrome that can be created.

// words = ['cc', 'll', 'xx']
// Output: 2
// Explanation: One longest palindrome is "cc", of length 2.
// Note that "ll" is another longest palindrome that can be created, and so is "xx".

// words = ['bb', 'bb']
// Output: 4

console.log(longestPalindrome(words))
