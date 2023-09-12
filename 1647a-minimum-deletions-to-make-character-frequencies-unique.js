/**
 * A string s is called good if there are no two different characters in s that
 * have the same frequency.
 *
 * Given a string s, return the minimum number of characters you need to delete
 * to make s good.
 *
 * The frequency of a character in a string is the number of times it appears in
 * the string. For example, in the string "aab", the frequency of 'a' is 2,
 * while the frequency of 'b' is 1.
 *
 * Constraints:
 *    1 <= s.length <= 10^5
 *    s contains only lowercase English letters.
 */

import { MaxPriorityQueue } from '@datastructures-js/priority-queue'

/**
 * @param {string} string
 * @return {number}
 */
const minDeletions_decrement_duplicates = (string) => {
  // Decrement Each Duplicate Until it is Unique
  const freqsByChar = new Map()
  for (const char of string) {
    freqsByChar.set(char, (freqsByChar.get(char) ?? 0) + 1)
  }

  let deletes = 0
  const freqs = [...freqsByChar.values()]
  const uniqueFreqs = new Set()
  for (let freq of freqs) {
    while (freq && uniqueFreqs.has(freq)) {
      freq -= 1
      deletes += 1
    }
    uniqueFreqs.add(freq)
  }

  return deletes
}

/**
 * @param {string} string
 * @return {number}
 */
const minDeletions_priority_queue = (string) => {
  // Priority Queue
  const freqsByChar = new Map()
  for (const char of string) {
    freqsByChar.set(char, (freqsByChar.get(char) ?? 0) + 1)
  }

  const pq = new MaxPriorityQueue({ priority: (count) => count })
  for (const freq of freqsByChar.values()) pq.enqueue(freq)

  let deletes = 0
  while (pq.size()) {
    const largestFreq = pq.dequeue().element
    if (pq.size() && largestFreq === pq.front().element) {
      if (largestFreq > 1) pq.enqueue(largestFreq - 1)
      deletes += 1
    }
  }

  return deletes
}

/**
 * @param {string} string
 * @return {number}
 */
const minDeletions_sorting = (string) => {
  // Sorting
  const freqsByChar = new Map()
  for (const char of string) {
    freqsByChar.set(char, (freqsByChar.get(char) ?? 0) + 1)
  }

  const freqs = [...freqsByChar.values()].sort((a, b) => b - a)

  let totalDeletes = 0
  for (let i = 1; i < freqs.length; i++) {
    if (freqs[i] >= freqs[i - 1]) {
      const deletes = Math.min(freqs[i], freqs[i] - freqs[i - 1] + 1)
      freqs[i] -= deletes
      totalDeletes += deletes
    }
  }
  return totalDeletes
}

const funcs = [
  // minDeletions_decrement_duplicates,
  // minDeletions_priority_queue,
  minDeletions_sorting,
]

const data = [
  ['aab', 0],
  ['aaabbbcc', 2],
  ['ceabaacb', 2],
  ['bbcebab', 2],
  [
    'abcdefghijklmnopqrstuvwxwzabcdefghijklmnopqrstuvwxwzabcdefghijklmnopqrstuvwxwzabcdefghijklmnopqrstuvwxwzabcdefghijklmnopqrstuvwxwzabcdefghijklmnopqrstuvwxwzabcdefghijklmnopqrstuvwxwzabcdefghijklmnopqrstuvwxwzabcdefghijklmnopqrstuvwxwzabcdefghijklmnopqrstuvwxwzabcdefghijklmnopqrstuvwxwzabcdefghijklmnopqrstuvwxwzabcdefghijklmnopqrstuvwxwzabcdefghijklmnopqrstuvwxwzabcdefghijklmnopqrstuvwxwzabcdefghijklmnopqrstuvwxwzabcdefghijklmnopqrstuvwxwzabcdefghijklmnopqrstuvwxwzabcdefghijklmnopqrstuvwxwzabcdefghijklmnopqrstuvwxwzabcdefghijklmnopqrstuvwxwzabcdefghijklmnopqrstuvwxwzabcdefghijklmnopqrstuvwxwzabcdefghijklmnopqrstuvwxwzabcdefghijklmnopqrstuvwxwzabcdefghijklmnopqrstuvwxwz',
    276,
  ],
]

for (const func of funcs) {
  for (const [string, expected] of data) {
    console.log(func(string) === expected)
  }
}
