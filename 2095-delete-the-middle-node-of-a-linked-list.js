/**
 * You are given the head of a linked list. Delete the middle node, and return
 * the head of the modified linked list.
 *
 * The middle node of a linked list of size n is the ⌊n / 2⌋th node from the
 * start using 0-based indexing, where ⌊x⌋ denotes the largest integer less than
 * or equal to x.
 *
 * For n = 1, 2, 3, 4, and 5, the middle nodes are 0, 1, 1, 2, and 2,
 * respectively.
 *
 * Constraints:
 *    The number of nodes in the list is in the range [1, 10^5].
 *    1 <= Node.val <= 10^5
 */

class ListNode {
  constructor(val, next) {
    this.val = val === undefined ? 0 : val
    this.next = next === undefined ? null : next
  }
}

const buildList = (array) => {
  let curr, prev
  for (let i = array.length - 1; i >= 0; i--) {
    prev = curr
    curr = new ListNode(array[i], prev)
  }
  return curr
}

const destroyList = (head) => {
  if (!head) return []

  let node = head
  const array = []
  while (node) {
    array.push(node.val)
    node = node.next
  }
  return array
}

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
const deleteMiddle_2 = (head) => {
  if (!head.next) return null

  let count = 0
  let laggard = head
  let current = head
  while (current) {
    current = current.next
    count++
    if (count != 2 && !(count % 2)) laggard = laggard.next
  }
  laggard.next = laggard.next.next
  return head
}

const deleteMiddle = (head) => {
  if (!head.next) return null

  let fast = head
  let slow = head
  let prev
  while (fast && fast.next) {
    fast = fast.next.next
    prev = slow
    slow = slow.next
  }
  prev.next = slow.next
  return head
}

head = [1, 3, 4, 7, 1, 2, 6]
// Output: [1, 3, 4, 1, 2, 6]

head = [1, 2, 3, 4]
// Output: [1, 2, 4]

head = [2, 1]
// Output: [2]

console.log(destroyList(deleteMiddle(buildList(head))))
