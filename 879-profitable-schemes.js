/**
 * There is a group of n members, and a list of various crimes they could commit.
 * The ith crime generates a profit[i] and requires group[i] members to participate
 *  in it. If a member participates in one crime, that member can't participate
 * in another crime.
 *
 * Let's call a profitable scheme any subset of these crimes that generates at
 * least minProfit profit, and the total number of members participating in that
 * subset of crimes is at most n.Return the number of schemes that can be chosen.
 * Since the answer may be very large, return it modulo 10^9 + 7.
 *
 * Constraints:
 *    1 <= n <= 100
 *    0 <= minProfit <= 100
 *    1 <= group.length <= 100
 *    1 <= group[i] <= 100
 *    profit.length == group.length
 *    0 <= profit[i] <= 100
 */

/**
 * Programaçaõ dinâmica, aparentemente toda questão difícil do LeetCode requer
 * programação dinâmica. Duas dimensões são bastante claras: os golpes avaliados
 * e a quantidade de criminosos necessária. No entanto, o problema estabelece um t
 * erceiro critério, uma lucro mínimo - o que indica a necessidade de ainda mais
 * uma dimensão, limitada ao lucro mínimo necessário.
 *
 * Uma escolha interessante é se a análise deve partir de todos os golpes
 * aplicados ou de nenhum golpe aplicado. A escolha afetará o caso base e como
 * caracterizaremos o resultado final. Caso optemos por iniciar do final, o que
 * de fato optamos para a resolução deste problemas, o caso base será que, se
 * atendido o critério de lucro mínimo, a quantidade de esquemas será 1,
 * independente da quantidade de criminosos disponíveis, e o resultado final
 * será fornecido quando atingirmos o ponto em que nenhum golpe foi aplicado
 * ainda e todos os criminosos estão disponíveis.
 *
 * Por outro lado, podemos optar por iniciar a nossa análise com nenhum golpe
 * aplicado e todos os criminosos disponíveis - situação que caracteriza o
 * resultado final na outra opção. Nesta opção, o caso base não terá relação com
 * o critério de lucro mínimo, já que o lucro será acrescido à medida que os
 * golpes forem aplicados. Logo, o caso base assume outra significado de que a
 * opção de não se aplicar qualquer golpe é uma opção válida. No entanto, esta
 * opção também estabelece que o lucro inicial será zero. Logo, todas as
 * combinações de criminosos disponíveis e lucro zero dever ser iniciada com 1.
 * O resultado final, desta forma será dado quando aplicarmos todos os golpes
 * (possíveis, dado os critérios de criminosos necessários) nas situações em que
 * atingirmos o lucro mínimo pedido.
 *
 * A transição apresenta duas possibilidades, ou não aplicamos o golpe e
 * simplesmente replicamos os valores do golpe anterior, mantendo fixos os
 * valores de criminosos utilizados e de lucro obtido. Ou aplicamos o golpe,
 * caso a quantidade de criminosos disponíveis seja suficiente.
 * O número de esquemas é a soma destas duas possibilidades.
 * Como estamos processando de trás para a frente temos que calcular todas as
 * combinações de criminosos disponíveis e lucro obtido. Isto porque não sabemos
 * quais as condições que as próximas iterações produzirão.
 *
 * Transicões:
 *  sem golpe = dp[con][criminals][profit] = dp[con + 1][criminals][profit]
 *  com golpe :
 *    if (addedCriminals <= totalCriminals)
 *      dp[con][criminals][profit] = dp[con + 1][addedCriminals][addedProfit]
 *   onde:
 *      addedCriminals = criminals + groups[con]
 *      addProfit = Math.min(minProfit, profit + profits[con])
 */

/**
 * @param {number} totalCriminals
 * @param {number} minProfit
 * @param {number[]} groups
 * @param {number[]} profits
 * @return {number}
 */
