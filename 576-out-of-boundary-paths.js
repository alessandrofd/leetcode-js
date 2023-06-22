/**
 * @param {number} m
 * @param {number} n
 * @param {number} maxMove
 * @param {number} startRow
 * @param {number} startColumn
 * @return {number}
 */

// Approach 1: Brute Force -- Time Limit Exceeded
const findPaths_1 = (qttyRows, qttyCols, remainingMoves, currRow, currCol) => {
  if (
    currRow < 0 ||
    currRow === qttyRows ||
    currCol < 0 ||
    currCol === qttyCols
  )
    return 1
  if (remainingMoves === 0) return 0
  return (
    (findPaths(qttyRows, qttyCols, remainingMoves - 1, currRow - 1, currCol) +
      findPaths(qttyRows, qttyCols, remainingMoves - 1, currRow + 1, currCol) +
      findPaths(qttyRows, qttyCols, remainingMoves - 1, currRow, currCol - 1) +
      findPaths(qttyRows, qttyCols, remainingMoves - 1, currRow, currCol + 1)) %
    1000000007
  )
}

// Approach 2: Recursion with Memoization
const findPath_2 = (qttyRows, qttyCols, maxMoves, starRow, startCol) => {
  const MODULO = 1000000007
  const memo = new Array(qttyRows)
    .fill()
    .map((_) =>
      new Array(qttyCols).fill().map((_) => new Array(maxMoves + 1).fill(-1))
    )

  const recurse = (remainingMoves, currRow, currCol) => {
    if (
      currRow < 0 ||
      currRow === qttyRows ||
      currCol < 0 ||
      currCol === qttyCols
    )
      return 1
    if (remainingMoves === 0) return 0
    if (memo[currRow][currCol][remainingMoves] < 0)
      memo[currRow][currCol][remainingMoves] =
        (recurse(remainingMoves - 1, currRow - 1, currCol) +
          recurse(remainingMoves - 1, currRow + 1, currCol) +
          recurse(remainingMoves - 1, currRow, currCol - 1) +
          recurse(remainingMoves - 1, currRow, currCol + 1)) %
        MODULO
    return memo[currRow][currCol][remainingMoves]
  }

  return recurse(maxMoves, starRow, startCol)
}

// Approach 3: Dynamic Programming
const findPaths_3 = (qttyRows, qttyCols, maxMoves, startRow, startCol) => {
  const MODULO = 1000000007
  let dp = new Array(qttyRows).fill().map((_) => new Array(qttyCols).fill(0))
  dp[startRow][startCol] = 1
  let count = 0
  for (let moves = 1; moves <= maxMoves; moves++) {
    let tmp = new Array(qttyRows).fill().map((_) => new Array(qttyCols).fill(0))
    for (let row = 0; row < qttyRows; row++) {
      for (let col = 0; col < qttyCols; col++) {
        if (row === 0) count = (count + dp[row][col]) % MODULO
        if (col === 0) count = (count + dp[row][col]) % MODULO
        if (row === qttyRows - 1) count = (count + dp[row][col]) % MODULO
        if (col === qttyCols - 1) count = (count + dp[row][col]) % MODULO
        tmp[row][col] =
          ((row > 0 ? dp[row - 1][col] : 0) +
            (col > 0 ? dp[row][col - 1] : 0) +
            (row < qttyRows - 1 ? dp[row + 1][col] : 0) +
            (col < qttyCols - 1 ? dp[row][col + 1] : 0)) %
          MODULO
      }
    }
    dp = tmp
  }
  return count
}

// Discussion Board - sgallivan
const findPaths = (qttyRows, qttyCols, maxMoves, startRow, startCol) => {
  if (!maxMoves) return 0

  const MODULO = 1000000007
  let dpCurr = Array.from(
    { length: qttyRows + 2 },
    () => new Uint32Array(qttyCols + 2)
  )
  let dpLast = Array.from(
    { length: qttyRows + 2 },
    () => new Uint32Array(qttyCols + 2)
  )

  for (let row = 1; row <= qttyRows; row++)
    dpCurr[row][1]++, dpCurr[row][qttyCols]++
  for (let col = 1; col <= qttyCols; col++)
    dpCurr[1][col]++, dpCurr[qttyRows][col]++
  let result = dpCurr[startRow + 1][startCol + 1]
  for (let move = 1; move < maxMoves; move++) {
    ;[dpCurr, dpLast] = [dpLast, dpCurr]
    for (let row = 1; row <= qttyRows; row++)
      for (let col = 1; col <= qttyCols; col++)
        dpCurr[row][col] =
          (dpLast[row - 1][col] +
            dpLast[row + 1][col] +
            dpLast[row][col - 1] +
            dpLast[row][col + 1]) %
          MODULO
    result = (result + dpCurr[startRow + 1][startCol + 1]) % MODULO
  }
  return result
}

rows = 2
cols = 2
maxMove = 2
startRow = 0
startCol = 0
// Output: 6

rows = 1
cols = 3
maxMove = 3
startRow = 0
startCol = 1
// Output: 12

console.log(findPaths(rows, cols, maxMove, startRow, startCol))
