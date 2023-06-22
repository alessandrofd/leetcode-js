/*
Given a string s and a dictionary of strings wordDict, return true if s can be segmented into a space-separated sequence of one or more dictionary words.

Note that the same word in the dictionary may be reused multiple times in the segmentation.


Constraints:
    1 <= s.length <= 300
    1 <= wordDict.length <= 1000
    1 <= wordDict[i].length <= 20
    s and wordDict[i] consist of only lowercase English letters.
    All the strings of wordDict are unique.
*/

/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
// Approach 1: Brute Force - TLE
const wordBreak_bruteForce = (s, wordDict) => {
  const set = new Set(wordDict)

  const find = (start) => {
    if (start === s.length) return true
    for (let end = start + 1; end <= s.length; end++) {
      if (set.has(s.slice(start, end)) && find(end)) return true
    }
    return false
  }

  return find(0)
}

// Approach 2: Recursion with memoization
const wordBreak_recursionMemoization = (s, wordDict) => {
  const n = s.length
  const set = new Set(wordDict)
  const memo = []

  const find = (start) => {
    if (start == n) return true
    if (memo[start] !== undefined) return memo[start]

    for (let end = start + 1; end <= n; end++) {
      if ((memo[start] = set.has(s.slice(start, end)) && find(end)))
        return (memo[start] = true)
    }
    return (memo[start] = false)
  }

  return find(0, [])
}

// Approach 3: Using Breadth-First-Search
const wordBreak_BFS = (s, wordDict) => {
  const set = new Set(wordDict)
  const visited = new Set()

  const queue = [0]
  while (queue.length) {
    const start = queue.shift()
    if (start === s.length) return true
    if (visited.has(start)) continue
    for (let end = start + 1; end <= s.length; end++) {
      if (set.has(s.slice(start, end))) {
        queue.push(end)
      }
    }
    visited.add(start)
  }
  return false
}

// Approach 4: Using Dynamic Programming
/*
A programação dinâmica é construída tendo como parâmentro o comprimento das substrings que atendem os requisitos do problema. A partir da substring de comprimento 0 - que, por definição, atende ao enunciado do problema, percorremos todo o comprimento da string. A cada passo verificamos se há alguma combinação de substrings anteriores que podem ser compostas a partir das palavras do dicionário e substrings que correspondam a alguma palavra do dicionário. Caso estas condições sejam atendidas, consideramos que a substring de comprimento que estamos analisando atende ao enunciado do problemas e esta se torna candidata a compor nova substring válida nas próximas iterações. Ao fim nos interessa saber se a string de comprimento igual à string original, ou seja, a própria string original é válida, pois pode ser formada por substrings menores consideradas válidas em iterações anteriores e alguma palavra no dicionário.
*/
const wordBreak_DP = (s, wordDict) => {
  const n = s.length
  const set = new Set(wordDict)
  const dp = [true]

  for (let i = 1; i <= n; i++) {
    for (let j = 0; j < i; j++) {
      if (dp[j] && set.has(s.slice(j, i))) {
        dp[i] = true
        break
      }
    }
  }
  return !!dp[n]
}

let s = 'leetcode'
let wordDict = ['leet', 'code']
// Output: true

s = 'applepenapple'
wordDict = ['apple', 'pen']
// Output: true

s = 'catsandog'
wordDict = ['cats', 'dog', 'sand', 'and', 'cat']
// Output: false

console.log(wordBreak_bruteForce(s, wordDict))
console.log(wordBreak_recursionMemoization(s, wordDict))
console.log(wordBreak_BFS(s, wordDict))
console.log(wordBreak_DP(s, wordDict))
