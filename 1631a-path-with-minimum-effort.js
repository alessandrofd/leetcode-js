/**
 * You are a hiker preparing for an upcoming hike. You are given heights, a 2D
 * array of size rows x columns, where heights[row][col] represents the height
 * of cell (row, col). You are situated in the top-left cell, (0, 0), and you
 * hope to travel to the bottom-right cell, (rows-1, columns-1)
 * (i.e., 0-indexed). You can move up, down, left, or right, and you wish to
 * find a route that requires the minimum effort.
 *
 * A route's effort is the maximum absolute difference in heights between two
 * consecutive cells of the route.
 *
 * Return the minimum effort required to travel from the top-left cell to the
 * bottom-right cell.
 *
 * Constraints:
 *    rows == heights.length
 *    columns == heights[i].length
 *    1 <= rows, columns <= 100
 *    1 <= heights[i][j] <= 10^6
 */

import { MinPriorityQueue } from '@datastructures-js/priority-queue'

/**
 * @param {number[][]} heights
 * @return {number}
 */
const minimumEffortPath_backtrack = (heights) => {
  // Backtracking
  // Efeito curioso do backtracking quando associado ao cache de valores
  // calculados. A ideia do cache é visitar uma célula apenas uma vez e que nesta
  // vez obtenhamos o melhor valor para a célula. Neste caso, o cache é formado
  // da célula de chegada para a célula de partida. Neste caso de [rows-1][cols-1]
  // para [0][0]. No entanto, o backtracking deve garantir que em um caminho não
  // haja ciclos, ou seja, que as células não sejam visitadas mais de uma vez.
  // Aparentemente é o mesmo objetivo do cache. Entretanto, o backtracking
  // funciona no sentido inverso do cache: da partida para a chegada. Assim nos
  // deparamos com a possibilidade de uma célula que pertença ao caminho ótimo
  // não ter o seu valor calculado pois todos as células adjacentes já foram
  // visitadas.

  // A alternativa para otimizar o algoritmo é passar nas chamadas recursivas
  //  maior diferença de altura do caminho. Caso a diferença de altura supere a
  //  diferença mínima, calculada anteriormente, o caminho pode ser interrompido.
  //  Neste caso atualizamos a diferença de altura do melhor caminho apenas quando
  //  atingimos nosso destino - a céluala mais à direita e abaixo da matriz.

  // Mesmo com a otimização descrita acima o algoritmo excedeu o tempo limite - TLE
  const rows = heights.length
  const cols = heights[0].length

  let minEffort = Infinity

  const backtrack = (row, col, maxDiff) => {
    const isValidCell = (r, c) => r >= 0 && r < rows && c >= 0 && c < cols

    if (row === rows - 1 && col === cols - 1) {
      minEffort = Math.min(minEffort, maxDiff)
    }

    const height = heights[row][col]
    heights[row][col] = 0

    // prettier-ignore
    const deltas = [[1, 0], [0, 1], [-1, 0], [0, -1]]
    for (const [deltaRow, deltaCol] of deltas) {
      const [adjRow, adjCol] = [row + deltaRow, col + deltaCol]

      if (!isValidCell(adjRow, adjCol) || heights[adjRow][adjCol] === 0)
        continue

      // Quando preservamos o parâmetro maxDiff e fazemos a chamada recursiva
      // com maxCurrDiff, também estamos aplicando backtrackig. Para o próximo
      // caminho a ser percorrido, a partir de uma nova célua adjacente à céluala
      // corrente, calcularemos um novo maxCurrDiff a partir do parâmetro maxDiff
      // que não foi alterado.
      const currDiff = Math.abs(height - heights[adjRow][adjCol])
      const maxCurrDiff = Math.max(maxDiff, currDiff)
      if (maxCurrDiff < minEffort) backtrack(adjRow, adjCol, maxCurrDiff)
    }

    heights[row][col] = height
  }

  backtrack(0, 0, 0)
  return minEffort
}

/**
 * @param {number[][]} heights
 * @return {number}
 */
