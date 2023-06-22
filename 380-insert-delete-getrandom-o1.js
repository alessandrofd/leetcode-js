/**Implement the RandomizedSet class:
 *
 * RandomizedSet() Initializes the RandomizedSet object.
 *
 * bool insert(int val) Inserts an item val into the set if not present. Returns
 * true if the item was not present, false otherwise.
 *
 * bool remove(int val) Removes an item val from the set if present. Returns
 * true if the item was present, false otherwise.
 *
 * int getRandom() Returns a random element from the current set of elements
 * (it's guaranteed that at least one element exists when this method is
 * called). Each element must have the same probability of being returned.
 *
 * You must implement the functions of the class such that each function works
 * in average O(1) time complexity.
 *
 * Constraints:
 *    -2^31 <= val <= 2^31 - 1
 *    At most 2 * 10^5 calls will be made to insert, remove, and getRandom.
 *    There will be at least one element in the data structure when getRandom is
 *    called.
 */

class RandomizedSet_set {
  constructor() {
    this.set = new Set()
  }

  insert = (val) => {
    if (this.set.has(val)) return false
    this.set.add(val)
    return true
  }

  remove = (val) => {
    if (!this.set.has(val)) return false
    this.set.delete(val)
    return true
  }

  getRandom = () => {
    const index = (Math.random() * this.set.size) | 0
    return [...this.set][index]
  }
}

class RandomizedSet {
  constructor() {
    this.map = new Map()
    this.array = []
  }

  insert = (val) => {
    if (this.map.has(val)) return false
    this.array.push(val)
    this.map.set(val, this.array.length - 1)
    return true
  }

  remove = (val) => {
    if (!this.map.has(val)) return false
    const tail = this.array.length - 1
    const target = this.map.get(val)
    if (tail !== target) {
      this.array[target] = this.array[tail]
      this.map.set(this.array[target], target)
    }
    this.array.pop()
    this.map.delete(val)
    return true
  }

  getRandom = () => this.array[(Math.random() * this.array.length) | 0]
}

const randomizedSet = new RandomizedSet()
randomizedSet.insert(1) // Inserts 1 to the set. Returns true as 1 was inserted successfully.
randomizedSet.remove(2) // Returns false as 2 does not exist in the set.
randomizedSet.insert(2) // Inserts 2 to the set, returns true. Set now contains [1,2].
randomizedSet.getRandom() // getRandom() should return either 1 or 2 randomly.
randomizedSet.remove(1) // Removes 1 from the set, returns true. Set now contains [2].
randomizedSet.insert(2) // 2 was already in the set, so return false.
randomizedSet.getRandom() // Since 2 is the only number in the set, getRandom() will always return 2.
