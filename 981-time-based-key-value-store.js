/**
 * Design a time-based key-value data structure that can store multiple values
 * for the same key at different time stamps and retrieve the key's value at a
 * certain timestamp.
 *
 * Implement the TimeMap class:
 *    TimeMap()
 *    Initializes the object of the data structure.
 *
 *    void set(String key, String value, int timestamp)
 *    Stores the key key with the value value at the given time timestamp.
 *
 *    String get(String key, int timestamp)
 *    Returns a value such that set was called previously, with
 *    timestamp_prev <= timestamp. If there are multiple such values, it returns
 *    the value associated with the largest timestamp_prev. If there are no
 *    values, it returns "".
 *
 * Constraints:
 *    1 <= key.length, value.length <= 100
 *    key and value consist of lowercase English letters and digits.
 *    1 <= timestamp <= 10^7
 *    All the timestamps timestamp of set are strictly increasing.
 *    At most 2 * 10^5 calls will be made to set and get.
 */

class TimeMap_1 {
  constructor() {
    this.map = new Map()
  }
  set = (key, value, timestamp) => {
    if (!this.map.has(key)) this.map.set(key, new Map())
    this.map.get(key)[timestamp] = value
  }

  get = (key, timestamp) => {
    if (!this.map.has(key)) return ''
    const timeMap = this.map.get(key)
    if (timeMap[timestamp]) return timeMap[timestamp]
    while (timestamp-- >= 0) if (timeMap[timestamp]) return timeMap[timestamp]
    return ''
  }
}

class TimeMap_2 {
  constructor() {
    this.map = new Map()
  }
  set = (key, value, timestamp) => {
    if (!this.map.has(key)) this.map.set(key, new Map())
    this.map.get(key).set(timestamp, value)
  }

  get = (key, timestamp) => {
    if (!this.map.has(key)) return ''
    const timeMap = this.map.get(key)
    const timestamps = [...timeMap.keys()]
    let left = 0
    let right = timestamps.length - 1
    while (left <= right) {
      let middle = Math.floor((left + right) / 2)
      if (timestamps[middle] === timestamp)
        return timeMap.get(timestamps[middle])
      else if (timestamps[middle] < timestamp) left = middle + 1
      else right = middle - 1
    }
    return timeMap.get(timestamps[right]) ?? ''
  }
}

class TimeMap {
  constructor() {
    this.map = new Map()
  }

  set = (key, value, timestamp) => {
    if (!this.map.has(key)) this.map.set(key, [[], []])
    const [stamps, values] = this.map.get(key)
    stamps.push(timestamp)
    values.push(value)
  }

  get = (key, timestamp) => {
    if (!this.map.has(key)) return ''
    const [stamps, values] = this.map.get(key)
    let left = 0
    let right = stamps.length - 1
    while (left <= right) {
      let middle = Math.floor((left + right) / 2)
      if (stamps[middle] === timestamp) return values[middle]
      else if (stamps[middle] < timestamp) left = middle + 1
      else right = middle - 1
    }
    return values[right] ?? ''
  }
}

const timeMap = new TimeMap()
timeMap.set('foo', 'bar', 1) // store the key "foo" and value "bar" along with timestamp = 1.
timeMap.get('foo', 1) // return "bar"
timeMap.get('foo', 3) // return "bar"
timeMap.set('foo', 'bar2', 4) // store the key "foo" and value "bar2" along with timestamp = 4.
timeMap.get('foo', 4) // return "bar2"
timeMap.get('foo', 5) // return "bar2"

// const timeMap = new TimeMap()
// timeMap.set('love', 'high', 10)
// timeMap.set('love', 'low', 20)
// timeMap.get('love', 5) // ''
// timeMap.get('love', 10) // high
// timeMap.get('love', 15) // high
// timeMap.get('love', 20) // low
// timeMap.get('love', 25) // low
