/**
 * On a 2D plane, we place n stones at some integer coordinate points. Each
 * coordinate point may have at most one stone.
 *
 * A stone can be removed if it shares either the same row or the same column as
 *  another stone that has not been removed.
 *
 * Given an array stones of length n where stones[i] = [xi, yi] represents the
 * location of the ith stone, return the largest possible number of stones that
 * can be removed.
 *
 * Constraints:
 *    1 <= stones.length <= 1000
 *    0 <= xi, yi <= 10^4
 *    No two stones are at the same coordinate point.
 */

/**
 * @param {number[][]} stones
 * @return {number}
 */
// Approach 1: Depth-First Search (DFS)
const removeStones_1 = (stones) => {
  const dfs = (adjacents, visited, node) => {
    visited[node] = true
    for (const adjacent of adjacents[node])
      if (!visited[adjacent]) dfs(adjacents, visited, adjacent)
  }

  const adjacents = new Array(stones.length).fill().map((_) => [])
  for (let i = 0; i < stones.length; i++) {
    const [xi, yi] = stones[i]
    for (let j = i + 1; j < stones.length; j++) {
      const [xj, yj] = stones[j]
      if (xi === xj || yi === yj) {
        adjacents[i].push(j)
        adjacents[j].push(i)
      }
    }
  }

  const visited = new Array(stones.length).fill(false)

  let remainingStones = 0

  for (let i = 0; i < stones.length; i++) {
    if (!visited[i]) {
      remainingStones++
      dfs(adjacents, visited, i)
    }
  }

  return stones.length - remainingStones
}

// Approach 2: Disjoint Set Union (DSU)
const removeStones_2 = (stones) => {
  const rep = new Array(stones.length).fill().map((_, i) => i)
  const size = new Array(stones.length).fill(1)

  const find = (x) => (rep[x] === x ? x : find(rep[x]))

  const performUnion = (x, y) => {
    x = find(x)
    y = find(y)

    if (x === y) return 0

    if (size[x] > size[y]) {
      rep[y] = x
      size[x] += size[y]
    } else {
      rep[x] = y
      size[y] += size[x]
    }

    return 1
  }

  let remainingStones = stones.length

  for (let i = 0; i < stones.length; i++) {
    const [xi, yi] = stones[i]
    for (let j = i + 1; j < stones.length; j++) {
      const [xj, yj] = stones[j]
      if (xi === xj || yi === yj) {
        remainingStones -= performUnion(i, j)
      }
    }
  }
  return stones.length - remainingStones
}

// Approach 3: Optimized Depth-First Search (DFS)
const removeStones_3 = (stones) => {
  console.log(stones.length)
  const K = 10001
  const adj = new Array(2 * K).fill().map((_) => [])
  for (let i = 0; i < stones.length; i++) {
    let [x, y] = stones[i]
    y += K
    adj[x].push(y)
    adj[y].push(x)
  }

  const visited = new Array(2 * K).fill(false)

  const dfs = (coord) => {
    visited[coord] = true
    for (const adjacent of adj[coord]) {
      if (!visited[adjacent]) {
        dfs(adjacent)
      }
    }
  }

  let remainingStones = 0
  for (let i = 0; i < adj.length; i++) {
    // adj[i].length > 0 indica que existe ao menos 1 pedra nesta linha/coluna
    if (!visited[i] && adj[i].length > 0) {
      remainingStones++
      dfs(i)
    }
  }

  return stones.length - remainingStones
}

// Approach 4: Optimized Disjoint Set Union (DSU)
const removeStones_4 = (stones) => {
  const K = 10001

  const rep = new Array(2 * K).fill().map((_, i) => i)
  const size = new Array(2 * K).fill(1)

  const find = (x) => (x === rep[x] ? x : find(rep[x]))

  const performUnion = (x, y) => {
    x = find(x)
    y = find(y)

    if (x === y) return 0

    if (size[x] > size[y]) {
      rep[y] = x
      size[x] += size[y]
    } else {
      rep[x] = y
      size[y] += size[x]
    }

    return 1
  }

  const coords = new Set()

  let count = 0

  for (const [x, y] of stones) {
    if (!coords.has(x)) {
      coords.add(x)
      count++
    }

    if (!coords.has(y + K)) {
      coords.add(y + K)
      count++
    }
  }

  for (const [x, y] of stones) count -= performUnion(x, y + K)

  return stones.length - count
}

// Top submission
const removeStones = (stones) => {
  const n = stones.length
  const visited = new Array(n).fill(false)
  const rows = new Map()
  const cols = new Map()

  for (let i = 0; i < n; i++) {
    const [x, y] = stones[i]
    rows.has(x) ? rows.get(x).push(i) : rows.set(x, [i])
    cols.has(y) ? cols.get(y).push(i) : cols.set(y, [i])
  }

  const exploreForests = (i) => {
    if (visited[i]) return
    visited[i] = true

    const [x, y] = stones[i]
    for (const j of rows.get(x)) exploreForests(j)
    for (const j of cols.get(y)) exploreForests(j)
  }

  let forests = 0
  for (let i = 0; i < n; i++) {
    if (visited[i]) continue
    exploreForests(i)
    forests++
  }

  return n - forests
}

stones = [
  [0, 0],
  [0, 1],
  [1, 0],
  [1, 2],
  [2, 1],
  [2, 2],
]
// Output: 5
// Explanation: One way to remove 5 stones is as follows:
// 1. Remove stone [2,2] because it shares the same row as [2,1].
// 2. Remove stone [2,1] because it shares the same column as [0,1].
// 3. Remove stone [1,2] because it shares the same row as [1,0].
// 4. Remove stone [1,0] because it shares the same column as [0,0].
// 5. Remove stone [0,1] because it shares the same row as [0,0].
// Stone [0,0] cannot be removed since it does not share a row/column with another stone still on the plane.

stones = [
  [0, 0],
  [0, 2],
  [1, 1],
  [2, 0],
  [2, 2],
]
// Output: 3
// Explanation: One way to make 3 moves is as follows:
// 1. Remove stone [2,2] because it shares the same row as [2,0].
// 2. Remove stone [2,0] because it shares the same column as [0,0].
// 3. Remove stone [0,2] because it shares the same row as [0,0].
// Stones [0,0] and [1,1] cannot be removed since they do not share a row/column with another stone still on the plane.

stones = [[0, 0]]
// Output: 0
// Explanation: [0,0] is the only stone on the plane, so you cannot remove it.

console.log(removeStones(stones))
