/**
 * You are given a string s and an array of strings words of the same length.
 * Return all starting indices of substring(s) in s that is a concatenation of
 *  each word in words exactly once, in any order, and without any intervening
 *  characters.
 *
 * You can return the answer in any order.
 */

/**
 * @param {string} s
 * @param {string[]} words
 * @return {number[]}
 */

// Approach 1: Check All Indices Using a Hash Table
const findSubstring_1 = (string, words) => {
  const wordCount = new Map()
  for (const word of words) wordCount.set(word, (wordCount.get(word) ?? 0) + 1)

  const stringSize = string.length
  const wordSize = words[0].length
  const substringSize = wordSize * words.length

  const check = (i) => {
    const log = i === 0
    const remaining = new Map(wordCount)
    let wordsUsed = 0

    for (let j = i; j < i + substringSize; j += wordSize) {
      const sub = string.substring(j, j + wordSize)
      if (remaining.get(sub)) {
        remaining.set(sub, remaining.get(sub) - 1)
        wordsUsed++
      } else break
    }
    return wordsUsed === words.length
  }

  const result = []

  for (let i = 0; i < stringSize - substringSize + 1; i++)
    if (check(i)) result.push(i)
  return result
}

// Approach 2: Sliding Window
const findSubstring = (string, words) => {
  const wordCount = new Map()
  for (const word of words) wordCount.set(word, (wordCount.get(word) ?? 0) + 1)

  const stringSize = string.length
  const wordSize = words[0].length
  const substringSize = wordSize * words.length

  const result = []

  const slidingWindow = (left) => {
    const wordsFound = new Map()
    let wordsUsed = 0
    let excessWord = false

    for (let right = left; right <= stringSize - wordSize; right += wordSize) {
      const sub = string.substring(right, right + wordSize)
      if (!wordCount.has(sub)) {
        //reset the window
        wordsFound.clear()
        wordsUsed = 0
        excessWord = false
        left = right + wordSize
      } else {
        // if we reached max window size or have an excess word
        while (right - left === substringSize || excessWord) {
          const leftmostWord = string.substring(left, left + wordSize)
          left += wordSize
          wordsFound.set(leftmostWord, wordsFound.get(leftmostWord) - 1)
          if (wordsFound.get(leftmostWord) >= wordCount.get(leftmostWord))
            excessWord = false
          else wordsUsed--
        }
        // keep track of how many times this word occurs in the window
        wordsFound.set(sub, (wordsFound.get(sub) ?? 0) + 1)
        if (wordsFound.get(sub) <= wordCount.get(sub)) wordsUsed++
        else excessWord = true

        if (wordsUsed === words.length && !excessWord) result.push(left)
      }
    }
  }

  for (let i = 0; i < wordSize; i++) slidingWindow(i)
  return result
}

s = 'barfoothefoobarman'
words = ['foo', 'bar']
// Output: [0, 9]

s = 'wordgoodgoodgoodbestword'
words = ['word', 'good', 'best', 'word']
// Output: []

s = 'barfoofoobarthefoobarman'
words = ['bar', 'foo', 'the']
// Output: [6, 9, 12]

s = 'wordgoodgoodgoodbestword'
words = ['word', 'good', 'best', 'good']
// Output: [8]

console.log(findSubstring(s, words))
