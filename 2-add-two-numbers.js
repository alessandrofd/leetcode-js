/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */

function ListNode(val = 0, next = null) {
  this.val = val
  this.next = next
}

const linkedList = (arr) =>
  arr.reduceRight((next, val) => new ListNode(val, next), null)

const array = (list, arr = []) => {
  if (list === null) return arr
  arr.push(list.val)
  return array(list.next, arr)
}

const addTwoNumbers = (l1, l2, carry = 0) => {
  if (l1 === null && l2 === null && carry == 0) return null
  const sum = (l1?.val ?? 0) + (l2?.val ?? 0) + carry
  return new ListNode(
    sum % 10,
    addTwoNumbers(l1?.next ?? null, l2?.next ?? null, sum > 9 ? 1 : 0)
  )
}

console.log(array(addTwoNumbers(linkedList([2, 4, 3]), linkedList([5, 6, 4]))))
console.log(array(addTwoNumbers(linkedList([0]), linkedList([0]))))
console.log(
  array(
    addTwoNumbers(linkedList([9, 9, 9, 9, 9, 9, 9]), linkedList([9, 9, 9, 9]))
  )
)
