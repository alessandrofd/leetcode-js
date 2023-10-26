/**
 * @param {number[]} arr
 * @return {number}
 */
const numFactoredBinaryTrees = (arr) => {
  const n = arr.length
  const MOD = 1e9 + 7

  arr.sort((a, b) => a - b)
  const treesByRoot = new Map()

  let result = 0

  for (let i = 0; i < n; i++) {
    const root = arr[i]
    const lim = Math.sqrt(root)

    let trees = 1
    for (let j = 0; arr[j] <= lim; j++) {
      const left = arr[j]
      const right = root / arr[j]
      if (treesByRoot.has(right)) {
        trees =
          (trees +
            treesByRoot.get(left) *
              treesByRoot.get(right) *
              (left === right ? 1 : 2)) %
          MOD
      }
    }
    treesByRoot.set(root, trees)
    result = (result + trees) % MOD
  }

  return result
}

// prettier-ignore
const funcs = [
  numFactoredBinaryTrees
]

const data = [
  [[2, 4], 3],
  [[2, 4, 5, 10], 7],
]

for (const func of funcs) {
  for (const [arr, expected] of data) {
    console.log(func(arr) === expected)
  }
}