const profitableSchemes_DPTopDown = (
  totalCriminals,
  minProfit,
  groups,
  profits
) => {
  const MOD = 1e9 + 7
  const totalSchemes = profits.length
  const memo = new Array(totalSchemes + 1)
    .fill()
    .map((_) =>
      new Array(totalCriminals + 1).fill().map((_) => new Array(minProfit + 1))
    )

  const dfs = (scheme, criminals, profit) => {
    if (scheme === totalSchemes) return profit >= minProfit ? 1 : 0
    if (memo[scheme][criminals][profit]) return memo[scheme][criminals][profit]

    let ways = dfs(scheme + 1, criminals, profit)
    if (criminals + groups[scheme] <= totalCriminals) {
      ways += dfs(
        scheme + 1,
        criminals + groups[scheme],
        Math.min(minProfit, profit + profits[scheme])
      )
    }
    return (memo[scheme][criminals][profit] = ways % MOD)
  }

  return dfs(0, 0, 0)
}

/**
 * @param {number} totalCriminals
 * @param {number} minProfit
 * @param {number[]} groups
 * @param {number[]} profits
 * @return {number}
 */
const profitableSchemes_DPBottomUp = (
  totalCriminals,
  minProfit,
  groups,
  profits
) => {
  const MOD = 1e9 + 7
  const totalCons = profits.length
  const dp = new Array(totalCons + 1)
    .fill()
    .map((_) =>
      new Array(totalCriminals + 1)
        .fill()
        .map((_) => new Array(minProfit + 1).fill(0))
    )

  // Independente de quantos criminosos foram utilizados, se aplicarmos todos os
  // golpes contaremos apenas 1 esquema - isto se o critério de lucro mínimo for
  // atendido. Isto não quer dizer que haverá necessáriamente um esquema válido.
  // Como analisamos de trás para frente, todos as etapas intermediárias são
  // apenas possibilidades a serem validadadas na etapa subsequente. Logo, os
  // casos base abaixo depende de haver possibilidade de atingirmos o lucro
  // mínimo ao analisarmos o último golpe. Importante ressaltar que dp[totalCons]
  // é a situação decorrente da análise de todos os golpes.
  for (let criminals = 0; criminals <= totalCriminals; criminals++) {
    dp[totalCons][criminals][minProfit] = 1
  }

  for (let con = totalCons - 1; con >= 0; con--) {
    // Como totalCons é o caso base, 'con' aqui representa o golpe sendo analisado
    for (let criminals = 0; criminals <= totalCriminals; criminals++) {
      // 'criminals' é a quantidade de criminosos utilizados nos golpes até 'con'.
      // Apenas duas situações são factíveis: ou aplicamos o golpe ou não aplicamos
      // o golpe, ou seja serão necessários 0 ou groups[con] criminosos. No entanto,
      // como o processamento é de trás para frente, não conhecemos todas as
      // possibilidades que nos trouxeram até este ponto. Logo, todos os valores
      // da matriz (0, totalCriminals) receberão valores, apesar de que nem todos
      // serão utilizados no processamento subsequente.
      for (let profit = 0; profit <= minProfit; profit++) {
        // Da mesma forma que no laço anterior, 'profit' representa o lucro obtido
        // até o momento. E apesar de haver so dois casos, aplicar ou não o golpe,
        // todos os possíveis valores de 'profit' são calculados para possível
        // - não certa - utilização posterior.

        // Não daremos o golpe
        dp[con][criminals][profit] = dp[con + 1][criminals][profit]

        // Daremos o golpe, caso tenhamos criminosos disponíveis o suficiente
        const addedCriminals = criminals + groups[con]
        if (addedCriminals <= totalCriminals) {
          const addedProfit = Math.min(minProfit, profit + profits[con])
          dp[con][criminals][profit] += dp[con + 1][addedCriminals][addedProfit]
          dp[con][criminals][profit] %= MOD
        }
      }
    }
  }
  return dp[0][0][0]
}

