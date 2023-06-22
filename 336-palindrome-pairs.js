/**
 * Given a list of unique words, return all the pairs of the distinct indices
 * (i, j) in the given list, so that the concatenation of the two words words[i]
 * + words[j] is a palindrome.
 *
 * Constraints:
 *    1 <= words.length <= 5000
 *    0 <= words[i].length <= 300
 *    words[i] consists of lower-case English letters.
 */

/**
 * @param {string[]} words
 * @return {number[][]}
 */
// Approach 1: Brute force -- Time Limit Exceeded
const palindromePairs_1 = (words) => {
  const pairs = []

  for (let i = 0; i < words.length; i++) {
    for (let j = 0; j < words.length; j++) {
      if (i === j) continue
      const combined = words[i] + words[j]
      const reversed = [...combined].reverse().join('')
      if (combined === reversed) pairs.push([i, j])
    }
  }
  return pairs
}

// Approach 2: Hashing -- Time Limit Exceeded
const palindromePairs_2 = (words) => {
  const isPalindromeBetween = (word, start, end) => {
    while (start < end) {
      if (word[start] !== word[end]) return false
      start++
      end--
    }
    return true
  }

  const validSuffixes = (word) => {
    const suffixes = []
    for (let i = 0; i < word.length; i++)
      if (isPalindromeBetween(word, 0, i)) suffixes.push(word.slice(i + 1))
    return suffixes
  }

  const validPrefixes = (word) => {
    const prefixes = []
    for (let i = 0; i < word.length; i++) {
      if (isPalindromeBetween(word, i, word.length - 1))
        prefixes.push(word.slice(0, i))
    }
    return prefixes
  }

  const pairs = []
  const map = new Map(words.map((word, index) => [word, index]))

  for (const [word, index] of map) {
    const reverse = [...word].reverse().join('')

    if (map.has(reverse) && map.get(reverse) !== index)
      pairs.push([index, map.get(reverse)])

    for (const suffix of validSuffixes(word)) {
      const reversedSuffix = [...suffix].reverse().join('')
      if (map.has(reversedSuffix)) pairs.push([map.get(reversedSuffix), index])
    }

    for (const prefix of validPrefixes(word)) {
      const reversedPrefix = [...prefix].reverse().join('')
      if (map.has(reversedPrefix)) pairs.push([index, map.get(reversedPrefix)])
    }
  }
  return pairs
}

// Submissions
const palindromePairs_s = (words) => {
  const isPalindrome = (word, start, end) => {
    while (start < end) if (word[start++] !== word[end--]) return false
    return true
  }

  const sorted = []
  words.forEach((word, index) => {
    sorted.push([word, index + 1])
    sorted.push([[...word].reverse().join(''), -(index + 1)])
  })
  sorted.sort(([a], [b]) => a.localeCompare(b))

  let previous = sorted[0][0]
  for (let i = 1; i < sorted.length; i++) {
    const current = sorted[i][0]
    const length = Math.min(previous.length, current.length)
    let count
    for (count = 0; count < length; count++)
      if (previous[count] !== current[count]) break
    previous = current
    sorted[i][0] = count
  }

  const pairs = []

  for (let firstPos = 0; firstPos < sorted.length - 1; firstPos++) {
    const firstIndex = sorted[firstPos][1]
    const firstDir = firstIndex < 0 ? -1 : 1
    const firstActual = Math.abs(firstIndex) - 1
    const firstLen = words[firstActual].length

    let secPos = firstPos
    while (++secPos < sorted.length) {
      const [secLen, secIndex] = sorted[secPos]

      if (secLen < firstLen) break

      if (Math.sign(secIndex) === firstDir) continue
      if (firstIndex === -secIndex) continue

      const secActual = Math.abs(secIndex) - 1
      const secWord = words[secActual]

      // 2nd word is reversed, so 1st word is forward
      if (secIndex < 0) {
        if (isPalindrome(secWord, 0, secWord.length - firstLen - 1))
          pairs.push([firstActual, secActual])
      } else {
        if (isPalindrome(secWord, firstLen, secWord.length - 1))
          pairs.push([secActual, firstActual])
      }
    }
  }

  return pairs
}

const palindromePairs = (words) => {
  const isPalindrome = (word, start, end) => {
    while (start < end) if (word[start++] !== word[end--]) return false
    return true
  }

  const sorted = []
  words.forEach((word, index) => {
    sorted.push([word, index + 1])
    sorted.push([[...word].reverse().join(''), -(index + 1)])
  })
  sorted.sort(([a], [b]) => a.localeCompare(b))

  let previous = sorted[0][0]
  for (let i = 1; i < sorted.length; i++) {
    const current = sorted[i][0]
    const length = Math.min(previous.length, current.length)
    let count = 0
    for (; count < length; count++)
      if (previous[count] !== current[count]) break
    previous = current
    sorted[i][0] = count
  }

  const pairs = []
  for (let firstPos = 0; firstPos < sorted.length - 1; firstPos++) {
    const firstIndex = sorted[firstPos][1]
    const firstActual = Math.abs(firstIndex) - 1
    const firstLen = words[firstActual].length

    let secPos = firstPos
    while (++secPos < sorted.length) {
      const [secLen, secIndex] = sorted[secPos]

      if (secLen < firstLen) break

      if (firstIndex === -secIndex) continue
      if (Math.sign(firstIndex) === Math.sign(secIndex)) continue

      const secActual = Math.abs(secIndex) - 1
      const secWord = words[secActual]

      if (secIndex < 0) {
        if (isPalindrome(secWord, 0, secWord.length - firstLen - 1))
          pairs.push([firstActual, secActual])
      } else {
        if (isPalindrome(secWord, firstLen, secWord.length - 1))
          pairs.push([secActual, firstActual])
      }
    }
  }
  return pairs
}

words = ['abcd', 'dcba', 'lls', 's', 'sssll']
// Output: [
//   [0, 1],
//   [1, 0],
//   [3, 2],
//   [2, 4],
// ]
// Explanation: The palindromes are ["dcbaabcd","abcddcba","slls","llssssll"]

// words = ['bat', 'tab', 'cat']
// Output: [[0,1],[1,0]]
// Explanation: The palindromes are ["battab","tabbat"]

// words = ['a', '']
// Output: [
//   [0, 1],
//   [1, 0],
// ]

console.log(palindromePairs(words))

a = ['abc', 'abcd', 'ab']
a.sort((a, b) => a.localeCompare(b))
a
