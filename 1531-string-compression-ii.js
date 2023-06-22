/**
 * Run-length encoding is a string compression method that works by replacing
 * consecutive identical characters (repeated 2 or more times) with the
 * concatenation of the character and the number marking the count of the
 * characters (length of the run). For example, to compress the string "aabccc"
 * we replace "aa" by "a2" and replace "ccc" by "c3". Thus the compressed string
 * becomes "a2bc3".
 *
 * Notice that in this problem, we are not adding '1' after single characters.
 *
 * Given a string s and an integer k. You need to delete at most k characters
 * from s such that the run-length encoded version of s has minimum length.
 *
 * Find the minimum length of the run-length encoded version of s after deleting
 * at most k characters.
 *
 * Constraints:
 *    1 <= s.length <= 100
 *    0 <= k <= s.length
 *    s contains only lowercase English letters.
 */

/**
 * @param {string} string
 * @param {number} deletes
 * @return {number}
 */
// Approach 1: dynamic programming
const getLengthOfOptimalCompression_1 = (string, deletes) => {
  const memo = new Map()
  const changes = new Set([1, 9, 99])

  const dp = (index, lastChar, lastCharCount, deletesLeft) => {
    if (index === string.length) return 0

    const key = `${index}#${lastChar}#${lastCharCount}#${deletesLeft}`
    if (memo.has(key)) return memo.get(key)

    const deleteChar =
      deletesLeft > 0
        ? dp(index + 1, lastChar, lastCharCount, deletesLeft - 1)
        : Infinity

    const char = string.charCodeAt(index)
    let keepChar
    if (char === lastChar)
      keepChar =
        dp(index + 1, lastChar, lastCharCount + 1, deletesLeft) +
        (changes.has(lastCharCount) ? 1 : 0)
    else keepChar = dp(index + 1, char, 1, deletesLeft) + 1

    const result = Math.min(deleteChar, keepChar)
    memo.set(key, result)
    return result
  }

  return dp(0, -1, 0, deletes)
}

/**
 * Discussions
 * https://leetcode.com/problems/string-compression-ii/discuss/757506/Detailed-Explanation-Two-ways-of-DP-from-33-to-100
 *
 * We use dp[i][j] to denote the states, which is the best solution up until
 * s[i] with at most j characters removed.
 *
 * For each character, we want to try all the solutions with removing at most j
 * in [0, k] characters:
 *
 * A cada posição da string podemos optar por excluir ou manter o caracter em
 * questão.
 *
 * Caso optemos por excluir o caracter, basta copiarmos o valor da posição ante-
 * rior da string com uma exclusão a menos. Ou seja, caso estajamos analisando a
 * posição "i" e realizemos a "j-ésima" exclusão. O comprimento resultante,
 * dp[i][j], será o mesmo de dp[i - 1][j - 1].
 *
 * Caso mantenhamos o caracter, devemos verificar se ele não faz parte de uma
 * cadeia de caracteres iguais passíveis de serem comprimidos. Para tanto, deve-
 * percorrer toda a string desde a posição sob análise até o seu início. Os
 * caracteres iguais contíguos são somados e os diferentes são excluídos até o
 * limite permitido, a quantidade de exclusões sob análise. As exclusões são
 * importantes pois permitem que cadeias maiores sejam construídas ao se remover
 * caracteres diferentes analisado.
 *
 * Logo, teremos dois laços que percorreram a string, um externo, associado à
 * quantidade de exclusões e direcionado do início ao final da string, e um
 * interno, que inicia-se na posição do laço externo e direciona-se ao início da
 * string.
 *
 * A cada passo do laço interno computamos o menor comprimento da string compactada
 * até a posição e com a quantidade de exclusões sob análise, dados pelo laço
 * externo. O comprimento é calculado comparando-se, em um primeiro momento, o
 * resultado obtido com a decisão de se excluir o caracter e o primeiro passo do
 * laço interno e, em seguida, os resultados obtidos em cada um dos passos do
 * laço interno até que se atinja o início da string.
 *
 * Para calcularmos o comprimento de cada um dos passos do laço interno é neces-
 * sário obter o comprimento já calculado levando em consideração posiçaõa e
 * quentidade de exclusões decorrentes do processamento deste laço interno. A posi-
 * çao será a anterior à posição analisada no laço interno, que é distinta daquela
 * do laço externo. A quantidade de exclusões será a diferença entre a quantidade
 * de exclusões dadas pelo laço externo e a quantidade de exclusões realizadas
 * no laço interno para se ampliar a cadeia de caracteres iguais e contiguos.
 * Será somado a este comprimento "base" a quantidade de caracteres necessários
 * para compacter a cadeia de caracteres.
 */

