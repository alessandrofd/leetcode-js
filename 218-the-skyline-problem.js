/**
 * A city's skyline is the outer contour of the silhouette formed by all the
 * buildings in that city when viewed from a distance. Given the locations and
 * heights of all the buildings, return the skyline formed by these buildings
 * collectively.
 *
 * The geometric information of each building is given in the array buildings
 * where buildings[i] = [lefti, righti, heighti]:
 *    lefti is the x coordinate of the left edge of the ith building.
 *    righti is the x coordinate of the right edge of the ith building.
 *    heighti is the height of the ith building.
 *
 * You may assume all buildings are perfect rectangles grounded on an absolutely
 * flat surface at height 0.
 *
 * The skyline should be represented as a list of "key points" sorted by their
 * x-coordinate in the form [[x1,y1],[x2,y2],...]. Each key point is the left
 * endpoint of some horizontal segment in the skyline except the last point in
 * the list, which always has a y-coordinate 0 and is used to mark the skyline's
 * termination where the rightmost building ends. Any ground between the leftmost
 * and rightmost buildings should be part of the skyline's contour.
 *
 * Note: There must be no consecutive horizontal lines of equal height in the
 * output skyline. For instance, [...,[2 3],[4 5],[7 5],[11 5],[12 7],...] is
 * not acceptable; the three lines of height 5 should be merged into one in the
 * final output as such: [...,[2 3],[4 5],[12 7],...]
 *
 * Constraints:
 *    1 <= buildings.length <= 10^4
 *    0 <= lefti < righti <= 2^31 - 1
 *    1 <= heighti <= 2^31 - 1
 *    buildings is sorted by lefti in non-decreasing order.
 */

// Approach 1: Brute Force I
/**
 * @param {number[][]} buildings
 * @return {number[][]}
 */
const getSkyline_1 = (buildings) => {
  const edges = [...new Set(buildings.flatMap(([l, r, h]) => [l, r]))].sort(
    (a, b) => a - b
  )

  const map = new Map(edges.map((num, index) => [num, index]))

  const heights = new Array(edges.length).fill(0)
  for (const [left, right, height] of buildings)
    for (let i = map.get(left); i < map.get(right); i++)
      heights[i] = Math.max(heights[i], height)

  const result = []
  let prevHeight
  for (let i = 0; i < edges.length; i++) {
    if (heights[i] !== prevHeight) result.push([edges[i], heights[i]])
    prevHeight = heights[i]
  }
  return result
}

// Approach 2: Brute Force II, Sweep Line
const getSkyline_2 = (buildings) => {
  const positions = [...new Set(buildings.flatMap(([l, r, h]) => [l, r]))].sort(
    (a, b) => a - b
  )

  const result = []
  let prevHeight = 0
  for (const position of positions) {
    let maxHeight = 0
    for (const [left, right, height] of buildings)
      if (left <= position && right > position)
        maxHeight = Math.max(maxHeight, height)
    if (maxHeight !== prevHeight) result.push([position, maxHeight])
    prevHeight = maxHeight
  }
  return result
}

// Approach 3: Sweep Line + Priority Queue
import {
  MinPriorityQueue,
  MaxPriorityQueue,
} from '@datastructures-js/priority-queue'

const getSkyline_3 = (buildings) => {
  const edges = buildings
    .flatMap(([l, r], index) => [
      { position: l, index },
      { position: r, index },
    ])
    .sort(({ position: a }, { position: b }) => a - b)

  const live = new MaxPriorityQueue({ priority: ({ height }) => height })
  const result = []
  let prevHeight = 0
  let i = 0
  while (i < edges.length) {
    const { position } = edges[i]
    while (i < edges.length && position === edges[i].position) {
      const [left, right, height] = buildings[edges[i].index]
      if (position === left) live.enqueue({ height, right })
      i++
    }

    while (!live.isEmpty() && live.front().element.right <= position)
      live.dequeue()

    const height = live.isEmpty() ? 0 : live.front().element.height
    if (height !== prevHeight) result.push([position, height])
    prevHeight = height
  }

  return result
}

