/**
 * You are given an integer array nums that is sorted in non-decreasing order.
 *
 * Determine if it is possible to split nums into one or more subsequences such
 * that both of the following conditions are true:
 *
 *    Each subsequence is a consecutive increasing sequence (i.e. each integer is
 *    exactly one more than the previous integer).
 *
 *    All subsequences have a length of 3 or more.
 *
 * Return true if you can split nums according to the above conditions, or false
 * otherwise.
 *
 * A subsequence of an array is a new array that is formed from the original
 * array by deleting some (can be none) of the elements without disturbing the
 * elative positions of the remaining elements. (i.e., [1,3,5] is a subsequence
 * of [1,2,3,4,5] while [1,3,2] is not).
 */

/**
 * @param {number[]} nums
 * @return {boolean}
 */
// Approach 1: Greedy using Heap (Priority Queue)

const top = 0
const parent = (i) => ((i + 1) >>> 1) - 1
const left = (i) => (i << 1) + 1
const right = (i) => (i + 1) << 1

class PriorityQueue {
  constructor(comparator = (a, b) => a > b) {
    this._heap = []
    this._comparator = comparator
  }

  size() {
    return this._heap.length
  }

  isEmpty() {
    return this.size() == 0
  }

  peek() {
    return this._heap[top]
  }

  push(...values) {
    values.forEach((value) => {
      this._heap.push(value)
      this._siftUp()
    })
    return this.size()
  }

  pop() {
    const poppedValue = this.peek()
    const bottom = this.size() - 1
    if (bottom > top) {
      this._swap(top, bottom)
    }
    this._heap.pop()
    this._siftDown()
    return poppedValue
  }

  replace(value) {
    const replacedValue = this.peek()
    this._heap[top] = value
    this._siftDown()
    return replacedValue
  }

  _greater(i, j) {
    return this._comparator(this._heap[i], this._heap[j]) < 0
  }

  _swap(i, j) {
    ;[this._heap[i], this._heap[j]] = [this._heap[j], this._heap[i]]
  }

  _siftUp() {
    let node = this.size() - 1
    while (node > top && this._greater(node, parent(node))) {
      this._swap(node, parent(node))
      node = parent(node)
    }
  }

  _siftDown() {
    let node = top
    while (
      (left(node) < this.size() && this._greater(left(node), node)) ||
      (right(node) < this.size() && this._greater(right(node), node))
    ) {
      let maxChild =
        right(node) < this.size() && this._greater(right(node), left(node))
          ? right(node)
          : left(node)
      this._swap(node, maxChild)
      node = maxChild
    }
  }
}

const isPossible_1 = (nums) => {
  // Ordem crescente pelo último elemento e comprimento da subsequence
  const subs = new PriorityQueue((s1, s2) =>
    s1[1] === s2[1] ? s1[1] - s1[0] - (s2[1] - s2[0]) : s1[1] - s2[1]
  )

  for (const num of nums) {
    // Condition 1 - remove non-qualifying subsequences
    while (!subs.isEmpty() && num > subs.peek()[1] + 1) {
      const sub = subs.pop()
      const len = sub[1] - sub[0] + 1
      if (len < 3) return false
    }

    // Condition 2 - create a new subsequence
    if (subs.isEmpty() || num === subs.peek()[1]) subs.push([num, num])
    // Condition 3 - add num to a existing subsequence
    else subs.push([subs.pop()[0], num])
  }

  // If any subsequence is of length less than 3, return false
  while (!subs.isEmpty()) {
    const sub = subs.pop()
    const len = sub[1] - sub[0] + 1
    if (len < 3) return false
  }

  return true
}

