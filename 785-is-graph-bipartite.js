/**
 * There is an undirected graph with n nodes, where each node is numbered
 * between 0 and n - 1. You are given a 2D array graph, where graph[u] is
 * an array of nodes that node u is adjacent to. More formally, for each v in
 * graph[u], there is an undirected edge between node u and node v. The graph
 *  has the following properties:
 *
 *    There are no self-edges (graph[u] does not contain u).
 *
 *    There are no parallel edges (graph[u] does not contain duplicate values).
 *
 *    If v is in graph[u], then u is in graph[v] (the graph is undirected).
 *
 *    The graph may not be connected, meaning there may be two nodes u and v
 *    such that there is no path between them.
 *
 * A graph is bipartite if the nodes can be partitioned into two independent
 * sets A and B such that every edge in the graph connects a node in set A and
 * a node in set B.
 *
 * Return true if and only if it is bipartite.
 *
 * Constraints:
 *    graph.length == n
 *    1 <= n <= 100
 *    0 <= graph[u].length < n
 *    0 <= graph[u][i] <= n - 1
 *    graph[u] does not contain u.
 *    All the values of graph[u] are unique.
 *    If graph[u] contains v, then graph[v] contains u.
 */

/**
 * @param {number[][]} graph
 * @return {boolean}
 */
const isBipartite_old = (graph) => {
  color = new Array(graph.length).fill(-1)
  for (i = 0; i < graph.length; i++) {
    if (color[i] === -1) {
      stack = []
      stack.push(i)
      color[i] = 0

      while (stack.length) {
        node = stack.pop()
        for (adj of graph[node]) {
          if (color[adj] === -1) {
            stack.push(adj)
            color[adj] = color[node] ^ 1
          } else if (color[adj] === color[node]) {
            return false
          }
        }
      }
    }
  }
  return true
}

/** A cada nó, os seus nós adjacentes não podem estar concectados entre si.
 * Essa é uma condição necessári
 * a mas não suficiente. Pode exmplo, se houver
 * um ciclo com número ímpar de elementos o grafo não será bipartite apesar
 * da condição dos adjacentes de um mesmo nó não estarem conectados entre si.
 *
 * Podemos criar grupos distribuir os nós nestes grupos
 * */

/**
 * @param {number[][]} graph
 * @return {boolean}
 */
const isBipartite_recurse = (graph) => {
  const n = graph.length
  const members = new Array(n)

  const recurse = (nodes, group) => {
    for (const node of nodes) {
      if (members[node] != undefined) {
        if (members[node] !== group) return false
      } else {
        members[node] = group
        if (!recurse(graph[node], !group)) return false
      }
    }
    return true
  }

  for (let node = 0; node < n; node++) {
    if (members[node] === undefined) {
      members[node] = true
      if (!recurse(graph[node], false)) return false
    }
  }
  return true
}

/**
 * @param {number[][]} graph
 * @return {boolean}
 */
const isBipartite_stack = (graph) => {
  const n = graph.length
  const members = new Array(n)
  const stack = []

  for (let node = 0; node < n; node++) {
    if (members[node] !== undefined) continue
    members[node] = true
    stack.push(node)

    while (stack.length) {
      const top = stack.pop()
      for (let neighbor of graph[top]) {
        if (members[neighbor] === members[top]) return false
        if (members[neighbor] === undefined) {
          members[neighbor] = !members[top]
          stack.push(neighbor)
        }
      }
    }
  }
  return true
}

// prettier-ignore
graph = [ [1, 2, 3], [0, 2], [0, 1, 3], [0, 2], ]
// Expected: false

// prettier-ignore
graph = [ [1, 3], [0, 2], [1, 3], [0, 2], ]
// Expected: true

// prettier-ignore
graph = [ [4, 1], [0, 2], [1, 3], [2, 4], [3, 0], ]
// Expected: false

console.log(isBipartite_recurse(graph))
console.log(isBipartite_stack(graph))
