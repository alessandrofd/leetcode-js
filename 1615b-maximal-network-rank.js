/**
 * There is an infrastructure of n cities with some number of roads connecting
 * these cities. Each roads[i] = [ai, bi] indicates that there is a
 * bidirectional road between cities ai and bi.
 *
 * The network rank of two different cities is defined as the total number of
 * directly connected roads to either city. If a road is directly connected to
 * both cities, it is only counted once.
 *
 * The maximal network rank of the infrastructure is the maximum network rank of
 * all pairs of different cities.
 *
 * Given the integer n and the array roads, return the maximal network rank of
 * the entire infrastructure.
 *
 * Constraints:
 *    2 <= n <= 100
 *    0 <= roads.length <= n * (n - 1) / 2
 *    roads[i].length == 2
 *    0 <= ai, bi <= n-1
 *    ai != bi
 *    Each pair of cities has at most one road connecting them.
 */

/**
 * @param {number} n
 * @param {number[][]} roads
 * @return {number}
 */
const maximalNetworkRank = (n, roads) => {}

n = 4
// prettier-ignore
roads = [ [0, 1], [0, 3], [1, 2], [1, 3], ]
// Expected: 4

// n = 5
// // prettier-ignore
// roads = [ [0, 1], [0, 3], [1, 2], [1, 3], [2, 3], [2, 4], ]
// Expected: 5

// n = 8
// // prettier-ignore
// roads = [ [0, 1], [1, 2], [2, 3], [2, 4], [5, 6], [5, 7], ]
// Expected: 5

console.log(maximalNetworkRank(n, roads))
