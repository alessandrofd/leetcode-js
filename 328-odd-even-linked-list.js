/**
 * Given the head of a singly linked list, group all the nodes with odd indices
 * together followed by the nodes with even indices, and return the reordered
 * list.
 *
 * The first node is considered odd, and the second node is even, and so on.
 *
 * Note that the relative order inside both the even and odd groups should
 * remain as it was in the input.
 *
 * You must solve the problem in O(1) extra space complexity and O(n) time
 * complexity.
 *
 * Constraints:
 *    The number of nodes in the linked list is in the range [0, 10^4].
 *    -10^6 <= Node.val <= 10^6
 */

class ListNode {
  constructor(val = 0, next = null) {
    this.val = val
    this.next = next
  }
}

const array2List = (arr) =>
  arr.reduceRight((previous, val) => new ListNode(val, previous), null)

const list2Array = (list, arr = []) => {
  if (list === null) return arr
  arr.push(list.val)
  return list2Array(list.next, arr)
}

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
const oddEvenList = (head) => {
  if (!head) return null

  let odd = head
  let headEven = head.next
  let even = head.next

  while (even?.next) {
    odd.next = even.next
    odd = odd.next
    even.next = odd.next
    even = even.next
  }
  odd.next = headEven
  return head
}

head = [1, 2, 3, 4, 5]
// Output: [1, 3, 5, 2, 4]

// head = [2, 1, 3, 5, 6, 4, 7]
// Output: [2, 3, 6, 7, 1, 5, 4]

list2Array(oddEvenList(array2List(head))) //?
