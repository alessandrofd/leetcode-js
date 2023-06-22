/**
 * There are n piles of coins on a table. Each pile consists of a positive
 * number of coins of assorted denominations.
 *
 * In one move, you can choose any coin on top of any pile, remove it, and add
 * it to your wallet.
 *
 * Given a list piles, where piles[i] is a list of integers denoting
 * the composition of the ith pile from top to bottom, and a positive integer k,
 * return the maximum total value of coins you can have in your wallet if you
 * choose exactly k coins optimally.
 *
 * Constraints:
 *    n == piles.length
 *    1 <= n <= 1000
 *    1 <= piles[i][j] <= 10^5
 *    1 <= k <= sum(piles[i].length) <= 2000
 */

/**
 * Podemos usar programação dinâmica para resolver o problema. Descreveremos
 * os resultados parciais em termos de duas dimensões, quantidade de colunas
 * usadas e quantidade de moedas selecionadas. O caso base é simples, se não
 * considerarmos nenhuma coluna, independente da quantidade de moedas, o valor
 * será sempre zero(dp[0] = [0] * k). As pilhas são percorridas da esquerda para
 * direita e a quantidade de pilhas processadas variará de uma até a quantidade
 * total de pilhas (n = pile.length). A quantidade de moedas selecionadas
 * na pilha sendo processada variará de 0 até o número máximo de moedas
 * permitidas (k). Como todas as moedas têm valores positivos o valor máximo
 * será regitrado ao processarmos todas as pilhas e selecionarmos o número
 * máximo de moedas (dp[n][k]).
 *
 * A segunda dimensão dos valores calculados corresponde à quantidade de moedas
 * selecionadas considerando todas as pilhas processadas até o momento. Isto é
 * diferente da quantidade de moedas selecionadas da pilha em processamento.
 * Primeiro porque a quantidade de moedas que podem ser selecionadas da pilha
 * está limitada à quantidade de moedas nela, que pode ser inferior à quantidade
 * de moedas selecionados de todas as pilhas até o momento (número máximo
 * de moedas selecionadas de uma pilha em uma determinada iteração =
 * min(quantidade de moedas na pilha, quantidade selecionadas naquela iteração).
 * Além disso, a cada etapa do processamento, devemos considerar a combinação
 * de moedas, de todas as pilhas até então processadas, que resultem no maior
 * valor e não necessariamente o valor total das moedas selecionadas apenas
 * da última pilha. Esta distinção é essencial para a transição da programação
 * dinâmica.
 *
 * Em cada transição, devemos analisar todas as possíveis combinações de moedas
 * selecionadas da última pilha. Logo, devemos considerar o impacto de
 * selecionarmos de 0 até o número máximo de moedas passíveis de serem
 * selecionadas da pilha, conforme discutido acima, e selecionarmos o valor
 * máximo obtido.
 *    dp[lastPile][numCoins] = max(dp[lastPile - 1][maxCoins - currCoins] + sumCoins)
 *    onde:
 *      lastPile = pilha em processamento, variará de 1 à quantidade total
 *                 de pilhas, 0 é o caso base
 *      numCoins = quantidade de moedas selecionadas, variará de 0 à maxCoins
 *      maxCoins = quantidade total de moedas possíveis de serem selecionadas
 *      currCoins = quantidade de moedas selecionadas da lastPile, variará de 0
 *                  até a quantidade máxima de moedas que podem ser selecionadas
 *                  da pilha na presente iteração (diferente de maxCoins)
 *      sumCoins = o valor total das moedas seleciondas, lastPile[0: currCoins]
 */

/**
 * @param {number[][]} piles
 * @param {number} k
 * @return {number}
 */
const maxValueOfCoins_dp = (piles, k) => {
  const n = piles.length
  const dp = new Array(n + 1).fill().map((_) => new Array(k + 1).fill(0))

  for (let i = 1; i <= n; i++) {
    for (let coins = 0; coins <= k; coins++) {
      const maxCoins = Math.min(piles[i - 1].length, coins)
      let currSum = 0
      for (let currCoins = 0; currCoins <= maxCoins; currCoins++) {
        if (currCoins > 0) currSum += piles[i - 1][currCoins - 1]
        dp[i][coins] = Math.max(
          dp[i][coins],
          dp[i - 1][coins - currCoins] + currSum
        )
      }
    }
  }
  return dp[n][k]
}

// TODO Otimização da solução de programação dinâmica - veja exemplo em Python

/**
 * Podemos também aplicar recursividade com memoization. Neste caso, a condição
 * de saída da recursão será o caso base da programação dinámica, não
 * selecionarmos nenhuma coluna, o que retorna zero. E a chamada da recursão se
 * dá na transição da programação dinâmica, o cálculo do valor total das moedas
 * selecionadas da última coluna, que depende dos valores das colunas antreiores
 * que, por sua vez, enseja uma chamada recursiva.
 */

/**
 * @param {number[][]} piles
 * @param {number} k
 * @return {number}
 */
const maxValueOfCoins_dfs = (piles, k) => {
  const n = piles.length
  const dp = new Array(n + 1).fill().map((_) => new Array(k + 1))

  const dfs = (pile, coins) => {
    if (pile === 0) return 0
    if (dp[pile][coins]) return dp[pile][coins]

    dp[pile][coins] = 0
    const maxCoins = Math.min(piles[pile - 1].length, coins)
    let currSum = 0
    for (let currCoins = 0; currCoins <= maxCoins; currCoins++) {
      if (currCoins > 0) currSum += piles[pile - 1][currCoins - 1]
      dp[pile][coins] = Math.max(
        dp[pile][coins],
        dfs(pile - 1, coins - currCoins) + currSum
      )
    }

    return dp[pile][coins]
  }

  return dfs(n, k)
}

piles = [
  [1, 100, 3],
  [7, 8, 9],
]
k = 2
// Output: 101

// piles = [[100], [100], [100], [100], [100], [100], [1, 1, 1, 1, 1, 1, 700]]
// k = 7
// Output: 706

// piles = [[37, 88], [51, 64, 65, 20, 95, 30, 26], [9, 62, 20], [44]]
// k = 9
// Output: 494

console.log(maxValueOfCoins_dp(piles, k))
console.log(maxValueOfCoins_dfs(piles, k))
