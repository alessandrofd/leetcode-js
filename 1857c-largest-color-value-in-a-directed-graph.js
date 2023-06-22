/**
 * There is a directed graph of n colored nodes and m edges. The nodes are
 * numbered from 0 to n - 1.
 *
 * You are given a string colors where colors[i] is a lowercase English letter
 * representing the color of the ith node in this graph (0-indexed). You are
 * also given a 2D array edges where edges[j] = [aj, bj] indicates that there is
 * a directed edge from node aj to node bj.
 *
 * A valid path in the graph is a sequence of nodes x1 -> x2 -> x3 -> ... -> xk
 * such that there is a directed edge from xi to xi+1 for every 1 <= i < k.
 * The color value of the path is the number of nodes that are colored the most
 * frequently occurring color along that path.
 *
 * Return the largest color value of any valid path in the given graph, or -1 if
 * the graph contains a cycle.
 *
 * Constraints:
 *    n == colors.length
 *    m == edges.length
 *    1 <= n <= 10^5
 *    0 <= m <= 10^5
 *    colors consists of lowercase English letters.
 *    0 <= aj, bj < n
 */

/**
 * Utilizar backtracking passando um conjunto de de nós já visitados. Antes,
 * temos que criar uma lista de adjacências. Como o grafo é direcionado,
 * quando chegarmos ao final contabilizamos a cor mais prevalente.
 *
 * Tem um complicador a mais pois não sabemos qual o ponto de partida do grafo.
 * Logo, temos que testar todos os nós como pontos de partida. Provavelmente,
 * neste caso, o backtracking simples vai dar TLE. Dito e feito ...
 *
 * Introduzir memoization na solução não é viável, pois o memo não pode ser
 * simplesmente a quantidade da cor mais prevalente no caminho, pois não há
 * garantia que o restante do caminho terá a mesma cor prevalente.
 * Pelo mesmo motivo não basta colocarmos no memo o mapa das cores do trecho,
 * pois temos que selecionar qual o melhor caminho (pelos critério do problema,
 * ou seja com a maior contagem de uma cor prevalente) a partir do nó sendo
 * analisado. Esta escolha não necessariamente será a melhor quando consideramos
 * todo o caminho.
 *
 * A solução é realizar um ordenamento topológico utilizando o algoritmos
 * de Kahn. Assim podemos processar os nós na ordem correta, utilizando BFS,
 * o que permite que acumulemos a contagem máxima das corres com segurança em
 * cada um dos nós.
 *
 * O algoritmo de Kahn prevê que identifiquemos a quantidade de arestas
 * apontando para cada um dos nós de forma a identificar os nós de origem.
 * O processamento destes nós envolve, além das especificidades do problema
 * - neste caso computar a cor prevalente do caminho até o nó, identificar
 * os nós-filhos para os quais ele aponta e eliminar a aresta entre eles.
 * Esta operação se concretiza na subtração da quantidade de nós que apontam
 * para os nós-filhos das arestas eliminadas. Se a quantidade de arestas
 * apontando para um nó atingir zero, ele será enfileirado para ser processado
 * em seguida. O processo se repete até que a fila se esvazie.
 *
 * O algoritmo facilita a identificação de ciclos em um grafo pois os nós
 * pertencentes a um ciclo jamais terão a quantidade de arestas que apontam para
 * ele igual a zero. Portanto, o grafo terá ciclos se a quantidade de nós
 * processados for menor que a quantidade total de nós.
 *
 * Duas providências devem ser tomadas no processamento de cada nó. Primeiro
 * devemos calcular a contagem da cor mais prevalente do caminho que se encerra
 * no nó. Para tanto não é necessário computar todo o caminho, já que o valor é
 * alculado de forma acumulativa, basta comparar o maior valor até então com
 * a quantidade de nós da mesma cor que o nó atual mais um. A segunda operação,
 * que cria condições para a primeira, é transferir para os nós-filhos
 * a contagem das cores do caminho até então. Como pode haver mais de um caminho
 * para se chegar ao nó-filho, não podemos simplesmente acumular as quantidades
 * de cores de um caminho. Portanto, acumulamos a contagem máxima de cada cor
 * do caminho que leva ao nó.
 */

/**
 * @param {string} colors
 * @param {number[][]} edges
 * @return {number}
 */
const largestPathValue = (colors, edges) => {}

let colors = 'abaca'
let edges = [
  [0, 1],
  [0, 2],
  [2, 3],
  [3, 4],
]
// Output: 3

colors = 'a'
edges = [[0, 0]]
// Output: -1

colors = 'hhqhuqhqff'
edges = [
  [0, 1],
  [0, 2],
  [2, 3],
  [3, 4],
  [3, 5],
  [5, 6],
  [2, 7],
  [6, 7],
  [7, 8],
  [3, 8],
  [5, 8],
  [8, 9],
  [3, 9],
  [6, 9],
]
// Output: 3

colors = 'bbbhb'
edges = [
  [0, 2],
  [3, 0],
  [1, 3],
  [4, 1],
]
// Output: 4

console.log(largestPathValue(colors, edges))
