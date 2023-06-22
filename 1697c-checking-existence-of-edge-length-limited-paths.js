/**
 * An undirected graph of n nodes is defined by edgeList, where
 * edgeList[i] = [ui, vi, disi] denotes an edge between nodes ui and vi with
 * distance disi. Note that there may be multiple edges between two nodes.
 *
 * Given an array queries, where queries[j] = [pj, qj, limitj], your task is to
 * determine for each queries[j] whether there is a path between pj and qj such
 * that each edge on the path has a distance strictly less than limitj .
 *
 * Return a boolean array answer, where answer.length == queries.length and
 * the jth value of answer is true if there is a path for queries[j] is true,
 * and false otherwise.
 *
 * Constraints:
 *    2 <= n <= 10^5
 *    1 <= edgeList.length, queries.length <= 10^5
 *    edgeList[i].length == 3
 *    queries[j].length == 3
 *    0 <= ui, vi, pj, qj <= n - 1
 *    ui != vi
 *    pj != qj
 *    1 <= disi, limitj <= 10^9
 *    There may be multiple edges between two nodes.
 */

/**
 * A cada query eliminamos as arestas do grafo com peso superior ao limite da
 * query. Desta forma podemos aplicar DSU para saber se ambas os nós da query
 * continuam ligados. Para otimizar o algoritmo ordenamos as queries pelos seus
 * limites em ordem ascendente e aplicamos paulatinamente o limite ao DSU. Desta
 * forma não temos que calculá-lo do zero a cada query.
 */

/**
 * @param {number} n
 * @param {number[][]} edgeList
 * @param {number[][]} queries
 * @return {boolean[]}
 */
const distanceLimitedPathsExist = (n, edgeList, queries) => {}

n = 3
edgeList = [
  [0, 1, 2],
  [1, 2, 4],
  [2, 0, 8],
  [1, 0, 16],
]
queries = [
  [0, 1, 2],
  [0, 2, 5],
]
// Output: [false,true]

// n = 5
// edgeList = [
//   [0, 1, 10],
//   [1, 2, 5],
//   [2, 3, 9],
//   [3, 4, 13],
// ]
// queries = [
//   [0, 4, 14],
//   [1, 4, 13],
// ]
// Output: [true,false]

console.log(distanceLimitedPathsExist(n, edgeList, queries))
