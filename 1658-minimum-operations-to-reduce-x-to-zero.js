/**
 * You are given an integer array nums and an integer x. In one operation, you
 * can either remove the leftmost or the rightmost element from the array nums
 * and subtract its value from x. Note that this modifies the array for future
 * operations.
 *
 * Return the minimum number of operations to reduce x to exactly 0 if it is
 * possible, otherwise, return -1.
 *
 * Constraints:
 *    1 <= nums.length <= 10^5
 *    1 <= nums[i] <= 10^4
 *    1 <= x <= 10^9
 */

/**
 * @param {number[]} nums
 * @param {number} x
 * @return {number}
 */
const minOperations = (nums, x) => {
  /* Ao invés de tentar as combinações no início e no final no array,
   * nós tentamos descobrir qual o maior subarray cuja somatória é a diferença
   * entre o valor alvo (parâmetro x) e a somatória de todos os elementos do
   * array (variável y). Para tanto o primeiro passo é transformar o array
   * fornecido em um somatório dos elementos do array original. Assim utiliza-
   * mos dois ponteiros para demarcar o subarray e o seu somatório será igual
   * a posição final do subarray, indicado pelo segundo ponteiro (variável j)
   * menos os valores descartados que será igual à posição anterior à posição
   * inicial do subarray, indicada pelo primeiro ponteiro (variável i)
   */
  const len = nums.length
  for (let i = 1; i < len; i++) nums[i] = nums[i] + nums[i - 1]
  let y = nums[len - 1] - x
  if (y < 0) return -1
  if (y === 0) return len

  let best = 0
  for (let i = -1, j = (l = 0); i < len - best && l <= x; l = nums[++i]) {
    while (nums[j] - l < y) j++
    if (nums[j] - l === y) best = Math.max(best, j - i)
  }

  return best > 0 ? len - best : -1
}

// prettier-ignore
const funcs = [ 
  minOperations
]

const data = [
  [[1, 1, 4, 2, 3], 5, 2],
  [[5, 6, 7, 8, 9], 4, -1],
  [[3, 2, 20, 1, 1, 3], 10, 5],
]

for (const func of funcs) {
  for (const [nums, x, expected] of data) {
    console.log(func(nums, x) === expected)
  }
}
