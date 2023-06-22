/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
const isAnagram1 = function (s, t) {
  const map = new Map()
  for (c of s) {
    if (map.has(c)) map.set(c, map.get(c) + 1)
    else map.set(c, 1)
  }
  for (c of t) {
    if (map.has(c)) map.set(c, map.get(c) - 1)
    else return false
  }
  for (const [, occur] of map) if (occur !== 0) return false

  return true
}


const isAnagram = function (s, t) {
  if (s.length != t.length) return false
  const map = {}
  for (c of s) {
    if (!map[c]) map[c] = 0
    map[c]++
  }
  for (c of t) {
    if (!map[c]) return false
    map[c]--
  }
  return true
}

// Input: s = "anagram", t = "nagaram"
// Output: true
console.log(isAnagram('anagram', 'nagaram'))

// Input: s = "rat", t = "car"
// Output: false
console.log(isAnagram('rat', 'car'))