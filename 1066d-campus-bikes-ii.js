/**
 * On a campus represented as a 2D grid, there are n workers and m bikes, with
 * n <= m. Each worker and bike is a 2D coordinate on this grid.
 *
 * We assign one unique bike to each worker so that the sum of the Manhattan
 * distances between each worker and their assigned bike is minimized.
 *
 * Return the minimum possible sum of Manhattan distances between each worker
 * and their assigned bike.
 *
 * The Manhattan distance between two points p1 and p2 is:
 *    Manhattan(p1, p2) = |p1.x - p2.x| + |p1.y - p2.y|.
 *
 * Constraints:
 *    n == workers.length
 *    m == bikes.length
 *    1 <= n <= m <= 10
 *    workers[i].length == 2
 *    bikes[i].length == 2
 *    0 <= workers[i][0], workers[i][1], bikes[i][0], bikes[i][1] < 1000
 *    All the workers and the bikes locations are unique.
 */

/**
 * @param {number[][]} workers
 * @param {number[][]} bikes
 * @return {number}
 */
// Approach 1: Greedy Backtracking
const assignBikes_greedyBacktracking = (workers, bikes) => {
  const calcDistance = (worker, bike) =>
    Math.abs(workers[worker][0] - bikes[bike][0]) +
    Math.abs(workers[worker][1] - bikes[bike][1])

  const bikeTaken = new Set()
  const backtrack = (worker) => {
    if (worker === workers.length) return 0

    let distance = Infinity
    for (let bike = 0; bike < bikes.length; bike++) {
      if (bikeTaken.has(bike)) continue
      bikeTaken.add(bike)
      distance = Math.min(
        distance,
        calcDistance(worker, bike) + backtrack(worker + 1)
      )
      bikeTaken.delete(bike)
    }
    return distance
  }

  return backtrack(0)
}

// Approach 2: Top-Down Dynamic Programming + BitMasking
const assignBikes_topDownDP = (workers, bikes) => {
  const calcDistance = (worker, bike) =>
    Math.abs(workers[worker][0] - bikes[bike][0]) +
    Math.abs(workers[worker][1] - bikes[bike][1])

  const memo = []
  const dfs = (worker, bitmask) => {
    if (worker === workers.length) return 0
    if (memo[bitmask]) return memo[bitmask]

    let distance = Infinity
    for (let bike = 0; bike < bikes.length; bike++) {
      if (bitmask & (1 << bike)) continue
      distance = Math.min(
        distance,
        calcDistance(worker, bike) + dfs(worker + 1, bitmask | (1 << bike))
      )
    }
    return (memo[bitmask] = distance)
  }

  return dfs(0, 0)
}

// Approach 3: Bottom-Up Dynamic Programming + BitMasking

// Para que a abordagem bottom-up funcione, para cada trabalhador adicional eu
// tenho que avaliar todas as combinações de alocação trabalhador/bicicleta com
// todas as combinações dos trabalhadores anteriores.
//
// Esta solução usa um mapa de bits para registrar essas alocações. No entanto,
// ao invés de iterar sobre o número de trabalhadores - o que seria mais
// intuitivo - a solução itera sobre o valor do mapa de bits. Logo, a situação
// em que dois trabalhadores foram alocados às bicicletas 0 e 1 - o que
// corresponde a 3 (posições 0 e 1 setadas no mapa de bits) - será avalida antes
// da alocação apenas da bicicleta 2 (que equivale a 4 no mapa de bits).
//
// No entanto, não há a possibilidade de analisarmos um número de trabalhadores
// antes de termos analisado pelo menos uma vez todos os números anteriores.
// Logo, mesmo que analisemos o mapa de bits com valor 3, que corresponde a 2
// trabalhadores com bicicletas, antes de analisarmos 4, que corresponde a
// apenas 1, já teríamos analisado 1 trabalhador quando analisamos os maps de
// bits com valores 1 e 2, ambos correspondendo, assim como o 4, a apenas 1
// trabalhador. Como o algoritmo, ao analizar uma quantidade específica de
// trabalhadores, avalia (e armazena o resultado) de todas as possibilidades de
// alocação, levando em consideração o mapa de bits que o levou até aquele
// trabalhador (o próximo trabalhador é determinado pela quantidade de bits
// setados no mapa), ele terá um efeito cumulativo, construindo a solução a
// partir de soluções anteriores, o que caracteriza a programação dinâmica
//
// Além disso, o término do processamento não se dará quando atingirmos o número
// máximo de trabalhadores (worker === workers.length), pois pode haver
// combinações em que todos os trabalhadores receberam uma bicicleta que ainda
// não foram avaliadas. O processamento apenas se esgotará quando todas as
// possibilidade do mapa de bits forem analisadas. Isto porque o número de
// bicicletas é superior ao número de trabalhadores.

