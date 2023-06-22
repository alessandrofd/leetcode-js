const minimumEffortPath_backtrack = (heights) => {
  const directions = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
  ]
  let maxSoFar = Infinity
  const row = heights.length
  const col = heights[0].length

  const backtrack = (x, y, maxDiff) => {
    const isValidCell = (x, y) => x >= 0 && x < row && y >= 0 && y < col

    if (x === row - 1 && y === col - 1) {
      maxSoFar = Math.min(maxSoFar, maxDiff)
      return maxDiff
    }

    const currentHeight = heights[x][y]
    heights[x][y] = 0
    let minEffort = Infinity
    for (const direction of directions) {
      const [adjX, adjY] = [x + direction[0], y + direction[1]]
      if (isValidCell(adjX, adjY) && heights[adjX][adjY] !== 0) {
        const currDiff = Math.abs(currentHeight - heights[adjX][adjY])
        const maxCurrDiff = Math.max(currDiff, maxDiff)
        if (maxCurrDiff < maxSoFar) {
          const result = backtrack(adjX, adjY, maxCurrDiff)
          minEffort = Math.min(minEffort, result)
        }
      }
    }
    heights[x][y] = currentHeight
    return minEffort
  }

  return backtrack(0, 0, 0)
}

const minimumEffortPath_Dijkstra = (heights) => {
  const isValidCell = (x, y) => x >= 0 && x < row && y >= 0 && y < col

  class MinHeap {
    constructor() {
      this.data = []
    }

    offer(val, priority) {
      this.data.push({ val, priority })
      this.bubbleUp(this.size() - 1)
    }

    poll() {
      if (this.size() == 1) return this.data.pop()
      const top = this.data[0]
      this.data[0] = this.data.pop()
      this.bubbleDown(0)
      return top
    }

    bubbleUp(i) {
      if (i > 0) {
        let p = Math.floor((i - 1) / 2)
        if (this.data[p].priority > this.data[i].priority) {
          this.swap(p, i)
          this.bubbleUp(p)
        }
      }
    }

    bubbleDown(i) {
      let l = i * 2 + 1
      let r = i * 2 + 2
      let min = i
      if (l < this.size() && this.data[min].priority > this.data[l].priority)
        min = l
      if (r < this.size() && this.data[min].priority > this.data[r].priority)
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

  const directions = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
  ]
  const row = heights.length
  const col = heights[0].length
  const diffs = new Array(row)
    .fill(null)
    .map((_) => new Array(col).fill(Infinity))

  const visited = new Array(row)
    .fill(null)
    .map((_) => new Array(col).fill(false))

  const heap = new MinHeap()

  diffs[0][0] = 0
  heap.offer([0, 0], 0)

  while (heap.size() > 0) {
    const {
      val: [x, y],
      priority: diff,
    } = heap.poll()
    visited[x][y] = true

    if (x === row - 1 && y === col - 1) return diff

    directions.forEach(([dx, dy]) => {
      const [adjX, adjY] = [x + dx, y + dy]
      if (isValidCell(adjX, adjY) && !visited[adjX][adjY]) {
        const currDiff = Math.abs(heights[x][y] - heights[adjX][adjY])
        const maxDiff = Math.max(currDiff, diffs[x][y])
        if (diffs[adjX][adjY] > maxDiff) {
          diffs[adjX][adjY] = maxDiff
          heap.offer([adjX, adjY], maxDiff)
        }
      }
    })
  }
  return diffs[row - 1][col - 1]
}

// heights = [
//   [1, 2, 2],
//   [3, 8, 2],
//   [5, 3, 5],
// ]

// heights = [
//   [1, 2, 3],
//   [3, 8, 4],
//   [5, 3, 5],
// ]

// heights = [
//   [1, 2, 1, 1, 1],
//   [1, 2, 1, 2, 1],
//   [1, 2, 1, 2, 1],
//   [1, 2, 1, 2, 1],
//   [1, 1, 1, 2, 1],
// ]

console.log(minimumEffortPath(heights))

// Input: heights = [[1,2,2],[3,8,2],[5,3,5]]
// Output: 2
// Explanation: The route of [1,3,5,3,5] has a maximum absolute difference of 2 in consecutive cells.
// This is better than the route of [1,2,2,2,5], where the maximum absolute difference is 3.

// Input: heights = [[1,2,3],[3,8,4],[5,3,5]]
// Output: 1
// Explanation: The route of [1,2,3,4,5] has a maximum absolute difference of 1 in consecutive cells, which is better than route [1,3,5,3,5].

// Input: heights = [[1,2,1,1,1],[1,2,1,2,1],[1,2,1,2,1],[1,2,1,2,1],[1,1,1,2,1]]
// Output: 0
// Explanation: This route does not require any effort.
