/**
 * @param {string} s
 * @param {number} k
 * @return {boolean}
 */

// Approach 1: Set

// const hasAllCodes = (s, k) => {
//   let needs = 1 << k
//   const set = new Set()

//   for (let i = k; i <= s.length; i++ ) {
//     const ss = s.substring(i - k, i)
//     if (!set.has(ss)) {
//       set.add(ss)
//       needs--
//       if (needs === 0) return true
//     }
//   }
//   return false
// }

// Approach 2: Hash

const hasAllCodes = (s, k) => {
  let needs = 1 << k
  const allOne = needs - 1
  const got = new Array(needs).fill(false)
  let hashVal = 0

  for (let i = 0; i < s.length; i++) {
    hashVal = ((hashVal << 1) & allOne) | (s.charCodeAt(i) - '0'.charCodeAt(0))
    if (i >= k - 1 && !got[hashVal]) {
      got[hashVal] = true
      needs--
      if (needs === 0) return true
    }
  }
  return false
}

// let s = '00110110'
// let k = 2
// Output: true

let s = '0110'
let k = 1
// Output: true

// let s = '0110'
// let k = 2
// Output: false

console.log(hasAllCodes(s, k))
