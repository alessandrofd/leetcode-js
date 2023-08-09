/**
 * You are given a 0-indexed integer array nums and an integer p. Find p pairs
 * of indices of nums such that the maximum difference amongst all the pairs is
 * minimized. Also, ensure no index appears more than once amongst the p pairs.
 *
 * Note that for a pair of elements at the index i and j, the difference of this
 * pair is |nums[i] - nums[j]|, where |x| represents the absolute value of x.
 *
 * Return the minimum maximum difference among all p pairs. We define the
 * maximum of an empty set to be zero.
 *
 * Constraints
 *    1 <= nums.length <= 10^5
 *    0 <= nums[i] <= 10^9
 *    0 <= p <= (nums.length) / 2
 */

/**
 * Greedy + busca binária
 *
 * Neste caso a busca binária não será por uma posição em um lista ordenada, mas
 * pela própria resposta. Considerando uma lista ordenada de valores de
 * comprimento n, as respostas válidas estarão entre 0 e abs(nums[n-1] - nums[0]).
 * Devemos buscar entre estes valores o menor em que haja no mínimo o número de
 * pares solicitados cuja diferença seja menor ou igual o valor buscado.
 *
 * Para determinarmos a quantidade de pares cuja diferença seja menor ou igual
 * ao valor buscado, utilizamos uma abordagem greedy. Percorremos toda a lista
 * ordenada e caso um par seja menor ou igual ao valor buscado, contabilizamos a
 * sua ocorrência e pulamos 2 posições. Caso contrário, apenas pulamos uma
 * posição. Assim que o número mínimo de pares é encontrado, retornamos
 * verdadeiro. Caso percorramos toda a lista sem encontrar o número mínimo de
 * pares, retornamos falso.
 */

/**
 * @param {number[]} nums
 * @param {number} numPairs
 * @return {number}
 */
const minimizeMax = (nums, numPairs) => {}

nums = [10, 1, 2, 7, 1, 3]
numPairs = 2
// Expected: 1

nums = [4, 2, 1, 2]
numPairs = 1
// Expected: 0

nums = [0, 5, 3, 4]
numPairs = 0
// Expected: 0

console.log(minimizeMax(nums, numPairs))
