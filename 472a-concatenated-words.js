/*
Given an array of strings words (without duplicates), return all the concatenated words in the given list of words.

A concatenated word is defined as a string that is comprised entirely of at least two shorter words in the given array.

Constraints:
    1 <= words.length <= 10^4
    1 <= words[i].length <= 30
    words[i] consists of only lowercase English letters.
    All the strings of words are unique.
    1 <= sum(words[i].length) <= 10^5
*/

/**
 * @param {string[]} words
 * @return {string[]}
 */
// Approach 1: Dynamic Programming
const findAllConcatenatedWordsInADict_DP = (words) => {}

// Approach 2: DFS
const findAllConcatenatedWordsInADict_DFS = (words) => {}

// Approach 3: BFS
const findAllConcatenatedWordsInADict_BFS = (words) => {}

let words = [
  'cat',
  'cats',
  'catsdogcats',
  'dog',
  'dogcatsdog',
  'hippopotamuses',
  'rat',
  'ratcatdogcat',
]
// Output: ["catsdogcats","dogcatsdog","ratcatdogcat"]

words = ['cat', 'dog', 'catdog']
// Output: ["catdog"]

console.log(findAllConcatenatedWordsInADict_DP(words))
console.log(findAllConcatenatedWordsInADict_DFS(words))
console.log(findAllConcatenatedWordsInADict_BFS(words))
