/**
 * Given a string s, rearrange the characters of s so that any two adjacent
 * characters are not the same.
 *
 * Return any possible rearrangement of s or return "" if not possible
 *
 * Constraints:
 *    1 <= s.length <= 500
 *    s consists of lowercase English letters.
 */

import { MaxPriorityQueue } from '@datastructures-js/priority-queue'

/**
 * @param {string} s
 * @return {string}
 */
const reorganizeString_pq = (s) => {
  if (s.length === 1) return s

  const freqs = new Map()
  s.split('').forEach((c) => {
    freqs.set(c, (freqs.get(c) ?? 0) + 1)
  })

  const queue = new MaxPriorityQueue({
    priority: ([letter, count]) => {
      return count * 26 + letter.charCodeAt() - 97
    },
  })
  for (const freq of freqs) queue.enqueue(freq)

  const [, maxCount] = queue.front().element
  if (maxCount > Math.ceil(s.length / 2)) return ''

  let result = ''
  while (queue.size()) {
    if (queue.size() === 1) {
      const [letter] = queue.dequeue().element
      return result + letter
    }

    const first = queue.dequeue().element
    const second = queue.dequeue().element
    result = result + first[0] + second[0]

    if (second[1] > 1) {
      second[1] -= 1
      queue.enqueue(second)
    }
    if (first[1] > 1) {
      first[1] -= 1
      queue.enqueue(first)
    }
  }

  return result
}
/**
 * @param {string} s
 * @return {string}
 */
const reorganizeString_arr = (s) => {
  const n = s.length
  if (n === 1) return s

  const freqs = new Map()
  s.split('').forEach((c) => {
    freqs.set(c, (freqs.get(c) ?? 0) + 1)
  })

  const sortedFreqs = Array.from(freqs).sort(([, a], [, b]) => b - a)

  const [, maxCount] = sortedFreqs[0]
  if (maxCount > Math.ceil(n / 2)) return ''

  const result = new Array(n)
  let i = 0
  for (let [letter, count] of sortedFreqs) {
    while (count > 0) {
      if (i >= n) i = 1
      result[i] = letter
      count -= 1
      i += 2
    }
  }

  return result.join('')
}

let s = 'aab'
// Expected: "aba"

// s = 'aaab'
// Expected: ""

// s = 'vvvlo'
// Expected: "vlvov"

// s = 'eqmeyggvp'
// Expected: "epeqgvgym"

s = 'ogccckcwmbmxtsbmozli'
// Expected: "cocgcickmlmsmtbwbxoz"

// console.log(reorganizeString_pq(s))
console.log(reorganizeString_arr(s))
