/**
 * There are n pieces arranged in a line, and each piece is colored either by
 * 'A' or by 'B'. You are given a string colors of length n where colors[i] is
 * the color of the ith piece.
 *
 * Alice and Bob are playing a game where they take alternating turns removing
 * pieces from the line. In this game, Alice moves first.
 *
 *    Alice is only allowed to remove a piece colored 'A' if both its neighbors
 *    are also colored 'A'. She is not allowed to remove pieces that are colored
 *    'B'.
 *
 *    Bob is only allowed to remove a piece colored 'B' if both its neighbors
 *    are also colored 'B'. He is not allowed to remove pieces that are colored
 *    'A'.
 *
 *    Alice and Bob cannot remove pieces from the edge of the line.
 *
 *    If a player cannot make a move on their turn, that player loses and the
 *    other player wins.
 *
 * Assuming Alice and Bob play optimally, return true if Alice wins, or return
 * false if Bob wins.
 *
 * Constraints:
 *    1 <= colors.length <= 10^5
 *    colors consists of only the letters 'A' and 'B'
 */

/**
 * @param {string} colors
 * @return {boolean}
 */
const winnerOfGame = (colors) => {
  const n = colors.length
  if (n < 3) return false

  let [alice, bob] = [0, 0]
  for (let i = 2; i < n; i++) {
    if (colors[i] === colors[i - 1] && colors[i - 1] === colors[i - 2])
      if (colors[i] === 'A') alice += 1
      else bob += 1
  }

  return alice >= bob + 1
}

// prettier-ignore
const funcs = [
  winnerOfGame,
]

const data = [
  ['AAABABB', true],
  ['AA', false],
  ['ABBBBBBBAAA', false],
]

for (const func of funcs) {
  for (const [colors, expected] of data) {
    console.log(func(colors) === expected)
  }
}
