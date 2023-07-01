/**
 * You are given an integer array cookies, where cookies[i] denotes the number
 * of cookies in the ith bag. You are also given an integer k that denotes
 * the number of children to distribute all the bags of cookies to. All
 * the cookies in the same bag must go to the same child and cannot be split up.
 *
 * The unfairness of a distribution is defined as the maximum total cookies
 * obtained by a single child in the distribution.
 *
 * Return the minimum unfairness of all distributions.
 *
 * Constraints:
 *    2 <= cookies.length <= 8
 *    1 <= cookies[i] <= 10^5
 *    2 <= k <= cookies.length
 */

// Backtracking otimizado considerando que a quantidade de sacos de biscoitos
// sempre será maior ou igual à quantidade de crianças

/**
 * @param {number[]} cookies
 * @param {number} k
 * @return {number}
 */
const distributeCookies = (cookies, numChildren) => {}

let cookies = [8, 15, 10, 20, 8]
let k = 2
// Expected: 31

// cookies = [6, 1, 3, 2, 2, 4, 1, 2]
// k = 3
// Expected: 7

console.log(distributeCookies(cookies, k))
