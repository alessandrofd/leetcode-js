/**
 * Given a 0-indexed n x n integer matrix grid, return the number of pairs
 * (ri, cj) such that row ri and column cj are equal.
 *
 * A row and column pair is considered equal if they contain the same elements
 * in the same order (i.e., an equal array).
 *
 * Constraints:
 *    n == grid.length == grid[i].length
 *    1 <= n <= 200
 *    1 <= grid[i][j] <= 10^5
 */

/**
 * @param {number[][]} grid
 * @return {number}
 */
const equalPairs = (grid) => {
  const n = grid.length
  const transposed = grid[0].map((col, i) => grid.map((row) => row[i]))

  let result = 0
  for (let row = 0; row < n; row++)
    for (let col = 0; col < n; col++)
      if (grid[row].every((n, i) => n === transposed[col][i])) result += 1

  return result
}

/**
 * @param {number[][]} grid
 * @return {number}
 */
const equalPairs_hash = (grid) => {
  const n = grid.length

  const map = new Map()
  for (let row = 0; row < n; row++) {
    const key = grid[row].toString()
    map.set(key, (map.get(key) ?? 0) + 1)
  }

  const transposed = grid[0].map((col, i) => grid.map((row) => row[i]))
  let result = 0
  for (let row = 0; row < n; row++) {
    const key = transposed[row].toString()
    if (map.has(key)) result += map.get(key)
  }

  return result
}

/**
 * @param {number[][]} grid
 * @return {number}
 */
const equalPairs_trie = (grid) => {
  class TrieNode {
    constructor() {
      this.count = 0
      this.children = new Map()
    }
  }

  class Trie {
    constructor() {
      this.root = new TrieNode()
    }

    insert(arr) {
      let trie = this.root
      for (const num of arr) {
        if (!trie.children.has(num)) trie.children.set(num, new TrieNode())
        trie = trie.children.get(num)
      }
      trie.count += 1
    }

    search(arr) {
      let trie = this.root
      for (const num of arr) {
        if (trie.children.has(num)) trie = trie.children.get(num)
        else return 0
      }
      return trie.count
    }
  }

  const trie = new Trie()
  for (const row of grid) trie.insert(row)

  const transposed = grid[0].map((col, i) => grid.map((row) => row[i]))

  let result = 0
  for (let row of transposed) result += trie.search(row)

  return result
}

// prettier-ignore
grid = [[3,2,1],[1,7,6],[2,7,7]]
// Expected: 1

// prettier-ignore
// grid = [[3,1,2,2],[1,4,4,5],[2,4,2,2],[2,4,2,2]]
// Expected: 3

console.log(equalPairs(grid))
console.log(equalPairs_hash(grid))
console.log(equalPairs_trie(grid))
