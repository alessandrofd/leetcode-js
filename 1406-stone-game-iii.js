/**
 * Alice and Bob continue their games with piles of stones. There are several
 * stones arranged in a row, and each stone has an associated value which is
 * an integer given in the array stoneValue.
 *
 * Alice and Bob take turns, with Alice starting first. On each player's turn,
 * that player can take 1, 2, or 3 stones from the first remaining stones in
 * the row.
 *
 * The score of each player is the sum of the values of the stones taken.
 * The score of each player is 0 initially.
 *
 * The objective of the game is to end with the highest score, and the winner is
 * the player with the highest score and there could be a tie. The game
 * continues until all the stones have been taken.
 *
 * Assume Alice and Bob play optimally.
 *
 * Return "Alice" if Alice will win, "Bob" if Bob will win, or "Tie" if they
 * will end the game with the same score.
 *
 * Constraints:
 *    1 <= stoneValue.length <= 5 * 10^4
 *    -1000 <= stoneValue[i] <= 1000
 */

/**
 * @param {number[]} stoneValue
 * @return {string}
 */
const stoneGameIII = (stones) => {
  const n = stones.length

  const dp = new Array(n)
  dp.push(0, 0, 0)

  let suffixSum = 0
  for (let i = n - 1; i >= 0; i--) {
    suffixSum += stones[i]
    dp[i] = suffixSum - Math.min(dp[i + 1], dp[i + 2], dp[i + 3])
  }

  const alice = dp[0]
  const bob = suffixSum - alice

  return alice === bob ? 'Tie' : alice > bob ? 'Alice' : 'Bob'
}

values = [1, 2, 3, 7]
// Expected: "Bob"

// values = [1, 2, 3, -9]
// Expected: "Alice"

// values = [1, 2, 3, 6]
// Expected: "Tie"

// values = [-1, -2, -3]
// Expected: "Tie"

// values = [
//   5, -14, 3, 1, -12, 9, 8, 11, -13, -13, -4, -14, -8, 17, -3, 4, 12, -5, -3, 13,
//   -1, 5, -9,
// ]
// Expected: "Alice"

console.log(stoneGameIII(values))
