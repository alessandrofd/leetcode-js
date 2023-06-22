/**
 * // Definition for a Node.
 * function Node(val, next, random) {
 *    this.val = val;
 *    this.next = next;
 *    this.random = random;
 * };
 */

function Node(val = 0, next = null, random = null) {
  this.val = val
  this.next = next
  this.random = random
}

const linkedList = (arr) => {
  const head = arr.reduceRight((next, [val]) => new Node(val, next), null)

  for (let i = 0, current = head; i < arr.length; i++, current = current.next) {
    const [_, random] = arr[i]
    if (random !== null) {
      let node = head
      for (let j = 0; j < random; j++) node = node.next
      current.random = node
    }
  }
  return head
}

const array = (list, arr = []) => {
  if (list === null) return arr
  arr.push([list.val, list.random?.val ?? null])
  return array(list.next, arr)
}

/**
 * @param {Node} head
 * @return {Node}
 */

const copyRandomList = (head) => {
  if (head === null) return null

  const map = new Map()
  let copy = null,
    previous = null

  for (current = head; current !== null; current = current.next) {
    const next = new Node(current.val, null, current.random)
    map.set(current, next)
    if (previous === null) copy = previous = next
    else previous = previous.next = next
  }

  for (current = copy; current != null; current = current.next) {
    if (current.random !== null) current.random = map.get(current.random)
  }

  return copy
}

/*
Input: head = [[7,null],[13,0],[11,4],[10,2],[1,0]]
Output: [[7,null],[13,0],[11,4],[10,2],[1,0]]
*/

console.log(
  array(
    copyRandomList(
      linkedList([
        [7, null],
        [13, 0],
        [11, 4],
        [10, 2],
        [1, 0],
      ])
    )
  )
)
