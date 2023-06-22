/**
 * Given an array of integers arr, you are initially positioned at the first
 * index of the array.
 *
 * In one step you can jump from index i to index:
 *    i + 1 where: i + 1 < arr.length.
 *    i - 1 where: i - 1 >= 0.
 *    j where: arr[i] == arr[j] and i != j.
 *
 * Return the minimum number of steps to reach the last index of the array.
 *
 * Notice that you can not jump outside of the array at any time.
 *
 * Constraints:
 *    1 <= arr.length <= 5 * 10^4
 *    -10^8 <= arr[i] <= 10^8
 */

/**
 * @param {number[]} arr
 * @return {number}
 */
// Backtracking - TLE.
// Não consegui aplicar memoization pois o grafo não é dirigido. Logo, dois ou
// mais nós, que pertençam ao caminho ótimo, podem ser visitados em ordem
// distinta da ideal antes que o caminho ótimo seja analisado. Como em cada
// caminho percorrido, o número mínimo de passos para se chegar ao final a
// partir de cada nó é registrada para reutilização, quando o caminho ótimo for
// analisado, valores maiores que o necessário serão recuperados.

// Pensei em percorrer o vetor no caminho inverso, mas neste caso a solução
// degeneraria para um BFS.

// Todo problema de menor caminho com grafo não dirigido requer BFS?

const minJumps_backtracking = (arr) => {
  const n = arr.length

  map = new Map()
  for (let i = 0; i < n; i++) {
    if (!map.get(arr[i])) map.set(arr[i], [])
    map.get(arr[i]).push(i)
  }

  const memo = new Array(n)

  const dfs = (index, visited) => {
    if (index < 0 || index >= n || visited.has(index)) return Infinity
    if (index === n - 1) return 0

    visited.add(index)

    const nexts = [index - 1, index + 1, ...map.get(arr[index])]
    let shortest = Infinity
    for (const next of nexts) shortest = Math.min(shortest, dfs(next, visited))

    visited.delete(index)

    return shortest + 1
  }

  return dfs(0, new Set())
}

const minJumps_bfs = (arr) => {
  const n = arr.length

  const graph = new Map()
  for (let i = 0; i < n; i++) {
    if (!graph.get(arr[i])) graph.set(arr[i], [])
    graph.get(arr[i]).push(i)
  }

  const visited = new Set()

  let indexes = [0]
  let steps = 0
  while (indexes.length) {
    const newIndexes = []
    for (const index of indexes) {
      if (index === n - 1) return steps
      if (index < 0 || index >= n || visited.has(index)) continue

      visited.add(index)
      newIndexes.push(index - 1, index + 1, ...graph.get(arr[index]))
      graph.set(arr[index], [])
    }
    steps++
    indexes = newIndexes
  }
}

arr = [100, -23, -23, 404, 100, 23, 23, 23, 3, 404]
// Output: 3
// Explanation: You need three jumps from index 0 --> 4 --> 3 --> 9. Note that index 9 is the last index of the array.

// arr = [7]
// Output: 0
// Explanation: Start index is the last index. You do not need to jump.

// arr = [7, 6, 9, 6, 9, 6, 9, 7]
// Output: 1
// Explanation: You can jump directly from index 0 to index 7 which is last index of the array.

console.log(minJumps_backtracking(arr))
console.log(minJumps_bfs(arr))