// Dynamic Programming - Top-Down
const getLengthOfOptimalCompression_d = (string, deletes) => {
  const n = string.length
  const dp = new Array(n + 1)
    .fill()
    .map((_) => new Array(deletes + 1).fill(Infinity))
  dp[0].fill(0)

  const calcLen = (len) =>
    len === 0 ? 0 : len === 1 ? 1 : len < 10 ? 2 : len < 100 ? 3 : 4

  for (let i = 1; i <= n; i++) {
    for (let j = 0; j <= deletes; j++) {
      if (j > 0) dp[i][j] = dp[i - 1][j - 1]
      let deleted = 0
      let count = 0
      for (let p = i; p > 0; p--) {
        if (string[p - 1] === string[i - 1]) count++
        else if (++deleted > j) break
        dp[i][j] = Math.min(dp[i][j], dp[p - 1][j - deleted] + calcLen(count))
      }
    }
  }
  return dp[n][deletes]
}

/**
 * Estratégia bottom-up do algoritmo anterior, ou seja, utilizando recursão.
 *
 * Neste caso é importante discutir as condições de saída da recursão. Se a
 * quantidade de exclusões remanescentes for maior que a quantidade de posições
 * ainda a serem analisadas, a função retornará zero. Ou seja, todos os carac-
 * teres restantes poderão ser excluídos e o comprimento da string compactada
 * não será afetado.
 *
 * Outra condição de saída é quando a quantidade de exclusões remanescente
 * torna-se negativa. Esta condição aplica-se apenas aos casos em que se deseja
 * excluir o caracter. Quando aplicada, a condição retorna o comprimento da
 * string, que não influenciará no comprimento final. A próxima etapa do
 * algoritmo, que analisa o caso em que se deseja manter o caracter analisado,
 * considerará o trecho da string após todas as exclusões - motivo pelo qual não
 * há mais exclusões remanescentes. Além disso, as possibilidades de compressão
 * da string produzirão um comprimento mínimo que jamais superará o comprimento
 * da string inteira. Concluímos, portanto, que o valor retornado por esta
 * condição de saída da recursão é completamente inócuo.
 *
 */

// Submission - Dynamic Programming - Bottom-Up
const getLengthOfOptimalCompression = (string, totalDeletes) => {
  const n = string.length
  const table = [...string].map((_) => new Array(totalDeletes + 1).fill(-1))

  const dp = (index, deletesLeft) => {
    if (deletesLeft < 0) return n
    if (deletesLeft >= n - index) return 0

    let result = table[index][deletesLeft]
    if (result !== -1) return result

    result = dp(index + 1, deletesLeft - 1)

    let sames = 0
    let length = 0
    let deletes = 0
    for (let i = index; i < n && deletes <= deletesLeft; i++) {
      if (string[i] === string[index]) {
        sames++
        if (sames <= 2 || sames === 10 || sames === 100) length++
      } else deletes++
      result = Math.min(result, dp(i + 1, deletesLeft - deletes) + length)
    }
    table[index][deletesLeft] = result
    return result
  }
  return dp(0, totalDeletes)
}

/**
 * Os laços internos tem direções opostas em cada uma das estratégias e contrárias
 * à direção geral do algoritmos. Enquanto que o top-down constrói uma substring,
 * por meio do laço externo, a partir do início da string original - acrescendo
 * a ele cada caracter avaliado -, o loço interno percorre a substring no
 * sentido contrário. No bottom-up, por meio de recursão, as substrings a serem
 * avaliadas são construídas do final para o início da string original, e o laço
 * interno, mais uma vez, percorre a direção inversa, analisando a substring de
 * seu iníco para seu final.
 */

// TODO: Avaliar se as direçoes opostas entre os laços externos e internos foi uma
// escolha de quem desenhou o algoritmo ou se é um padrão da programação dinâmica.

s = 'aaabcccd'
k = 2
// Output: 4
// Explanation: Compressing s without deleting anything will give us "a3bc3d" of
// length 6. Deleting any of the characters 'a' or 'c' would at most decrease the
// length of the compressed string to 5, for instance delete 2 'a' then we will
// have s = "abcccd" which compressed is abc3d. Therefore, the optimal way is to
// delete 'b' and 'd', then the compressed version of s will be "a3c3" of length 4.

// s = 'aabbaa'
// k = 2
// Output: 2
// Explanation: If we delete both 'b' characters, the resulting compressed string
// would be "a4" of length 2.

// s = 'aaaaaaaaaaa'
// k = 0
// Output: 3
// Explanation: Since k is zero, we cannot delete anything. The compressed
// string is "a11" of length 3.

console.log(getLengthOfOptimalCompression(s, k))
