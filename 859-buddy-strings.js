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
const buddyStrings = (s, goal) => {
  if (s.length !== goal.length) return false

  if (s === goal) {
    const set = new Set(s.split(''))
    if (set.size < s.length) return true
    return false
  }

  const diffs = []

  for (let i = 0; i < s.length; i++) {
    if (s[i] !== goal[i]) diffs.push(i)
    if (diffs.length > 2) return false
  }

  return (
    diffs.length == 2 &&
    s[diffs[0]] === goal[diffs[1]] &&
    s[diffs[1]] === goal[diffs[0]]
  )
}

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
