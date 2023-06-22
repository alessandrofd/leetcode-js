/**
 * Alice and Bob continue their games with piles of stones.  There are a number
 * of piles arranged in a row, and each pile has a positive integer number of
 * stones piles[i].  The objective of the game is to end with the most stones.
 *
 * Alice and Bob take turns, with Alice starting first.  Initially, M = 1.
 *
 * On each player's turn, that player can take all the stones in the first X
 * remaining piles, where 1 <= X <= 2M.  Then, we set M = max(M, X).
 *
 * The game continues until all the stones have been taken.
 *
 * Assuming Alice and Bob play optimally, return the maximum number of stones
 * Alice can get.
 *
 * Constraints:
 *    1 <= piles.length <= 100
 *    1 <= piles[i] <= 10^4
 */

/**
 * Cuidado com a regra de M, à primeira vista ele é relativa à posição dos
 * jogadores. No entanto, M é determinado pelas escolhas sem levar em
 * consideração a posição. Por exemplo, na primeira rodada em que M = 1, e
 * a posição é 1 se Alice escolher capturar apenas 1 pilha de pedras, X será 1,
 * a posição 2 e M = max(M, X) = 1. Logo, Bob estará na posição 2, mas M
 * continuará como 1. Se considerarmos a posição 0 ao invés de 1, o resultado
 * será o mesmo, basta iterarmos mais uma vez Bob na posição 1 (0-indexed) com
 * M = 1 (Alice já jogou e optou por capturar apenas 1 pilha) escolhe caputurar
 * apenas uma pilha. O resultado será Alice na posição 2 (0-indexed) com M ainda
 * igual a 1
 */

/**
 *  Recursão
 * Podemos definir a função f(player, i, m) que retornará a quantidade de pedras
 * de Alice. "player" será igual a 0 caso seja a vez da Alice e 1 caso seja a
 * vez de Bob. O jodador percorrerá todas as possibilidades de jogada a partir
 * da posição i e podendo capturar a quantidade de pilhas variando de 1 a
 * (2 * m), limitado à quantidade de pilhas restantes. Alice tentará maximizar
 * a quantidade de pedras que tem e Bob tentará minimizar a quantidade de pedras
 * de Alice. Essa distinção é importante pois a função retornará tão somente
 * a quantidade de pedras de Alice. A condição de sáida da recursão é termos
 * consumido todas as pilhas de pedras, ou seja i == quantidade de pilhas.
 *
 * O processo pode ser otimizado com memoization.
 *
 */

/**
 * @param {number[]} piles
 * @return {number}
 */
const stoneGameII_recurse = (piles) => {
  const n = piles.length
  const memo = new Array(2)
    .fill()
    .map((_) => new Array(n).fill().map((_) => new Array(n)))

  const f = (player, i, m) => {
    // Função f retorna a quantidade de pedras de Alice
    if (i === n) return 0
    if (memo[player][i][m]) return memo[player][i][m]

    let result = player === 0 ? 0 : 1e6 + 1
    let stones = 0
    for (let taken = 1; taken <= Math.min(2 * m, n - i); taken++) {
      stones += piles[i + taken - 1]
      if (player == 0) {
        // Alice - como a função retorna a quantidade de pedras de Alice,
        // o total de pedras - stone - é adicionado à chamda recursiva
        // Alice tenta maximizar a quantidade de pedras que tem.
        result = Math.max(result, stones + f(1, i + taken, Math.max(m, taken)))
      } else {
        // Bob - não soma as pedras caputuradas, apenas consome as pilhas
        // Bob tenta minimizar a quantidade de pedras que Alice tem
        result = Math.min(result, f(0, i + taken, Math.max(m, taken)))
      }
    }
    return (memo[player][i][m] = result)
  }

  return f(0, 0, 1)
}

/**
 * Programação dinâmica com duas dimensões: posição nas pilhas (i) - 0-indexed
 * => 0 a (n - 1)) e quantidade máxima de pilhas disponível para ser tomada (m)
 * - limitada pela quantidade de pilhas => 1 a n).
 *
 * Condição base: o valor máximo de uma posição, quando m = n será igual ao
 * somatório de todas as pilhas daquele ponto até o final:
 * dp[i][n] = suffixSum[i]
 *
 * Transição: As pilhas serão percorridas de trás para frente. Em cada
 * posição (i) e quantidade de pilhas disponíveis (m), todas as opções de jogada
 * são avaliadas (x em função de m, limitado pela quantidade de pilhas
 * restantes n-i). O valor de cada jogada é a diferença entre o maior valor
 * daquela posição (suffixSum[i]) e o valor da posição e quantidade de pilhas
 * disponíveis da próxima jogada (já calculado por percorrermos as pilhas de
 * trás para frente). O valor da posição e quantidade de pilhas disponíveis será
 * o da jogada de maior valor.
 *
 *    for (x = 1; x <= Math.min(2*m, n-i); x++)
 *      dp[i][m] = Math.min(dp[i][m], suffixSum[i] - dp[i+x][Math.max(x, m)])
 *
 * Como o resultado especificará as condições de jogo de Alice, posição (i) = 0
 * e quantidade de pilhas disponíveis (m) = 1, não importa a indentidade dos
 * jogadores em cada posição, desde que garantamos que estejam maximizando as
 * suas opções.
 *
 * Quais são as condições que nos levam a optar por percorrer a fila de trás
 * para frente? Talvez pelo fato da função de transição não ter um caráter único
 * de maximização. Em havendo dois agentes tentando maximizar a sua posição,
 * torna-se mais fácil começa pelo final onde os graus de liberdade são
 * limitados - ao extremo a única opção na última posição é tomar a última pilha
 * e nada mais. Logo, o melhor problema situa-se no final da fila e não em seu
 * começo.
 *
 * Resultado: dp[0][1]
 */

/**
 * @param {number[]} piles
 * @return {number}
 */
const stoneGameII_dp = (piles) => {
  const n = piles.length

  const suffixSum = [...piles, 0]
  for (let i = n - 2; i >= 0; i--) suffixSum[i] += suffixSum[i + 1]

  const dp = new Array(n + 1).fill().map((_) => new Array(n + 1).fill(0))
  dp.forEach((a, i) => (a[n] = suffixSum[i]))

  for (let i = n - 1; i >= 0; i--) {
    for (let m = n - 1; m >= 1; m--) {
      for (let x = 1; x <= Math.min(2 * m, n - i); x++) {
        dp[i][m] = Math.max(dp[i][m], suffixSum[i] - dp[i + x][Math.max(m, x)])
      }
    }
  }
  return dp[0][1]
}

piles = [2, 7, 9, 4, 4]
// Expected: 10

// piles = [1, 2, 3, 4, 5, 100]
// Expected: 104

console.log(stoneGameII_recurse(piles))
console.log(stoneGameII_dp(piles))
