// My solution
const topKFrequent_1 = (nums, k) => {
  const map = new Map()
  nums.forEach((x) => map.set(x, (map.get(x) ?? 0) + 1))
  const arr = Array.from(map.entries())
  arr.sort(([, a], [, b]) => b - a)
  const result = []
  for (let i = 0; i < k; i++) result.push(arr[i][0])
  return result
}

// Approach 1: Heap
const topKFrequent_2 = (nums, k) => {
  const count = new Map()
  nums.forEach((x) => count.set(x, (count.get(x) ?? 0) + 1))

  class MinHeap {
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
      this.data[0] = this.data.pop()
      this.bubbleDown(0)
    }

    bubbleUp(i) {
      let p = Math.floor((i - 1) / 2)
      if (count.get(this.data[p]) > count.get(this.data[i])) {
        this.swap(p, i)
        this.bubbleUp(p)
      }
    }

    bubbleDown(i) {
      let l = i * 2 + 1
      let r = i * 2 + 2
      let min = i
      if (
        l < this.size() &&
        count.get(this.data[min]) > count.get(this.data[l])
      )
        min = l
      if (
        r < this.size() &&
        count.get(this.data[min]) > count.get(this.data[r])
      )
        min = r
      if (min !== i) {
        this.swap(min, i)
        this.bubbleDown(min)
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
  const minHeap = new MinHeap()
  for (let num of count.keys()) {
    if (minHeap.size() < k) minHeap.offer(num)
    else if (count.get(num) > count.get(minHeap.peek())) {
      minHeap.offer(num)
      minHeap.poll()
    }
  }

  const result = []
  for (let i = 0; i < k; i++) {
    result.push(minHeap.peek())
    minHeap.poll()
  }
  return result
}

// Approach 2: Quickselect (Hoare's selection algorithm)
const topKFrequent = (nums, k) => {
  const count = new Map()
  nums.forEach((x) => count.set(x, (count.get(x) ?? 0) + 1))

  const keys = Array.from(count.keys())

  const swap = (a, b) => {
    ;[keys[a], keys[b]] = [keys[b], keys[a]]
  }

  const partition = (left, right, pivot) => {
    const pivotFrequency = count.get(keys[pivot])

    // 1. move pivot to the end
    swap(pivot, right)
    let index = left

    // 2. move all less frequent elements to the left
    for (let i = left; i <= right; i++) {
      if (count.get(keys[i]) < pivotFrequency) {
        swap(index, i)
        index++
      }
    }

    // 3. move pivot to its final place
    swap(index, right)

    return index
  }

  const quickSelect = (left, right, kthSmallest) => {
    // Sort a list within left...right till kth least frequent element takes its place

    // base case: the list contains only one element
    if (left === right) return

    // select a random pivot index
    let pivot = left + Math.floor(Math.random() * (right - left))

    // find the pivot position in a sorted list
    pivot = partition(left, right, pivot)

    if (kthSmallest === pivot) return
    else if (kthSmallest < pivot) quickSelect(left, pivot - 1, kthSmallest)
    else quickSelect(pivot + 1, right, kthSmallest)
  }

  // kth top frequent element is (n-k)th less frequent
  // Do a partial sort: from the least frequent to the most frequent, till
  // (n-k)th less frequent elements take its place (n-k) in a sorted array.
  // All element on the left are less frequent
  // All elements of the right are more frequent
  quickSelect(0, keys.length - 1, keys.length - k)
  return keys.slice(keys.length - k)
}

nums = [1, 1, 1, 2, 2, 3]
k = 2

console.log(topKFrequent(nums, k))
