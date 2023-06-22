/**
 * You are given a tree (i.e. a connected, undirected graph that has no cycles)
 * consisting of n nodes numbered from 0 to n - 1 and exactly n - 1 edges.
 * The root of the tree is the node 0, and each node of the tree has a label
 * which is a lower-case character given in the string labels (i.e. The node
 * with the number i has the label labels[i]).
 *
 * The edges array is given on the form edges[i] = [ai, bi], which means there
 * is an edge between nodes ai and bi in the tree.
 *
 * Return an array of size n where ans[i] is the number of nodes in the subtree
 * of the ith node which have the same label as node i.
 *
 * A subtree of a tree T is the tree consisting of a node in T and all of its
 * descendant nodes.
 *
 * Constraints:
 *    1 <= n <= 10^5
 *    edges.length == n - 1
 *    edges[i].length == 2
 *    0 <= ai, bi < n
 *    ai != bi
 *    labels.length == n
 *    labels is consisting of only of lowercase English letters.
 */

/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {string} labels
 * @return {number[]}
 */
// Approach 1: Depth First Search - Mapas separados
const countSubTrees_dfs = (n, edges, labels) => {
  const adjs = new Array(n).fill().map((_) => [])
  for (const [u, v] of edges) {
    adjs[u].push(v)
    adjs[v].push(u)
  }

  const mergeMaps = (m1, m2) => {
    const merged = new Map(m1)
    for (const [key, value] of m2)
      merged.set(key, (merged.get(key) ?? 0) + value)
    return merged
  }

  const result = []
  const dfs = (node, parent) => {
    let map = new Map()
    for (const child of adjs[node])
      if (child !== parent) map = mergeMaps(map, dfs(child, node))
    map.set(labels[node], (map.get(labels[node]) ?? 0) + 1)
    result[node] = map.get(labels[node])
    return map
  }

  dfs(0, -1)
  return result
}

// Approach 1: DFS - Um único mapa - ajuste é feito subtraindo os valores
// apurados antes de se processar a subtree. À primeira vista pode parecer uma
// aplicação de backtracking

const countSubTrees_backtracking = (n, edges, labels) => {
  const adjs = new Array(n).fill().map((_) => [])
  for (const [u, v] of edges) {
    adjs[u].push(v)
    adjs[v].push(u)
  }

  const map = new Map()
  const result = []
  const dfs = (node, parent) => {
    const count = map.get(labels[node]) ?? 0
    for (const child of adjs[node]) if (child !== parent) dfs(child, node)
    map.set(labels[node], (map.get(labels[node]) ?? 0) + 1)
    result[node] = map.get(labels[node]) - count
  }

  dfs(0, -1)
  return result
}

// Approach 2: Breadth First Search - Maps - Estouro de pilha
// Inicialmente navega até as folhas e escala a árvore a partir delas
// incrementando os demais nós e retirando as folhas da árvore, tornando nós
// intermediários folhas.
// Ele é um BFS ao contrário pois começa com as folhas. Neste caso conseguimos
// enxergar a diferença entre o BFS e o Bottom-Up, pois o processamento das
// folhas para a raiz é típico do Top-Down
const countSubTrees_bfs_mapas = (n, edges, labels) => {
  const adjs = new Array(n).fill().map((_) => [])
  for (const [u, v] of edges) {
    adjs[u].push(v)
    adjs[v].push(u)
  }

  const mergeMaps = (m1, m2) => {
    const merged = new Map(m1)
    for (const [key, value] of m2)
      merged.set(key, (merged.get(key) ?? 0) + value)
    return merged
  }

  const result = []

  const queue = []
  const maps = new Array(n).fill().map((_) => new Map())
  for (let i = 0; i < n; i++) {
    if (i !== 0 && adjs[i].length === 1) queue.push(i)
    maps[i].set(labels[i], 1)
  }
  while (queue.length) {
    const leaf = queue.shift()
    result[leaf] = maps[leaf].get(labels[leaf])

    const parent = adjs[leaf][0]
    const child = adjs[parent].indexOf(leaf)
    adjs[parent].splice(child, 1)

    maps[parent] = mergeMaps(maps[parent], maps[leaf])

    if (parent !== 0 && adjs[parent].length === 1) queue.push(parent)
  }
  result[0] = maps[0].get(labels[0])

  return result
}

// Approach 2: Breadth First Search - Vetores
// Mesma lógica do abordagem BFS com Mapas, mas utilizando vetores para tentar
// evitar o estouro de pilha
const countSubTrees_bfs_vetores = (n, edges, labels) => {
  const adjs = new Array(n).fill().map((_) => [])
  for (const [u, v] of edges) {
    adjs[u].push(v)
    adjs[v].push(u)
  }

  const index = (i) => labels[i].charCodeAt() - 97

  const result = []

  const queue = []
  const counts = new Array(n).fill().map((_) => new Array(26).fill(0))
  for (let i = 0; i < n; i++) {
    if (i !== 0 && adjs[i].length === 1) queue.push(i)
    counts[i][index(i)] = 1
  }
  while (queue.length) {
    const leaf = queue.shift()
    result[leaf] = counts[leaf][index(leaf)]

    const parent = adjs[leaf][0]
    const child = adjs[parent].indexOf(leaf)
    adjs[parent].splice(child, 1)

    for (let i = 0; i < 26; i++) counts[parent][i] += counts[leaf][i]

    if (parent !== 0 && adjs[parent].length === 1) queue.push(parent)
  }
  result[0] = counts[0][index(0)]

  return result
}

n = 7
edges = [
  [0, 1],
  [0, 2],
  [1, 4],
  [1, 5],
  [2, 3],
  [2, 6],
]
labels = 'abaedcd'
// Output: [2,1,1,1,1,1,1]

n = 4
edges = [
  [0, 1],
  [1, 2],
  [0, 3],
]
labels = 'bbbb'
// Output: [4,2,1,1]

n = 5
edges = [
  [0, 1],
  [0, 2],
  [1, 3],
  [0, 4],
]
labels = 'aabab'
// Output: [3,2,1,1,1]

n = 4
edges = [
  [0, 2],
  [0, 3],
  [1, 2],
]
labels = 'aeed'
// Expected: [1, 1, 2, 1]

console.log(countSubTrees_dfs(n, edges, labels))
console.log(countSubTrees_backtracking(n, edges, labels))
console.log(countSubTrees_bfs_mapas(n, edges, labels))
console.log(countSubTrees_bfs_vetores(n, edges, labels))
