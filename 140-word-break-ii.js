/*
Given a string s and a dictionary of strings wordDict, add spaces in s to construct a sentence where each word is a valid dictionary word. Return all such possible sentences in any order.

Note that the same word in the dictionary may be reused multiple times in the segmentation.


Constraints:

1 <= s.length <= 20
1 <= wordDict.length <= 1000
1 <= wordDict[i].length <= 10
s and wordDict[i] consist of only lowercase English letters.
All the strings of wordDict are unique.
*/

/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {string[]}
 */
// Approach 1: Top-Down Dynamic Programming
const wordBreak_DFS = function (s, wordDict) {
  const n = s.length
  const dict = new Set(wordDict)

  const memo = []

  const formSentences = (start) => {
    if (start === n) return [[]]
    if (memo[start]) return memo[start]
    memo[start] = []
    for (let end = n; end > start; end--) {
      const word = s.slice(start, end)
      if (dict.has(word)) {
        for (const sentence of formSentences(end)) {
          memo[start].push([word, ...sentence])
        }
      }
    }
    return memo[start]
  }

  return formSentences(0).map((sentence) => sentence.join(' '))
}

// Approach 2: Bottom-Up Dynamic Programming
const wordBreak_BFS = function (s, wordDict) {
  const n = s.length
  const dict = new Set(wordDict)

  const result = []

  const queue = [[0, [[]]]]
  while (queue.length) {
    const [start, sentences] = queue.shift()
    if (start === n)
      sentences
        .map((sentence) => sentence.join(' '))
        .forEach((sentence) => result.push(sentence))
    for (let end = start + 1; end <= n; end++) {
      const word = s.slice(start, end)
      if (dict.has(word)) {
        const nextSentences = []
        for (const sentence of sentences)
          nextSentences.push([...sentence, word])
        queue.push([end, nextSentences])
      }
    }
  }

  return result
}

const wordBreak_DP = function (s, wordDict) {
  const n = s.length
  const dict = new Set(wordDict)

  const dp = [[[]]]
  for (let i = 1; i <= n; i++) {
    for (let j = 0; j < i; j++) {
      // No slice j representa índice
      const word = s.slice(j, i)
      // Como índice de dp[], j representa comprimento, em complemento com i
      if (dp[j] && dict.has(word)) {
        if (!dp[i]) dp[i] = []
        for (const sentence of dp[j]) dp[i].push([...sentence, word])
      }
    }
  }
  return dp[n] ? dp[n].map((sentence) => sentence.join(' ')) : []
}

/* Top submission: solução baseada em DFS mas que não utiliza memoization e não trabalha com arrays. Percorre toda a string e a cada recursão simula duas situações: uma em que a substring analisada forma uma palavra contida no dicionário e, portanto, é agregada a uma possível frase; e outra em que a substring não forma uma palavra válida e a ela é agregado mais um caracter para avaliação na próxima iteração.
Quando submetido, não teve desempenho melhor que as demais soluções.
*/
const wordBreak_topSubmission = (s, wordDict) => {
  const n = s.length
  const dict = new Set(wordDict)
  const result = []

  const helper = (word = '', index = 0, sentence = '') => {
    if (index === n) {
      if (dict.has(word)) result.push(sentence + word)
      return
    }

    if (dict.has(word)) helper(s[index], index + 1, sentence + word + ' ')
    helper(word + s[index], index + 1, sentence)
  }

  helper()
  return result
}

let s = 'catsanddog'
let wordDict = ['cat', 'cats', 'and', 'sand', 'dog']
// Output: ["cats and dog","cat sand dog"]

// s = 'pineapplepenapple'
// wordDict = ['apple', 'pen', 'applepen', 'pine', 'pineapple']
// Output: ["pine apple pen apple","pineapple pen apple","pine applepen apple"]

// s = 'catsandog'
// wordDict = ['cats', 'dog', 'sand', 'and', 'cat']
// Output: []

console.log(wordBreak_DFS(s, wordDict))
console.log(wordBreak_BFS(s, wordDict))
console.log(wordBreak_DP(s, wordDict))
console.log(wordBreak_topSubmission(s, wordDict))
