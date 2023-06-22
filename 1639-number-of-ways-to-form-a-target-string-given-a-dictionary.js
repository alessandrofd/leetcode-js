/**
 * You are given a list of strings of the same length words and a string target.
 *
 * Your task is to form target using the given words under the following rules:
 *
 *    target should be formed from left to right.
 *
 *    To form the ith character (0-indexed) of target, you can choose
 *    the kth character of the jth string in words if target[i] = words[j][k].
 *
 *    Once you use the kth character of the jth string of words, you can no
 *    longer use the xth character of any string in words where x <= k. In other
 *    words, all characters to the left of or at index k become unusuable for
 *    every string.
 *
 *    Repeat the process until you form the string target.
 *
 * Notice that you can use multiple characters from the same string in words
 * provided the conditions above are met.
 *
 * Return the number of ways to form target from words. Since the answer may be
 * too large, return it modulo 10^9 + 7.
 *
 * Constraints:
 *    1 <= words.length <= 1000
 *    1 <= words[i].length <= 1000
 *    All strings in words have the same length.
 *    1 <= target.length <= 1000
 *    words[i] and target contain only lowercase English letters.
 */

/**
 * Programação dinâmica
 * Podemos considerar as palavras como uma matriz
 *
 * Duas dimensões: posição da letra de alvo e a quantidade de colunas da matriz
 * de palavras das quais selecionamos letras para formar o alvo
 *
 * Caso base: Se não utilizarmos nenhuma coluna a quantidade de alternativas
 * será 0 => dp[0] = [0] * quantidade de letras em target
 *
 * Transição: dp[coluna][letra] = dp[coluna-1][letra] + (dp[coluna-1][letra-1] * somatório de palavras[*][coluna] == alvo[letra])
 *
 * Resultado final: somatário de dp[quantidade de colunas][comprimento de target]
 *
 * Otimizar a contagem do somatário de alternativas em cada coluna por meio de
 * uma tabela de frequências se letras em cada coluna. Limitar o laço de colunas
 * ao valor mínimo entre a coluna analisada e a quantidade de letras
 */

/**
 * @param {string[]} words
 * @param {string} target
 * @return {number}
 */
const numWays_dp = (words, target) => {
  const MOD = 1e9 + 7

  const n = target.length
  const rows = words.length
  const cols = words[0].length

  const dp = new Array(cols + 1).fill().map((_) => new Array(n).fill(0))

  const freqs = new Array(cols).fill().map((_) => new Map())
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const map = freqs[col]
      const letter = words[row][col]
      map.set(letter, (map.get(letter) ?? 0) + 1)
    }
  }

  for (let col = 1; col <= cols; col++) {
    for (let letter = 0; letter < Math.min(n, col); letter++) {
      let freq = freqs[col - 1].get(target[letter]) ?? 0
      let product = letter === 0 ? freq : dp[col - 1][letter - 1] * freq

      dp[col][letter] = (dp[col - 1][letter] + product) % MOD
    }
  }
  return dp[cols][n - 1]
}

/**
 * DFS utilizando os casos base da DP como condições de saída da recursão e as
 *  transições como retorno da função recursiva
 */

/**
 * @param {string[]} words
 * @param {string} target
 * @return {number}
 */
const numWays = (words, target) => {
  const MOD = 1e9 + 7

  const n = target.length
  const rows = words.length
  const cols = words[0].length

  const memo = new Array(cols).fill().map((_) => new Array(n))

  const freqs = new Array(cols).fill().map((_) => new Map())
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const map = freqs[col]
      const letter = words[row][col]
      map.set(letter, (map.get(letter) ?? 0) + 1)
    }
  }

  const dfs = (col, letter) => {
    if (col < 0 || col < letter) return 0
    if (memo[col][letter]) return memo[col][letter]

    const freq = freqs[col].get(target[letter]) ?? 0
    const product =
      freq === 0 ? 0 : letter === 0 ? freq : dfs(col - 1, letter - 1) * freq
    memo[col][letter] = (dfs(col - 1, letter) + product) % MOD

    return memo[col][letter]
  }

  return dfs(cols - 1, n - 1)
}

words = ['acca', 'bbbb', 'caca']
target = 'aba'
// Output: 6

// words = ['abba', 'baab']
// target = 'bab'
Output: 4

console.log(numWays(words, target))
