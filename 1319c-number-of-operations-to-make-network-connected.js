/**
 * There are n computers numbered from 0 to n - 1 connected by ethernet cables
 * connections forming a network where connections[i] = [ai, bi] represents
 * a connection between computers ai and bi. Any computer can reach any other
 * computer directly or indirectly through the network.
 *
 * You are given an initial computer network connections. You can extract
 * certain cables between two directly connected computers, and place them
 * between any pair of disconnected computers to make them directly connected.
 *
 * Return the minimum number of times you need to do this in order to make all
 * the computers connected. If it is not possible, return -1.
 *
 * Constraints:
 *    1 <= n <= 10^5
 *    1 <= connections.length <= min(n * (n - 1) / 2, 10^5)
 *    connections[i].length == 2
 *    0 <= ai, bi < n
 *    ai != bi
 *    There are no repeated connections.
 *    No two computers are connected by more than one cable.
 */

/*
Inicialmente temos que verificar se existem cabos suficientes para conectar toda 
a rede. O número mínimo será n-1, seja qual for a configuração. Em seguida 
podemos utilizar uma estratégia de DSU para determinar quando nós ou grupamentos 
de nós estão isolados entre si. Para conectá-los serão necessárion N-1 cabos, 
onde N é o número de grupamentos isolados.
 */

/**
 * @param {number} n
 * @param {number[][]} connections
 * @return {number}
 */
var makeConnected = function (n, connections) {}

n = 4
connections = [
  [0, 1],
  [0, 2],
  [1, 2],
]
// Output: 1

// n = 6
// connections = [
//   [0, 1],
//   [0, 2],
//   [0, 3],
//   [1, 2],
//   [1, 3],
// ]
// Output: 2

// n = 6
// connections = [
//   [0, 1],
//   [0, 2],
//   [0, 3],
//   [1, 2],
// ]
// Output: -1

console.log(makeConnected(n, connections))
