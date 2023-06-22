/**
 * Given the integers zero, one, low, and high, we can construct a string by
 * starting with an empty string, and then at each step perform either of
 * the following:
 *
 *    Append the character '0' zero times.
 *
 *    Append the character '1' one times.
 *
 * This can be performed any number of times.
 *
 * A good string is a string constructed by the above process having a length
 * between low and high (inclusive).
 *
 * Return the number of different good strings that can be constructed
 * satisfying these properties. Since the answer can be large, return it
 * odulo 10^9 + 7.
 *
 * Constraints:
 *    1 <= low <= high <= 10^5
 *    1 <= zero, one <= low
 */

/**
 * Programação dinâmica com uma única dimensão: a quantidade de caracteres na
 * string final. limitado a high (inclusive)
 * Caso base: dp[0] = 0, dp[one] += 1, dp[zero] += 1
 * Transição: dp[i] += (dp[i-one] se i >= one == 0) + (dp[i-zero] se i >=  zero)
 * Resultado final: sum(dp[low:high])
 */

/**
 * Podemos ajustar a condição inicial para dp[0] = 1, neste caso quando
 * i >= zero ou one o valor inicial será recuperado de dp[0] e não de dp[zero] e
 * dp[one], respectivamente.
 */

/**
 * @param {number} low
 * @param {number} high
 * @param {number} zero
 * @param {number} one
 * @return {number}
 */
const countGoodStrings = (low, high, zero, one) => {}

low = 3
high = 3
zero = 1
one = 1
// Expected: 8

// low = 2
// high = 3
// zero = 1
// one = 2
// Expected: 5

console.log(countGoodStrings(low, high, zero, one))

x = 50178215798277
m = x % (1e9 + 7)
m
x
