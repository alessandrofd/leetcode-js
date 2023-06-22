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
const wordBreak_DFS = function (s, wordDict) {}

// Approach 2: Bottom-Up Dynamic Programming
const wordBreak_BFS = function (s, wordDict) {}

const wordBreak_DP = function (s, wordDict) {}

/* Top submission: solução baseada em DFS mas que não utiliza memoization e não trabalha com arrays. Percorre toda a string e a cada recursão simula duas situações: uma em que a substring analisada forma uma palavra contida no dicionário e, portanto, é agregada a uma possível frase; e outra em que a substring não forma uma palavra válida e a ela é agregado mais um caracter para avaliação na próxima iteração.
Quando submetido, não teve desempenho melhor que as demais soluções.
*/
const wordBreak_topSubmission = (s, wordDict) => {}

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
