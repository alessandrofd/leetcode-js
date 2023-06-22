/**
 * In a linked list of size n, where n is even, the ith node (0-indexed) of the
 * linked list is known as the twin of the (n-1-i)th node,
 * if 0 <= i <= (n / 2) - 1.
 *
 *    For example, if n = 4, then node 0 is the twin of node 3, and node 1 is
 *    the twin of node 2. These are the only nodes with twins for n = 4.
 *
 * The twin sum is defined as the sum of a node and its twin.
 *
 * Given the head of a linked list with even length, return the maximum twin
 * sum of the linked list.
 *
 * Constraints:
 *    The number of nodes in the list is an even integer in the range [2, 105].
 *    1 <= Node.val <= 10^5
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

/**
 * Dois ponteiros, um rápido e outro lento, para separar as metades da lista.
 * Invertemos a primeira metade da lista ao mesmo tempo que a percorremos com os
 * dois ponteiros e somamos os nós ao percorrer simultaneamente as duas metades
 */

/**
 * @param {ListNode} head
 * @return {number}
 */
const pairSum_2pointers = (head) => {}

/**
 * @param {ListNode} head
 * @return {number}
 */
const pairSum_arr = (head) => {}

arr = [5, 4, 2, 1]
// Expected: 6

arr = [4, 2, 2, 3]
// Expected: 7

arr = [1, 100000]
// Expected: 100001

const head = buildLinkedList(arr)
console.log(pairSum_2pointers(head))
