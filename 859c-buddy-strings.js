/**
 * Given two strings s and goal, return true if you can swap two letters in s so
 * the result is equal to goal, otherwise, return false.
 *
 * Swapping letters is defined as taking two indices i and j (0-indexed) such
 * that i != j and swapping the characters at s[i] and s[j].
 *
 *    For example, swapping at indices 0 and 2 in "abcd" results in "cbad".
 *
 * Constraints:
 *    1 <= s.length, goal.length <= 2 * 10^4
 *    s and goal consist of lowercase letters.
 */

/**
 * @param {string} s
 * @param {string} goal
 * @return {boolean}
 */
const buddyStrings = (s, goal) => {}

s = 'ab'
goal = 'ba'
// Expected: true

// s = 'ab'
// goal = 'ab'
// Expected: false

// s = 'aa'
// goal = 'aa'
// Expected: true

// s = 'abcaa'
// goal = 'abcbb'
//Expected: false

// s = 'abac'
// goal = 'abad'
//Expected: false

console.log(buddyStrings(s, goal))
