/**
 * Given the head of a linked list, remove the nth node from the end of the list
 * and return its head.]
 *
 * Constraints:
 *    The number of nodes in the list is sz.
 *    1 <= sz <= 30
 *    0 <= Node.val <= 100
 *    1 <= n <= sz
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
 * @param {number} n
 * @return {ListNode}
 */
const removeNthFromEnd = (head, n) => {
  let curr = head
  let prev = head
  let count = 0
  while (curr) {
    curr = curr.next
    if (count > n) prev = prev.next
    count++
  }
  if (count === n) return head.next
  prev.next = prev.next?.next
  return head
}

head = [1, 2, 3, 4, 5]
n = 2
// Output: [1,2,3,5]

// head = [1]
// n = 1
// Output: []

// head = [1, 2]
// n = 1
// Output: [1]

// head = [1, 2]
// n = 2

console.log(destroyList(removeNthFromEnd(buildList(head), n)))
