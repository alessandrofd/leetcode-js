/**
 * Given a string s and a dictionary of strings wordDict, return true if s can
 * be segmented into a space-separated sequence of one or more dictionary words.
 *
 * Note that the same word in the dictionary may be reused multiple times in the
 * segmentation.
 *
 * Constraints:
 *    1 <= s.length <= 300
 *    1 <= wordDict.length <= 1000
 *    1 <= wordDict[i].length <= 20
 *    s and wordDict[i] consist of only lowercase English letters.
 *    All the strings of wordDict are unique.
 */

// Approach 1: Brute Force - TLE

/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
const wordBreak_bruteForce = (s, wordDict) => {}

// Approach 2: Recursion with memoization

/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
const wordBreak_recursionMemoization = (s, wordDict) => {}

// Approach 3: Using Breadth-First-Search

/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
const wordBreak_BFS = (s, wordDict) => {}

/**
 * Approach 4: Using Dynamic Programming
 *
 * A programação dinâmica é construída tendo como parâmentro o comprimento das
 * substrings que atendem os requisitos do problema. A partir da substring de
 * comprimento 0 - que, por definição, atende ao enunciado do problema,
 * percorremos todo o comprimento da string. A cada passo verificamos se há
 * alguma combinação de substrings anteriores que podem ser compostas a partir
 * das palavras do dicionário e substrings que correspondam a alguma palavra do
 * dicionário. Caso estas condições sejam atendidas, consideramos que a
 * substring de comprimento que estamos analisando atende ao enunciado do
 * problemas e esta se torna candidata a compor nova substring válida nas
 * próximas iterações. Ao fim nos interessa saber se a string de comprimento
 * igual à string original, ou seja, a própria string original é válida, pois
 * pode ser formada por substrings menores consideradas válidas em iterações
 * anteriores e alguma palavra no dicionário.
 */

/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
const wordBreak_DP = (s, wordDict) => {}

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
