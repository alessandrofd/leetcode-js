/**
 * Given the head of a singly linked list, return true if it is a palindrome.
 */

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {boolean}
 */
// Approach 1: Copy into Array List and then Use Two Pointer Technique
const isPalindrome_1 = (head) => {
  const vals = []
  while (head) {
    vals.push(head.val)
    head = head.next
  }

  let front = 0
  let back = vals.length - 1
  while (front < back) {
    if (vals[front] !== vals[back]) return false
    front++
    back++
  }
  return true
}

// Approach 2: Recursive (Advanced)
const isPalindrome_2 = (head) => {
  let front = head
  const recurse = (back) => {
    if (back) {
      if (!recurse(back.next)) return false
      if (front.val !== back.val) return false
      front = front.next
    }
    return true
  }

  return recurse(head)
}

// Approach 3: Reverse Second Half In-place
const isPalindrome = (head) => {
  const reverseList = (head) => {
    let prev = null
    let curr = head
    while (curr) {
      const tmp = curr.next
      curr.next = prev
      prev = curr
      curr = tmp
    }
    return prev
  }

  const firstHalf = (head) => {
    let fast = head
    let slow = head
    while (fast.next && fast.next.next) {
      console.log(fast.val, slow.val)
      fast = fast.next.next
      slow = slow.next
    }
    return slow
  }

  if (!head) return true

  let front = head
  let back = reverseList(firstHalf(head).next)
  while (back) {
    if (front.val !== back.val) return false
    front = front.next
    back = back.next
  }
  return true
}
