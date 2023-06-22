/**
 * You are given two 0-indexed arrays nums and cost consisting each of n
 * positive integers.
 *
 * You can do the following operation any number of times:
 *
 *    Increase or decrease any element of the array nums by 1.
 *
 * The cost of doing one operation on the ith element is cost[i].
 *
 * Return the minimum total cost such that all the elements of the array nums
 * become equal.
 *
 * Constraints:
 *    n == nums.length == cost.length
 *    1 <= n <= 10^5
 *    1 <= nums[i], cost[i] <= 10^6
 */

/**
 * @param {number[]} nums
 * @param {number[]} cost
 * @return {number}
 */
const minCost_prefix = (nums, cost) => {
  const n = nums.length
  const numAndCost = nums.map((n, i) => [n, cost[i]]).sort(([a], [b]) => a - b)
  const prefixSum = numAndCost.map(((sum = 0), ([, n]) => (sum += n)))
  prefixSum

  let initialCost = 0
  for (let i = 1; i < n; i++) {
    initialCost += (numAndCost[i][0] - numAndCost[0][0]) * numAndCost[i][1]
  }

  let minCost = initialCost
  let prevCost = initialCost
  for (let i = 1; i < n; i++) {
    const diff = numAndCost[i][0] - numAndCost[i - 1][0]
    const cost =
      prevCost +
      diff * prefixSum[i - 1] -
      diff * (prefixSum[n - 1] - prefixSum[i - 1])
    minCost = Math.min(minCost, cost)
    prevCost = cost
  }

  return minCost
}

/**
 * @param {number[]} nums
 * @param {number[]} cost
 * @return {number}
 */
const minCost_binSearch = (nums, cost) => {
  const n = nums.length

  const getCost = (base) => {
    let result = 0
    for (i = 0; i < n; i++) {
      result += Math.abs(nums[i] - base) * cost[i]
    }
    return result
  }

  let lo = Math.min(...nums)
  let hi = Math.max(...nums)
  while (lo < hi) {
    const mid = Math.floor((lo + hi) / 2)
    if (getCost(mid) > getCost(mid + 1)) lo = mid + 1
    else hi = mid
  }

  return getCost(lo)
}

/**
 * @param {number[]} nums
 * @param {number[]} cost
 * @return {number}
 */
const minCost_weightedMedian = (nums, cost) => {
  const numsAndCost = nums.map((n, i) => [n, cost[i]]).sort(([a], [b]) => a - b)
  medianCost = cost.reduce((acc, n) => (acc += n)) / 2
  let accCost = 0
  for (const [n, c] of numsAndCost) {
    accCost += c
    if (accCost >= medianCost) {
      const base = n
      return numsAndCost.reduce(
        (acc, [n, c]) => acc + Math.abs(n - base) * c,
        (acc = 0)
      )
    }
  }
}

nums = [1, 3, 5, 2]
cost = [2, 3, 1, 14]
// Expected: 8

nums = [2, 2, 2, 2, 2]
cost = [4, 2, 8, 1, 3]
// Expected: 0

console.log(minCost_prefix(nums, cost))
console.log(minCost_binSearch(nums, cost))
console.log(minCost_weightedMedian(nums, cost))
