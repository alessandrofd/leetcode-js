/**
 * You are given a 0-indexed array of integers nums of length n. You are
 * initially positioned at nums[0].
 *
 * Each element nums[i] represents the maximum length of a forward jump from
 * index i. In other words, if you are at nums[i], you can jump to any
 * nums[i + j] where:
 *
 *    0 <= j <= nums[i] and
 *    i + j < n
 *
 * Return the minimum number of jumps to reach nums[n - 1]. The test cases are
 *  generated such that you can reach nums[n - 1].
 *
 * Constraints:
 *    1 <= nums.length <= 10^4
 *    0 <= nums[i] <= 1000
 */

/**
 * @param {number[]} nums
 * @return {number}
 */

const jump_dfs = (nums, square = 0, memo = []) => {
  const n = nums.length
  if (n === 1) return 0
  if (square === n - 1) return 0
  if (memo[square]) return memo[square]

  memo[square] = Infinity
  for (let i = square + 1; i <= Math.min(square + nums[square], n - 1); i++) {
    memo[square] = Math.min(memo[square], jump_dfs(nums, i, memo))
  }
  return ++memo[square]
}

// Greedy
// Não é necessário saber quais quadrados foram percorridos. Como o valor de
// cada quadrado nos dá o limite do salto, basta termos este limite, o salto
// mais comprido possível, como referência. Independentemente da escolha que
// fizermos, quanto ao comprimento do salto, ao menos o limite será alcançado.
// Quando avaliarmos o quadrado atingido pelo limite, atualizamos o limite com o
// valor máximo de todas as opções anteriores (incluindo a do limite em si)
// O número mínimo de saltos é garantido pois só o atualizamos quando
// atualizamos o limite, logo sempre maximizamos o efeito dos saltos.

// O algoritmo avalia apenas até o penúltimo quadrado. Como o problema garante
// que há solução para se chegar ao final (o problema é estritamente um de
// otimização), não é necessário checar se o último quadrado foi atingido.
// No entanto, se não houvesse a garantia de haver solução válida, o algoritmo
// poderia ser facilmente ajustado, bastanto avaliar se o salto máximo chega ou
// ultrapassa o quadrado final.
const jump_greedy = (nums) => {
  const n = nums.length
  if (n === 1) return 0

  let jumps = 0
  let prev = 0
  let max = 0
  for (let i = 0; i < n - 1; i++) {
    max = Math.max(max, i + nums[i])
    if (i === prev) {
      jumps++
      prev = max
    }
  }

  return jumps
}

nums = [2, 3, 1, 1, 4]
// Output: 2
// Explanation: The minimum number of jumps to reach the last index is 2.
// Jump 1 step from index 0 to 1, then 3 steps to the last index.

// nums = [2, 3, 0, 1, 4]
// Output: 2

console.log(jump_dfs(nums))
console.log(jump_greedy(nums))
