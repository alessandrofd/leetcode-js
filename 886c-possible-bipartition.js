/** We want to split a group of n people (labeled from 1 to n) into two groups
 * of any size. Each person may dislike some other people, and they should not
 * go into the same group.
 *
 * Given the integer n and the array dislikes where dislikes[i] = [ai, bi]
 * indicates that the person labeled ai does not like the person labeled bi,
 * return true if it is possible to split everyone into two groups in this way.
 *
 * Constraints:
 *    1 <= n <= 2000
 *    0 <= dislikes.length <= 10^4
 *    dislikes[i].length == 2
 *    1 <= dislikes[i][j] <= n
 *    ai < bi
 *    All the pairs of dislikes are unique.
 */

/**
 * @param {number} n
 * @param {number[][]} dislikes
 * @return {boolean}
 */
// Approach 1: Breadth First Search
const possibleBipartition_BFS = (n, dislikes) => {
  const adjs = new Array(n + 1).fill().map((_) => [])
  for (const [u, v] of dislikes) {
    adjs[u].push(v)
    adjs[v].push(u)
  }

  const groups = []

  for (let root = 1; root <= n; root++) {
    if (groups[root] === undefined) {
      groups[root] = true
      const queue = [root]
      while (queue.length) {
        const node = queue.shift()
        for (const adj of adjs[node]) {
          if (groups[adj] === groups[node]) return false
          if (groups[adj] === undefined) {
            groups[adj] = !groups[node]
            queue.push(adj)
          }
        }
      }
    }
  }
  return true
}

// Approach 2: Depth First Search
const possibleBipartition_DFS = (n, dislikes) => {
  const adjs = new Array(n + 1).fill().map((_) => [])
  for (const [u, v] of dislikes) {
    adjs[u].push(v)
    adjs[v].push(u)
  }

  const groups = []

  const dfs = (node) => {
    for (const adj of adjs[node]) {
      if (groups[adj] === groups[node]) return false
      if (groups[adj] === undefined) {
        groups[adj] = !groups[node]
        if (!dfs(adj)) return false
      }
    }
    return true
  }

  for (let root = 1; root <= n; root++)
    if (groups[root] === undefined) {
      groups[root] = true
      if (!dfs(root)) return false
    }
  return true
}

// Approach 3: Union-Find - Disjoint Set Union (DSU)
const possibleBipartition_unionFind = (n, dislikes) => {
  const adjs = new Array(n + 1).fill().map((_) => [])
  for (const [u, v] of dislikes) {
    adjs[u].push(v)
    adjs[v].push(u)
  }

  const parents = Array.from(Array(n + 1).keys())
  const sizes = new Array(n + 1).fill(1)

  const find = (i) => {
    if (parents[i] === i) return i
    return (parents[i] = find(parents[i]))
  }

  const union = (i, j) => {
    i = find(i)
    j = find(j)

    if (i === j) return

    if (sizes[i] > sizes[j]) {
      parents[j] = i
      sizes[i] += sizes[j]
    } else {
      parents[i] = j
      sizes[j] += sizes[i]
    }
  }

  for (let root = 1; root <= n; root++) {
    for (const adj of adjs[root]) union(adjs[root][0], adj)
    if (parents[root] === parents[adjs[root][0]]) return false
  }
  return true
}

n = 4
dislikes = [
  [1, 2],
  [1, 3],
  [2, 4],
]
// Output: true
// Explanation: group1 [1,4] and group2 [2,3].

// n = 3
// dislikes = [
//   [1, 2],
//   [1, 3],
//   [2, 3],
// ]
// Output: false

// n = 5
// dislikes = [
//   [1, 2],
//   [2, 3],
//   [3, 4],
//   [4, 5],
//   [1, 5],
// ]
// Output: false

console.log(possibleBipartition_BFS(n, dislikes))
console.log(possibleBipartition_DFS(n, dislikes))
console.log(possibleBipartition_unionFind(n, dislikes))
