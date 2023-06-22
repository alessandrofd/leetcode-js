/**
 * Alice plays the following game, loosely based on the card game "21".
 *
 * Alice starts with 0 points and draws numbers while she has less than stopHand
 * points. During each draw, she gains an integer number of points randomly from
 * the range [1, maxCard], where maxCardValue is an integer. Each draw is
 * independent and the outcomes have equal probabilities.
 *
 * Alice stops drawing numbers when she gets stopHand or more points.
 *
 * Return the probability that Alice has maxHand or fewer points.
 *
 * Answers within 10-5 of the actual answer are considered accepted.
 *
 * Constraints:
 *    0 <= stopHand <= maxHand <= 10^4
 *    1 <= maxCard <= 10^4
 */

/**
 * Programação dinâmica, com uma única dimensão: a probabilidade do somatório de
 * cartas, limitado a um valor máximo maxHand
 * Condição inicial: 100% de probabilidade de iniciarmos com 0, probs[0] = 1
 * Transição: A cada mão há um subconjunto de cartas válidas:
 *    hand - card >= 0 => card <= hand
 *    hand - card < stopHand => card > hand - stopHand
 * Em havendo uma carta válida:
 *    probs[hand] += probs[hand - card] / maxCard
 * que corresponde à prabilidade da mão anterior vezes a probabilidade de se
 * tirar a carta em questão. Dada que a probabilidade entre as cartas é uniforme,
 * a probabilidade de uma carta específica é (1/maxCard)
 * Resultado: somatório das probabilidades entre stopHand e maxHand
 */

/**
 * @param {number} maxHand
 * @param {number} stopHand
 * @param {number} maxCardValue
 * @return {number}
 */
const new21Game_dp = (maxHand, stopHand, maxCard) => {
  const probs = new Array(maxHand + 1).fill(0)
  probs[0] = 1

  for (let hand = 1; hand <= maxHand; hand++) {
    // hand - card >= 0 => card <= hand
    // hand - card < stopHand => card > hand - stopHand
    for (
      let card = Math.max(1, hand - stopHand + 1);
      card <= Math.min(maxCard, hand);
      card++
    ) {
      probs[hand] += probs[hand - card] / maxCard
    }
  }

  result = probs
    .slice(stopHand, maxHand + 1)
    .reduce((acc, prob) => (acc += prob))
  return result
}

/**
 * Como o problema pede a probabilidade de uma mão ser igual ou menor que um
 *  determinado valor, a mão vazia, ou seja stopHand == 0, terá 100% de
 * probabilidade de ser menor que qualquer valor. Da mesma forma se o valor
 * limite pedido for maior que qualquer mão possível, considerando a condição de
 * parada, ou seja, maxHand >= stopHand + maxCard, a probabilidade também será
 * de 100%.
 *
 * A probabilidade de uma mão é o somatório das probabilidades das mãos que a
 * antecedem. Estas mãos anteriores devem estar distantes apenas uma carta da
 * mão cuja probabilidade estamos calculando. Logo, há maxCard mãos e a
 * probabilidade que cada mão desta alcance a mão atual é a probabilidade de se
 * tirar a carta cujo valor represente a diferença entre elas, ou seja
 * 1 / maxCard. Portanto, a probabilidade de uma mão é sumProb/maxCard, onde
 * sumProb é o somatório das probabilidades das mãos anteriores.
 *
 * O somatório é uma janela deslizante. Logo, a cada mão o somatório deve ser
 * atualizado, somando a ele a probabilidade atual e descartando aquela que não
 * mais influenciará os cálculos futuros.
 *
 * O somatório inicial limita-se à condição inicial da programação dinâmica, ou
 * seja plena certeza que a mão sem qualquer carta tem valor 0 - probs[0] = 1.
 * À medida em que novas probabilidades são calculadas, a janela deslizante de
 * comprimento máximo maxCard vai sendo formada. Uma vez que atinjamos o valor
 * de parada - stopHand - paramos de acrescentar novas probabilidades ao
 * somatório e a janela deslizante vai encolhendo até compreender uma única
 * probabilidade - probs[stopHand-1]. A última probabilidade não nula, portanto
 * será probs[stopHand - 1 + maxCard], independentemente do valor de maxHand.
 */

/**
 * @param {number} maxHand
 * @param {number} stopHand
 * @param {number} maxCardValue
 * @return {number}
 */
const new21Game_dp_optimized = (maxHand, stopHand, maxCard) => {
  if (stopHand == 0) return 1
  if (maxHand >= stopHand + maxCard) return 1

  const probs = new Array(maxHand + 1).fill(0)
  probs[0] = 1

  let sumProbs = probs[0]

  for (let hand = 1; hand <= maxHand; hand++) {
    probs[hand] = sumProbs / maxCard
    if (hand < stopHand) sumProbs += probs[hand]
    if (hand >= maxCard) sumProbs -= probs[hand - maxCard]
  }

  result = probs
    .slice(stopHand, maxHand + 1)
    .reduce((acc, prob) => (acc += prob))
  return result
}

maxHand = 10
stopHand = 1
maxCard = 10
// Expected: 1.00000

maxHand = 6
stopHand = 1
maxCard = 10
// Expected: 0.60000

maxHand = 21
stopHand = 17
maxCard = 10
// Expected: 0.73278

console.log(new21Game_dp(maxHand, stopHand, maxCard).toFixed(4))
console.log(new21Game_dp_optimized(maxHand, stopHand, maxCard).toFixed(4))
