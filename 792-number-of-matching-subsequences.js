/**
 * @param {string} s
 * @param {string[]} words
 * @return {number}
 */
// Approach #1: Brute Force [Time Limit Exceeded]
const numMatchingSubseq_1 = (s, words) => {
  const subseq = (word) => {
    let i = 0
    for (char of s) if (i < word.length && char === word[i]) i++
    return i === word.length
  }

  let result = 0
  for (word of words) if (subseq(word)) result++
  return result
}

// Approach #2: Next Letter Pointers [Accepted]
const numMatchingSubseq = (string, words) => {
  const heads = new Array(26).fill().map((_) => new Array())
  for (const word of words)
    heads[word.charCodeAt(0) - 'a'.charCodeAt(0)].push(word)

  let result = 0
  for (const char of string) {
    const index = char.charCodeAt(0) - 'a'.charCodeAt(0)
    const bucket = heads[index]
    heads[index] = []
    for (const word of bucket) {
      if (word.length === 1) result++
      else {
        heads[word.charCodeAt(1) - 'a'.charCodeAt(0)].push(word.slice(1))
      }
    }
  }
  return result
}

s = 'abcde'
words = ['a', 'bb', 'acd', 'ace']
// Output: 3

s = 'dsahjpjauf'
words = ['ahjpjau', 'ja', 'ahbwzgqnuk', 'tnmlanowax']
// Output: 2

console.log(numMatchingSubseq(s, words))
