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

/**
 * @param {string} s
 * @return {number}
 */

// Approach 1: Decrement Each Duplicate Until it is Unique
const minDeletions_decrement_duplicates = (string) => {
  const frequencies = new Array(26).fill(0)
  for (char of string) frequencies[char.charCodeAt(0) - 'a'.charCodeAt(0)]++

  let deleteCount = 0
  const seenFrequencies = new Set()
  for (let i = 0; i < frequencies.length; i++) {
    while (frequencies[i] && seenFrequencies.has(frequencies[i])) {
      frequencies[i]--
      deleteCount++
    }
    seenFrequencies.add(frequencies[i])
  }
  return deleteCount
}

// Approach 2: Priority Queue
const minDeletions_priority_queue = (string) => {
  class MaxHeap {
    constructor() {
      this.data = []
    }

    offer(val) {
      this.data.push(val)
      this.bubbleUp(this.size() - 1)
    }

    peek() {
      return this.data[0]
    }

    poll() {
      if (this.size() == 1) return this.data.pop()
      const top = this.data[0]
      this.data[0] = this.data.pop()
      this.bubbleDown(0)
      return top
    }

    bubbleUp(i) {
      let p = Math.floor((i - 1) / 2)
      if (this.data[p] < this.data[i]) {
        this.swap(p, i)
        this.bubbleUp(p)
      }
    }

    bubbleDown(i) {
      let l = i * 2 + 1
      let r = i * 2 + 2
      let max = i
      if (l < this.size() && this.data[max] < this.data[l]) max = l
      if (r < this.size() && this.data[max] < this.data[r]) max = r
      if (max !== i) {
        this.swap(max, i)
        this.bubbleDown(max)
      }
    }

    swap(a, b) {
      let temp = this.data[a]
      this.data[a] = this.data[b]
      this.data[b] = temp
    }

    size() {
      return this.data.length
    }
  }

  const frequencies = new Array(26).fill(0)
  for (char of string) frequencies[char.charCodeAt(0) - 'a'.charCodeAt(0)]++

  const mh = new MaxHeap()
  for (f of frequencies) if (f) mh.offer(f)

  let deleteCount = 0
  while (mh.size() > 0) {
    largest = mh.poll()
    if (largest === mh.peek()) {
      if (largest - 1 > 0) mh.offer(largest - 1)
      deleteCount++
    }
  }
  return deleteCount
}

// Approach 3: Sorting
const minDeletions_sorting = (string) => {
  const frequencies = new Array(26).fill(0)
  for (char of string) frequencies[char.charCodeAt(0) - 'a'.charCodeAt(0)]++
  frequencies.sort((a, b) => b - a)

  let deleteCount = 0
  let maxFrequency = string.length

  for (let i = 0; i < frequencies.length && frequencies[i] > 0; i++) {
    if (frequencies[i] > maxFrequency) {
      deleteCount += frequencies[i] - maxFrequency
      frequencies[i] = maxFrequency
    }
    maxFrequency = Math.max(0, frequencies[i] - 1)
  }

  return deleteCount
}

const funcs = [
  minDeletions_decrement_duplicates,
  minDeletions_priority_queue,
  minDeletions_sorting,
]

const data = [
  ['aab', 0],
  ['aaabbbcc', 2],
  ['ceabaacb', 2],
]

for (const func of funcs) {
  for (const [string, expected] of data) {
    console.log(func(string) === expected)
  }
}
