/**
 * You are given two non-empty linked lists representing two non-negative
 * integers. The most significant digit comes first and each of their nodes
 * contains a single digit. Add the two numbers and return the sum as
 * a linked list.
 *
 * You may assume the two numbers do not contain any leading zero, except
 * the number 0 itself.
 *
 * Constraints:
 *    The number of nodes in each linked list is in the range [1, 100].
 *    0 <= Node.val <= 9
 *    It is guaranteed that the list represents a number that does not have
 *    leading zeros.
 *
 * Follow up: Could you solve it without reversing the input lists?
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

/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
const addTwoNumbers = (l1, l2) => {}

let arr1 = [7, 2, 4, 3]
let arr2 = [5, 6, 4]
// Expected: [7,8,0,7]

arr1 = [2, 4, 3]
arr2 = [5, 6, 4]
// Expected: [8,0,7]

arr1 = [5]
arr2 = [5]
// Expected: [1, 0]

// arr1 = [0]
// arr2 = [0]
// Expected: [0]

const l1 = buildLinkedList(arr1)
const l2 = buildLinkedList(arr2)
const result = addTwoNumbers(l1, l2)
console.log(destroyLinkedList(result))
