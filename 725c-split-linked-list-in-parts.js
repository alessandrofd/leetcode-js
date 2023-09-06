/**
 * Given the head of a singly linked list and an integer k, split the linked
 * list into k consecutive linked list parts.
 *
 * The length of each part should be as equal as possible: no two parts should
 * have a size differing by more than one. This may lead to some parts being
 * null.
 *
 * The parts should be in the order of occurrence in the input list, and parts
 * occurring earlier should always have a size greater than or equal to parts
 * occurring later.
 *
 * Return an array of the k parts.
 *
 * Constraints:
 *    The number of nodes in the list is in the range [0, 1000].
 *    0 <= Node.val <= 1000
 *    1 <= k <= 50
 */

class ListNode {
  constructor(val, next) {
    this.val = val === undefined ? 0 : val
    this.next = next === undefined ? null : next
  }
}

const arrayToLinkedList = (arr) =>
  arr.reduceRight((next, val) => new ListNode(val, next), null)

const linkedListToArray = (node) => {
  const arr = []
  while (node) {
    arr.push(node.val)
    node = node.next
  }
  return arr
}

const arraysEqual = (a, b) => {
  /*
        Array-aware equality checker:
        Returns whether arguments a and b are == to each other;
        however if they are equal-lengthed arrays, returns whether their 
        elements are pairwise == to each other recursively under this
        definition.
    */
  if (a instanceof Array && b instanceof Array) {
    if (a.length != b.length)
      // assert same length
      return false
    for (let i = 0; i < a.length; i++)
      if (!arraysEqual(a[i], b[i])) return false
    return true
  } else {
    return a == b // if not both arrays, should be the same
  }
}

/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode[]}
 */
const splitListToParts = (head, k) => {}

// prettier-ignore
const funcs = [
  splitListToParts,
]

// prettier-ignore
const data = [
  [ [1, 2, 3], 
    5, 
    [[1], [2], [3], [], []] 
  ],
  [ 
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 
    3, 
    [ [1, 2, 3, 4], [5, 6, 7], [8, 9, 10], ] 
  ],
]

for (const func of funcs) {
  for (const [nodes, k, expected] of data) {
    const lists = func(arrayToLinkedList(nodes), k)
    const arrays = []
    for (const list of lists) {
      arrays.push(linkedListToArray(list))
    }
    console.log(arraysEqual(arrays, expected))
  }
}
