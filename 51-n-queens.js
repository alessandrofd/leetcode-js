/**
 * @param {number} n
 * @return {string[][]}
 */
const solveNQueens = (size) => {
  const solutions = []

  const backtrack = (row, diags, antiDiags, cols, state) => {
    const createBoard = (state) => {
      const board = []
      for (let row = 0; row < size; row++) board.push(state[row].join(''))
      return board
    }

    if (row === size) {
      solutions.push(createBoard(state))
      return
    }

    for (let col = 0; col < size; col++) {
      const diag = row - col
      const antiDiag = row + col

      // if the queen is not placeable
      if (cols.has(col) || diags.has(diag) || antiDiags.has(antiDiag)) continue

      // add the queen to the board
      cols.add(col)
      diags.add(diag)
      antiDiags.add(antiDiag)
      state[row][col] = 'Q'

      // move on to the next row with the updated board state
      backtrack(row + 1, diags, antiDiags, cols, state)

      // remove the queen  from the board since we have already
      // explored all valid paths using the above function call
      cols.delete(col)
      diags.delete(diag)
      antiDiags.delete(antiDiag)
      state[row][col] = '.'
    }
  }

  const emptyBoard = new Array(size)
    .fill(null)
    .map(() => new Array(size).fill('.'))
  backtrack(0, new Set(), new Set(), new Set(), emptyBoard)
  return solutions
}

console.log(solveNQueens(4))
