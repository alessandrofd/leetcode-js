/**
 * You are given an m x n grid grid where:
 *
 *    '.' is an empty cell.
 *    '#' is a wall.
 *    '@' is the starting point.
 *    Lowercase letters represent keys.
 *    Uppercase letters represent locks.
 *
 * You start at the starting point and one move consists of walking one space in
 * one of the four cardinal directions. You cannot walk outside the grid,
 * or walk into a wall.
 *
 * If you walk over a key, you can pick it up and you cannot walk over a lock
 * unless you have its corresponding key.
 *
 * For some 1 <= k <= 6, there is exactly one lowercase and one uppercase letter
 * of the first k letters of the English alphabet in the grid. This means that
 * there is exactly one key for each lock, and one lock for each key; and also
 * that the letters used to represent the keys and locks were chosen in the same
 * order as the English alphabet.
 *
 * Return the lowest number of moves to acquire all keys. If it is impossible,
 * return -1.
 *
 * Constraints:
 *    m == grid.length
 *    n == grid[i].length
 *    1 <= m, n <= 30
 *    grid[i][j] is either an English letter, '.', '#', or '@'.
 *    The number of keys in the grid is in the range [1, 6].
 *    Each key in the grid is unique.
 *    Each key in the grid has a matching lock.
 */

// BFS. O pulo do gato é que cada vez que encontramos uma chave temos que zerar
// as células visitadas

/**
 * @param {string[]} grid
 * @return {number}
 */

const shortestPathAllKeys = (grid) => {
  const hash = (char) => 1 << ((char.charCodeAt() & 31) - 1)
  const isKey = (char) => /[abcdef]/.test(char)
  const isLock = (char) => /[ABCDEF]/.test(char)
  const isLocked = (cell, keys) => isLock(cell) && !(hash(cell) & keys)

  const m = grid.length
  const n = grid[0].length

  const moves = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ]

  let countKeys = 0
  const queue = []

  for (let row = 0; row < m; row++) {
    for (let col = 0; col < n; col++) {
      const cell = grid[row][col]
      if (cell === '@') queue.push([row, col, 0, 0])
      else if (isKey(cell)) countKeys++
    }
  }

  const allKeys = 2 ** countKeys - 1

  const visited = Array.from(Array(m), () => Array.from(Array(n), () => []))

  while (queue.length > 0) {
    let [row, col, keys, distance] = queue.shift()

    if (row < 0 || row >= m || col < 0 || col >= n) continue
    const cell = grid[row][col]

    if (visited[row][col][keys] || cell === '#') continue

    visited[row][col][keys] = true

    if (isLocked(cell, keys)) continue

    if (isKey(cell)) keys |= hash(cell)
    if (keys === allKeys) return distance

    for (const [moveRow, moveCol] of moves)
      queue.push([row + moveRow, col + moveCol, keys, distance + 1])
  }
  return -1
}

grid = ['@.a..', '###.#', 'b.A.B']
// Expected: 8

grid = ['@..aA', '..B#.', '....b']
// Expected: 6

grid = ['@Aa']
// Expected: -1

console.log(shortestPathAllKeys(grid))

x = 31
console.log(x.toString(2))
console.log('a'.charCodeAt().toString(2))
console.log('A'.charCodeAt().toString(2))
console.log('a'.charCodeAt() & 31)
console.log('A'.charCodeAt() & 31)
