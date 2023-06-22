/**
 * Given an integer array nums, return the number of subarrays filled with 0.
 *
 * A subarray is a contiguous non-empty sequence of elements within an array.
 *
 * Constraints:
 *    1 <= nums.length <= 10^5
 *    -10^9 <= nums[i] <= 10^9
 */

// A intuição utilizada na solução é considerar cada valor do vetor não como
// o início de um subvetor, mas como o seu término. Desta forma, contamos
// a quantidade de subvetores dos quais a célula com valor zero é o término.
// Para tanto, temos que acumular a quantidade de subvetores à medida que
// encontramos zeros encadeados. Quando encontramos um zero pela primeira vez,
// ou que não tenha sido imediatamente antecedido por outro zero, ele será
// o término de um único subvetor composto apenas pela célula que estamos
// examinando. Assim, somomamo ao resultado final este único subvetor. Caso
// a próxima célula não seja um zero, temos que zerar a contagem de subarray.
// Caso contrário, esta nova célula será término do subvetor composto
// exclusivamente por ela e de todos os subvetores dos quais a célula anterior
// foi o término. Portanto, devemos atualizar a contagem de subvetores e somá-la
// o resultado final.

/**
 * @param {number[]} nums
 * @return {number}
 */
const zeroFilledSubarray = (nums) => {
  let result = 0
  let subarrays = 0
  for (const num of nums) {
    if (num === 0) {
      subarrays++
      result += subarrays
    } else {
      subarrays = 0
    }
  }
  return result
}

nums = [1, 3, 0, 0, 2, 0, 0, 4]
// Output: 6

// nums = [0, 0, 0, 2, 0, 0]
// Output: 9

// nums = [2, 10, 2019]
// Output: 0

console.log(zeroFilledSubarray(nums))
