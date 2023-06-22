/**
 * Given the array nums consisting of 2n elements in the form
 * [x1,x2,...,xn,y1,y2,...,yn].
 *
 * Return the array in the form [x1,y1,x2,y2,...,xn,yn].
 *
 * Constraints:
 *    1 <= n <= 500
 *    nums.length == 2^n
 *    1 <= nums[i] <= 10^3
 */

/**
 * @param {number[]} nums
 * @param {number} n
 * @return {number[]}
 */
// Approach 1: Simple Iteration
var shuffle_simpleIteration = (nums, n) => {}

// Approach 2: In-place Filling
// A ideia é otimizar o espaço utilizado, logo o embaralhamento deve ser feito
// sem criar um novo vetor. Neste caso, podemos utilizar o fato que um dos
// requisitos é que os números a serem embaralhados devem ser menores ou iguais
// a 500, logo podem ser armazenados em 10 bits. Portanto, compactaremos 2
// números em uma única posição do vetor original no primeiro passo e em seguida
// os descompactaremos, embaralhando-os no processo
const shuffle_inplaceFilling = (nums, n) => {}

nums = [2, 5, 1, 3, 4, 7]
n = 3
// Output: [2,3,5,4,1,7]

nums = [1, 2, 3, 4, 4, 3, 2, 1]
n = 4
// Output: [1,4,2,3,3,2,4,1]

nums = [1, 1, 2, 2]
n = 2
// Output: [1,2,1,2]

console.log(shuffle_simpleIteration(nums, n))
console.log(shuffle_inplaceFilling(nums, n))

const a = []
a.push(1, 2)
a
