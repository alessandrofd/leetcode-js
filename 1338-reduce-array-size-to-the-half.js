/**
 * You are given an integer array arr. You can choose a set of integers and
 * remove all the occurrences of these integers in the array.
 *
 * Return the minimum size of the set so that at least half of the integers of
 * the array are removed.
 */

/**
 * @param {number[]} arr
 * @return {number}
 */
// Approach 1: Sorting
var minSetSize_1 = function (arr) {
  arr.sort((a, b) => a - b)

  const counts = []
  let currentRun = 1
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] === arr[i - 1]) {
      currentRun++
      continue
    }
    counts.push(currentRun)
    currentRun = 1
  }
  counts.push(currentRun)

  counts.sort((a, b) => b - a)

  let numbersRemoved = 0
  let setSize = 0
  for (const count of counts) {
    numbersRemoved += count
    setSize++
    if (numbersRemoved >= arr.length / 2) return setSize
  }
}

// Approach 2: Hashing/ Counting
const minSetSize_2 = (arr) => {
  const map = new Map()
  for (const num of arr) map.set(num, (map.get(num) ?? 0) + 1)
  const counts = Array.from(map.values())
  counts.sort((a, b) => b - a)

  let numbersRemoved = 0
  let setSize = 0
  for (const count of counts) {
    numbersRemoved += count
    setSize++
    if (numbersRemoved >= arr.length / 2) return setSize
  }
}

// Approach 3: Hashing and Bucket Sort
const minSetSize = (arr) => {
  const counts = new Map()
  let maxCount = 0
  for (const num of arr) {
    const count = (counts.get(num) ?? 0) + 1
    counts.set(num, count)
    maxCount = Math.max(maxCount, count)
  }

  // put the counts into buckets
  const buckets = new Array(maxCount + 1).fill(0)
  for (const count of counts.values()) buckets[count]++

  // determine setSize
  let setSize = 0
  let numbersToRemove = arr.length / 2
  let bucket = maxCount
  while (numbersToRemove > 0) {
    const neededFromBucket = Math.ceil(numbersToRemove / bucket)
    const setSizeIncrease = Math.min(buckets[bucket], neededFromBucket)
    setSize += setSizeIncrease
    numbersToRemove -= setSizeIncrease * bucket
    bucket--
  }
  return setSize
}

arr = [3, 3, 3, 3, 5, 5, 5, 2, 2, 7]
// Output: 2

arr = [7, 7, 7, 7, 7, 7]
// Output: 1

console.log(minSetSize(arr))
