/**
 * Alice and Bob have an undirected graph of n nodes and three types of edges:
 *
 *    Type 1: Can be traversed by Alice only.
 *    Type 2: Can be traversed by Bob only.
 *    Type 3: Can be traversed by both Alice and Bob.
 *
 * Given an array edges where edges[i] = [typei, ui, vi] represents a
 * bidirectional edge of type typei between nodes ui and vi, find the maximum
 * number of edges you can remove so that after removing the edges, the graph
 * can still be fully traversed by both Alice and Bob. The graph is fully
 * traversed by Alice and Bob if starting from any node, they can reach all
 * other nodes.
 *
 * Return the maximum number of edges you can remove, or return -1 if Alice and
 * Bob cannot fully traverse the graph.
 *
 * Constraints:
 *    1 <= n <= 10^5
 *    1 <= edges.length <= min(10^5, 3 * n * (n - 1) / 2)
 *    edges[i].length == 3
 *    1 <= typei <= 3
 *    1 <= ui < vi <= n
 *    All tuples (typei, ui, vi) are distinct.
 */

/**
 * Para resolver o problema ao invés de partir do grafo completo, o construímos
 * do zero e a cada aresta acrescentada utilizamos DSU para verificar se ao
 * final todos os nós estarão concectados. São dois os detalhes que divergem na
 * aplicação normal do DSU. Criamos dois objetos distintos para cada um dos
 * agentes, Alice e Bob, que deverão percorrer o grafo ao final. Estes objetos
 * contêm as estruturas de dados e métodos necessários para implementar o DSU.
 * Como procuramos o número mínimo de arestas necessárias para conectar todos
 * o grafo, inicialmente acrescentamos a ele as arestas do tipo 3, que servem
 * tanto a Alice quanto a Bob. Aplicamos estas arestas a ambos os objetos e
 * em seguida aplicamos as arestas específicas a cada agente ao seus objeto
 * respectivo. O segundo detalhe é que o método union(i, j) retorna se a aresta
 * foi efetiva na junção de componentes desconcectados ou não. Ou seja, podemos
 * tranquilamente adicionar todas as arestas ao grafo, sem qualquer
 * discriminação (a não ser a ordem de acordo com seus tipos, conforme
 * mencionado acima), que seremos capazes de contabilizar o número mínimo de
 * arestas para conectar todos o grafo.
 */

/**
 * @param {number} numNodes
 * @param {number[][]} edges
 * @return {number}
 */
const maxNumEdgesToRemove = (numNodes, edges) => {
  class DSUGraph {
    constructor(numNodes) {
      this.parents = Array.from(new Array(numNodes + 1).keys())
      this.ranks = new Array(numNodes + 1).fill(1)
      this.components = numNodes
    }

    find = (i) => {
      const { parents, find } = this
      if (i !== parents[i]) parents[i] = find(parents[i])
      return parents[i]
    }

    union = (i, j) => {
      const { ranks, parents, find } = this
      i = find(i)
      j = find(j)

      if (i === j) return 0

      if (ranks[i] > ranks[j]) {
        parents[j] = i
        ranks[i] += ranks[j]
      } else {
        parents[i] = j
        ranks[j] += ranks[i]
      }
      this.components--
      return 1
    }

    isConnected = (i, j) => this.components == 1
  }

  const numEdges = edges.length

  const alice = new DSUGraph(numNodes)
  const bob = new DSUGraph(numNodes)

  minNumEdgesRequired = 0

  for (const [_, i, j] of edges.filter((e) => e[0] == 3))
    minNumEdgesRequired += alice.union(i, j) | bob.union(i, j)

  for (const [_, i, j] of edges.filter((e) => e[0] == 1))
    minNumEdgesRequired += alice.union(i, j)

  for (const [_, i, j] of edges.filter((e) => e[0] == 2))
    minNumEdgesRequired += bob.union(i, j)

  return alice.isConnected() && bob.isConnected()
    ? numEdges - minNumEdgesRequired
    : -1
}

numNodes = 4
edges = [
  [3, 1, 2],
  [3, 2, 3],
  [1, 1, 3],
  [1, 2, 4],
  [1, 1, 2],
  [2, 3, 4],
]
// Expected: 2

// numNodes = 4
// edges = [
//   [3, 1, 2],
//   [3, 2, 3],
//   [1, 1, 4],
//   [2, 1, 4],
// ]
// Expected: 0

// numNodes = 4
// edges = [
//   [3, 2, 3],
//   [1, 1, 2],
//   [2, 3, 4],
// ]
// Expected: -1

console.log(maxNumEdgesToRemove(numNodes, edges))
