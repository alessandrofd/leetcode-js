/**
 * A chef has collected data on the satisfaction level of his n dishes. Chef can
 * cook any dish in 1 unit of time.
 *
 * Like-time coefficient of a dish is defined as the time taken to cook that
 * dish including previous dishes multiplied by its satisfaction level
 * i.e. time[i] * satisfaction[i].
 *
 * Return the maximum sum of like-time coefficient that the chef can obtain
 * after dishes preparation.
 *
 * Dishes can be prepared in any order and the chef can discard some dishes to
 * get this maximum value.
 *
 * Constraints:
 *    n == satisfaction.length
 *    1 <= n <= 500
 *    -1000 <= satisfaction[i] <= 1000
 */

/**
 * Uma das restrições que não fica clara no enunciado do problema é o chefe não
 * pode ficar indefinidamente esperando para cozinhar, ele sempre deve estar
 * preparando um prato. Além disso, presume-se também que um prato não pode ser
 * repetido. Logo, as unidades de tempo disponíveis ao chefe são dependentes da
 * quantidade de pratos - se há 5 pratos, haverá 5 unidades de tempo a serem
 * utilizadas - todas ocupadas com a preparação de um prato.
 *
 * A princípio o problema parece ser uma simples questão de ordenamento. Como
 * posicionar os pratos mais bem avaliados no final do tempo disponível para que
 * tenham um peso maior na pontuação final - basta ordená-los pela sua avaliação.
 * No entanto, devemos considerar a existência de pratos com avaliação negativa.
 * Ao incluí-los no menu, mesmo nas posições iniciais, valorizamos os pratos
 * mais bem avaliados. Entretanto, é possível que a avaliação destes pratos seja
 * tão negativa que não só anulem a vantagem obtida com os pratos melhores como
 * prejudiquem a pontuação final. Neste caso, eles deverão ser ignorados.
 *
 * Uma estratégia para resolver o problema é programação dinâmica top-down.
 * Utilizaremos uma matriz de mapas de bits representando os pratos já
 * preparados. A cada iteração, representando uma unidade de tempo,
 * selecionaremos a melhor alternativa considerando a pontuação acumulada e
 * os pratos restantes. O fato de sempre selecionarmos Para contemplarmos
 * a possibilidade de se ignorar pratos que prejudiquem a pontuação final, temos
 * que considerar como possibilidade não cozinhar nada em cada uma das
 * iterações/recursões.
 *
 * TIME LIMIT EXCEEDED
 */

/**
 * @param {number[]} satisfaction
 * @return {number}
 */
const maxSatisfaction_DPbitmap = (satisfaction) => {
  const memo = []
  const dfs = (time, bitmap) => {
    if (time === satisfaction.length + 1) return 0
    if (memo[bitmap]) return memo[bitmap]

    let maxScore = 0
    for (let dish = 0; dish < satisfaction.length; dish++) {
      if (bitmap & (1 << dish)) continue
      maxScore = Math.max(
        maxScore,
        satisfaction[dish] * time + dfs(time + 1, bitmap | (1 << dish))
      )
    }
    return (memo[bitmap] = maxScore)
  }

  return dfs(1, 0)
}

/**
 * Podemos otimizar o algoritmo ordenando antecipadamente o vetor de satisfação.
 * Neste caso podemos percorrer o vetor ordenado linearmente, reduzindo
 * a quantidade de alternativas a serem avaliadas. Como percorremos os pratos,
 * em ordem crescente de satisfação, a condição de saída da recursão será
 * o processamento do último prato. Como não avaliaremos exaustivamente todas
 * as combinações de pratos, teremos que considerar explicitamente
 * a possibilidade de não preparar um prato (por prejudicar a pontuação final).
 * Logo, a cada prato teremos duas opções, aproveitá-lo naquela unidade de tempo
 * ou não - o que corresponde a eliminá-lo da árvore de alternativas. Para
 * armazenar o resultado utilizaremos uma matriz bidimensional em que uma das
 * dimensões representará os pratos e a outra a unidade de tempo em que o prato
 * será preparado.
 */

/**
 * @param {number[]} satisfaction
 * @return {number}
 */
const maxSatisfaction_DPlinear = (satisfaction) => {
  const n = satisfaction.length
  const memo = new Array(n).fill().map((_) => [])

  satisfaction.sort((a, b) => a - b)

  const dfs = (time, dish) => {
    if (dish === n) return 0
    if (memo[dish][time]) return memo[dish][time]

    const score = Math.max(
      satisfaction[dish] * time + dfs(time + 1, dish + 1),
      dfs(time, dish + 1)
    )
    return (memo[dish][time] = score)
  }

  return dfs(1, 0)
}

/**
 * Já que ordenamos o vetor de pratos pela sua satisfação podemos utilizar uma
 * abordagem greedy. Se avaliarmos os pratos a serem preparados na ordem inversa
 * de tempo, poderemos selecionar os pratos sempre na sua ordem crescente de
 * satisfação e parar de preparar novos pratos a partir do momento em que a
 * introdução de pratos com avaliação negativa passar a prejudicar a pontuação
 * final. A multiplicação da satisfação dos pratos pela unidade de tempo é
 * simulada ao se somar à pontuação máxima acumulada a soma da satisfação dos
 * pratos preparados. Logo, saberemos que a pontuação final passará a ser
 * prejudicada pela inclusão de pratos com satisfação negativa quando esta soma
 * dos pratos preparados tornar-se negativa.
 *
 *  max + sum + satisfaction[dish] > max => sum + satisfaction[dish] > 0
 */

const maxSatisfaction = (satisfaction) => {
  const n = satisfaction.length

  satisfaction.sort((a, b) => b - a)

  let max = 0
  let sum = 0
  for (let dish = 0; dish < n && satisfaction[dish] + sum > 0; dish++) {
    sum += satisfaction[dish]
    max += sum
  }

  return max
}

let satisfaction = [-1, -8, 0, 5, -9]
// Output: 14

// satisfaction = [4, 3, 2]
// Output: 20

// satisfaction = [-1, -4, -5]
// Output: 0

console.log(maxSatisfaction(satisfaction))
