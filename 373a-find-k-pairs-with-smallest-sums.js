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
const kSmallestPairs_kSquared = (nums1, nums2, k) => {
  const queue = new MaxPriorityQueue({ priority: (pair) => pair[0] + pair[1] })

  for (const n1 of nums1) {
    for (const n2 of nums2) {
      queue.enqueue([n1, n2])
      if (queue.size() > k) queue.dequeue()
    }
  }

  const result = []
  while (queue.size() > 0) {
    result.push(queue.dequeue().element)
  }

  return result
}

// Utiliza uma fila de prioridades min. Seleciona-se o primeiro elemento da fila,
// caracterizado pelos índices de cada um dos vetores nums1 e nums1, e insere
// a tupla na resposta. Avança os índices um de cada vez e enfileira
// a combinação caso já não tenha sido. Essas operação são repetidas k vezes ou
// até que a fila se esvazie.

// Lembrar-se de que os vetores estão ordenados, logo [0,0] sempre será o menor
// valor possível

// Estourou a pilha de memória

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number} k
 * @return {number[][]}
 */
const kSmallestPairs_stepByStep = (nums1, nums2, k) => {
  const n1 = nums1.length
  const n2 = nums2.length

  const queue = new MinPriorityQueue({
    priority: (idxs) => nums1[idxs[0]] + nums2[idxs[1]],
  })

  const visited = Array(n1)
    .fill()
    .map((_) => Array(n2).fill(false))

  queue.enqueue([0, 0])
  visited[0][0] = true

  const result = []
  while (result.length < k && queue.size() > 0) {
    const [idx1, idx2] = queue.dequeue().element
    result.push([nums1[idx1], nums2[idx2]])

    if (idx1 + 1 < n1 && !visited[idx1 + 1][idx2]) {
      queue.enqueue([idx1 + 1, idx2])
      visited[idx1 + 1][idx2] = true
    }

    if (idx2 + 1 < n2 && !visited[idx1][idx2 + 1]) {
      queue.enqueue([idx1, idx2 + 1])
      visited[idx1][idx2 + 1] = true
    }
  }

  return result
}

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
const kSmallestPairs_gangorra = (nums1, nums2, k) => {
  const n1 = nums1.length
  const n2 = nums2.length

  const queue = new MinPriorityQueue({
    priority: (idxs) => nums1[idxs[0]] + nums2[idxs[1]],
  })
  queue.enqueue([0, 0])

  const result = []
  while (result.length < k && queue.size() > 0) {
    const [idx1, idx2] = queue.dequeue().element
    result.push([nums1[idx1], nums2[idx2]])

    if (idx1 + 1 < n1 && idx2 === 0) queue.enqueue([idx1 + 1, idx2])

    if (idx2 + 1 < n2) queue.enqueue([idx1, idx2 + 1])
  }

  return result
}

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
