/**
 * There are n gas stations along a circular route, where the amount of gas at
 * the ith station is gas[i].
 *
 * You have a car with an unlimited gas tank and it costs cost[i] of gas to
 * travel from the ith station to its next (i + 1)th station. You begin the
 * journey with an empty tank at one of the gas stations.
 *
 * Given two integer arrays gas and cost, return the starting gas station's
 * index if you can travel around the circuit once in the clockwise direction,
 * otherwise return -1. If there exists a solution, it is guaranteed to be
 * unique
 *
 * Constraints:
 *    n == gas.length == cost.length
 *    1 <= n <= 10^5
 *    0 <= gas[i], cost[i] <= 10^4
 */

/**
 * Podemos decompor a solução do problema em duas condições distintas. Primeiro,
 * do ponto de partida em diante, não podemos ficar "no negativo". Em seguida,
 * deve haver gasolina suficiente para dar a volta completa no circuito,
 * independentemente de onde começamos. Logo, percorreremos todos os pontos para
 * determinar o primeiro ponto em que a condição inicial seja atendida. Se, ao
 * final de contabilizarmos todos os pontos, a segunda condição também for
 * atendida, teremos a solução do problema.
 */

/**
 * @param {number[]} gas
 * @param {number[]} cost
 * @return {number}
 */

const canCompleteCircuit = (gas, cost) => {
  let total = 0
  let segment = 0
  let start = 0
  for (let i = 0; i < gas.length; i++) {
    const balance = gas[i] - cost[i]
    total += balance
    segment += balance
    if (segment < 0) {
      start = i + 1
      segment = 0
    }
  }
  total
  start
  return total < 0 ? -1 : start
}

gas = [1, 2, 3, 4, 5]
cost = [3, 4, 5, 1, 2]
// Output: 3

gas = [2, 3, 4]
cost = [3, 4, 3]
// Output: -1

gas = [3, 1, 1]
cost = [1, 2, 2]
// Output: 0

console.log(canCompleteCircuit(gas, cost))
