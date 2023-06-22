/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */

// Approach 1: Dynamic Programming + Deque
const maxResult_1 = (nums, k) => {
  score = new Array(nums.length)
  score[0] = nums[0]
  const dq = []
  dq.push(0)
  for (let i = 1; i < nums.length; i++) {
    while (dq.length > 0 && dq[0] < i - k) dq.shift()
    score[i] = score[dq[0]] + nums[i]
    while (dq.length > 0 && score[i] >= score[dq[dq.length - 1]]) dq.pop()
    dq.push(i)
  }
  return score[nums.length - 1]
}

// Approach 2: Dynamic Programming + Priority Queue

// No use of library for priority queue (class MaxHeap)
const maxResult_2_max_heap = (nums, k) => {
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
      if (this.data[p]?.score < this.data[i].score) {
        this.swap(p, i)
        this.bubbleUp(p)
      }
    }

    bubbleDown(i) {
      let l = i * 2 + 1
      let r = i * 2 + 2
      let max = i
      if (l < this.size() && this.data[max].score < this.data[l].score) max = l
      if (r < this.size() && this.data[max].score < this.data[r].score) max = r
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

  const score = new Array(nums.length)
  score[0] = nums[0]
  const mh = new MaxHeap()
  mh.offer({ score: nums[0], index: 0 })
  for (let i = 1; i < nums.length; i++) {
    while (mh.peek().index < i - k) mh.poll()
    score[i] = mh.peek().score + nums[i]
    mh.offer({ score: score[i], index: i })
  }
  return score[nums.length - 1]
}

// @datastructures-js/priority-queue@6.1.1 -- not supported by LeetCode
// const { MaxPriorityQueue } = require('@datastructures-js/priority-queue')
const maxResult_2_priority_queue_6 = (nums, k) => {
  const score = new Array(nums.length)
  score[0] = nums[0]
  const mpq = new MaxPriorityQueue((a) => a.score)
  mpq.enqueue({ score: nums[0], index: 0 })
  for (let i = 1; i < nums.length; i++) {
    while (mpq.front().index < i - k) mpq.dequeue()
    score[i] = mpq.front().score + nums[i]
    mpq.enqueue({ score: score[i], index: i })
  }
  return score[nums.length - 1]
}

// @datastructures-js/priority-queue@5.3.0
//const { MaxPriorityQueue } = require('@datastructures-js/priority-queue')
const maxResult_2_priority_queue_5 = (nums, k) => {
  const score = new Array(nums.length)
  score[0] = nums[0]
  const mpq = new MaxPriorityQueue()
  mpq.enqueue(0, nums[0])
  for (let i = 1; i < nums.length; i++) {
    while (mpq.front().element < i - k) mpq.dequeue()
    score[i] = mpq.front().priority + nums[i]
    mpq.enqueue(i, score[i])
  }
  return score[nums.length - 1]
}

// Approach 3: Segment Tree
const maxResult_3 = (nums, k) => {
  const update = (index, value) => {
    index += nums.length
    tree[index] = value
    for (index >>= 1; index > 0; index >>= 1)
      tree[index] = Math.max(tree[index << 1], tree[(index << 1) + 1])
  }

  const query = (left, right) => {
    let result = -Infinity
    for (
      left += nums.length, right += nums.length;
      left < right;
      left >>= 1, right >>= 1
    ) {
      if ((left & 1) === 1) result = Math.max(result, tree[left++])
      if ((right & 1) === 1) result = Math.max(result, tree[--right])
    }
    return result
  }

  const tree = new Array(2 * nums.length).fill(0)
  update(0, nums[0])
  for (let i = 1; i < nums.length; i++) {
    const max = query(Math.max(0, i - k), i)
    update(i, max + nums[i])
  }
  return tree[2 * nums.length - 1]
}

/*
      1 
         2
 3    4     5
6 7  8 9  10 11

          1
    2             3
 4     5      6      7
8 9  10 11  12 13  14 15

*/

// Approach 4: Dynamic Programming + Deque (Compressed)
const maxResult_4 = (nums, k) => {
  score = nums[0]
  const dq = []
  dq.push([0, score])
  for (let i = 1; i < nums.length; i++) {
    while (dq.length > 0 && dq[0][0] < i - k) dq.shift()
    score = dq[0][1] + nums[i]
    while (dq.length > 0 && score >= dq[dq.length - 1][1]) dq.pop()
    dq.push([i, score])
  }
  return score
}

// Approach 5: Dynamic Programming + Priority Queue (Compressed)
const { MaxPriorityQueue } = require('@datastructures-js/priority-queue')
const maxResult = (nums, k) => {
  score = nums[0]
  const mpq = new MaxPriorityQueue()
  mpq.enqueue(0, nums[0])
  for (let i = 1; i < nums.length; i++) {
    while (mpq.front().element < i - k) mpq.dequeue()
    score = mpq.front().priority + nums[i]
    mpq.enqueue(i, score)
  }
  return score
}

let nums = [1, -1, -2, 4, -7, 3]
let k = 2
// Output: 7

nums = [10, -5, -2, 4, 0, 3]
k = 3
// Output: 17

nums = [1, -5, -20, 4, -1, 3, -6, -3]
k = 2
// Output: 0

console.log(maxResult(nums, k))
