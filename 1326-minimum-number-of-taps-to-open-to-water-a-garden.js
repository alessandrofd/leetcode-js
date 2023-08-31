/**
 * There is a one-dimensional garden on the x-axis. The garden starts at the
 * point 0 and ends at the point n. (i.e The length of the garden is n).
 *
 * There are n + 1 taps located at points [0, 1, ..., n] in the garden.
 *
 * Given an integer n and an integer array ranges of length n + 1 where
 * ranges[i] (0-indexed) means the i-th tap can water the area
 * [i - ranges[i], i + ranges[i]] if it was open.
 *
 * Return the minimum number of taps that should be open to water the whole
 * garden, If the garden cannot be watered return -1.
 *
 * Constraints:
 *    1 <= n <= 10^4
 *    ranges.length == n + 1
 *    0 <= ranges[i] <= 100
 */

/**
 * @param {number} n
 * @param {number[]} ranges
 * @return {number}
 */
const minTaps_greedy = (n, ranges) => {
  const maxReach = new Array(n + 1).fill(0)
  ranges.forEach((range, i) => {
    const start = Math.max(0, i - range)
    const end = Math.min(n, i + range)
    maxReach[start] = Math.max(maxReach[start], end)
  })

  /**
   * A interação entre currEnd, nextEnd e o vetor maxReach permite que selecio-
   * nemos a torneira com maior alcance dentro da área já irrigada. maxReach[i]
   * nos fornece a maior posição final alcançada por todas as torneiras cuja
   * posição inicial seja i.
   *
   * O laço abaixo na verdade implementa dois laços. Um evidente, em que i e
   * nextEnd são sempre atualizados. E um mais longo em que taps e currEnd são
   * atualizados apenas quando todas as torneiras dentro da área previamente
   * irrigada (cujo limite é expresso por currEnd) forem analisadas.
   *
   */

  let taps = 0
  let currEnd = 0
  let nextEnd = 0
  for (let i = 0; i <= n; i++) {
    if (i > nextEnd) return -1
    if (i > currEnd) {
      taps += 1
      currEnd = nextEnd
    }

    nextEnd = Math.max(nextEnd, maxReach[i])
  }

  return taps
}

/**
 * @param {number} n
 * @param {number[]} ranges
 * @return {number}
 */
const minTaps_dp = (n, ranges) => {
  const dp = new Array(n + 1).fill(Infinity)
  dp[0] = 0

  // Só a posição final é atualizada com a quantidade mínima de torneiras, pois
  // o laço for(j) garante que nas torneiras subsequentes o valor seja aproveitado.
  // Imagino que, se fossem atualizados todas as posições alcançadas pela torneira,
  // o resultado ainda seria o mesmo. No entanto, é desnecessário e impacta, em
  // última análise no desempenho da rotina.

  for (let i = 0; i < ranges.length; i++) {
    const start = Math.max(0, i - ranges[i])
    const end = Math.min(n, i + ranges[i])
    for (let j = start; j <= end; j++) {
      dp[end] = Math.min(dp[end], dp[j] + 1)
    }
  }

  return dp[n] === Infinity ? -1 : dp[n]
}

exports.minTaps_dp = minTaps_dp
exports.minTaps_greedy = minTaps_greedy

// prettier-ignore
const funcs = [
  minTaps_greedy,
  minTaps_dp,
]

const data = [
  // [5, [3, 4, 1, 1, 0, 0], 1],
  // [3, [0, 0, 0, 0], -1],
  [7, [1, 2, 1, 0, 2, 1, 0, 1], 3],
  // [
  //   35,
  //   [
  //     1, 0, 4, 0, 4, 1, 4, 3, 1, 1, 1, 2, 1, 4, 0, 3, 0, 3, 0, 3, 0, 5, 3, 0, 0,
  //     1, 2, 1, 2, 4, 3, 0, 1, 0, 5, 2,
  //   ],
  //   6,
  // ],
]

for (const func of funcs) {
  for (const [n, ranges, expected] of data) {
    console.log(func(n, ranges) === expected)
  }
}
