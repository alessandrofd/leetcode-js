/**
 * Given a singly linked list, return a random node's value from the linked list.
 * Each node must have the same probability of being chosen.
 *
 * Implement the Solution class:
 *
 *    Solution(ListNode head) Initializes the object with the head of the
 *    singly-linked list head.
 *
 *    int getRandom() Chooses a node randomly from the list and returns
 *    its value. All the nodes of the list should be equally likely to be chosen.
 *
 * Constraints:
 *
 *    The number of nodes in the linked list will be in the range [1, 10^4].
 *    -10^4 <= Node.val <= 10^4
 *    At most 10^4 calls will be made to getRandom.
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

class Solution {
  constructor(head) {
    this.nodes = []
    let node = head
    while (node) {
      this.nodes.push(node)
      node = node.next
    }
  }

  getRandom() {
    const index = Math.floor(Math.random() * this.nodes.length)
    return this.nodes[index].val
  }
}

/**
 * Your Solution object will be instantiated and called as such:
 * var obj = new Solution(head)
 * var param_1 = obj.getRandom()
 */

const head = buildLinkedList([1, 2, 3])
const s = new Solution(head)
console.log(s.getRandom())
console.log(s.getRandom())
console.log(s.getRandom())
console.log(s.getRandom())
console.log(s.getRandom())
console.log(s.getRandom())
console.log(s.getRandom())
