/**
 * @param {number[]} arr
 * @param {number} target
 * @return {number}
 */

// Approach 1: Three Pointer
const threeSumMulti_1 = (arr, target) => {
  const MOD = 1000000007
  let result = 0
  arr.sort((a, b) => a - b)

  for (let i = 0; i < arr.length - 2; i++) {
    let start = i + 1,
      end = arr.length - 1
    while (start < end) {
      const sum = arr[i] + arr[start] + arr[end]
      if (sum < target) start++
      else if (sum > target) end--
      else if (arr[start] != arr[end]) {
        let qttyStart = 1
        while (arr[start] === arr[start + 1]) {
          qttyStart++
          start++
        }
        let qttyEnd = 1
        while (arr[end] === arr[end - 1]) {
          qttyEnd++
          end--
        }
        result += qttyStart * qttyEnd
        result %= 1000000007
        start++
        end--
      } else {
        result += ((end - start + 1) * (end - start)) / 2
        result %= 1000000007
        break
      }
    }
  }

  return result
}

// Approach 2: Counting with Cases
const threeSumMulti_2 = (arr, target) => {
  let result = 0
  const MOD = 1000000007

  const max = Math.max(...arr)
  const count = new Array(max + 1).fill(0)
  arr.forEach((x) => count[x]++)

  // i !== j !== k
  for (let i = 0; i <= max - 2; i++) {
    for (let j = i + 1; j <= max - 1; j++) {
      let k = target - (i + j)
      if (k > j && k <= max) {
        result += count[i] * count[j] * count[k]
        result %= MOD
      }
    }
  }

  // i === j !== k
  for (let i = 0; i <= max - 1; i++) {
    let k = target - 2 * i

    if (k > i && k <= max) {
      result += ((count[i] * (count[i] - 1)) / 2) * count[k]
      result %= MOD
    }
  }

  // i !== j == k

  for (let i = 0; i <= max - 1; i++) {
    if ((target - i) % 2 === 0) {
      let j = (target - i) / 2
      if (j > i && j <= max) {
        result += count[i] * ((count[j] * (count[j] - 1)) / 2)
        result %= MOD
      }
    }
  }

  // i == j == k
  if (target % 3 === 0) {
    let i = target / 3
    if (i <= max) {
      result += (count[i] * (count[i] - 1) * (count[i] - 2)) / 6
      result %= MOD
    }
  }

  return result
}

// Approach 3: Adapt from Three Sum
const threeSumMulti = (arr, target) => {
  let result = 0
  const MOD = 1000000007

  const count = new Map()
  arr.forEach((x) => count.set(x, (count.get(x) ?? 0) + 1))
  const keys = [...count.keys()].sort((a, b) => a - b)
  

  for (let i = 0; i < keys.length; i++) {
    let left = i,
      right = keys.length - 1
    while (left <= right) {
      let sum = keys[i] + keys[left] + keys[right]
      if (sum < target) left++
      else if (sum > target) right--
      else {
        // sum === target
        if (i < left && left < right) {
          result += count.get(keys[i]) * count.get(keys[left]) * count.get(keys[right])
        } else if (i === left && left < right) {
          result += ((count.get(keys[i]) * (count.get(keys[i]) - 1)) / 2) * count.get(keys[right])
        } else if (i < left && left === right) {
          result += (count.get(keys[i]) * count.get(keys[left]) * (count.get(keys[left]) - 1)) / 2
        } else {
          // i === left === right
          result += (count.get(keys[i]) * (count.get(keys[i]) - 1) * (count.get(keys[i]) - 2)) / 6
        }
        result %= MOD
        left++, right--
      }
    }
  }
  return result
}

// Input: arr = [1,1,2,2,3,3,4,4,5,5], target = 8
// Output: 20

console.log(threeSumMulti([1, 1, 2, 2, 3, 3, 4, 4, 5, 5], 8))

// Input: arr = [1,1,2,2,2,2], target = 5
// Output: 12

console.log(threeSumMulti([1, 1, 2, 2, 2, 2], 5))

console.log(threeSumMulti([0, 2, 0], 2))