// Approach 4: Sweep Line + Two Priority Queue
const getSkyline_4 = (buildings) => {
  const edges = buildings
    .flatMap(([l, r, h]) => [
      { position: l, height: h },
      { position: r, height: -h },
    ])
    .sort(({ position: a }, { position: b }) => a - b)

  const live = new MaxPriorityQueue({ priority: (x) => x })
  const past = new MaxPriorityQueue({ priority: (x) => x })
  const result = []
  let prevHeight = 0
  let i = 0
  while (i < edges.length) {
    const { position } = edges[i]
    while (i < edges.length && position === edges[i].position) {
      const height = edges[i].height
      if (height > 0) live.enqueue(height)
      else past.enqueue(-height)
      i++
    }

    while (!past.isEmpty() && past.front().element === live.front().element) {
      live.dequeue()
      past.dequeue()
    }

    const height = live.isEmpty() ? 0 : live.front().element
    if (height !== prevHeight) result.push([position, height])
    prevHeight = height
  }

  return result
}

// Approach 5: Union Find
const getSkyline_5 = (buildings) => {
  class UnionFind {
    constructor(n) {
      this.root = Array.from(Array(n).keys())
    }

    find = (x) =>
      this.root[x] === x ? x : (this.root[x] = this.find(this.root[x]))

    union = (x, y) => (this.root[x] = this.root[y])
  }

  const edges = [...new Set(buildings.flatMap(([l, r, h]) => [l, r]))].sort(
    (a, b) => a - b
  )

  const map = new Map(edges.map((num, index) => [num, index]))

  const heights = new Array(edges.length).fill(0)
  const uf = new UnionFind(edges.length)

  buildings.sort(([, , a], [, , b]) => b - a)
  for (const [leftEdge, rightEdge, height] of buildings) {
    let leftIndex = map.get(leftEdge)
    const rightIndex = map.get(rightEdge)
    while (leftIndex < rightIndex) {
      leftIndex = uf.find(leftIndex)
      if (leftIndex < rightIndex) {
        uf.union(leftIndex, rightIndex)
        heights[leftIndex] = height
        leftIndex++
      }
    }
  }

  const result = []
  let prevHeight
  for (let i = 0; i < edges.length; i++) {
    if (heights[i] !== prevHeight) result.push([edges[i], heights[i]])
    prevHeight = heights[i]
  }
  return result
}

// Approach 6: Divide-and-Conquer
const getSkyline = (buildings) => {
  const divideAndConquer = (buildings, left, right) => {
    if (left === right) {
      const [leftEdge, rightEdge, height] = buildings[left]
      return [
        [leftEdge, height],
        [rightEdge, 0],
      ]
    }

    const middle = ((left + right) / 2) | 0
    const leftSkyline = divideAndConquer(buildings, left, middle)
    const rightSkyline = divideAndConquer(buildings, middle + 1, right)
    return mergeSkylines(leftSkyline, rightSkyline)
  }

  const mergeSkylines = (leftSkyline, rightSkyline) => {
    const result = []
    let prevHeight = 0
    let leftPosition = 0,
      rightPosition = 0,
      leftPrevHeight = 0,
      rightPrevHeight = 0
    let currEdge, currHeight
    while (
      leftPosition < leftSkyline.length &&
      rightPosition < rightSkyline.length
    ) {
      const [leftNextEdge, leftNextHeight] = leftSkyline[leftPosition]
      const [rightNextEdge, rightNextHeight] = rightSkyline[rightPosition]

      if (leftNextEdge < rightNextEdge) {
        leftPrevHeight = leftNextHeight
        currEdge = leftNextEdge
        currHeight = Math.max(leftPrevHeight, rightPrevHeight)
        leftPosition++
      } else if (leftNextEdge > rightNextEdge) {
        rightPrevHeight = rightNextHeight
        currEdge = rightNextEdge
        currHeight = Math.max(leftPrevHeight, rightPrevHeight)
        rightPosition++
      } else {
        leftPrevHeight = leftNextHeight
        rightPrevHeight = rightNextHeight
        currEdge = leftNextEdge
        currHeight = Math.max(leftPrevHeight, rightPrevHeight)
        leftPosition++
        rightPosition++
      }
      if (currHeight !== prevHeight) result.push([currEdge, currHeight])
      prevHeight = currHeight
    }

    while (leftPosition < leftSkyline.length)
      result.push(leftSkyline[leftPosition++])

    while (rightPosition < rightSkyline.length)
      result.push(rightSkyline[rightPosition++])

    return result
  }

  return divideAndConquer(buildings, 0, buildings.length - 1)
}

const buildings = [
  [2, 9, 10],
  [3, 7, 15],
  [5, 12, 12],
  [15, 20, 10],
  [19, 24, 8],
]
// Output: [
//   [2, 10],
//   [3, 15],
//   [7, 12],
//   [12, 0],
//   [15, 10],
//   [20, 8],
//   [24, 0],
// ]

console.log(getSkyline(buildings))
