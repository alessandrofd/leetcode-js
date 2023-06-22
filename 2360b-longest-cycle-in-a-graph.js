/**
 * You are given a directed graph of n nodes numbered from 0 to n - 1,
 * where each node has at most one outgoing edge.
 *
 * The graph is represented with a given 0-indexed array edges of size n,
 * indicating that there is a directed edge from node i to node edges[i].
 * If there is no outgoing edge from node i, then edges[i] == -1.
 *
 * Return the length of the longest cycle in the graph. If no cycle exists,
 * return -1.
 *
 * A cycle is a path that starts and ends at the same node.
 *
 * Constraints:
 *    n == edges.length
 *    2 <= n <= 10^5
 *    -1 <= edges[i] < n
 *    edges[i] != i
 */

/**
 * O fato de haver apenas uma aresta saindo de cada nó implica que um nó pode
 * participar de no máximo um ciclo. Isto não quer dizer que o nó fará
 * necessariamente parte de um ciclo. E mesmo que o faça, não há garantia de que
 * todo o caminho (ou caminhos) de que faz parte comporá o ciclo.
 *
 * Como o nó participará de apenas um ciclo poderemos manter uma lista
 * de nós visitados. Ao percorrer um caminho, se alcançarmos um nó que já tenha
 * sido visitado sabemos que um ciclo se fechou e que este caminho não gerará
 * novos ciclos. No entanto, o caminho pode ser mais comprido que o ciclo.
 * Logo, temos que ter um contador que permita calcular a distância do ciclo,
 * portanto, não basta termos um set com os nós visitados, temos que ter uma
 * estrutura de dados mais robusta.
 *
 * Ao percorrer um caminho há a possibilidade de ele chegar a um outro caminho
 * já percorrido. Não basta consultar a lista de nós já visitados pois temos que
 * distinguir uma junção entre caminhos e um ciclo.
 *
 * Vamos tentar utilizar duas estruturas, uma para o caminho percorrido,
 * onde teremos não só os nós visitados como um contador que permita calcular
 * o tamanho do ciclo e uma lista apenas com os nó visitados.
 */

/**
 * @param {number[]} edges
 * @return {number}
 */
const longestCycle_dfs = (edges) => {}

/**
 * Podemos consolidar as duas estruturas de dados da solução anterior: o set e
 * o map e um único vetor. O vetor marcará se o nó foi visitado e a sua posição
 * no caminho percorrido.
 *
 * No entanto, temos que ter um mecanismo para separar os caminhos percorridos.
 * Neste caso, manteremos um único contador para todo o grafo que será
 * incrementado toda vez que um nó for visitado pela primeira vez. Toda vez que
 * iniciamos um novo caminho marcamos o início deste caminho armazenando
 * o contador do seu primeiro nó. Logo, ao visitar um nó pela segunda vez,
 * podemos verificar se ele pertence ao caminho corrente e, portanto, é o ponto
 * final de um ciclo. Caso contrário, o caminho é um ramo de um outro caminho já
 * percorrido e não traz em si um ciclo.
 */

/**
 * @param {number[]} edges
 * @return {number}
 */
const longestCycle_dfs_array = (edges) => {}

/**
 * Uma alternativa para não termos duas estruturas de dados é utilizar
 *  o algoritmo de Kahn para descartar os nós que não pertencecm a um ciclo.
 * O algoritmos de Kahn destina-se a ordenar topologicamente os nós de um grafo
 * acíclico. No caso de um grafo cíclico, após a sua aplicação restará ainda
 * aqueles nós que fazem parte de ciclos, que, por definição não podem ser
 * ordenados topologicamente, mas são o foco deste problema. Logo, a ideia é
 * aplicar o algoritmo de Kahn não para cumprir o seu objetivo primordial,
 * mas para processar mais eficientemente aquilo que é o seu subproduto.
 *
 * O primeiro passo é identificar os pontos de partida do grafo, ou seja aqueles
 * nós para os quais nenhum outro nó aponta, que denominaremos de folhas.
 * Para tanto, temos que antes contabilizar a quantidade de arestas que chegam
 * a cada nó. Em seguida eliminamos as folhas do grafo (na verdade as marcamoms
 * como visitdas) e debitamos da quantidade de arestas de chegada dos nós para
 * os quais eles apontam. Se após esta operação houver novos nós sem arestas de
 * entrada, eles serão considerados folhas e processados até que não consigamos
 * mais identificar novas folhas.
 *
 * Por definição, o que sobrou do grafo pertence a ciclos. Isto porque não
 * haverá em um ciclo um nó que não tenha ao menos uma aresta apontando para ele
 * originada de um nó do mesmo ciclo. Logo, não há um "ponto de entrada" para
 * que o algoritmo de Kahn consuma estes nós. Podemos então visitar os nós que
 * não ainda não tenha sido visitados e percorrer os ciclos aos quais pertencem.
 * Indentificaremos o final de um ciclo utilizando a mesma estrutura de nós
 * visitados do algoritmo de Kahn.
 *
 * Como era de se esperar o algoritmo teve ganho em termos de espaço mas o seu
 * desempenho foi inferior ao do DFS.
 */

const longestCycle_kahn = (edges) => {}

edges = [3, 3, 4, 2, 3]
// Output: 3

// edges = [2, -1, 3, 1]
// Output: -1

edges = [-1, 4, -1, 2, 0, 4]
// Output: -1

console.log(longestCycle_dfs(edges))
console.log(longestCycle_dfs_array(edges))
console.log(longestCycle_kahn(edges))
