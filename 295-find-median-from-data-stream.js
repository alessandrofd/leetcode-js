/**
 * The median is the middle value in an ordered integer list. If the size of the
 * list is even, there is no middle value, and the median is the mean of the two
 * middle values.
 *    For example, for arr = [2,3,4], the median is 3.
 *     For example, for arr = [2,3], the median is (2 + 3) / 2 = 2.5.
 *
 * Implement the MedianFinder class:
 *    MedianFinder() initializes the MedianFinder object.
 *    void addNum(int num) adds the integer num from the data stream to the data
 *    structure.
 *    double findMedian() returns the median of all elements so far. Answers
 *    within 10-5 of the actual answer will be accepted.
 *
 * Constraints:
 *    -10^5 <= num <= 10^5
 *    There will be at least one element in the data structure before calling
 *    findMedian.
 *    At most 5 * 10^4 calls will be made to addNum and findMedian.
 */

// Time Limit Exceeded
class MedianFinder_TLE {
  constructor() {
    this.array = []
    this.sorted = false
  }

  /**
   * @param {number} num
   * @return {void}
   */
  addNum(num) {
    this.array.push(num)
    this.sorted = false
  }

  /**
   * @return {number}
   */
  findMedian() {
    if (!this.sorted) {
      this.array.sort((a, b) => a - b)
      this.sorted = true
    }
    const half = (this.array.length / 2) | 0
    if (this.array.length % 2) return this.array[half]
    return (this.array[half - 1] + this.array[half]) / 2
  }
}

// Approach 2: Insertion Sort
class MedianFinder_binSearch {
  constructor() {
    this.array = []
  }

  addNum(num) {
    const binarySearch = (val, start = 0, end = this.array.length - 1) => {
      if (start > end) return start

      const half = ((start + end) / 2) | 0
      if (val === this.array[half]) return half

      return val < this.array[half]
        ? binarySearch(val, start, half - 1)
        : binarySearch(val, half + 1, end)
    }

    if (this.array.length === 0) this.array.push(num)
    else {
      const index = binarySearch(num)
      this.array.splice(index, 0, num)
    }
  }

  findMedian() {
    const half = (this.array.length / 2) | 0
    if (this.array.length % 2) return this.array[half]
    return (this.array[half - 1] + this.array[half]) / 2
  }
}

// Desempenho muito pior que a implementação com a pesquisa binária
class MedianFinder_insertSort {
  constructor() {
    this.array = []
  }

  addNum(num) {
    const insertionSort = (arr = this.array, n = this.array.length) => {
      for (let i = 1; i < n; i++) {
        const key = arr[i]
        let j = i - 1
        while (j >= 0 && arr[j] > key) {
          arr[j + 1] = arr[j]
          j -= 1
        }
        arr[j + 1] = key
      }
    }

    this.array.push(num)
    insertionSort()
  }

  findMedian() {
    const half = (this.array.length / 2) | 0
    if (this.array.length % 2) return this.array[half]
    return (this.array[half - 1] + this.array[half]) / 2
  }
}

// Approach 3: Two Heaps
import {
  MinPriorityQueue,
  MaxPriorityQueue,
} from '@datastructures-js/priority-queue'

class MedianFinder {
  constructor() {
    this.lo = new MinPriorityQueue({ priority: (num) => num })
    this.hi = new MaxPriorityQueue({ priority: (num) => num })
  }

  addNum = (num) => {
    this.lo.enqueue(num)
    this.hi.enqueue(this.lo.dequeue().element)
    if (this.lo.size() < this.hi.size())
      this.lo.enqueue(this.hi.dequeue().element)
  }

  findMedian = () => {
    return this.lo.size() > this.hi.size()
      ? this.lo.front().element
      : (this.lo.front().element + this.hi.front().element) / 2
  }
}

const medianFinder = new MedianFinder()
medianFinder.addNum(1) // arr = [1]
medianFinder.addNum(2) // arr = [1, 2]
medianFinder.findMedian() // return 1.5 (i.e., (1 + 2) / 2)
medianFinder.addNum(3) // arr[1, 2, 3]
medianFinder.findMedian() // return 2.0
