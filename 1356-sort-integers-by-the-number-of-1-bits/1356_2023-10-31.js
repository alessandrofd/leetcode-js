import _ from 'lodash'

/**
 * @param {number[]} arr
 * @return {number[]}
 */
const sortByBits_bit_manipulation = (arr) => {
  const memo = new Map()

  const findWeight = (num) => {
    if (memo.has(num)) return memo.get(num)

    const original = num
    let mask = 1
    let weight = 0

    while (num > 0) {
      if (num & mask) {
        weight += 1
        num ^= mask
      }
      mask <<= 1
    }

    memo.set(original, weight)
    return weight
  }

  return arr.sort((a, b) => findWeight(a) - findWeight(b) || a - b)
}

/**
 * @param {number[]} arr
 * @return {number[]}
 */
const sortByBits_kerningham = (arr) => {
  const findWeight = (num) => {
    let weight = 0
    while (num > 0) {
      weight += 1
      num &= num - 1
    }
    return weight
  }

  return arr.sort((a, b) => findWeight(a) - findWeight(b) || a - b)
}

// prettier-ignore
const funcs = [
  sortByBits_bit_manipulation,
  sortByBits_kerningham,
]

const data = [
  [
    [0, 1, 2, 3, 4, 5, 6, 7, 8],
    [0, 1, 2, 4, 8, 3, 5, 6, 7],
  ],
  [
    [1024, 512, 256, 128, 64, 32, 16, 8, 4, 2, 1, 0],
    [0, 1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024],
  ],
]

for (const func of funcs) {
  for (const [arr, expected] of data) {
    console.log(_.isEqual(func(arr), expected))
  }
}
