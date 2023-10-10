/**
 * You are given an integer array nums. In one operation, you can replace any
 * element in nums with any integer.
 *
 * nums is considered continuous if both of the following conditions are
 * fulfilled:
 *
 *    All elements in nums are unique.
 *
 *    The difference between the maximum element and the minimum element in nums
 *    equals nums.length - 1.
 *
 * For example, nums = [4, 2, 5, 3] is continuous, but nums = [1, 2, 3, 5, 6] is
 * not continuous.
 *
 * Return the minimum number of operations to make nums continuous.
 *
 * Constraints:
 *    1 <= nums.length <= 10^5
 *    1 <= nums[i] <= 10^9
 *
 * Topics: Array, Binary Search
 *
 * Hints:
 *
 *    Sort the array.
 *
 *    For every index do a binary search to get the possible right end of the
 *    window and calculate the possible answer.
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
const minOperations_binSearch = (nums) => {
  /**
   * Approach 1: Binary Search
   *
   * The problem description gives some rules for what a continuous array is,
   * but we can simplify it to help us better understand the problem.
   * A continuous array covers all the elements in a range of size n.
   * Essentially, if we sort a continuous array, it will continuously count up
   * by 1.
   *
   * We can define a continuous array by giving its bounds - left and right.
   * For example, in the following continuous array:
   *
   *    [6, 3, 5, 4]
   *
   * The bounds are left = 3 and right = 6. As you can see, the array fully
   * covers all elements in the range [3, 6]. If we were to sort it, we would
   * get [3, 4, 5, 6], which starts at left and counts up by 1 until we reach
   * right.
   *
   * To solve this problem, we will iterate over the array and treat each
   * element as left. We can then calculate right = left + n - 1. We now want to
   * convert the array into a continuous array that covers all elements in the
   * range [left, right]. How many operations do we need to accomplish this?
   *
   * We need to find how many elements in the array are already in the range
   * [left, right]. We can leave these elements unchanged and fill in the rest
   *  of the range using operations. Note that if there are duplicate elements
   * in the input, this strategy will not work properly. For example, let's say
   * we had the following input:
   *
   *    6, 3, 3, 5, 4
   *
   * If we had left = 3, we would have right = 7. Every element in the input is
   * in the range [3, 7], so it appears that we don't need any operations.
   * However, the number 7 is missing because we have 3 twice. Thus, we should
   * first convert nums into a set to get rid of duplicate numbers.
   *
   * Now that we have gotten rid of the duplicates, how can we quickly find how
   * many elements in the array are in a given range [left, right]? If the array
   * is sorted, then we can binary search to efficiently find how many elements
   * are less than or equal to right. We already know how many elements are less
   * than left because we treat left = nums[i] during iteration.
   *
   * Let's summarize the algorithm with an example.
   *
   *    n = 8, [15, 4, 2, 44, 7, 12, 3, 2]
   *
   * First, we remove duplicates from the array, then sort it. Note the original
   * length before removing duplicates as n = 8.
   *
   *    n = 8, [2, 3, 4, 7, 12, 15, 44]
   *
   * Now, we iterate over the array. For each index i, we treat left = nums[i].
   *
   *    n = 8, [2, 3, 4, 7, 12, 15, 44], left = 2
   *
   * If we were to create a continuous array with left = 2 as the minimum, we
   * would need a maximum of right = left + n - 1 = 9.
   *
   *    n = 8, [2, 3, 4, 7, 12, 15, 44], left = 2, right = 9
   *    We need to cover the range [2, 9]
   *
   * How many operations do we need? We start by finding how many elements in
   * the array are already in the desired range [left, right]. Binary search to
   * find the insertion index of right. Note that the binary search here is
   * finding the index after the greatest element less than or equal to right.
   *
   *    n = 8, [2, 3, 4, 7, 12, 15, 44], left = 2, right = 9
   *    From binary search we find an insertion index of 4 - nums[4] = 12
   *
   * Let's call this index j. We have j as the index of the first element that
   * falls outside our range due to it being too large. We also have i as the
   * index of the first element in our range. Thus, we can calculate the number
   * of elements already in our range as j - i.
   *
   *    n = 8, [2, 3, 4, 7, 12, 15, 44], left = 2, right = 9, i = 0, j = 4
   *    There are 4 elements in our range [2, 9]. We need to perform
   *    4 operations.
   *
   * As you can see, we have 4 elements already in the range [left, right].
   * Thus, these elements do not need to be changed. As we must construct an
   * array of length 8, we require 8 - 4 = 4 operations (one for each other
   * element) to create a continuous array if we treat 2 as the minimum.
   *
   * We can repeat this process for every index in the sorted, duplicate-free
   * array. For example, if we treat nums[3] = 7 as the minimum, then our range
   * is [7, 14]. We can binary search to find j and then calculate j - i = 2 as
   * the number of elements already in our range. Thus, we need to perform
   * 8 - 2 = 6 operations if we treat 7 as the minimum.
   *
   *    n = 8, [2, 3, 4, 7, 12, 15, 44], left = 7, right = 14, i = 3, j = 5
   *    There are 2 elements (7, 12) in the range [7, 14]. We need to perform
   *    6 operations.
   *
   * As we iterate over all indices and perform the above process, we keep track
   * of the minimum operations needed.
   */

  const bisectRight = (arr, x, lo = 0, hi = arr.length) => {
    /**
     * The returned insertion point ip partitions the array a into two slices
     * such that:
     *    all(elem <= x for elem in a[lo : ip]) is true for the left slice and
     *    all(elem > x for elem in a[ip : hi]) is true for the right slice.
     */
    while (lo < hi) {
      const mid = Math.floor((lo + hi) / 2)
      if (arr[mid] > x) hi = mid
      else lo = mid + 1
    }
    return lo
  }

  const n = nums.length

  const uniques = Array.from(new Set(nums))
  const m = uniques.length
  uniques.sort((a, b) => a - b)

  let opers = n

  for (let i = 0; i < m; i++) {
    const left = uniques[i]
    const right = left + n - 1

    const j = bisectRight(uniques, right)

    opers = Math.min(opers, n - (j - i))
    if (opers === 0) return 0
  }

  return opers
}

