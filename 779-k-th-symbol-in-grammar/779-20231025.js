/**
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
const kthGrammar_bin_search = (n, k) => {
  const dfs = (n, k, root) => {
    if (n === 1) return root

    const totalNodes = 2 ** (n - 1)
    if (k <= totalNodes / 2) {
      root = root === 0 ? 0 : 1
    } else {
      root = root === 0 ? 1 : 0
      k -= totalNodes / 2
    }

    return dfs(n - 1, k, root)
  }

  return dfs(n, k, 0)
}

/**
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
const kthGrammar_recursion = (n, k) => {
  const recurse = (n, k) => {
    if (n === 1) return 0

    const mid = 2 ** (n - 1) / 2
    if (k > mid) {
      return 1 - recurse(n, k - mid)
    } else {
      return recurse(n - 1, k)
    }
  }

  return recurse(n, k)
}

/**
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
const kthGrammar_iteration = (n, k) => {
  if (n === 1) return 0

  let symbol = 1

  for (let row = n; row > 1; row--) {
    const mid = 2 ** (row - 1) / 2
    if (k > mid) {
      symbol = 1 - symbol
      k -= mid
    }
  }

  return symbol === 0 ? 1 : 0
}

/**
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
const kthGrammar_math = (n, k) => {
  const countSetBits = (x) => {
    let count
    for (count = 0; x; count++) x &= x - 1 // clear the least significant bit
    return count
  }

  return countSetBits(k - 1) % 2 ? 1 : 0
}

/**
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
const kthGrammar_doubling = (n, k) => {
  if (k === 1) return 0

  if (k % 2) return kthGrammar_doubling(n - 1, (k + 1) / 2)

  return 1 - kthGrammar_doubling(n - 1, k / 2)
}

// prettier-ignore
const funcs = [
  // kthGrammar_bin_search,
  // kthGrammar_recursion,
  // kthGrammar_iteration,
  kthGrammar_math,
  kthGrammar_doubling,
]

const data = [
  [1, 1, 0],
  [2, 1, 0],
  [2, 2, 1],
]

for (const func of funcs) {
  for (const [n, k, expected] of data) {
    console.log(func(n, k) === expected)
  }
}
