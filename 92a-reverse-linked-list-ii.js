/**
 * Given the head of a singly linked list and two integers left and right where
 * left <= right, reverse the nodes of the list from position left to position
 * right, and return the reversed list.
 *
 * Constraints:
 *    The number of nodes in the list is n.
 *    1 <= n <= 500
 *    -500 <= Node.val <= 500
 *    1 <= left <= right <= n
 */

/**
 * Definition for singly-linked list.
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
 * @param {number} left
 * @param {number} right
 * @return {ListNode}
 */
const reverseBetween = (head, left, right) => {
  const before = new ListNode(-1, head)
  let previous = before

  // Os índices left e right são 1-based
  for (let i = 1; i < left; i++) previous = previous.next

  const first = previous.next
  for (let i = left; i < right; i++) {
    const next = first.next
    first.next = next.next
    next.next = previous.next
    previous.next = next
  }
  return before.next
}

// prettier-ignore
const funcs = [
  reverseBetween,
]

const data = [
  [[1, 2, 3, 4, 5], 2, 4, [1, 4, 3, 2, 5]],
  [[5], 1, 1, [5]],
  [[3, 5], 1, 2, [5, 3]],
]

for (const func of funcs) {
  for (const [nodes, left, right, expected] of data) {
    const head = arrayToLinkedList(nodes)
    const output = linkedListToArray(func(head, left, right))
    console.log(arraysEqual(output, expected))
  }
}
