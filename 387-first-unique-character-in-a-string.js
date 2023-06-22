/**
 * Given a string s, find the first non-repeating character in it and return its
 * index. If it does not exist, return -1.
 */

/**
 * @param {string} s
 * @return {number}
 */
const firstUniqChar = (s) => {
  const map = new Map()
  for (const c of s) map.set(c, (map.get(c) ?? 0) + 1)
  for (let i = 0; i < s.length; i++) if (map.get(s[i]) == 1) return i
  return -1
}

s = 'leetcode'
// Output: 0

// s = 'loveleetcode'
// Output: 2

// s = 'aabb'
// Output: -1

console.log(firstUniqChar(s))
