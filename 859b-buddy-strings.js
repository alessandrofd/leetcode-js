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
  if (s.length === 1) return false
  if (s.length !== goal.length) return false

  if (s === goal) {
    const set = new Set(s)
    if (set.size === s.length) return false
    return true
  }

  const diffs = []
  for (let i = 0; i < s.length; i++) {
    if (s[i] !== goal[i]) {
      if (diffs.length === 2) return false
      diffs.push([s[i], goal[i]])
    }
  }

  return diffs.length === 2 && diffs[0].join('') === diffs[1].reverse().join('')
}

s = 'ab'
goal = 'ba'
// Expected: true

s = 'ab'
goal = 'ab'
// Expected: false

s = 'aa'
goal = 'aa'
// Expected: true

s = 'abcaa'
goal = 'abcbb'
//Expected: false

s = 'abac'
goal = 'abad'
//Expected: false

console.log(buddyStrings(s, goal))
