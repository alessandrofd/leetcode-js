/**
 * @param {number[]} target
 * @return {boolean}
 */
const isPossible_1 = (target) => {
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

  if (target.length === 1) return target[0] === 1

  sum = target.reduce((acc, next) => acc + next)
  mh = new MaxHeap()
  for (num of target) mh.offer(num)

  while (mh.peek() > 1) {
    largest = mh.poll()
    x = largest - (sum - largest)
    if (x < 1) return false
    mh.offer(x)
    sum = sum - largest + x
  }
  return true
}

const isPossible = (target) => {
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

  if (target.length === 1) return target[0] === 1

  sum = target.reduce((acc, next) => acc + next)
  mh = new MaxHeap()
  for (num of target) mh.offer(num)

  while (mh.peek() > 1) {
    largest = mh.poll()
    rest = sum - largest
    // this will only occur if n = 2
    if (rest === 1) return true
    x = largest % rest
    // if x is now 0 (invalid) or didn't change, then we konow this is impossible
    if (x === 0 || x === largest) return false
    mh.offer(x)
    sum = sum - largest + x
  }
  return true
}

target = [9, 3, 5]

console.log(isPossible(target))
