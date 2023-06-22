/**
 * Given an m x n grid of characters board and a string word, return true if
 * word exists in the grid.
 *
 * The word can be constructed from letters of sequentially adjacent cells,
 * where adjacent cells are horizontally or vertically neighboring. The same
 * letter cell may not be used more than once.
 *
 * Constraints:
 *    m == board.length
 *    n = board[i].length
 *    1 <= m, n <= 6
 *    1 <= word.length <= 15
 *    board and word consists of only lowercase and uppercase English letters.
 */

/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
// Approach 1: Backtracking
const exist_backtracking = (board, word) => {
  const rows = board.length
  const cols = board[0].length

  const backtrack = (row, col, index) => {
    const dirs = [
      [0, 1],
      [1, 0],
      [0, -1],
      [-1, 0],
    ]

    if (index >= word.length) return true

    if (
      row < 0 ||
      row === rows ||
      col < 0 ||
      col === cols ||
      board[row][col] !== word[index]
    )
      return false

    board[row][col] = '#'
    let result = false
    for (const [dRow, dCol] of dirs) {
      result = backtrack(row + dRow, col + dCol, index + 1)
      if (result) break
    }
    board[row][col] = word[index]

    return result
  }

  for (let row = 0; row < rows; row++)
    for (let col = 0; col < cols; col++) if (backtrack(row, col, 0)) return true

  return false
}

// Top submission - Backtracking with optimizations
const exist = (board, word) => {
  const rows = board.length
  const cols = board[0].length

  const backtrack = (row, col, index) => {
    const dirs = [
      [0, 1],
      [1, 0],
      [0, -1],
      [-1, 0],
    ]

    if (index >= word.length) return true

    if (
      row < 0 ||
      row === rows ||
      col < 0 ||
      col === cols ||
      board[row][col] !== word[index]
    )
      return false

    board[row][col] = '#'
    let result = false
    for (const [dRow, dCol] of dirs) {
      result = backtrack(row + dRow, col + dCol, index + 1)
      if (result) break
    }
    board[row][col] = word[index]

    return result
  }

  const boardMap = new Map()
  const wordMap = new Map()

  board.forEach((col) =>
    col.forEach((letter) =>
      boardMap.set(letter, (boardMap.get(letter) ?? 0) + 1)
    )
  )

  let hasAllLetters = true
  word.split('').forEach((letter) => {
    if (!boardMap.has(letter)) hasAllLetters = false
    else {
      boardMap.set(letter, boardMap.get(letter) - 1)
      wordMap.set(letter, (wordMap.get(letter) ?? 0) + 1)
    }
  })
  if (!hasAllLetters) return false

  if (wordMap.get(word[0]) > wordMap.get(word[word.length - 1]))
    word = word.split('').reverse().join('')

  for (let row = 0; row < rows; row++)
    for (let col = 0; col < cols; col++) if (backtrack(row, col, 0)) return true

  return false
}

board = [
  ['A', 'B', 'C', 'E'],
  ['S', 'F', 'C', 'S'],
  ['A', 'D', 'E', 'E'],
]
word = 'ABCCED'
// Output: true

board = [
  ['A', 'B', 'C', 'E'],
  ['S', 'F', 'C', 'S'],
  ['A', 'D', 'E', 'E'],
]
word = 'SEE'
//  Output: true

board = [
  ['A', 'B', 'C', 'E'],
  ['S', 'F', 'C', 'S'],
  ['A', 'D', 'E', 'E'],
]
word = 'ABCB'
// Output: false

console.log(exist(board, word))
