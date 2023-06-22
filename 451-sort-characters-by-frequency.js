/**
 * Given a string s, sort it in decreasing order based on the frequency of the
 * characters. The frequency of a character is the number of times it appears in
 * the string.
 *
 * Return the sorted string. If there are multiple answers, return any of them.
 *
 * Constraints:
 *    1 <= s.length <= 5 * 10^5
 *    s consists of uppercase and lowercase English letters and digits.
 */

/**
 * @param {string} s
 * @return {string}
 */
const frequencySort_mapAndSort = (s) => {
  const map = new Map()
  for (const letter of s) map.set(letter, (map.get(letter) ?? 0) + 1)

  const arr = Array.from(map).sort(([, a], [, b]) => b - a)

  let result = ''
  for ([letter, repeat] of arr) result += letter.repeat(repeat)

  return result
}

/** Curiosamente, apesar da imutabilidade das strings no Javascript, o concat
 * apresenta melhor desempenho que o join, a não ser no Internet Explorer,
 * apesar do LeetCode ter apresentado melhor resultado com o join:
 * https://stackoverflow.com/questions/2087522/does-javascript-have-a-built-in-stringbuilder-class
 */
const frequencySort_stringsAreImmutable = (s) => {
  const map = new Map()
  for (const letter of s) map.set(letter, (map.get(letter) ?? 0) + 1)

  return Array.from(map)
    .sort(([, a], [, b]) => b - a)
    .map(([letter, freq]) => letter.repeat(freq))
    .join('')
}

// Approach 3: Multiset and Bucket Sort
const frequencySort = (s) => {
  const map = new Map()
  for (const letter of s) map.set(letter, (map.get(letter) ?? 0) + 1)

  const maxFreq = Math.max(...map.values())
  const buckets = new Array(maxFreq + 1).fill().map((_) => [])

  for (letter of map.keys()) buckets[map.get(letter)].push(letter)

  // let result = ''
  // for (let i = buckets.length - 1; i > 0; i--)
  //   for (letter of buckets[i]) result += letter.repeat(i)
  // return result

  // Solução com join tem desempenho, no LeetCode, pior do que a solução com
  // concat acima.
  let result = []
  for (let i = buckets.length - 1; i > 0; i--)
    for (letter of buckets[i]) result.push(letter.repeat(i))
  return result.join('')
}

s = 'tree'
// Output: "eert"
// Explanation: 'e' appears twice while 'r' and 't' both appear once.
// So 'e' must appear before both 'r' and 't'. Therefore "eetr" is also a valid answer.

s = 'cccaaa'
// Output: "aaaccc"
// Explanation: Both 'c' and 'a' appear three times, so both "cccaaa" and
// "aaaccc" are valid answers.
// Note that "cacaca" is incorrect, as the same characters must be together.

s = 'Aabb'
// Output: "bbAa"
// Explanation: "bbaA" is also a valid answer, but "Aabb" is incorrect.
// Note that 'A' and 'a' are treated as two different characters.

console.log(frequencySort(s))
