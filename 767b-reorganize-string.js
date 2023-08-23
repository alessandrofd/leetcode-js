/**
 * Given a string s, rearrange the characters of s so that any two adjacent
 * characters are not the same.
 *
 * Return any possible rearrangement of s or return "" if not possible
 *
 * Constraints:
 *    1 <= s.length <= 500
 *    s consists of lowercase English letters.
 */

import { MaxPriorityQueue } from '@datastructures-js/priority-queue'

/**
 * @param {string} s
 * @return {string}
 */
const reorganizeString_pq = (s) => {}

/**
 * @param {string} s
 * @return {string}
 */
const reorganizeString_arr = (s) => {}

let s = 'aab'
// Expected: "aba"

// s = 'aaab'
// Expected: ""

// s = 'vvvlo'
// Expected: "vlvov"

// s = 'eqmeyggvp'
// Expected: "epeqgvgym"

s = 'ogccckcwmbmxtsbmozli'
// Expected: "cocgcickmlmsmtbwbxoz"

// console.log(reorganizeString_pq(s))
console.log(reorganizeString_arr(s))
