/**
 * Given an array of n integers nums, a 132 pattern is a subsequence of three
 * integers nums[i], nums[j] and nums[k] such that i < j < k and
 * nums[i] < nums[k] < nums[j].
 *
 * Return true if there is a 132 pattern in nums, otherwise, return false.
 *
 * Constraints:
 *    n == nums.length
 *    1 <= n <= 2 * 10^5
 *    -10^9 <= nums[i] <= 10^9
 */

/**
 * @param {number[]} nums
 * @return {boolean}
 */
const find132pattern_brute_force = (nums) => {
  // Approach 1: brute force - TLE
  for (let i = 0; i < nums.length - 2; i++) {
    for (let j = i + 1; j < nums.length - 1; j++) {
      for (let k = j + 1; k < nums.length; k++) {
        if (nums[k] > nums[i] && nums[j] > nums[k]) return true
      }
    }
  }
  return false
}

/**
 * @param {number[]} nums
 * @return {boolean}
 */
const find132pattern_min = (nums) => {
  // Approach 2: better brute force - min - TLE
  let minI = Infinity
  for (let j = 0; j < nums.length - 1; j++) {
    minI = Math.min(minI, nums[j])
    for (let k = j + 1; k < nums.length; k++) {
      if (nums[k] < nums[j] && minI < nums[k]) return true
    }
  }
  return false
}

/**
 * @param {number[]} nums
 * @return {boolean}
 */
const find132pattern_intervals = (nums) => {
  // Approach 3: searching intervals - TLE
  // A ideia desta solução é armazenar intervalos do vetor que sejam
  // estritamente crescentes. À medida que o vetor é percorrido o primeiro passo
  // é incrementar a lista de intervalos e o segundo e comparar o valor corrente
  // com cada um dos intervalos de forma a garantir o padrão 132

  const intervals = []
  let s = 0
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] < nums[i - 1]) {
      if (s < i - 1) intervals.push([nums[s], nums[i - 1]])
      s = i
    }

    for (let interval of intervals) {
      const [start, end] = interval
      if (nums[i] > start && nums[i] < end) return true
    }
  }
  return false
}

/**
 * @param {number[]} nums
 * @return {boolean}
 */
const find132pattern_stack = (nums) => {
  // Pilha com prefixMin
  // Inicialmente criamos um vetor prefixMin ou seja um vetor que contém em
  // suas posições não o valor acumulado do vetor original até aquela posição,
  // como é o caso do prefixSum, mas o valor mínimo do vetor original até a
  // posição em questão. Estes mínimos serão o primeiro valor do padrão 132.
  // Como o problema pede apenas a existência do padrão e não os padrões
  // propriamente ditos, o vetor prefixMin apresentará a melhor alternativa
  // possível para o a primeira posição do padrão sem considerar se há outras
  // alternativas viáveis.
  //
  // Em seguida o vetor é percorrido de trás para frente e os valores são
  // empilhados. A pilha conterá o último valor do padrão 132. Logo, antes do
  // valor ser empilhado 2 verificações são necessárias. Primeiro, caso o valor
  // no topo da pilha seja menor que o valor mínimo naquela posição, dado pelo
  // prefixMin, ele deve ser desempilhado e descartado, até que obtenhamos um
  // valor no topo da pilha que seja maior que o valor mínimo. Essa situação é
  // possível pois o valor empilhado pode ter diso o valor mínimo do vetor em
  // posições anteriores. Em seguida, caso o valor corrente, que corresponderá
  // ao segundo elemento do padrão 132, seja maior que o valor no topo da pilha,
  // estará configurado o padrão, formado, respectivamente, pelo valor do
  // prefixMin, o valor corrente e o valor no topo da pilha.

  const n = nums.length
  if (n < 3) return false

  const mins = Array(n)
  mins[0] = nums[0]
  for (let i = 1; i < n; i++) {
    mins[i] = Math.min(mins[i - 1], nums[i])
  }

  const stack = []

  for (let j = n - 1; j >= 0; j--) {
    if (nums[j] > mins[j]) {
      while (stack.length > 0 && stack.at(-1) <= mins[j]) {
        stack.pop()
      }
      if (stack.length > 0 && stack.at(-1) < nums[j]) {
        return true
      }
      stack.push(nums[j])
    }
  }

  return false
}

const funcs = [
  find132pattern_brute_force,
  find132pattern_min,
  find132pattern_intervals,
  find132pattern_stack,
]

const data = [
  [[1, 2, 3, 4], false],
  [[3, 1, 4, 2], true],
  [[-1, 3, 2, 0], true],
]

for (const func of funcs) {
  for (const [nums, expected] of data) {
    console.log(func(nums) === expected)
  }
}
