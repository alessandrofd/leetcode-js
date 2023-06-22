/**
 * Given a string s. In one step you can insert any character at any index of
 * the string.
 *
 * Return the minimum number of steps to make s palindrome.
 *
 * A Palindrome String is one that reads the same backward as well as forward.
 *
 * Constraints:
 *    1 <= s.length <= 500
 *    s consists of lowercase English letters.
 */

/**
 * A chave para a resolução do problema é achar o comprimento da subsequência
 * palindrômica mais longa da string original. Como o problema permite inserirmos
 * qualquer caracter em qualquer posição da string, a resposta será a diferença
 * entre comprimento da string e o comprimento da subsequência palindrômica.
 */

/**
 * @param {string} s
 * @return {number}
 */
const minInsertions_recursion = (string) => {
  const n = string.length
  const memo = new Array(n + 1).fill().map((_) => new Array(n + 1))
  const reverse = string.split('').reverse().join('')

  const lcs = (m, n) => {
    if (m === 0 || n === 0) return 0
    if (memo[m][n]) return memo[m][n]

    if (string[m - 1] === reverse[n - 1])
      return (memo[m][n] = 1 + lcs(m - 1, n - 1))

    return Math.max(lcs(m - 1, n), lcs(m, n - 1))
  }

  return n - lcs(n, n)
}

/**
 * Uma solução utilizando programação dinâmica pode aproveitar os elementos da
 * solução recursiva. O objetivo continua o mesmo, achar o comprimento da mais
 * longa subsequência palidrômica e retornar a diferença entre ela e o
 * comprimento da string original. A programação dinâmica requrerá duas
 * dimensãoes, os comprimentos das strings normais e invertidas, tal qual o
 * memoization da solução recursiva. O caso base corresponderá à condição de
 * saída da recursão, strings com comprimento 0 produzem subsequências também de
 * comprimento 0. Por fim, as transições da DP corresponderão ao processamento
 * feito a cada iteração recursiva:
 *    se string[i] === reverse[j] => dp[i][j] = dp[i-1][j-1]
 *    senão => dp[i][j] = max(dp[i-1][j], dp[i][j-1])
 *    onde i e j são ponteiros para a string original e invertida,
 *    respectivamente, limitados ao comprimento total da string original
 *
 * O comprimento da mais comprida subsequência palindrômica será dado por
 * dp[n][n], onde n é o comprimento da string original
 */

/**
 * @param {string} s
 * @return {number}
 */
const minInsertions_dp = (string) => {
  const n = string.length
  const dp = new Array(n + 1).fill().map((_) => new Array(n + 1).fill(0))
  const reverse = string.split('').reverse().join('')

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] =
        string[i - 1] === reverse[j - 1]
          ? 1 + dp[i - 1][j - 1]
          : Math.max(dp[i - 1][j], dp[i][j - 1])
    }
  }

  return n - dp[n][n]
}

s = 'zzazz'
// Output: 0

s = 'mbadm'
// Output: 2

s = 'leetcode'
// Output: 5

console.log(minInsertions_recursion(s))
console.log(minInsertions_dp(s))
