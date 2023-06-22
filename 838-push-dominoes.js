/**
 * There are n dominoes in a line, and we place each domino vertically upright.
 * In the beginning, we simultaneously push some of the dominoes either to the
 * left or to the right.
 *
 * After each second, each domino that is falling to the left pushes the
 * adjacent domino on the left. Similarly, the dominoes falling to the right
 * push their adjacent dominoes standing on the right.
 *
 * When a vertical domino has dominoes falling on it from both sides, it stays
 * still due to the balance of the forces.
 *
 * For the purposes of this question, we will consider that a falling domino
 * expends no additional force to a falling or already fallen domino.
 *
 * You are given a string dominoes representing the initial state where:
 *    dominoes[i] = 'L', if the ith domino has been pushed to the left,
 *    dominoes[i] = 'R', if the ith domino has been pushed to the right, and
 *    dominoes[i] = '.', if the ith domino has not been pushed.
 *
 * Return a string representing the final state.
 *
 * Constraints:
 *    n == dominoes.length
 *    1 <= n <= 105
 *    dominoes[i] is either 'L', 'R', or '.'.
 */

// Approach #1: Adjacent Symbols [Accepted]
/**
 * @param {string} dominoes
 * @return {string}
 */
const pushDominoes_1 = (dominoes) => {
  const symbols = [...dominoes]
    .map((symbol, index) => [symbol, index])
    .filter(([symbol]) => symbol != '.')

  symbols.unshift(['L', -1])
  symbols.push(['R', dominoes.length])

  const result = [...dominoes]
  for (let i = 0; i < symbols.length - 1; i++) {
    const [leftSymbol, leftIndex] = symbols[i]
    const [rightSymbol, rightIndex] = symbols[i + 1]
    if (leftSymbol === rightSymbol)
      for (let j = leftIndex + 1; j < rightIndex; j++) result[j] = leftSymbol
    else if (leftSymbol === 'R')
      for (let j = leftIndex + 1; j < rightIndex; j++)
        result[j] =
          j - leftIndex === rightIndex - j
            ? '.'
            : j - leftIndex < rightIndex - j
            ? 'R'
            : 'L'
  }
  return result.join('')
}

// Approach #2: Calculate Force [Accepted]
const pushDominoes = (dominoes) => {
  const len = dominoes.length
  const forces = new Array(len).fill(0)

  let force = 0
  for (let i = 0; i < len; i++) {
    if (dominoes[i] === 'R') force = len
    else if (dominoes[i] === 'L') force = 0
    else force = Math.max(force - 1, 0)
    forces[i] += force
  }

  force = 0
  for (let i = len - 1; i >= 0; i--) {
    if (dominoes[i] === 'L') force = len
    else if (dominoes[i] === 'R') force = 0
    else force = Math.max(force - 1, 0)
    forces[i] -= force
  }

  const result = []
  for (const force of forces)
    result.push(force === 0 ? '.' : force > 0 ? 'R' : 'L')
  return result.join('')
}

dominoes = 'RR.L'
// Output: "RR.L"
// Explanation: The first domino expends no additional force on the second domino.

dominoes = '.L.R...LR..L..'
// Output: 'LL.RR.LLRRLL..'

console.log(pushDominoes(dominoes))
