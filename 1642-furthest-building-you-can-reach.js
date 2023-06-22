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
    const top = this.data[0]
    this.data[0] = this.data.pop()
    this.bubbleDown(0)
    return top
  }

  bubbleUp(i) {
    let p = Math.floor((i - 1) / 2)
    if (this.data[p] > this.data[i]) {
      this.swap(p, i)
      this.bubbleUp(p)
    }
  }

  bubbleDown(i) {
    let l = i * 2 + 1
    let r = i * 2 + 2
    let min = i
    if (l < this.size() && this.data[min] > this.data[l]) min = l
    if (r < this.size() && this.data[min] > this.data[r]) min = r
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

/**
 * @param {number[]} heights
 * @param {number} bricks
 * @param {number} ladders
 * @return {number}
 */
const furthestBuilding = (heights, bricks, ladders) => {
  const ladderAllocations = new MinHeap()
  for (let i = 0; i < heights.length - 1; i++) {
    const climb = heights[i + 1] - heights[i]
    if (climb <= 0) continue

    ladderAllocations.offer(climb)
    if (ladderAllocations.size() <= ladders) continue

    bricks -= ladderAllocations.poll()
    if (bricks < 0) return i
  }
  return heights.length - 1
}
