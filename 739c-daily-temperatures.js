/**
 * Given an array of integers temperatures represents the daily temperatures,
 * return an array answer such that answer[i] is the number of days you have to
 * wait after the ith day to get a warmer temperature. If there is no future day
 * for which this is possible, keep answer[i] == 0 instead.
 *
 * Constraints:
 *    1 <= temperatures.length <= 10^5
 *    30 <= temperatures[i] <= 100
 *
 */

/**
 * @param {number[]} temperatures
 * @return {number[]}
 */
// Approach 1: Monotonic Stack
const dailyTemperatures_monotonicStack = (temps) => {
  const result = new Array(temps.length).fill(0)
  const stack = []
  for (let i = 0; i < temps.length; i++) {
    while (stack.length && temps[i] > temps[stack.at(-1)]) {
      const j = stack.pop()
      result[j] = i - j
    }

    stack.push(i)
  }
  return result
}

// Approach 2: Array, Optimized Space - uses result to determine warmer day
//  Percorre o vetor de trás para a frente, a cada dia verifica se é o dia mais
// quente da série (neste caso o resultado é zero e não é necessário mais
// processamento), caso contrário procura pelo próximo dia mais quenta saltando
// dias a partir de resultados anteriores.
const dailyTemperatures_optimizedSpace = (temps) => {
  const n = temps.length

  const result = new Array(n).fill(0)
  let hottest = -Infinity

  for (let day = n - 1; day >= 0; day--) {
    const temp = temps[day]

    if (temp > hottest) {
      hottest = temp
      continue
    }

    let interval = 1
    while (temp >= temps[day + interval]) interval += result[day + interval]
    result[day] = interval
  }

  return result
}

temperatures = [73, 74, 75, 71, 69, 72, 76, 73]
// Output: [1, 1, 4, 2, 1, 1, 0, 0]

temperatures = [30, 40, 50, 60]
// Output: [1, 1, 1, 0]

temperatures = [30, 60, 90]
// Output: [1, 1, 0]

console.log(dailyTemperatures_monotonicStack(temperatures))
console.log(dailyTemperatures_optimizedSpace(temperatures))
