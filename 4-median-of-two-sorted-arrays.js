/**
 * Given two sorted arrays nums1 and nums2 of size m and n respectively, return
 * the median of the two sorted arrays.
 *
 * The overall run time complexity should be O(log (m+n)).
 *
 * Constraints:
 *    nums1.length == m
 *    nums2.length == n
 *    0 <= m <= 1000
 *    0 <= n <= 1000
 *    1 <= m + n <= 2000
 *    -10^6 <= nums1[i], nums2[i] <= 10^6
 */

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
const findMedianSortedArrays_mySolution = (nums1, nums2) => {
  const m = nums1.length
  const n = nums2.length
  const mid = ((m + n) / 2) | 0
  let previous, last

  for (let i = 0, idx1 = 0, idx2 = 0; i <= mid; i++) {
    previous = last
    last =
      (nums1[idx1] ?? Infinity) <= (nums2[idx2] ?? Infinity)
        ? nums1[idx1++]
        : nums2[idx2++]
  }

  return (m + n) % 2 ? last : (last + previous) / 2
}

// Discussion Board
const findMedianSortedArrays = (nums1, nums2) => {
  const n1 = nums1.length
  const n2 = nums2.length
  // garantir que o nums1 seja maior
  if (n1 < n2) return findMedianSortedArrays(nums2, nums1)

  let lo = 0
  let hi = n2 * 2
  while (lo <= hi) {
    const mid2 = ((lo + hi) / 2) | 0
    const mid1 = n1 + n2 - mid2

    const l1 = mid1 === 0 ? -Infinity : nums1[((mid1 - 1) / 2) | 0]
    const r1 = mid1 === n1 * 2 ? Infinity : nums1[(mid1 / 2) | 0]

    const l2 = mid2 === 0 ? -Infinity : nums2[((mid2 - 1) / 2) | 0]
    const r2 = mid2 === n2 * 2 ? Infinity : nums2[(mid2 / 2) | 0]

    if (l1 > r2) lo = mid2 + 1
    else if (l2 > r1) hi = mid2 - 1
    else return (Math.max(l1, l2) + Math.min(r1, r2)) / 2
  }
  return -1
}

nums1 = [1, 3]
nums2 = [2]
// Output: 2.00000
// Explanation: merged array = [1,2,3] and median is 2.

nums1 = [1, 2]
nums2 = [3, 4]
// Output: 2.50000
// Explanation: merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5.

nums1 = [0, 0]
nums2 = [0, 0]
// Output: 0

nums1 = [2]
nums2 = []
// Output 2

console.log(findMedianSortedArrays(nums1, nums2))
