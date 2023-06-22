/**
 * Given a linked list, swap every two adjacent nodes and return its head. You
 * must solve the problem without modifying the values in the list's nodes
 * (i.e., only nodes themselves may be changed.)
 *
 * Constraints:
 *    The number of nodes in the list is in the range [0, 100].
 *    0 <= Node.val <= 100
 */

class ListNode {
  constructor(val, next) {
    this.val = val === undefined ? 0 : val
    this.next = next === undefined ? null : next
  }
}

const buildLinkedList = (arr) => {
  if (!arr.length) return null

  const head = new ListNode(arr.shift())
  const indexedNodes = [head]

  let prev = head
  while (arr.length) {
    const node = new ListNode(arr.shift())
    indexedNodes.push(node)
    prev.next = node
    prev = node
  }

  return head
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

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
const swapPairs = (head) => {
  if (!(head && head.next)) return head

  let second = head.next
  head.next = swapPairs(second.next)
  second.next = head
  return second
}

// const swapPairs = (head) => {
//   if (!head) return head

//   const ghost = new ListNode(-1, head)
//   let prev = ghost
//   let first = head
//   while (first && first.next) {
//     let second = first.next
//     first.next = second.next
//     second.next = first
//     prev.next = second
//     prev = first
//     first = first.next
//   }
//   return ghost.next
// }

arr = [1, 2, 3, 4]
// Expected: [2,1,4,3]

// arr = []
// Expected: []

// arr = [1]
// Expected: [1]

const head = buildLinkedList(arr)
console.log(destroyLinkedList(swapPairs(head)))
