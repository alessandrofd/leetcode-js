/**
 * @param {ListNode} head
 * @param {number} k
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

const rotateRight = (head, k) => {
  if (head === null) return null

  let tail = head
  let length = 1
  while (tail.next !== null) {
    tail = tail.next
    length++
  }

  if (k % length === 0) return head

  let previous = null,
    current = head
  for (let i = 0; i < length - (k % length); i++) {
    previous = current
    current = current.next
  }

  tail.next = head
  previous.next = null
  head = current

  return head
}

// console.log(array(rotateRight(linkedList([1, 2, 3, 4, 5]), 2)))
// console.log(array(rotateRight(linkedList([0, 1, 2]), 4)))
console.log(array(rotateRight(linkedList([1]), 0)))
