/**
 * A linked list of length n is given such that each node contains an additional
 * random pointer, which could point to any node in the list, or null.
 *
 * Construct a deep copy of the list. The deep copy should consist of exactly n
 * brand new nodes, where each new node has its value set to the value of its
 * corresponding original node. Both the next and random pointer of the new
 * nodes should point to new nodes in the copied list such that the pointers in
 * the original list and copied list represent the same list state. None of the
 * pointers in the new list should point to nodes in the original list.
 *
 * For example, if there are two nodes X and Y in the original list, where
 * X.random --> Y, then for the corresponding two nodes x and y in the copied
 * list, x.random --> y.
 *
 * Return the head of the copied linked list.
 *
 * The linked list is represented in the input/output as a list of n nodes. Each
 * node is represented as a pair of [val, random_index] where:
 *
 *    val: an integer representing Node.val
 *
 *    random_index: the index of the node (range from 0 to n-1) that the random
 *    pointer points to, or null if it does not point to any node.
 *
 * Your code will only be given the head of the original linked list.
 *
 * Constraints:
 *    0 <= n <= 1000
 *    -10^4 <= Node.val <= 10^4
 *    Node.random is null or is pointing to some node in the linked list.
 */

class Node {
  constructor(val = 0, next = null, random = null) {
    this.val = val
    this.next = next
    this.random = random
  }
}

const arrayToLinkedList = (arr) => {
  const n = arr.length

  const nodes = new Array(n).fill(null)
  let head = null
  for (let i = n - 1; i >= 0; i--) {
    head = new Node(arr[i][0], head)
    nodes[i] = head
  }

  for (let i = 0; i < n; i++) {
    const random = arr[i][1]
    if (random !== null) {
      nodes[i].random = nodes[random]
    }
  }

  return head
}

const linkedListToArray = (head) => {
  const map = new Map()
  let node = head
  let i = 0
  while (node) {
    map.set(node, i)
    node = node.next
    i += 1
  }

  const arr = []
  node = head
  while (node) {
    arr.push([node.val, map.get(node.random) ?? null])
    node = node.next
  }
  return arr
}

const arraysEqual = (a, b) => {
  /*
        Array-aware equality checker:
        Returns whether arguments a and b are == to each other;
        however if they are equal-lengthed arrays, returns whether their 
        elements are pairwise == to each other recursively under this
        definition.
    */
  if (a instanceof Array && b instanceof Array) {
    if (a.length != b.length)
      // assert same length
      return false
    for (let i = 0; i < a.length; i++)
      if (!arraysEqual(a[i], b[i])) return false
    return true
  } else {
    return a == b // if not both arrays, should be the same
  }
}

/**
 * @param {Node} head
 * @return {Node}
 */

const copyRandomList = (head) => {
  const map = new Map()

  let before = new Node()
  let toNode = before

  for (let fromNode = head; fromNode !== null; fromNode = fromNode.next) {
    toNode.next = new Node(fromNode.val, null, fromNode.random)
    toNode = toNode.next
    map.set(fromNode, toNode)
  }

  for (let node = before.next; node !== null; node = node.next) {
    if (node.random !== null) {
      node.random = map.get(node.random)
    }
  }

  return before.next
}

// prettier-ignore
const data = [
  [
    [ [7, null], [13, 0], [11, 4], [10, 2], [1, 0], ], 
    [ [7, null], [13, 0], [11, 4], [10, 2], [1, 0], ],
  ],
  [
    [ [1, 1], [2, 1], ], 
    [ [1, 1], [2, 1], ],
  ],
  [
    [ [3, null], [3, 0], [3, null], ],
    [ [3, null], [3, 0], [3, null], ],
  ],
]

// prettier-ignore
const funcs = [
  copyRandomList,
]

for (const [arr, expected] of data) {
  for (const func of funcs) {
    const output = linkedListToArray(func(arrayToLinkedList(arr)))
    console.log(arraysEqual(output, expected))
  }
}
