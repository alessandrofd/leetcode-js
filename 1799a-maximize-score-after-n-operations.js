/**
 * You are given nums, an array of positive integers of size 2 * n. You must
 * perform n operations on this array.
 *
 * In the ith operation (1-indexed), you will:
 *
 *    Choose two elements, x and y.
 *
 *    Receive a score of i * gcd(x, y).
 *
 *    Remove x and y from nums.
 *
 * Return the maximum score you can receive after performing n operations.
 *
 * The function gcd(x, y) is the greatest common divisor of x and y.
 *
 * Constraints:
 *    1 <= n <= 7
 *    nums.length == 2 * n
 *    1 <= nums[i] <= 10^6
 */

/**
 * Backtrack com memoization - para indexar cada situação (números utilizados),
 * devemos utilizar um mapa de bits
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
const maxScore_backtrack = (nums) => {}

/**
 * Programação dinâmica com uma única dimensão - números utilizados, c
 * onsolidados em um map de bits.
 *
 * Percorremos exaustivamente todoas as possibilidade começando a partir do
 * último par até o primeiro. Cada conjuto de números utilizados será
 * representada pelo mapa de bits e a melhor combinação destes números
 * armazenada em um vetor indexado pelo mapa. O mapa de bits, portanto,
 * corresponderá aos números já utilizados e o valor indexado pelo mapa
 * corresponderá ao melhor valor possível a partir dos números disponíveis.
 * Logo, o valor armazenado na posição (2 ** n) - 1, todos os bits setados,
 * indicando não haver mais números disponíveis, será 0. Consequentemente o
 * resultado desejado será armazenda na posição 0.
 *
 * Para calcularmos um valor associado a um estado, representado pelo mapa de
 * bits, temos que analisar todos os pares possíveis de números disponíveis,
 * calcular o valor dos pares, somá-lo à situação onde estes números não estão
 * mais disponíveis (calculado previamente) e armazenar a melhor combinação.
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
const maxScore_dp = (nums) => {}

nums = [1, 2]
// Expected: 1

// nums = [3, 4, 6, 8]
// // Expected: 11

// nums = [1, 2, 3, 4, 5, 6]
// // Expected: 14

console.log(maxScore_dp(nums))
