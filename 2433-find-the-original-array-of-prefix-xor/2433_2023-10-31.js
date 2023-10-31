import _ from 'lodash'

const findArray = (pref) => {
  const n = pref.length

  const arr = new Array(n)
  arr[0] = pref[0]

  for (let i = 1; i < n; i++) arr[i] = pref[i] ^ pref[i - 1]

  return arr
}

const findArray_space_optimized = (pref) => {
  const n = pref.length
  for (let i = n - 1; i > 0; i--) {
    pref[i] ^= pref[i - 1]
  }
  return pref
}

// prettier-ignore
const funcs = [
  findArray,
  findArray_space_optimized,
]

// prettier-ignore
const data = [
  [[5,2,0,3,1], [5,7,2,3,2]],
  [[13], [13]],
]

for (const func of funcs) {
  for (const [pref, expected] of data) {
    console.log(_.isEqual(func(pref), expected))
  }
}

console.log(5 ^ 7 ^ 2 ^ 3 ^ 2)
