const lengthOfLongestSubstring = (s) => {
  let longest = 0
  let current = 0
  let set = new Set()
  for (char of s) {
    if (set.has(char)) {
      longest = Math.max(longest, current)
      set = new Set([char])
      current = 1
    } else {
      set.add(char)
      current++
    }
  }

  return Math.max(longest, current)
}

console.log(lenghtOfLongestSubstring('abcabcbb'))
const test = 3
test