/**
 * Como sempre fazemos referência ao esquema subsequente podemos otimizar o
 * algoritmo eliminando a dimensão do golpe da matriz.
 */

/**
 * @param {number} totalCriminals
 * @param {number} minProfit
 * @param {number[]} groups
 * @param {number[]} profits
 * @return {number}
 */
const profitableSchemes_DPBottomUp_spaceOpt = (
  totalCriminals,
  minProfit,
  groups,
  profits
) => {
  const MOD = 1e9 + 7
  const totalCons = profits.length
  const dp = new Array(totalCriminals + 1)
    .fill()
    .map((_) => new Array(minProfit + 1).fill(0))

  for (let criminals = 0; criminals <= totalCriminals; criminals++) {
    dp[criminals][minProfit] = 1
  }

  for (let con = totalCons - 1; con >= 0; con--) {
    for (let criminals = 0; criminals <= totalCriminals; criminals++) {
      for (let profit = 0; profit <= minProfit; profit++) {
        // Não daremos o golpe
        dp[criminals][profit] = dp[criminals][profit]

        // Daremos o golpe, caso tenhamos criminosos disponíveis o suficiente
        const addedCriminals = criminals + groups[con]
        if (addedCriminals <= totalCriminals) {
          const addedProfit = Math.min(minProfit, profit + profits[con])
          dp[criminals][profit] += dp[addedCriminals][addedProfit]
          dp[criminals][profit] %= MOD
        }
      }
    }
  }
  return dp[0][0]
}

/**
 * Começando pela situação em que nenhum golpe foi aplicado. A otimização de espaço, eliminando a dimensão do golpe, permite que apliquemos otimização no processamento das quantidades de criminosos disponíveis. Limitamos a avalição a apenas os valores que atendam a quantidade mínima de criminosos exigida pelo golpe. As quantidade inferiores de criminosos são mantidos os valores da iteração anterior.
 */

/**
 * @param {number} totalCriminals
 * @param {number} minProfit
 * @param {number[]} groups
 * @param {number[]} profits
 * @return {number}
 */
const profitableSchemes_DP = (totalCriminals, minProfit, groups, profits) => {
  const MOD = 1e9 + 7
  const totalCons = profits.length
  const dp = new Array(totalCriminals + 1)
    .fill()
    .map((_) => new Array(minProfit + 1).fill(0))

  // O caso base estabelece que não aplicar um golpe é uma opção válida, mas que
  // não produz lucro.
  for (let criminals = 0; criminals <= totalCriminals; criminals++) {
    dp[criminals][0] = 1
  }

  for (let con = 0; con < totalCons; con++) {
    for (
      let criminals = totalCriminals;
      criminals >= groups[con];
      criminals--
    ) {
      for (let profit = minProfit; profit >= 0; profit--) {
        // Não daremos o golpe - a linha de baixo não é necessária já que sempre
        // consideraremos a situação em que não aplicaremos o golpe
        // dp[criminals][profit] = dp[criminals][profit]

        // Daremos o golpe, não precisa testar se há criminosos suficientes pois
        // o laço encerra-se com o número mínimo de criminosos para aplicar o golpe
        const prevCriminals = criminals - groups[con]
        const prevProfit = Math.max(0, profit - profits[con])
        dp[criminals][profit] += dp[prevCriminals][prevProfit]
        dp[criminals][profit] %= MOD
      }
    }
  }

  return dp[totalCriminals][minProfit]
}

n = 5
minProfit = 3
group = [2, 2]
profit = [2, 3]
// Output: 2

// n = 10
// minProfit = 5
// group = [2, 3, 5]
// profit = [6, 7, 8]
// Output: 7

// console.log(profitableSchemes_DPTopDown(n, minProfit, group, profit))
// console.log(profitableSchemes_DPBottomUp(n, minProfit, group, profit))
// console.log(profitableSchemes_DPBottomUp_spaceOpt(n, minProfit, group, profit))
console.log(profitableSchemes_DP(n, minProfit, group, profit))
