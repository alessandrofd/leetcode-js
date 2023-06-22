/**
 * Given two integer arrays arr1 and arr2, return the minimum number of
 * operations (possibly zero) needed to make arr1 strictly increasing.
 *
 * In one operation, you can choose two indices 0 <= i < arr1.length and
 * 0 <= j < arr2.length and do the assignment arr1[i] = arr2[j].
 *
 * If there is no way to make arr1 strictly increasing, return -1.
 *
 * Constraints:
 *    1 <= arr1.length, arr2.length <= 2000
 *    0 <= arr1[i], arr2[i] <= 10^9
 */

/**
 * @param {number[]} arr1
 * @param {number[]} arr2
 * @return {number}
 */
var makeArrayIncreasing_DP_TopDown = function (arr1, arr2) {
  arr2 = [...arr2].sort((a, b) => a - b)

  const dp = new Array(arr1.length).fill().map((_) => [])

  const binSearch = (target) => {
    let lo = 0
    let hi = arr2.length
    while (lo < hi) {
      const mid = Math.floor((lo + hi) / 2)
      if (arr2[mid] <= target) lo = mid + 1
      else hi = mid
    }
    return lo
  }

  const dfs = (i, prev) => {
    if (i == arr1.length) return 0
    if (dp[i][prev] !== undefined) return dp[i][prev]

    let cost = Infinity

    if (arr1[i] > prev) cost = dfs(i + 1, arr1[i])

    const replacement = binSearch(prev)
    if (replacement < arr2.length)
      cost = Math.min(cost, 1 + dfs(i + 1, arr2[replacement]))

    return (dp[i][prev] = cost)
  }

  const result = dfs(0, -1)
  return result === Infinity ? -1 : result
}

var makeArrayIncreasing_DP_BottomUp = function (arr1, arr2) {
  arr2 = [...new Set(arr2)].sort((a, b) => a - b)

  const binSearch = (target) => {
    let lo = 0
    let hi = arr2.length
    while (lo < hi) {
      const mid = Math.floor((lo + hi) / 2)
      if (arr2[mid] <= target) lo = mid + 1
      else hi = mid
    }
    return lo
  }

  let dp = new Map([[-1, 0]])

  for (let i = 0; i < arr1.length; i++) {
    const newDP = new Map()
    for (const [prev, cost] of dp) {
      if (arr1[i] > prev)
        newDP.set(arr1[i], Math.min(newDP.get(arr1[i]) ?? Infinity, cost))

      const j = binSearch(prev)
      if (j < arr2.length) {
        newDP.set(arr2[j], Math.min(newDP.get(arr2[j]) ?? Infinity, cost + 1))
      }
    }
    dp = newDP
  }

  return dp.size === 0 ? -1 : Math.min(...dp.values())
}

arr1 = [1, 5, 3, 6, 7]
arr2 = [1, 3, 2, 4]
// Expected: 1

arr1 = [1, 5, 3, 6, 7]
arr2 = [4, 3, 1]
// Expected: 2

arr1 = [1, 5, 3, 6, 7]
arr2 = [1, 6, 3, 3]
// Expected: -1

arr1 = [5, 16, 19, 2, 1, 12, 7, 14, 5, 16]
arr2 = [6, 17, 4, 3, 6, 13, 4, 3, 18, 17, 16, 7, 14, 1, 16]
// Expected: 8

console.log(makeArrayIncreasing_DP_TopDown(arr1, arr2))
console.log(makeArrayIncreasing_DP_BottomUp(arr1, arr2))
