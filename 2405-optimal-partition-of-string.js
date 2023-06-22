/**
 * Given a string s, partition the string into one or more substrings such that
 * the characters in each substring are unique. That is, no letter appears in
 * a single substring more than once.
 *
 * Return the minimum number of substrings in such a partition.
 *
 * Note that each character should belong to exactly one substring in
 * a partition.
 *
 * Constraints:
 *    1 <= s.length <= 10^5
 *    s consists of only English lowercase letters.
 */

/**
 * @param {string} s
 * @return {number}
 */
const partitionString = (s) => {
  let count = 1
  const set = new Set()
  for (const c of s) {
    if (set.has(c)) {
      count++
      set.clear()
    }
    set.add(c)
  }
  return count
}

s = 'abacaba'
// Output: 4

// s = 'ssssss'
// Output: 6

console.log(partitionString(s))
