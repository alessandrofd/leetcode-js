/**
 * There are two types of soup: type A and type B. Initially, we have n ml of
 * each type of soup. There are four kinds of operations:
 *
 *    1. Serve 100 ml of soup A and 0 ml of soup B,
 *    2. Serve 75 ml of soup A and 25 ml of soup B,
 *    3. Serve 50 ml of soup A and 50 ml of soup B, and
 *    4. Serve 25 ml of soup A and 75 ml of soup B.
 *
 * When we serve some soup, we give it to someone, and we no longer have it.
 * Each turn, we will choose from the four operations with an equal probability
 * 0.25. If the remaining volume of soup is not enough to complete the operation,
 * we will serve as much as possible. We stop once we no longer have some
 * quantity of both types of soup.
 *
 * Note that we do not have an operation where all 100 ml's of soup B are used
 * first.
 *
 * Return the probability that soup A will be empty first, plus half the
 * probability that A and B become empty at the same time. Answers within 10^-5
 * f the actual answer will be accepted.
 *
 * Constraints:
 *    0 <= n <= 10^9
 */

/**
 * Programação dinâmica
 * Dimensões: Quantas porções de cada sopa ainda restam.
 * Caso base: Sopa A zerada equivale a 100% e as duas sopas zerada equivale a 50%.
 * Logo, o processo será invertido, calcularemos as probabilidades não ao servir
 * a sopa mas ao retornar a sopa
 * Transição: dp[sopaA][sopaB] += dp[sopaA - porcaoA][sopaB - porcaoB] / 4
 * (há 4 combinações possível, por isso dividir a probabilidade por 4)
 * Resultado final: dp[n][n]
 *
 * Estourou memória com ml = 660295675
 */

/**
 * @param {number} n
 * @return {number}
 */
const soupServings_bottom_up = (ml) => {
  const n = Math.ceil(ml / 25) + 1

  const dp = new Array(n).fill().map((_) => new Array(n).fill(0))
  dp[0] = new Array(n).fill(1)
  dp[0][0] = 1 / 2

  // prettier-ignore
  const servings = [ [4, 0], [3, 1], [2, 2], [1, 3], ]

  for (let soupA = 1; soupA < n; soupA++) {
    for (let soupB = 1; soupB < n; soupB++) {
      for (const [servingA, servingB] of servings) {
        dp[soupA][soupB] +=
          dp[Math.max(0, soupA - servingA)][Math.max(0, soupB - servingB)] / 4
      }
    }
  }
  return dp[n - 1][n - 1]
}

/**
 * Como as alternativas de servir sopa não são simétricas, não há a
 * possibilidade de servir 100ml da sopa B e nada da sopa A, a tedência, dadas
 * iterações suficientes é que a sopa A termine antes da sopa B. Ou seja,
 * considerando a lei dos grandes números a resposta será 1, desde que haja uma
 * quantidade de iterações que nos leve suficientemente perto de 1. O próprio
 * problema nos dá o fator de aproximação: 10:-5
 */

/**
 * @param {number} n
 * @return {number}
 */
const soupServings_bottom_up_large_numbers = (ml) => {
  const n = Math.ceil(ml / 25)

  const solve = (a, b) => {
    // prettier-ignore
    const servings = [ [4, 0], [3, 1], [2, 2], [1, 3], ]
    let result = 0
    for (const [servingA, servingB] of servings) {
      const i = Math.max(0, a - servingA)
      const j = Math.max(0, b - servingB)
      result += dp[i].get(j)
    }
    return result / 4
  }

  dp = [new Map([[0, 0.5]])]

  for (let a = 1; a <= n; a++) {
    dp[0].set(a, 1)
    dp.push(new Map([[0, 0]]))
    for (let b = 1; b <= a; b++) {
      dp[a].set(b, solve(a, b))
      dp[b].set(a, solve(b, a))
    }
    if (dp[a].get(a) > 1 - 1e-5) return 1
  }

  console.log(dp[1])

  return dp[n].get(n)
}

/**
 * @param {number} n
 * @return {number}
 */
const soupServings_top_down_large_numbers = (ml) => {
  const n = Math.ceil(ml / 25)

  dp = new Map()

  const solve = (a, b) => {
    if (a <= 0 && b <= 0) return 0.5
    if (a <= 0) return 1
    if (b <= 0) return 0

    if (dp.has(a) && dp.get(a).has(b)) return dp.get(a).get(b)

    if (!dp.has(a)) dp.set(a, new Map())

    // prettier-ignore
    const servings = [ [4, 0], [3, 1], [2, 2], [1, 3], ]

    let result = 0
    for (const [i, j] of servings) result += solve(a - i, b - j)
    result /= 4

    dp.get(a).set(b, result)
    return result
  }

  for (let i = 1; i <= n; i++) {
    if (solve(i, i) > 1 - 1e-5) return 1
  }
  return solve(n, n)
}

n = 50
// Expected: 0.62500

n = 100
// Expected: 0.71875

n = 660295675

// console.log(soupServings_bottom_up(n))
console.log(soupServings_bottom_up_large_numbers(n))
console.log(soupServings_top_down_large_numbers(n))
