/* Ao invés de tentar as combinações no início e no final no array,
 * nós tentamos descobrir qual o maior subarray cuja somatória é a diferença
 * enter o valor alvo (parâmetro x) e a somatória de todos os elementos do
 * array (variável y). Para tanto o primeiro passo é transformar o array
 * fornecido em um somatório dos elementos do array original. Assim utiliza-
 * mos dois ponteiros para demarcar o subarray e o seu somatório será igual
 * a posição final do subarray, indicado pelo segundo ponteiro (variável j)
 * menos os valores descartados que será igual à posição anterior à posição
 * inicial do subarray, indicada pelo primeiro ponteiro (variável i)
 */

const minOperations = (nums, x) => {
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

// let nums = [1, 1, 4, 2, 3]
// let x = 5
//Output: 2

// let nums = [5, 6, 7, 8, 9]
// let x = 4
// Output: -1

let nums = [3, 2, 20, 1, 1, 3]
let x = 10
//Output: 5

console.log(minOperations(nums, x))
