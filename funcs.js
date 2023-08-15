/**
 * PriorityQueue
 */

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

/**
 * TreeNode
 */

class TreeNode {
  constructor(val, left, right) {
    this.val = val === undefined ? 0 : val
    this.left = left === undefined ? null : left
    this.right = right === undefined ? null : right
  }
}

const buildTree = (array) => {
  if (!array || !array.length) return null

  const root = new TreeNode(array.shift())
  const queue = [root]

  while (array.length) {
    const leftVal = array.shift()
    const rightVal = array.shift() ?? null
    const node = queue.shift()
    if (node) {
      if (leftVal !== null) {
        node.left = new TreeNode(leftVal)
        queue.push(node.left)
      }
      if (rightVal !== null) {
        node.right = new TreeNode(rightVal)
        queue.push(node.right)
      }
    }
  }
  return root
}

const destroyTree = (root) => {
  const array = []
  const queue = [root]
  while (queue.length) {
    const node = queue.shift()
    array.push(node ? node.val : null)
    if (!node || (!node.left && !node.right)) continue
    queue.push(node.left)
    queue.push(node.right)
  }
  return array
}

// LINKED LIST
class ListNode {
  constructor(val, next) {
    this.val = val === undefined ? 0 : val
    this.next = next === undefined ? null : next
  }
}

const buildLinkedList = (arr) => {
  if (!arr.length) return null

  const before = new ListNode()
  let node = before

  while (arr.length) {
    node.next = new ListNode(arr.shift())
    node = node.next
  }
  return before.next
}

const destroyLinkedList = (head) => {
  const arr = []
  let node = head
  while (node) {
    arr.push(node.val)
    node = node.next
  }

  return arr
}

// GRAPH
class Node {
  constructor(val, neighbors) {
    this.val = val === undefined ? 0 : val
    this.neighbors = neighbors === undefined ? [] : neighbors
  }
}

const buildGraph = (adjList, index = 0, nodes = []) => {
  if (adjList.length === 0) return null
  if (nodes[index]) return nodes[index]

  const node = new Node(index)
  nodes[index] = node
  for (const adj of adjList[index])
    node.neighbors.push(buildGraph(adjList, adj - 1, nodes))

  return node
}

const graphAdjList = (node, adjList = []) => {
  if (!node) return []
  if (adjList[node.val]) return

  adjList[node.val] = []
  for (const neighbor of node.neighbors) {
    adjList[node.val].push(neighbor.val)
    graphAdjList(neighbor, adjList)
  }

  return adjList
}
