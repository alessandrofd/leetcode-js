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
  // const possibleBipartition = (n, dislikes) => {
  const enemies = new Array(n + 1).fill().map((_) => [])
  for (const [u, v] of dislikes) {
    enemies[u].push(v)
    enemies[v].push(u)
  }

  const friend = new Array(n + 1)
  for (let node = 1; node <= n; node++) {
    if (friend[node] !== undefined) continue
    friend[node] = true

    const queue = [node]
    while (queue.length) {
      const person = queue.shift()
      for (enemy of enemies[person]) {
        if (friend[person] === friend[enemy]) return false
        if (friend[enemy] === undefined) {
          friend[enemy] = !friend[person]
          queue.push(enemy)
        }
      }
    }
  }
  return true
}

// Approach 2: Depth First Search
const possibleBipartition_DFS = (n, dislikes) => {
  // const possibleBipartition = (n, dislikes) => {
  const adjs = new Array(n + 1).fill().map((_) => [])
  for (const [u, v] of dislikes) {
    adjs[u].push(v)
    adjs[v].push(u)
  }

  const colors = new Array(n + 1)

  const dfs = (node, color) => {
    colors[node] = color
    for (const adj of adjs[node]) {
      if (colors[adj] === colors[node]) return false
      if (colors[adj] === undefined) if (!dfs(adj, !color)) return false
    }
    return true
  }

  for (let i = 1; i <= n; i++)
    if (colors[i] === undefined) if (!dfs(i, true)) return false

  return true
}

// Approach 3: Union-Find - Disjoint Set Union (DSU)
// const possibleBipartition_unionFind = (n, dislikes) => {
const possibleBipartition = (n, dislikes) => {
  const reps = Array.from(Array(n + 1).keys())
  const sizes = new Array(n + 1).fill(1)

  const find = (i) => {
    if (i === reps[i]) return i
    return (reps[i] = find(reps[i]))
  }

  const union = (i, j) => {
    i = find(i)
    j = find(j)

    if (i === j) return

    if (sizes[i] > sizes[j]) {
      sizes[i] += sizes[j]
      reps[j] = i
    } else {
      sizes[j] += sizes[i]
      reps[i] = j
    }
  }

  const adjs = new Array(n + 1).fill().map((_) => [])
  for (const [u, v] of dislikes) {
    adjs[u].push(v)
    adjs[v].push(u)
  }

  for (let node = 1; node <= n; node++) {
    for (const adj of adjs[node]) {
      if (find(adj) === find(node)) return false
      union(adjs[node][0], adj)
    }
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

n = 3
dislikes = [
  [1, 2],
  [1, 3],
  [2, 3],
]
Output: false

n = 5
dislikes = [
  [1, 2],
  [2, 3],
  [3, 4],
  [4, 5],
  [1, 5],
]
// Output: false

console.log(possibleBipartition(n, dislikes))
