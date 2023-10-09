/**
 * Given two arrays nums1 and nums2.
 *
 * Return the maximum dot product between non-empty subsequences of nums1 and
 * nums2 with the same length.
 *
 * A subsequence of a array is a new array which is formed from the original
 * array by deleting some (can be none) of the characters without disturbing
 * the relative positions of the remaining characters. (ie, [2,3,5] is a
 * subsequence of [1,2,3,4,5] while [1,5,3] is not).
 *
 * Constraints:
 *    1 <= nums1.length, nums2.length <= 500
 *    -1000 <= nums1[i], nums2[i] <= 1000
 */

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
const maxDotProduct_dp_top_down = (nums1, nums2) => {
  /**
   * Approach 1: Top-Down Dynamic Programming
   *
   * In this problem, we need to make decisions regarding which numbers to
   * multiply with each other. If we use a pair of numbers, we cannot use them
   * anymore in the future. We also must make the operations in a certain order.
   * This is a perfect problem for dynamic programming because every decision we
   * make will affect future decisions.
   *
   * Let's define a function dp(i, j). It will return the maximum dot product
   * possible when considering:
   *
   *    the suffix of nums1 starting at index i.
   *    the suffix of nums2 starting at index j.
   *
   * The base case to this function is when i == nums1.length or
   * j == nums2.length. In this case, one of the arrays has been exhausted and
   * it is impossible to have any dot product. Thus, we will return 0.
   *
   * Now, how do we calculate a given state dp(i, j)? There are 3 options at
   * each state.
   *
   *    1.  We can multiply the numbers at nums[i] and nums[j] together. This
   *        will give us nums1[i] * nums2[j], and then we move to the next
   *        indices. Thus, this option gives us a dot product of
   *        nums1[i] * nums2[j] + dp(i + 1, j + 1).
   *
   *    2.  We can move forward in nums1. This gives us a dot product of
   *        dp(i + 1, j).
   *
   *    3.  We can move forward in nums2. This gives us a dot product of
   *        dp(i, j + 1).
   *
   * We should take the maximum of these three options.
   *
   * This recursive solution will work, but it is inefficient because each call
   * to dp generates 3 more calls to dp, resulting in an exponential time
   * complexity. To solve this, we will use memoization. The first time we
   * calculate a given state (i, j), we will store the result. In the future, we
   * can simply refer to this stored value instead of having to re-calculate the
   * state.
   *
   * We are still missing something! Notice that in the problem description, it
   * states that we must have non-empty subsequences. What would happen if we
   * had an input like this:
   *
   *    nums1 = [-1, -4, -7]
   *    nums2 = [6, 2, 52]
   *
   * When all the elements in nums1 are negative and all the elements in nums2
   * are positive (or vice-versa), and no matter what operation is performed we
   * get a negative value, then we would prefer to not perform any operation and
   * get 0! However, the problem forces us to do at least one operation. We
   * should try to minimize the "damage" (maximize this negative value) by
   * choosing the largest negative value and the smallest positive value (choose
   * the element with the smallest absolute value from each array).
   */

  const arrayMax = (arr) => {
    return arr.reduce(function (p, v) {
      return p > v ? p : v
    })
  }

  const arrayMin = (arr) => {
    return arr.reduce(function (p, v) {
      return p < v ? p : v
    })
  }

  if (arrayMax(nums1) < 0 && arrayMin(nums2) > 0)
    return arrayMax(nums1) * arrayMin(nums2)

  if (arrayMin(nums1) > 0 && arrayMax(nums2) < 0)
    return arrayMin(nums1) * arrayMax(nums2)

  const n = nums1.length
  const m = nums2.length
  const memo = new Array(n).fill().map((_) => new Array(m))

  const dp = (i, j) => {
    if (i === n || j === m) return 0
    if (memo[i][j]) return memo[i][j]

    memo[i][j] = Math.max(
      nums1[i] * nums2[j] + dp(i + 1, j + 1),
      dp(i + 1, j),
      dp(i, j + 1)
    )

    return memo[i][j]
  }

  return dp(0, 0)
}

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
const maxDotProduct_dp_bottom_up = (nums1, nums2) => {
  /**
   * Approach 2: Bottom-Up Dynamic Programming
   *
   * In the previous approach, we used recursion to start at the answer state
   * (0, 0) and we made calls toward the base cases. The same algorithm can be
   * implemented iteratively.
   *
   * In bottom-up, we will start at the base cases and iterate toward the answer
   * state. We do this by using a nested for loop over the state variables. We
   * will start iterating i from the base case (i = nums1.length - 1) and within
   * that loop, we will iterate j starting from nums2.length - 1.
   *
   * Each inner loop iteration represents a state, and we can calculate the
   * state the same way we did in the previous approach. We keep a 2d array
   * called dp. Note that here, dp[i][j] is equal to dp(i, j) from the previous
   * approach.
   *
   * We first consider using both the current numbers, resulting in
   * use = nums1[i] * nums2[j] + dp[i + 1][j + 1]. Then, we consider skipping in
   * both ways, resulting in dp[i + 1][j] and dp[i][j + 1]. We set dp[i][j] to
   * the maximum of these three choices.
   *
   * At the end, we simply return the value in dp[0][0].
   */
  const arrayMax = (arr) => {
    return arr.reduce(function (p, v) {
      return p > v ? p : v
    })
  }

  const arrayMin = (arr) => {
    return arr.reduce(function (p, v) {
      return p < v ? p : v
    })
  }

  if (arrayMax(nums1) < 0 && arrayMin(nums2) > 0)
    return arrayMax(nums1) * arrayMin(nums2)

  if (arrayMin(nums1) > 0 && arrayMax(nums2) < 0)
    return arrayMin(nums1) * arrayMax(nums2)

  const n = nums1.length
  const m = nums2.length
  const dp = new Array(n + 1).fill().map((_) => new Array(m + 1).fill(0))

  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      dp[i][j] = Math.max(
        nums1[i] * nums2[j] + dp[i + 1][j + 1],
        dp[i + 1][j],
        dp[i][j + 1]
      )
    }
  }

  return dp[0][0]
}

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
const maxDotProduct_dp_optimized = (nums1, nums2) => {
  /**
   * Notice that in the previous approach, each outer loop iteration focuses on
   * calculating all values for dp[i]. However, we only rely on the values of
   * dp[i + 1] in this calculation. For example, let's say we have i = 4. We
   * only reference dp[4][...] and dp[5][...], while the values in dp[6], dp[7],
   * dp[8] and so forth, become irrelevant to the current calculation.
   *
   * Thus, we can save some space since we only need the results of the current
   * and previous rows. We will flatten dp so it is a 1d array of length
   * nums2.length + 1. We will also use a similarly sized array prevDp.
   *
   * Here, dp is analogous to dp[i], and prevDp is analogous to dp[i + 1], since
   * prevDp represents the previous row. In each outer loop iteration, we start
   * by resetting dp to a clean state. Then, we calculate dp (like we would
   * calculate dp[i] in the previous approach) using the exact same process.
   *
   * If we use the current numbers, the dot product is nums1[i] * nums2[j] +
   * prevDp[j + 1], since prevDp[j + 1] is analogous to dp[i + 1][j + 1] from
   * the previous approach.
   *
   *    1.  If we move forward in nums1, the dot product is prevDp[j], analogous
   *        to dp[i + 1][j] from the previous approach.
   *
   *    2.  If we move forward in nums2, the dot product is dp[j + 1], analogous
   *        to dp[i][j + 1] from the previous approach.
   *
   * After we finish calculating dp, we set prevDp = dp so that in the next
   * iteration, prevDp correctly represents dp[i + 1].
   */
  const arrayMax = (arr) => {
    return arr.reduce(function (p, v) {
      return p > v ? p : v
    })
  }

  const arrayMin = (arr) => {
    return arr.reduce(function (p, v) {
      return p < v ? p : v
    })
  }

  if (arrayMax(nums1) < 0 && arrayMin(nums2) > 0)
    return arrayMax(nums1) * arrayMin(nums2)

  if (arrayMin(nums1) > 0 && arrayMax(nums2) < 0)
    return arrayMin(nums1) * arrayMax(nums2)

  const n = nums1.length
  const m = nums2.length
  let prevDp = new Array(m + 1).fill(0)

  for (let i = n - 1; i >= 0; i--) {
    const dp = new Array(m + 1).fill(0)
    for (let j = m - 1; j >= 0; j--) {
      dp[j] = Math.max(
        nums1[i] * nums2[j] + prevDp[j + 1],
        prevDp[j],
        dp[j + 1]
      )
    }
    prevDp = dp
  }

  return prevDp[0]
}

// prettier-ignore
const funcs = [
  maxDotProduct_dp_top_down,
  maxDotProduct_dp_bottom_up,
  maxDotProduct_dp_optimized,
]

const data = [
  [[2, 1, -2, 5], [3, 0, -6], 18],
  [[3, -2], [2, -6, 7], 21],
  [[-1, -1], [1, 1], -1],
]

for (const func of funcs) {
  for (const [nums1, nums2, expected] of data) {
    console.log(func(nums1, nums2) === expected)
  }
}
