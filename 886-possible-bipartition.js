/**
 * We want to split a group of n people (labeled from 1 to n) into two groups
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
  const adjacents = new Array(n + 1).fill().map((_) => [])
  for (const [v1, v2] of dislikes) {
    adjacents[v1].push(v2)
    adjacents[v2].push(v1)
  }

  const color = new Array(n + 1)

  const bfs = (node) => {
    color[node] = true
    const queue = [node]
    while (queue.length) {
      node = queue.shift()
      for (const adjacent of adjacents[node]) {
        if (color[adjacent] === color[node]) return false
        if (color[adjacent] === undefined) {
          color[adjacent] = !color[node]
          queue.push(adjacent)
        }
      }
    }
    return true
  }

  for (let node = 1; node <= n; node++) {
    if (color[node] === undefined) {
      if (!bfs(node)) {
        return false
      }
    }
  }
  return true
}

// Approach 2: Depth First Search
const possibleBipartition_DFS = (n, dislikes) => {
  // const possibleBipartition = (n, dislikes) => {
  const adjacents = new Array(n + 1).fill().map((_) => [])
  for (const [v1, v2] of dislikes) {
    adjacents[v1].push(v2)
    adjacents[v2].push(v1)
  }

  const colors = new Array(n + 1)

  const dfs = (node, color) => {
    colors[node] = color
    for (const adjacent of adjacents[node]) {
      if (colors[adjacent] === colors[node]) return false
      if (colors[adjacent] === undefined) {
        if (!dfs(adjacent, !color)) return false
      }
    }
    return true
  }

  for (let node = 1; node <= n; node++) {
    if (colors[node] === undefined) {
      if (!dfs(node, true)) {
        return false
      }
    }
  }
  return true
}

// Approach 3: Union-Find - Disjoint Set Union (DSU)
// const possibleBipartition_unionFind = (n, dislikes) => {
const possibleBipartition = (n, dislikes) => {
  const parents = Array.from(new Array(n + 1).keys())
  const ranks = new Array(n + 1).fill(0)

  const find = (i) => {
    if (i === parents[i]) return i
    return (parents[i] = find(parents[i]))
  }

  const union = (x, y) => {
    x = find(x)
    y = find(y)

    if (x === y) return

    if (ranks[x] >= ranks[y]) {
      ranks[x]++
      parents[y] = x
    } else {
      ranks[y]++
      parents[x] = y
    }
  }

  const adjacents = new Array(n + 1).fill().map((_) => [])
  for (const [x, y] of dislikes) {
    adjacents[x].push(y)
    adjacents[y].push(x)
  }

  for (let node = 1; node <= n; node++) {
    for (const adjacent of adjacents[node]) {
      if (find(adjacent) === find(node)) return false
      union(adjacents[node][0], adjacent)
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

console.log(possibleBipartition(n, dislikes))
