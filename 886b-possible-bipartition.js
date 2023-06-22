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
  const adjs = new Array(n + 1).fill().map((_) => [])
  for (const [u, v] of dislikes) {
    adjs[u].push(v)
    adjs[v].push(u)
  }

  const group = []

  for (let root = 1; root <= n; root++) {
    if (group[root] === undefined) {
      group[root] = true
      const queue = [root]
      while (queue.length) {
        const node = queue.shift()
        for (const adj of adjs[node]) {
          if (group[adj] === group[node]) return false
          if (group[adj] === undefined) {
            group[adj] = !group[node]
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
  // const possibleBipartition = (n, dislikes) => {
  const adjs = new Array(n + 1).fill().map((_) => [])
  for (const [u, v] of dislikes) {
    adjs[u].push(v)
    adjs[v].push(u)
  }

  group = []

  const dfs = (node) => {
    for (const adj of adjs[node]) {
      if (group[adj] === group[node]) return false
      if (group[adj] === undefined) {
        group[adj] = !group[node]
        if (!dfs(adj)) return false
      }
    }
    return true
  }

  for (let root = 1; root <= n; root++) {
    if (group[root] === undefined) {
      group[root] = true
      if (!dfs(root)) return false
    }
  }
  return true
}

// Approach 3: Union-Find - Disjoint Set Union (DSU)
// const possibleBipartition_unionFind = (n, dislikes) => {
const possibleBipartition = (n, dislikes) => {
  const adjs = Array(n + 1)
    .fill()
    .map((_) => [])
  for (const [u, v] of dislikes) {
    adjs[u].push(v)
    adjs[v].push(u)
  }

  const reps = Array.from(Array(n + 1).keys())
  const sizes = Array(n + 1).fill(0)

  const find = (i) => {
    if (reps[i] === i) return i
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

  for (let root = 1; root <= n; root++) {
    for (const adj of adjs[root]) union(adjs[root][0], adj)
    if (reps[root] === reps[adjs[root][0]]) return false
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

n = 3
dislikes = [
  [1, 2],
  [1, 3],
  [2, 3],
]
// Output: false

n = 5
dislikes = [
  [1, 2],
  [2, 3],
  [3, 4],
  [4, 5],
  [1, 5],
]
// Output: false

n = 50
dislikes = [
  [21, 47],
  [4, 41],
  [2, 41],
  [36, 42],
  [32, 45],
  [26, 28],
  [32, 44],
  [5, 41],
  [29, 44],
  [10, 46],
  [1, 6],
  [7, 42],
  [46, 49],
  [17, 46],
  [32, 35],
  [11, 48],
  [37, 48],
  [37, 43],
  [8, 41],
  [16, 22],
  [41, 43],
  [11, 27],
  [22, 44],
  [22, 28],
  [18, 37],
  [5, 11],
  [18, 46],
  [22, 48],
  [1, 17],
  [2, 32],
  [21, 37],
  [7, 22],
  [23, 41],
  [30, 39],
  [6, 41],
  [10, 22],
  [36, 41],
  [22, 25],
  [1, 12],
  [2, 11],
  [45, 46],
  [2, 22],
  [1, 38],
  [47, 50],
  [11, 15],
  [2, 37],
  [1, 43],
  [30, 45],
  [4, 32],
  [28, 37],
  [1, 21],
  [23, 37],
  [5, 37],
  [29, 40],
  [6, 42],
  [3, 11],
  [40, 42],
  [26, 49],
  [41, 50],
  [13, 41],
  [20, 47],
  [15, 26],
  [47, 49],
  [5, 30],
  [4, 42],
  [10, 30],
  [6, 29],
  [20, 42],
  [4, 37],
  [28, 42],
  [1, 16],
  [8, 32],
  [16, 29],
  [31, 47],
  [15, 47],
  [1, 5],
  [7, 37],
  [14, 47],
  [30, 48],
  [1, 10],
  [26, 43],
  [15, 46],
  [42, 45],
  [18, 42],
  [25, 42],
  [38, 41],
  [32, 39],
  [6, 30],
  [29, 33],
  [34, 37],
  [26, 38],
  [3, 22],
  [18, 47],
  [42, 48],
  [22, 49],
  [26, 34],
  [22, 36],
  [29, 36],
  [11, 25],
  [41, 44],
  [6, 46],
  [13, 22],
  [11, 16],
  [10, 37],
  [42, 43],
  [12, 32],
  [1, 48],
  [26, 40],
  [22, 50],
  [17, 26],
  [4, 22],
  [11, 14],
  [26, 39],
  [7, 11],
  [23, 26],
  [1, 20],
  [32, 33],
  [30, 33],
  [1, 25],
  [2, 30],
  [2, 46],
  [26, 45],
  [47, 48],
  [5, 29],
  [3, 37],
  [22, 34],
  [20, 22],
  [9, 47],
  [1, 4],
  [36, 46],
  [30, 49],
  [1, 9],
  [3, 26],
  [25, 41],
  [14, 29],
  [1, 35],
  [23, 42],
  [21, 32],
  [24, 46],
  [3, 32],
  [9, 42],
  [33, 37],
  [7, 30],
  [29, 45],
  [27, 30],
  [1, 7],
  [33, 42],
  [17, 47],
  [12, 47],
  [19, 41],
  [3, 42],
  [24, 26],
  [20, 29],
  [11, 23],
  [22, 40],
  [9, 37],
  [31, 32],
  [23, 46],
  [11, 38],
  [27, 29],
  [17, 37],
  [23, 30],
  [14, 42],
  [28, 30],
  [29, 31],
  [1, 8],
  [1, 36],
  [42, 50],
  [21, 41],
  [11, 18],
  [39, 41],
  [32, 34],
  [6, 37],
  [30, 38],
  [21, 46],
  [16, 37],
  [22, 24],
  [17, 32],
  [23, 29],
  [3, 30],
  [8, 30],
  [41, 48],
  [1, 39],
  [8, 47],
  [30, 44],
  [9, 46],
  [22, 45],
  [7, 26],
  [35, 42],
  [1, 27],
  [17, 30],
  [20, 46],
  [18, 29],
  [3, 29],
  [4, 30],
  [3, 46],
]

console.log(possibleBipartition(n, dislikes))
