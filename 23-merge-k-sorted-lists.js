/**
 * You are given an array of k linked-lists lists, each linked-list is sorted in
 * ascending order.
 *
 * Merge all the linked-lists into one sorted linked-list and return it.
 *
 * Constraints:
 *    k == lists.length
 *    0 <= k <= 10^4
 *    0 <= lists[i].length <= 500
 *    -10^4 <= lists[i][j] <= 10^4
 *    lists[i] is sorted in ascending order.
 *    The sum of lists[i].length will not exceed 10^4.
 */

// Definition for singly-linked list.
class ListNode {
  constructor(val, next) {
    this.val = val === undefined ? 0 : val
    this.next = next === undefined ? null : next
  }
}

const buildLinkedList = (arr) => {
  if (!arr.length) return null

  const head = new ListNode(arr.shift())

  let prev = head
  while (arr.length) {
    const node = new ListNode(arr.shift())
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

// Podemos usar um priority queue para resolver o problema, muito embora a
// estratégia não aproveitará que as listas já estajam ordenadas.

import { MinPriorityQueue } from '@datastructures-js/priority-queue'

/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
const mergeKLists = (lists) => {
  if (!lists || !lists.length) return null

  const queue = new MinPriorityQueue({ priority: (node) => node.val })
  for (let node of lists) {
    while (node) {
      queue.enqueue(node)
      node = node.next
    }
  }

  let dummy = new ListNode()
  let tail = dummy
  while (queue.size()) {
    const node = queue.dequeue().element
    tail.next = node
    tail = node
  }
  tail.next = null

  return dummy.next
}

let arrays = [
  [1, 4, 5],
  [1, 3, 4],
  [2, 6],
]
// Output: [1,1,2,3,4,4,5,6]

arrays = []
// Output: []

arrays = [[]]
// Output: []

arrays = [[-2, -1, -1, -1], []]

const lists = []
for (const arr of arrays) lists.push(buildLinkedList(arr))
console.log(destroyLinkedList(mergeKLists(lists)))
