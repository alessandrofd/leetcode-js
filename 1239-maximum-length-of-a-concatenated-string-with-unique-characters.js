/**
 * You are given an array of strings arr. A string s is formed by the
 * concatenation of a subsequence of arr that has unique characters.
 *
 * Return the maximum possible length of s.
 *
 * A subsequence is an array that can be derived from another array by deleting
 * some or no elements without changing the order of the remaining elements.
 *
 * Constraints:
 *    1 <= arr.length <= 16
 *    1 <= arr[i].length <= 26
 *    arr[i] contains only lowercase English letters.
 */

/**
 * @param {string[]} arr
 * @return {number}
 */

// Approach 1: Iterative
const maxLength_1 = (arr) => {
  const results = ['']
  let longest = 0
  for (const word of arr) {
    for (let i = 0; i < results.length; i++) {
      const result = results[i] + word
      const set = new Set([...result])
      if (result.length !== set.size) continue
      results.push(result)
      longest = Math.max(longest, result.length)
    }
  }
  return longest
}

// Approach 1: Iterative -- optimized bitwise manipulation
const maxLength_1_opt = (arr) => {
  const results = new Set([0])
  let longest = 0

  const addWord = (word) => {
    let wordBM = 0
    for (const char of word) {
      const charBM = 1 << (char.charCodeAt() - 97)
      if (wordBM & charBM) return
      wordBM += charBM
    }

    if (results.has(wordBM)) return

    for (const result of results.values()) {
      if (result & wordBM) continue

      const length = (result >> 26) + word.length

      let newBM = wordBM + result
      newBM &= (1 << 26) - 1
      newBM += length << 26

      results.add(newBM)
      longest = Math.max(longest, length)
    }
  }

  for (const word of arr) addWord(word)
  return longest
}

// Approach 2: Backtracking
const maxLength_2 = (arr) => {
  const map = new Map()

  const backtracking = (pos) => {
    // A condição de retorno da recursão é a avaliação das operações, neste
    // caso a adição de uma substring ao resultado, da iteração anterior.
    for (const count of map.values()) if (count > 1) return 0

    // Comprimento do resultado da iteração anterior - validado pela condição de
    // retorno da recursão acima
    let longest = map.size

    for (let i = pos; i < arr.length; i++) {
      const word = arr[i]
      for (const char of word) map.set(char, (map.get(char) ?? 0) + 1)
      longest = Math.max(longest, backtracking(i + 1))

      for (const char of word)
        if (map.get(char) === 1) map.delete(char)
        else map.set(char, map.get(char) - 1)
    }
    return longest
  }

  return backtracking(0)
}

// Backtracking with optimization
const maxLength_2_opt = (words) => {
  const set = new Set()

  const addWord = (word) => {
    let wordBM = 0
    for (const char of word) {
      const charBM = 1 << (char.charCodeAt() - 97)
      if (wordBM & charBM) return
      wordBM += charBM
    }
    set.add(wordBM + (word.length << 26))
  }

  const backtracking = (position, resultChars, resultLength) => {
    let longest = resultLength

    for (let i = position; i < array.length; i++) {
      const chars = array[i] & ((1 << 26) - 1)
      const length = array[i] >> 26

      if (resultChars & chars) continue
      resultChars += chars
      resultLength += length

      longest = Math.max(
        longest,
        backtracking(i + 1, resultChars, resultLength)
      )

      resultChars -= chars
      resultLength -= length
    }

    return longest
  }

  for (const word of words) addWord(word)
  const array = [...set]
  return backtracking(0, 0, 0)
}

// Approach 3: Recursion
const maxLength_3 = (words) => {
  const dfs = (position, result) => {
    const set = new Set([...result])
    if (result.length !== set.size) return 0

    let longest = result.length
    for (let i = position; i < words.length; i++)
      longest = Math.max(longest, dfs(i + 1, result + words[i]))
    return longest
  }

  return dfs(0, '')
}

// Approach 3: Recursion optimized w/ bitwise manipulation
const maxLength = (words) => {
  const set = new Set()

  const addWord = (word) => {
    let wordBitset = 0
    for (const char of word) {
      const charBitset = 1 << (char.charCodeAt() - 97)
      if (wordBitset & charBitset) return
      wordBitset += charBitset
    }
    set.add(wordBitset + (word.length << 26))
  }

  const dfs = (position, result) => {
    const resultChars = result & ((1 << 26) - 1)
    const resultLength = result >> 26
    let longest = resultLength

    for (let i = position; i < array.length; i++) {
      const chars = array[i] & ((1 << 26) - 1)
      const length = array[i] >> 26
      if (resultChars & chars) continue
      const newResult = resultChars + chars + ((resultLength + length) << 26)
      longest = Math.max(longest, dfs(i + 1, newResult))
    }

    return longest
  }

  for (const word of words) addWord(word)
  const array = [...set]
  return dfs(0, '')
}

arr = ['un', 'iq', 'ue']
// Output: 4
// Explanation: All the valid concatenations are:
// - ""
// - "un"
// - "iq"
// - "ue"
// - "uniq" ("un" + "iq")
// - "ique" ("iq" + "ue")
// Maximum length is 4.

// arr = ['cha', 'r', 'act', 'ers']
// Output: 6
// Explanation: Possible longest valid concatenations are "chaers" ("cha" + "ers")
// and "acters" ("act" + "ers").

// arr = ['abcdefghijklmnopqrstuvwxyz']
// Output: 26
// Explanation: The only string in arr has all 26 characters.

console.log(maxLength(arr))
