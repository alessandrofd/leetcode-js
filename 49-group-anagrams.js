/**
 * Given an array of strings strs, group the anagrams together. You can return
 * the answer in any order.
 *
 * An Anagram is a word or phrase formed by rearranging the letters of a
 * different word or phrase, typically using all the original letters exactly
 * once.
 *
 * Constraints:
 *  1 <= strs.length <= 10^4
 *  0 <= strs[i].length <= 100
 *  strs[i] consists of lowercase English letters.
 */

/**
 * @param {string[]} strs
 * @return {string[][]}
 */
// Approach 1: Categorize by Sorted String
const groupAnagrams_1 = (strs) => {
  if (!strs.length) return []

  const map = new Map()
  for (const string of strs) {
    const key = [...string].sort().join('')
    if (!map.has(key)) map.set(key, [])
    map.get(key).push(string)
  }
  return [...map.values()]
}

// Approach 2: Categorize by Count
const groupAnagrams = (strings) => {
  if (!strings.length) return []

  const map = new Map()
  for (const string of strings) {
    let count = new Array(26).fill(0)
    for (const char of string) {
      count[char.charCodeAt() - 97]++
    }
    const key = count.join('#')
    if (!map.has(key)) map.set(key, [])
    map.get(key).push(string)
  }
  return [...map.values()]
}

strs = ['eat', 'tea', 'tan', 'ate', 'nat', 'bat']
// Output: [["bat"],["nat","tan"],["ate","eat","tea"]]

strs = ['']
// Output: [[""]]

strs = ['a']
// Output: [["a"]]

console.log(groupAnagrams(strs))
