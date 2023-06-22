/**
 * You are given two string arrays words1 and words2.
 *
 * A string b is a subset of string a if every letter in b occurs in a including
 * multiplicity.
 *
 * For example, "wrr" is a subset of "warrior" but is not a subset of "world".
 *
 * A string a from words1 is universal if for every string b in words2, b is a
 * subset of a.[]
 *
 * Return an array of all the universal strings in words1. You may return the
 * answer in any order.
 */

/**
 * @param {string[]} words1
 * @param {string[]} words2
 * @return {string[]}
 */

// Approach 1: Reduce to Single Word in B
const wordSubsets_1 = (words1, words2) => {
  const count = (str) => {
    const result = new Array(26).fill(0)
    for (const char of str) {
      result[char.charCodeAt(0) - 'a'.charCodeAt(0)]++
    }
    return result
  }

  const result = []

  const bMax = new Array(26).fill(0)
  for (const word of words2) {
    const bCount = count(word)
    for (let i = 0; i < 26; i++) bMax[i] = Math.max(bMax[i], bCount[i])
  }

  for (const word of words1) {
    const aCount = count(word)
    let universal = true
    for (let i = 0; i < 26; i++)
      if (aCount[i] < bMax[i]) {
        universal = false
        break
      }
    if (universal) result.push(word)
  }

  return result
}

// Approach 1: Reduce to Single Word in B - with labelled continue
const wordSubsets_1_label = (words1, words2) => {
  const count = (str) => {
    const result = new Array(26).fill(0)
    for (const char of str) {
      result[char.charCodeAt(0) - 'a'.charCodeAt(0)]++
    }
    return result
  }

  const result = []

  const bMax = new Array(26).fill(0)
  for (const word of words2) {
    const bCount = count(word)
    for (let i = 0; i < 26; i++) bMax[i] = Math.max(bMax[i], bCount[i])
  }

  search: for (const word of words1) {
    const aCount = count(word)
    for (let i = 0; i < 26; i++) if (aCount[i] < bMax[i]) continue search
    result.push(word)
  }

  return result
}

// Discussion Board - sgallivan
const wordSubsets = (A, B) => {
  const Bfreq = new Uint8Array(26)
  const check = new Uint8Array(26)
  const result = []
  let cMax = 0

  for (const word of B) {
    check.fill()
    for (const char of word) check[char.charCodeAt(0) - 97]++
    for (let i = 0; i < 26; i++) {
      const diff = check[i] - Bfreq[i]
      if (diff > 0) (cMax += diff), (Bfreq[i] += diff)
      if (cMax > 10) return []
    }
  }

  search: for (const word of A) {
    check.fill()
    if (word.length < cMax) continue
    for (const char of word) check[char.charCodeAt(0) - 97]++
    for (let i = 0; i < 26; i++) if (check[i] < Bfreq[i]) continue search
    result.push(word)
  }

  return result
}

words1 = ['amazon', 'apple', 'facebook', 'google', 'leetcode']
words2 = ['e', 'o']
// Output: ["facebook","google","leetcode"]

// words1 = ['amazon', 'apple', 'facebook', 'google', 'leetcode']
// words2 = ['l', 'e']
// Output: ["apple","google","leetcode"]

console.log(wordSubsets(words1, words2))

a = new Uint8Array(3)
