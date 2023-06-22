/**
 * Given two strings s and t of lengths m and n respectively, return the minimum
 * window substring of s such that every character in t (including duplicates)
 * is included in the window. If there is no such substring, return the empty
 * string "".
 *
 * The testcases will be generated such that the answer is unique.
 *
 * A substring is a contiguous sequence of characters within the string.
 *
 * Constraints:
 *    m == s.length
 *    n == t.length
 *    1 <= m, n <= 10^5
 *    s and t consist of uppercase and lowercase English letters.
 */

/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */

// Approach 1: Sliding Window
const minWindow_1 = (string, template) => {
  const templateMap = new Map()
  for (const char of template)
    templateMap.set(char, (templateMap.get(char) ?? 0) + 1)
  const required = templateMap.size

  let left = 0
  let right = 0
  let formed = 0
  const windowMap = new Map()
  // [windowLength, left, right]
  let answer = [-1, 0, 0]

  while (right < string.length) {
    windowMap.set(string[right], (windowMap.get(string[right]) ?? 0) + 1)
    if (
      templateMap.has(string[right]) &&
      templateMap.get(string[right]) === windowMap.get(string[right])
    )
      formed++

    while (left <= right && formed === required) {
      const windowLength = answer[0]
      if (windowLength === -1 || windowLength > right - left + 1)
        answer = [right - left + 1, left, right]

      windowMap.set(string[left], windowMap.get(string[left]) - 1)
      if (
        templateMap.has(string[left]) &&
        templateMap.get(string[left]) > windowMap.get(string[left])
      )
        formed--

      left++
    }
    right++
  }
  return answer[0] === -1 ? '' : string.slice(answer[1], answer[2] + 1)
}

// Approach 2: Optimized Sliding Window
const minWindow = (string, template) => {
  if (!string.length || !template.length) return ''

  const templateMap = new Map()
  for (const char of template)
    templateMap.set(char, (templateMap.get(char) ?? 0) + 1)
  const required = templateMap.size

  const filtered = [...string]
    .map((c, i) => [c, i])
    .filter(([c]) => templateMap.has(c))

  let formed = 0,
    left = 0,
    right = 0,
    // windowLength, start, end
    answer = [-1, 0, 0]
  const windowMap = new Map()
  while (right < filtered.length) {
    const [char, end] = filtered[right]
    windowMap.set(char, (windowMap.get(char) ?? 0) + 1)
    if (windowMap.get(char) === templateMap.get(char)) formed++

    while (left <= right && formed === required) {
      const [char, start] = filtered[left]
      const windowLength = answer[0]
      if (windowLength === -1 || windowLength > end - start + 1)
        answer = [end - start + 1, start, end]

      windowMap.set(char, windowMap.get(char) - 1)
      if (templateMap.get(char) > windowMap.get(char)) formed--
      left++
    }
    right++
  }
  const [windowLength, start, end] = answer
  return windowLength === -1 ? '' : string.slice(start, end + 1)
}

s = 'ADOBECODEBANC'
t = 'ABC'
// Output: "BANC"
// Explanation: The minimum window substring "BANC" includes 'A', 'B', and 'C' from string t.

s = 'a'
t = 'a'
// Output: "a"
// Explanation: The entire string s is the minimum window.

s = 'a'
t = 'aa'
// Output: ""
// Explanation: Both 'a's from t must be included in the window.
// Since the largest window of s only has one 'a', return empty string.

console.log(minWindow(s, t))