const assignBikes_bottomUpDP = (workers, bikes) => {
  const calcDistance = (worker, bike) =>
    Math.abs(workers[worker][0] - bikes[bike][0]) +
    Math.abs(workers[worker][1] - bikes[bike][1])

  const countWorkersWithBikes = (bitmap) => {
    let count = 0
    while (bitmap) {
      count++
      bitmap &= bitmap - 1
    }
    return count
  }

  let shortestDistance = Infinity

  const memo = new Array(1 << bikes.length).fill(Infinity)
  memo[0] = 0

  for (let mask = 0; mask < 1 << bikes.length; mask++) {
    const worker = countWorkersWithBikes(mask)
    if (worker === workers.length) {
      shortestDistance = Math.min(shortestDistance, memo[mask])
      continue
    }

    for (let bike = 0; bike < bikes.length; bike++) {
      if (mask & (1 << bike)) continue
      const newMask = mask | (1 << bike)
      memo[newMask] = Math.min(
        memo[newMask],
        calcDistance(worker, bike) + memo[mask]
      )
    }
  }
  return shortestDistance
}

// Approach 4: Priority Queue (Similar to Dijkstra's Algorithm)

// O algoritmo de Dijkstra é normalmente usado em grafos ponderados e permite
// determinar o caminho mais curto sem ter que analisar todos os caminhos possíveis.
// Ele consegue isto ao utilizar uma fila de prioridades. Ao analisar
// progressivamente o caminhos mais curtos (neste caso as alocações de
// bicicletas a trabalhadores mais eficientes), ignora-se as alternativas mais
// custosas, até que se chegue ao destino (ou em nossa caso, se atribua
// bicicletas a todos os trabalhadores).

import { MinPriorityQueue } from '@datastructures-js/priority-queue'
const assignBikes_priorityQueue = (workers, bikes) => {
  const calcDistance = (worker, bike) =>
    Math.abs(workers[worker][0] - bikes[bike][0]) +
    Math.abs(workers[worker][1] - bikes[bike][1])

  const countWorkersWithBikes = (bitmap) => {
    let count = 0
    while (bitmap) {
      count++
      bitmap &= bitmap - 1
    }
    return count
  }

  const queue = new MinPriorityQueue({
    priority: (assigment) => assigment.distance,
  })
  queue.enqueue({ mask: 0, distance: 0 })
  while (!queue.isEmpty()) {
    const { mask, distance } = queue.dequeue().element

    const worker = countWorkersWithBikes(mask)
    worker
    if (worker >= workers.length) return distance

    for (let bike = 0; bike < bikes.length; bike++) {
      if (mask & (1 << bike)) continue
      queue.enqueue({
        mask: mask | (1 << bike),
        distance: distance + calcDistance(worker, bike),
      })
    }
  }
}

let workers = [
  [0, 0],
  [2, 1],
]
let bikes = [
  [1, 2],
  [3, 3],
]
// Output: 6

// workers = [
//   [0, 0],
//   [1, 1],
//   [2, 0],
// ]
// bikes = [
//   [1, 0],
//   [2, 2],
//   [2, 1],
// ]
// Output: 4

// workers = [
//   [0, 0],
//   [1, 0],
//   [2, 0],
//   [3, 0],
//   [4, 0],
// ]
// bikes = [
//   [0, 999],
//   [1, 999],
//   [2, 999],
//   [3, 999],
//   [4, 999],
// ]
// Output: 4995

console.log(assignBikes_greedyBacktracking(workers, bikes))
console.log(assignBikes_topDownDP(workers, bikes))
console.log(assignBikes_bottomUpDP(workers, bikes))
console.log(assignBikes_priorityQueue(workers, bikes))
