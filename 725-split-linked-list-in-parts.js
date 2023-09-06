/**
 * Given the head of a singly linked list and an integer k, split the linked
 * list into k consecutive linked list parts.
 *
 * The length of each part should be as equal as possible: no two parts should
 * have a size differing by more than one. This may lead to some parts being
 * null.
 *
 * The parts should be in the order of occurrence in the input list, and parts
 * occurring earlier should always have a size greater than or equal to parts
 * occurring later.
 *
 * Return an array of the k parts.
 *
 * Constraints:
 *    The number of nodes in the list is in the range [0, 1000].
 *    0 <= Node.val <= 1000
 *    1 <= k <= 50
 */

class ListNode {
  constructor(val, next) {
    this.val = val === undefined ? 0 : val
    this.next = next === undefined ? null : next
  }
}

const arrayToLinkedList = (arr) =>
  arr.reduceRight((next, val) => new ListNode(val, next), null)

const linkedListToArray = (node) => {
  const arr = []
  while (node) {
    arr.push(node.val)
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
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode[]}
 */
const splitListToParts = (head, k) => {
  const lists = new Array(k).fill(null)

  let numNodes = 0
  for (let node = head; node !== null; node = node.next) {
    numNodes += 1
  }

  const base = Math.floor(numNodes / k)
  const extra = numNodes % k
  if (base === 0) k = extra

  let node = head
  for (let i = 0; i < k; i++) {
    lists[i] = node

    let partSize = base + (i < extra ? 1 : 0) - 1
    for (let j = 0; j < partSize; j++) node = node.next

    const temp = node
    node = node.next
    temp.next = null
  }

  return lists
}

// prettier-ignore
const funcs = [
  splitListToParts,
]

// prettier-ignore
const data = [
  [ [1, 2, 3], 
    5, 
    [[1], [2], [3], [], []] 
  ],
  [ 
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 
    3, 
    [ [1, 2, 3, 4], [5, 6, 7], [8, 9, 10], ] 
  ],
]

for (const func of funcs) {
  for (const [nodes, k, expected] of data) {
    const lists = func(arrayToLinkedList(nodes), k)
    const arrays = []
    for (const list of lists) {
      arrays.push(linkedListToArray(list))
    }
    console.log(arraysEqual(arrays, expected))
  }
}
