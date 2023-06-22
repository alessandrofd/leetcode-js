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
const findAllConcatenatedWordsInADict_DP = (words) => {
  const dict = new Set(words)
  const result = []

  for (const word of words) {
    const n = word.length
    const dp = [true]
    for (let i = 1; i <= n; i++) {
      for (let j = i === n ? 1 : 0; j < i; j++) {
        // No dp[j], j representa comprimento, enquanto que no slice ele representa índice
        if (dp[j] && dict.has(word.slice(j, i))) {
          dp[i] = true
          break
        }
      }
    }
    if (!!dp[word.length]) result.push(word)
  }

  return result
}

// Approach 2: DFS
const findAllConcatenatedWordsInADict_DFS = (words) => {
  const dict = new Set(words)
  const result = []

  const dfs = (word, start, visited) => {
    const n = word.length

    if (start === n) return true
    if (visited.has(start)) return false
    visited.add(start)

    for (let end = n - (start === 0 ? 1 : 0); end > start; end--)
      if (dict.has(word.slice(start, end)) && dfs(word, end, visited))
        return true
  }

  for (const word of words) if (dfs(word, 0, new Set())) result.push(word)
  return result
}

// Approach 3: BFS
const findAllConcatenatedWordsInADict_BFS = (words) => {
  const dict = new Set(words)
  const result = []

  for (const word of words) {
    dict.delete(word)
    const visited = new Set()
    const queue = [0]
    while (queue.length) {
      const start = queue.shift()
      if (start === word.length) {
        result.push(word)
        break
      }
      if (visited.has(start)) continue
      visited.add(start)
      for (let end = start + 1; end <= word.length; end++)
        if (dict.has(word.slice(start, end))) queue.push(end)
    }
    dict.add(word)
  }

  return result
}

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
