/**
 * Given head, the head of a linked list, determine if the linked list has a
 * cycle in it.
 *
 * There is a cycle in a linked list if there is some node in the list that can
 * be reached again by continuously following the next pointer. Internally, pos
 * is used to denote the index of the node that tail's next pointer is connected
 * to. Note that pos is not passed as a parameter.
 *
 * Return true if there is a cycle in the linked list. Otherwise, return false.
 *
 * Constraints:
 *    The number of the nodes in the list is in the range [0, 10^4].
 *    -10^5 <= Node.val <= 10^5
 *    pos is -1 or a valid index in the linked-list.
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

const closeCycle = (head, pos) => {
  let tail = null
  let node = head
  let count = 0
  let insertPoint = null
  while (node) {
    if (count === pos) insertPoint = node
    count += 1
    tail = node
    node = node.next
  }

  tail.next = insertPoint
}

const hasCycle_set = (head) => {
  const set = new Set()
  let node = head
  while (node) {
    if (set.has(node.val)) return true
    set.add(node.val)
    node = node.next
  }
  return false
}

/**
 * @param {ListNode} head
 * @return {boolean}
 */
const hasCycle_floyd = (head) => {
  /**
   * Floyd’s cycle finding algorithm or Hare-Tortoise algorithm is a pointer
   * algorithm that uses only two pointers, moving through the sequence at
   * different speeds. This algorithm is used to find a loop in a linked list.
   * It uses two pointers one moving twice as fast as the other one. The faster
   * one is called the fast pointer and the other one is called the slow pointer.
   *
   * How Does Floyd’s Cycle Finding Algorithm Works?
   *
   * While traversing the linked list one of these things will occur:
   *
   *    The Fast pointer may reach the end (NULL) this shows that there is no
   *    loop in the linked list.
   *
   *    The Fast pointer again catches the slow pointer at some time therefore a
   *    loop exists in the linked list.
   */

  if (!head) return false

  let slow = head
  let fast = head.next
  while (slow !== fast) {
    if (!fast || !fast.next) return false
    slow = slow.next
    fast = fast.next.next
  }
  return true
}

const funcs = [hasCycle_set, hasCycle_floyd]

const data = [
  [[3, 2, 0, -4], 1, true],
  [[1, 2], 0, true],
  [[1], -1, false],
]

for (const [array, pos, expected] of data) {
  const head = buildLinkedList(array)
  if (pos >= 0) closeCycle(head, pos)
  for (const func of funcs) {
    console.log(func(head) === expected)
  }
}
