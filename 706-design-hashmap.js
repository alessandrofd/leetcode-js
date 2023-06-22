class Bucket {
  constructor() {
    this.arr = []
  }

  get(key) {
    for (let par of this.arr) {
      if (par.key === key) return par.value
    }
    return -1
  }

  update(key, value) {
    let found = false
    for (let par of this.arr) {
      if (par.key === key) {
        par.value = value
        found = true
      }
    }
    if (!found) {
      this.arr.push({ key, value })
    }
  }

  remove(key) {
    for (let i = 0; i < this.arr.length; i++) {
      if (this.arr[i].key === key) {
        this.arr.splice(i, 1)
        break
      }
    }
  }
}

class MyHashMap {
  constructor() {
    this.keySpace = 2069
    this.map = new Array(this.keySpace).fill().map((_) => new Bucket())
  }

  put(key, value) {
    this.map[key % this.keySpace].update(key, value)
  }

  get(key) {
    return this.map[key % this.keySpace].get(key)
  }

  remove(key) {
    this.map[key % this.keySpace].remove(key)
  }
}

const myHashMap = new MyHashMap()
myHashMap.put(1, 1) // The map is now [[1,1]]
myHashMap.put(2, 2) // The map is now [[1,1], [2,2]]
console.log(myHashMap.get(1)) // return 1, The map is now [[1,1], [2,2]]
console.log(myHashMap.get(3)) // return -1 (i.e., not found), The map is now [[1,1], [2,2]]
myHashMap.put(2, 1) // The map is now [[1,1], [2,1]] (i.e., update the existing value)
console.log(myHashMap.get(2)) // return 1, The map is now [[1,1], [2,1]]
myHashMap.remove(2) // remove the mapping for 2, The map is now [[1,1]]
console.log(myHashMap.get(2))
