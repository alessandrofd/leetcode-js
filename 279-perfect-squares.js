/**
 * Given an integer n, return the least number of perfect square numbers that
 * sum to n.
 *
 * A perfect square is an integer that is the square of an integer; in other
 * words, it is the product of some integer with itself. For example, 1, 4, 9,
 * and 16 are perfect squares while 3 and 11 are not.
 *
 * Constraints:
 *    1 <= n <= 10^4
 */

/**
 * @param {number} n
 * @return {number}
 */
// Approach 1: Brute-force Enumeration [Time Limit Exceeded]
const numSquares_bruteForce = (n) => {
  const squares = []
  for (let i = 1; i <= Math.sqrt(n) + 1; i++) squares.push(i ** 2)

  if (squares.includes(n)) return 1

  let min = Infinity
  for (const square of squares) {
    if (n < square) break
    min = Math.min(min, numSquares(n - square) + 1)
  }
  return min
}

// Approach 2: Dynamic Programming
const numSquares_dp = (n) => {
  const squares = []
  for (let i = 1; i < Math.sqrt(n) + 1; i++) squares.push(i ** 2)

  const dp = new Array(n + 1).fill(Infinity)
  dp[0] = 0

  for (let i = 1; i <= n; i++) {
    for (const square of squares) {
      if (i < square) break
      dp[i] = Math.min(dp[i], dp[i - square] + 1)
    }
  }
  dp
  return dp[n]
}

// Approach 3: Greedy Enumeration
const numSquares_greedy = (n) => {
  const squares = []
  for (let i = 1; i < Math.sqrt(n) + 1; i++) squares.push(i ** 2)

  const isDividedBy = (n, count) => {
    if (count === 1) return squares.includes(n)
    for (const square of squares)
      if (isDividedBy(n - square, count - 1)) return true
    return false
  }

  for (let count = 1; count <= n; count++)
    if (isDividedBy(n, count)) return count
}

// Approach 4: Greedy + BFS (Breadth-First Search)
const numSquares_greedyBFS = (n) => {
  const squares = []
  for (let i = 1; i < Math.sqrt(n) + 1; i++) squares.push(i ** 2)

  level = 0
  let remainders = new Set([n])
  while (remainders.size) {
    level++
    const temp = new Set()
    for (const remainder of remainders)
      for (const square of squares)
        if (remainder === square) return level
        else if (remainder < square) break
        else temp.add(remainder - square)
    remainders = temp
  }
  return level
}

// Approach 5: Mathematics
const numSquares = (n) => {
  const isSquare = (n) => (Math.sqrt(n) | 0) ** 2 === n

  while (!(n % 4)) n /= 4
  if (n % 8 === 7) return 4

  if (isSquare(n)) return 1

  for (let i = 1; i ** 2 < n; i++) if (isSquare(n - i ** 2)) return 2

  return 3
}

n = 12
// Output: 3

n = 13
// Output: 2

n = 28

console.log(numSquares(n))
