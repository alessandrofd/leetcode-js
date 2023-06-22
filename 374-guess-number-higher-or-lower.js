/**
 * We are playing the Guess Game. The game is as follows:
 *
 * I pick a number from 1 to n. You have to guess which number I picked.
 *
 * Every time you guess wrong, I will tell you whether the number I picked is
 * higher or lower than your guess.
 *
 * You call a pre-defined API int guess(int num), which returns three possible
 * results:
 *    -1: Your guess is higher than the number I picked (i.e. num > pick).
 *    1: Your guess is lower than the number I picked (i.e. num < pick).
 *    0: your guess is equal to the number I picked (i.e. num == pick).
 *
 * Return the number that I picked.
 *
 * Constraints:
 *    1 <= n <= 2^31 - 1
 *    1 <= pick <= n
 */

/**
 * Forward declaration of guess API.
 * @param {number} num   your guess
 * @return  -1 if num is higher than the picked number
 *          1 if num is lower than the picked number
 *          otherwise return 0
 * var guess = function(num) {}
 */

const guess = (num) => (num === pick ? 0 : num < pick ? 1 : -1)

/**
 * @param {number} n
 * @return {number}
 */
// Approach 2: Using Binary Search
const guessNumber_binSearch = (n) => {
  let low = 1
  let high = n
  while (low <= high) {
    const half = ((low + high) / 2) | 0
    const hit = guess(half)
    if (hit === 0) return half
    if (hit > 0) low = half + 1
    else high = half - 1
  }
}

n = 10
pick = 6
// Output: 6

// n = 1
// pick = 1
// Output: 1

// n = 2
// pick = 1
// Output: 1

console.log(guessNumber(n))
