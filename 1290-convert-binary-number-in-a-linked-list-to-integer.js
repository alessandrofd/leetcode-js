/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {number}
 */
const getDecimalValue1 = (head) => {
  const arr = []
  for (; head != null; head = head.next) arr.push(head.val)
  return arr.reduce((acc, val) => acc * 2 + val, 0)
}

const getDecimalValue = (head) => {
  let num = head.val
  for (; head.next; head = head.next) num = (num << 1) | head.next.val
  return num
}

function ListNode(val, next) {
  this.val = val === undefined ? 0 : val
  this.next = next === undefined ? null : next
}

const linkedList = (arr) =>
  arr.reduceRight((next, val) => new ListNode(val, next), null)

// Input: head = [1,0,1]
// Output: 5
console.log(getDecimalValue(linkedList([1, 0, 1])))

// Input: head = [0]
// Output: 0
console.log(getDecimalValue(linkedList([0])))

console.log(
  getDecimalValue(linkedList([1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0]))
)
