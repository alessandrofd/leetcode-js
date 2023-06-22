/**
 * @param {string} s
 * @param {number} k
 * @return {string}
 */
const removeDuplicates = (s, k) => {
  string = []
  counter = []
  currentChar
  countChar = 0
  for (c of s) {
    if (currentChar !== undefined && c !== currentChar) {
      counter.push([currentChar, counter])
      countChar = 0
    }
    currentChar = c
    countChar++
    string.push(currentChar)

    if (countChar === k) {
      for (i = 0; i < k; i++) string.pop()
      [currentChar, countChar] = counter.pop()
    } 
  }

  return string.join('')
}

;(s = 'abcd'), (k = 2)
console.log(removeDuplicates(s, k))

/*
Example 1:

Input: s = "abcd", k = 2
Output: "abcd"
Explanation: There's nothing to delete.

Example 2:

Input: s = "deeedbbcccbdaa", k = 3
Output: "aa"
Explanation: 
First delete "eee" and "ccc", get "ddbbbdaa"
Then delete "bbb", get "dddaa"
Finally delete "ddd", get "aa"

Example 3:

Input: s = "pbbcggttciiippooaais", k = 2
Output: "ps"
 */