// Approach 2: Greedy using Maps
const isPossible_2 = (nums) => {
  const subs = new Map()

  const freqs = new Map()
  for (const num of nums) freqs.set(num, (freqs.get(num) ?? 0) + 1)

  for (const num of nums) {
    // num already part of a valid subsequence
    if (freqs.get(num) === 0) continue

    // If a valid subsequence exists with the last element: num - 1
    if (subs.get(num - 1)) {
      subs.set(num - 1, subs.get(num - 1) - 1)
      subs.set(num, (subs.get(num) ?? 0) + 1)
    }
    // If we want to start a new subsequence, check if num + 1 and num + 2 exist.
    // Update the list of subsequences wight the newly created subsequence'
    else if ((freqs.get(num + 1) ?? 0) > 0 && (freqs.get(num + 2) ?? 0) > 0) {
      subs.set(num + 2, (subs.get(num + 2) ?? 0) + 1)
      freqs.set(num + 1, freqs.get(num + 1) - 1)
      freqs.set(num + 2, freqs.get(num + 2) - 1)
    }
    // No valid subsequence is possible with num
    else return false

    freqs.set(num, freqs.get(num) - 1)
  }
  return true
}

// Approach 3: Dynamic Programming
const isPossible_3 = (nums) => {
  const isSegmentValid = (nums, start, end) => {
    const uniques = nums[end] - nums[start] + 1

    const frequency = new Array(uniques).fill(0)
    for (let i = start; i <= end; i++) frequency[nums[i] - nums[start]]++

    // Holds count of subsequences of length 1 ending with index i
    const subsLength1 = new Array(uniques).fill(0)
    // Holds count of subsequences of length 2 ending with index i
    const subsLength2 = new Array(uniques).fill(0)
    // Holds count of all subsequences  ending with index i
    const allSubs = new Array(uniques).fill(0)

    subsLength1[0] = allSubs[0] = frequency[0]

    for (let i = 1; i < uniques; i++) {
      // If frequency[i] is less than total number of subsequences ending with
      //  i - 1, we do not have enough subsequences where we can put i.
      if (frequency[i] < subsLength1[i - 1] + subsLength2[i - 1]) return false

      // Total number os subsequences of length 2 can be obtained by adding i
      // to subsequence of length 1 ending with i - 1
      subsLength2[i] = subsLength1[i - 1]

      // For the remaining i valued numbers we can either add them to an existing
      // subsequence or create a new one. We first try to add them to the
      // existing subsequences ending with i - 1. If there are not enough of
      // such subsequences, we start a new subsequence. The existing subsequences
      // ending with i - 1 are denoted by allSubs[i - 1]
      subsLength1[i] = Math.max(0, frequency[i] - allSubs[i - 1])
      allSubs[i] = frequency[i]
    }

    // if there is no remaining subsequence of length one or two, we can return
    // true. Otherwise, return false.
    return subsLength1[uniques - 1] === 0 && subsLength2[uniques - 1] === 0
  }

  let start = 0
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] - nums[i - 1] > 1) {
      if (!isSegmentValid(nums, start, i - 1)) return false
      start = i
    }
  }
  // check for the last segment
  return isSegmentValid(nums, start, nums.length - 1)
}

// Approach 4: Optimal Space
const isPossible = (nums) => {
  const isSegmentValid = (nums, start, end) => {
    let frequency = 0
    let subsLength1 = 0
    let subsLength2 = 0
    let allSubs = 0

    for (let i = start; i <= end; i++) {
      if (i > start && nums[i] === nums[i - 1]) frequency++
      else if (frequency < subsLength1 + subsLength2) return false
      else {
        subsLength2 = subsLength1
        subsLength1 = Math.max(0, frequency - allSubs)
        allSubs = frequency
        frequency = 1
      }
    }
    // For the last element in the segment
    subsLength2 = subsLength1
    subsLength1 = Math.max(0, frequency - allSubs)

    // if there is no remaining subsequence of length one or two, we can return
    // true. Otherwise, return false.
    return subsLength1 === 0 && subsLength2 === 0
  }

  let start = 0
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] - nums[i - 1] > 1) {
      if (!isSegmentValid(nums, start, i - 1)) return false
      start = i
    }
  }
  // check for the last segment
  return isSegmentValid(nums, start, nums.length - 1)
}

nums = [1, 2, 3, 3, 4, 5]
// Output: true

nums = [1, 2, 3, 3, 4, 4, 5, 5]
// Output: true

nums = [1, 2, 3, 4, 4, 5]
// Output: false

console.log(isPossible(nums))
