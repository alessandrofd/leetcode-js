/**
 * Given the head of a linked list and a value x, partition it such that all
 * nodes less than x come before nodes greater than or equal to x.
 *
 * You should preserve the original relative order of the nodes in each of the
 * two partitions.
 *
 * Constraints:
 *    The number of nodes in the list is in the range [0, 200].
 *    -100 <= Node.val <= 100
 *    -200 <= x <= 200
 */

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

// Cria duas listas e as junta no final

/**
 * @param {ListNode} head
 * @param {number} x
 * @return {ListNode}
 */
const partition = (head, x) => {
  const lessHead = new ListNode()
  const greaterHead = new ListNode()

  let less = lessHead
  let greater = greaterHead
  while (head) {
    if (head.val < x) {
      less.next = head
      less = head
    } else {
      greater.next = head
      greater = head
    }
    head = head.next
  }

  less.next = greaterHead.next
  greater.next = null

  return lessHead.next
}

arr = [1, 4, 3, 2, 5, 2]
x = 3
// Expected: [1,2,2,4,3,5]

// arr = [2, 1]
// x = 2
// Expected: [1,2]

const head = buildLinkedList(arr)
arr = destroyLinkedList(partition(head, x))
console.log(arr)
