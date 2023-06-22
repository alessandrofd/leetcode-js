/**
 * You are given an integer array nums and two integers minK and maxK.
 *
 * A fixed-bound subarray of nums is a subarray that satisfies the
 * following conditions:
 *
 *    The minimum value in the subarray is equal to minK.
 *
 *    The maximum value in the subarray is equal to maxK.
 *
 * Return the number of fixed-bound subarrays.
 *
 * A subarray is a contiguous part of an array.
 *
 * Constraints:
 *    2 <= nums.length <= 10^5
 *    1 <= nums[i], minK, maxK <= 10^6
 */

/**
 * @param {number[]} nums
 * @param {number} minK
 * @param {number} maxK
 * @return {number}
 */
const countSubarrays = (nums, minK, maxK) => {
  // A solução depende de dois ponteiros e de suas posições relativas.

  // Os ponteiros relevantes são o leftBound, que representa a fronteira
  // esquerda dos subarrays possíveis e o smaller — posição mais à esquerda dos
  // valores máximos e mínimos, que obrigatoriamente devem estar presentes nos
  // subarrays válido.

  // Apesar que um subarray válido terá como suas fronteiras os índices leftBound
  // e i, como o problema pede apenas a quantidade destes subarrays, o índice i
  // funciona como mero contador. A diferença entre smaller e leftBound determina
  // a quantidade de subarrays a serem contabilizados em cada iteração.

  // No caso do leftBound estar à direita do smaller, a diferença será negativa,
  // o que indicará que naquela posição [leftBound, i] não há subarray válido.
  // Por isso, os valores são "equalizados" com o Math.max(0 ...)
  let leftBound = -1
  let minPosition = -1
  let maxPosition = -1

  result = 0

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] < minK || nums[i] > maxK) {
      leftBound = i
    } else {
      if (nums[i] === minK) minPosition = i
      if (nums[i] === maxK) maxPosition = i
    }

    const smaller = Math.min(minPosition, maxPosition)
    const subarrays = Math.max(0, smaller - leftBound)
    result += subarrays
  }
  return result
}

const data = [
  [[1, 3, 5, 2, 7, 5], 1, 5, 2],
  [[1, 1, 1, 1], 1, 1, 10],
]

funcs = [countSubarrays]

for (func of funcs) {
  for ([nums, minK, maxK, output] of data) {
    console.log(func.name)
    console.log(func(nums, minK, maxK))
    console.log(output)
  }
}
