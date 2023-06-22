// const totalNQueens = (size) => {
//   let num = 0
//   const backtrack = (row, cols, diags, antiDiags) => {
//     if (row === size) {
//       num++
//       return
//     }

//     for (let col = 0; col < size; col++) {
//       const diag = row - col
//       const antiDiag = row + col

//       if (cols.has(col) || diags.has(diag) || antiDiags.has(antiDiag)) continue

//       cols.add(col)
//       diags.add(diag)
//       antiDiags.add(antiDiag)

//       backtrack(row + 1, cols, diags, antiDiags)

//       cols.delete(col)
//       diags.delete(diag)
//       antiDiags.delete(antiDiag)
//     }
//   }

//   backtrack(0, new Set(), new Set(), new Set())
//   return num
// }

// const totalNQueens = (boardSize) => {
//   let numSolutions = 0
//   const board = []
//   const backtrack = (row) => {
//     if (row === boardSize) {
//       numSolutions++
//       return
//     }

//     for (let col = 0; col < boardSize; col++) {
//       if (
//         !board.some(
//           (c, r) => c === col || c + r === col + row || c - r === col - row
//         )
//       ) {
//         board.push(col)
//         backtrack(row + 1)
//         board.pop()
//       }
//     }
//   }
//   backtrack(0)
//   return numSolutions
// }

const totalNQueens = (boardSize) => {
  let countSolutions = 0
  const cols = new Array(boardSize).fill(false)
  const diags = new Array(2 * boardSize).fill(false)
  const antiDiags = new Array(2 * boardSize).fill(false)

  const backtrack = (row) => {
    if (row === boardSize) {
      countSolutions++
      return
    }

    for (let col = 0; col < boardSize; col++) {
      if (cols[col] || diags[row - col] || antiDiags[row + col]) continue
      cols[col] = diags[row - col] = antiDiags[row + col] = true
      backtrack(row + 1)
      cols[col] = diags[row - col] = antiDiags[row + col] = false
    }
  }

  backtrack(0)
  return countSolutions
}

console.log(totalNQueens(4))
