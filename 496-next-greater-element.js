/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */

const nextGreaterElement = (nums1, nums2) => {
  const result = []
  for (base of nums1) {
    let i = nums2.indexOf(base) + 1
    while (nums2[i] <= base && i < nums2.length) i++
    result.push(i === nums2.length ? -1 : nums2[i])
  }
  return result
}

// Input: (nums1 = [4, 1, 2]), (nums2 = [1, 3, 4, 2])
// Output: [-1, 3, -1]
console.log(nextGreaterElement([4, 1, 2], [1, 3, 4, 2]))
