/**
 * You are given two integer arrays nums1 and nums2 sorted in ascending order
 * and an integer k.
 *
 * Define a pair (u, v) which consists of one element from the first array and
 * one element from the second array.
 *
 * Return the k pairs (u1, v1), (u2, v2), ..., (uk, vk) with the smallest sums.
 *
 * Constraints:
 *    1 <= nums1.length, nums2.length <= 10^5
 *    -10^9 <= nums1[i], nums2[i] <= 10^9
 *    nums1 and nums2 both are sorted in ascending order.
 *    1 <= k <= 10^4
 */

import {
  MinPriorityQueue,
  MaxPriorityQueue,
} from '@datastructures-js/priority-queue'

// Utiliza uma fila de prioridade max e inclui nela todas as possibilidade de
// combinação ou seja k^2 elementos. A fila é sempre mantida com um comprimento
// máximo de k

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number} k
 * @return {number[][]}
 */
const kSmallestPairs_kSquared = (nums1, nums2, k) => {}

// Utiliza uma fila de prioridades min. Seleciona-se o primeiro elemento da fila,
// caracterizado pelos índices de cada um dos vetores nums1 e nums1, e insere
// a tupla na resposta. Avança os índices um de cada vez e enfileira
// a combinação caso já não tenha sido. Essas operação são repetidas k vezes ou
// até que a fila se esvazie.

// Estourou a pilha de memória

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number} k
 * @return {number[][]}
 */
const kSmallestPairs_stepByStep = (nums1, nums2, k) => {}

// Otimização da solução anterior

// Considerando os índices i e j recém selecionados como parte da solução,
// ou seja nums1[i] + nums2[j] é o menor valor dentre as combinações disponíveis.
// Só faz sentido consdiderarmos a combinação (i+1, j) se j for igual a zero,
// pois qualquer outro valor de j resultará em uma combinação de valor maior que
// nums1[i+1] + nums2[0] e, portanto, só deve ser levada em consideração após
// i+1, 0). No entanto, entre (i, 0) e (i+1, 0), temos que considerar todas
// as combinações de (i,j) onde j > 0 que produzam valores menores que (i+1, 0).

// Existe uma dificuldade natural na compreensão desta solução pois procuramos
// resultados menores (nums1[i] + nums2[j]) à medida que os índices aumentam.

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number} k
 * @return {number[][]}
 */
const kSmallestPairs_gangorra = (nums1, nums2, k) => {}

let nums1 = [1, 7, 11]
let nums2 = [2, 4, 6]
let k = 3
// Expected: [[1,2],[1,4],[1,6]]

// nums1 = [1, 1, 2]
// nums2 = [1, 2, 3]
// k = 2
// Expected: [[1,1],[1,1]]

// nums1 = [1, 2]
// nums2 = [3]
// k = 3
// Expected: [[1,3],[2,3]]

// nums1 = [1, 1, 2]
// nums2 = [1, 2, 3]
// k = 10
// Expected: [[1,1],[1,1],[2,1],[1,2],[1,2],[2,2],[1,3],[1,3],[2,3]]

console.log(kSmallestPairs_kSquared(nums1, nums2, k))
console.log(kSmallestPairs_stepByStep(nums1, nums2, k))
console.log(kSmallestPairs_gangorra(nums1, nums2, k))
