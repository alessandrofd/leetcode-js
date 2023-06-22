/**
 * You are given a network of n nodes, labeled from 1 to n. You are also given
 * times, a list of travel times as directed edges times[i] = (ui, vi, wi),
 * where ui is the source node, vi is the target node, and wi is the time it
 * takes for a signal to travel from source to target.
 *
 * We will send a signal from a given node k. Return the minimum time it takes
 * for all the n nodes to receive the signal. If it is impossible for all the
 * n nodes to receive the signal, return -1.
 *
 * Constraints:
 *    1 <= k <= n <= 100
 *    1 <= times.length <= 6000
 *    times[i].length == 3
 *    1 <= ui, vi <= n
 *    ui != vi
 *    0 <= wi <= 100
 *    All the pairs (ui, vi) are unique. (i.e., no multiple edges.)
 */

/**
 * @param {number[][]} times
 * @param {number} n
 * @param {number} k
 * @return {number}
 */

import { MinPriorityQueue } from '@datastructures-js/priority-queue'

const networkDelayTime_dijkstra = (times, n, k) => {
  const graph = new Array(n + 1).fill().map((_) => [])
  for (const [source, target, time] of times) graph[source].push([target, time])

  const signalReceivedAt = new Array(n + 1).fill(Infinity)
  signalReceivedAt[k] = 0

  const queue = new MinPriorityQueue({ priority: (element) => element.time })
  queue.enqueue({ node: k, time: 0 })

  while (!queue.isEmpty()) {
    const { node, time } = queue.dequeue().element

    if (time > signalReceivedAt[node]) continue

    for (const [neighborNode, neighborTime] of graph[node]) {
      if (signalReceivedAt[neighborNode] > neighborTime + time) {
        signalReceivedAt[neighborNode] = neighborTime + time
        queue.enqueue({
          node: neighborNode,
          time: signalReceivedAt[neighborNode],
        })
      }
    }
  }
  const result = Math.max(...signalReceivedAt.slice(1))
  return result === Infinity ? -1 : result
}

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
    return this._comparator(this._heap[i], this._heap[j])
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

const networkDelayTime_dijkstra_customHeap = (times, n, k) => {
  const graph = new Array(n + 1).fill().map((_) => [])
  for (const [source, target, time] of times) graph[source].push([target, time])

  const signalReceivedAt = new Array(n + 1).fill(Infinity)
  signalReceivedAt[k] = 0

  const queue = new PriorityQueue(({ time: a }, { time: b }) => a - b)
  queue.push({ node: k, time: 0 })

  while (!queue.isEmpty()) {
    const { node, time } = queue.pop()

    if (time > signalReceivedAt[node]) continue

    for (const [neighborNode, neighborTime] of graph[node]) {
      if (signalReceivedAt[neighborNode] > neighborTime + time) {
        signalReceivedAt[neighborNode] = neighborTime + time
        queue.push({
          node: neighborNode,
          time: signalReceivedAt[neighborNode],
        })
      }
    }
  }
  const result = Math.max(...signalReceivedAt.slice(1))
  return result === Infinity ? -1 : result
}

const networkDelayTime_dfs = (times, n, k) => {
  const graph = new Array(n + 1).fill().map((_) => [])
  for (const [source, destination, time] of times)
    graph[source].push([destination, time])

  for (const adjs of graph) adjs.sort(([, a], [, b]) => a - b)

  const signalReceivedAt = new Array(n + 1).fill(Infinity)

  const dfs = (node, time) => {
    if (time >= signalReceivedAt[node]) return
    signalReceivedAt[node] = time
    for (const [adjNode, adjTime] of graph[node]) dfs(adjNode, adjTime + time)
  }

  dfs(k, 0)
  const result = Math.max(...signalReceivedAt.slice(1))
  return result === Infinity ? -1 : result
}

const networkDelayTime_bfs = (times, n, k) => {
  const graph = new Array(n + 1).fill().map((_) => [])
  for (const [source, destination, time] of times)
    graph[source].push([destination, time])

  const signalReceivedAt = new Array(n + 1).fill(Infinity)

  const queue = [[k, 0]]
  while (queue.length) {
    const [node, time] = queue.shift()
    if (time >= signalReceivedAt[node]) continue
    signalReceivedAt[node] = time
    for (const [adjNode, adjTime] of graph[node])
      queue.push([adjNode, adjTime + time])
  }

  const result = Math.max(...signalReceivedAt.slice(1))
  return result === Infinity ? -1 : result
}

let times = [
  [2, 1, 1],
  [2, 3, 1],
  [3, 4, 1],
]
let n = 4
let k = 2
// Output: 2

times = [[1, 2, 1]]
n = 2
k = 1
// Output: 1

times = [[1, 2, 1]]
n = 2
k = 2
// Output: -1

console.log(networkDelayTime_dijkstra(times, n, k))
console.log(networkDelayTime_dijkstra_customHeap(times, n, k))
console.log(networkDelayTime_dfs(times, n, k))
console.log(networkDelayTime_bfs(times, n, k))
