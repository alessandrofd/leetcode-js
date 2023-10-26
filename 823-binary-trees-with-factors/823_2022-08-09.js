/**
 * Given an array of unique integers, arr, where each integer arr[i] is strictly
 * greater than 1.
 *
 * We make a binary tree using these integers, and each number may be used for
 * any number of times. Each non-leaf node's value should be equal to the
 * product of the values of its children.
 *
 * Return the number of binary trees we can make. The answer may be too large so
 * return the answer modulo 10**9 + 7.
 */

/**
 * @param {number[]} arr
 * @return {number}
 */

// Approach #1: Dynamic Programming [Accepted]
const numFactoredBinaryTrees_1 = (arr) => {
  const MOD = 10 ** 9 + 7
  arr.sort((a, b) => a - b)

  const dp = new Uint32Array(arr.length).fill(1)

  const index = new Map()
  for (let i = 0; i < arr.length; i++) index.set(arr[i], i)

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < i; j++) {
      if (arr[i] % arr[j] === 0) {
        const right = arr[i] / arr[j]
        if (index.has(right))
          dp[i] = (dp[i] + dp[j] * dp[index.get(right)]) % MOD
      }
    }
  }
  return dp.reduce((acc, nxt) => acc + nxt) % MOD
}

// Discussion Board
const numFactoredBinaryTrees = (arr) => {
  const MOD = 10 ** 9 + 7
  arr.sort((a, b) => a - b)
  const map = new Map()
  let result = 0
  for (let i = 0; i < arr.length; i++) {
    const root = arr[i]
    const lim = Math.sqrt(root)
    let ways = 1
    for (let j = 0; arr[j] <= lim; j++) {
      const left = arr[j]
      const right = arr[i] / arr[j]
      if (map.has(right)) {
        ways =
          (ways + map.get(left) * map.get(right) * (left === right ? 1 : 2)) %
          MOD
      }
    }
    map.set(root, ways)
    result = (result + ways) % MOD
  }
  return result
}

// arr = [2, 4] // Output: 3
arr = [2, 4, 5, 10] // Output: 7

console.log(numFactoredBinaryTrees(arr))