/**
 * @param {number[]} nums
 * @return {number}
 */
const minOperations_sliding_window = (nums) => {
  /**
   * Approach 2: Sliding Window
   *
   * In the previous approach, we locked in an element uniques[i] as left,
   * calculated right, then found the insertion index of right as j. We used an
   * O(log⁡n) binary search to find j, but we can do better using a sliding
   * window.
   *
   * Because uniques is sorted:
   *
   *    As i increases, so does left = uniques[i].
   *
   *    An increase in the lower bound left means an increase in the upper bound
   *    right as well.
   *
   *    As right increases, j either remains the same or increases.
   *
   *    Thus, as i increases, j will stay the same or increase.
   *
   * We initialize j = 0 and follow the same process as in the last approach.
   * Iterate i over the indices of uniques and treat each left = uniques[i] as
   * the minimum element. This gives us right = uniques[i] + n - 1 as our
   * maximum element.
   *
   * How do we update j? Similar to the last approach, we have j as the index of
   * the first element out of our range. Thus, we increment j until it points to
   * an element out of our range. The condition for this is:
   *
   *    while (uniques[j] < uniques[i] + n)
   *
   * Once this condition is broken, uniques[j] is out of our range [left, right]
   * and correctly positioned. We can calculate the number of elements already
   * in our range as j - i just like in the previous approach.
   *
   * Because j starts at 0 and cannot exceed the length of newNums, it will only
   * be incremented at most n times across the entire algorithm. This means it
   * costs O(1) amortized to calculate j, an improvement from the O(log ⁡n)
   * binary search.
   */

  const n = nums.length

  const uniques = Array.from(new Set(nums))
  const m = uniques.length
  uniques.sort((a, b) => a - b)

  let opers = n
  let j = 0

  for (let i = 0; i < m; i++) {
    const left = uniques[i]
    const right = left + n - 1

    while (j < m && uniques[j] <= right) j += 1

    opers = Math.min(opers, n - (j - i))
    if (opers === 0) return 0
  }

  return opers
}

// prettier-ignore
const funcs = [
  minOperations_binSearch,
  minOperations_sliding_window,
]

const data = [
  [[4, 2, 5, 3], 0],
  [[1, 2, 3, 5, 6], 1],
  [[1, 10, 100, 1000], 3],
  [[8, 5, 9, 9, 8, 4], 2],
]

for (const func of funcs) {
  for (const [nums, expected] of data) {
    console.log(func(nums) === expected)
  }
}
