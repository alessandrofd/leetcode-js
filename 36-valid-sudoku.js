/**
 * Determine if a 9 x 9 Sudoku board is valid. Only the filled cells need to be
 * validated according to the following rules:
 *    Each row must contain the digits 1-9 without repetition.
 *    Each column must contain the digits 1-9 without repetition.
 *    Each of the nine 3 x 3 sub-boxes of the grid must contain the digits 1-9
 *    without repetition.
 *
 * Note:
 *    A Sudoku board (partially filled) could be valid but is not necessarily
 *    solvable.
 *    Only the filled cells need to be validated according to the mentioned
 *    rules.
 *
 * Constraints:
 *    board.length == 9
 *    board[i].length == 9
 *    board[i][j] is a digit 1-9 or '.'.
 */

/**
 * @param {character[][]} board
 * @return {boolean}
 */
//Approach 1: Hash Set
const isValidSudoku_set = (board) => {
  const rows = new Array(9).fill().map((_) => new Set())
  const cols = new Array(9).fill().map((_) => new Set())
  const boxes = new Array(9).fill().map((_) => new Set())

  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === '.') continue

      if (rows[row].has(board[row][col])) return false
      rows[row].add(board[row][col])

      if (cols[col].has(board[row][col])) return false
      cols[col].add(board[row][col])

      const idx = ((row / 3) | 0) + 3 * ((col / 3) | 0)
      if (boxes[idx].has(board[row][col])) return false
      boxes[idx].add(board[row][col])
    }
  }
  return true
}

// Approach 2: Array of Fixed Length
const isValidSudoku_array = (board) => {
  const rows = new Array(9).fill().map((_) => new Array(9).fill(false))
  const cols = new Array(9).fill().map((_) => new Array(9).fill(false))
  const boxes = new Array(9).fill().map((_) => new Array(9).fill(false))

  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === '.') continue

      const pos = board[row][col].charCodeAt() - '0'.charCodeAt()

      if (rows[row][pos]) return false
      rows[row][pos] = true

      if (cols[col][pos]) return false
      cols[col][pos] = true

      const box = ((row / 3) | 0) + 3 * ((col / 3) | 0)
      if (boxes[box][pos]) return false
      boxes[box][pos] = true
    }
  }
  return true
}

// Approach 3: Bitmasking
const isValidSudoku_bitmask = (board) => {
  const rows = new Array(9).fill().map((_) => new Array(9).fill(0))
  const cols = new Array(9).fill().map((_) => new Array(9).fill(0))
  const boxes = new Array(9).fill().map((_) => new Array(9).fill(0))

  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === '.') continue

      const pos = board[row][col].charCodeAt() - '0'.charCodeAt()
      const bit = 1 << (pos - 1)

      if (rows[row] & bit) return false
      rows[row] |= bit

      if (cols[col] & bit) return false
      cols[col] |= bit

      const box = ((row / 3) | 0) + 3 * ((col / 3) | 0)
      if (boxes[box] & bit) return false
      boxes[box] |= bit
    }
  }
  return true
}

// Approach 3: Bitmasking without charCodeAt
const isValidSudoku_bitmapNoCharCode = (board) => {
  const map = new Map([
    ['1', 0],
    ['2', 1],
    ['3', 2],
    ['4', 3],
    ['5', 4],
    ['6', 5],
    ['7', 6],
    ['8', 7],
    ['9', 8],
  ])
  const rows = new Array(9).fill().map((_) => new Array(9).fill(0))
  const cols = new Array(9).fill().map((_) => new Array(9).fill(0))
  const boxes = new Array(9).fill().map((_) => new Array(9).fill(0))

  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === '.') continue

      const bit = 1 << (map.get(board[row][col]) - 1)

      if (rows[row] & bit) return false
      rows[row] |= bit

      if (cols[col] & bit) return false
      cols[col] |= bit

      const box = ((row / 3) | 0) + 3 * ((col / 3) | 0)
      if (boxes[box] & bit) return false
      boxes[box] |= bit
    }
  }
  return true
}

board = [
  ['5', '3', '.', '.', '7', '.', '.', '.', '.'],
  ['6', '.', '.', '1', '9', '5', '.', '.', '.'],
  ['.', '9', '8', '.', '.', '.', '.', '6', '.'],
  ['8', '.', '.', '.', '6', '.', '.', '.', '3'],
  ['4', '.', '.', '8', '.', '3', '.', '.', '1'],
  ['7', '.', '.', '.', '2', '.', '.', '.', '6'],
  ['.', '6', '.', '.', '.', '.', '2', '8', '.'],
  ['.', '.', '.', '4', '1', '9', '.', '.', '5'],
  ['.', '.', '.', '.', '8', '.', '.', '7', '9'],
]
// Output: true

// board = [
//   ['8', '3', '.', '.', '7', '.', '.', '.', '.'],
//   ['6', '.', '.', '1', '9', '5', '.', '.', '.'],
//   ['.', '9', '8', '.', '.', '.', '.', '6', '.'],
//   ['8', '.', '.', '.', '6', '.', '.', '.', '3'],
//   ['4', '.', '.', '8', '.', '3', '.', '.', '1'],
//   ['7', '.', '.', '.', '2', '.', '.', '.', '6'],
//   ['.', '6', '.', '.', '.', '.', '2', '8', '.'],
//   ['.', '.', '.', '4', '1', '9', '.', '.', '5'],
//   ['.', '.', '.', '.', '8', '.', '.', '7', '9'],
// ]
// Output: false

console.log(isValidSudoku(board))
