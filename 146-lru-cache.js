/**
 * Design a data structure that follows the constraints of a Least Recently Used
 * (LRU) cache.
 *
 * Implement the LRUCache class:
 *
 *    LRUCache(int capacity) Initialize the LRU cache with positive size
 *    capacity.
 *
 *    int get(int key) Return the value of the key if the key exists,
 *    otherwise return -1.
 *
 *    void put(int key, int value) Update the value of the key if the key
 *    exists. Otherwise, add the key-value pair to the cache. If the number of
 *    keys exceeds the capacity from this operation, evict the least recently
 *    used key.
 *
 * The functions get and put must each run in O(1) average time complexity.
 *
 * Constraints:
 *    1 <= capacity <= 3000
 *    0 <= key <= 10^4
 *    0 <= value <= 10^5
 *    At most 2 * 10^5 calls will be made to get and put.
 */

/**
 * @param {number} capacity
 */
class LRUCache {
  constructor(capacity) {
    this.capacity = capacity
    this.cache = new Map()
    this.counter = 0

    this.head = {}
    this.tail = { prev: this.head }
    this.head.next = this.tail
  }

  _pushToHead(key) {
    if (this.counter === this.capacity) this._popFromTail()
    const node = { key, prev: this.head, next: this.head.next }
    node.next.prev = node
    this.head.next = node
    return node
  }

  _popFromTail() {
    const node = this.tail.prev
    node.prev.next = this.tail
    this.tail.prev = node.prev

    this.cache.delete(node.key)
    this.counter -= 1
  }

  _moveToHead(node) {
    node.prev.next = node.next
    node.next.prev = node.prev

    node.prev = this.head
    node.next = this.head.next

    node.next.prev = node
    this.head.next = node
  }

  /**
   * @param {number} key
   * @return {number}
   */
  get(key) {
    if (!this.cache.has(key)) return -1

    const { node, value } = this.cache.get(key)
    this._moveToHead(node)
    return value
  }

  /**
   * @param {number} key
   * @param {number} value
   * @return {void}
   */
  put(key, value) {
    let node
    if (this.cache.has(key)) {
      node = this.cache.get(key).node
      this._moveToHead(node)
    } else {
      node = this._pushToHead(key)
      this.counter += 1
    }
    this.cache.set(key, { node, value })
  }
}

const cache1 = new LRUCache(2)
cache1.put(1, 1)
cache1.put(2, 2)
cache1.get(1) // return 1
cache1.put(3, 3)
cache1.get(2) // returns -1 (not found)
cache1.put(4, 4)
cache1.get(1) // return -1 (not found)
cache1.get(3) // return 3
cache1.get(4) // return 4

const cache2 = new LRUCache(2)
cache2.get(2) // returns -1 (not found)
cache2.put(2, 6)
cache2.get(1) // returns -1 (not found)
cache2.put(1, 5)
cache2.put(1, 2)
cache2.get(1) // return 2
cache2.get(2) // returns 6