const minimumEffortPath_Dijkstra = (heights) => {
  /**
  Algoritmo de Dijkstra 
  (ref Wikipedia: https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm)

  Let the node at which we are starting be called the initial node. Let the 
  distance of node Y be the distance from the initial node to Y. Dijkstra's 
  algorithm will initially start with infinite distances and will try to 
  improve them step by step.

      1. Mark all nodes unvisited. Create a set of all the unvisited nodes 
        called the unvisited set.

      2. Assign to every node a tentative distance value: set it to zero for 
        our initial node and to infinity for all other nodes. During the run 
        of the algorithm, the tentative distance of a node v is the length of 
        the shortest path discovered so far between the node v and the 
        starting node. Since initially no path is known to any other vertex 
        than the source itself (which is a path of length zero), all other 
        tentative distances are initially set to infinity. Set the initial 
        node as current.[17]

      3. For the current node, consider all of its unvisited neighbors and 
        calculate their tentative distances through the current node. Compare 
        the newly calculated tentative distance to the one currently assigned to
        the neighbor and assign it the smaller one. For example, if the current 
        node A is marked with a distance of 6, and the edge connecting it with a 
        neighbor B has length 2, then the distance to B through A will be 
        6 + 2 = 8. If B was previously marked with a distance greater than 8 
        then change it to 8. Otherwise, the current value will be kept.

      4. When we are done considering all of the unvisited neighbors of the 
        current node, mark the current node as visited and remove it from the 
        unvisited set. A visited node will never be checked again (this is valid 
        and optimal in connection with the behavior in step 6.: that the next 
        nodes to visit will always be in the order of 'smallest distance from 
        initial node first' so any visits after would have a greater distance).

      5. If the destination node has been marked visited (when planning a route 
        between two specific nodes) or if the smallest tentative distance among 
        the nodes in the unvisited set is infinity (when planning a complete 
        traversal; occurs when there is no connection between the initial node 
        and remaining unvisited nodes), then stop. The algorithm has finished.

      6. Otherwise, select the unvisited node that is marked with the smallest 
        tentative distance, set it as the new current node, and go back to step 3.

  When planning a route, it is actually not necessary to wait until the 
  destination node is "visited" as above: the algorithm can stop once the 
  destination node has the smallest tentative distance among all "unvisited" 
  nodes (and thus could be selected as the next "current").
 */

  // O algoritmo de Djikstra parece um BFS otimizado com um fila de prioridades.

  const isValidCell = (r, c) => r >= 0 && r < rows && c >= 0 && c < cols

  const rows = heights.length
  const cols = heights[0].length

  const diffs = new Array(rows)
    .fill()
    .map((_) => new Array(cols).fill(Infinity))
  diffs[0][0] = 0

  const visited = new Array(rows).fill().map((_) => new Array(cols).fill(false))

  const pq = new MinPriorityQueue({ priority: (element) => element[0] })
  pq.enqueue([0, 0, 0])

  while (pq.size() > 0) {
    const [maxDiff, row, col] = pq.dequeue().element
    visited[row][col] = true

    // prettier-ignore
    const deltas = [[1, 0], [0, 1], [-1, 0], [0, -1]]
    for (const [deltaRow, deltaCol] of deltas) {
      const [adjRow, adjCol] = [row + deltaRow, col + deltaCol]

      if (!isValidCell(adjRow, adjCol) || visited[adjRow][adjCol]) continue

      const currDiff = Math.abs(heights[row][col] - heights[adjRow][adjCol])
      const maxCurrDiff = Math.max(maxDiff, currDiff)
      if (diffs[adjRow][adjCol] > maxCurrDiff) {
        diffs[adjRow][adjCol] = maxCurrDiff
        pq.enqueue([maxCurrDiff, adjRow, adjCol])
      }
    }
  }

  return diffs[rows - 1][cols - 1]
}

// prettier-ignore
const funcs = [
  minimumEffortPath_backtrack,
  minimumEffortPath_Dijkstra,
]

// prettier-ignore
const data = [
  [[[1,2,2],[3,8,2],[5,3,5]], 2],
  [[[1,2,3],[3,8,4],[5,3,5]], 1],
  [[[1,2,1,1,1],[1,2,1,2,1],[1,2,1,2,1],[1,2,1,2,1],[1,1,1,2,1]], 0],
]

for (const func of funcs) {
  for (const [heights, expected] of data) {
    console.log(func(heights) === expected)
  }
}
