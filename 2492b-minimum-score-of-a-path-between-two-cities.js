/**
 * You are given a positive integer n representing n cities numbered from 1 to n.
 * You are also given a 2D array roads where roads[i] = [ai, bi, distancei]
 * indicates that there is a bidirectional road between cities ai and bi with
 * a distance equal to distancei. The cities graph is not necessarily connected.
 *
 * The score of a path between two cities is defined as the minimum distance of
 * a road in this path.
 *
 * Return the minimum possible score of a path between cities 1 and n.
 *
 * Note:
 *
 *    A path is a sequence of roads between two cities.
 *
 *    It is allowed for a path to contain the same road multiple times, and
 *    you can visit cities 1 and n multiple times along the path.
 *
 *    The test cases are generated such that there is at least one path
 *    between 1 and n.
 *
 * Constraints:
 *    2 <= n <= 10^5
 *    1 <= roads.length <= 10^5
 *    roads[i].length == 3
 *    1 <= ai, bi <= n
 *    ai != bi
 *    1 <= distancei <= 10^4
 *    There are no repeated edges.
 *    There is at least one path between 1 and n.
 */

/*
Como o problema pede o menor trecho de um caminho que leve da primeira 
à ultima cidade. Podemos ordenar os trechos pelo seu comprimento e do menor 
para o maior testar se alcançam o início e o final do caminho.
*/

/**
 * @param {number} n
 * @param {number[][]} roads
 * @return {number}
 */
const minScore_sortDFS = (numCities, roads) => {}

/*
Ao invés de testarmos os caminhos para ver se o caminho mais curto leva à 
primeira e última cidade, podemos utilizar o DSU
*/

const minScore_DSU = (numCities, roads) => {}

n = 4
roads = [
  [1, 2, 9],
  [2, 3, 6],
  [2, 4, 5],
  [1, 4, 7],
]
// Output: 5

n = 4
roads = [
  [1, 2, 2],
  [1, 3, 4],
  [3, 4, 7],
]
// Output: 2

console.log(minScore(n, roads))
