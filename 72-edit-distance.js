/**
 * Given two strings word1 and word2, return the minimum number of operations
 * required to convert word1 to word2.
 *
 * You have the following three operations permitted on a word:
 *    Insert a character
 *    Delete a character
 *    Replace a character
 *
 * Constraints:
 *    0 <= word1.length, word2.length <= 500
 *    word1 and word2 consist of lowercase English letters.
 */

/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
const minDistance = (word1, word2) => {
  /**
   * Approach :
   * The approach here that I am using is dynamic programming. The idea is to
   * build a 2D matrix dp where dp[i][j] represents the minimum number of
   * operations required to transform the substring word1[0...i-1] into the
   * substring word2[0...j-1].
   *
   * How is Matrix built :
   * The matrix is built iteratively using the following recurrence relation:
   *
   *    If word1[i-1] == word2[j-1], then dp[i][j] = dp[i-1][j-1]. That is, no
   *    operation is required because the characters at positions i-1 and j-1
   *    are already the same.
   *
   *    Otherwise, dp[i][j] is the minimum of the following three values:
   *
   *      dp[i-1][j-1] + 1: replace the character at position i-1 in word1 with
   *      the character at position j-1 in word2.
   *
   *      dp[i-1][j] + 1: delete the character at position i-1 in word1.
   *
   *      dp[i][j-1] + 1: insert the character at position j-1 in word2 into
   *      word1 at position i.
   *
   * The base cases are:
   *
   *    dp[i][0] = i: transforming word1[0...i-1] into an empty string requires
   *    i deletions.
   *
   *    dp[0][j] = j: transforming an empty string into word2[0...j-1] requires
   *    j insertions.
   *
   * Obs: Os índices i e j na matriz dp não representam posições dentro das
   * strings a sereem transformadas. Eles representam o tamanho das strings,
   * intermediárias ou não, analisadas. Logo, o valor dp[i][j] representa a
   * quantidade de operações necessárias para transformar a substring
   * word1[0: i) na substring word2[0:j)
   */

  const m = word1.length
  const n = word2.length

  const dp = new Array(m + 1).fill().map(() => new Array(n + 1))
  for (let i = 0; i <= m; i++) dp[i][0] = i
  for (let j = 0; j <= n; j++) dp[0][j] = j

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      // A comparação abaixo pode parecer estranho pois, exceto quando i == j,
      // estamos comparando posições distintas dentro das strings. No entanto,
      // temos que considerar que a programação dinâmica parte do pressuposto
      // que a iteração anterior atende os requisitos do problema. Neste caso,
      // isto significa que operações de alteração, inclusão ou exclusão de
      // caracteres ocorreram anteriormente de forma a tornar as strings
      // idênticas até a presente iteração. Estas operações estão contabilizadas
      // na matriz dp.

      // Caso os caracteres sejam iguais, não há custo adicional para manter as
      // strings idênticas. De outra forma, temos a opção de alterar, incluir ou
      // excluir um dos caracteres. O custo de qualquer uma destas operações é
      // idêntico, o que variará será o custo acumulado para se chegar numa
      // situação válida que permita que a operação escolhida leve a uma nova
      // situação válida (strings idênticas).

      // Portanto, para que alteremos um dos caracteres é necessário que
      // partamos da situação em que as ambas substrings de comprimento de uma
      // unidade a menos, i - 1 e j - 1, sejam idênticas. Para excluirmos um
      // caracter da string word 1, o que, na prática, significa igonararmos o
      // caracter da string1 que estamos comparando, partimos das posições
      // i - 1 e j. Por fim, para incluirmos um novo caracter na string word1,
      // o que equivale a ignorarmos o caracter da string2, partimos das
      // posições i e j - 1
      if (word1[i - 1] === word2[j - 1]) dp[i][j] = dp[i - 1][j - 1]
      else dp[i][j] = Math.min(dp[i - 1][j - 1], dp[i - 1][j], dp[i][j - 1]) + 1
    }
  }
  return dp[m][n]
}

word1 = 'horse'
word2 = 'ros'
// Output: 3
// Explanation:
// horse -> rorse (replace 'h' with 'r')
// rorse -> rose (remove 'r')
// rose -> ros (remove 'e')

// word1 = 'intention'
// word2 = 'execution'
// Output: 5
// Explanation:
// intention -> inention (remove 't')
// inention -> enention (replace 'i' with 'e')
// enention -> exention (replace 'n' with 'x')
// exention -> exection (replace 'n' with 'c')
// exection -> execution (insert 'u')

console.log(minDistance(word1, word2))
