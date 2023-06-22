/**
 * Given an array nums that represents a permutation of integers from 1 to n.
 * We are going to construct a binary search tree (BST) by inserting the
 * elements of nums in order into an initially empty BST. Find the number of
 * different ways to reorder nums so that the constructed BST is identical to
 * that formed from the original array nums.
 *
 * For example, given nums = [2,1,3], we will have 2 as the root, 1 as a left
 * child, and 3 as a right child. The array [2,3,1] also yields the same BST but
 * [3,2,1] yields a different BST.
 *
 * Return the number of ways to reorder nums such that the BST formed is
 * identical to the original BST formed from nums.
 *
 * Since the answer may be very large, return it modulo 10^9 + 7.
 *
 * Constraints:
 *    1 <= nums.length <= 1000
 *    1 <= nums[i] <= nums.length
 *    All integers in nums are distinct.
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
const numOfWays = (nums) => {
  const MOD = BigInt(1e9 + 7)
  const n = nums.length

  // O triângulo de Pascal estoura a memória
  // const triangle = new Array(n).fill().map((_) => new Array(n))
  // for (let i = 0; i < n; i++) {
  //   triangle[i][0] = triangle[i][i] = 1n
  //   for (let j = 1; j < i; j++) {
  //     triangle[i][j] = (triangle[i - 1][j - 1] + triangle[i - 1][j])
  //   }
  // }

  const factCache = new Map()
  const factorial = (n) => {
    if (n < 2) return 1n
    if (factCache.has(n)) return factCache.get(n)
    const result = BigInt(n) * factorial(n - 1n)
    factCache.set(n, result)
    return result
  }

  const permutations = (n, k) => {
    n = BigInt(n)
    k = BigInt(k)
    return factorial(n) / factorial(n - k) / factorial(k)  
  }

  const dfs = (nums) => {
    const n = nums.length
    if (n < 3) return 1n

    const root = nums[0]
    const left = nums.filter((num) => num < root)
    const right = nums.filter((num) => num > root)
    // const permutations = triangle[nums.length - 1][left.length]
    const k = left.length
    return BigInt(permutations(n-1, k) * dfs(left) * dfs(right))
  }

  // Subtrai-se 1 pois o vetor original não faz parte da resposta
  return (dfs(nums) - 1n) % MOD
}

nums = [2, 1, 3]
// Expected: 1

// nums = [3, 4, 5, 1, 2]
// // Expected: 5

// nums = [1, 2, 3]
// Expected: 0

// nums = [
//   10, 23, 12, 18, 4, 29, 2, 8, 41, 31, 25, 21, 14, 35, 26, 5, 19, 43, 22, 37, 9,
//   20, 44, 28, 1, 39, 30, 38, 36, 6, 13, 16, 27, 17, 34, 7, 15, 3, 11, 24, 42,
//   33, 40, 32,
// ]
// Expected: 182440977

console.log(numOfWays(nums))
