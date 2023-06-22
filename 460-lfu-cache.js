/*
Design and implement a data structure for a Least Frequently Used (LFU) cache.

Implement the LFUCache class:

LFUCache(int capacity) Initializes the object with the capacity of the data structure.
int get(int key) Gets the value of the key if the key exists in the cache. Otherwise, returns -1.
void put(int key, int value) Update the value of the key if present, or inserts the key if not already present. When the cache reaches its capacity, it should invalidate and remove the least frequently used key before inserting a new item. For this problem, when there is a tie (i.e., two or more keys with the same frequency), the least recently used key would be invalidated.
To determine the least frequently used key, a use counter is maintained for each key in the cache. The key with the smallest use counter is the least frequently used key.

When a key is first inserted into the cache, its use counter is set to 1 (due to the put operation). The use counter for a key in the cache is incremented either a get or put operation is called on it.

The functions get and put must each run in O(1) average time complexity.

Constraints:
  0 <= capacity <= 10^4
  0 <= key <= 10^5
  0 <= value <= 10^9
  At most 2 * 10^5 calls will be made to get and put.
*/

class LFUCache {
  constructor(capacity) {
    this.cache = new Map()
    this.freqs = new Map()
    this.minFreq = 0
    this.capacity = capacity
  }

  _insert = (key, value, freq) => {
    this.cache.set(key, [value, freq])
    if (!this.freqs.has(freq)) this.freqs.set(freq, new Set())
    this.freqs.set(freq, this.freqs.get(freq).add(key))
  }

  get = (key) => {
    if (!this.cache.has(key)) return -1
    const [value, freq] = this.cache.get(key)

    const keys = this.freqs.get(freq)
    keys.delete(key)
    if (this.minFreq === freq && keys.size === 0) this.minFreq++

    this._insert(key, value, freq + 1)
    return value
  }

  put(key, value) {
    if (this.capacity <= 0) return

    if (this.cache.has(key)) {
      const [, freq] = this.cache.get(key)
      this.cache.set(key, [value, freq])
      this.get(key)
      return
    }

    if (this.capacity === this.cache.size) {
      const keys = this.freqs.get(this.minFreq)
      const keyToDelete = [...keys].shift()
      keys.delete(keyToDelete)
      this.cache.delete(keyToDelete)
    }
    this._insert(key, value, 1)
    this.minFreq = 1
  }
}

// cnt(x) = the use counter for key x
// cache=[] will show the last used order for tiebreakers (leftmost element is  most recent)
const lfu = new LFUCache(2)
lfu.put(1, 1) // cache=[1,_], cnt(1)=1
lfu.put(2, 2) // cache=[2,1], cnt(2)=1, cnt(1)=1
console.log(lfu.get(1)) // return 1
// cache=[1,2], cnt(2)=1, cnt(1)=2
lfu.put(3, 3) // 2 is the LFU key because cnt(2)=1 is the smallest, invalidate 2.
// cache=[3,1], cnt(3)=1, cnt(1)=2
console.log(lfu.get(2)) // return -1 (not found)
console.log(lfu.get(3)) // return 3
// cache=[3,1], cnt(3)=2, cnt(1)=2
lfu.put(4, 4) // Both 1 and 3 have the same cnt, but 1 is LRU, invalidate 1.
// cache=[4,3], cnt(4)=1, cnt(3)=2
console.log(lfu.get(1)) // return -1 (not found)
console.log(lfu.get(3)) // return 3
// cache=[3,4], cnt(4)=1, cnt(3)=3
console.log(lfu.get(4)) // return 4
// cache=[4,3], cnt(4)=2, cnt(3)=3
