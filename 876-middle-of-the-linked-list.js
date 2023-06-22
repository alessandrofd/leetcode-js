/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
const middleNode1 = (head) => {
  const arr = []
  for (; head; head = head.next) arr.push(head)
  return arr[Math.ceil((arr.length - 1) / 2)]
}

const middleNode = (head) => {
  let walk = head,
    run = head
  while (run?.next) {
    run = run.next.next
    walk = walk.next
  }
  return walk
}

function ListNode(val, next) {
  this.val = val === undefined ? 0 : val
  this.next = next === undefined ? null : next
}

const linkedList = (arr) =>
  arr.reduceRight((next, val) => new ListNode(val, next), null)

// Input: head = [1, 2, 3, 4, 5]
// Output: [3, 4, 5]
console.log(middleNode(linkedList([1, 2, 3, 4, 5])))

// Input: head = [1, 2, 3, 4, 5, 6]
// Output: [4, 5, 6]
console.log(middleNode(linkedList([1, 2, 3, 4, 5, 6])))
