/**
 * You are given an n x n integer matrix board where the cells are labeled
 * from 1 to n^2 in a Boustrophedon style starting from the bottom left of the
 * board (i.e. board[n - 1][0]) and alternating direction each row.
 *
 * You start on square 1 of the board. In each move, starting from square curr,
 * do the following:
 *
 *    Choose a destination square next with a label in the range
 *    [curr + 1, min(curr + 6, n^2)].
 *      This choice simulates the result of a standard 6-sided die roll: i.e.,
 *      there are always at most 6 destinations, regardless of the size of
 *      the board.
 *
 *    If next has a snake or ladder, you must move to the destination of that
 *    snake or ladder. Otherwise, you move to next.
 *
 *    The game ends when you reach the square n^2.
 *
 * A board square on row r and column c has a snake or ladder if
 * board[r][c] != -1. The destination of that snake or ladder is board[r][c].
 * Squares 1 and n^2 do not have a snake or ladder.
 *
 * Note that you only take a snake or ladder at most once per move. If the
 * estination to a snake or ladder is the start of another snake or ladder,
 * you do not follow the subsequent snake or ladder.
 *
 * For example, suppose the board is [[-1,4],[-1,3]], and on the first move,
 * your destination square is 2. You follow the ladder to square 3, but do not
 * follow the subsequent ladder to 4.
 *
 * Return the least number of moves required to reach the square n^2. If it is
 * not possible to reach the square, return -1.
 *
 * Constraints:
 *    n == board.length == board[i].length
 *    2 <= n <= 20
 *    grid[i][j] is either -1 or in the range [1, n^2].
 *    The squares labeled 1 and n^2 do not have any ladders or snakes.
 */

/**
 * @param {number[][]} board
 * @return {number}
 */
const snakesAndLadders_dfs = (board) => {
  const n = board.length

  const squareToIndex = (square) => {
    const row = n - 1 - (((square - 1) / n) | 0)
    const colFromBorder = (square - 1) % n
    const rightToLeft = (((square - 1) / n) | 0) % 2
    const col = rightToLeft ? n - 1 - colFromBorder : colFromBorder
    return [row, col]
  }

  const memo = new Array(n ** 2 + 1).fill(Infinity)
  memo[n ** 2] = 0

  const visited = new Set()

  const dfs = (square) => {
    if (square === 86) {
      console.log(square)
    }
    if (memo[square] !== Infinity) return memo[square]
    for (let i = square + 1; i <= Math.min(square + 6, n ** 2); i++) {
      const [row, col] = squareToIndex(i)
      const nextSquare = board[row][col] === -1 ? i : board[row][col]
      if (visited.has(nextSquare)) continue
      visited.add(nextSquare)
      memo[square] = Math.min(memo[square], dfs(nextSquare))
      visited.delete(nextSquare)
    }
    return ++memo[square]
  }

  const result = dfs(1)
  return result === Infinity ? -1 : result
}

const snakesAndLadders_bfs = (board) => {}

board = [
  [-1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1],
  [-1, 35, -1, -1, 13, -1],
  [-1, -1, -1, -1, -1, -1],
  [-1, 15, -1, -1, -1, -1],
]
// Output: 4

board = [
  [-1, -1],
  [-1, 3],
]
// Output: 1

board = [
  [1, 1, -1],
  [1, 1, 1],
  [-1, 1, 1],
]
// Output: -1

board = [
  [-1, 83, -1, 46, -1, -1, -1, -1, 40, -1],
  [-1, 29, -1, -1, -1, 51, -1, 18, -1, -1],
  [-1, 35, 31, 51, -1, 6, -1, 40, -1, -1],
  [-1, -1, -1, 28, -1, 36, -1, -1, -1, -1],
  [-1, -1, -1, -1, 44, -1, -1, 84, -1, -1],
  [-1, -1, -1, 31, -1, 98, 27, 94, 74, -1],
  [4, -1, -1, 46, 3, 14, 7, -1, 84, 67],
  [-1, -1, -1, -1, 2, 72, -1, -1, 86, -1],
  [-1, 32, -1, -1, -1, -1, -1, -1, -1, 19],
  [-1, -1, -1, -1, -1, 72, 46, -1, 92, 6],
]
//  Expected: 3

console.log(snakesAndLadders_dfs(board))
console.log(snakesAndLadders_bfs(board))
